

/* init action */
$(function(){
  loanSelect();
});
function loanSelect(){
  var rado =  $(".loanSelect input[type=radio]");
  rado.on("click",function(){
    // $(".loanSelect .list .btnSuccess").removeClass("disabled", "disabled");
    $(".loanSelect .list").removeClass("active")
    $(".radiotTabCont").removeClass("on")
    if(this.checked){
      // $(this).closest(".list").find(".btnSuccess").removeAttr('disabled');
      $(this).closest(".list").addClass("active")
      var checkedId = $(this).prop("checked",true).attr("id");
      $("."+checkedId).addClass("on");
    }
  })
}
  