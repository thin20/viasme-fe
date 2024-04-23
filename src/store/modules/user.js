import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,
    isLogin: false,
    info: {
        idNhanVien: '',
        cmnd: '',
        tenNV: '',
        gioiTinh: '',
        email: '',
        sdt: '',
        avatar: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initUser: (state, user) => {
            state.info = { ...user }
            state.token = user.token
        },
        logout: (state) => {
            state.token = null
            state.isLogin = false
            state.info = {
                idNhanVien: '',
                cmnd: '',
                tenNV: '',
                gioiTinh: '',
                email: '',
                sdt: '',
                avatar: ''
            }
        }
    }
})