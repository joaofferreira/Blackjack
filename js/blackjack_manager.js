// pcm 20172018a Blackjack oop

let game = null;

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
document.getElementById("dealer").innerHTML =  "";
document.getElementById("player").innerHTML = "";

  game = new BlackJack();
  dealer_new_card();
  dealer_new_card();
  player_new_card();
  buttons_initialization();
  debug(game);
}

function update_dealer(state) {
  if (game.state.gameEnded) {
  let cartasDealer = game.get_dealer_cards();
  let cartasJogador = game.get_player_cards();
  let string = "";

  if (game.get_cards_value(cartasJogador) < game.get_cards_value(cartasDealer)) {
    string += "ganhou";
  } else {
    string += "perdeu";
  }

  cartasDealer.forEach((card) => {
    string += card + " ";
  });
    document.getElementById("dealer").innerHTML = string;
    finalize_buttons();
  }
}

function update_player(state) {
  let string = "";

  let cartasJogador = game.get_player_cards();
  cartasJogador.forEach((card) => {
    string += card + " ";
  });


  if (game.state.gameEnded) {
    let cartasDealer = game.get_dealer_cards();
    if(game.state.playerBusted){
        string += "estourou";
    }else{
        if (game.get_cards_value(cartasDealer) < game.get_cards_value(cartasJogador)) {
            string += "ganhou";
          } else {
            string += "perdeu";
          }    
    }

    finalize_buttons();
  }
  document.getElementById("player").innerHTML = string;
}

function dealer_new_card() {
  game.dealer_move();
  update_dealer();
  return game.get_game_state();
}

/*Esta função executa o método da classe “blackJack” que realiza a jogada do
player, atualiza o player e retorna o estado do jogo*/
function player_new_card() {
  game.player_move();
  update_player();
  return game.get_game_state();
}

function dealer_finish() {
  game.get_game_state();
  game.dealerTurn = true;
  for (let index = 0; index < 100; index++) {
    dealer_new_card();
    if(game.state.gameEnded){break}
  }
}