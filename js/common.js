
/* init action */
$(function(){

  gnbAction(); // gnb hover

  skip_navi();

  layer_open_setting(); // layer btn search
  // ui.checkLabel();

  // browser   

  faq();

  /* Range 달력 */
  datepickerRange_init();

  accordion();
  tabScript();
  messageList()

  //tooltip 자동생성
  tooltip_q();

  loginTab();

  if($(".filebox").length >0) $('.filebox .uploadHidden').fileAttach();
});

jsGrid.setDefaults({
  width: "100%",
  filtering: false,
  inserting: false,
  editing: false,
  sorting: false,
  paging: true,
  pageSize: 10,
  pageButtonCount: 10,
  pagerFormat: "{first} {prev} {pages} {next} {last}",
  pagePrevText: "이전",
  pageNextText: "다음",
  pageFirstText: "처음으로",
  pageLastText: "맨끝으로",
  /*
  
                pageNavigatorNextText: "&#8230;",
                pageNavigatorPrevText: "&#8230;",

  */
});

/*

$("#jsGrid").jsGrid({
  pageButtonCount: 5,
});

*/

function loginTab(){
  var tab = $(".loginTab .loginTabBtn").each(function(n){this.n=n});
  var input = $(".loginTab input")
  var titBox = $(".loginTit")
  var cont = $(".loginTab li");
  tab.click(function(){
    tab.attr({'aria-selected' : 'false'}).eq(this.n).attr({'aria-selected' : 'true'})
    cont.removeClass("on fast").eq(this.n).addClass("on")
    titBox.hide().eq(this.n).show()
  });
  // input.focus(function(){
  //   cont.removeClass("on fast")
  //   $(this).closest("li").addClass("on fast")
  // })
}





function tooltip_q(){
  $(".tooltip_q").each(function(i,o){
    var obj = $(o)
    obj.hover(function(){
      var layer = $("<span class='tooltipLayer'>");
      layer.html(o.title)
      obj.append(layer)
    },function(){
      $(".tooltipLayer" , o).remove()
    })
  })
}

function messageList(){
  var chk =  $(".messageList input[type=checkbox]");
  chk.on("click",function(){
    if(this.classList.contains("chk_all")){
      
      if(!this.checked){
        $(".messageList tr").removeClass("checked")
        chk.each(function(i,o){
          o.checked=false
        })
      }else{
        $(".messageList tr").removeClass("checked").addClass("checked")
        chk.each(function(i,o){
          o.checked=true
        })
      }
      
    }else{
      if(this.checked){
        $(this).closest("tr").addClass("checked");
      }else{
        $(this).closest("tr").removeClass("checked");
      }
    }
  })
}


function tabScript(){
  $(".tabScript").each(function(i,o){
    var tabCont = $(o);
    var menu = tabCont.children();
    var tab = tabCont.find("[role=tab]").each(function(n){this.n=n});
    var lnk = false;
    var menuWrap =[];
    if(menu[0].tagName.toLowerCase() == "li"){
      menu = tabCont.find("> li > a");
      lnk = true;
      if(menu.length == 0){
        menu = tabCont.find("> li > button");
        lnk = false;
      }
      menuWrap = tabCont.find(">li");
    }
    
    var tabCont = $(this).siblings("[role=tabpanel]");
    if(lnk){
      var conTxt = []
      menu.each(function(i){
        if(i != 0){
          conTxt +=","
        }
        conTxt += this.getAttribute("href");
      });
      tabCont = $(conTxt);
    }else if(tabCont.length ==0){
      var conTxt = []
      menu.each(function(i){
        if(i != 0){
          conTxt +=","
        }
        conTxt += "#"+this.getAttribute("aria-controls");
      });
      tabCont = $(conTxt);
    }

    if(tabCont.length == tab.length ){
      tabCont.hide().eq(0).show()
      if(menuWrap.length > 0){
        menuWrap.removeClass("on").eq(0).addClass("on")
      }
      tab.removeClass("on").eq(0).addClass("on")
      tab.click(function(){
        
        if(menuWrap.length > 0){
          menuWrap.removeClass("on")
          $(this).parent().addClass("on")
        }
        tab.removeClass("on").attr({'aria-selected' : 'false'})
        $(this).addClass("on").attr({'aria-selected' : 'true'})
        
        
        tabCont.hide().eq(this.n).show().attr("aria-hidden", "false");
        return false;
      })
    }
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



function datepickerRange_init(){
  var el = document.querySelectorAll('.rangePicker');
  el.forEach(function(o){
    var datepicker = new RangeDatepicker(o);
    var open_datepicker_button = $(o).siblings(".rangePickerBtn")[0];
    if(open_datepicker_button){
      open_datepicker_button.addEventListener('click', open_rangepicker_function);
      function open_rangepicker_function() {
        datepicker.open();
      }
    }
 })

}


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

  alertBody.find(".alertBody").focus();
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

function layer_alert(msg,focusObj,btnObj){
  //  aria-haspopup="dialog" data-popup="alert";
  var alertBody = $("<div>")
  var ment = ''
  var tit = ''
  if(typeof msg == "string"){
    ment = msg
  }else{
    ment = msg.ment
    tit = msg.tit
  }
  alertBody.attr({
    class:'alertWrap',
    'data-popup' : 'alert',
    role : 'dialog',
  });
  
  var confirmTxt = '확인';
  if(btnObj?.confirm?.txt) confirmTxt = btnObj.confirm.txt
  let alertHTML = `
    <div class="alertBody" tabindex="0"  role="alert">
      <div class="alertCont">
        <p>${ment}</p>
      </div>
      <div class="alertFooter">
        <button class="alertConfirm btnBlue" aria-label="레이어 닫기" popup-confirm="alert">${confirmTxt}</button>
      </div>
      <button class="alertClose" aria-label="레이어 닫기"><span class="hidden">팝업 닫기</span></button>
    </div>
    <div class="alertDimm"></div>
  `;
  if(tit){
     alertHTML = `
      <div class="alertBody"  tabindex="0"  role="alert">
        <div class="alertCont">
          <div class="tit">${tit}</div>
          <p>${ment}</p>
        </div>
        <div class="alertFooter">
          <button class="alertConfirm btnBlue" aria-label="레이어 닫기" popup-confirm="alert">${confirmTxt}</button>
        </div>
        <button class="alertClose" aria-label="레이어 닫기"><span class="hidden">팝업 닫기</span></button>
      </div>
      <div class="alertDimm"></div>
    `;
  }
  alertBody.html(alertHTML)

  alert_control(alertBody, focusObj , btnObj)
}


function layer_confirm(msg,focusObj,btnObj){
  //  aria-haspopup="dialog" data-popup="alert";
  var alertBody = $("<div>");
  var ment = ''
  var tit = ''
  if(typeof msg == "string"){
    ment = msg
  }else{
    ment = msg.ment
    tit = msg.tit
  }
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
  // let alertHTML = ''
  // alertHTML += ''

  let alertHTML = `
    <div class="alertBody"  tabindex="0"  role="alert">
      <div class="confirmCont">`
      + `  <p>${ment}</p>
      </div>
      <div class="alertFooter">
        <button class="alertConfirm btnBlue" aria-label="레이어 닫기" popup-confirm="alert">${confirmTxt}</button>
        <button class="alertCancel btnWhite" aria-label="레이어 닫기" popup-cancel="alert">${cancelTxt}</button>
      </div>
      <button class="alertClose" aria-label="레이어 닫기"><span class="hidden">팝업 닫기</span></button>
    </div>
    
    <div class="alertDimm"></div>
  `;
   if(tit) 
   alertHTML = `
    <div class="alertBody"  tabindex="0" role="alert">
      <div class="confirmCont">
        <div class="tit">${tit}</div>
        <p>${ment}</p>
      </div>
      <div class="alertFooter">
        <button class="alertConfirm btnBlue" aria-label="레이어 닫기" popup-confirm="alert">${confirmTxt}</button>
        <button class="alertCancel btnWhite " aria-label="레이어 닫기" popup-cancel="alert">${cancelTxt}</button>
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
    var layerwrap = $(this).closest(".layerWrap");
    if(layerwrap.hasClass("modal")) return false;
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
  layer.find(".layerBody").attr({tabindex:0}).focus();
  layer[0].focusTarget = obj;
  $(".wrap").attr("aria-hidden", "true"); 
}

function layer_close(id){
  var layer = $("#" +id )
  layer.removeClass("show");
  layer.find(".layerBody").attr({tabindex:-1});
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
    var focusChk = false;
    dt.on("focus",function(){
      $(this).addClass("on");
      $(this).siblings("dt").removeClass("on");
      focusChk = true;
      console.log(2, focusChk)
      setTimeout(()=>{
        focusChk = false;
      },100)
    })
    dt.on("click",function(){
      console.log(1, focusChk)
      if(!focusChk) $(this).toggleClass("on");
    });
  })
}



function grid_template_star(value, item) {
  if (value == true) {
    return "<input type='checkbox' class='star' checked></input>";
  } else if (value == false) {
    return "<input type='checkbox' class='star'></input>";
  } else {
    return "-";
  }
}



function accordion() {
  class Accordion {
    constructor(domNode) {
      this.rootEl = domNode;
      this.buttonEl = this.rootEl.querySelector('button[aria-expanded]');
      const controlsId = this.buttonEl.getAttribute('aria-controls');
      this.contentEl = document.getElementById(controlsId);
      this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';
      this.buttonEl.addEventListener('click', this.onButtonClick.bind(this));
    }
    onButtonClick() {
      const accordionOption = this.buttonEl.closest('[accordion-option]').getAttribute('accordion-option');
      if (accordionOption === 'only') { //only type
        if (this.buttonEl.ariaExpanded === 'false') { //close 
          document.querySelectorAll('.accordionTrigger').forEach((trigger) => {
            trigger.setAttribute('aria-expanded', 'false');
            this.buttonEl.setAttribute('aria-expanded', 'true');
          })
          document.querySelectorAll('.accordionPanel').forEach((panel) => {
            panel.setAttribute('hidden', '');
            this.contentEl.removeAttribute('hidden');
          })
        } else { // open
          this.buttonEl.setAttribute('aria-expanded', 'false');
          this.contentEl.setAttribute('hidden', '');
        }
      } else { //toggle type
        this.toggle(!this.open);
      }
    }
    toggle(open) {
      if (open === this.open) {
        return;
      }
      this.open = open;
      this.buttonEl.setAttribute('aria-expanded', `${open}`);
      if (open) {
        this.contentEl.removeAttribute('hidden');
      } else {
        this.contentEl.setAttribute('hidden', '');
      }
    }
    open() {
      this.toggle(true);
    }
    close() {
      this.toggle(false);
    }
  }

  const accordions = document.querySelectorAll('.accordion .accordionTitle');
  accordions.forEach((accordionEl) => {
    new Accordion(accordionEl);
  });

} 

$.fn.fileAttach = function() {	  
	$(this).each(function(i, item) {
		$(item).on('change', function(){			
			if(window.FileReader){
				var filename = $(this)[0].files[0].name;
			} else {
				var filename = $(this).val().split('/').pop().split('\\').pop();
			}
			$(this).siblings('.input').val(filename);
		});
	});
};