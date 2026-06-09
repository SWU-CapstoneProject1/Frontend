console.log('약간동의 content loaded:', location.href)

const APP_HOSTS = [
  'yakgandongui-swu.vercel.app',
  'localhost',
  '127.0.0.1',
]

const TERMS_KEYWORDS = [
  'terms',
  'term',
  'policy',
  'privacy',
  'agreement',
  'tos',
  'service',
  '약관',
  '이용약관',
  '개인정보',
  '개인정보처리방침',
  '정책',
]

const BODY_KEYWORDS = [
  '이용약관',
  '개인정보처리방침',
  '제1조',
  '제 1 조',
  '회원',
  '서비스 이용',
  '개인정보 수집',
  '책임',
  '면책',
  '환불',
  '해지',
  '동의',
  '수집 및 이용',
]

function isWebAppPage() {
  return APP_HOSTS.includes(location.hostname)
}

function notifyWebAppInstalled() {
  if (!isWebAppPage()) return

  console.log('약간동의 웹앱 감지됨. 설치 메시지 전송')

  const message = {
    type: 'YAKGAN_EXTENSION_INSTALLED',
    installed: true,
  }

  window.postMessage(message, '*')

  setTimeout(() => {
    window.postMessage(message, '*')
  }, 500)

  setTimeout(() => {
    window.postMessage(message, '*')
  }, 1500)
}

function listenWebAppMessages() {
  if (!isWebAppPage()) return

  window.addEventListener('message', (event) => {
    if (event.source !== window) return

    if (event.data?.type === 'YAKGAN_WEB_GUARD_ENABLED_CHANGED') {
      console.log('웹 가드 상태 변경 수신:', event.data.enabled)

      chrome.runtime.sendMessage({
        type: 'WEB_GUARD_ENABLED_CHANGED',
        enabled: event.data.enabled,
      })
    }
  })
}

function isTermsLikePage() {
  const url = location.href.toLowerCase()
  const title = document.title.toLowerCase()
  const bodyText = document.body?.innerText?.slice(0, 7000) ?? ''

  const urlOrTitleMatched = TERMS_KEYWORDS.some((keyword) => {
    const lowerKeyword = keyword.toLowerCase()
    return url.includes(lowerKeyword) || title.includes(lowerKeyword)
  })

  const bodyScore = BODY_KEYWORDS.reduce((score, keyword) => {
    return bodyText.includes(keyword) ? score + 1 : score
  }, 0)

  return urlOrTitleMatched || bodyScore >= 3
}

function detectTermsPage() {
  if (isWebAppPage()) return

  chrome.storage.local.get(['webGuardEnabled'], (result) => {
    const enabled = result.webGuardEnabled ?? true

    if (!enabled) {
      console.log('약간동의 웹 가드 꺼짐: 감지 중단')
      return
    }

    const alreadyDetectedKey = `yakgan_detected_${location.href}`

    if (sessionStorage.getItem(alreadyDetectedKey)) return

    if (isTermsLikePage()) {
      console.log('약관 페이지 감지됨:', location.href)

      sessionStorage.setItem(alreadyDetectedKey, 'true')

      chrome.runtime.sendMessage({
        type: 'TERMS_PAGE_DETECTED',
        url: location.href,
        title: document.title || '약관 페이지',
      })
    }
  })
}

notifyWebAppInstalled()
listenWebAppMessages()
detectTermsPage()