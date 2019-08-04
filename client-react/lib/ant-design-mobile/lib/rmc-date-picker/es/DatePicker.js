import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import MultiPicker from 'rmc-picker/es/MultiPicker';
import Picker from 'rmc-picker/lib/Picker';
import defaultLocale from './locale/en_US';
function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
function pad(n) {
    return n < 10 ? '0' + n : n + '';
}
function cloneDate(date) {
    return new Date(+date);
}
function setMonth(date, month) {
    date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))));
    date.setMonth(month);
}
var DATETIME = 'datetime';
var DATE = 'date';
var TIME = 'time';
var MONTH = 'month';
var YEAR = 'year';
var ONE_DAY = 24 * 60 * 60 * 1000;

var DatePicker = function (_React$Component) {
    _inherits(DatePicker, _React$Component);

    function DatePicker() {
        _classCallCheck(this, DatePicker);

        var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).apply(this, arguments));

        _this.state = {
            date: _this.props.date || _this.props.defaultDate
        };
        _this.getNewDate = function (values, index) {
            var value = parseInt(values[index], 10);
            var props = _this.props;
            var mode = props.mode;

            var newValue = cloneDate(_this.getDate());
            if (mode === DATETIME || mode === DATE || mode === YEAR || mode === MONTH) {
                switch (index) {
                    case 0:
                        newValue.setFullYear(value);
                        break;
                    case 1:
                                                                        setMonth(newValue, value);
                        break;
                    case 2:
                        newValue.setDate(value);
                        break;
                    case 3:
                        _this.setHours(newValue, value);
                        break;
                    case 4:
                        newValue.setMinutes(value);
                        break;
                    case 5:
                        _this.setAmPm(newValue, value);
                        break;
                    default:
                        break;
                }
            } else if (mode === TIME) {
                switch (index) {
                    case 0:
                        _this.setHours(newValue, value);
                        break;
                    case 1:
                        newValue.setMinutes(value);
                        break;
                    case 2:
                        _this.setAmPm(newValue, value);
                        break;
                    default:
                        break;
                }
            }
            return _this.clipDate(newValue);
        };
        _this.onValueChange = function (values, index) {
            var props = _this.props;
            var newValue = _this.getNewDate(values, index);
            if (!('date' in props)) {
                _this.setState({
                    date: newValue
                });
            }
            if (props.onDateChange) {
                props.onDateChange(newValue);
            }
            if (props.onValueChange) {
                props.onValueChange(values, index);
            }
        };
        _this.onScrollChange = function (values, index) {
            var props = _this.props;
            if (props.onScrollChange) {
                var newValue = _this.getNewDate(values, index);
                props.onScrollChange(newValue, values, index);
            }
        };
        return _this;
    }

    _createClass(DatePicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('date' in nextProps) {
                this.setState({
                    date: nextProps.date || nextProps.defaultDate
                });
            }
        }
    }, {
        key: 'setHours',
        value: function setHours(date, hour) {
            if (this.props.use12Hours) {
                var dh = date.getHours();
                var nhour = hour;
                nhour = dh >= 12 ? hour + 12 : hour;
                nhour = nhour >= 24 ? 0 : nhour;                 date.setHours(nhour);
            } else {
                date.setHours(hour);
            }
        }
    }, {
        key: 'setAmPm',
        value: function setAmPm(date, index) {
            if (index === 0) {
                date.setTime(+date - ONE_DAY / 2);
            } else {
                date.setTime(+date + ONE_DAY / 2);
            }
        }
    }, {
        key: 'getDefaultMinDate',
        value: function getDefaultMinDate() {
            if (!this.defaultMinDate) {
                this.defaultMinDate = new Date(2000, 1, 1, 0, 0, 0);
            }
            return this.defaultMinDate;
        }
    }, {
        key: 'getDefaultMaxDate',
        value: function getDefaultMaxDate() {
            if (!this.defaultMaxDate) {
                this.defaultMaxDate = new Date(2030, 1, 1, 23, 59, 59);
            }
            return this.defaultMaxDate;
        }
    }, {
        key: 'getDate',
        value: function getDate() {
            return this.clipDate(this.state.date || this.getDefaultMinDate());
        }
        
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.getDate();
        }
    }, {
        key: 'getMinYear',
        value: function getMinYear() {
            return this.getMinDate().getFullYear();
        }
    }, {
        key: 'getMaxYear',
        value: function getMaxYear() {
            return this.getMaxDate().getFullYear();
        }
    }, {
        key: 'getMinMonth',
        value: function getMinMonth() {
            return this.getMinDate().getMonth();
        }
    }, {
        key: 'getMaxMonth',
        value: function getMaxMonth() {
            return this.getMaxDate().getMonth();
        }
    }, {
        key: 'getMinDay',
        value: function getMinDay() {
            return this.getMinDate().getDate();
        }
    }, {
        key: 'getMaxDay',
        value: function getMaxDay() {
            return this.getMaxDate().getDate();
        }
    }, {
        key: 'getMinHour',
        value: function getMinHour() {
            return this.getMinDate().getHours();
        }
    }, {
        key: 'getMaxHour',
        value: function getMaxHour() {
            return this.getMaxDate().getHours();
        }
    }, {
        key: 'getMinMinute',
        value: function getMinMinute() {
            return this.getMinDate().getMinutes();
        }
    }, {
        key: 'getMaxMinute',
        value: function getMaxMinute() {
            return this.getMaxDate().getMinutes();
        }
    }, {
        key: 'getMinDate',
        value: function getMinDate() {
            return this.props.minDate || this.getDefaultMinDate();
        }
    }, {
        key: 'getMaxDate',
        value: function getMaxDate() {
            return this.props.maxDate || this.getDefaultMaxDate();
        }
    }, {
        key: 'getDateData',
        value: function getDateData() {
            var _props = this.props,
                locale = _props.locale,
                formatMonth = _props.formatMonth,
                formatDay = _props.formatDay,
                mode = _props.mode;

            var date = this.getDate();
            var selYear = date.getFullYear();
            var selMonth = date.getMonth();
            var minDateYear = this.getMinYear();
            var maxDateYear = this.getMaxYear();
            var minDateMonth = this.getMinMonth();
            var maxDateMonth = this.getMaxMonth();
            var minDateDay = this.getMinDay();
            var maxDateDay = this.getMaxDay();
            var years = [];
            for (var i = minDateYear; i <= maxDateYear; i++) {
                years.push({
                    value: i + '',
                    label: i + locale.year + ''
                });
            }
            var yearCol = { key: 'year', props: { children: years } };
            if (mode === YEAR) {
                return [yearCol];
            }
            var months = [];
            var minMonth = 0;
            var maxMonth = 11;
            if (minDateYear === selYear) {
                minMonth = minDateMonth;
            }
            if (maxDateYear === selYear) {
                maxMonth = maxDateMonth;
            }
            for (var _i = minMonth; _i <= maxMonth; _i++) {
                var label = formatMonth ? formatMonth(_i, date) : _i + 1 + locale.month + '';
                months.push({
                    value: _i + '',
                    label: label
                });
            }
            var monthCol = { key: 'month', props: { children: months } };
            if (mode === MONTH) {
                return [yearCol, monthCol];
            }
            var days = [];
            var minDay = 1;
            var maxDay = getDaysInMonth(date);
            if (minDateYear === selYear && minDateMonth === selMonth) {
                minDay = minDateDay;
            }
            if (maxDateYear === selYear && maxDateMonth === selMonth) {
                maxDay = maxDateDay;
            }
            for (var _i2 = minDay; _i2 <= maxDay; _i2++) {
                var _label = formatDay ? formatDay(_i2, date) : _i2 + locale.day + '';
                days.push({
                    value: _i2 + '',
                    label: _label
                });
            }
            return [yearCol, monthCol, { key: 'day', props: { children: days } }];
        }
    }, {
        key: 'getDisplayHour',
        value: function getDisplayHour(rawHour) {
                        if (this.props.use12Hours) {
                if (rawHour === 0) {
                    rawHour = 12;
                }
                if (rawHour > 12) {
                    rawHour -= 12;
                }
                return rawHour;
            }
            return rawHour;
        }
    }, {
        key: 'getTimeData',
        value: function getTimeData(date) {
            var minHour = 0;
            var maxHour = 23;
            var minMinute = 0;
            var maxMinute = 59;
            var _props2 = this.props,
                mode = _props2.mode,
                locale = _props2.locale,
                minuteStep = _props2.minuteStep,
                use12Hours = _props2.use12Hours;

            var minDateMinute = this.getMinMinute();
            var maxDateMinute = this.getMaxMinute();
            var minDateHour = this.getMinHour();
            var maxDateHour = this.getMaxHour();
            var hour = date.getHours();
            if (mode === DATETIME) {
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var minDateYear = this.getMinYear();
                var maxDateYear = this.getMaxYear();
                var minDateMonth = this.getMinMonth();
                var maxDateMonth = this.getMaxMonth();
                var minDateDay = this.getMinDay();
                var maxDateDay = this.getMaxDay();
                if (minDateYear === year && minDateMonth === month && minDateDay === day) {
                    minHour = minDateHour;
                    if (minDateHour === hour) {
                        minMinute = minDateMinute;
                    }
                }
                if (maxDateYear === year && maxDateMonth === month && maxDateDay === day) {
                    maxHour = maxDateHour;
                    if (maxDateHour === hour) {
                        maxMinute = maxDateMinute;
                    }
                }
            } else {
                minHour = minDateHour;
                if (minDateHour === hour) {
                    minMinute = minDateMinute;
                }
                maxHour = maxDateHour;
                if (maxDateHour === hour) {
                    maxMinute = maxDateMinute;
                }
            }
            var hours = [];
            if (minHour === 0 && maxHour === 0 || minHour !== 0 && maxHour !== 0) {
                minHour = this.getDisplayHour(minHour);
            } else if (minHour === 0 && use12Hours) {
                minHour = 1;
                hours.push({ value: '0', label: locale.hour ? '12' + locale.hour : '12' });
            }
            maxHour = this.getDisplayHour(maxHour);
            for (var i = minHour; i <= maxHour; i++) {
                hours.push({
                    value: i + '',
                    label: locale.hour ? i + locale.hour + '' : pad(i)
                });
            }
            var minutes = [];
            var selMinute = date.getMinutes();
            for (var _i3 = minMinute; _i3 <= maxMinute; _i3 += minuteStep) {
                minutes.push({
                    value: _i3 + '',
                    label: locale.minute ? _i3 + locale.minute + '' : pad(_i3)
                });
                if (selMinute > _i3 && selMinute < _i3 + minuteStep) {
                    minutes.push({
                        value: selMinute + '',
                        label: locale.minute ? selMinute + locale.minute + '' : pad(selMinute)
                    });
                }
            }
            var cols = [{ key: 'hours', props: { children: hours } }, { key: 'minutes', props: { children: minutes } }].concat(use12Hours ? [{
                key: 'ampm',
                props: { children: [{ value: '0', label: locale.am }, { value: '1', label: locale.pm }] }
            }] : []);
            return { cols: cols, selMinute: selMinute };
        }
    }, {
        key: 'clipDate',
        value: function clipDate(date) {
            var mode = this.props.mode;

            var minDate = this.getMinDate();
            var maxDate = this.getMaxDate();
            if (mode === DATETIME) {
                if (date < minDate) {
                    return cloneDate(minDate);
                }
                if (date > maxDate) {
                    return cloneDate(maxDate);
                }
            } else if (mode === DATE || mode === YEAR || mode === MONTH) {
                                if (+date + ONE_DAY <= minDate) {
                    return cloneDate(minDate);
                }
                if (date >= +maxDate + ONE_DAY) {
                    return cloneDate(maxDate);
                }
            } else if (mode === TIME) {
                var maxHour = maxDate.getHours();
                var maxMinutes = maxDate.getMinutes();
                var minHour = minDate.getHours();
                var minMinutes = minDate.getMinutes();
                var hour = date.getHours();
                var minutes = date.getMinutes();
                if (hour < minHour || hour === minHour && minutes < minMinutes) {
                    return cloneDate(minDate);
                }
                if (hour > maxHour || hour === maxHour && minutes > maxMinutes) {
                    return cloneDate(maxDate);
                }
            }
            return date;
        }
    }, {
        key: 'getValueCols',
        value: function getValueCols() {
            var _props3 = this.props,
                mode = _props3.mode,
                use12Hours = _props3.use12Hours;

            var date = this.getDate();
            var cols = [];
            var value = [];
            if (mode === YEAR) {
                return {
                    cols: this.getDateData(),
                    value: [date.getFullYear() + '']
                };
            }
            if (mode === MONTH) {
                return {
                    cols: this.getDateData(),
                    value: [date.getFullYear() + '', date.getMonth() + '']
                };
            }
            if (mode === DATETIME || mode === DATE) {
                cols = this.getDateData();
                value = [date.getFullYear() + '', date.getMonth() + '', date.getDate() + ''];
            }
            if (mode === DATETIME || mode === TIME) {
                var time = this.getTimeData(date);
                cols = cols.concat(time.cols);
                var hour = date.getHours();
                var dtValue = [hour + '', time.selMinute + ''];
                var nhour = hour;
                if (use12Hours) {
                    nhour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                    dtValue = [nhour + '', time.selMinute + '', (hour >= 12 ? 1 : 0) + ''];
                }
                value = value.concat(dtValue);
            }
            return {
                value: value,
                cols: cols
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _getValueCols = this.getValueCols(),
                value = _getValueCols.value,
                cols = _getValueCols.cols;

            var _props4 = this.props,
                disabled = _props4.disabled,
                pickerPrefixCls = _props4.pickerPrefixCls,
                prefixCls = _props4.prefixCls,
                rootNativeProps = _props4.rootNativeProps,
                className = _props4.className,
                style = _props4.style,
                itemStyle = _props4.itemStyle;

            var multiStyle = _extends({ flexDirection: 'row', alignItems: 'center' }, style);
            return React.createElement(MultiPicker, { style: multiStyle, rootNativeProps: rootNativeProps, className: className, prefixCls: prefixCls, selectedValue: value, onValueChange: this.onValueChange, onScrollChange: this.onScrollChange }, cols.map(function (p) {
                return React.createElement(Picker, { style: { flex: 1 }, key: p.key, disabled: disabled, prefixCls: pickerPrefixCls, itemStyle: itemStyle }, p.props.children.map(function (item) {
                    return React.createElement(Picker.Item, { key: item.value, value: item.value }, item.label);
                }));
            }));
        }
    }]);

    return DatePicker;
}(React.Component);

DatePicker.defaultProps = {
    prefixCls: 'rmc-date-picker',
    pickerPrefixCls: 'rmc-picker',
    locale: defaultLocale,
    mode: DATE,
    disabled: false,
    minuteStep: 1,
    onDateChange: function onDateChange() {},

    use12Hours: false
};
export default DatePicker;