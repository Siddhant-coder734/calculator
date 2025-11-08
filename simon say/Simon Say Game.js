let gameseq=[];
let userseq=[];


let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game is started");
        started = true;

        levelup();
    }

});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randidx = Math.floor(Math.random() * 3);
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    // console.log(randidx);
    // console.log(randcolor);
    // console.log(randbtn);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameflash(randbtn);
}

function checkans(idx) {
    
    if ( userseq[idx] === gameseq[idx] ) {  
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        };
        
    }else {
        h2.innerHTML = `Game Over! Your score was <b>${level}<b>.<br> press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
        
    };
    
};
    

function btnpress() {
    let btn = this;
    userflash(btn);
    

    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    console.log(userseq);

    checkans(userseq.length - 1);
   
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnpress);
};

function reset() {
    started = false;
    if (level > highScore) {
        highScore = level;
    }
    level = 0;
    userseq = [];
    gameseq = [];
    highscore();
}

function highscore() {
    let highscr = document.querySelector(".high-score");
    if(highscr) {
        highscr.innerText = `High Score: ${highScore}`;
    }
}





