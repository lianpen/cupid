const Service = require('./Service')

class UserService extends Service {

	constructor() {
		super()
	}

	imitate100Users() {
		let conn = this.getConn()
		return new Promise(async resolve => {
			conn.connect()
			var str = `乙晓光　丁来杭　丁学东　丁薛祥　于伟国　于忠福　万立骏　习近平　马飚（壮族）　马兴瑞　王宁（武警）　王军　王勇　王晨　王毅　王小洪　王玉普　王正伟（回族）　王东明　王东峰　王尔乘　王志民　王志刚　王沪宁　王国生　王建军　王建武　王晓东　王晓晖　王家胜　王蒙徽　尤权　车俊　尹力　巴音朝鲁（蒙古族）　巴特尔（蒙古族）　艾力更·依明巴海（维吾尔族）　石泰峰　布小林（女，蒙古族）　卢展工　白春礼（满族）　吉炳轩　毕井泉　曲青山　朱生岭　刘奇　刘雷　刘鹤　刘士余　刘万龙　刘奇葆　刘国中　刘国治　刘金国　刘结一　刘振立　刘家义　刘赐贵　刘粤军　齐扎拉（藏族）　安兆庆（锡伯族）　许勤　许又声　许达哲　许其亮　阮成发　孙志刚　孙金龙　孙绍骋　孙春兰（女）　杜家毫　李屹　李希　李斌（女，国家机关）　李强　李干杰　李小鹏　李凤彪　李玉赋　李传广　李纪恒　李克强　李作成　李尚福　李国英　李桥铭　李晓红　李鸿忠　李锦斌　杨学军　杨洁篪　杨振武　杨晓渡　肖捷　肖亚庆　吴社洲　吴英杰　吴政隆　邱学强　何平（解放军）　何立峰　应勇　冷溶　汪洋　汪永清　沈金龙　沈晓明　沈跃跃（女）　沈德咏　怀进鹏　宋丹　宋涛　宋秀岩（女）　张军（国家机关）　张又侠　张升民　张庆伟　张庆黎　张纪南　张国清　张春贤　张晓明　张裔炯　陆昊　陈希　陈武（壮族）　陈豪　陈文清　陈吉宁　陈全国　陈求发（苗族）　陈宝生　陈润儿　陈敏尔　努尔兰·阿不都满金（哈萨克族）　苗圩　苗华　苟仲文　范骁骏　林铎　尚宏　金壮龙　周强　周亚宁　郑和　郑卫平　郑晓松　孟祥锋　赵乐际　赵克志　赵宗岐　郝鹏　胡和平　胡泽君（女）　胡春华　咸辉（女，回族）　钟山　信春鹰（女）　侯建国　娄勤俭　洛桑江村（藏族）　骆惠宁　秦生祥　袁家军　袁誉柏　袁曙宏　聂辰席　栗战书　钱小芊　铁凝（女）　倪岳峰　徐麟　徐乐江　徐安祥　高津　郭声琨　郭树清　唐仁健　黄明　黄守宏　黄坤明　黄树贤　曹建明　龚正　盛斌　雪克来提·扎克尔（维吾尔族）　鄂竟平　鹿心社　谌贻琴（女，白族）　彭清华　蒋超良　韩正　韩卫国　韩长赋　傅政华　谢伏瞻　楼阳生　蔡奇　蔡名照　雒树刚　黎火辉　潘立刚　穆虹　魏凤和`

			var ary = str.split("　")
			let time = new Date().getTime()
			let data = ary.map(name => ([
				name, 
				Math.random() > .5 ? 1 : 2,
				time
			]))
			var query = conn.query('INSERT INTO user(name, sex, create_time) values ?', [data], function (error, results, fields) {
			  if (error) throw error;

			});
			conn.end()
			resolve('ok')
		})
	}		

}

module.exports = UserService