import dayjs from 'dayjs';
import { API_ERROR_STATUSES } from '@/constants/appConstants.ts'

export const getQueryParameters = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
      '"}'
  )
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}

export function scorePassword(pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1
    score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass)
  }

  let variationCount = 0
  for (const check in variations) {
    variationCount += variations[check] === true ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return score
}

export const firstLetterIsUpperCase = function (str) {
  const reg = /^[A-Z][A-z0-9]*$/
  return reg.test(str)
}

export const separator = ';'

export const divisionStringToArray = (string, customSeparator) => {
  return string ? string.split(customSeparator || separator) : []
}

export function handlePaginationData({ body }) {
  if (body) {
    return {
      total: (body['pageable'] && body['pageable']['offset']) || 0
    }
  }
  return {}
}

/**
 * @rule:
 * Quy tắc encode password:
 *  - Input: raw password
 *   B1: encode raw password theo base64
 *   B2: get date hiện tại theo fomat "yyyyMMddhhmmss", ví dụ: 20220622085112(giải nghĩa: 2022/06/22 08:51:12)
 *   B3: encode date vừa get được theo base64
 *   B4: cộng chuỗi giá trị ở B1 và B3
 *   B5: encode chuỗi giá trị ở B4 theo kiểu base64
 * @use: sử dụng để mã hóa mật khẩu
 * @param password
 * @return: string (mật khẩu đã mã hóa base64)
 */
export function encodePassword(password) {
  const encodePassword = btoa(password) // step one
  const currentTime = btoa(dayjs().format('YYYYMMDDhhmmss'))
  return btoa(encodePassword + currentTime)
}

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export function getBase64WithCallbackFn(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

// export const sitUrl = 'xxxxx'
// export const isDev = import.meta.env.DEV
// export const baseAuthURL = window.globalConfig.VITE_AUTH_API_URL
// export const baseAppURL = window.globalConfig.VITE_APP_API_URL
// export const baseSysURL = window.globalConfig.VITE_SYS_API_URL
// export const baseReportURL = window.globalConfig.VITE_REPORT_API_URL
// export const baseVOfficeUrl = window.globalConfig.VITE_VOFFICE_API_URL

/**
Hàm dùng format giá trị input dang 1,000,000
*/
export function formatPriceNotZero(value) {
  if (value) {
    const val = value.toFixed(0).replace(',', '.')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return '0'
}

/**
 Hàm dùng trimspace giá trị trong ô input
 */
export function trimSpace(obj) {
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') {
      obj[k] = v.trim()
    } else if (typeof v === 'object') {
    }
  }
}
export function customParam(filter, pagination) {
  return {
    ...filter,
    ...{
      page: pagination.current - 1,
      size: pagination.pageSize
    }
  }
}
export function getPagination(pagination, pageMeta) {
  return {
    ...pagination,
    ...{ total: pageMeta.total_elements || 0 }
  }
}
/**
 * @use: removeDom
 * @return: void
 * @param id
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  const elementId = document.getElementById(id)
  if (elementId) {
    setTimeout(() => {
      document.body.removeChild(elementId)
    }, timeout)
  }
  return
}

/**
 * @use: remove utf8
 * @return: string
 * @param value
 */
export function removeUtf8(val) {
  let str = String(val)
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/[!@%^*()+=<>?/,.:;'"&#[\]~$_`\-{}|\\]/g, ' ')
  str = str.replace(/ + /g, ' ')
  str = str.trim()
  return str
}

export function removeUtf8Vowel(val) {
  let str = String(val)
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.trim()
  return str
}

export function hasMenuPermission(permission) {
  const permissions = ls.get(PERMISSION)
  return permissions && permissions.includes(permission)
}

/**
 * @use: download base64 file
 * @return: Promise
 * @param base64
 * @param contentType
 * @param fileName
 */
export function saveFileBase64(
  base64,
  contentType,
  fileName
) {
  const linkSource = `${contentType},${base64}`
  const a = document.createElement('a')
  a.href = linkSource
  a.download = fileName
  a.click()
  return Promise.resolve(true)
}

/**
 * @use: merge pagination
 * @return: PAGINATION
 * @param pagination
 * @param bodyRes
 */
export function mergePagination(pagination, bodyRes) {
  return bodyRes
    ? {
        ...pagination,
        pages: bodyRes.totalPage || 0,
        total: bodyRes.totalRecord || 0
      }
    : pagination
}

/**
 * @use: strip HTML tags from string
 * @return: String
 * @param strInputCode
 */
export function stripHtmlTag(strInputCode) {
  return strInputCode ? strInputCode.replace(/<\/?[^>]+(>|$)/g, '') : ''
}

/**
 * @use: Encode Special Character
 * @return: String
 * @param strInput
 */
export function encodeSpecialCharacter(strInput) {
  if (!strInput) return ''

  // Replace "\" -> "\\\\"
  strInput = strInput.replace(/\\/g, '\\\\\\\\')
  // Replace "%" -> "\\%"
  strInput = strInput.replace(/%/g, '\\\\%')
  // Replace "_" -> "\\_"
  strInput = strInput.replace(/_/g, '\\\\_')

  return strInput
}

/**
 * @use: Format Number From Float String
 * @return: Number
 * @param floatString
 */
export function formatNumberFromFloatString(floatString) {
  if (!floatString) return 0
  if (/,$/.test(floatString)) {
    floatString = floatString.substring(0, floatString.length - 1)
  } else if (/,0$/.test(floatString)) {
    floatString = floatString.substring(0, floatString.length - 2)
  }
  return Number(floatString)
}

/**
 * @use: Convert MB To Byte
 * @return: Number
 * @param value
 */
export function convertMBToByte(value) {
  if (isNaN(value)) return 0
  return Number(value) * 1024 * 1024
}

/**
 * @use: encode newline char
 * @return: String
 * @param strInput
 */
export function encodeNewlineChar(strInput) {
  return strInput ? strInput.replace(/\n/g, '\\n') : ''
}

/**
 * @use: decode newline char
 * @return: String
 * @param strInput
 */
export function decodeNewlineChar(strInput) {
  return strInput ? strInput.replace(/\\n/g, '\n') : ''
}

/**
 * @use: encode special char
 * @return: String
 * @param strInput
 */
export function encodeSpecialChar(strInput) {
  return strInput ? encodeURIComponent(strInput) : ''
}

export function downloadBlob(data, contentType, fileName) {
  const blob = new Blob([data], { type: contentType })

  // Tạo URL đại diện cho blob
  const url = window.URL.createObjectURL(blob)

  // Tạo một phần tử a ẩn và thiết lập thuộc tính href thành URL của blob
  const link = document.createElement('a')
  link.href = url
  link.download = fileName

  // Kích hoạt sự kiện nhấp chuột trên phần tử a ẩn
  link.click()

  // Giải phóng URL và xóa phần tử a
  URL.revokeObjectURL(url)
  link.remove()
}

/**
 * Get px String
 */

export function displayTextWidth(text) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = '14px Inter'
  const metrics = context.measureText(text)
  return metrics.width
}

export function getTableRowIndex(pageSize, currentPage, rowIndex) {
  if (currentPage === 0) {
    currentPage = 1
  }
  return (currentPage - 1) * pageSize + rowIndex + 1
}

export function mergePaginationViasm(pagination, bodyRes) {
  return bodyRes
      ? {
        ...pagination,
        pages: bodyRes.totalPages || 0,
        total: bodyRes.numberOfElements || 0
      }
      : pagination
}

export function handleApiError (err) {
  if (API_ERROR_STATUSES.indexOf(err.response.status) !== -1) {
    if (err.response.data.message) {
      return err.response.data.message
    } else if (err.response.data.error_description) {
      return (err.response.data.error_description)
    }
  }
  return err.message
}
