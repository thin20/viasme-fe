import axios from '@/utils/request'
import api from '@/services/apiRouter.js'

export function getListByGlobalListCode(params) {
    return axios({
        method: 'get',
        url: api.GLOBALIST_DETAIL_GET_LIST_BY_GL_CODE,
        params: params
    })
}

export function getByGlobalListCodeAndValue(params) {
    return axios({
        method: 'get',
        url: api.GLOBALIST_DETAIL_GET_BY_GL_CODE_AND_VALUE,
        params: params
    })
}
