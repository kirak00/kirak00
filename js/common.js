
/* init action */
$(function(){
  skip_navi();
  // ui.checkLabel();
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
      </div>
      <button class="alertClose" popup-close="popup1"><span class="hidden">팝업 닫기</span></button>
    </div>
    
    <div class="alertDimm"></div>
  `;
  alertBody.html(alertHTML)

  $("body").append(alertBody);
  alertBody.find(".alertCont").focus();
  alertBody.find(".alertConfirm").click(function(){
    if(callback) eval(callback)();
    close(this);
  });
  function close(obj){
    $(obj).closest(".alertWrap").remove();
    if(focusObj) focusObj.focus()
  }

  $("body").one("keydown",function(e){
    console.log()
    if(e.keyCode == 27){
      close(alertBody);
    }
  })
}


function layer_confirm(ment,focusObj,callback1,callback2){
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
    if(callback1) eval(callback1)();
    close(this);
  });
  alertBody.find(".alertCancel").click(function(){
    if(callback2) eval(callback2)();
    close(this);
  });
  function close(obj){
    $(obj).closest(".alertWrap").remove();
    if(focusObj) focusObj.focus()
  }

  $("body").one("keydown",function(e){
    console.log()
    if(e.keyCode == 27){
      close(alertBody);
    }
  })
}
