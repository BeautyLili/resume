// 引入zepto-modules模块
var $ = require('zepto-modules/zepto');
require('zepto-modules/event');
require('zepto-modules/ajax');
require('zepto-modules/form');
require('zepto-modules/ie');
require('zepto-modules/touch');
module.exports = $;
//点击那音乐按钮停止转动
$(".bggif").on("tap",function(){
    $(".bgmusic").removeClass("roate");
   $("#audio").attr("src","");
   $(".bggif").css("background","");
   var a = $(".bggif").css("background");

})

//引入微信模块
var wx = require('./components/weixin/jweixin-1.0.0.js');
//拍照和扫一扫
$.ajax({
    url:"http://www.aliport.online/php/getsign.php",
    type:"POST",
    data:{url:window.location.href},
    dataType:"json",
    success:function(res){
        wx.config({
            debug: false,
            appId: res.appId,
            timestamp:res.timestamp,
            nonceStr:res.nonceStr,
            signature: res.signature,
            jsApiList: [
              'chooseImage','scanQRCode'
            ]
        });
    }
  })
  $("#scan").on("tap",function(){
    wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            alert(result);
        }
    });
 })
  $("#photo").on("tap",function(){
       wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          }
        });
})  

// 引入swiper模块
var Swiper = require('./components/swiper/swiper.min.js');
//文字运动模块
var swiperAnimate = require('./components/swiper/swiper.animate1.0.2.min.js');
var swiper = new Swiper('.swiper-container',{
      onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
        swiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
        swiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
      },
      onSlideChangeEnd: function(swiper){ 
        swiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
      } ,
    pagination: '.swiper-pagination',
     paginationClickable: true
});
//引入iscroll模块
var IScroll = require('./components/iscroll/iscroll.js');
var isPassive = require('./components/iscroll/demoUtils.js');
myScroll = new IScroll('#wrapper', { mouseWheel: true });
 // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
  capture: false,
  passive: false
} : false);

//ajax请求内容填充
function work(){
   $.ajax({
     type: 'GET',
     url: 'http://www.aliport.online/php/select.php',
     dataType:"json",
     success: function(data) {
       var html = "";
       for (var i = 0; i < data.length; i++) {
         html += "<li class='skillli'><p class='first'><img src='"+data[i].img+"'/></p>"
                  +"<p class='two'>"+"<span class='category hanyi335'>"+data[i].category+"</span>"
                  +"<span class='name'>内容->>"+data[i].name+"</span>"
                  +"<span class='level' style='display:block'>level->>"+data[i].level+"</span>"
                  +"</p>"
         +"</li>";
       };
       $("#scroller ul").html(html);
       myScroll.refresh();
    }
 });

}
work();
myScroll.refresh();

// 点击进入按钮
$('#enter').click(function(){
  myScroll.refresh();
  $(".swiper-container").hide();
  $("#main").show();
  localStorage.first = 1;
})
//点击Tab切换
$("#footer ul li").tap(function(){
  var apiTarget = $(this).attr("id");
  var apiUrl ="http://localhost:3000/api/" + apiTarget;
  var index = $(this).index();
  for(var i = 0;i<4;i++){
    $("#footer ul li").removeClass("tab-active");
  }
  $(this).addClass("tab-active");
   if(apiTarget == 'work'){
     $.ajax({
         type: 'GET',
         url: 'http://www.aliport.online/www/mock/work.json',
         success: function(data) {
           var html = "";
          for (var i = 0; i < data.length; i++) {
              html +="<li class='workli'><p class='pic'><img class='bigpic' src='"+data[i].url+"'></p>"+
                         "<p class='work-category hanyi335 fff'>"+data[i].category+"</p>"+
                         "<p class='school-logo'>历经:<span class='work-name hanyi335 fff'>"+data[i].time+"</span></p>"+
                          "<p class='school-logo'>单位:<span class='work-name hanyi335 fff'>"+data[i].name+"</span></p>"+
                          "<p class='work-time'>"+
                          "<span>"+data[i].exp+"</span>"+
                          "</p>"+
                          "<p class='work-people'>"+
                          "<span>人数:"+data[i].people+"</span>"+
                          "</p>"+
                    "</li>"
             }
             $("#scroller ul").html(html);
            myScroll.refresh();
         }
      });
   }else if(apiTarget == 'project'){
       $.ajax({
        type: 'GET',
         url: 'http://www.aliport.online/www/mock/project.json',
         success: function(data) {
           var html = "";
           for (var i = 0; i < data.length; i++) {
              html += "<li class='projectli'><p class='project-top'><p>category:"+data[i].category+"</p><p>name:"+data[i].name+"</p><p>description:"+data[i].description+"</p><p>work-detail:"+data[i].detail+"</p><p>work-tech:"+data[i].tech+"</p><p class='url'>url:"+data[i].url+"</p></p></li>";
 
             }
            $("#scroller ul").html(html);
            myScroll.refresh();
         }
      });
   }else if(apiTarget == 'skill'){
      work();
   }else if(apiTarget == 'me'){
       $.ajax({
        type: 'GET',
         url: 'http://www.aliport.online/www/mock/me.json',
         success: function(data) {
           var html = "";
           for (var i = 0; i < data.length; i++) {
              html += "<li class='meli'><p class='me-photo'><img src='"+data[i].photo+"'></p><p class='basic'>"+
                     "<p><span class='basic-icon'></span><span>基本信息</span><span>Basic information</span></p>"+
                     "<p class='info hanyi335'><p><span>姓名:"+data[i].name+"</span><span>性别:"+data[i].sex+"<i class='iconfont icon-nv pink' style='font-size:20px'></i></span></p>"+
                      "<p><span>出生:1994-12 <i class='iconfont icon-chushengriqi yellow'></i></span><span>学历:本科</span></p>"+
                      "<p><span>身高:156cm <i class='iconfont icon-shengao pink'></i></span><span>体重:50kg</span></p>"+
                      "<p><span>籍贯:四川</span><span>现居:成都 <i class='iconfont icon-jieguan blue'></i></span></p>"+
                      "<p><span>毕业院校:四川理工学院</span><span>专业:计算机科学与技术</span></p>"+
                      "<p><span>爱好:唱歌、追剧、旅游</span></p>"+
                      "<p><span>phone:18380231149</span></p>"+
                      "<p><span>email:1091440259@qq.com</span></p>"+
                       "<p><img class='weixin'src='"+data[i].weixin+"'></p>"+
                  "</p></p></li>"
             }
            $("#scroller ul").html(html);
            myScroll.refresh();
         }
      });
   }

})