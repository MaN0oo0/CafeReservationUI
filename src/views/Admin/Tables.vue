<template>
    <div class="container mt-4">
      <h2 class="text-center mb-4">الطاولات المتاحة</h2>
      <div class="row">
        <div class="col-md-4 mb-3" v-for="table in tables" :key="table.id">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">طاولة رقم {{ table.number }}</h5>
              <p class="card-text">المقاعد: {{ table.capacity }}</p>
              <button class="btn btn-outline-primary w-100" @click="reserve(table.id)">احجز</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import api from '@/services/api'
  import Swal from 'sweetalert2';
  
  const tables = ref([]);
  
  const getTables = async () => {
    const res = await api.get('/tables');
    tables.value = res.data;
  };
  
  const reserve = async (tableId) => {
    await api.post('/reservations', { tableId });
    Swal.fire('تم الحجز بنجاح', '', 'success');
  };
  
  onMounted(getTables);
  </script>
  