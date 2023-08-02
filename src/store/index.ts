import { defineStore } from "pinia"



//用户信息
interface MenusObj {
    id: number;
    parentId: number;
    title: String;
    hidden: number;
    name: String;
    children?: MenusObj[]
}
interface NewMenus {
    [key: number]: MenusObj

}

export const MenusStore = defineStore('menus', {
    state: () => {
        return {
            menus: [] as MenusObj[]

        }
    },
    getters: {
        getNewMenus(state): NewMenus {
            const newMenus: NewMenus = {}
            //获取旧菜单
            const menus = state.menus
            for (let i = 0; i < menus.length; i++) {
                if (menus[i].parentId === 0) {
                    //一级菜单
                    newMenus[menus[i].id] = { ...menus[i], children: newMenus[menus[i].id]?.children || [] }
                } else {
                    //二级菜单
                    let parentId = menus[i].parentId
                    newMenus[parentId] = newMenus[parentId] || {}
                    newMenus[parentId].children = newMenus[parentId].children || []
                    newMenus[parentId].children?.push(menus[i])
                }
            }

            return newMenus
        }
    },
    actions: {}
})