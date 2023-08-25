
/* loading init */
$(function(){

  loginTab();
});


function loginTab(){
  var tab = $(".loginTab .loginTabBtn").each(function(n){this.n=n});
  var input = $(".loginTab input")
  var cont = $(".loginTab li");
  tab.click(function(){
    cont.removeClass("on fast").eq(this.n).addClass("on")
  });
  // input.focus(function(){
  //   cont.removeClass("on fast")
  //   $(this).closest("li").addClass("on fast")
  // })
}

