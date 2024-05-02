import {createAsyncThunk, createSlice, createAction} from '@reduxjs/toolkit'
import { message } from 'antd'
import { loginByToken } from '@/services/user/index.js'

export const loginByTokenAsync = createAsyncThunk(
    'user/loginByTokenAsync',
    async (token, thunkAPI) => {
        const response = await loginByToken(token)
        return response
    }
)

const initialState = {
    token: null,
    isLogin: false,
    info: {
        idTaiKhoan: '',
        hoTen: '',
        cmnd: '',
        gioiTinh: '',
        email: '',
        sdt: '',
        tenDangNhap: '',
        avatar: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initUser: (state, { payload }) => {
            const user = payload
            state.info = user
            state.token = user.token
            state.isLogin = true
        },
        logoutStore: (state) => {
            state.token = null
            state.isLogin = false
            state.info = {
                idTaiKhoan: '',
                hoTen: '',
                cmnd: '',
                gioiTinh: '',
                email: '',
                sdt: '',
                tenDangNhap: '',
                avatar: ''
            }
        },
         loginByTokenStore: async (state, { payload }) => {
            return new Promise((resolve, reject) => {
                const token = payload
                if (token) {
                    loginByToken(token).then(user => {
                        if (user) {
                            state = {
                                info: user,
                                token: user.token,
                                isLogin: true
                            }
                        } else {
                            state = {
                                token: null,
                                isLogin: false,
                                info: {
                                    idTaiKhoan: '',
                                    hoTen: '',
                                    cmnd: '',
                                    gioiTinh: '',
                                    email: '',
                                    sdt: '',
                                    tenDangNhap: '',
                                    avatar: ''
                                }
                            }
                        }
                        resolve(state)
                    }).catch((error) => {
                        console.log(error)
                        reject(error)
                    })
                } else {
                    state.token = null
                    state.isLogin = false
                    state.info = {
                        idTaiKhoan: '',
                        hoTen: '',
                        cmnd: '',
                        gioiTinh: '',
                        email: '',
                        sdt: '',
                        tenDangNhap: '',
                        avatar: ''
                    }
                    message.error('Không có token!')
                    resolve(state)
                }
            })
        }
    },
    extraReducers: (builder => {
        builder.addCase(loginByTokenAsync.fulfilled, (state, { payload }) => {
            const user = payload
            if (user) {
                state = {
                    info: user,
                    token: user.token,
                    isLogin: true
                }
            } else {
                state = {
                    token: null,
                    isLogin: false,
                    info: {
                        idTaiKhoan: '',
                        hoTen: '',
                        cmnd: '',
                        gioiTinh: '',
                        email: '',
                        sdt: '',
                        tenDangNhap: '',
                        avatar: ''
                    }
                }
            }
            console.log('state loginByTokenAsync.fulfilled: ', state)
        })
    })
})

export const { initUser, logoutStore, loginByTokenStore } = userSlice.actions

export default userSlice.reducer
