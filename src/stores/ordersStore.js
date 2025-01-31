import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('ordersStore', () => {
  const clearOrderForm = ref(false)

  const handlerClearOrderForm = () => {
    clearOrderForm.value = !clearOrderForm.value
  }

  return {
    clearOrderForm,
    handlerClearOrderForm
  }
})
