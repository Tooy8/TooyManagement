import request from './request'


//公共返回类型
type PromiseRes<T = {}> = Promise<ManageResult<T>>

interface ManageResult<T> {
    code?: number,
    errno?: number,
    data: T
    // message: string
}


//登录返回类型接口
interface AdminLoginData {
    password: string
    username: string
}
interface AdminLoginRes {
    token: string
    tokenHead: string
}
interface AdminListParams {
    keyword: string;
    pageNum: number
    pageSize: number
}
//登录返回token
export const adminLoginApi = (data: AdminLoginData): PromiseRes<AdminLoginRes> => request.post('/admin/login', data)



//当前用户信息类型接口
interface AdminInfoRes {
    menus: []
}

//获取当前用户信息
export const getAdminInfoApi = (): PromiseRes<AdminInfoRes> => request.get('/admin/info')


// 获取用户数据列表
export const getAdminLists = (data: AdminListParams): PromiseRes<any> => request.get('/admin/list', { params: data })

//修改用户信息
interface AdminObjItd {
    username?: string
    nickName?: string
    email?: string
    password?: string
    note?: string
    status?: number
    id?: number
}
export const updateAdmin = (id: number, data: AdminObjItd): PromiseRes => request.post('/admin/update/' + id, data)

//获取所有角色
export const getRoleListAll = (): PromiseRes<{ name: string, id: number }[]> => request.get('/role/listAll')

// 根据id获取角色
export const getAdminRoleById = (id: number): PromiseRes<{ name: string, id: number }[]> => request.get('/admin/role/' + id)

// 分配用户角色
export const updateAdminRole = (data: { adminId: number; roleIds: string }): PromiseRes => request.post('/admin/role/update', null, { params: data })

//获取首页数据
interface indexDataItf {
    salePie: {}[],
    saleMap: {}[]

}
export const getAdminStat = (): PromiseRes<indexDataItf> => request.get('http://kumanxuan1.f3322.net:8360/admin/stat')