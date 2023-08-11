
/* init action */
$(function(){
  skip_navi();
  layer_open_setting(); // layer btn search
  // ui.checkLabel();

  // browser   

  faq();

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

function alert_control(alertBody ,focusObj , btnObj){

  $("body").append(alertBody);
  $(".wrap").attr("aria-hidden", "true"); 

  alertBody.find(".alertCont").focus();
  alertBody.find(".alertClose").click(function(){
    close(this);
  });

  alertBody.find(".alertConfirm").click(function(){
    if(btnObj?.confirm?.callback) eval(btnObj.confirm.callback)();
    close(this);
  });

  alertBody.find(".alertCancel").click(function(){
    if(btnObj?.calcel?.callback) eval(btnObj.cancel.callback)();
    close(this);
  });

  function close(obj){
    $(obj).closest(".alertWrap").remove();
    if(focusObj) focusObj.focus();
    $(".wrap").removeAttr("aria-hidden"); 
  }

  $("body").one("keydown",function(e){
    if(e.keyCode == 27){
      close(alertBody);
    }
  })
}

function layer_alert(ment,focusObj,btnObj){
  //  aria-haspopup="dialog" data-popup="alert";
  var alertBody = $("<div>")
  alertBody.attr({
    class:'alertWrap',
    'data-popup' : 'alert',
    role : 'dialog',
  });
  
  var confirmTxt = '확인';
  if(btnObj?.confirm?.txt) confirmTxt = btnObj.confirm.txt
  const alertHTML = `
    <div class="alertBody">
      <div class="alertCont" tabindex="0">
        <p>${ment}</p>
      </div>
      <div class="alertFooter">
        <button class="alertConfirm btnBlue size-XL" aria-label="레이어 닫기" popup-confirm="alert">${confirmTxt}</button>
      </div>
      <button class="alertClose" aria-label="레이어 닫기"><span class="hidden">팝업 닫기</span></button>
    </div>
    
    <div class="alertDimm"></div>
  `;
  alertBody.html(alertHTML)

  alert_control(alertBody, focusObj , btnObj)
}


function layer_confirm(ment,focusObj,btnObj){
  //  aria-haspopup="dialog" data-popup="alert";
  var alertBody = $("<div>")
  alertBody.attr({
    class:'alertWrap',
    'data-popup' : 'alert',
    role : 'dialog',
    'aria-modal' : "true"
  });
  var confirmTxt = '확인';
  var cancelTxt = '취소';
  if(btnObj?.confirm?.txt) confirmTxt = btnObj.confirm.txt
  if(btnObj?.cancel?.txt) cancelTxt = btnObj.cancel.txt
  const alertHTML = `
    <div class="alertBody">
      <div class="alertCont" tabindex="0">
        <p>${ment}</p>
      </div>
      <div class="alertFooter">
        <button class="alertConfirm btnBlue size-XL" aria-label="레이어 닫기" popup-confirm="alert">${confirmTxt}</button>
        <button class="alertCancel btnBlue size-XL" aria-label="레이어 닫기" popup-cancel="alert">${cancelTxt}</button>
      </div>
      <button class="alertClose" aria-label="레이어 닫기"><span class="hidden">팝업 닫기</span></button>
    </div>
    
    <div class="alertDimm"></div>
  `;
  alertBody.html(alertHTML)
  
  alert_control(alertBody, focusObj , btnObj)

}


/* layer btn search  */
function layer_open_setting(){
  var btns = $(".open_layer");
  btns.on("click",function(){
    layer_open(this.getAttribute('aria-controls'),this);
  })
  
  $(document).on("click",".layerDimm" , function(){
    var layerwrap = $(this).closest(".layerWrap")
    layerwrap.removeClass("show")
    layerwrap[0].focusTarget.focus()
  })

  $(document).on("click", '.layerClose',function(){
    var layerwrap = $(this).closest(".layerWrap");
    layerwrap.removeClass("show");
    layerwrap[0].focusTarget.focus();
  })
}

/* layer control  */
function layer_open(id , obj){
  var layer = $("#" +id )
  layer.addClass("show");
  layer.find(".layerBody").focus();
  layer[0].focusTarget = obj;
  $(".wrap").attr("aria-hidden", "true"); 
}

function layer_close(id){
  var layer = $("#" +id )
  layer.removeClass("show");
  layer[0].focusTarget.focus();
  $(".wrap").removeAttr("aria-hidden"); 
}





/* faq */
function faq(){
  $(".faqCont").each(function(i,o){
    const box = $(o);
    var dt = box.find("dt");
    var dd = box.find("dd");
    dd.eq(0).addClass("on");
    dt.on("click",function(){
      $(this).toggleClass("on");
      $(this).siblings("dt").removeClass("on");
    })
  })
}