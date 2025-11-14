<template>
  <div class="flex items-center justify-center md:bg-slate-50 md:p-6 md:min-h-screen">
    <div class="w-full bg-white px-14 py-12 md:rounded-lg md:shadow md:max-w-3xl">
      <img src="/logo.png" alt="Yoga Studio" class="h-7 mb-10" />
  
      <FeedbackForm v-if="!submitted" @submit="handleSubmit" />
      
      <FeedbackReceived 
        v-else 
          :feedback="submittedFeedback"
          @done="handleDone"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FeedbackForm from '~/components/FeedbackForm.vue'
import FeedbackReceived from '~/components/FeedbackReceived.vue'

const submitted = ref(false)
const submittedFeedback = ref<any>(null)

function handleSubmit(feedback: any) {
  submittedFeedback.value = feedback
  submitted.value = true
}

function handleDone() {
  submitted.value = false
  submittedFeedback.value = null
}
</script>

<style scoped>
</style>
