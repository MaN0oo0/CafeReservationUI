<template>
    <div class="my-reservations container">
        <h2>حجوزاتي</h2>
        <table class="table table-bordered">
            <thead class="">
            
                
                    <th>الطاولة</th>
                    <th>التاريخ</th>
                    <th>الوقت</th>
                    <th>الحالة</th>
                    <th>إجراء</th>
    
            </thead>
            <tbody>
                <tr v-for="r in reservations" :key="r.id">
                    <td>{{ r.table.number }}</td>
                    <td>{{ formatDateTime(r.date,'en') }}</td>
                    <td>{{ r.time }}</td>
                    <td>{{ r.status }}</td>
                    <td><button class="btn btn-sm btn-danger" @click="cancel(r.id)" >إلغاء</button></td>
                </tr>
            </tbody>

        </table>
    </div>
</template>

<script>
import api from '@/services/api'
import { formatDateTime } from '../utils/dateFormatter'
export default {
    data() {
        return {
            reservations: []
        }
    },
    setup() {
        return {
            formatDateTime
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
    },

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