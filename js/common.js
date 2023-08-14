
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
    <div class="alertBody"  tabindex="0">
      <div class="alertCont">
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
    <div class="alertBody"  tabindex="0">
      <div class="alertCont">
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


/* jsgrid sample */
$(function() {

  var clients = [
    { "Name1": "<input type='checkbox' class='star' title='관심대출 선택'></input>",
      "Name2": "제출완료", 
      "Name3": "<button class='btnWhite'>제출하기</button>", 
      "Name4": "심사완료", 
      "Name5": "(주)길동건설", 
      "Name6": "1억 2000만원~2억원", 
      "Name7": "서울", 
      "Name8": "시설자금", 
      "Name9": "유", 
      "Name10": "2023-08-30", 
      "Name11": "홍길동",  
    },
    { "Name1": "<input type='checkbox' class='star' title='관심대출 선택'></input>",
      "Name2": "제출완료", 
      "Name3": "<button class='btnWhite'>제출하기</button>", 
      "Name4": "심사완료", 
      "Name5": "(주)길동건설", 
      "Name6": "1억 2000만원~2억원", 
      "Name7": "서울", 
      "Name8": "시설자금", 
      "Name9": "유", 
      "Name10": "2023-08-30", 
      "Name11": "홍길동",  
    },
    { "Name1": "<input type='checkbox' class='star' title='관심대출 선택'></input>",
      "Name2": "제출완료", 
      "Name3": "<button class='btnWhite'>제출하기</button>", 
      "Name4": "심사완료", 
      "Name5": "(주)길동건설", 
      "Name6": "1억 2000만원~2억원", 
      "Name7": "서울", 
      "Name8": "시설자금", 
      "Name9": "유", 
      "Name10": "2023-08-30", 
      "Name11": "홍길동",  
    },
    { "Name1": "<input type='checkbox' class='star' title='관심대출 선택'></input>",
      "Name2": "제출완료", 
      "Name3": "<button class='btnWhite'>제출하기</button>", 
      "Name4": "심사완료", 
      "Name5": "(주)길동건설", 
      "Name6": "1억 2000만원~2억원", 
      "Name7": "서울", 
      "Name8": "시설자금", 
      "Name9": "유", 
      "Name10": "2023-08-30", 
      "Name11": "홍길동",  
    },
    { "Name1": "<input type='checkbox' class='star' title='관심대출 선택'></input>",
      "Name2": "제출완료", 
      "Name3": "<button class='btnWhite'>제출하기</button>", 
      "Name4": "심사완료", 
      "Name5": "(주)길동건설", 
      "Name6": "1억 2000만원~2억원", 
      "Name7": "서울", 
      "Name8": "시설자금", 
      "Name9": "유", 
      "Name10": "2023-08-30", 
      "Name11": "홍길동",  
    },
    { "Name1": "<input type='checkbox' class='star' title='관심대출 선택'></input>",
      "Name2": "제출완료", 
      "Name3": "<button class='btnWhite'>제출하기</button>", 
      "Name4": "심사완료", 
      "Name5": "(주)길동건설", 
      "Name6": "1억 2000만원~2억원", 
      "Name7": "서울", 
      "Name8": "시설자금", 
      "Name9": "유", 
      "Name10": "2023-08-30", 
      "Name11": "홍길동",  
    },
    { "Name1": "<input type='checkbox' class='star' title='관심대출 선택'></input>",
      "Name2": "제출완료", 
      "Name3": "<button class='btnWhite'>제출하기</button>", 
      "Name4": "심사완료", 
      "Name5": "(주)길동건설", 
      "Name6": "1억 2000만원~2억원", 
      "Name7": "서울", 
      "Name8": "시설자금", 
      "Name9": "유", 
      "Name10": "2023-08-30", 
      "Name11": "홍길동",  
    },
    { "Name1": "<input type='checkbox' class='star' title='관심대출 선택'></input>",
      "Name2": "제출완료", 
      "Name3": "<button class='btnWhite'>제출하기</button>", 
      "Name4": "심사완료", 
      "Name5": "(주)길동건설", 
      "Name6": "1억 2000만원~2억원", 
      "Name7": "서울", 
      "Name8": "시설자금", 
      "Name9": "유", 
      "Name10": "2023-08-30", 
      "Name11": "홍길동",  
    },
    { "Name1": "<input type='checkbox' class='star' title='관심대출 선택'></input>",
      "Name2": "제출완료", 
      "Name3": "<button class='btnWhite'>제출하기</button>", 
      "Name4": "심사완료", 
      "Name5": "(주)길동건설", 
      "Name6": "1억 2000만원~2억원", 
      "Name7": "서울", 
      "Name8": "시설자금", 
      "Name9": "유", 
      "Name10": "2023-08-30", 
      "Name11": "홍길동",  
    },
    { "Name1": "<input type='checkbox' class='star' title='관심대출 선택'></input>",
      "Name2": "제출완료", 
      "Name3": "<button class='btnWhite'>제출하기</button>", 
      "Name4": "심사완료", 
      "Name5": "(주)길동건설", 
      "Name6": "1억 2000만원~2억원", 
      "Name7": "서울", 
      "Name8": "시설자금", 
      "Name9": "유", 
      "Name10": "2023-08-30", 
      "Name11": "홍길동",  
    },
    { "Name1": "<input type='checkbox' class='star' title='관심대출 선택'></input>",
      "Name2": "제출완료", 
      "Name3": "<button class='btnWhite'>제출하기</button>", 
      "Name4": "심사완료", 
      "Name5": "(주)길동건설", 
      "Name6": "1억 2000만원~2억원", 
      "Name7": "서울", 
      "Name8": "시설자금", 
      "Name9": "유", 
      "Name10": "2023-08-30", 
      "Name11": "홍길동",  
    },
    { "Name1": "<input type='checkbox' class='star' title='관심대출 선택'></input>",
      "Name2": "제출완료", 
      "Name3": "<button class='btnWhite'>제출하기</button>", 
      "Name4": "심사완료", 
      "Name5": "(주)길동건설", 
      "Name6": "1억 2000만원~2억원", 
      "Name7": "서울", 
      "Name8": "시설자금", 
      "Name9": "유", 
      "Name10": "2023-08-30", 
      "Name11": "홍길동",  
    },
];


$("#jsGrid").jsGrid({
  width: "100%",
  height: "400px",
  // inserting: true,
  // editing: true,
  sorting: true,
  paging: true,
  pageSize: 10,
  pageButtonCount: 5,
  data: clients,

  fields: [
    { name: "Name1",  type: "button", title : "관심 대출", width: 105, validate: "required", sorting: false },
    { name: "Name2", type: "text", title : "제안서<br> 제출 유무", width: 105, validate: "required" },
    { name: "Name3", type: "text", title : "제출", width: 164, validate: "required" },
    { name: "Name4", type: "text", title : "심사<br> 완료 유무", width: 100, validate: "required" },
    { name: "Name5", type: "text", title : "법인명", width: 184, validate: "required" },
    { name: "Name6", type: "text", title : "희망 신청 금액", width: 120, validate: "required" },
    { name: "Name7", type: "text", title : "지역", width: 70, validate: "required" },
    { name: "Name8", type: "text", title : "자금용도", width: 104, validate: "required" },
    { name: "Name9", type: "text",title : "담보 유무", width: 96, validate: "required" },
    { name: "Name10", type: "text", title : "제안서 마감일", width: 144, validate: "required" },
    { name: "Name11", type: "text", title : "제출자", width: 100, validate: "required" },
    // { name: "Age", type: "number", width: 50, sorting: true },
    // { name: "Address", type: "text", width: 200 },
    // { name: "Country", type: "select", items: countries, valueField: "Id", textField: "Name" },
    // { name: "Married", type: "checkbox", title: "Is Married" },
    // { type: "control" }
  ],
      
  pagerContainer: "#externalPager",
    // pagerFormat: "current page: {pageIndex} &nbsp;&nbsp; {first} {prev} {pages} {next} {last} &nbsp;&nbsp; total pages: {pageCount} total items: {itemCount}",
    pagerFormat: "{first} {prev} {pages} {next} {last}",
    pagePrevText: "<",
    pageNextText: ">",
    pageFirstText: "<<",
    pageLastText: ">>",
    pageNavigatorNextText: "&#8230;",
    pageNavigatorPrevText: "&#8230;",

  });

});