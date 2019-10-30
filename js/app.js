/*
 * Create a list that holds all of your cards
 */
 const cards = document.querySelectorAll(".card");
 let openCards =[];
 let iconCards = [];
 let numberofmoves = 0 ;
 let numberofstar = 5;
 let timerControl;
 let timer = document.querySelector('.timer');
 let secounds = 0, minutes = 0, hour = 0;
 let moves = 0;
 let counter = document.querySelector('.moves');


  
// this function will start once because we didn't need to repeat each time
 function StartWithGame(){
     cards.forEach( card => {

        card.addEventListener("click", cardClicked);

        let child = card.children[0];
        iconCards.push(child.className);
     });

        document.querySelector("#btn-play-again").addEventListener("click",startgame);
        document.querySelector("#btn-end-game").addEventListener("click",closegame);
        document.querySelector(".restart").addEventListener("click", startgame  );
 }

// this function will make all cards closed
 function FlipCardsDown(){
    cards.forEach(card => {
        card.className = "card";
      });

 }


function startgame(){
     //Makes cards change random each time the page occurs
    iconCards = shuffle(iconCards);
    let i = 0;
    cards.forEach(card => {
    let child = card.children[0];
    child.className = iconCards[i];
    i++;
    
  });

    closegame();
    secounds = 0;
    minutes = 0;
    moves = 0;
    counter.innerHTML = moves;
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(timerControl);
    openCards = [];
    numberofmoves = 0;
    numberofstar = 5;
    updateScore();
    FlipCardsDown();
}
//to close the dialog box
function closegame(){
    document.querySelector("#dialog-show").close();
}

function starttimer(){
    timerControl = setInterval(function(){
        timer.innerHTML = minutes+" mins "+secounds+" secs";
        secounds++;
        if(secounds == 60){
            minutes++;
            secounds=0;
        }
        if(minutes == 60){
            hour++;
            minutes = 0;
        }
    },1000);
}

function stoptimer(){
    clearInterval(timerControl);
    timerControl = null;

}


function cardClicked (){
     //Check whether the card is already open or not
    if(this.classList.contains("show")) {

        return;
    }
    //To make sure that only two cards are open for comparison
    if(openCards.length<2){
    this.classList.toggle("show");
    this.classList.toggle("open");
   
    openCards.push(this);

    if(openCards.length == 2){
        
        setTimeout(matchCards, 1000);
    }
    }
}

//To make sure that  cards are match or not and to know finsh game or not 
function matchCards(){
    if(openCards.length == 2){
        moveCounter();
        let firstCard = openCards[0];
        let secondCard = openCards[1];
        
        let firstChildClass = firstCard.children[0].className;
        let secondChildClass = secondCard.children[0].className;

        if(firstChildClass == secondChildClass){
            firstCard.classList.add("match");
           secondCard.classList.add("match");
        } else {
            $(firstCard).effect("shake", {}, 500);
            $(secondCard).effect("shake", {}, 500);

            firstCard.className = "card";
            secondCard.className = "card";
        }
        openCards = [];
        incrementmoves();
    }
     
    const remainingunopenedcards = document.querySelectorAll(".card:not(.match)");
    if (remainingunopenedcards.length==0) {
        DialogBox();
    }
}


// when move start well timer start
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    if (moves == 1) {
      second = 0;
      minute = 0;
      hour = 0;
    starttimer();
    }
  }


// To determine the number of stars depending on the number of move
function incrementmoves(){
   
    numberofmoves +=1;
    if(numberofmoves < 10){
        numberofstar = 5;
    } else if (numberofmoves < 15){
        numberofstar = 4;
    } else if (numberofmoves < 20){
        numberofstar = 3;
    }else if (numberofmoves < 25){
        numberofstar = 2;
    }else {
        numberofstar = 1;
    }
    updateScore();

}

// this well update the number of stars
function updateScore(){
    let moveselement = document.querySelector(".moves");
    moveselement.innerText = numberofmoves;
    const startselement = document.querySelector(".stars");
    startselement.innerHTML = "";

    for (let i = 0 ; i < numberofstar; i++){
        let star = "<li> <i class='fa fa-star'></i> </li>";
        startselement.innerHTML += star;
    }

    for (let i = numberofstar ; i < 5; i++){
        let star = "<li> <i class='fa fa-star-o'></i> </li>";
        startselement.innerHTML += star;
    }
}

//showing when game over
function DialogBox(){
    timer.innerHTML = minutes+" mins "+secounds+" secs";
    var starRating = document.querySelector(".stars").innerHTML;

    let dialog = document.getElementById("dialog-show").showModal();
    document.querySelector("#move-rating").innerText = numberofmoves;
    document.getElementById("star-rating").innerHTML = starRating;
    document.querySelector("#spent-time").innerText =   minutes + ":" + secounds;

    stoptimer();
}



function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
StartWithGame();
startgame();