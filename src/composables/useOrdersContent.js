// import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { LocalStorage } from 'quasar'
import { useOrdersStore } from 'src/stores/ordersStore'

export const useOrdersContent = () => {
  // references
  const path = 'orders'
  const store = useOrdersStore()

  // methods
  const saveOrders = async (order) => {
    try {
      if (order.client && order.client.state) {
        LocalStorage.removeItem('client')
        LocalStorage.setItem('client', JSON.stringify(order.client))
      }
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

  const payOrder = async (obj) => {
    try {
      const { data } = await api.post(`${path}/${obj.order_id}/init-payment`, obj, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (data.success && data.data) {
        store.setFinishDataOrder(data.data)
        return data
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const loadOrderData = async (id) => {
    try {
      const { data } = await api.get(`${path}/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (data.success && data.data) {
        store.setFinishDataOrder(data.data)
        return data
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    payOrder,
    saveOrders,
    loadOrderData
  }
}
