console.log('약간동의 background loaded')

const API_BASE_URL = 'https://yakgandongui-swu.vercel.app'
const WEB_APP_URL = 'https://yakgandongui-swu.vercel.app'
const SESSION_KEY = 'testkey'
const ICON_URL = 'icon.png'

const detectedPages = new Map()

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function createNotification(id, title, message, options = {}) {
  console.log('notification create:', id, title)

  chrome.notifications.create(
    id,
    {
      type: 'basic',
      iconUrl: ICON_URL,
      title,
      message,
      ...options,
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error('notification error:', chrome.runtime.lastError.message)
      } else {
        console.log('notification success:', id)
      }
    },
  )
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    webGuardEnabled: true,
  })

  createNotification(
    `test-${Date.now()}`,
    '약간동의 테스트',
    '확장프로그램 알림이 정상 작동합니다.',
    { priority: 2 },
  )
})

chrome.runtime.onMessage.addListener((message) => {
  console.log('background message received:', message)

  if (!message) return

  if (message.type === 'WEB_GUARD_ENABLED_CHANGED') {
    chrome.storage.local.set({
      webGuardEnabled: message.enabled,
    })

    console.log('웹 가드 상태 저장:', message.enabled)
    return
  }

  if (message.type !== 'TERMS_PAGE_DETECTED') return

  chrome.storage.local.get(['webGuardEnabled'], (result) => {
    const enabled = result.webGuardEnabled ?? true

    if (!enabled) {
      console.log('웹 가드 꺼짐: 알림 생성 취소')
      return
    }

    const notificationId = `terms-${Date.now()}`

    detectedPages.set(notificationId, {
      url: message.url,
      title: message.title,
    })

    createNotification(
      notificationId,
      '약관 페이지로 보입니다',
      '이 페이지를 약간동의에서 분석해볼까요?',
      {
        buttons: [{ title: '분석하기' }],
        priority: 2,
      },
    )
  })
})

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  console.log('notification button clicked:', notificationId, buttonIndex)

  if (notificationId.startsWith('terms-')) {
    if (buttonIndex !== 0) return

    const page = detectedPages.get(notificationId)
    if (!page?.url) return

    detectedPages.delete(notificationId)
    analyzeDetectedUrl(page.url, page.title)
    return
  }

  if (notificationId.startsWith('analyze-done-')) {
    if (buttonIndex !== 0) return

    const jobId = notificationId.replace('analyze-done-', '')

    chrome.storage.local.get([`result_${jobId}`], (items) => {
      const resultUrl = items[`result_${jobId}`]

      if (resultUrl) {
        chrome.tabs.create({ url: resultUrl })
      }
    })
  }
})

chrome.notifications.onClicked.addListener((notificationId) => {
  console.log('notification clicked:', notificationId)

  const page = detectedPages.get(notificationId)
  if (!page?.url) return

  detectedPages.delete(notificationId)
  analyzeDetectedUrl(page.url, page.title)
})

async function analyzeDetectedUrl(url, title) {
  try {
    createNotification(
      `analyze-start-${Date.now()}`,
      '약관 분석을 시작합니다',
      '분석이 완료되면 알려드릴게요.',
      { priority: 1 },
    )

    const startRes = await fetch(`${API_BASE_URL}/api/analyze/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_name: title || '감지된 약관',
        session_key: SESSION_KEY,
        url,
      }),
    })

    if (!startRes.ok) {
      throw new Error(`분석 요청 실패: ${startRes.status}`)
    }

    const startData = await startRes.json()
    const jobId = startData.job_id

    if (!jobId) {
      throw new Error('job_id가 없습니다.')
    }

    const completed = await pollProgress(jobId)

    if (!completed) {
      throw new Error('분석 시간이 초과되었습니다.')
    }

    const resultUrl = `${WEB_APP_URL}/analysis/${jobId}`

    chrome.storage.local.set({
      [`result_${jobId}`]: resultUrl,
      latestResultUrl: resultUrl,
    })

    createNotification(
      `analyze-done-${jobId}`,
      '약관 분석 완료',
      '분석 결과를 확인해보세요.',
      {
        buttons: [{ title: '결과 보기' }],
        priority: 2,
      },
    )
  } catch (error) {
    console.error(error)

    createNotification(
      `analyze-error-${Date.now()}`,
      '약관 분석 실패',
      '분석 중 오류가 발생했습니다. 웹앱에서 다시 시도해주세요.',
      { priority: 2 },
    )
  }
}

async function pollProgress(jobId) {
  for (let i = 0; i < 120; i += 1) {
    const res = await fetch(`${API_BASE_URL}/api/analyze/${jobId}/progress`)

    if (!res.ok) {
      await sleep(1200)
      continue
    }

    const data = await res.json()

    if (data.status === 'done' || data.status === 'completed') {
      return true
    }

    if (data.status === 'failed') {
      throw new Error(data.message || '분석 실패')
    }

    await sleep(1200)
  }

  return false
}