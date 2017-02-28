// 引入zepto-modules模块
var $ = require('zepto-modules/zepto');
require('zepto-modules/event');
require('zepto-modules/ajax');
require('zepto-modules/form');
require('zepto-modules/ie');
require('zepto-modules/touch');
module.exports = $;


//判断是否首次登陆
// if(localStorage.first){
//   $(".swiper-container").hide();
//   $("#main").show();
//   $("#audio").removeAttr("autoplay");
// }else{
//   $("#main").hide();
//   localStorage.first = 0;
// }

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

//ajax请求内容填充
 $.ajax({
   type: 'GET',
   url: 'http://localhost:3000/api/skill',
   success: function(data) {
     var html = "";
     for (var i = 0; i < data.length; i++) {
       html += "<li><p class='first'><img src='"+data[i].img+"'/></p>"
                +"<p class='two'>"+"<span class='category hanyi335'>"+data[i].category+"</span>"
                +"<span class='name'>"+data[i].name+"</span>"
                +"</p>"
       +"</li>";
     };
     $("#scroller ul").html(html);
   }
 });
 myScroll = new IScroll('#wrapper', { mouseWheel: true });
 document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);




// 点击进入按钮
$('#enter').click(function(){
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
    $(".content").removeClass("show");
     $(".content").addClass("hidden");
  }
  $(this).addClass("tab-active");

$(".content").eq(index).removeClass("hidden");
$(".content").eq(index).addClass("show");

   if(apiTarget == 'work'){
     $.ajax({
         type: 'GET',
         url: 'http://localhost:3000/api/work',
         success: function(data) {
           var html = "";
           for (var i = 0; i < data.length; i++) {
              html += "<p class='line'></p><p class='work-category hanyi335 fff'>"+data[i].category+"</p>"+
                      "<p class='school-logo'><img src='"+data[i].image+"'><p class='work-name hanyi335 fff'>"+
                         "<span>"+data[i].time+"--</span>"+
                         data[i].name+"</p></p>"+
                         "<p class='work-time'>"+
                          "<span>"+data[i].exp+"</span>"+
                        "</p>"+
                         "<p class='line'></p>";
             }
              
           $(".work").html(html);
         }
      });
   }else if(apiTarget == 'project'){
       $.ajax({
         type: 'GET',
         url: 'http://localhost:3000/api/project',
         success: function(data) {
           var html = "";
           for (var i = 0; i < data.length; i++) {
              html += "<div><p>category:"+data[i].category+"</p><p>name:"+data[i].name+"</p><p>url:"+data[i].url+"</p><p>description:"+data[i].description+"</p><p>work-detail:"+data[i].detail+"</p><p>work-tech:"+data[i].tech+"</p></div>";
             }
             $(".project .project-top").html(html);
         }
      });
   }
  // $.ajax({
  //   type: 'GET',
  //   url: apiUrl,
  //   success: function(data) {
  //     var html = "";
      
  //     for (var i = 0; i < data.length; i++) {
  //       html += "<li>" + data[i].name  +"</li>";
  //     };

  //     $("#scroller ul").html(html);
  //     console.log(data);
  //   }
  // });


})