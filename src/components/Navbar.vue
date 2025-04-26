<template>

    <!-- Navigation bar starts here -->
    <nav>
        <!-- Website logo -->
        <div class="logo"> <i class="fa-solid fa-caret-left mx-2"></i>ترابيزة<i class="fa-solid fa-caret-right mx-2"></i></div>

        <!-- Hidden checkbox for toggling the mobile menu -->
        <input type="checkbox" id="click">

        <!-- Label for the checkbox, which is styled as a menu button (hamburger icon) -->
        <label for="click" class="menu-btn">
            <i class="fas fa-bars"></i> <!-- Font Awesome bars icon -->
        </label>

        <!-- Navigation menu items -->
        <ul>
            <!-- Active class for highlighting the current page -->
            <li >
              <label for="click">  <router-link tag="a"  to="/" class="nav-link ">الرئيسية</router-link></label>

            </li>
            <li >
                <router-link for="click" class="nav-link" to="/reservation">حجز جديد</router-link>

            </li>
            <li>
                <router-link  class="nav-link" to="/my">حجوزاتي</router-link>


            </li>
            <li>

                <router-link class="nav-link" v-if="$store.getters.isAdmin" to="/admin">لوحة المسؤول</router-link>

            </li>
            <li><button @click="logout" class="btn btn-primary">
                    تسجيل الخروج
                </button>
            </li>
        </ul>
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
<!-- 
<style scoped>
nav {
    display: flex;
    gap: 10px;
    margin-bottom: 1rem;
}


</style> -->


<style lang="css" scoped>
/* Importing Google Fonts */
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

/* Global reset: Remove default margin, padding, and set box-sizing */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    /* Using Poppins font */
}

/* Styling the navigation bar */
nav {
    display: flex;
    height: 80px;
    width: 100%;
    /* background: linear-gradient(to right, #0072ff, #6c00ff, #ff7300); */
    align-items: center;
    justify-content: space-between;
    padding: 0 50px 0 100px;
    flex-wrap: wrap;
    /* Allow wrapping in smaller screens */
}

/* Logo inside the navigation */
nav .logo {
    color: #fff;
    /* White text */
    font-size: 35px;
    font-weight: 600;
}

/* Navigation menu (unordered list) */
nav ul {
    display: flex;
    flex-wrap: wrap;
    /* Allows wrapping for smaller screens */
    list-style: none;
    /* Removes bullet points */
}

/* Each list item in the navigation */
nav ul li {
    margin: 0 5px;
}

/* Links inside the navigation items */
nav ul li a {
    color: black;
    /* Light grey text */
    text-decoration: none;
    /* Removes underline */
    font-size: 18px;
    font-weight: 500;
    padding: 8px 15px;
    /* Padding around links */
    border-radius: 5px;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    /* Smooth transition for hover effects */
}

/* Active and hover states for the links */


/* Menu button for mobile view (hidden by default) */
nav .menu-btn i {
    color: #fff;
    /* White icon */
    font-size: 22px;
    cursor: pointer;
    /* Changes cursor to pointer */
    display: none;
    /* Hidden initially */
}

/* Hides the checkbox input */
input[type="checkbox"] {
    display: none;
}

/* Media query for screens with max width of 1000px */
@media (max-width: 767px) {
    nav {
        padding: 0 40px 0 50px;
        /* Adjusts padding for smaller screens */
    }
}

/* Media query for screens with max width of 920px (Mobile view) */
@media (max-width: 920px) {

    /* Display menu button on smaller screens */
    nav .menu-btn i {
        display: block;
    }

    /* Change menu icon to 'X' when clicked */
    #click:checked~.menu-btn i:before {
        content: "\f00d";
        /* Unicode for Font Awesome's close icon */
    }

    /* Navigation menu becomes a full-screen vertical menu */
    nav ul {
        position: fixed;
        top: 80px;
        /* Start below the navigation bar */
        left: -100%;
        /* Initially hidden */
        background: #111;
        /* Dark background */
        height: 100vh;
        width: 100%;
        text-align: center;
        display: block;
        transition: all 0.3s ease;
        /* Smooth slide-in animation */
    }

    /* Slide in the menu when the checkbox is checked */
    #click:checked~ul {
        left: 0;
        /* Menu slides in from the left */
    }

    /* Full-width list items in mobile view */
    nav ul li {
        width: 100%;
        margin: 40px 0;
        /* Spacing between menu items */
    }

    /* Links expand to full width and animate into view */
    nav ul li a {
        width: 100%;
        margin-left: -100%;
        /* Hidden initially */
        display: block;
        font-size: 20px;
        transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        /* Smoother animation curve */
    }

    /* Links slide into place when the checkbox is checked */
    #click:checked~ul li a {
        margin-left: 0;
    }

    /* Hover and active states in mobile view */
    nav ul li a.active,
    nav ul li a:hover {
        background: none;
        /* Remove background */
        color: rgb(231, 247, 10);
        /* Bright yellow color on hover */
    }
}

/* Styling for the content below the navigation bar */
.content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* Center content */
    text-align: center;
    z-index: -1;
    /* Ensure it's behind the navigation */
    width: 100%;
    padding: 0 30px;
    color: #1b1b1b;
    /* Dark text */
}

/* Styling for the content divs */
.content div {
    font-size: 40px;
    /* Large text */
    font-weight: 700;
}
</style>