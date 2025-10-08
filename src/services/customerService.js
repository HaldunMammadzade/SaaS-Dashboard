import api from './api'

export const customerService = {
  async getCustomers() {
    const response = await api.get('/customers')
    return response.data
  },

  async createCustomer(customerData) {
    const response = await api.post('/customers', customerData)
    return response.data
  },

  async updateCustomer(id, customerData) {
    const response = await api.put(`/customers/${id}`, customerData)
    return response.data
  },

  async deleteCustomer(id) {
    const response = await api.delete(`/customers/${id}`)
    return response.data
  }
}
