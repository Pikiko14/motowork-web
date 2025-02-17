import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useStoreContent } from 'src/stores/storeContent-store'

export const useCategoriesContent = () => {
  // references
  const page = ref(1)
  const totalPages = ref(0)
  const path = 'categories'
  const categories = ref([
    {
      _id: '67619118419ac8bb5a07e970',
      name: 'URBANAS',
      icon: 'https://res.cloudinary.com/dg14xloef/image/upload/v1734447388/categories/owdzgggpindzee1ecnlv.png',
      is_active: true,
      type: 'vehicle',
      createdAt: '2024-12-17T14:56:24.213Z',
      updatedAt: '2025-01-12T18:30:06.671Z',
      count_news: 10,
      count_used: 5,
      id: '67619118419ac8bb5a07e970'
    },
    {
      _id: '676190e2419ac8bb5a07e95e',
      name: 'TODOTERRENO',
      icon: 'https://res.cloudinary.com/dg14xloef/image/upload/v1734447334/categories/rnecmpkgiwkvj4vdeiby.png',
      is_active: true,
      type: 'vehicle',
      createdAt: '2024-12-17T14:55:30.049Z',
      updatedAt: '2024-12-17T14:55:31.496Z',
      count_news: 10,
      count_used: 5,
      id: '676190e2419ac8bb5a07e95e'
    },
    {
      _id: '67619092419ac8bb5a07e958',
      name: 'SÚPER DEPORTIVAS',
      icon: 'https://res.cloudinary.com/dg14xloef/image/upload/v1734447254/categories/sptaeusgivbcjzsnohrs.png',
      is_active: true,
      type: 'vehicle',
      createdAt: '2024-12-17T14:54:10.607Z',
      updatedAt: '2024-12-17T14:54:11.688Z',
      count_news: 10,
      count_used: 5,
      id: '67619092419ac8bb5a07e958'
    },
    {
      _id: '67619030419ac8bb5a07e952',
      name: 'SPORT HERITAGE',
      icon: 'https://res.cloudinary.com/dg14xloef/image/upload/v1734447156/categories/dcgk6jjvslrapskeg1te.jpg',
      is_active: true,
      type: 'vehicle',
      createdAt: '2024-12-17T14:52:32.467Z',
      updatedAt: '2024-12-17T14:52:34.503Z',
      count_news: 10,
      count_used: 5,
      id: '67619030419ac8bb5a07e952'
    },
    {
      _id: '67618ff0419ac8bb5a07e94c',
      name: 'MOTOCROSS Y ENDURO',
      icon: 'https://res.cloudinary.com/dg14xloef/image/upload/v1734447092/categories/osrmkldqw9k7tgpypsjo.png',
      is_active: true,
      type: 'vehicle',
      createdAt: '2024-12-17T14:51:28.541Z',
      updatedAt: '2024-12-17T14:51:30.177Z',
      count_news: 10,
      count_used: 5,
      id: '67618ff0419ac8bb5a07e94c'
    },
    {
      _id: '67618fac419ac8bb5a07e946',
      name: 'DEPORTIVAS',
      icon: 'https://res.cloudinary.com/dg14xloef/image/upload/v1734447025/categories/eccjc2bjckilhyv0gto9.png',
      is_active: true,
      type: 'vehicle',
      createdAt: '2024-12-17T14:50:20.551Z',
      updatedAt: '2024-12-17T14:50:23.345Z',
      count_news: 10,
      count_used: 5,
      id: '67618fac419ac8bb5a07e946'
    }
  ])
  const categoriesMenu = ref([
    {
      _id: '675dee989736dfe3b22a776a',
      name: 'Seguridad',
      icon: 'https://res.cloudinary.com/dg14xloef/image/upload/v1736773642/categories/b0mavdiaasufisx44ijz.png',
      is_active: true,
      type: 'product',
      createdAt: '2024-12-14T20:46:16.161Z',
      updatedAt: '2025-01-13T13:06:54.640Z',
      count_news: 10,
      count_used: 5,
      id: '675dee989736dfe3b22a776a'
    },
    {
      _id: '6758745bfd00028d7cf26d4e',
      name: 'Repuestos',
      icon: 'https://res.cloudinary.com/dg14xloef/image/upload/v1736773525/categories/f1nwemhlhaavxxgn5bmu.png',
      is_active: true,
      type: 'product',
      createdAt: '2024-12-10T17:03:23.468Z',
      updatedAt: '2025-01-13T13:04:58.062Z',
      count_news: 10,
      count_used: 5,
      id: '6758745bfd00028d7cf26d4e'
    },
    {
      _id: '6758739dfd00028d7cf26d36',
      name: 'Personalización',
      icon: 'https://res.cloudinary.com/dg14xloef/image/upload/v1736773433/categories/fymc2yjmrpaqcqgblums.png',
      is_active: true,
      type: 'product',
      createdAt: '2024-12-10T17:00:13.784Z',
      updatedAt: '2025-01-13T15:20:09.724Z',
      count_news: 10,
      count_used: 5,
      id: '6758739dfd00028d7cf26d36'
    }
  ])
  const store = useStoreContent()

  // methods
  const getMenuCategories = async (query) => {
    try {
      const { data } = await api.get(`${path}/list/from-web${query}`)
      if (data.success) {
        categoriesMenu.value = data.data.categories
        totalPages.value = data.data.totalPages
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const removeOnePage = () => {
    page.value--
  }

  const addOnePage = () => {
    page.value++
  }

  const resetPage = () => {
    page.value = 1
  }

  const getCategories = async (query, append = false) => {
    try {
      const { data } = await api.get(`${path}/list/from-web${query}`)
      if (data.success) {
        if (!append) {
          categories.value = data.data.categories
        } else {
          categories.value.push(...data.data.categories)
          if (page.value === totalPages.value) {
            store.setCategories(categories.value)
          }
        }

        totalPages.value = data.data.totalPages
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    page,
    resetPage,
    totalPages,
    addOnePage,
    categories,
    removeOnePage,
    getCategories,
    categoriesMenu,
    getMenuCategories
  }
}
