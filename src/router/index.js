import Vue from 'vue';
import VueRouter from 'vue-router';
import Level2 from '../components/Level2.vue'
import Level1 from '../components/Level1.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../components/Dashboard.vue'
import firebase from 'firebase'

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
    }
]
});

router.beforeEach((to,from,next)=>{
    const currentUser = firebase.auth().currentUser;
    const requireAuth = to.matched.some(record => record.meta.requireAuth);

    if(requireAuth && !currentUser) next('/');
    else if (!requireAuth && currentUser) next('/');
    else next();
});


export default router

