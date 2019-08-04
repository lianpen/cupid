/*
 * @Author: lianpen
 * @Date:   2018-03-29 11:26:31
 * @Last Modified by: xiechaochao
 * @Last Modified time: 2018-05-30 11:13:33
 */

/**
 * 时间工具
 */

const module = {
    /**
     * 时间格式化
     */
    format: (date, format) => {
        var rules = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "D+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds()
        }
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
        }
        for (var key in rules) {
            if (new RegExp("(" + key + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? rules[key] : ("00" + rules[key]).substr(("" + rules[key]).length))
            }
        }
        return format
    },

    /** 
     * 把时间戳转换为年月日时分秒
     */
    timestampToTime: (timestamp) => {
        if (timestamp == null || timestamp.length) return null
        //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var date = timestamp.length == 10 ? new Date(timestamp * 1000) : new Date(timestamp)
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return Y + M + D + h + m;
    },

    /**
     * 获取下个月的第一天
     * 如果传入参数就选择传入的月份，如果没传默认当月
     */
    getFirstDayAtNextMonth: (num) => {
        var now = new Date()
        var year = now.getFullYear()
        var month = num ? num :now.getMonth() + 1
        month += 1
        if (month == 13) {
            month = 1
            year += 1
        }
        return new Date(year, month - 1, 1)
    },
}


export default module