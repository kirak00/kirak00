
/* loading init */
$(function(){

  gnbAction(); // gnb hover

});



function gnbAction(){
  var header = $("header");
  var gnbStatus = false;
  function gnbOn(){
    gnbStatus = true;
    header.addClass("on");
  }
  function gnbOff(){
    gnbStatus = false;
    setTimeout(function(){
      if(!gnbStatus){
        header.removeClass("on");
      }
    },300)
  }

  $(".gnb a").on("focus",function(){
    gnbOn();
  })
  $(".gnb a").on("blur",function(){
    gnbOff();
  })

  $(".headerCont").hover(function(){
    gnbOn();
  },function(){
    gnbOff();
  })
  $("header .bg").hover(function(){
    gnbOn();
  },function(){
    gnbOff();
  })
}