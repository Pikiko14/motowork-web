import { ref } from "vue";
import { api } from "src/boot/axios";
import { useStoreContent } from "src/stores/storeContent-store";

export const useCategoriesContent = () => {
  // references
  const page = ref(1);
  const totalPages = ref(0);
  const path = "categories";
  // Categorías ordenadas alfabéticamente
  const sortedCategories = [
    {
      _id: "67619118419ac8bb5a07e970",
      name: "URBANAS",
      icon: "https://res.cloudinary.com/dg14xloef/image/upload/v1763696919/categories/yumcmmkguu8cwrxagi1d.png",
      is_active: true,
      type: "vehicle",
      createdAt: "2024-12-17T14:56:24.213Z",
      updatedAt: "2025-11-21T03:48:40.197Z",
      count_news: 10,
      count_used: 5,
      id: "67619118419ac8bb5a07e970",
    },
    {
      _id: "676190e2419ac8bb5a07e95e",
      name: "TODOTERRENO",
      icon: "https://res.cloudinary.com/dg14xloef/image/upload/v1763697177/categories/tjfgnodwrjfzuaumkbkt.png",
      is_active: true,
      type: "vehicle",
      createdAt: "2024-12-17T14:55:30.049Z",
      updatedAt: "2025-11-21T03:52:57.737Z",
      count_news: 10,
      count_used: 5,
      id: "676190e2419ac8bb5a07e95e",
    },
    {
      _id: "67619092419ac8bb5a07e958",
      name: "SÚPER DEPORTIVAS",
      icon: "https://res.cloudinary.com/dg14xloef/image/upload/v1763697185/categories/qlfbxdb8pjvfb3a2tc1q.png",
      is_active: true,
      type: "vehicle",
      createdAt: "2024-12-17T14:54:10.607Z",
      updatedAt: "2025-11-21T03:53:06.292Z",
      count_news: 10,
      count_used: 5,
      id: "67619092419ac8bb5a07e958",
    },
    {
      _id: "67619030419ac8bb5a07e952",
      name: "SPORT HERITAGE",
      icon: "https://res.cloudinary.com/dg14xloef/image/upload/v1763700903/categories/zqwppineflgybi2s5p3q.png",
      is_active: true,
      type: "vehicle",
      createdAt: "2024-12-17T14:52:32.467Z",
      updatedAt: "2025-11-21T04:55:04.349Z",
      count_news: 10,
      count_used: 5,
      id: "67619030419ac8bb5a07e952",
    },
    {
      _id: "67618ff0419ac8bb5a07e94c",
      name: "MOTOCROSS Y ENDURO",
      icon: "https://res.cloudinary.com/dg14xloef/image/upload/v1763697200/categories/rbmn95xvfyvsc0avl9mq.png",
      is_active: true,
      type: "vehicle",
      createdAt: "2024-12-17T14:51:28.541Z",
      updatedAt: "2025-11-21T03:53:20.473Z",
      count_news: 10,
      count_used: 5,
      id: "67618ff0419ac8bb5a07e94c",
    },
    {
      _id: "67618fac419ac8bb5a07e946",
      name: "DEPORTIVAS",
      icon: "https://res.cloudinary.com/dg14xloef/image/upload/v1763697255/categories/wyumqkjhjooeua1zjhbr.png",
      is_active: true,
      type: "vehicle",
      createdAt: "2024-12-17T14:50:20.551Z",
      updatedAt: "2025-11-21T03:54:16.648Z",
      count_news: 10,
      count_used: 5,
      id: "67618fac419ac8bb5a07e946",
    },
    {
      _id: "67618f35419ac8bb5a07e940",
      name: "CUATRIMOTOS",
      icon: "https://res.cloudinary.com/dg14xloef/image/upload/v1763697209/categories/nlihypunla0tof9w9ng7.png",
      is_active: true,
      type: "vehicle",
      createdAt: "2024-12-17T14:48:21.962Z",
      updatedAt: "2025-11-21T03:53:30.228Z",
      count_news: 10,
      count_used: 5,
      id: "67618f35419ac8bb5a07e940",
    },
    {
      _id: "67618ed8419ac8bb5a07e93a",
      name: "AUTOMÁTICAS Y SEMIAUTOMÁTICAS",
      icon: "https://res.cloudinary.com/dg14xloef/image/upload/v1763697260/categories/ic8ksxypdvy9ehbog49i.png",
      is_active: true,
      type: "vehicle",
      createdAt: "2024-12-17T14:46:48.297Z",
      updatedAt: "2025-11-21T03:54:21.510Z",
      count_news: 10,
      count_used: 5,
      id: "67618ed8419ac8bb5a07e93a",
    },
    {
      _id: "67618e81419ac8bb5a07e934",
      name: "ADVENTURE",
      icon: "https://res.cloudinary.com/dg14xloef/image/upload/v1763697266/categories/lxygprish3ez5kkbkzhu.png",
      is_active: true,
      type: "vehicle",
      createdAt: "2024-12-17T14:45:21.251Z",
      updatedAt: "2025-11-21T03:54:26.796Z",
      count_news: 10,
      count_used: 5,
      id: "67618e81419ac8bb5a07e934",
    },
  ];

  // Reordenar para que la primera categoría (ADVENTURE) quede en el medio
  // Con 9 categorías, la posición media es la 5 (índice 4)
  const firstCategory = sortedCategories[0];
  const middleIndex = Math.floor(sortedCategories.length / 2);
  const reorderedCategories = [
    ...sortedCategories.slice(middleIndex + 1), // Categorías después del medio: [F, G, H, I]
    firstCategory, // Primera categoría en el medio: [A]
    ...sortedCategories.slice(1, middleIndex + 1), // Categorías antes del medio: [B, C, D, E]
  ];

  const categories = ref(reorderedCategories);
  const categoriesMenu = ref([]);
  const store = useStoreContent();

  // methods
  const getMenuCategories = async (query) => {
    try {
      const { data } = await api.get(`${path}/list/from-web${query}`);
      if (data.success) {
        categoriesMenu.value = data.data.categories;
        totalPages.value = data.data.totalPages;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const removeOnePage = () => {
    page.value--;
  };

  const addOnePage = () => {
    page.value++;
  };

  const resetPage = () => {
    page.value = 1;
  };

  const getCategories = async (query, append = false) => {
    try {
      const { data } = await api.get(`${path}/list/from-web${query}`);
      if (data.success) {
        if (!append) {
          categories.value = data.data.categories;
        } else {
          categories.value.push(...data.data.categories);
          if (page.value === totalPages.value) {
            store.setCategories(categories.value);
          }
        }

        totalPages.value = data.data.totalPages;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    page,
    resetPage,
    totalPages,
    addOnePage,
    categories,
    removeOnePage,
    getCategories,
    categoriesMenu,
    getMenuCategories,
  };
};
