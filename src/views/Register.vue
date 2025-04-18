<template>
    <div class="container mt-5">
        <div class="card p-4 mx-auto" style="max-width: 400px">
            <h2 class="mb-3 text-center">تسجيل</h2>
            <input type="text" class="form-control mb-2" v-model="name" placeholder="الاسم الكامل" />
            <input class="form-control mb-2" v-model="email" placeholder="البريد الإلكتروني" />
            <input class="form-control mb-3" type="password" v-model="password" placeholder="كلمة المرور" />
            <button class="btn btn-success w-100" @click="register">تسجيل</button>
            <p class="mt-3 text-center">لديك حساب؟ <router-link to="/login">تسجيل الدخول</router-link></p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const email = ref('');
const password = ref('');
const name = ref('');
const router = useRouter();

const register = async () => {
    try {
        await api.post('/auth/register', { email: email.value, password: password.value, name: name.value });
        Swal.fire('تم التسجيل بنجاح', '', 'success');
        router.push('/');
    } catch (err) {
        Swal.fire('فشل التسجيل', 'حاول مرة أخرى', 'error');
    }
};
</script>