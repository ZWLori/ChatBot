window.onload = function() {

var womanIntro = document.getElementById("womanIntro");
var manIntro = document.getElementById("manIntro");

if (sessionStorage.getItem("agentGender") == "W") {
    manIntro.style.display = "none";
} else if (sessionStorage.getItem("agentGender") == "M") {

    womanIntro.style.display = "none";
}

};
