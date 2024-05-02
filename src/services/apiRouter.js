const api = {
    // USER
    login: '/user/login',
    loginByToken: '/user/loginByToken',
    register: '/user/register',
    updateUserInfo: '/user/updateUserInfo',
    changePassword: '/user/changePassword',
    changeAvatar: '/user/changeAvatar',
    genCaptcha: '/user/genCaptcha',
    loginUserNameOrEmail: '/user/loginUserNameOrEmail',

    // SỰ KIỆN ĐỀ XUẤT
    SU_KIEN_DE_XUAT_CREATE: 'su-kien-de-xuat/create',
    SU_KIEN_DE_XUAT_UPDATE: 'su-kien-de-xuat/update',
    SU_KIEN_DE_XUAT_SEARCH: 'su-kien-de-xuat/search',
    SU_KIEN_DE_XUAT_DETAIL: 'su-kien-de-xuat/detail',
    SU_KIEN_DE_XUAT_DELETE: 'su-kien-de-xuat/delete',

    // CẤU HÌNH DANH MỤC - GLOBAL LIST DETAIL,
    GLOBALIST_DETAIL_GET_LIST_BY_GL_CODE: 'global-list-detail/get-list-by-global-list-code',
    GLOBALIST_DETAIL_GET_BY_GL_CODE_AND_VALUE: 'global-list-detail/get-by-global-list-code-and-value'

}

export default api;