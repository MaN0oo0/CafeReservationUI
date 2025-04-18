<template>
  <div class="home">
    <h2>مرحبًا {{ user?.name }}</h2>
    <div class="row">
      <div class="col-md-6">
        <label class="form-label">اختر التاريخ:</label>
        <input class="form-control" v-model="selectedDate" type="date" />
      </div>
      <div class="col-md-6">
        <label class="form-label">اختر الوقت:</label>
        <input class="form-control" v-model="time" type="time" />
      </div>
    </div>
    <h3>الطاولات المتاحة:</h3>
    <div v-if="loading" class="text-center">جاري التحميل...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <table v-else-if="tables.length > 0" class="table table-bordered table-striped">
      <thead class="thead-dark">
        <tr>
          <th>رقم</th>
          <th>السعة</th>
          <th>حجز</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="table in tables" :key="table.id">
          <td>{{ table.number }}</td>
          <td>{{ table.capacity }}</td>
          <td>
            <button class="btn btn-secondary" @click="reserve(table.id)" :disabled="!selectedDate || !time">
              احجز
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-info">لا توجد طاولات متاحة</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import Swal from 'sweetalert2';

const store = useStore();
const router = useRouter();
const selectedDate = ref('');
const time = ref('');
const tables = ref([]);
const loading = ref(false);
const error = ref(null);

// Get user from Vuex store
const user = computed(() => store.state.user);

const reserve = async (tableId) => {
  if (!selectedDate.value || !time.value) {
    Swal.fire('خطأ', 'الرجاء اختيار التاريخ والوقت', 'error');
    return;
  }

  try {
    loading.value = true;
    const res = await api.post('/reservations', {
      tableId: tableId,
      date: selectedDate.value,
      time: time.value
    });

    if (res.status === 200) {
      await Swal.fire('نجاح', 'تم الحجز بنجاح', 'success');
      // Refresh tables after reservation
      await getTables();
    }
  } catch (err) {
    console.error('Error reserving table:', err);
    Swal.fire('خطأ', err.response?.data?.message || 'حدث خطأ أثناء الحجز', 'error');
  } finally {
    loading.value = false;
  }
};

const getTables = async () => {
  try {
    loading.value = true;
    error.value = null;
    const res = await api.get('/tables');
    tables.value = res.data;
  } catch (err) {
    console.error('Error fetching tables:', err);
    error.value = err.response?.data?.message || 'حدث خطأ أثناء جلب البيانات';
  } finally {
    loading.value = false;
  }
};

// Fetch tables when component mounts
onMounted(() => {
  getTables();
});
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: auto;
  direction: rtl;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #f8f9fa;
}

.alert {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.text-center {
  text-align: center;
  padding: 20px;
}
</style>