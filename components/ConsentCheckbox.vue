<template>
  <div class="flex items-start space-x-3 mb-4">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="checkbox mt-1 w-5 h-5 cursor-pointer"
    />
    <label :for="id" class="cursor-pointer flex-1">
        <p v-if="isPrivacyConsent" class="font-semibold text-gray-900 mt-0.5">
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
        <p v-else class="font-semibold text-gray-900">{{ title }}</p>
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
.checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid #CCD7DF;
  border-radius: 4px;
  background-color: white;
  display: inline-block;
  position: relative;
}

.checkbox:checked {
  background-color: blue;
  border-color: blue;
}

.checkbox:checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox:focus {
  outline: 2px solid #93c5fd;
  outline-offset: 2px;
}
</style>
