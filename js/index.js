    // variables from DOM
// const score = document.getElementById("score");
const yourscore = document.getElementById("yourscore");
const bestscore = document.getElementById("bestscore")
const a = document.getElementById("a");
const b = document.getElementById("b");
const result = document.getElementById("result");
const operation = document.getElementById("operation");
const line = document.getElementById("line");
const refresh = document.getElementById("refresh");
let TotalScore = 0;
const tbody = document.getElementById("tbody");

// --------------------------------------------------------------------------

// variables for function 
let operationRandom;
let aRandom;
let bRandom;
let trueAnswer;
let answer ;
let wrongAnswer;
let isTrue;
let chance = 10;
let maxChance = 10;

//---------------------------------------------------------------------------


const getRandomNumbers = (start=1 , limit=100) =>  Math.floor( Math.random() * (limit-start +1)) + start; //RANDOM fucntion


const next =() =>{
        aRandom = getRandomNumbers();
        bRandom = getRandomNumbers();
    

        console.log(aRandom);
        console.log(bRandom);

        operationRandom = getRandomNumbers(1 , 4);
        
        let operationString = "";

        switch(operationRandom){
            case 1 :  
                operationString = "+";
            break;
            case 2 : 
                operationString = "-";
                if(aRandom < bRandom)
                [aRandom , bRandom] = [bRandom , aRandom];
            break;
            case 3 : 
                operationString = "/";
                aRandom -=(aRandom % bRandom);
            break;
            case 4 : 
                operationString = "x";
                aRandom = aRandom % 14;
                bRandom = bRandom % 30 + 1;
            break;
        }
        operation.innerHTML = operationString;
        // console.log(aRandom);
        // console.log(bRandom);

        a.innerHTML = aRandom;
        b.innerHTML = bRandom;


        trueAnswer =  eval(`${aRandom}${operationString}${bRandom}`.replace('x' , '*'));
        isTrue = getRandomNumbers(-1 , 2) % 2;

        wrongAnswer = getRandomNumbers(1 , 30);

        answer = isTrue * wrongAnswer + trueAnswer;
        answer = Math.abs(answer);
        // console.log(isTrue , answer , trueAnswer);

        result.innerHTML = answer;


} ;

next();



const changeWidthLine = () => {
          let w = (chance * 100 ) / maxChance;
          line.style.width =`${w}%` 
}


let game_over = false;
const checkBestScore = () =>{
    if(game_over) return; 

    let oldSCore =+localStorage.getItem("bestscores");
    yourscore.innerHTML = TotalScore;
    if(oldSCore < TotalScore) {
        localStorage.setItem("bestScore" , TotalScore);
        bestscore.innerHTML = TotalScore;
        refresh.classList.add("bg-success");
        refresh.classList.remove("bg-danger");
    }
    else{
        bestscore.innerHTML = oldSCore;
        refresh.classList.add("bg-danger");
        refresh.classList.remove("bg-success");
    }



let allScores = JSON.parse(localStorage.getItem("allscores" , )) || [];
let scores = [...allScores , TotalScore].sort((a , b) => a - b);
scores = [...new Set (scores)];

let topScores = scores.slice(-7);

localStorage.setItem("allScores" , JSON.stringify(scores));

topScores.reverse().map((s , i) => {
    const row = document.createElement("tr")

    const td1 = document.createElement("td");
    td1.innerHTML = i+1;

    const td2 = document.createElement("td");
    td2.innerHTML = s;

    if(TotalScore == s) {
        const classess = ["bg-warning" , "text-white"];

        td1.classList.add(...classess);
        td2.classList.add(...classess);

    }

    row.appendChild(td1);
    row.appendChild(td2);

    tbody.appendChild(row);

})
    game_over = false;
}

    
const check = (selectedAnswer)=>{
    if(chance <= 0){
        refresh.classList.remove("d-none");
        return;
    }
    

    let isWin = !(!isTrue ^ selectedAnswer);
    console.log(isWin);
    if(isWin){
        TotalScore++;
        chance+=3;
    }
    else {
        chance-=3;
        console.log(chance);
        
    }

    if(chance > maxChance) chance = maxChance;
    changeWidthLine();
    // console.log(TotalScore);
    yourscore.innerHTML = TotalScore;
    next();
}

let interval;

const startTimer =  () =>{
    interval = setInterval(() => {
        if(chance <0){
            refresh.classList.remove("d-none");
            clearInterval(interval);
            checkBestScore();
            return;
        }
        chance--;
        changeWidthLine();
    }, 600); 
}

startTimer();


const reload = () => {
    window.location.reload(true);
}


