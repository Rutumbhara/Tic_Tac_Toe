//selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");


window.onload = ()=>{ //once window loaded
    for (let i = 0; i < allBox.length; i++) {  //add onclick attribute in all available section's spans
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}
selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide"); //hide the select box when playerX button clicked
    playBoard.classList.add("show"); //show the playboard section when playerX button clicked
}
selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide");  //hide the select box when playerO button clicked
    playBoard.classList.add("show");  //show the playboard section when playerO button 
    players.setAttribute("class", "players active player"); //adding three class name in player
}
let playerXIcon = "fas fa-times",
playerOIcon = "far fa-circle",
playerSign = "X",
runBot = true;
function clickedBox(element){
    if(players.classList.contains("player")){  //if players element has contains player user clicked element
        //if player select O then we'll change the sign
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;  //adding circle icon tag inside 
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;  //adding cross icon tag inside user clicked element
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner(); //calling the winner function
    element.style.pointerEvents = "none"; //once user select any box then that box can't be selected again
    playBoard.style.pointerEvents = "none";  //once user select any box then user can't select any other box until bot selects
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();   //generating random time delay so bot will delay randomly to select box
    setTimeout(()=>{
        bot(runBot);
    }, randomTimeDelay);  //passing random delay
}

// bot click function
function bot(){
    let array = []; //creating empty array....we'll store unselected box index in this array
    if(runBot){  //if runbot is true run the following codes
        //first change the playerSign... so if user has X value in id then bot will have O 
        playerSign = "O";
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){
                array.push(i); 
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if(array.length > 0){
            if(players.classList.contains("player")){ 
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.add("active");
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}
function getIdVal(classname){
    return document.querySelector(".box" + classname).id;
}
function checkIdSign(val1, val2, val3, sign){ 
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}
function selectWinner(){
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)){
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }else{
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);  //700 ms delay
            wonText.textContent = "Match has been drawn!";
        }
    }
}
replayBtn.onclick = ()=>{
    window.location.reload();
}