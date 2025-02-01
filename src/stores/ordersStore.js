import { ref } from 'vue'
import { defineStore } from 'pinia'
import { notification } from 'src/boot/notification'

export const useOrdersStore = defineStore('ordersStore', () => {
  const shoppingCart = ref([])
  const productLimit = ref(3) // sacar del api del software de facturación
  const clearOrderForm = ref(false)

  const handlerClearOrderForm = () => {
    clearOrderForm.value = !clearOrderForm.value
  }

  const addNewItemToCar = (product) => {
    const { variant } = product

    let issetIndex = shoppingCart.value.findIndex((item) => item._id === product._id)

    if (variant) {
      issetIndex = shoppingCart.value.findIndex((item) => item._id === product._id && item.variant._id === variant._id)
    }

    let productIsset = null
    if (issetIndex !== -1) {
      productIsset = shoppingCart.value[issetIndex]
    }

    if (!productIsset) {
      product.limit = productLimit.value
      shoppingCart.value.push(product)
      return true
    }

    if ((product.quantity + productIsset.quantity) > productLimit.value) {
      notification('negative', 'No puedes agregar mas unidades porque excede el limite total', 'primary')
      return false
    }

    // aumentamos la cantidad del store basado en la cantidad que venga desde el metodo
    productIsset.quantity += product.quantity
    shoppingCart.value[issetIndex] = productIsset
  }

  const countItemsInCart = () => {
    const totalQuantity = shoppingCart.value.reduce((accumulated, item) => accumulated + item.quantity, 0)
    return totalQuantity
  }

  return {
    shoppingCart,
    productLimit,
    clearOrderForm,
    addNewItemToCar,
    countItemsInCart,
    handlerClearOrderForm
  }
})
