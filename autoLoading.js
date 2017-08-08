/**
 * Created by Administrator on 2017/8/8.
 */
var button = document.querySelector(".button-more");
var sectionMain = document.querySelector("section.main");
button.onclick = function () {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "./page2.html")
    httpRequest.onload = buttonClick;
    function buttonClick() {
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
                if (j === 0)
                    newImg.setAttribute("src", divArr[j]);
                else if (j === 1)
                    newP1.textContent = divArr[j]
                else if (j === 2)
                    newP2.textContent = divArr[j];
            }
        }
        if (responseObj.next === "none") {
            button.textContent = "没有更多了";
            button.setAttribute("disabled", true);
        }
    }

    httpRequest.send();
}
window.onscroll = scrollFn;
function scrollFn() {
    console.log(pageYOffset)
    if (pageYOffset > 890) {
        button.click();
        window.removeEventListener("scroll",scrollFn);
    }
}
