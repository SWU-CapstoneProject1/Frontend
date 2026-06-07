const BOOKMARK_KEY = 'yakgan_bookmarked_job_ids'

export function getBookmarkedJobIds(): string[] {
  try {
    const raw = localStorage.getItem(BOOKMARK_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function isBookmarkedJob(jobId: string): boolean {
  return getBookmarkedJobIds().includes(jobId)
}

export function addBookmarkedJobId(jobId: string): void {
  const ids = getBookmarkedJobIds()

  if (ids.includes(jobId)) return

  localStorage.setItem(
    BOOKMARK_KEY,
    JSON.stringify([...ids, jobId]),
  )
}

export function removeBookmarkedJobId(jobId: string): void {
  const ids = getBookmarkedJobIds().filter((id) => id !== jobId)

  localStorage.setItem(
    BOOKMARK_KEY,
    JSON.stringify(ids),
  )
}