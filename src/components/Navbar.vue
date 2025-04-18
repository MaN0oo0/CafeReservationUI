<template>
    <!-- <nav>

        <router-link to="/">الرئيسية</router-link>
        <router-link to="/reservation">حجز جديد</router-link>
        <router-link to="/admin">لوحة المسؤول</router-link>
        <button @click="logout">
            تسجيل الخروج
        </button>
    </nav> -->



    <nav class="navbar navbar-expand-lg bg-dark navbar-dark" dir="rtl">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">ترابيزة</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">

                        <router-link to="/" class="nav-link ">الرئيسية</router-link>
                    </li>
                    <li class="nav-item">

                        <router-link class="nav-link" to="/reservation">حجز جديد</router-link>

                    </li>
                    <li class="nav-item">

                        <router-link class="nav-link" to="/my">حجوزاتي</router-link>

                    </li>
                    <li class="nav-item">

                        <router-link class="nav-link" v-if="$store.getters.isAdmin" to="/admin">لوحة المسؤول</router-link>

                    </li>


                </ul>
                <div class="d-flex" role="search">
                    <ul class="navbar-nav">
                        <li class="nav-item text-end">
                            <button @click="logout" class="btn btn-primary">
                                تسجيل الخروج
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>


</template>

<script>
import { mapActions } from 'vuex'; // Import mapActions

export default {
    methods: {
        ...mapActions(['logout']), // Map Vuex action

        async logout() {
            try {
                await this.$store.dispatch('logout'); // Dispatch Vuex action
                // localStorage.removeItem('token');
                // localStorage.removeItem('user');
                this.$router.push('/login');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        }
    }
};
</script>

<style scoped>
nav {
    display: flex;
    gap: 10px;
    margin-bottom: 1rem;
}


</style>