import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//定义user类型
interface User {
    username: string
    email: string
    access_token: string
}

//定义EnrollState接口，表示认证状态
interface EnrollState {
    user: User | null //用户信息，包含id、用户名、邮箱和access_token，或为null

}
//定义初始状态
const initialState: EnrollState = {
    user: null //初始状态为null,表示未登录
}

//创建slice
const enrollSlice = createSlice({
    name: 'enroll',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload //更新user为传入的用户信息
        },
        //用户登出
        clearUser(state) {
            state.user = null //清空用户信息
        }
    }

})
export const { setUser, clearUser } = enrollSlice.actions
export default enrollSlice.reducer