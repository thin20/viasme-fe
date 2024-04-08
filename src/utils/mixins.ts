import GLOBAL_LIST from '@/constants/globalList'
import dayjs from 'dayjs'
import { removeUtf8Vowel } from '@/utils/util'
import store from '@/store'
import { isSuperAdmin } from '@/utils/auth'
import { useRoute } from 'vue-router'
import { forEach } from 'lodash-es'
import { h, ref } from 'vue'
import { isDesktop, isTablet, isMobile } from '@/utils/device'

interface Province {
  provinceCode: string
  provinceName: string
}
import 'dayjs/locale/en'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  weekStart: 6
})
import { Rule } from 'async-validator'
import moment from 'moment'

const mixin = {
  data() {
    return {
      GLOBAL_LIST
    }
  },
  methods: {
    /**
     *
     * @param pageSize
     * @param currentPage
     * @param rowIndex
     */
    getTableRowIndex(pageSize: number, currentPage: number, rowIndex: number): number {
      if (currentPage === 0) {
        currentPage = 1
      }
      return (currentPage - 1) * pageSize + rowIndex + 1
    },
    /**
     *
     * @param body // response
     * @return totalData
     */
    handlePaginationData(body: { page_meta: { total_elements: number } }): {
      total?: number
    } {
      if (body) {
        return { total: body.page_meta.total_elements }
      } else {
        return {}
      }
    },
    /**
     * kiểm tra có phải là mảng hay không
     * @param arr
     * @returns {boolean}
     * @createBy: chiempt
     */
    checkArray(arr: string[]): boolean {
      return !!(arr && Array.isArray(arr))
    },
    /**
     * kiểm tra có phải là mảng hay không, và check mảng có ít nhất 1 phần tử
     * @param arr
     * @returns {boolean}
     */
    checkArrayExist(arr): boolean {
      return !!(arr && Array.isArray(arr) && arr.length)
    },
    /**
     * Lấy tên của globallist theo mã
     * @param arr
     * @param value
     * @param keyName
     * @param name
     * @return value: Tên
     */
    getText(arr: Array<never>, value: string, keyName: string, name: string): string {
      if (this.checkArrayExist(arr) && value) {
        for (const arrElement of arr) {
          if (arrElement && arrElement[keyName] === value) {
            return arrElement[name]
          }
        }
      }
      return ''
    },
    getLocationNameByCode(arr: Array<Province>, code: string): string {
      if (this.checkArrayExist(arr) && code) {
        for (const arrElement of arr) {
          if (arrElement && arrElement.provinceCode === code) {
            return arrElement.provinceName
          }
        }
      }
      return ''
    },
    /**
     * @use: convert tiền sang định dạng việt nam
     * @return: string // số tiền được convert
     * @param value
     */
    formatMoney(value: number | string, toFixed = 0): string | number {
      if (value) {
        const val = Number(value).toFixed(toFixed).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      } else if (value === 0 || value === '0') {
        return 0
      }
      return ''
    },
    formatCurrency(value: number | string): string | number {
      if (!value) {
        return '0'
      }
      const val = String(value).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    formatFloat(value: number | string, digits: number): string | number {
      if (!value) {
        return '0,00'
      }
      return Number.parseFloat(String(value))
        .toFixed(digits)
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    formatDate(date: string, formatOutput: string, formatInput?: string): string {
      if (date) {
        const formatOutputType = formatOutput || 'DD/MM/YYYY'
        const formatInputType = formatInput || 'YYYY-MM-DD HH:mm:ss'
        return dayjs(date, formatInputType).format(formatOutputType)
      }
      return ''
    },
    filterSelectOption(inputValue, option) {
      const txt = removeUtf8Vowel(inputValue.toLowerCase())
      let result = false
      for (const property in option) {
        if (
          option[property] &&
          typeof option[property] === 'string' &&
          removeUtf8Vowel(option[property]).indexOf(txt) >= 0
        ) {
          result = true
          break
        }
      }
      return result
    },
    filterSelectOptionField: function (inputValue, option, fields?: [string, Array<string>]) {
      const txt = removeUtf8Vowel(inputValue.toLowerCase())
      let listField: Array<string> = []
      let result = false
      if (!!fields) {
        if (typeof fields === 'string') {
          listField = [fields]
        } else if (Array.isArray(fields)) {
          listField = [...fields]
        }
        listField.forEach((field) => {
          if (
            option[field] &&
            removeUtf8Vowel(String(option[field]).toLocaleLowerCase()).indexOf(txt) >= 0
          ) {
            result = true
            return
          }
        })
      } else {
        for (const property in option) {
          if (option[property] && removeUtf8Vowel(String(option[property])).indexOf(txt) >= 0) {
            result = true
            break
          }
        }
      }
      return result
    },
    hasAction(action: string) {
      const route = useRoute()
      const uri = route.name + '_' + action
      return (
        isSuperAdmin() || (store.getters.permissions && store.getters.permissions.includes(uri))
      )
    },
    stripHtmlTag(strInputCode: string): string {
      return strInputCode ? strInputCode.replace(/<\/?[^>]+(>|$)/g, '') : ''
    },
    stripScriptTag(strInputCode: string): string {
      return strInputCode
        ? strInputCode.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        : ''
    },

    customTitleModal(titleBefore: string, titleBold: string, titleAfter: string) {
      return h('div', { class: 'custom-modal-title' }, [
        `${titleBefore} `,
        h('span', { class: 'custom-title-bold' }, titleBold),
        ` ${titleAfter}`
      ])
    },

    customMonthCellRender(date) {
      const monthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
      const customClass = 'ant-picker-cell-inner'
      const cell = h(
        'div',
        {
          class: [customClass]
        },
        monthNames[date.current.month()]
      )
      return cell
    },

    handlePressEnter(formFilter, key, callback) {
      if (key) {
        formFilter[key] = String(formFilter[key]).trim()
      }
      callback()
    },

    handleInputKeyDown(e, callback) {
      if (e.key === 'Enter') {
        callback()
      }
    },

    isDateAfter(_rule: Rule, toDate, fromDate, fromDateLabel, toDateLabel, dateFormat) {
      if (toDate) {
        const mFromDate = moment(fromDate, dateFormat).format('YYYY-MM-DD HH:mm')
        const mToDate = moment(toDate, dateFormat).format('YYYY-MM-DD HH:mm')
        if (moment(mToDate).isSameOrBefore(moment(mFromDate))) {
          return Promise.reject(`${toDateLabel} phải lớn hơn ${fromDateLabel}`)
        }
        return Promise.resolve()
      } else {
        return Promise.resolve()
      }
    },

    isDateBefore(_rule: Rule, fromDate, toDate, fromDateLabel, toDateLabel, dateFormat) {
      if (fromDate) {
        const mFromDate = moment(fromDate, dateFormat).format('YYYY-MM-DD HH:mm')
        const mToDate = moment(toDate, dateFormat).format('YYYY-MM-DD HH:mm')
        if (moment(mFromDate).isSameOrAfter(moment(mToDate))) {
          return Promise.reject(`${fromDateLabel} phải nhỏ hơn ${toDateLabel}`)
        }
        return Promise.resolve()
      } else {
        return Promise.resolve()
      }
    },
    getStatusBadge(status: string) {
      const titleColor = {
        '1': 'bg-teal',
        '2': 'bg-green',
        '3': 'bg-yellow',
        '4': 'bg-red'
      }
      return `status-badge ${titleColor[status]}-400`
    },
    getStatusBadgeV2(status: string) {
      const titleColor = {
        '1': 'bg-gray',
        '2': 'bg-blue',
        '3': 'bg-red',
        '4': 'bg-little-green'
      }
      return `status-badge ${titleColor[status]}-400`
    }
  },
  computed: {
    device() {
      return {
        desktop: isDesktop.value,
        tablet: isTablet.value,
        mobile: isMobile.value
      }
    }
  }
}
export default mixin
