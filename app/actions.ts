'use server'

import { redirect } from 'next/navigation'

export async function refreshHistory(path: string) {
  redirect(path)
}

export async function getMissingKeys() {
  const requiredKeys = ['OPENAI_API_KEY']
  const missingKeys = requiredKeys.filter(key => !process.env[key])
  return missingKeys
}
