var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/resume';
var async = require('async');

// 图处上传引用包
var multiparty = require('multiparty');
var fs = require('fs');

/* GET home page. */
	//函数一
var findData = function(db,name,callback){
    var conn = db.collection(name);
    var data = {};

    conn.find(data).toArray(function(err,results){
        if(err){
            return;
        }
        callback(results);
    })
}
  //函数二
var insertData = function(db,name,data,callback){
	var conn = db.collection(name);
	var data = data;
	conn.insert(data,function(err,results){
		if(err){
			return;
		}
		callback(results);
	})
 }
 //skill
router.get('/skill', function(req, res, next) {

  //链接数据库
  MongoClient.connect(DB_CONN_STR,function(err,db){
  	if(err){
  		return;
  	}else{
  		findData(db,"skill",function(results){
			if(!results[0]){
				var data1 = [{
					"category":"规范",
					"name":"HTML4、HTML5、ES5、ES6、W3C、C2、C3、CommonJS、CMD、AMD等",
					"time":"2年",
					"level":"了解",
					"img":"../images/h5.jpg"
				},
				{
					"category":"框架",
					"name":"Jquery、Bootstrap、Express、Zepto、AngularJs、Recat、Avalon等",
					"time":"2年",
					"level":"熟悉",
					"img":"../images/jquery.jpg"
				},
				{
					"category":"UI框架",
					"name":"Jqueryeasyui、Mui、Yo、Ionic等",
					"time":"2年",
					"level":"熟悉",
					"img":"../images/easyui.jpg"
				},
				{
					"category":"类库",
					"name":"Swiper、Iscroll等",
					"time":"2年",
					"level":"熟悉",
					"img":"../images/swiper.jpg"
				},
				{
					"category":"插件",
					"name":"Jquery menu plugin、Jquery nav plugin、zepto emoji-expression-plugin等",
					"time":"2年",
					"level":"熟悉",
					"img":"../images/zepto.jpg"
				},
				{
					"category":"布局",
					"name":"Fixed、Fulid、Flex、Responsive、SASS",
					"time":"2年",
					"level":"精通",
					"img":"../images/sass.jpg"
				},
				{
					"category":"程序",
					"name":"Javascript原生、Jquery及Zepto插件、AngularJs等",
					"time":"3年",
					"level":"精通",
					"img":"../images/angular.jpg"
				},
				{
					"category":"数据库",
					"name":"掌握Websql、mongodb、indexeddb",
					"time":"2年",
					"level":"熟悉",
					"img":"../images/mongodb.jpg"
				},
				{
					"category":"后台",
					"name":"熟悉后台开发的数据库相关内容、PHP、Nodejs",
					"time":"2年",
					"level":"熟悉",
					"img":"../images/nodejs.jpg"
				},
				{
					"category":"工具",
					"name":"sublime、gulp、webpack、fekit",
					"time":"2年",
					"level":"熟悉",
					"img":"../images/sublime.jpg"
				},
				{
					"category":"辅助软件",
					"name":"xMind、PS、Axure等",
					"time":"2年",
					"level":"熟悉",
					"img":"../images/ps.jpg"
				}]//end data1
			insertData(db,"skill",data1,function(results){
				res.send(results);
				db.close();
			})
			}else{
				res.send(results);
				db.close();
			}
		})
	}//end if
  })//end connect Mongodb
});
//work
router.get('/work', function(req, res, next) {

  //链接数据库
  MongoClient.connect(DB_CONN_STR,function(err,db){
  	if(err){
  		return;
  	}else{
  		findData(db,"work",function(results){
			if(!results[0]){
				var data2 = [{
				"category":"学习经历",
				"name":"四川理工学院",
				"url":"http://www.ruiyantong.com",
				"image":"../images/school-logo.jpg",
				"time":"2011年-2015年",
				"posts":"副班长",
				"reportto":"",
				"peoples":"",
				"exp":"2010年2015年之间就读于四川理工学院-计算机学院-计算机与技术专业"
			},
			{
				"category":"工作经历",
				"name":"成功相芯科技有限公司",
				"url":"http://27429425.b2b.11467.com",
				"image":"../images/xiangxin.jpg",
				"time":"2015年-2016年",
				"posts":"前端开发应用工程师",
				"reportto":"主管",
				"peoples":"9",
				"exp":"前端网页编写及应用开发"
			},
			{
				"category":"工作经历",
				"name":"南充和胜网络有限公司",
				"url":"http://www.ruiyantong.com",
				"image":"../images/ruiyantong.png",
				"time":"2016年-2017年",
				"posts":"前端开发应用工程师",
				"reportto":"主管",
				"peoples":"5",
				"exp":"前端网页编写及应用开发"
			}]//end data2
			insertData(db,"work",data2,function(results){
				res.send(results);
				db.close();
			})
			}else{
				res.send(results);
				db.close();
			}
		})
	}//end if
  })//end connect Mongodb
});
//project
router.get('/project', function(req, res, next) {

  //链接数据库
  MongoClient.connect(DB_CONN_STR,function(err,db){
  	if(err){
  		return;
  	}else{
  		findData(db,"project",function(results){
			if(!results[0]){
				var data3 = [{
				"category":"购物网站",
				"name":"邮乐",
				"url":"http://www.ule.com",
				"image":"../images/youle.jpg",
				"description":"邮乐网是一个购物平台网，年销售额超过20亿",
				"detail":"长期维护，功能迭代，性能优化，功能模块的增加和性能的优化",
				"tech":"Html、Css2、Css3、Coldfusion等"
			}]//end data3
			insertData(db,"project",data3,function(results){
				res.send(results);
				db.close();
			})
			}else{
				res.send(results);
				db.close();
			}
		})
	}//end if
  })//end connect Mongodb
});
//me
router.get('/me', function(req, res, next) {

  //链接数据库
  MongoClient.connect(DB_CONN_STR,function(err,db){
  	if(err){
  		return;
  	}else{
  		findData(db,"me",function(results){
			if(!results[0]){
				var data4 = [{
				"name":"向丽",
				"sex":"女",
				"phone":"18380231149",
				"E-mail":"1091440259@qq.com",
				"birthday":"1994-12",
				"weixin":"../images/weixin.jpg",
				"photo":"../images/me.jpg"
			}]//end data4
			insertData(db,"me",data4,function(results){
				res.send(results);
				db.close();
			})
			}else{
				res.send(results);
				db.close();
			}
		})
	}//end if
  })//end connect Mongodb
});

module.exports = router;


