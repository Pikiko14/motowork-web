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

  // agrega un nuevo item al carrito
  const addNewItemToCar = (product) => {
    const { variant, quantity, _id } = product

    // Busca el índice del producto (considerando variante si existe)
    const issetIndex = shoppingCart.value.findIndex(
      (item) =>
        item._id === _id && (!variant || item.variant?._id === variant._id)
    )

    const productIsset = shoppingCart.value[issetIndex] || null

    // Agrega nuevo producto si no existe
    if (!productIsset) {
      product.limit = productLimit.value
      shoppingCart.value.push(product)
      return true
    }

    const newQuantity = productIsset.quantity + quantity

    // Valida si la cantidad excede el límite
    if (newQuantity > productLimit.value) {
      notification(
        'negative',
        'No puedes agregar más unidades porque excede el límite total',
        'primary'
      )
      return false
    }

    // Actualiza la cantidad del producto existente
    shoppingCart.value[issetIndex].quantity = newQuantity
    return true
  }

  const countItemsInCart = () => {
    const totalQuantity = shoppingCart.value.reduce(
      (accumulated, item) => accumulated + item.quantity,
      0
    )
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
