import { ref } from 'vue'
import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { notification } from 'src/boot/notification'

export const useOrdersStore = defineStore('ordersStore', () => {
  const productLimit = ref(3) // sacar del api del software de facturación
  const conveyorSelected = ref('')
  const clearOrderForm = ref(false)
  const shippingMethodSelected = ref('')
  const shoppingCart = ref(LocalStorage.getItem('cart_items') ? JSON.parse(LocalStorage.getItem('cart_items') || []) : [])

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
      validateCartInStorage()
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
    validateCartInStorage()
    return true
  }

  const countItemsInCart = () => {
    const totalQuantity = shoppingCart.value.reduce(
      (accumulated, item) => accumulated + item.quantity,
      0
    )
    return totalQuantity
  }

  // guarda el carrito en la sesion storage
  const validateCartInStorage = () => {
    if (LocalStorage.getItem('cart_items')) {
      LocalStorage.removeItem('cart_items')
    }

    LocalStorage.setItem('cart_items', JSON.stringify(shoppingCart.value))
  }

  // remuevo una unida desde el carrito
  const removeQuantity = (idx) => {
    const product = shoppingCart.value[idx]
    if (product && product.quantity > 1) {
      product.quantity--
      shoppingCart.value[idx] = product
    }
    calculateTotalInCart()
  }

  // agrego una unidad desde el carrito
  const addQuantity = (idx) => {
    const product = shoppingCart.value[idx]
    if (product && product.quantity < product.limit) {
      product.quantity++
      shoppingCart.value[idx] = product
    }
    calculateTotalInCart()
  }

  // recalculate total
  const calculateTotalInCart = () => {
    shoppingCart.value = shoppingCart.value.map((item) => {
      // calculate total
      const total = (item.quantity * item.purchasePrice)
      item.total = total.toFixed(2)

      // return item
      return item
    })
    validateCartInStorage()
  }

  // delete items in cart
  const deleteItemInCart = (idx) => {
    shoppingCart.value.splice(idx, 1)
    validateCartInStorage()
  }

  const setShippingMethod = (e) => {
    shippingMethodSelected.value = e
  }

  const setConveyor = (e) => {
    conveyorSelected.value = e
  }

  return {
    setConveyor,
    addQuantity,
    shoppingCart,
    productLimit,
    removeQuantity,
    clearOrderForm,
    addNewItemToCar,
    conveyorSelected,
    countItemsInCart,
    deleteItemInCart,
    setShippingMethod,
    handlerClearOrderForm,
    shippingMethodSelected
  }
})
