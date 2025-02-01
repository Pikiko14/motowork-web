import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('ordersStore', () => {
  const shoppingCar = ref([])
  const productLimit = ref(3) // sacar del api del software de facturación
  const clearOrderForm = ref(false)

  const handlerClearOrderForm = () => {
    clearOrderForm.value = !clearOrderForm.value
  }

  const addNewItemToCar = (product) => {
    shoppingCar.value = product
  }

  return {
    shoppingCar,
    productLimit,
    clearOrderForm,
    addNewItemToCar,
    handlerClearOrderForm
  }
})
