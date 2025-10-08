import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { customerService } from '../services/customerService'
import { productService } from '../services/productService'

export const useAppStore = defineStore('app', () => {
  const sidebarOpen = ref(window.innerWidth >= 1024)
  const darkMode = ref(false)
  const searchQuery = ref('')
  
  const user = ref({
    name: 'John Smith',
    email: 'john@company.com',
    role: 'Administrator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  })

  const notificationsList = ref([
    { id: 1, title: 'New Customer', message: 'Sarah Johnson just signed up', time: '2 min ago', type: 'success' },
    { id: 2, title: 'Payment Received', message: '$2,400 from Acme Corp', time: '15 min ago', type: 'success' },
    { id: 3, title: 'Server Alert', message: 'High CPU usage detected', time: '1 hour ago', type: 'warning' },
    { id: 4, title: 'New Message', message: 'You have 3 unread messages', time: '2 hours ago', type: 'info' },
    { id: 5, title: 'Subscription Expiring', message: 'Enterprise plan expires in 7 days', time: '3 hours ago', type: 'warning' }
  ])

  const stats = ref({
    totalRevenue: 54280,
    revenueChange: 12.5,
    totalUsers: 8940,
    usersChange: 8.2,
    activeSubscriptions: 950,
    subscriptionsChange: 15.3,
    conversionRate: 3.24,
    conversionChange: -2.4
  })

  const revenueData = ref([
    { month: 'Jan', revenue: 4200, expenses: 2400, profit: 1800 },
    { month: 'Feb', revenue: 5100, expenses: 2800, profit: 2300 },
    { month: 'Mar', revenue: 4800, expenses: 2600, profit: 2200 },
    { month: 'Apr', revenue: 6200, expenses: 3200, profit: 3000 },
    { month: 'May', revenue: 7100, expenses: 3600, profit: 3500 },
    { month: 'Jun', revenue: 8400, expenses: 4100, profit: 4300 }
  ])

  const userGrowth = ref([
    { date: 'Week 1', users: 1200 },
    { date: 'Week 2', users: 1850 },
    { date: 'Week 3', users: 2400 },
    { date: 'Week 4', users: 3100 },
    { date: 'Week 5', users: 4200 },
    { date: 'Week 6', users: 5100 }
  ])

  const subscriptions = ref([
    { name: 'Basic', value: 450, color: '#3b82f6', percentage: 47 },
    { name: 'Pro', value: 320, color: '#8b5cf6', percentage: 34 },
    { name: 'Enterprise', value: 180, color: '#ec4899', percentage: 19 }
  ])

  const transactions = ref([
    { id: 1, customer: 'Acme Corp', amount: 2400, status: 'completed', date: '2025-10-07', type: 'subscription' },
    { id: 2, customer: 'TechStart Inc', amount: 1800, status: 'completed', date: '2025-10-07', type: 'subscription' },
    { id: 3, customer: 'Global Systems', amount: 3200, status: 'pending', date: '2025-10-06', type: 'upgrade' },
    { id: 4, customer: 'Innovation Labs', amount: 1500, status: 'completed', date: '2025-10-06', type: 'subscription' },
    { id: 5, customer: 'Digital Wave', amount: 2900, status: 'failed', date: '2025-10-05', type: 'renewal' },
    { id: 6, customer: 'Future Tech', amount: 4200, status: 'completed', date: '2025-10-04', type: 'upgrade' },
    { id: 7, customer: 'Smart Solutions', amount: 1200, status: 'completed', date: '2025-10-04', type: 'subscription' }
  ])

  const customers = ref([])
  const products = ref([])
  const customersLoading = ref(false)
  const productsLoading = ref(false)

  const notifications = computed(() => notificationsList.value.length)

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const clearAllNotifications = () => {
    notificationsList.value = []
  }

  const removeNotification = (id) => {
    notificationsList.value = notificationsList.value.filter(n => n.id !== id)
  }

  // Customers API
  const fetchCustomers = async () => {
    customersLoading.value = true
    try {
      const response = await customerService.getCustomers()
      customers.value = response.data
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      customersLoading.value = false
    }
  }

  const addCustomer = async (customerData) => {
    try {
      const response = await customerService.createCustomer(customerData)
      customers.value.unshift(response.data)
      
      notificationsList.value.unshift({
        id: Date.now(),
        title: 'Customer Added',
        message: `${customerData.name} has been added successfully`,
        time: 'Just now',
        type: 'success'
      })
    } catch (error) {
      console.error('Error adding customer:', error)
    }
  }

  const deleteCustomer = async (id) => {
    try {
      await customerService.deleteCustomer(id)
      const customer = customers.value.find(c => c._id === id)
      customers.value = customers.value.filter(c => c._id !== id)
      
      notificationsList.value.unshift({
        id: Date.now(),
        title: 'Customer Deleted',
        message: `${customer.name} has been removed`,
        time: 'Just now',
        type: 'info'
      })
    } catch (error) {
      console.error('Error deleting customer:', error)
    }
  }

  // Products API
  const fetchProducts = async () => {
    productsLoading.value = true
    try {
      const response = await productService.getProducts()
      products.value = response.data
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      productsLoading.value = false
    }
  }

  const addProduct = async (productData) => {
    try {
      const response = await productService.createProduct(productData)
      products.value.unshift(response.data)
      
      notificationsList.value.unshift({
        id: Date.now(),
        title: 'Product Added',
        message: `${productData.name} has been created`,
        time: 'Just now',
        type: 'success'
      })
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const deleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id)
      const product = products.value.find(p => p._id === id)
      products.value = products.value.filter(p => p._id !== id)
      
      notificationsList.value.unshift({
        id: Date.now(),
        title: 'Product Deleted',
        message: `${product.name} has been removed`,
        time: 'Just now',
        type: 'info'
      })
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const totalRevenue = computed(() => {
    return transactions.value
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  })

  const activeCustomersCount = computed(() => {
    return customers.value.filter(c => c.status === 'active').length
  })

  return {
    sidebarOpen,
    darkMode,
    notifications,
    notificationsList,
    searchQuery,
    user,
    stats,
    revenueData,
    userGrowth,
    subscriptions,
    transactions,
    customers,
    products,
    customersLoading,
    productsLoading,
    toggleSidebar,
    toggleDarkMode,
    clearAllNotifications,
    removeNotification,
    fetchCustomers,
    addCustomer,
    deleteCustomer,
    fetchProducts,
    addProduct,
    deleteProduct,
    totalRevenue,
    activeCustomersCount
  }
})
