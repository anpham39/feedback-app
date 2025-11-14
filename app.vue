<template>
  <div class="flex items-center justify-center md:bg-slate-50 md:p-6 md:min-h-screen">
    <div class="w-full bg-white px-14 py-12 md:rounded-lg md:shadow md:max-w-3xl">
      <img src="/logo.png" alt="Yoga Studio" class="h-8 mb-10" />

      <Transition name="fade" mode="out-in">
        <FeedbackForm
          v-if="!submitted"
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
