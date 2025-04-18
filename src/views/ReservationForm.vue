<template>
    <div class="form">
      <h2>تفاصيل الحجز</h2>
      <label>اختر الوقت:</label>
      <input v-model="time" type="time" required />
      <p>الطاولة رقم: {{ tableNumber }}</p>
      <button @click="confirm">تأكيد الحجز</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  
  const time = ref('')
  const route = useRoute()
  const tableNumber = route.params.tableNumber || 'غير معروف'
  
  const confirm = () => {
    console.log(`تم الحجز للطاولة ${tableNumber} في الساعة ${time.value}`)
  }
  </script>
  
  <style scoped>
  .form {
    max-width: 300px;
    margin: auto;
    text-align: right;
    direction: rtl;
  }
  input {
    display: block;
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }
  button {
    width: 100%;
    padding: 10px;
  }
  </style>
  