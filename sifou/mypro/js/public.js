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
            getDiv.replaceChild(frag, getDiv.children[0]);


        }
    }
})();