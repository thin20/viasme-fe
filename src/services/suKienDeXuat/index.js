import axios from '@/utils/request'
import api from '@/services/apiRouter.js'

// Tạo mới sự kiện đề xuất
export function createSuKienDeXuat(params) {
    return axios({
        method: 'post',
        url: api.SU_KIEN_DE_XUAT_CREATE,
        data: params
    })
}

export function updateSuKienDeXuat(params) {
    return axios({
        method: 'post',
        url: api.SU_KIEN_DE_XUAT_UPDATE,
        data: params
    })
}

export function searchSuKienDeXuat(params) {
    return axios({
        method: 'post',
        url: api.SU_KIEN_DE_XUAT_SEARCH,
        data: params
    })
}

export function detailSuKienDeXuat(params) {
    return axios({
        method: 'get',
        url: api.SU_KIEN_DE_XUAT_DETAIL,
        params: params
    })
}

export function deleteSuKienDeXuat(params) {
    return axios({
        method: 'get',
        url: api.SU_KIEN_DE_XUAT_DELETE,
        params: params
    })
}
