const gameContainer = document.getElementById("game");
const button = document.querySelector("button");


const COLORS = [];


// create random colors
for (let i=0; i<5; i++){
  let r = Math.floor(Math.random()*256);
  let g = Math.floor(Math.random()*256);
  let b = Math.floor(Math.random()*256);
  let rgb = `rgb(${r},${g},${b})`
  COLORS.push(rgb)
  COLORS.push(rgb)
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}


let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!

let selectedColors = [];
let selectedCards = []
let matches = 0;
let score = 0;
let bestscore = localStorage.getItem('bestscore');

function handleCardClick(event) {

  let selected = event.target;
  //console.log(selected.classList)
  selected.style.backgroundColor = selected.classList[0]
  selectedColors.push(selected.classList[0]);
  selectedCards.push(selected);
  console.log (selectedCards)
  selected.classList.add("fliped")

  // Counter score
  document.querySelector("#score").innerHTML= score+1;
  
  if (selectedColors.length === 2){
    let card1 = selectedCards[0];
    let card2 = selectedCards[1];
    if (selectedColors[0] === selectedColors[1] && card1 !== card2){
      matches +=2;
      score +=1;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      selectedColors = [];
      selectedCards = [];
    }else{
      setTimeout(function(){
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        selectedColors = [];
        selectedCards = [];
        score += 1;

      },1000)
    }

    //when game is finished
    setTimeout(function(){
    if (matches === COLORS.length){
      //update storage if score = new highscore or score is empty
      if(score<bestscore || localStorage.length === 0){
      localStorage.setItem('bestscore', score);
      let reload = window.confirm(`You won and achieved a new highscore of ${score} Do you want to play again?"`)
      if (reload === true ){
      window.location.reload();
      }
      }else{
        reload = window.confirm(`You won. Do you want to play again?"`)
        if (reload === true ){
        window.location.reload(); 
      }
    }
  } 
  },300)
    
  }
  

}



// Reload button event listener
button.addEventListener("click", function(e){
  window.location.reload();

})





  
  
  


// when the DOM loads
createDivsForColors(shuffledColors);