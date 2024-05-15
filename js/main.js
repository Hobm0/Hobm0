//网页完全加载之后
var promptSelection="Bing";
document.addEventListener("DOMContentLoaded", function(event) {
	var engineSelection=localStorage.getItem("engineSelection");
	if(engineSelection){
		engine_selector.value=engineSelection;
	}
	else{
		engineSelection='必应';
	}
	AutoLog_in();

  });


function search2(key){
	var e = key || window.event;
	if(e && e.keyCode==13){
        let content=document.querySelector('.search_input').value;
		search(content);
	} 
}
var searchUrl="https://cn.bing.com/search?q=";

function search(content){

	if(content.trim() !== ""){
		var engineSelection=engine_selector.value;
        console.log(engineSelection)
		switch(engineSelection){
			case "bing":
	searchUrl="https://cn.bing.com/search?q=";
			break;
			case "baidu":
				searchUrl="https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=";
				break;
			case "sougou":
				searchUrl="https://www.sogou.com/web?query=";
				break;
			case "google":
				searchUrl="https://www.google.com/search?q=";
				break;
	
		}
		window.open(searchUrl+content);
	

		}
		
}
var engine_selector=document.querySelector('.engine_selector')
engine_selector.addEventListener("change", function() { 
	var selectedOption = this.value;
	localStorage.setItem("engineSelection",selectedOption);
});

function getTime() {
	var date = new Date();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	
	if (hour >= 0 && hour <= 9) hour = "0" + hour;
	if (minutes >= 0 && minutes <= 9) minutes = "0" + minutes;
	if (seconds >= 0 && seconds <= 9) seconds = "0" + seconds;
	document.querySelector(".currentTime").textContent = hour+":"+minutes+":"+seconds;
}
window.onload=setInterval("getTime()",1000);

window.onload=loadYiYan();

function loadYiYan(){
	xmlhttp = new XMLHttpRequest();
	
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			if(xmlhttp.status==200){
				var js = JSON.parse(xmlhttp.responseText);
				var middle='———';
				
				document.querySelector(".sloganText").innerHTML=js.hitokoto;
				document.querySelector(".sloganFrom").innerHTML=middle+js.from;
			}
            else{
                document.querySelector(".slogan").style.display="none"
            }
		}
	}
	xmlhttp.open("GET","https://v1.hitokoto.cn");
	xmlhttp.send();

}
var search_input=document.querySelector('.search_input');
var _prompt=document.querySelector(".prompt");
search_input.addEventListener('input', function(event) {
  // 当用户输入时，调用getPrompt函数，并传递一个回调函数
  if(event.target.value!=""){
    showPrompt(event.target.value);
  }
  else{
    _prompt.innerHTML="";
    search_input.classList.remove("isprompting");
  }
});
// 添加onfocus事件监听器
search_input.addEventListener('focus', function(event) {
    if(event.target.value!=""){
        showPrompt(event.target.value);
      }
 
    document.querySelector('.bg').classList.add('blured');

});
// 添加onblur事件监听器
search_input.addEventListener('blur', function(event) {
 
    document.querySelector('.bg').classList.remove('blured');
});
// 添加点击事件监听器到整个文档
document.addEventListener('click', function(event) {
    // 检查点击的元素是否是myElement
    if (event.target !== search_input) {
        _prompt.innerHTML="";
        search_input.classList.remove("isprompting");
    }
});

function showPrompt(text){
    getPrompt(promptSelection,text, function(data) {
      
     // 先判断数组长度是否大于0
if (data.length > 0) {
    _prompt.innerHTML="";
    search_input.classList.add("isprompting");
    // 如果数组长度大于0，遍历数组并打印每个元素
    data.forEach(function(item) {
        var div=document.createElement("div");
        div.classList.add("proptItem");
    div.textContent=item;
    div.addEventListener('click', async function () {
      _prompt.innerHTML="";
      search(item)
    });
    _prompt.appendChild(div);
        

    });
}
        });

}
function getPrompt(engine, content, callback) {
    var url;
    var data=[];
    switch (engine) {
        case "Bing":
            url = "http://sg1.api.bing.com/qsonhs.aspx?type=cb&cb=callback&q=" + content;
             // 定义全局回调函数
    window.callback = function(json) {
      json.AS.Results.forEach(function(result) {
    result.Suggests.forEach(function(suggestion) {
        data.push(suggestion.Txt)
    });
});
        callback(data); // 调用外部传入的回调函数
    };
            break;
        case "Baidu":
            url = "http://suggestion.baidu.com/su?wd=" + content + "&cb=baidu.sug";
               //定义回调函数
      window.baidu = {
          sug: function(json) {
            json.s.forEach(function(item, index) {
data.push(item)
          });
              callback( data); 
          }
      }
            break;
        case "360":
            url = "https://sug.so.360.cn/suggest?callback=suggest_so&word=" + content;
            window.suggest_so = function(json) {
              // 遍历result数组
              json.result.forEach(function(suggestion) {
    data.push(suggestion.word)
});
        callback(data); // 调用外部传入的回调函数
    };
            break;
      
    }
       // 动态添加JS脚本
       var script = document.createElement("script");
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

// 添加点击事件监听器
document.getElementById('promptSelector').addEventListener('change', function() {
    // 当选项改变时执行的函数
    promptSelection = this.value; // 获取选中的选项值
});


function hideElement(panel){
    document.querySelector("."+panel).style.display="none";
}

function showOrHidePanel(panel){
    var visibility=document.querySelector("."+panel).style.display;
    if(visibility=="none"){
visibility="block";
    }
    else{
        visibility="none";
    }
    document.querySelector("."+panel).style.display=visibility;
}



    //判断是否是网址
function isURL(str) {
	var pattern = /^(https?:\/\/)?(www\.)?((([a-zA-Z0-9-]+)\.([a-zA-Z]{2,}))|((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})))\/?/;
	var tt=pattern.test(str);
	return tt
  }





function showSuccessAlert(message) {
	var alert = document.createElement('div');
	alert.setAttribute('class', 'alert');
	alert.setAttribute('role', 'alert');
  
    var box=document.createElement('div');
    box.setAttribute('class', 'alerBox alert-success');
    box.textContent=message;
    alert.appendChild(box);
	document.body.appendChild(alert);
  
	setTimeout(function() {
	  alert.style.opacity = '0';
	  setTimeout(function() {
		alert.remove();
	  }, 1000); // 等待1秒后移除元素
	}, 1500); // 等待3秒后开始淡出动画
  }
  function showFailureAlert(message) {
    var alert = document.createElement('div');
	alert.setAttribute('class', 'alert');
	alert.setAttribute('role', 'alert');
  
    var box=document.createElement('div');
    box.setAttribute('class', 'alerBox alert-warning');
    box.textContent=message;
    alert.appendChild(box);
	document.body.appendChild(alert);
  
	setTimeout(function() {
        box.style.opacity = '0';
	  setTimeout(function() {
		box.remove();
	  }, 1000); // 等待1秒后移除元素
	}, 1500); // 等待3秒后开始淡出动画
  }



  //login
  
async function Log_in() {
    var token = "cb空74c9白5d20e的e73782bc2e值e";
  
    
    var repo_input=document.querySelector('.repo_input');
var str1=document.querySelector('.str1').value;
var str2=document.querySelector('.str2').value;
var str3=document.querySelector('.str3').value;
var str4=document.querySelector('.str4').value;

    // var token_input=document.querySelector('.token_input');
    var rememberPassword=document.getElementById('rememberPassword');
    // var token1_input=document.querySelector(".token1_input");
    var repo=repo_input.value;
    // var token=token_input.value;
    // var token1=token1_input.value;
    if (checkLastLogin()) {
        // 允许登录
    if (repo != '' && str1 != '' && str2!="" && str3!="" && str4!="") {
var loginState=sessionStorage.getItem('loginState') || localStorage.getItem('loginState');
if(!loginState){


    var part = {
        "空": str1,
        "白": str2,
        "的": str3,
        "值": str4
      };
      
      for (var key in part) {
        if (part.hasOwnProperty(key)) {
          var value = part[key];
          token = token.replace(key, value);
        }
      }

console.log(token)

  
    var loginText = await getFileContentAsString(repo,token,'login.txt');
    if(loginText){
        var  data= await getFileContentAsString(repo, token, 'data/UI.json');
        //避免重复加载UI
           if (rememberPassword.checked) {
               localStorage.setItem("token", token);
               localStorage.setItem("repo", repo);
               localStorage.setItem('loginState', 'true');
               localStorage.setItem('autoLoad', 'true');
               localStorage.setItem('UIdata', data);
             var logindata=  ["token","repo","loginState","autoLoad","UIdata","netData","eventsData","tasks","codeUIData"];
        localStorage.setItem("loginData",JSON.stringify(logindata));
           }
           else{
               sessionStorage.setItem("token", token);
               sessionStorage.setItem("repo", repo);
               sessionStorage.setItem('loginState', 'true');
               sessionStorage.setItem('autoLoad', 'true');
               sessionStorage.setItem('UIdata', data);
           
           }
           FormUI(repo,token,data);
           document.querySelector(".mysite").style.display="block";
           hideElement("settingPanel");
           hideElement("functionPanel");
           hideElement("loginPanel");
           showSuccessAlert('登录成功');
    }
        else{
            showFailureAlert('登录失败，请检查登录信息或网络');
        }

}
else{
    showSuccessAlert("已登录");
}



      }
     
    else {
        showFailureAlert('请输入完整信息');
    }
} else {
    // 阻止登录
    // 提示用户等待一段时间再尝试登录
    showFailureAlert('请1分钟后再试');
  }
}

// 检查上次登录时间
function checkLastLogin() {
    var lastLogin = localStorage.getItem('lastLogin');
  
    if (lastLogin) {
      var currentTime = new Date().getTime();
      var timeSinceLastLogin = currentTime - parseInt(lastLogin);
  
      // 如果上次登录时间距离现在少于一定的时间间隔（例如5分钟），则阻止登录
      if (timeSinceLastLogin < 5 * 60 * 1000) {
        return false;
      }
    }
  
    // 更新上次登录时间为当前时间
    localStorage.setItem('lastLogin', new Date().getTime().toString());
    return true;
  }
  


function Log_out(){
    var repo_input=document.querySelector('.repo_input');
// var token_input=document.querySelector('.token_input');
    var loginState=sessionStorage.getItem('loginState') || localStorage.getItem('loginState');
if(loginState && loginState=="true")
{
    repo_input.value = '';
    // token_input.value = '';
    // var pages=JSON.parse(localStorage.getItem("pages")) || [];
    // if(pages.length>0){
    //     pages.forEach(page => {
    //         localStorage.removeItem(page);
    //     });
    //     localStorage.removeItem("pages");
    //     document.getElementById("rememberPassword").checked=false;
    // }
    sessionStorage.clear();
    localStorage.clear();
    showSuccessAlert("退出成功");
}
else{
    showFailureAlert('未登录');
}

}

function AutoLog_in(){
    var repo_input=document.querySelector('.repo_input');
    // var token_input=document.querySelector('.token_input');
var loginState=localStorage.getItem('loginState');
if(loginState=='true'){
    var repo=localStorage.getItem('repo');
    var token=localStorage.getItem('token');
    var rememberPassword=document.getElementById('rememberPassword');
    rememberPassword.checked=true;
    repo_input.value=repo;
    // token_input.value=token;
    document.querySelector(".mysite").style.display="block";
    showSuccessAlert('自动登录完成');

    var UIdata=	localStorage.getItem('UIdata');
    if(UIdata){
        FormUI(repo,token,UIdata);
    }
    
	
}





}


async function getFileContentAsString(repo,token,path) {
    const url = `https://gitee.com/api/v5/repos/Hobm/${repo}/contents/${path}`;
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const file = await response.json();
            var content = base64ToString(file.content); // 解码文件内容
            return content;
        } else {
            throw new Error('获取文件内容失败');

        }
    } catch (error) {
        console.error(error);
    }
}

function base64ToString(base64String) {
    const decodedData = atob(base64String);
    const decoder = new TextDecoder();
    const decodedString = decoder.decode(new Uint8Array([...decodedData].map(char => char.charCodeAt(0))));
    return decodedString;
}



async function FormUI(repo,token,data){
data=JSON.parse(data);
// 遍历 bottomNav 数组，创建并添加链接到页面中
data.bottomNav.forEach(function(item) {

            var link = document.createElement('a'); // 创建 <a> 元素
        link.setAttribute('class', 'col bottomNavBtn'); // 设置 class 属性
        if(item.text!="More"){
            link.setAttribute('href', item.url); // 设置 href 属性
            link.setAttribute('target', '_blank'); // 设置 target 属性
        }
        else{
            link.addEventListener('click',async function(event) {
                var page=localStorage.getItem("nets");
                if(!page){
                    page= await getFileContentAsString(repo, token, 'pages/nets.html');
                 var autoLoad1=   localStorage.getItem('autoLoad');
      
                 if(autoLoad1=='true'){
                    localStorage.setItem(item.text, page);
                 }
                 var autoLoad2=   sessionStorage.getItem('autoLoad');
                 if(autoLoad2=='true'){
                    sessionStorage.setItem(item.text, page);
                 }
                }
                    var newWindow = window.open("", "_blank");  // 打开一个新的空白窗口或标签
                  
                    newWindow.document.write(page);  // 在新窗口中写入新的页面内容
              
            });
        }
       
        link.textContent = item.text; // 设置链接文本内容
        document.querySelector('.bottomNavContainer').appendChild(link); // 将链接添加到页面中
    

  });

  // 获取页面容器
var functionItemContainer = document.querySelector('.functionItemContainer');
// 创建元素
data.functions.forEach(function(item) {
    var link = document.createElement('div');
    link.setAttribute('class', 'item');
    link.setAttribute('page', '=' + item.text);
  
    var image = document.createElement('img');
    image.setAttribute('src', item.img);
  
    var title = document.createElement('div');
    title.setAttribute('class', 'title');
    title.textContent = item.text;
    link.addEventListener('click',async function(event) {
    event.preventDefault(); // 阻止默认行为
    // 在这里添加点击事件的具体逻辑
    var page=localStorage.getItem(item.text);
    if(!page){
        page= await getFileContentAsString(repo, token, 'pages/'+item.text+'.html');
    
    
     var autoLoad1=   localStorage.getItem('autoLoad');
 
     if(autoLoad1=='true'){
        localStorage.setItem(item.text, page);
     }
     var autoLoad2=   sessionStorage.getItem('autoLoad');
     if(autoLoad2=='true'){
        sessionStorage.setItem(item.text, page);
     }
    }
    var pages=JSON.parse(localStorage.getItem("pages")) || [];
    pages.push(item.text);
    localStorage.setItem("pages",JSON.stringify(pages));
        var newWindow = window.open("", "_blank");  // 打开一个新的空白窗口或标签
      
        newWindow.document.write(page);  // 在新窗口中写入新的页面内容
  
    

  });
    link.appendChild(image);
    link.appendChild(title);
    
    functionItemContainer.appendChild(link);
  });





return data;
}


async function RefreshUIData(){
    var loginState=localStorage.getItem('loginState');
    if(loginState=='true'){
        var repo_input=document.querySelector('.repo_input');
        var token_input=document.querySelector('.token_input');
        var  data= await getFileContentAsString(repo_input.value, token_input.value, 'data/UI.json');
 var bottomNavContainer=   document.querySelector('.bottomNavContainer');
 bottomNavContainer.innerHTML='';
    var functionItemContainer = document.querySelector('.functionItemContainer');
    functionItemContainer.innerHTML='';
        var pages=JSON.parse(localStorage.getItem("pages")) || [];
        if(pages.length>0){
            pages.forEach(page => {
                localStorage.removeItem(page);
            });
            localStorage.removeItem("pages");
            document.getElementById("rememberPassword").checked=false;
        }
        FormUI(repo_input.value,token_input.value,data);

}
else{
    showFailureAlert('请登录');
}
}

