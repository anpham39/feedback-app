<template>
  <div>
    <h1 class="text-[26px] font-[700] mb-2">Thank you for your feedback!</h1>
    <p class="font-[400]">Jooga Studio has received your feedback. You can still edit your feedback or tell us more about how we did, and how we could serve you better in the future.</p>

    <form @submit.prevent="sendFeedback">
      <div class="mb-4">
        <EmojiRating v-model:rating="feedback.rating" />
      </div>

      <!-- Feedback textarea, only shown when a rating is selected -->
      <transition 
          enter-active-class="transition-opacity duration-500 ease-in"
          enter-from-class="opacity-0"
      >   
          <div v-if="feedback.rating">
              <label for="feedback-text" class="font-semibold text-[16px]">
                  Please tell us a bit more why you chose {{feedback.rating.toLocaleLowerCase()}}?
              </label>
              <textarea
                  id="feedback-text"
                  v-model="feedback.text"
                  rows="4"
                  class="w-full px-4 py-2 mt-4 border border-gray rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue"
              />
          </div>
      </transition>

      <!-- Consent checkboxes -->
      <div class="mt-12">
        <ConsentCheckbox
          id="public-consent"
          title="Make the feedback public"
          description="Your feedback may be displayed on Vello's healthcare and wellbeing marketplace. In public feedback, your name (Linda K) will be shown."
          v-model="feedback.consent.publicConsent"
        />
        <ConsentCheckbox
          id="contact-consent"
          title="I wish that Yoga Studio will be in touch with me"
          description="Contact: linda.miller@gmail.com, 050 1234567"
          v-model="feedback.consent.contactConsent"
        />
        <ConsentCheckbox
          id="privacy-consent"
          title="I agree to the processing of the feedback data in accordance with the Privacy Policy."
          :is-privacy-consent="true"
          v-model="feedback.consent.privacyConsent"
        />
      </div>

      <div class="flex justify-center mt-20 mb-10">
        <button
          type="submit"
          :disabled="isSubmitting || !isValidForm"
          class="submit-button"
        >
          {{ isSubmitting ? 'Sending' : 'Send feedback' }}
        </button>
      </div>
    </form>

    <!-- Error message -->
    <div class="mb-12">
      <div v-if="error" class="p-3 rounded bg-red-50 border border-red-200 text-red-800">
        <strong>Error:</strong>
        <div class="mt-1">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import EmojiRating from '~/components/EmojiRating.vue'
import ConsentCheckbox from '~/components/ConsentCheckbox.vue'
import type { FeedbackData } from '~/types/feedback'

const emit = defineEmits<{
  submit: [feedback: FeedbackData]
}>()

const isValidForm = computed(() => feedback.rating !== '' && feedback.consent.privacyConsent)

const feedback = reactive<FeedbackData>({
  rating: '',
  text: '',
  consent: {
    publicConsent: false,
    contactConsent: false,
    privacyConsent: false,
  }
})

const isSubmitting = ref(false)
const error = ref<string | null>(null)

async function sendFeedback() {
  // reset
  error.value = null
  isSubmitting.value = true

  try {
    // await $fetch('/api/submitFeedback', {
    //   method: 'POST',
    //   body: {
    //     ...feedback,
    //     timestamp: new Date().toISOString()
    //   }
    // })

    emit('submit', feedback)
  } catch (err: any) {
    error.value = err?.message || 'Submission failed'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
</style>
