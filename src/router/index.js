import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Tables from '../views/Admin/Tables.vue';
import Home from '../views/HomeView.vue';
import AdminDashboard from '../views/Admin/AdminDashboard.vue';
import ManageTables from '@/views/Admin/ManageTables.vue';
import MyReservations from '@/views/MyReservations.vue';
import UserDashboard from '../views/UserDashboard.vue';
import ReservationForm from '../views/ReservationForm.vue';
const routes = [
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true }
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/my', component: UserDashboard, meta: { requiresAuth: true } },

  {
    path: '/home',
    component: Home,
  },
  {

    path: '/admin', component: AdminDashboard, meta: { requiresAuth: true, adminOnly: true },
    children: [
      { path: '/admin/manage', component: ManageTables, name: 'manage' },
      { path: '/admin/tables', component: Tables, name: 'tables' },
      { path: '/admin/users', component: () => import('@/views/Admin/Users.vue'), name: 'users' },
      { path: '/admin/reservations', component: () => import('@/views/Admin/Reservations.vue'), name: 'reservations' },
    ]



  },
  // { path: '/my', component: MyReservations },
  { path: '/reservation', component: ReservationForm },
  // { path: '/user', component: UserDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
    return
  }

  if (to.meta.adminOnly) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.role !== 'Admin') {
      next('/')
      return
    }
  }

  next()
})

export default router;