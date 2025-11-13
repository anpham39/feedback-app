<template>
  <main class="min-h-screen flex items-center justify-center bg-slate-50 p-6">
    <div class="max-w-xl w-full bg-white p-8 rounded-lg shadow">
      <h1 class="text-2xl font-[700] mb-2">Thank you for your feedback!</h1>
      <p class="mb-4 font-[400]">Jooga Studio has received your feedback. You can still edit your feedback or tell us more about how we did, and how we could serve you better in the future.</p>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <EmojiRating v-model:rating="feedback.rating" />
        </div>

        <div>
          <label for="feedback-text">
            Please tell us a bit more why you chose excellent?
          </label>
          <textarea
            id="feedback-text"
            v-model="feedback.text"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div class="space-y-4">
          <ConsentCheckbox
            id="publicConsent"
            label="Make the feedback public"
            description="Your feedback may be displayed on Vello’s healthcare and wellbeing marketplace. In public feedback, your name (Linda K) will be shown."
            v-model="feedback.consent.publicConsent"
          />
          <ConsentCheckbox
            id="contactConsent"
            label="I wish that Yoga Studio will be in touch with me"
            description="Contact: linda.miller@gmail.com, 050 1234567"
            v-model="feedback.consent.contactConsent"
          />
          <ConsentCheckbox
            id="privacyConsent"
            label="I agree to the processing of the feedback data in accordance with the Privacy Policy."
            v-model="feedback.consent.privacyConsent"
          />
        </div>

        <div class="flex items-center space-x-3">
          <button
            type="submit"
            :disabled="isSubmitting || feedback.rating === 0"
            class="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
          >
            {{ isSubmitting ? 'Submitting…' : 'Submit feedback' }}
          </button>
        </div>
      </form>

      <div class="mt-4">
        <div v-if="error" class="p-3 rounded bg-red-50 border border-red-200 text-red-800">
          <strong>Error:</strong>
          <div class="mt-1">{{ error }}</div>
        </div>

        <div v-else-if="submitted" class="p-3 rounded bg-green-50 border border-green-200 text-green-800">
          <div class="mt-1">
            <strong>Rating:</strong> {{ feedback.rating }}
            <strong>Text:</strong> {{ feedback.text }}
            <strong>Consent:</strong> {{ feedback.consent }}
        </div>
    </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import EmojiRating from '~/components/EmojiRating.vue'
import ConsentCheckbox from '~/components/ConsentCheckbox.vue'


const feedback = reactive({
  rating: 0,
  text: '',
  consent: {
    publicConsent: false,
    contactConsent: false,
    privacyConsent: false,
  }
})

const isSubmitting = ref(false)
const submitted = ref(false)
const error = ref<string | null>(null)

async function submit() {
  // reset
  error.value = null
  submitted.value = false
  isSubmitting.value = true

  const payload = {
    rating: feedback.rating,
    text: feedback.text,
    consent: feedback.consent,
    timestamp: new Date().toISOString()
  }

  try {
    await $fetch('/api/submitFeedback', {
      method: 'POST',
      body: payload
    })
    submitted.value = true
  } catch (err: any) {
    error.value = err?.message || 'Submission failed'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>

</style>
