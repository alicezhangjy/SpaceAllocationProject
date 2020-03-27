import Vue from 'vue';
import VueRouter from 'vue-router';
import Level2 from '../components/Level2.vue'
import Level1 from '../components/Level1.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'
import Dashboard from '../components/dashboard.vue'
import firebase from 'firebase'
import admin from '../components/adminview.vue'

Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        name: 'Level 1',
        path: '/level1',
        component: Level1,
        meta:{
            requireAuth: true
        }
    },
    {
        name: 'Level 2',
        path: '/level2',
        component: Level2,
        meta:{
            requireAuth: true
        }
    },
    {
        name: 'admin',
        path: '/admin',
        component: admin,
        meta:{
            requireAuth: true
        }
    }
]
});

router.beforeEach((to,from,next)=>{
    const currentUser = firebase.auth().currentUser;
    const requireAuth = to.matched.some(record => record.meta.requireAuth);

    if(requireAuth && !currentUser) next();
    else if (!requireAuth && currentUser) next();
    else next();
});
/*
router.beforeEach((to,from,next)=>{
    const name = firebase.auth().currentUser.data.displayName;
    const requireadmin = to.matched.some(record => record.meta.requireadmin);
    const check = 'tryme';
    if(requireadmin && !name==check) next('/login');
    else if (!requireadmin && name==check) next('/register');
    else next();
});
*/
export default router
