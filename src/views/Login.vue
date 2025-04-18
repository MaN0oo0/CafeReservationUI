<template>
    <div class="container mt-5">
        <div class="card p-4 mx-auto" style="max-width: 400px">
            <h2 class="mb-3 text-center">تسجيل الدخول</h2>
            <input class="form-control mb-2" v-model="email" placeholder="البريد الإلكتروني" />
            <input class="form-control mb-3" type="password" v-model="password" placeholder="كلمة المرور" />
            <button class="btn btn-primary w-100" @click="login">دخول</button>
            <p class="mt-3 text-center">ليس لديك حساب؟ <router-link to="/register">تسجيل</router-link></p>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex'; // Import useStore
import api from '@/services/api';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const email = ref('');
const password = ref('');
const router = useRouter();
const store = useStore(); // Get the Vuex store

const login = async () => {
    try {
        const res = await api.post('/auth/login', { 
            email: email.value, 
            password: password.value 
        });
        
        // Use Vuex action
        store.dispatch('login', {
            token: res.data.token,
            user: res.data.user
        });
        
        Swal.fire('تم الدخول بنجاح', '', 'success');
        
        const role = res.data.user.role;
        if (role === 'Admin') {
            router.push('/admin');
        } else {
            router.push('/my');
        }
    } catch (err) {
        console.error(err);
        Swal.fire('خطأ في تسجيل الدخول', 'تحقق من البيانات', 'error');
    }
};
</script>