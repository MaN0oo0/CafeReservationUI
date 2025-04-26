<template>
    <div class="admin">

        <h2>لوحة تحكم المسؤول</h2>
        <div class="row">
            <div class="col-md-4">
                <nav>
                    <router-link to="/admin/manage">التحكم في الطاولات</router-link>
                    <router-link to="/admin/tables"> الطاولات المتاحة</router-link>
                    <router-link to="/admin/users">إدارة المستخدمين</router-link>
                    <router-link to="/admin/reservations">إدارة الحجوزات</router-link>
                </nav>
            </div>
            <div class="col-md-8">
                <div class="container"> <router-view /></div>
            </div>
        </div>


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
        async toggleRole(user) {
            const newRole = user.role === 'Admin' ? 'User' : 'Admin'
            await api.put('/admin/role', { userId: user.id, role: newRole })
            user.role = newRole
        },
        async confirm(id) {
            await api.put(`/reservations/confirm/${id}`)
            const r = this.reservations.find(x => x.id === id)
            if (r) r.status = 'تم التأكيد'
        }
    }
}
</script>
<style scoped>
nav {
    margin: 20px 0;
    text-align: center;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    font-size: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    width: 50%;
}

nav a {
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    color:black;
    font-size: 20px;
    text-decoration: none;
    text-align: center; 
 
}
a.router-link-exact-active {
    color: white;
    background: #333;
    /* Dark text color on hover/active */
    /* background: #fff; */
    /* White background */
    /* text-decoration: underline; */
}
</style>