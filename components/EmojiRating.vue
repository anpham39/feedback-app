<template>
  <div class="grid grid-cols-5 gap-3 my-10" aria-label="Emoji rating">
    <button
      v-for="(emoji, index) in emojis"
      :key="index"
      :class="[
        'p-3 rounded-lg border-2 transition-all w-full h-[124px] flex flex-col items-center justify-center gap-2',
        emoji.value === currentRating
          ? (getBorderColorActive(emoji.value) + ' button-active')
          : 'border border-[#CCD7DF6E]'
      ]"
      @click.prevent="$emit('update:rating', emoji.value)"
    >
      <img
        :src="currentRating === emoji.value ? emoji.activeSrc : emoji.inactiveSrc"
        :alt="emoji.alt"
        class="w-auto h-[60px] object-contain"
      />
      <span 
        :class="[
          'text-xs font-semibold my-1',
          emoji.value === currentRating ? 'opacity-100' : 'opacity-60'
        ]"
        style="font-size: 12px;"
      >
        {{ emoji.value }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RatingValue } from '~/types/feedback'

const props = defineProps<{ rating?: RatingValue | '' }>()

const currentRating = computed(() => props.rating ?? '')

const ratingValues: RatingValue[] = ['Poor', 'Fair', 'Satisfactory', 'Good', 'Excellent']

const emojis = ratingValues.map(value => ({
  value,
  inactiveSrc: `/${value.toLowerCase()}.png`,
  activeSrc: `/${value.toLowerCase()}-active.png`,
  alt: value,
}))

function getBorderColorActive(rating: RatingValue): string {
  const colors: Record<RatingValue, string> = {
    'Poor': 'border-[#FDE6EF]',
    'Fair': 'border-[#FCE2DC]',
    'Satisfactory': 'border-[#FDF4D4]',
    'Good': 'border-[#E9F5DF]',
    'Excellent': 'border-[#E7FAF6]'
  }
  return colors[rating] || 'border-gray-300'
}
</script>

<style scoped>
.button-active {
    box-shadow: 0 7px 14px -4px #FDE6EF;
}
</style>
