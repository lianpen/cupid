
<template>
	<div class='c-list'>
		<div class='c-list-header' v-if='title'>
			{{ title }}
		</div>
		<div class='c-list-body'>
			<slot></slot>
		</div>
	</div>
</template>


<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>











<style>
.c-list-header {
padding: 15px 15px 9px 15px;
font-size: 14px;
color: #888;
width: 100%;
box-sizing: border-box;
}
.c-list-footer {
padding: 9px 15px 15px 15px;
font-size: 14px;
color: #888;
}
.c-list-body {
position: relative;
background-color: #fff;
border-top: 1PX solid #ddd;
border-bottom: 1PX solid #ddd;
}
@media (min-resolution: 2dppx) {
html:not([data-scale]) .c-list-body {
border-top: none;
}
html:not([data-scale]) .c-list-body::before {
content: '';
position: absolute;
background-color: #ddd;
display: block;
z-index: 1;
top: 0;
right: auto;
bottom: auto;
left: 0;
width: 100%;
height: 1PX;
transform-origin: 50% 50%;
transform: scaleY(0.5);
}
}
@media (min-resolution: 2dppx) and (min-resolution: 3dppx) {
html:not([data-scale]) .c-list-body::before {
transform: scaleY(0.33);
}
}
@media (min-resolution: 2dppx) {
html:not([data-scale]) .c-list-body {
border-bottom: none;
}
html:not([data-scale]) .c-list-body::after {
content: '';
position: absolute;
background-color: #ddd;
display: block;
z-index: 1;
top: auto;
right: auto;
bottom: 0;
left: 0;
width: 100%;
height: 1PX;
transform-origin: 50% 100%;
transform: scaleY(0.5);
}
}
@media (min-resolution: 2dppx) and (min-resolution: 3dppx) {
html:not([data-scale]) .c-list-body::after {
transform: scaleY(0.33);
}
}
.c-list-body div:not(:last-child) .c-list-line {
border-bottom: 1PX solid #ddd;
}
@media (min-resolution: 2dppx) {
html:not([data-scale]) .c-list-body div:not(:last-child) .c-list-line {
border-bottom: none;
}
html:not([data-scale]) .c-list-body div:not(:last-child) .c-list-line::after {
content: '';
position: absolute;
background-color: #ddd;
display: block;
z-index: 1;
top: auto;
right: auto;
bottom: 0;
left: 0;
width: 100%;
height: 1PX;
transform-origin: 50% 100%;
transform: scaleY(0.5);
}
}
@media (min-resolution: 2dppx) and (min-resolution: 3dppx) {
html:not([data-scale]) .c-list-body div:not(:last-child) .c-list-line::after {
transform: scaleY(0.33);
}
}
.c-list-item {
position: relative;
display: flex;
padding-left: 15px;
min-height: 44px;
background-color: #fff;
vertical-align: middle;
overflow: hidden;
transition: background-color 200ms;
align-items: center;
/* list左图片显示*/
}
.c-list-item .c-list-ripple {
position: absolute;
background: transparent;
display: inline-block;
overflow: hidden;
will-change: box-shadow, transform;
transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
outline: none;
cursor: pointer;
border-radius: 100%;
transform: scale(0);
}
.c-list-item .c-list-ripple.c-list-ripple-animate {
background-color: rgba(158, 158, 158, 0.2);
animation: ripple 1s linear;
}
.c-list-item.c-list-item-top .c-list-line {
align-items: flex-start;
}
.c-list-item.c-list-item-top .c-list-line .c-list-arrow {
margin-top: 2px;
}
.c-list-item.c-list-item-middle .c-list-line {
align-items: center;
}
.c-list-item.c-list-item-bottom .c-list-line {
align-items: flex-end;
}
.c-list-item.c-list-item-error .c-list-line .c-list-extra {
color: #f50;
}
.c-list-item.c-list-item-error .c-list-line .c-list-extra .c-list-brief {
color: #f50;
}
.c-list-item.c-list-item-active {
background-color: #ddd;
}
.c-list-item.c-list-item-disabled .c-list-line .c-list-content,
.c-list-item.c-list-item-disabled .c-list-line .c-list-extra {
color: #bbb;
}
.c-list-item img {
width: 22px;
height: 22px;
vertical-align: middle;
}
.c-list-item .c-list-thumb:first-child {
margin-right: 15px;
}
.c-list-item .c-list-thumb:last-child {
margin-left: 8px;
}
.c-list-item .c-list-line {
position: relative;
display: flex;
flex: 1;
align-self: stretch;
padding-right: 15px;
overflow: hidden;
/* list左侧主内容*/
/* list右补充内容*/
/* 辅助性文字*/
/* list右侧箭头*/
}
.c-list-item .c-list-line .c-list-content {
flex: 1;
color: #000;
font-size: 17px;
line-height: 1.5;
text-align: left;
width: auto;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
padding-top: 7px;
padding-bottom: 7px;
}
.c-list-item .c-list-line .c-list-extra {
flex-basis: 36%;
color: #888;
font-size: 16px;
line-height: 1.5;
text-align: right;
width: auto;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
padding-top: 7px;
padding-bottom: 7px;
}
.c-list-item .c-list-line .c-list-title {
width: auto;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
.c-list-item .c-list-line .c-list-brief {
color: #888;
font-size: 15px;
line-height: 1.5;
margin-top: 6px;
width: auto;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
.c-list-item .c-list-line .c-list-arrow {
display: block;
width: 15px;
height: 15px;
margin-left: 8px;
background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2216%22%20height%3D%2226%22%20viewBox%3D%220%200%2016%2026%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cg%20id%3D%22UI-KIT_%E5%9F%BA%E7%A1%80%E5%85%83%E4%BB%B6%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20id%3D%229.9%E5%9F%BA%E7%A1%80%E5%85%83%E4%BB%B6%22%20transform%3D%22translate(-5809.000000%2C%20-8482.000000)%22%20fill%3D%22%23C7C7CC%22%3E%3Cpolygon%20id%3D%22Disclosure-Indicator%22%20points%3D%225811%208482%205809%208484%205820.5%208495%205809%208506%205811%208508%205825%208495%22%3E%3C%2Fpolygon%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");
background-size: contain;
background-repeat: no-repeat;
background-position: 50% 50%;
visibility: hidden;
}
.c-list-item .c-list-line .c-list-arrow-horizontal {
visibility: visible;
}
.c-list-item .c-list-line .c-list-arrow-vertical {
visibility: visible;
transform: rotate(90deg);
}
.c-list-item .c-list-line .c-list-arrow-vertical-up {
visibility: visible;
transform: rotate(270deg);
}
.c-list-item .c-list-line-multiple {
padding: 12.5px 15px 12.5px 0;
}
.c-list-item .c-list-line-multiple .c-list-content {
padding-top: 0;
padding-bottom: 0;
}
.c-list-item .c-list-line-multiple .c-list-extra {
padding-top: 0;
padding-bottom: 0;
}
.c-list-item .c-list-line-wrap .c-list-content {
white-space: normal;
}
.c-list-item .c-list-line-wrap .c-list-extra {
white-space: normal;
}
.c-list-item select {
position: relative;
display: block;
width: 100%;
height: 100%;
padding: 0;
border: 0;
font-size: 17px;
appearance: none;
background-color: transparent;
}
@keyframes ripple {
100% {
opacity: 0;
transform: scale(2.5);
}
}


.c-list-item.c-input-item {
height: 44px;
padding-left: 15px;
}
.c-list-item:not(:last-child) .c-list-line {
border-bottom: 1PX solid #ddd;
}
@media (min-resolution: 2dppx) {
html:not([data-scale]) .c-list-item:not(:last-child) .c-list-line {
border-bottom: none;
}
html:not([data-scale]) .c-list-item:not(:last-child) .c-list-line::after {
content: '';
position: absolute;
background-color: #ddd;
display: block;
z-index: 1;
top: auto;
right: auto;
bottom: 0;
left: 0;
width: 100%;
height: 1PX;
transform-origin: 50% 100%;
transform: scaleY(0.5);
}
}
@media (min-resolution: 2dppx) and (min-resolution: 3dppx) {
html:not([data-scale]) .c-list-item:not(:last-child) .c-list-line::after {
transform: scaleY(0.33);
}
}
.c-list-item .c-input-label {
color: #000;
font-size: 17px;
margin-left: 0;
margin-right: 5px;
text-align: left;
white-space: nowrap;
overflow: hidden;
padding: 2px 0;
}
.c-list-item .c-input-label.c-input-label-2 {
width: 34px;
}
.c-list-item .c-input-label.c-input-label-3 {
width: 51px;
}
.c-list-item .c-input-label.c-input-label-4 {
width: 68px;
}
.c-list-item .c-input-label.c-input-label-5 {
width: 85px;
}
.c-list-item .c-input-label.c-input-label-6 {
width: 102px;
}
.c-list-item .c-input-label.c-input-label-7 {
width: 119px;
}
.c-list-item .c-input-control {
font-size: 17px;
flex: 1;
}
.c-list-item .c-input-control input {
color: #000;
font-size: 17px;
appearance: none;
width: 100%;
padding: 2px 0;
border: 0;
background-color: transparent;
line-height: 1;
box-sizing: border-box;
}
.c-list-item .c-input-control input::placeholder {
color: #bbb;
line-height: 1.2;
}
.c-list-item .c-input-control input:disabled {
color: #bbb;
background-color: #fff;
}
.c-list-item .c-input-clear {
display: none;
width: 21px;
height: 21px;
border-radius: 50%;
overflow: hidden;
font-style: normal;
color: #fff;
background-color: #ccc;
background-repeat: no-repeat;
background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D'%23fff'%20viewBox%3D'0%200%2030%2030'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20d%3D'M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z'%2F%3E%3Cpath%20d%3D'M0%200h24v24H0z'%20fill%3D'none'%2F%3E%3C%2Fsvg%3E");
background-size: 21px auto;
background-position: 2px 2px;
}
.c-list-item .c-input-clear-active {
background-color: #4a7ec0;
}
.c-list-item.c-input-focus .c-input-clear {
display: block;
}
.c-list-item .c-input-extra {
flex: initial;
min-width: 0;
max-height: 21px;
overflow: hidden;
padding-right: 0;
line-height: 1;
color: #888;
font-size: 15px;
margin-left: 5px;
}
.c-list-item.c-input-error .c-input-control input {
color: #f50;
}
.c-list-item.c-input-error .c-input-error-extra {
height: 21px;
width: 21px;
margin-left: 6px;
background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D'18'%20height%3D'18'%20viewBox%3D'0%200%2018%2018'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cg%20stroke%3D'none'%20stroke-width%3D'1'%20fill%3D'none'%20fill-rule%3D'evenodd'%3E%3Cg%20transform%3D'translate(-300.000000%2C%20-1207.000000)'%20fill%3D'%23FF5500'%3E%3Cg%20id%3D'exclamation-circle-o'%20transform%3D'translate(300.000000%2C%201207.000000)'%3E%3Cpath%20d%3D'M9%2C16.734375%20C10.0441406%2C16.734375%2011.0566406%2C16.5304688%2012.009375%2C16.1279297%20C12.9304688%2C15.7376953%2013.7566406%2C15.1804687%2014.4685547%2C14.4703125%20C15.1787109%2C13.7601563%2015.7376953%2C12.9322266%2016.1261719%2C12.0111328%20C16.5304688%2C11.0566406%2016.734375%2C10.0441406%2016.734375%2C9%20C16.734375%2C7.95585938%2016.5304688%2C6.94335938%2016.1279297%2C5.990625%20C15.7376953%2C5.06953125%2015.1804687%2C4.24335938%2014.4703125%2C3.53144531%20C13.7601563%2C2.82128906%2012.9322266%2C2.26230469%2012.0111328%2C1.87382813%20C11.0566406%2C1.46953125%2010.0441406%2C1.265625%209%2C1.265625%20C7.95585938%2C1.265625%206.94335938%2C1.46953125%205.990625%2C1.87207031%20C5.06953125%2C2.26230469%204.24335938%2C2.81953125%203.53144531%2C3.5296875%20C2.82128906%2C4.23984375%202.26230469%2C5.06777344%201.87382813%2C5.98886719%20C1.46953125%2C6.94335938%201.265625%2C7.95585938%201.265625%2C9%20C1.265625%2C10.0441406%201.46953125%2C11.0566406%201.87207031%2C12.009375%20C2.26230469%2C12.9304688%202.81953125%2C13.7566406%203.5296875%2C14.4685547%20C4.23984375%2C15.1787109%205.06777344%2C15.7376953%205.98886719%2C16.1261719%20C6.94335938%2C16.5304688%207.95585938%2C16.734375%209%2C16.734375%20L9%2C16.734375%20Z%20M9%2C18%20C4.02890625%2C18%200%2C13.9710937%200%2C9%20C0%2C4.02890625%204.02890625%2C0%209%2C0%20C13.9710937%2C0%2018%2C4.02890625%2018%2C9%20C18%2C13.9710937%2013.9710937%2C18%209%2C18%20L9%2C18%20L9%2C18%20Z%20M9%2C6.75%20C8.61152344%2C6.75%208.296875%2C7.06464844%208.296875%2C7.453125%20L8.296875%2C13.9394531%20C8.296875%2C14.3279297%208.61152344%2C14.6425781%209%2C14.6425781%20C9.38847656%2C14.6425781%209.703125%2C14.3279297%209.703125%2C13.9394531%20L9.703125%2C7.453125%20C9.703125%2C7.06464844%209.38847656%2C6.75%209%2C6.75%20L9%2C6.75%20Z%20M8.20898438%2C4.83398438%20C8.20898438%2C5.27085024%208.56313413%2C5.625%209%2C5.625%20C9.43686587%2C5.625%209.79101562%2C5.27085024%209.79101562%2C4.83398438%20C9.79101562%2C4.39711851%209.43686587%2C4.04296875%209%2C4.04296875%20C8.56313413%2C4.04296875%208.20898438%2C4.39711851%208.20898438%2C4.83398438%20L8.20898438%2C4.83398438%20Z'%20id%3D'Shape'%20transform%3D'translate(9.000000%2C%209.000000)%20scale(1%2C%20-1)%20translate(-9.000000%2C%20-9.000000)%20'%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");
background-size: 21px auto;
}
.c-list-item.c-input-disabled .c-input-label {
color: #bbb;
}
</style>