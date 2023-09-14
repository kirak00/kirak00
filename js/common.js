
/*  krcode.contrast-finder.js */
var colorType="";function isValidateColorName(c){var d=["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen","RebeccaPurple"];var b=c.trim().toLowerCase();var a="";d.some(function(f,e){if(b===f.toLowerCase()){a=f;return true}});if(a!==""){return a}return false}function isValidateColorHex(a){a=a.trim();if(a.match(/^#?[a-f0-9]{6}$/i)!==null||a.match(/^#?[a-f0-9]{3}$/i)!==null){if(a.substr(0,1)!=="#"){a="#"+a}return a}return false}function isValideRgbMaxValue(e){var a=e.match(/(\d{1,3})/g);if(a!==null){var d=true;for(var b=0,f=a.length;b<f;b++){if(a[b]>255){d=false}}return d}return false}function isValidateColorRgb(a){a=a.trim();if(a.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)?$/i)!==null){if(isValideRgbMaxValue(a)===true){if(a.substr(-1)!==")"){a=a+")"}return a}}else{if(a.match(/^(\d{1,3}),(\d{1,3}),(\d{1,3})$/i)!==null){if(isValideRgbMaxValue(a)===true){return"rgb("+a+")"}}}return false}function isValidateColor(c){c=c.trim();var b=c.match(/,/g);var a=false;if(b!==null){if(b.length===2){a=isValidateColorRgb(c);if(a!==false){colorType="rgb"}}}else{a=isValidateColorHex(c);if(a!==false){colorType="hex"}else{a=isValidateColorName(c);if(a!==false){colorType="name"}}}return a}function hexToRgb(c){if(c.match(/^#?[a-f0-9]{3}$/i)!==null){var b=/^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(c);c=b[1]+b[1]+b[2]+b[2]+b[3]+b[3]}var a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);return"rgb("+parseInt(a[1],16)+","+parseInt(a[2],16)+","+parseInt(a[3],16)+")"}function rgbToHex(c){var b=c.replace(/[^\d,]/g,"").split(",");return"#"+((1<<24)+(+b[0]<<16)+(+b[1]<<8)+ +b[2]).toString(16).slice(1)}function computeContrast(a,b){return Math.round((a+0.05)/(b+0.05)*100)/100}function getComposantValue(a){var b=a/255;if(b<=0.03928){return b/12.92}else{return Math.pow(((b+0.055)/1.055),2.4)}}function getLuminosity(b){var f=isValidateColor(b.toString());if(colorType==="hex"){b=hexToRgb(b)}var e=/(.*?)rgb\((\d+),(\d+),(\d+)\)/.exec(b);var f=parseInt(e[2]);var d=parseInt(e[3]);var a=parseInt(e[4]);var c=getComposantValue(f)*0.2126+getComposantValue(d)*0.7152+getComposantValue(a)*0.0722;return c}function getContrastRatio(d,c){var a=getLuminosity(d);var b=getLuminosity(c);if(a>b){return computeContrast(a,b)}else{return computeContrast(b,a)}}$.extend($.krcode,{contrast:{version:"0.1.0"}});$.fn.contrast=function(options){var This=$(this);This.css("color");var a=This.css("color").replace(/ /g,"");var b=This.css("background-color").replace(/ /g,"");console.log(getContrastRatio(a,b));return getContrastRatio(a,b)};$.contrastAll=function(options){$("*").each(function(){var This=$(this);This.css("color");var a=This.css("color").replace(/ /g,"");var b=This.css("background-color").replace(/ /g,"");if(b.indexOf("rgba")>=0)return true;var d=getContrastRatio(a,b);if(d<3.5){console.log(d,this)}})};

$.datepicker.setDefaults({
  dateFormat: 'yymmdd',
  prevText: '이전 달',
  nextText: '다음 달',
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
  showMonthAfterYear: true,
  yearSuffix: '년',
  buttonImage: "../../images/common/ico_24_calendar_primary.png",
  buttonText: "달력입력",
  buttonImageOnly: false,
  showOn: "button",
dateFormat: "yy-mm-dd"
});





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

  mainRankTab();
  if($(".textarea.autoHeight").length >0) $('.textarea.autoHeight').calcTextareaHeight();


  

  $( ".calendar" ).datepicker({
  });

  

  try {
    $.contrastAll()
  } catch (error) {}




});


try {
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

} catch (error) {
  
}


/*

$("#jsGrid").jsGrid({
  pageButtonCount: 5,
});

*/

function mainRankTab(){
  var mess =  $(".rankItem");
  mess.each(function(i,o){
    this.btns = $("button",this);
    this.btnPrev = $("button.prev",this);
    this.btnNext = $("button.next",this);
    this.tit = $(".rankTitBox strong",this);
    this.cont = $(".rankTabCont ol",this);
    this.size = this.tit.length;
    this.idx = this.size * 1000;
    var This = this;
    this.action = function(n){
      This.cont.hide().removeClass("on").attr({"aria-hidden": 'true'});
      This.cont.eq(n).addClass("on").show().attr({"aria-hidden": 'false'});
      This.tit.hide().removeClass("on").attr({"aria-selected": 'false'});
      This.tit.eq(n).addClass("on").show().attr({"aria-selected": 'true'});
    }
    this.btnPrev.on("click",function(){
      This.idx--;
      var n = This.idx%This.size;
      This.action(n)
    })
    this.btnNext.on("click",function(){
      This.idx++;
      var n = This.idx%This.size;
      This.action(n)
    })
  })
}

function loginTab(){
  var tab = $(".loginTab .loginTabBtn").each(function(n){this.n=n});
  var input = $(".loginTab input")
  var titBox = $(".loginTit")
  var cont = $(".loginTab > li");
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
      layer.html(o.title.replace(/\\n/g,"<br>"))
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
    var wrap = $(o);
    var initChk = wrap.hasClass("noInit");
    var initTab = $("#"+wrap.attr("initTab")); 
    var tab = wrap.find("[role=tab]").each(function(n){this.n=n});
    var contArr = [];
    var liArr = [];

    if(tab[0].tagName.toLowerCase() == "button"){
      tab.each(function(i,o){
        this.parent = $(this.parentNode)
        var cont = document.querySelector("#"+o.getAttribute("aria-controls"));
        liArr.push(o.parentNode)
        if(cont) contArr.push(cont)
      })
    }else if(tab[0].tagName.toLowerCase() == "a"){
      tab.each(function(i,o){
        this.parent = $(this.parentNode)
        var cont = document.querySelector(o.getAttribute("href"));
        liArr.push(o.parentNode)
        if(cont) contArr.push(cont)
      })
    }

    var menuWrap = $(liArr)
    var tabCont = $(contArr);
    
    if(tabCont.length == tab.length && !initChk ){
      tabCont.hide().eq(0).show()
      if(menuWrap.length > 0){
        menuWrap.removeClass("on").eq(0).addClass("on")
      }
      tab.removeClass("on").eq(0).addClass("on")
    }else if(initChk){
      tabCont.hide()
    }

    tab.click(function(){
      if(this.parent.hasClass("disabled")) return false;
      initTab.hide()
      if(tabCont.length == tab.length ){
        tabCont.hide().attr("aria-hidden", "true");
        tabCont.eq(this.n).show().attr("aria-hidden", "false");
      }
      
      if(menuWrap.length > 0){
        menuWrap.removeClass("on");
        $(this).parent().addClass("on");
      }

      tab.removeClass("on").attr({'aria-selected' : 'false'});
      $(this).addClass("on").attr({'aria-selected' : 'true'});
      
      return false;
    })
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
    close(this);
    if(btnObj?.confirm?.callback) eval(btnObj.confirm.callback)();
  });

  alertBody.find(".alertCancel").click(function(){
    close(this);
    if(btnObj?.cancel?.callback) eval(btnObj.cancel.callback)();
  });

  function close(obj){
    $(obj).closest(".alertWrap").remove();
    if(focusObj) focusObj.focus();
    $(".wrap").removeAttr("aria-hidden"); 
  }

  $("body").one("keydown",function(e){
    if(e.keyCode == 27){
      close(alertBody);
      if(btnObj?.calcel?.callback) eval(btnObj.cancel.callback)();
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
        <button class="alertConfirm btnSuccess" aria-label="레이어 닫기" popup-confirm="alert">${confirmTxt}</button>
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
          <button class="alertConfirm btnSuccess" aria-label="레이어 닫기" popup-confirm="alert">${confirmTxt}</button>
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
  var confirmClass = '';
  var cancelClass = '';
  if(btnObj?.confirm?.txt) confirmTxt = btnObj.confirm.txt;
  if(btnObj?.cancel?.txt) cancelTxt = btnObj.cancel.txt;
  if(btnObj?.confirm?.class) confirmClass = btnObj.confirm.class;
  if(btnObj?.cancel?.class) cancelClass = btnObj.cancel.class;
  // let alertHTML = ''
  // alertHTML += ''

  let alertHTML = `
    <div class="alertBody"  tabindex="0"  role="alert">
      <div class="confirmCont">
        <p>${ment}</p>
      </div>
      <div class="alertFooter">
        <button class="alertConfirm btnSuccess" aria-label="레이어 닫기" popup-confirm="alert">${confirmTxt}</button>
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
        <button class="alertConfirm btnSuccess ${confirmClass}" aria-label="레이어 닫기" popup-confirm="alert">${confirmTxt}</button>
        <button class="alertCancel btnWhite ${cancelClass}" aria-label="레이어 닫기" popup-cancel="alert">${cancelTxt}</button>
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
    return false;
  })
  
  $(document).on("click",".layerDimm" , function(){
    var layerwrap = $(this).closest(".layerWrap");
    if(layerwrap.hasClass("modal")) return false;
    layerwrap.removeClass("show")
    layerwrap[0].focusTarget.focus()
    return false;
  })

  $(document).on("click", '.layerClose',function(){
    var layerwrap = $(this).closest(".layerWrap");
    layerwrap.removeClass("show");
    layerwrap[0].focusTarget.focus();
    return false;
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
  layer[0]?.focusTarget?.focus();
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
    
    dt.on("click",function(){
      if(this.status){
        $(this).removeClass("on");
        $(this).next("dd").attr({'aria-hidden' : false});
        this.status = false;
      }else{
        $(this).addClass("on").attr({'aria-expanded':"true"});
        $(this).siblings("dt").removeClass("on").attr({'aria-expanded':"false"});;
        $(this).siblings("dd").attr({'aria-hidden' : false});
        $(this).next("dd").attr({'aria-hidden' : true});
        this.status = true;
      }
    })
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
      this.buttonEl = this.rootEl.querySelector('[aria-expanded]');
      const controlsId = this.buttonEl.getAttribute('aria-controls');
      this.contentEl = document.getElementById(controlsId);
      this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';
      this.buttonEl.addEventListener('click', this.onButtonClick.bind(this));
    }
    onButtonClick(e) {
      const accordionOption = this.buttonEl.closest('[accordion-option]').getAttribute('accordion-option');
      if (accordionOption === 'only') { //only type
        if (this.buttonEl.ariaExpanded === 'false') { //close 
          document.querySelectorAll('.accordionTrigger').forEach((trigger) => {
            trigger.setAttribute('aria-expanded', 'false');
            this.buttonEl.setAttribute('aria-expanded', 'true');
            // this.buttonEl.closest('.accordionItem').classList.add('isOpen')
          })
          document.querySelectorAll('.accordionPanel').forEach((panel) => {
            panel.setAttribute('hidden', '');
            this.contentEl.removeAttribute('hidden');
          })
        } 
        else { // open
          this.buttonEl.setAttribute('aria-expanded', 'false');
          this.contentEl.setAttribute('hidden', '');
          // this.buttonEl.closest('.accordionItem').classList.remove('isOpen')
        }
      } else { //toggle type
        this.toggle(!this.open);
      }
      // if($(".textarea.autoHeight").length >0) $('.textarea.autoHeight').calcTextareaHeight();
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

$.fn.calcTextareaHeight = function(e) {
  $(".textarea.autoHeight").each(function (index, item) {
    var _this = $(item);
    _this.on({
      keyup: function () {
        if (_this.val().length > 0) {
          let scrollHeight = _this.prop('scrollHeight');
          _this.css("height", scrollHeight+"px");
        } 
      },
    });
    if (_this.val().length > 0) {
      let scrollHeight = _this.prop('scrollHeight');
      console.log('scrollHeight',scrollHeight)
      _this.css("height", scrollHeight+"px");
    } 
   
  });

}