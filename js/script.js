//声明全局变量
var index = 0,
    timer = null, //定时器
    prev = byId("pre"),
    next = byId("next"),
    more = byId("more"),
    pics = byId("background").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    size = pics.length;


//封装getElementById()
function byId(id) {
    return typeof(id) === "string" ? document.getElementById(id) : id;
}

//非IE事件的事件名前不能加"on" 如:"click" 在IE事件中则为:"onclick"
function addHandler(element, type, handler) {
    //非IE
    if (element.addEventListener) {
        element.addEventListener(type, handler, true); //事件捕获
    } //IE浏览器新版本支持DOM2级事件
    else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
    } //兼容低版本不支持DOM2级事件的IE浏览器 
    else {
        element['on' + type] = handler;
    }
}

//改变banner图片
function changeImg() {
    //遍历所有图片，将图片隐藏，将圆点上的类清除
    for (var i = 0; i < size; i++) {
        pics[i].style.display = "none";
        dots[i].className = "";
    }
    //显示当前图片
    pics[index].style.display = "block";
    //当前圆点高亮显示
    dots[index].className = "active";
}

//点击下一张按钮显示下一张图片
addHandler(next, "click", function() {
    index++;
    if (index >= size) index = 0;
    changeImg();
}, true)

//点击上一张按钮显示上一张图片
addHandler(prev, "click", function() {
    index--;
    if (index < 0) index = size - 1;
    changeImg();
}, true)

//点击圆点导航切换
for (var d = 0; d < size; d++) {
    //不操作这一步会得到333，d最终的值
    dots[d].setAttribute("tid", d);
    addHandler(dots[d], "click", function() {
        index = this.getAttribute("tid");
        changeImg();
    })
}

//开启自动轮播
function startAutoPlay() {
    timer = setInterval(function() {
        index++;
        if (index >= size) index = 0;
        changeImg();
    }, 5000)
}

startAutoPlay()