export type RatingValue = 'Poor' | 'Fair' | 'Satisfactory' | 'Good' | 'Excellent'

export interface FeedbackData {
  rating: RatingValue | ''
  text: string
  consent: {
    publicConsent: boolean
    contactConsent: boolean
    privacyConsent: boolean
  }
}
