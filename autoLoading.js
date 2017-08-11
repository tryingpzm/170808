/**
 * Created by Administrator on 2017/8/8.
 */
var button = document.querySelector(".button-more");
var sectionMain = document.querySelector("section.main");
var loadingGif=new Image();
loadingGif.src="//i.loli.net/2017/08/11/598d948516149.gif";
var loading=false;
button.onclick = buttonClick
function buttonClick() {
    // console.log("button被点了")
    // console.log(flag)
    if(loading===true) return;
    loading=true;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "./page2.html")
    httpRequest.onload =function() {
        var responseString = httpRequest.responseText;
        var responseObj = JSON.parse(responseString);
        var responseArr = responseObj.content;
        for (var i = 0; i < responseArr.length; i++) {
            var divArr = responseArr[i];
            var newDiv = document.createElement("div");
            var newImg = document.createElement("img");
            var newP1 = document.createElement("p");
            var newP2 = document.createElement("p");
            sectionMain.appendChild(newDiv);
            newDiv.appendChild(newImg);
            newDiv.appendChild(newP1);
            newDiv.appendChild(newP2);
            for (var j = 0; j < divArr.length; j++) {
                if (j === 0){
                    newImg.setAttribute("fakesrc", divArr[j]);
                    newImg.src=loadingGif.src;
                    }
                else if (j === 1)
                    newP1.textContent = divArr[j]
                else if (j === 2)
                    newP2.textContent = divArr[j];
            }
        }
        if (responseObj.hasNext === false) {
            button.textContent = "没有更多了";
            button.setAttribute("disabled", true);
        }
        loading=false;
    }

    httpRequest.send();
}
window.onscroll = function(){
    //button出现时，点击
    if(eleAppear(button)) button.click();
    //img元素出现时，给src=fakesrc
    var allImg=document.querySelectorAll("img[fakesrc]");
    for(var i=0;i<allImg.length;i++){
        if(eleAppear(allImg[i])){
            allImg[i].src=allImg[i].getAttribute("fakesrc")
        }
    }
}

function eleAppear(ele){
    var eleHeight=ele.getBoundingClientRect().height;
    var eleTop = ele.getBoundingClientRect().top;
    var clientH = window.innerHeight
    if (eleTop < clientH - eleHeight/2) {
        return true
        // window.removeEventListener("scroll",scrollFn);
    }
}