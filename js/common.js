
/* init action */
$(function(){
  skip_navi();
});


/* 스킵네비 */
function skip_navi(){
  const nav = $('.skip_nav');
  let txt = '';
  $("[id*=skip]").each(function(){
    var label = this.getAttribute("aria-label");
    txt +=`<a href="#${this.id}">${label} 바로가기</a>`
  });
  nav.html(txt);
}



function layer_alert(ment,focusObj,callback){
  //  aria-haspopup="dialog" data-popup="alert";
  var alertBody = $("<div>")
  alertBody.attr({
    class:'alertWrap',
    'data-popup' : 'alert',
    role : 'dialog',
  });
  const alertHTML = `
    <div class="alertBody">
      <div class="alertCont" tabindex="0">
        <p>${ment}</p>
      </div>
      <div class="alertFooter">
        <button class="alertConfirm" popup-close="alert" popup-confirm="alert">확인</button>
        <button class="alertCancel" popup-close="alert" popup-cancel="alert">취소</button>
      </div>
      <button class="alertClose" popup-close="popup1"><span class="hidden">팝업 닫기</span></button>
    </div>
    
    <div class="alertDimm"></div>
  `;
  alertBody.html(alertHTML)

  $("body").append(alertBody);
  alertBody.find(".alertCont").focus();
  alertBody.find(".alertConfirm").click(function(){
    eval(callback)();
    close(this);
  });
  function close(obj){
    $(obj).closest(".alertWrap").remove();
    if(focusObj) focusObj.focus()
  }
  

}