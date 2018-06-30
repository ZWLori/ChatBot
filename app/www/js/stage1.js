// False: lab experiment; True: online version
var online_version = false;
var container = $("#chatContainer");
var chosen_options = [];
var roboScriptLst = [];
var responseOptsLst = [];
var convRoundCount = 0;
var userResponses = {};
var script = sessionStorage.getItem("convScript");
var gender = sessionStorage.getItem("agentGender");
console.log(script);
console.log(gender);

$.ajaxSetup({
    async: false
});

var file = get_script_file();
var commonScripts;
var neutralEndingScripts;


$.getJSON(file, function(data){
    commonScripts = data["scripts"];
    if (file.includes("neutral"))
        neutralEndingScripts = data["end"];
    if (gender == "W")
        name = "Michelle"
    else if (gender == "M")
        name = "Michael"  
    else
        name = "Zan"  
    commonScripts[0][0][0] = commonScripts[0][0][0].replace("NAME", name);

    $.each(commonScripts, function (infoIndex, info){
        roboScriptLst.push(info[0]);
        responseOptsLst.push(info[1]);
    })
    oneConvRound(convRoundCount);
});
    
function get_script_file() {
    if (gender == "W"){
        $("#agent-image").attr("src", "./images/avatar/female.png");
        $(".user-description").prepend("<h3 style='margin-top: 20px;'>Michelle</h3>");
    } 
    else if (gender == "M"){
        $("#agent-image").attr("src", "./images/avatar/male.png");
        $(".user-description").prepend("<h3 style='margin-top: 20px;'>Michael</h3>");
    }
    
    // change the avatar based on requirements
    if (script == 'N')
        file = "./scripts/neutral.json";
    else if (script == 'W')
        file = "./scripts/woman.json";
    else if (script == "M")
        file = "./scripts/man.json";
    
    return file;
}

function oneConvRound(index){
    if (convRoundCount >= roboScriptLst.length)
        return
    robo = roboScriptLst[index];
    // create a box to holds the waiting dots
    wait_box = create_chat_box("left", "");
    // add the wait dots
    create_wait_animation(wait_box.box);
    // remove the wait dots after some time and then display all message
    simulate_delay(wait_box).then(()=> {
        for (i=0;i<robo.length;i++) {
            box = create_chat_box("left", robo[i]);
            add_text(box.box, box.text);
        }
        create_options(responseOptsLst[index]);
        convRoundCount += 1;
    });
}

//Create html chat box
function create_chat_box(side, content) {
    box = document.createElement("div");
    text = document.createElement("div");
    text.innerHTML = content;
    // box.className = "box";
    if (side == "left") { //robot side
        box.className = "msg-row msg-left";
        text.className = "msg msg-bounce-in-left";

    } else {
        box.className = "msg-row msg-right";
        text.className = "msg msg-bounce-in-right";

    }
    container.append(box);
    return {
        "box":
        box,
        "text":
        text
    }
}

function add_text(box, text) {
    box.appendChild(text);
}

function create_wait_animation(box) {
    var wait_dots = document.createElement("div");
    wait_dots.className = "msg wait-dots";

    var dots = [];
    for (var i = 0; i < 3; i++) {
        dots[i] = document.createElement("div");
        dots[i].className = "dot";
        wait_dots.appendChild(dots[i]);
    }
    box.appendChild(wait_dots);
}


function remove_wait_animation(box) {
    $(".wait-dots").remove();
}

//Create html element for options
function create_options(content_list) {
    $('html, body').animate({scrollTop:$(document).height()}, 'slow');
    html_str = "<div class='msg-row msg-right'>";
    for (c in content_list) {
        html_str += "<button class='btn btn-primary option' onclick=chose_opt(this)>" + content_list[c] + "</button>";
    }
    container.append(html_str + "</div>");
}

// Response after user chosing an option
function chose_opt(ele) {
    if (ele.innerText == "I'm ready to proceed!") {
        document.location.href = 'stage2.html';
        // store the chosen options
        return;
    }

    if (ele.innerHTML == "Next") {
        // TODO change to required website
        var win = window.open('survey.html', '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
    }
    if (file.includes("neutral")) {
            if (ele.innerHTML.includes("bank savings")){
                userResponses["bank-savings"] = [];
                index = commonScripts[0][1].indexOf(ele.innerText);
                commonScripts[0][1].splice(index,1);
                console.log(commonScripts);
                $.getJSON(file, function(data){
                    selectChoice = data["bank-savings"];
                })
                $.each(selectChoice,function (infoIndex, info){
                    roboScriptLst.push(info[0]);
                    responseOptsLst.push(info[1]);
                })
            }
            else if (ele.innerHTML.includes("life insurance")){
                userResponses["life-insurance"] = [];
                index = commonScripts[0][1].indexOf(ele.innerText);
                commonScripts[0][1].splice(index,1);
                console.log(commonScripts);
                $.getJSON(file, function(data){
                    selectChoice = data["life-insurance"]
                })
                $.each(selectChoice,function (infoIndex, info){
                    roboScriptLst.push(info[0]);
                    responseOptsLst.push(info[1]);
                })
            }
            else if (ele.innerHTML.includes("home loan")){
                userResponses["home-loan"] = []
                index = commonScripts[0][1].indexOf(ele.innerText);
                commonScripts[0][1].splice(index,1);
                console.log(commonScripts);
                $.getJSON(file, function(data){
                    selectChoice = data["home-loan"]
                })
                $.each(selectChoice,function (infoIndex, info){
                    roboScriptLst.push(info[0]);
                    responseOptsLst.push(info[1]);
                })
            } 
            
        
    }
   
    
    if (ele.innerHTML.includes("input")) {
        $(ele.children[1]).off().click(function(){
            if ($(ele.children[0]).val()[0]=="-"){
                alert("Please enter positive number");
                return;
            }
            if ($(ele.children[0]).val()){
                // do validation on the code
                if($(ele.children[0]).attr("name").includes("verification")){
                    vCode = $(ele.children[0]).attr("name").replace("verification", "");
                    if(vCode != $(ele.children[0]).val()){
                        alert("Please enter valid code!");
                        return;
                    }
                    else if (file.includes("neutral")){
                        if (Object.keys(userResponses).length < 3){
                            $(ele).attr("disabled", "disabled");
                            roboScriptLst.length = 0;
                            responseOptsLst.length = 0;
                            $.each(commonScripts, function (infoIndex, info){
                                roboScriptLst.push(info[0]);
                                responseOptsLst.push(info[1]);
                            })
                            convRoundCount = 0;
                        }
                        else {
                            $.each(neutralEndingScripts, function (infoIndex, info){
                                roboScriptLst.push(info[0]);
                                responseOptsLst.push(info[1]);
                            })
                        }
                    }
                }


                $(ele).attr("disabled", "disabled");
                $(ele).children().attr("disabled", "disabled");
                $("#options").remove();  //TODO: doesnt work
                $('html, body').animate({scrollTop:$(document).height()}, 'slow');
                chosen_options.push($(ele.children[0]).val());
                right_chat_box= create_chat_box("right", $(ele.children[0]).val());
                add_text(right_chat_box.box, right_chat_box.text);
    
                oneConvRound(convRoundCount);
            }
            
        });
    }
    else {
        $(ele).attr("disabled", "disabled");
        $(ele).siblings().attr("disabled", "disabled");
        console.log("enter else");
        $("#options").remove();  //TODO: doesnt work
        $('html, body').animate({scrollTop:$(document).height()}, 'slow');
        chosen_options.push(ele.innerText);
        right_chat_box= create_chat_box("right", ele.innerText);
        add_text(right_chat_box.box, right_chat_box.text);

        oneConvRound(convRoundCount);
    }

}

function nextRound(ele){
    $.getJSON(file, function(data){
        $.each(data["common-scripts"], function (infoIndex, info){
            roboScriptLst.push(info[0]);
            responseOptsLst.push(info[1]);
        })
        oneConvRound(convRoundCount);
    });
}

async function simulate_delay(box) {
    await timeout(1000);
   remove_wait_animation(box.box);
   // add_text(box.box, box.text);
}

function timeout (ms) {
    return new Promise(res => setTimeout(res,ms));
}

function store_user_input() {
    try {
        $.post('/upload.php', {
            "stage": "record",
            "study": sessionStorage.getItem("Study"),
            "agentGender": sessionStorage.getItem("agentGender"),
            "convScript": sessionStorage.getItem("convScript")
        })
    }
    catch(err) {
        alert(err);
    }

}

function submitSurvey() {

    var surveyP1 = document.getElementById("surveyP1");
    var surveyP2 = document.getElementById("surveyP2");

    if (surveyP1.style.display === "none") {
        surveyP1.style.display = "block";
    } else {
        surveyP1.style.display = "none";
        surveyP2.style.display = "block";
    }

    if (surveyP2.style.display === "block") {
            // upload user's input
     //   document.location.href = '';
    }
}