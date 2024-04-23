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
