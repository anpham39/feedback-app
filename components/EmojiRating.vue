<template>
  <div class="grid grid-cols-5 gap-3 my-12" aria-label="Emoji rating">
    <button
      v-for="(emoji, index) in emojis"
      :key="index"
      class="p-3 rounded-lg border border-gray transition-all w-full h-[124px] flex flex-col items-center justify-center gap-2"
      :style="emoji.value === currentRating 
        ? getActiveButtonStyle(emoji.value) 
        : {}"
      @click.prevent="$emit('update:rating', emoji.value)"
    >
      <img
        :src="currentRating === emoji.value ? emoji.activeSrc : emoji.inactiveSrc"
        :alt="emoji.alt"
        class="w-auto h-[60px] object-contain"
        :style="{ 
          filter: index === 4 && emoji.value !== currentRating
          ? 'saturate(0.05)' 
          : 'none' }"
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

// Color mapping for each rating
const ratingColors: Record<RatingValue, string> = {
  'Poor': '#FDE6EF',
  'Fair': '#FCE2DC',
  'Satisfactory': '#FDF4D4',
  'Good': '#E9F5DF',
  'Excellent': '#E7FAF6'
}

function getActiveButtonStyle(rating: RatingValue) {
  return { 
    boxShadow: `0 7px 14px -4px ${ratingColors[rating]}`,
    borderColor: `${ratingColors[rating]}`,
    borderWidth: '2px'
  }
}
</script>


