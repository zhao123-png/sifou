//查询页面查询所有
function list() {
    var getUrl = new URLSearchParams(location.search);
    var getPar = getUrl.get("sphone");
    //创建XML对象
    var xhr = new XMLHttpRequest();
    //接收响应 绑定监听 readyState
    xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                //json串转换为数组
                var arr = JSON.parse(result);
                var html = "<div>";
                for (var i = 0; i < arr.length; i++) {
                    //获取当前时间 毫秒数  获取距离现在的时间
                    var mms = new Date().getTime() - arr[i].dateTi;
                    //计算秒数
                    var seconds = mms / 1000;
                    //分钟数
                    var min = Math.floor(seconds / 60);
                    //小时数
                    var hour = Math.floor(min / 60);
                    //天数
                    var day = Math.floor(hour / 24);
                    // alert(day);
                    var showTime = "";
                    if (min < 1) {
                        showTime = "刚刚发布";
                    }
                    if (min > 1) {
                        showTime = min + "分钟前";
                    }
                    if (hour > 1) {
                        showTime = hour + "小时前";
                    }
                    if (day >= 1) {
                        showTime = day + "天前";
                    }
                    html += `
					<div style="margin-bottom:30px;">
					<a href="sf_listByName.html?pid=${arr[i].pid}&sphone=${getPar}"><h4>${arr[i].title} </h4></a>
					<a href="sf_listByName.html?pid=${arr[i].pid}&sphone=${getPar}"><p id="line_wrap">${arr[i].des}   </p></a>
                    <a href="javascript:addGreat(${arr[i].greate},${arr[i].pid})">  <span style="margin-right:20px;">
                    <i id="color_gre" style="margin-right:8px;" class="fa fa-thumbs-up">&times; ${arr[i].greate}</i> 赞</span></a>
					<a href="sf_listByName.html?pid=${arr[i].pid}&sphone=${getPar}"><span style="margin-right:20px;"> ${arr[i].sname} </span></a>
					<a href="sf_listByName.html?pid=${arr[i].pid}&sphone=${getPar}"><span>${showTime}</span></a>
					</div>
					`;
                }
                html += "</div>";
                center.innerHTML = html;

            }
        }
        //打开连接
    xhr.open("get", "/userapi/v1/list", true);
    //发送请求
    xhr.send(null);
}
//根据名字查询
function listByName() {
    //获取url里面的参数
    var getUrl = new URLSearchParams(location.search);
    //获取具体参数
    var getPar = getUrl.get("pid");
    //创建xml对象
    var xhr = new XMLHttpRequest();
    //接收请求  绑定监听
    xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                var arr = JSON.parse(result);
                content.innerHTML = `
			${arr[0].title}	
			${arr[0].type}	
			${arr[0].property}	
			${arr[0].des}	
			${arr[0].dateTi}	
			`;
            }
        }
        //打开链接
    xhr.open("get", "/userapi/v1/listByName/" + getPar, true);
    //发送请求
    xhr.send(null);
}
//点赞
function addGreat(nowGreat, id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;

            if (result == 1) {

                list();
            }
        }
    }
    xhr.open("put", "/userapi/v1/addGreat", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var fordata = "greate=" + nowGreat + "&id=" + id;
    xhr.send(fordata);
}
//评论
//查询评论
function searchDiss() {
    //获取url里面？后面的参数
    var getUrl = new URLSearchParams(location.search);
    //获取具体参数
    var getPar = getUrl.get("pid");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            var arr = JSON.parse(result);
            dissContent.innerHTML = `
				${arr[0].sname}
				${arr[0].date}
				${arr[0].diss}
				${arr[0].greate}
			`;
        }
    }
    xhr.open("get", "/userapi/v1/searchDiss/" + getPar, true);
    xhr.send();
}
//跳转页面传参
function updpwd() {
    var getUrl = new URLSearchParams(location.search);
    var getPar = getUrl.get("sphone");
    window.location.href = "sf_updpwd.html?sphone=" + getPar;
}


//用户登陆
function login() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result == 1) {
                alert("登录成功");
                window.location.href = "sf_list.html?sphone=" + sphone.value;
            } else {
                alert("登录失败");
            }
        }
    }
    if (!sphone.value) {
        alert("手机号不能为空");
        return;
    }
    if (!spwd.value) {
        alert("密码不能为空");
        return;
    }

    xhr.open("get", "/userapi/v1/login/" + sphone.value + "-" + spwd.value, true);
    xhr.send(null);
}
//发帖
function public() {
    //创建时间对象
    var dates = new Date().toLocaleString();
    var xhr = new XMLHttpRequest();
    //进行非空判断
    if (!internet.value) { alert(网址不能为空); return; }
    if (!title.value) { alert(标题不能为空); return; }
    if (!type.value) { alert(类型不能为空); return; }
    if (!property.value) { alert(标签不能为空); return; }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result == 1) {
                alert("发布成功");
                window.location.href = "sf_list.html";
            } else {
                alert("发布失败");
            }
        }
    }
    xhr.open("post", "/userapi/v1/public", true);
    //设置传递的内容类型允许任意字符串
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //帖子编号pid 网址 internet  链接标题title 频道 type  标签  property 描述 des 时间 date 点赞数 greate 用户名称 sname 阅读次数 reader
    var formdata = "internet=" + internet.value + "&title=" + title.value + "&type=" + type.value + "&property=" + property.value + "&des=" + des.value + "&dateTi=" + dates + "&greate=" + 0 + "&sname=" + sname.value + "&reader=" + 0;
    //post 和put方法需要formdata
    xhr.send(formdata);
}
//用户注册
function userReg() {
    if (!sname.value) {
        alert("账号不能为空");
        retrun;
    }
    if (!sphone.value) {
        alert("手机号不能为空");
        retrun;
    }
    if (!spwd.value) {
        alert("密码不能为空");
        retrun;
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result == 1) {
                alert("注册成功");
                //如果注册成功跳转
                window.location.href = "sf_login.html";
            } else {
                alert("注册失败");
            }
        }
    }
    xhr.open("post", "/userapi/v1/reg", true);
    //设置请求头允许发送任意字符串
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var formdata = "sname=" + sname.value + "&sphone=" + sphone.value + "&spwd=" + spwd.value;
    xhr.send(formdata);
}
//检测密码
function checkPwd() {
    var getUrl = new URLSearchParams(location.search);
    var getPar = getUrl.get("sphone");
    //console.log(getPar);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //存储数据库获取的密码
            var result = xhr.responseText;
            if (result == spwd.value) {
                sp1.innerHTML = "原始密码和原密码相同";
                //如果密码相同 移除disable属性
                btn1.removeAttribute("disabled");
            } else if (result != spwd.value) {
                sp1.innerHTML = "原始密码和原密码不相同";
                //如果输入的密码和原始密码不相同  禁用按钮
                btn1.setAttribute("disabled", "false");
            }
        }
    }
    if (!spwd.value) {
        sp1.innerHTML = "原始密码不能为空";
        return;
    }
    if (!spw1.value) {
        sp3.innerHTML = "新密码不能为空";
    }
    xhr.open("get", "/userApi/v1/checkpwd/" + getPar, true);
    xhr.send();
}

function getSphone() {
    //获取参数
    var getUrl = new URLSearchParams(location.search);
    var getPar = getUrl.get("sphone");
    sphone.value = getPar;
}
//修改密码方法
function updpwd() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result == 1) {
                alert("修改成功");
            } else {
                alert("修改失败");
            }
        }
    }
    xhr.open("put", "/userApi/v1/updpwd", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var formdata = "sphone=" + sphone.value + "&spwd=" + spw1.value;
    xhr.send(formdata);
}
//给新密码进行验证
function right() {
    if (spw1.value) {
        sp3.innerHTML = " ";
    }
}

function closeKn() {
    var getKnow = document.getElementById("know-content");
    getKnow.style.display = "none";
}

//回到顶部显示隐藏
;
(function() {
    var getDiv = document.getElementById("trrget_");
    var a = document.getElementById("goBack");
    getDiv.style.display = "none";

    a.onclick = function(e) {
            e.preventDefault();
            window.scrollTo(0, 0);
        }
        //获取window的滚动条事件
    window.onscroll = function() {
        var scrollTop = document.documentElement.scrollTop || this.document.body.scrollTop;
        if (scrollTop > 400) {
            getDiv.style.display = "block";

        } else {
            getDiv.style.display = "none";
        }
    }
})();

//广告
;
(function() {
    var getAdvDiv = document.getElementById("adv_show");
    window.onscroll = function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 1000) {
            getAdvDiv.style.position = "fixed";
            getAdvDiv.style.right = "15%";
            getAdvDiv.style.top = "3%";
            getAdvDiv.style.width = "269px";
        } else {
            getAdvDiv.style.position = "static";
        }
    }
})();

;
(function() {
    var getClose = document.getElementById("logo_close");
    getClose.onclick = function() {
        this.parentNode.parentNode.style.display = "none";
    }
})();