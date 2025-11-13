<template>
  <div class="max-w-xl w-full bg-white p-8 rounded-lg shadow">
    <h2 class="text-2xl font-[700] mb-2">Thank you! We received your feedback!</h2>
    
    <div class="space-y-4">
      <!-- Chosen emoji rating -->
      <div class="flex items-center gap-3">
        <img 
          :src="emojiSrc" 
          :alt="emojiAlt"
          class="w-10 h-10 object-contain"
        />
      </div>

      <!-- Feedback text -->
      <div v-if="feedback.text">
        <p class="text-sm font-medium text-gray-700 mb-1">Your feedback:</p>
        <p class="text-sm text-gray-600 bg-white p-2 rounded border border-gray-200">
          {{ feedback.text }}
        </p>
      </div>

      <!-- Chosen consent information -->
      <div class="text-sm text-gray-600 space-y-1">
        <div class="flex items-center gap-2">
          <img src="/checked.png" alt="✓" class="w-4 h-4" />
          <span v-if="feedback.consent.publicConsent">Feedback is public</span>
          <span v-else>Feedback is not public</span>
        </div>
        
        <div class="flex items-center gap-2">
          <img src="/checked.png" alt="✓" class="w-4 h-4" />
          <span v-if="feedback.consent.contactConsent">Yoga Studio will be in touch</span>
          <span v-else>Yoga Studio will not be in touch</span>
        </div>
      </div>

      <!-- Done button -->
       <div class="flex justify-center">
         <button
           @click="$emit('done')"
           class="px-4 py-2 rounded bg-blue text-white disabled:opacity-50"
         >
           Done
         </button>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  feedback: {
    rating: number
    text: string
    consent: {
      publicConsent: boolean
      contactConsent: boolean
    }
  }
}>()

// Map rating to emoji
const emojiMap: Record<number, { src: string; alt: string }> = {
  1: { src: '/poor-active.png', alt: 'Poor' },
  2: { src: '/fair-active.png', alt: 'Fair' },
  3: { src: '/satisfactory-active.png', alt: 'Satisfactory' },
  4: { src: '/good-active.png', alt: 'Good' },
  5: { src: '/excellent-active.png', alt: 'Excellent' }
}

const emojiSrc = computed(() => emojiMap[props.feedback.rating]?.src || '')
const emojiAlt = computed(() => emojiMap[props.feedback.rating]?.alt || '')
</script>

<style scoped>
</style>
