var olist = $('list');
var alilist = getByClass(olist,'liList');
var adivlist = getByClass(olist,'divList');
var onav = $('nav');
var oarroew = $('arroew');
var alinav = onav.getElementsByTagName('li');
var oheader = $('header');
var ocontent = $('content');
var iNow = 0;

var iContentHeight = 0;

//初始化
contentAuto();
bindnav();
//鼠标滚轮
mouseWheel();
listContentAuto();
// 当用户改变浏览器大小的时候，触发这个事件
window.onresize = fnResize;


function bindnav(){
    var odiv = alinav[0].getElementsByTagName('div')[0];
    odiv.style.width = '100%';
    oarroew.style.left = alinav[0].offsetLeft + alinav[0].offsetWidth/2 - oarroew.offsetWidth/2 + 'px';


    for(var i =0;i<alinav.length;i++){
        alinav[i].index = i;
        alinav[i].onmousedown = function(){
            tomove(this.index);
            iNow = this.index;
        };
    }
};

function tomove(index){
    for(var i =0;i<alinav.length;i++){
        var odiv = alinav[i].getElementsByTagName('div')[0];
        odiv.style.width = '';
    }
    oarroew.style.left = alinav[index].offsetLeft + alinav[index].offsetWidth/2 - oarroew.offsetWidth/2 + 'px';
    var odiv = alinav[index].getElementsByTagName('div')[0];
    odiv.style.width = '100%';

    olist.style.top = -index*iContentHeight + 'px';
}


function contentAuto(){
    // 获取除了nav之外可视区高度
    iContentHeight = viewHeight() - oheader.offsetHeight;
    // 设置content可视区的高度
    ocontent.style.height = iContentHeight + 'px';
    // 设置下面5个画面的高度
    for(var i = 0;i<alilist.length;i++){
        alilist[i].style.height = iContentHeight + 'px';
    }

    olist.style.top = -iNow*iContentHeight + 'px';
};


//封装fnResize，当用户更改浏览器大小的时候，触发
function fnResize(){
    contentAuto();
    listContentAuto();
};
//listContentAuto，让list中的div一直居中，css样式中设置overflow:hidden
function listContentAuto(){
    var mt = (iContentHeight - 520) / 2;
    for(var i=0;i<adivlist.length;i++){
        adivlist[i].style.marginTop = mt + 'px';
    }
};



//鼠标滚轮
function mouseWheel(){
    // 火狐：DOMMouseScroll
    // IE,谷歌：mousewheel
    if(ocontent.addEventListener){
        ocontent.addEventListener('DOMMouseScroll',toChange,false);
    }
    ocontent.onmousewheel = toChange;

    function toChange(ev){
        var ev = ev || window.event;
        // 火狐和谷歌兼容性处理
        // 判断鼠标滚轮是向上还是向下
        if(ev.detail){
            bBtn = ev.detail > 0 ? true : false;
        }else{
            bBtn = ev.wheelDelta < 0 ? true : false;
        }
        if(bBtn){
            if(iNow != alilist.length - 1){
                iNow++;
            }
            tomove(iNow);
        }else{
            if(iNow != 0){
                iNow--;
            }
            tomove(iNow);
        }
    };

};

// 封装2个方法：获取可视区的高和宽
function viewWidth(){
    return window.innerWidth || document.documentElement.clientWidth;
};
function viewHeight(){
    return window.innerHeight || document.documentElement.clientHeight;
};

// 封装getByClass方法
function getByClass(oParent,sClass){
    var aElem = oParent.getElementsByTagName('*');
    var arr = [];
    for(var i = 0;i<aElem.length;i++){
        if(aElem[i].className == sClass){
            arr.push(aElem[i]);
        }
    }
    return arr;
};

//封装获取id的方法
function $(id){
    return document.getElementById(id);
};