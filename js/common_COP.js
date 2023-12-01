

/* init action */
$(function(){
  loanSelect();
});
function loanSelect(){
  var rado =  $(".loanSelect input[type=radio]");
  rado.on("click",function(){
    $(".loanSelect .list .btnSuccess").attr("disabled", "disabled");
    if(this.checked){
      console.log("click")
      console.log('$(this).parent(".list")',$(this).parents(".list"))
      $(this).closest(".list").find(".btnSuccess").removeAttr('disabled');
    }
  })
}
  