// import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useOrdersStore } from 'src/stores/ordersStore'

export const useOrdersContent = () => {
  // references
  const path = 'orders'
  const store = useOrdersStore()

  // methods
  const saveOrders = async (order) => {
    try {
      const { data } = await api.post(`${path}`, order, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (data.success && data.data) {
        store.handlerClearOrderForm()
        return data
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    saveOrders
  }
}
