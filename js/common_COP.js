
/* loading init */
$(function(){

  gnbAction(); // gnb hover
  loginTab();
});


function loginTab(){
  var tab = $(".loginTab .loginTabBtn").each(function(n){this.n=n});
  var input = $(".loginTab input")
  var cont = $(".loginTab li");
  tab.focus(function(){
    cont.removeClass("on fast").eq(this.n).addClass("on")
  });
  input.focus(function(){
    cont.removeClass("on fast")
    $(this).closest("li").addClass("on fast")
  })
}


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