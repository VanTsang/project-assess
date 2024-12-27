import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//定义EnrollState接口，表示认证状态
interface EnrollState {
    user: {username: string, email: string} | null //用户信息，包含用户名和邮箱，或为null

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
        setUser(state, action: PayloadAction<{ username: string, email: string}>) {
            state.user = action.payload //更新user为传入的用户信息
        },
        //用户登出
        logout(state) {
            state.user = null //清空用户信息
        }
    }

})
export const { setUser, logout } = enrollSlice.actions
export default enrollSlice.reducer