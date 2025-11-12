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
            label="Share my feedback publicly"
            description="Allow Jooga Studio to display my feedback on their website"
            v-model="feedback.consent.publicConsent"
          />
          <ConsentCheckbox
            id="contactConsent"
            label="Contact me about my feedback"
            description="Jooga Studio may reach out to discuss my feedback"
            v-model="feedback.consent.contactConsent"
          />
          <ConsentCheckbox
            id="privacyConsent"
            label="I agree to the privacy policy"
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

      <div v-if="submitted">
        <div>
          <strong>Rating:</strong> {{ feedback.rating }}
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

async function submit() {
  submitted.value = true
}
</script>

<style scoped>

</style>
