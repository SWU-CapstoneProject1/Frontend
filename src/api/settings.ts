import { apiGet, apiPut } from './client'

export type ThemeOption = 'light' | 'dark' | 'system'

export interface UserSettings {
  session_key: string
  risk_sensitivity: number
  notifications: boolean
  theme: ThemeOption
  exclude_personal_data: boolean
}

export interface UpdateUserSettingsRequest {
  risk_sensitivity: number
  notifications: boolean
  theme: ThemeOption
  exclude_personal_data: boolean
}

export async function getUserSettings(
  sessionKey: string,
): Promise<UserSettings> {
  return apiGet<UserSettings>(`/api/settings/${sessionKey}`)
}

export async function updateUserSettings(
  sessionKey: string,
  body: UpdateUserSettingsRequest,
): Promise<UserSettings> {
  return apiPut<UserSettings>(`/api/settings/${sessionKey}`, body)
}