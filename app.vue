<template>
  <main class="min-h-screen flex items-center justify-center bg-slate-50 p-6">
    <FeedbackForm v-if="!submitted" @submit="handleSubmit" />
    
    <FeedbackReceived 
      v-else 
        :feedback="submittedFeedback"
        @done="handleDone"
    />
  </main>
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
