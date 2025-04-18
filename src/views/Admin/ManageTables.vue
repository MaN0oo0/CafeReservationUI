<template>
  <div class="tables">
    <h2>إدارة الطاولات</h2>

    <form class="form-control" @submit.prevent="addTable">
      <input class="form-control" v-model="number" placeholder="رقم الطاولة" required />
      <input class="form-control" v-model.number="capacity" type="number" placeholder="السعة" required />
      <button type="submit" class="btn btn-outline-success">إضافة طاولة</button>
    </form>

    <table v-if="tables.length > 0" class="table table-bordered table-striped">
      <thead class="thead-dark">
        <tr>
          <th>رقم الطاولة</th>
          <th>السعة</th>
          <th>إجراءات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in tables" :key="t.id">
          <td>{{ t.number }}</td>
          <td>{{ t.capacity }}</td>
          <td><button class="btn btn-danger" @click="remove(t.id)">حذف</button></td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-info">لا توجد طاولات متاحة</div>
  </div>
</template>

<script setup>
import { ref ,onMounted} from 'vue'
import api from '@/services/api'
import Swal from 'sweetalert2';
const number = ref('')
const capacity = ref(1)
const tables = ref([])

const addTable = async () => {

  var res = await api.post('/tables', { number: number.value, capacity: capacity.value })
  if (res.status !== 200) {

    Swal.fire({
      icon: 'error',
      title: 'خطأ',
      text: 'الرجاء التحقق من البيانات المدخلة!',
    })
    return
  } else {

    Swal.fire({
      icon: 'success',
      title: 'نجاح',
      text: 'تم إضافة الطاولة بنجاح!',
    })

    const newId = tables.value.length + 1
    tables.value.push({ id: newId, number: number.value, capacity: capacity.value })
    number.value = ''
    capacity.value = 1
  }


}
const getTables = async () => {
  const res = await api.get('/tables')
  tables.value = res.data
}

const remove = (id) => {
  tables.value = tables.value.filter(t => t.id !== id)
}
onMounted(() => {
  getTables();
});
</script>

<style scoped>
.tables {
  max-width: 600px;
  margin: auto;
  direction: rtl;
}

form {
  margin-bottom: 20px;
}

input {
  padding: 8px;
  margin: 5px 0;
  width: 100%;
}

button {
  padding: 8px 12px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}
</style>