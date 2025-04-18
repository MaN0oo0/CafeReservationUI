<template>
    <div class="my-reservations container">
        <h2>حجوزاتي</h2>
        <table>
            <thead>
                <tr>
                    <th>الطاولة</th>
                    <th>التاريخ</th>
                    <th>الوقت</th>
                    <th>الحالة</th>
                    <th>إجراء</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="r in reservations" :key="r.id">
                    <td>{{ r.table }}</td>
                    <td>{{ r.date }}</td>
                    <td>{{ r.time }}</td>
                    <td>{{ r.status }}</td>
                    <td><button @click="cancel(r.id)" :disabled="r.status !== 'بانتظار'">إلغاء</button></td>
                </tr>
            </tbody>

        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const reservations = ref([
    { id: 1, table: 'A1', date: '2025-04-20', time: '18:00', status: 'بانتظار' },
    { id: 2, table: 'B2', date: '2025-04-18', time: '20:00', status: 'مؤكد' }
])

const cancel = (id) => {
    console.log('إلغاء الحجز رقم:', id)
}
</script>

<style scoped>
.my-reservations {
    max-width: 700px;
    margin: auto;
    direction: rtl;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
}
</style>