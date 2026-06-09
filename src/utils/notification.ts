export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    alert('이 브라우저는 알림을 지원하지 않습니다.')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission === 'denied') {
    alert('브라우저 알림이 차단되어 있습니다. 브라우저 설정에서 알림을 허용해주세요.')
    return false
  }

  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

export function showBrowserNotification(
  title: string,
  body: string,
  url?: string,
) {
  if (!('Notification' in window)) return
  if (Notification.permission !== 'granted') return

  const notification = new Notification(title, {
    body,
    icon: '/logo_terms_agree.png',
  })

  if (url) {
    notification.onclick = () => {
      window.focus()
      window.location.href = url
      notification.close()
    }
  }
}