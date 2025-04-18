<template>
    <div class="dashboard">
      <h2>حجوزاتي</h2>
      <div v-if="reservations.length === 0">لا توجد حجوزات</div>
      <ul>
        <li v-for="r in reservations" :key="r.id">
          {{ r.date }} - {{ r.time }} - {{ r.status }}
          <button @click="cancel(r.id)">إلغاء</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import api from '@/services/api'
  
  export default {
    data() {
      return {
        reservations: []
      }
    },
    async mounted() {
      const res = await api.get('/reservations/my')
      this.reservations = res.data
    },
    methods: {
      async cancel(id) {
        await api.delete(`/reservations/${id}`)
        this.reservations = this.reservations.filter(r => r.id !== id)
      }
    }
  }
  </script>
  