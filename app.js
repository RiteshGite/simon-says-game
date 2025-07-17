let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let btns = ["red", "yellow", "green", "purple"];

let highest = 0;
let highTag = document.querySelector("#high");

document.addEventListener("keypress", function() {
  if(started == false)
  {
    started = true;
    levelUp();
  }
});

function levelUp()
{
  userSeq = [];
  level++;
  if(level > highest)
  {
    highest = level;
    highTag.innerHTML = `Highest Score : <span><b>${highest}<b></span>`;
  }
  h2.innerText = `Level ${level}`;

  let ranIdx = Math.floor(Math.random() * 4);
  let ranCol = btns[ranIdx];
  let ranBtn = document.querySelector(`.${ranCol}`);

  gameSeq.push(ranCol);
  console.log("game : ", gameSeq);
 
  gameFlash(ranBtn);
}

function gameFlash(btn)
{
  btn.classList.add("flash");
  setTimeout(function() {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn)
{
  btn.classList.add("userflash");
  setTimeout(function() {
    btn.classList.remove("userflash");
  }, 250);
}

function btnPress()
{
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  console.log("user : ", userSeq);

  let idx = userSeq.length - 1;
  checkAns(idx);
}

function checkAns(idx)
{
  if(userSeq[idx] === gameSeq[idx])
  {
    if(userSeq.length === gameSeq.length)
    {
      setTimeout(levelUp, 1000);
    }
  }
  else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`

    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    reset();
  }
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns)
{
  btn.addEventListener("click", btnPress);
}

function reset()
{
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}