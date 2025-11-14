<template>
  <div>
    <h1 class="text-[26px] font-semibold">Thank you! We received your feedback!</h1>
    
    <!-- Feedback display box -->
    <div class="py-8 px-10 mt-12 mb-10 border border-gray rounded-lg">
      <img 
        :src="emojiSrc" 
        :alt="emojiAlt"
        class=""
      />

      <div v-if="feedback.text" class="w-full">
        <p class="w-full break-words my-6">
          {{ feedback.text }}
        </p>
        <p v-if="feedback.consent.publicConsent" class="font-light text-[#545F67]">{{ user.name }}.</p>
      </div>
    </div>

    <!-- Chosen consent information -->
    <div class="px-12">
      <div class="flex items-center gap-3 mb-4">
        <img src="/checked.png" alt="✓" class="w-4 h-4" />
        <span class="font-semibold ml-2">
          Feedback is {{feedback.consent.publicConsent ? 'public' : 'not public'}}
        </span>
      </div>
      
      <div class="flex items-center gap-x-2">
        <img src="/checked.png" alt="✓" class="w-4 h-4" />
        <span class="font-semibold ml-2">
          Yoga Studio will {{feedback.consent.contactConsent ? 'be in touch' : 'not be in touch'}}
        </span>
      </div>
    </div>    

    <div class="flex justify-center mt-20 mb-10">
      <button
        @click="$emit('done')"
        class="submit-button"
      >
        Done
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FeedbackData } from '~/types/feedback'
import type { RatingValue } from '~/types/feedback'
import { user } from '~/utils/user'

const props = defineProps<{
  feedback: FeedbackData
}>()


// Map rating to emoji
const emojiMap: Record<RatingValue, { src: string; alt: string }> = {
  'Poor': { src: '/poor-active.png', alt: 'Poor' },
  'Fair': { src: '/fair-active.png', alt: 'Fair' },
  'Satisfactory': { src: '/satisfactory-active.png', alt: 'Satisfactory' },
  'Good': { src: '/good-active.png', alt: 'Good' },
  'Excellent': { src: '/excellent-active.png', alt: 'Excellent' }
}

const emojiSrc = computed(() => {
  if (!props.feedback.rating) return ''
  return emojiMap[props.feedback.rating]?.src || ''
})

const emojiAlt = computed(() => {
  if (!props.feedback.rating) return ''
  return emojiMap[props.feedback.rating]?.alt || ''
})
</script>

<style scoped>
</style>
