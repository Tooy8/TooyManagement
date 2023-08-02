import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'
import { MenusStore } from "../store";
import { getAdminInfoApi } from '../request/api'



const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/login.vue')
    },
    // {
    //     path: '/homepage',
    //     name: 'homepage',
    //     component: () => import('../views/homepage/homepage.vue')
    // },

]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})




//根据getters里面的菜单对象生成路由规则
const genRoutes = () => {
    let menusStore = MenusStore();
    //循环菜单对象   路由规则
    const menus: any = menusStore.getNewMenus;
    // const newRoutes: RouteRecordRaw[] = []
    for (let key in menus) {
        const newRoute: any = {
            path: '/' + menus[key].name,
            name: `${menus[key].name}`,
            component: () => import('../views/homepage/homepage.vue'),
            redirect: '/' + menus[key].name + '/' + menus[key].children[0].name,
            children: []
        }
        for (let i = 0; i < menus[key].children.length; i++) {
            newRoute.children?.push({
                path: menus[key].children[i].name,
                name: menus[key].children[i].name,
                component: () => import(`../views/${menus[key].name}/${menus[key].children[i].name}.vue`),
            })

        }
        //动态添加路由规则
        router.addRoute(newRoute)
    }
    //动态添加首页
    router.addRoute({
        path: '/',
        name: 'homepage',
        component: () => import('../views/homepage/homepage.vue'),
        redirect: '/index',
        children: [{
            path: 'index',
            name: 'index',
            component: () => import('../views/index/index.vue'),
        }]
    })
}

//前置路由守卫

router.beforeEach((to, from, next) => {
    const token = Cookies.get('token')
    let menusStore = MenusStore();
    if (token && menusStore.menus.length == 0) {
        console.log('menus为空');
        getAdminInfoApi().then(res => {
            if (res.code == 200) {
                //修改仓库数据
                menusStore.$patch(state => {
                    state.menus = res.data.menus
                })
            }
        }).then(() => {
            genRoutes()

            next(to.path)
        })

    } else if (token && menusStore.menus.length !== 0 && from.path === '/login' && to.path == '/homepage') {
        genRoutes()
        next('/index')
    }
    else if (!token && to.path !== '/login') {
        next('/login')
    }
    else if (token && to.path == '/login') { next(from) }
    else {
        next()
    }

})





export default router