window.onload = function() {
    //监听文本框
    //获取按钮 设置禁用属性
    var login_btn = document.getElementsByClassName("login_btn");
    //console.log(login_btn);
    for (let i = 0; i < login_btn.length; i++) {
        login_btn[i].setAttribute("disable", "disable");
    }
    //获取文本框
    // var input_pp = document.getElementsByClassName("input_pp");
    // for (let i = 0; i < input_pp.length; i++) {
    //     if ("oninput" in input_pp[i]) {
    //         //alert(111);
    //         input_pp[i].addEventListener("input", getKeyWord.bind(input_pp[i]));
    //     } else {

    //         input_pp[i].onpropertychange = getKeyWord;
    //     }
    // }
    var user_value = document.getElementById("user_value");
    var pwd_value = document.getElementById("pwd_value");
    if ("oninput" in user_value) {
        user_value.addEventListener("input", getKeyWord);
    } else {
        getKeyWord.onproperpychange = getKeyWord;
    }

    if ("oninput" in pwd_value) {
        pwd_value.addEventListener("input", getKeyWord);
    } else {
        pwd_value.onpropertychange = getKeyWord;
    }

    function getKeyWord() {
        let $user_value = user_value.value.length;
        let $pwd_value = pwd_value.value.length;
        if ($user_value && $pwd_value >= 1) {
            login_btn[0].removeAttribute("disable");
            login_btn[0].style = "background-color:#b60b14;color:#fff;";
        } else if ($user_value && $pwd_value < 1) {
            login_btn[0].setAttribute("disable", "disable");
            login_btn[0].style = "background-color:#f5f5f5;";
        }
        // if (this.value != null) {
        //     alert(11);
        // }
    }
    // tab切换
    // var tab_child1 = document.getElementById("tab_child");
    // console.log(tab_child1);
    //子div 切换
    var loginAndReg_tab = document.getElementsByClassName("loginAndReg_tab");
    var loginAndReg_link = document.getElementsByClassName("loginAndReg_link");
    for (var i = 0; i < loginAndReg_link.length; i++) {
        loginAndReg_link[i].index = i;
        loginAndReg_link[i].onclick = function() {
            for (var j = 0; j < loginAndReg_tab.length; j++) {
                loginAndReg_tab[j].style.display = "none";
            }
            loginAndReg_tab[this.index].style.display = "block";
        }
    }
    //获取元素 循环用
    var divs = document.getElementsByClassName("tab_1");
    //console.log(divs);
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
            last_tab_login();
            //设置点击事件
            getLi.onclick = function() {
                    tab_2[0].style.display = "block";
                    divs[0].style.display = "none";
                    divs[1].style.display = "none";
                    var AppLogin_li = document.createElement("li");
                    var AppLogin_a = document.createElement("a");
                    var AppLogin_text = document.createTextNode("App扫码登录");
                    AppLogin_a.appendChild(AppLogin_text);
                    AppLogin_a.className = "tab_link";
                    AppLogin_li.appendChild(AppLogin_a);
                    //console.log(AppLogin_li);
                    AppLogin_a.setAttribute("href", "#");
                    //console.log(getLi);
                    getUl.replaceChild(AppLogin_li, getLi);
                    var getLi2 = document.getElementsByTagName("li")[0];
                    // getLi.onclick = null;
                    // //console.log(getLi2);
                    // getLi2.onclick = function() {
                    //     alert(111);
                    // }
                    showAppLogin();

                }
                //循环所有div设置隐藏
            for (var j = 0; j < divs.length; j++) {
                divs[j].style.display = "none";
            }
            //获取点击的 a  设置对应得div显示  this执行 tab_link[i]
            divs[this.index].style.display = "block";

        }
    }
}


function showAppLogin() {
    var getUl = document.getElementById("login_list");
    var getLi = getUl.getElementsByTagName("li")[0];
    var tab_2 = document.getElementsByClassName("tab_2");
    var divs = document.getElementsByClassName("tab_1");
    getLi.onclick = function() {
        tab_2[0].style.display = "none";
        divs[0].style.display = "block";
    }
    tab_list();
}
//又一遍tab选项卡 以便重复调用
function tab_list() {
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
            //设置点击事件
            getLi.onclick = function() {
                    tab_2[0].style.display = "block";
                    divs[0].style.display = "none";
                    divs[1].style.display = "none";
                    divs[2].style.display = "none";
                    var AppLogin_li = document.createElement("li");
                    var AppLogin_a = document.createElement("a");
                    var AppLogin_text = document.createTextNode("App扫码登录");
                    AppLogin_a.appendChild(AppLogin_text);
                    AppLogin_a.className = "tab_link";
                    AppLogin_li.appendChild(AppLogin_a);
                    //console.log(AppLogin_li);
                    AppLogin_a.setAttribute("href", "#");
                    //console.log(getLi);
                    getUl.replaceChild(AppLogin_li, getLi);
                    var getLi2 = document.getElementsByTagName("li")[0];
                    // getLi.onclick = null;
                    // //console.log(getLi2);
                    // getLi2.onclick = function() {
                    //     alert(111);
                    // }
                    showAppLogin();

                }
                //循环所有div设置隐藏
            for (var j = 0; j < divs.length; j++) {
                divs[j].style.display = "none";
            }
            //获取点击的 a  设置对应得div显示  this执行 tab_link[i]
            divs[this.index].style.display = "block";
        }
    }
}

function last_tab_login() {
    let last_tab_link = document.getElementsByClassName("last_tab_link");
    let last_divs = document.getElementsByClassName("last_divs");
    for (let i = 0; i < last_tab_link.length; i++) {
        last_tab_link[i].index = i;
        last_tab_link[i].onclick = function() {
            for (let j = 0; j < last_divs.length; j++) {
                last_divs[j].style.display = "none";
            }
            last_divs[this.index].style.display = "block";
        }
    }
}