<template>
  <div class="flex items-start space-x-3">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <label :for="id" class="cursor-pointer">
      <p class="font-medium text-gray-900">{{ label }}</p>
      <p v-if="description">{{ description }}</p>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
  description?: string
  modelValue: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<style scoped>
</style>
