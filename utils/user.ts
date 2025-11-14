// Mock user data
import { ref } from 'vue'

export const user = ref({
  id: 'user_' + Math.random().toString(36).substring(2, 11),
  name: 'Linda K',
})
