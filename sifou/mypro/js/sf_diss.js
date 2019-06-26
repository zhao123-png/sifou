//发布评论
function publicDiss(){
	var getUrl=new URLSearchParams(location.search);
	var getPid=getUrl.get("pid");
	var getSphone=getUrl.get("sphone");
	var grate=0;
	var dateTime=new Date().toLocaleString();
	//创建xml对象
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var result=xhr.responseText;
		}
	}
	xhr.open("post","/dissapi/v1/publicDiss",true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	var formdata="sname="+getSphone+"&date="+dateTime+"&diss="+diss.value+"&greate="+grate+"&pid="+getPid;
	xhr.send(formdata);
}