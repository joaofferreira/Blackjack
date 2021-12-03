// pcm 20172018a Blackjack oop

let game = null;
var nDealerCards=0;
var nPlayerCards=0;

function debug(an_object) {
  document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization() {
  document.getElementById("card").disabled = false;
  document.getElementById("stand").disabled = false;
  document.getElementById("new_game").disabled = true;
}

function finalize_buttons() {
  document.getElementById("card").disabled = true;
  document.getElementById("stand").disabled = true;
  document.getElementById("new_game").disabled = false;
}

//FUNÇÕES QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
function new_game() {
//clean
//document.getElementById("dealer").innerHTML =  "";
//document.getElementById("player").innerHTML = "";
  clear();
  game = new BlackJack();
  dealer_new_card(true);
  dealer_new_card(true);
  nPlayerCards=0;
  nDealerCards=0;
  player_new_card();
  buttons_initialization();
  debug(game);
}

function clear() {

  string="<li>";
  string+="<div class='card' style='position: absolute; transform: translate(-40px) rotate(-3deg);'><span class='rank'></span><span class='suit'></span></div>";
  string+="</li>";
  string+="<li>";
  string+="<div class='flip-card playingCards twoColours rotateHand'><div class='flip-card-inner'><div class='flip-card-front'><div class='card back'>*</div></div><div class='flip-card-back '><div class='card big'><span class='rank'></span><span class='suit'></span></div></div></div></div>";
  string+="</li>";
  
  document.getElementById("dealer").innerHTML =  string;
  document.getElementById("player").innerHTML =  " ";
}


function update_dealer_points() {
  let cartasDealer = game.get_dealer_cards();
  let player_cards = game.get_player_cards();
  let [minPlayerPoints,maxPlayerPoints] = game.get_cards_value(player_cards);
  let [minDealerPoints,maxDealerPoints]= game.get_cards_value(cartasDealer);
  
  if (minDealerPoints==maxDealerPoints){
    points=minDealerPoints;
  } else if (maxDealerPoints>21){
    points=minDealerPoints;
  }else{
    points=minDealerPoints+" ou "+ maxDealerPoints;
  }

  let result=" ";
   if (minDealerPoints>21) {
      game.state.gameEnded=true;
      result += " Rebentou";
    }else if (game.state.dealerWon || (maxDealerPoints>21?minDealerPoints:maxDealerPoints) > (maxPlayerPoints>21?minPlayerPoints:maxPlayerPoints)){
      game.state.gameEnded=true;
      result += " Ganhou ";
    } else {
        result += " Perdeu";
    }

  document.getElementById("dealerPoints").innerHTML = ("Points:"+ points +" "+result); 
}

var graus=0;

function update_dealer(state, show) {
  let cartasDealer = game.get_dealer_cards();
  let string = "";

  if (show) {
    
    card = cartasDealer[0];
    let s = card.suit;
    let r = card.rank;

    document.querySelector("#dealer>li").style.animation = "appear 2s  ease";
    document.querySelector("#dealer>li>div").classList.add(s);
    document.querySelector("#dealer>li>div").classList.add("rank-" + r);
    document.querySelector("#dealer>li>div>.rank").textContent = r;
    document.querySelector("#dealer>li>div>.suit").innerHTML = "&" + s + ";";
    card = cartasDealer[1];
    if (card != undefined) {
      
      document.querySelector(".flip-card").style.animation = "appear 3s  ease";
      s = card.suit;
      r = card.rank;
      document.querySelector(".flip-card-back>div").classList.add(s);
      document.querySelector(".flip-card-back>div").classList.add("rank-" + r);
      document.querySelector(".flip-card-back>div>.rank").textContent = r;
      document.querySelector(".flip-card-back>div>.suit").innerHTML =
        "&" + s + ";";
    }
    nDealerCards=2;
  } else {

    document.querySelector("#dealer").classList.add("slide");
    document.querySelector('#dealer').style.setProperty('--f','-'+20*nDealerCards+'px');

    for (let index = nDealerCards; index < cartasDealer.length; index++) {
      console.log("ipddatesnidkcasmkodas");

      let suit = cartasDealer[index].suit;
      let rank = cartasDealer[index].rank;
      graus+=3;
      string +=
        "<li style='animation:appear "+nDealerCards+"s ease;'><div style='position: absolute; transform: translate("+(nDealerCards-1)*40+"px) translateY("+(graus-5)+"px) rotate("+graus+"deg);' class='card rank-" +
        rank +
        " " +
        suit +
        "'><span class'rank'>" +
        rank +
        "</span><span class='suit'>&" +
        suit +
        ";</span></div></li>";
        
    }
    nDealerCards++;
  }

  if (state.gameEnded) {
    update_dealer_points();
    finalize_buttons();
  }
  document.getElementById("dealer").insertAdjacentHTML("beforeend", string);

}

var grausPlayer=-3;

function update_player(state) {
  let playerCards = game.get_player_cards();
  let string = "";

  console.log("game.get_game_state()"+game.get_game_state());

  document.querySelector("#player").classList.add("slide");
  document.querySelector('#player').style.setProperty('--f','-'+60*(nPlayerCards+1)+'px');

  for (let index = nPlayerCards; index < playerCards.length; index++) {
    console.log("ipddatesnidkcasmkodas");

    let suit = playerCards[index].suit;
    let rank = playerCards[index].rank;
    string +=
      "<li style='animation:appear "+(2)+"s ease;'><div style='position: absolute; transform: translate("+(nPlayerCards)*40+"px) translateY("+(grausPlayer*0.5)+"px) rotate("+grausPlayer+"deg);' class='card rank-" +
      rank +
      " " +
      suit +
      "'><span class'rank'>" +
      rank +
      "</span><span class='suit'>&" +
      suit +
      ";</span></div></li>";
      grausPlayer+=3;

  }
  nPlayerCards++;


  update_player_points();
  if (state.gameEnded) {
    reveal();
    update_dealer_points();
    finalize_buttons();
  }
  document.getElementById("player").insertAdjacentHTML("beforeend", string);
}



function update_player_points() {
  game.get_game_state();

  let cartasDealer = game.get_dealer_cards();
  let cartasJogador = game.get_player_cards();
  let [minPlayerPoints,maxPlayerPoints] = game.get_cards_value(cartasJogador);
  let [minDealerPoints,maxDealerPoints]= game.get_cards_value(cartasDealer);
  
  if (minPlayerPoints==maxPlayerPoints){
    points=minPlayerPoints;
  } else if (maxPlayerPoints>21){
    points=minPlayerPoints;
  }else{
    points=minPlayerPoints+" ou "+ maxPlayerPoints;
  }

  console.log(game.state);

  let result=" ";
  if (game.state.gameEnded) {
   if (game.state.playerBusted) {
      result += " Rebentou";
    }else if ((maxPlayerPoints>21?minPlayerPoints:maxPlayerPoints) > (maxDealerPoints>21?minDealerPoints:maxDealerPoints)|| minDealerPoints>21){
      result += " Ganhou ";
    } else {
        result += " Perdeu";
    }}

  document.getElementById("playerPoints").innerHTML = ("Points:"+ points +" "+result); 
}


function dealer_new_card(show) {
  game.dealer_move();
  update_dealer(game.get_game_state(),show);
  return game.get_game_state();
}

/*Esta função executa o método da classe “blackJack” que realiza a jogada do
player, atualiza o player e retorna o estado do jogo*/
function player_new_card() {
  game.player_move();
  update_player(game.get_game_state());
  return game.get_game_state();
}

function reveal(){
  document.querySelector(".flip-card-inner").style.animation= ("flip 3s  ease");
  document.querySelector(".flip-card-inner").style.transform= ("rotateY(180deg)");
  document.querySelector(".flip-card-front").classList.add("disappear");
}

function dealer_finish() {
  game.get_game_state();
  game.dealerTurn = true;
  reveal();
  //update_dealer();
  let [minPlayerPoints,maxPlayerPoints] = game.get_cards_value(game.player_cards);
  let [minDealerPoints,maxDealerPoints]= game.get_cards_value(game.dealer_cards);

  for (let index = 0; index < 100; index++) {
    game.get_game_state();
    [minDealerPoints,maxDealerPoints]= game.get_cards_value(game.dealer_cards);
    if(game.state.gameEnded || (maxDealerPoints>21?minDealerPoints:maxDealerPoints) > (maxPlayerPoints>21?minPlayerPoints:maxPlayerPoints)){update_dealer_points();break;}    
    dealer_new_card();
  }
  update_player_points();
  finalize_buttons();

}