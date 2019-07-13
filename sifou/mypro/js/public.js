//获取button 绑定点击事件
(function() {
    var btns = document.querySelectorAll("#container #public_con .parasList .btn_container button ");
    for (var btn of btns) {
        btn.onclick = function() {
            var btnHtml = this.innerHTML;
            var getDiv = this.parentNode.previousElementSibling;
            //创建文档片段
            var frag = document.createDocumentFragment();
            var newBtn = document.createElement("button");
            newBtn.innerHTML = btnHtml + `<i class="fa fa-times"></i>`;
            frag.appendChild(newBtn);
            newBtn.className = "new_btn_type";
            getDiv.replaceChild(frag, getDiv.children[0]);

            var getI = document.getElementsByClassName("fa-times")[0];
            getI.style.fontWeight = "200";
            getI.onclick = function() {
                //创建文档片段
                var frag = document.createDocumentFragment();
                //创建新的文本框 以供替换
                var newInput = document.createElement("input");
                //设置文本框的属性
                newInput.setAttribute("type", "text");
                //因为这些属性是浏览器内置的可以直接  .等效于setAttribute
                // newInput.type = "text";
                // newInput.placeholder = "选择频道";
                newInput.setAttribute("placeholder", "选择频道");
                frag.appendChild(newInput);
                getDiv.replaceChild(frag, newBtn);
            }
        }
    }
})();


(function() {
    var input = document.querySelector(".prop_All_container input");
    var div = document.querySelector(".prop_All_container .property_container");
    var body = document.body;
    input.onfocus = function() {
        div.style.display = "block";
    }

    var internet = document.getElementById("internet");
    var title = document.getElementById("title");
    var pinDao = document.getElementById("pinDao");
    var tex_are = document.getElementById("tex_are");
    //console.log(pinDao);
    internet.onfocus = title.onfocus = tex_are.onfocus = pinDao.onfocus = function() {
        div.style.display = "none";
    }
    internet.onblur = title.onblur = tex_are.onfocus = pinDao.onblur = function() {
        div.style.display = "none";
    }
})();


(function() {
    var as = document.querySelectorAll(".property_container ul li a");
    var input = document.querySelector(".prop_All_container input");
    var divShow = document.querySelector(".prop_All_container .property_container");
    // var divs = document.querySelector(".prop_All_container .property_container");
    for (var i = 0; i < as.length; i++) {
        as[i].index = i;
        as[i].onclick = function() {
            var getDiv = document.querySelectorAll(".property_container .btn_prop_container");
            var li = this.parentNode;
            var lis = li.parentNode.children;
            for (var lil of lis) {
                lil.className = "";
            }
            for (var div of getDiv) {
                div.style.display = "none";
            }
            getDiv[this.index].style.display = "block";
            li.className = "active_prop";
        }
    }
})();


//获取button按钮
(function() {
    var btns = document.querySelectorAll(".btn_prop_container button");
    var input = document.querySelector(".prop_All_container input");
    var div = input.parentNode;

    for (var btn of btns) {
        btn.onclick = function() {
            //alert(111);
            //创建文档片段
            var frag = document.createDocumentFragment();

            var spans = document.querySelectorAll(".prop_Tag span");
            if (spans.length < 5) {
                var span = document.createElement("span");
                span.innerHTML = this.innerHTML + `<i class="fa fa-times small"></i>`;
                span.className = "sapn_Pro";
                frag.appendChild(span);
                div.insertBefore(frag, input);
                var width = getComputedStyle(input).width;
                //width = width.substr(0, width.length - 2);
                width = parseFloat(width);
                width -= 90;
                input.style.width = width + "px";
                input.style.display = "inline-block";
                //console.log(spans.length)

                var is = document.querySelectorAll(".prop_Tag .fa-times");
                for (var a = 0; a < is.length; a++) {
                    is[a].onclick = function() {
                        this.parentNode.parentNode.removeChild(this.parentNode);
                        width += 90;
                        input.style.width = width + "px";
                    }
                }
            }
        }
    }
})();