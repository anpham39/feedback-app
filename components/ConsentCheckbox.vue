<template>
  <div class="flex items-start space-x-3">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="mt-1 w-4 h-4 text-blue border-gray-300 rounded cursor-pointer"
    />
    <label :for="id" class="cursor-pointer flex-1">
        <p v-if="isPrivacyConsent" class="font-[600] text-gray-900 mt-0.5">
            I agree to the processing of the feedback data in accordance with the
            <a 
            href="https://example.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer" 
            class="text-blue hover:opacity-80 underline"
            >
            Privacy Policy
            </a>
        </p>
        <p v-else class="font-[600] text-gray-900">{{ title }}</p>
        <p class="text-sm text-gray-600 mt-0.5">
            {{ description }}
        </p>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    id: string
    isPrivacyConsent?: boolean
    title: string
    description?: string
    modelValue: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<style scoped>
</style>
