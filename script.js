let gameSeq = [];
let userSeq = [];
let highScore =  localStorage.getItem("highScore") || 0;
let btns = ["yellow",'red','purple','green']
let started = false;
let level = 0;
let h2 = document.querySelector('h2');
let h4 = document.querySelector('h4');
document.addEventListener("keypress" , function(){
    if(started==false){
        started = true;
        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },250);
}

function userFlash(btn){
    btn.classList.add('userFlash');
    setTimeout(function(){
        btn.classList.remove('userFlash');
    },250);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp , 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
        },200);
        reset();
    }
}
function btnPress(){
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener('click' ,btnPress);
}

function reset(){ 
    if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
        h4.innerHTML = `🎉 New High Score: ${highScore} 🎉`;
    } else {
        h4.innerHTML = `High Score : ${highScore}`;
    }
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}