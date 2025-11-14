import { readBody, createError } from 'h3'

/**
  * POST /api/submitFeedback
  * Server-side proxy that send feedback to a Google Apps Script. 
  *
  * Request body:
  *   - rating: RatingValue ('Poor' | 'Fair' | 'Satisfactory' | 'Good' | 'Excellent')
  *   - text: string (optional feedback text)
  *   - consent: object with publicConsent, contactConsent, privacyConsent booleans
  *   - timestamp: ISO timestamp
  *   - userId: string (ID of the user submitting feedback) 
  * 
  * Response:
  *   - 200 (Success): Returns feedbackId
  *   - 500: Endpoint not configured
  *   - 502: Google Apps Script request failed
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const endpoint = config.feedbackEndpoint

  if (!endpoint) {
    throw createError({ statusCode: 500, statusMessage: 'Feedback endpoint not configured' })
  }

  try {
    // Forward the request to the external Google Apps Script
    const result = await $fetch(endpoint, {
      method: 'POST',
      body
    })
    return result
  } catch (err: any) {
    throw createError({ statusCode: 502, statusMessage: 'Save feedback request failed', data: err?.message || err })
  }
})
