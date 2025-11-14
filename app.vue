<template>
  <div class="flex items-center justify-center md:bg-slate-50 md:p-6 md:min-h-screen">
    <div class="w-full bg-white px-10 py-12 md:px-14 md:rounded-lg md:shadow md:max-w-3xl">
      <img src="/logo.png" alt="Yoga Studio" class="h-8 mb-10" />

      <Transition name="fade" mode="out-in">
        <FeedbackForm
          v-if="!submittedFeedback"
          key="form"
          @submit="handleSubmit"
        />

        <FeedbackReceived
          v-else
          key="received"
          :feedback="submittedFeedback"
          @done="handleDone"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FeedbackForm from '~/components/FeedbackForm.vue'
import FeedbackReceived from '~/components/FeedbackReceived.vue'
import type { FeedbackData } from '~/types/feedback'

const submittedFeedback = ref<FeedbackData | null>(null)

function handleSubmit(feedback: FeedbackData) {
  submittedFeedback.value = feedback
}

function handleDone() {
  submittedFeedback.value = null
}
</script>
