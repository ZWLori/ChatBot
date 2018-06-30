window.onload = function() {

var womanIntro = document.getElementById("womanIntro");
var manIntro = document.getElementById("manIntro");
var neuIntro = document.getElementById("neuIntro");

    manIntro.style.display = "none";
    womanIntro.style.display = "none";
    neuIntro.style.display = "none";


if (sessionStorage.getItem("agentGender") == "W") {
    womanIntro.style.display = "block";

} else if (sessionStorage.getItem("agentGender") == "M") {

    manIntro.style.display = "block";
}

else if (sessionStorage.getItem("agentGender") == "N") {
    neuIntro.style.display = "block";
}

};
