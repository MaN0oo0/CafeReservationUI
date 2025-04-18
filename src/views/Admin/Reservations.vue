<template>
    <div class="container">
        <h3>الحجوزات</h3>
        <table class="table table-bordered table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>الطاولة</th>
                    <th>التاريخ</th>
                    <th>الوقت</th>
                    <th>الإجراء</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="reservation in reservations" :key="reservation.id">
                    <td>{{ reservation.table.number }}</td>
                    <td>{{ reservation.date }}</td>
                    <td>{{ reservation.time }}</td>
                    <td><button class="btn btn-success" @click="confirm(reservation.id)">تأكيد</button></td>
                </tr>
            </tbody>
        </table>
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


        const r = await api.get('/reservations/all')
        this.reservations = r.data
    },
    methods: {
        async confirm(id) {
            await api.put(`/reservations/confirm/${id}`)
            const r = this.reservations.find(x => x.id === id)
            if (r) r.status = 'تم التأكيد'
        }
    }
}
</script>