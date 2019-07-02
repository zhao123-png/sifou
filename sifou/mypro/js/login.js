window.onload = function() {
    //获取元素 循环用
    var divs = document.getElementsByClassName("tab_1");
    var tab_link = document.getElementsByClassName("tab_link");
    //获取a的下标
    for (var i = 0; i < tab_link.length; i++) {
        //给index赋值
        tab_link[i].index = i;
        //设置点击事件
        tab_link[i].onclick = function() {
            //微信登录界面隐藏
            var tab_2 = document.getElementsByClassName("tab_2");
            tab_2[0].style.display = "none";
            //创建li元素
            var addTab_link = document.createElement("li");
            //创建a元素
            var add_a = document.createElement("a");
            //添加文本节点
            addTab_link.appendChild(add_a);
            var textNode = document.createTextNode("微信注册登录");
            add_a.appendChild(textNode);
            var getUl = document.getElementById("login_list");
            //替换节点  通过父元素 获取要替换的节点 
            getUl.replaceChild(addTab_link, getUl.getElementsByTagName("li")[0]);
            var getLi = getUl.getElementsByTagName("li")[0];
            getLi.childNodes[0].setAttribute("href", "#");
            //循环所有div设置隐藏
            for (var j = 0; j < divs.length; j++) {
                divs[j].style.display = "none";
            }
            //获取点击的 a  设置对应得div显示  this执行 tab_link[i]
            divs[this.index].style.display = "block";
        }
    }
}