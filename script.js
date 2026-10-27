let  keyName=document.getElementById("keyName");
let keyCode=document.getElementById("keyCode");
let eventCode=document.getElementById("eventCode");
let testedCount=document.getElementById("testedCount");
let totalCount=document.getElementById("totalCount");
let progressFill=document.getElementById("progressFill");
let progressText=document.getElementById("progressText");
let historyList=document.getElementById("history");
let themeButton=document.getElementById("themeButton");
let resetButton=document.getElementById("resetButton");
let historyKeys=[];
let allKeys=document.querySelectorAll(".key");
totalCount.textContent=allKeys.length;
function updateProgress(){
    let testedKeys=document.querySelectorAll(".key.tested");
    let numberTested=testedKeys.length;
    testedCount.textContent=numberTested;
    let percentage=(numberTested/allKeys.length)*100;
    progressFill.style.width=percentage+"%";
    progressText.textContent="Keep testing!";
    numberTested===allKeys.length&&(progressText.textContent="All displayed keys have been tested!");
}
function addHistory(key){
    historyKeys.unshift(key);
    historyKeys.splice(10);
    showHistory();
}
function showHistory(){
    historyList.innerHTML="";
    historyKeys.forEach(function(key){
        let item=document.createElement("li");
        item.textContent=key;
        historyList.appendChild(item);
    });
    historyKeys.length===0 &&
    (historyList.innerHTML="<li>No keys pressed yet</li>");
}
document.addEventListener("keydown", function(event){
    ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)&& event.preventDefault();
    keyName.textContent=event.key;
    keyCode.textContent=event.keyCode;
    eventCode.textContent=event.code;
    let pressedKeys=document.querySelectorAll('[data-code="'+event.code+'"]');
    pressedKeys.forEach(function(key){
        key.classList.add("tested");
        key.classList.add("active");
    });
    event.repeat || addHistory(event.key);
    updateProgress();
});
document.addEventListener("keyup", function(event){
    let releasedKeys=document.querySelectorAll('[data-code="' + event.code+'"]');
    releasedKeys.forEach(function(key){
        key.classList.remove("active");
    });
});
window.addEventListener("blur", function(){
    allKeys.forEach(function(key){
        key.classList.remove("active");
    });
});
themeButton.addEventListener("click", function(){
    document.body.classList.toggle("light-mode");
    themeButton.textContent="Dark Mode";
    document.body.classList.contains("light-mode")||(themeButton.textContent="Light Mode");
});
resetButton.addEventListener("click", function(){
    allKeys.forEach(function(key){
        key.classList.remove("tested");
        key.classList.remove("active");
    });
    keyName.textContent="None";
    keyCode.textContent="None";
    eventCode.textContent="None";
    historyKeys=[];
    showHistory();
    updateProgress();
    progressText.textContent="Start pressing the keys!";
});