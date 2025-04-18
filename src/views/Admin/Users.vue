<template>
    <div class="container">
        <h3>المستخدمين</h3>
        <table class="table table-bordered table-striped">
            <thead class="thead-dark">

                <tr>
                    <th>البريد الإلكتروني</th>
                    <th>الدور</th>
                    <th>الإجراء</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                        <div class="form-group">
                            <select v-model="user.role" @change="toggleRole(user)" class="form-control">
                                <option value="Admin">مدير</option>
                                <option value="User">مستخدم</option>
                            </select>
                            <button @click="removeUser(user.id)">حذف</button>
                        </div>
                    </td>
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
            users: [],
            reservations: []
        }
    },
    async mounted() {
        const u = await api.get('/admin/users')
        this.users = u.data


    },
    methods: {
        async toggleRole(user) {
            console.log(user.role);


            await api.put('/admin/role', { userId: user.id, role: user.role })
        
        },
        async confirm(id) {
            await api.put(`/reservations/confirm/${id}`)
            const r = this.reservations.find(x => x.id === id)
            if (r) r.status = 'تم التأكيد'
        },
        async removeUser(id) {
            await api.delete(`/admin/users/${id}`)
            this.users = this.users.filter(user => user.id !== id)
        }
    }
}
</script>