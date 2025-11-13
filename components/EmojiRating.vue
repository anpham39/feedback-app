<template>
  <div class="flex items-center space-x-3" aria-label="Emoji rating">
    <button
      v-for="(emoji, index) in emojis"
      :key="index"
      class="p-1 rounded transition-transform"
      :class="{
        'scale-110': index + 1 === currentRating,
        'opacity-70': index + 1 !== currentRating
      }"
      @click.prevent="$emit('update:rating', index + 1)"
    >
      <img
        :src="currentRating === index + 1 ? emoji.activeSrc : emoji.inactiveSrc"
        :alt="emoji.alt"
        class="w-10 h-10 object-contain"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ rating?: number }>()

const currentRating = computed(() => props.rating ?? 0)

const emojis = [
  {
    inactiveSrc: '/poor.png',
    activeSrc: '/poor-active.png',
    alt: 'Poor'
  },
  {
    inactiveSrc: '/fair.png',
    activeSrc: '/fair-active.png',
    alt: 'Fair'
  },
  {
    inactiveSrc: '/satisfactory.png',
    activeSrc: '/satisfactory-active.png',
    alt: 'Satisfactory'
  },
  {
    inactiveSrc: '/good.png',
    activeSrc: '/good-active.png',
    alt: 'Good'
  },
  {
    inactiveSrc: '/excellent.png',
    activeSrc: '/excellent-active.png',
    alt: 'Excellent'
  }
]
</script>

<style scoped>

</style>
