const item = document.getElementsByClassName("btns");
console.log(item);
const audio = document.getElementById("myaudio");
const score = document.getElementById("score");
let time = 2000;
let isLight = false;
let hisscore=0;
let ind;


const myfunction = () =>{ind= Math.floor(Math.random() * 25) , setTimeout(() => {
    return
}, 5000); setInterval(switched(ind), 1000);}

const switched =(a) => {
   audio.src = "./audio/song.mp3";
  //  audio.play();
   isLight =true;
   item[a].style.backgroundColor = "red";
   console.log(time);
   setTimeout(() => {item[a].style.backgroundColor = "#423C3C"; isLight = false}, time);
   if(time<600) time = 600;
}

const myStop = (a) =>  {
  console.log(isLight);
  item[a].style.backgroundColor = "#423C3C";
  if(isLight&&ind==a){
    audio.src = "../audio/song1.mp3";
    audio.play()
    isLight = false;
    time -= 200;
    hisscore++;
    console.log(hisscore);
    score.innerHTML = hisscore;
  }
  else{
    time = time + 200;
    if(time > 2400) time = 2400;
    audio.src = "../audio/over.mp3"
  }
  // else isLight = false;
};


let myInterval =  setInterval(myfunction , 2000);

// console.log(hisscore);




