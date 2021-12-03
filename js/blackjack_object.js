// pcm 20172018a Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;


// Classe BlackJack - construtor
class BlackJack {
  constructor() {
    const suits = ["hearts", "spades", "clubs", "diams"];
    const values = ["a", 2, 3, 4, 5, 6, 7, 8, 9, 10, "j", "q", "k"];

    // array com as cartas do dealer
    this.dealer_cards = [];
    // array com as cartas do player
    this.player_cards = [];
    // variável booleana que indica a vez do dealer jogar até ao fim
    this.dealerTurn = false;

    // objeto na forma literal com o estado do jogo
    this.state = {
      gameEnded: false,
      dealerWon: false,
      playerBusted: false,
    };

    //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
    this.new_deck = function () {
      let deck = [];
      let card;
      for (let suit in suits) {
        for (let value in values) {
          card = new Card(suits[suit], values[value]);
          deck.push(card);
        }
      }
      return deck;
    };

    this.shuffle = function (deck) {
      //TODO mudar lets
      let indexs = [];
      for (let i = 0; i < 52; i++) {
        indexs.push(i);
      }

      let number;
      let shuffled = [];

      for (let i = indexs.length; i > 0; i--) {
        number = Math.trunc(Math.random() * indexs.length);
        shuffled.push(deck[indexs[number]]);
        indexs.splice(number, 1);
      }
      return shuffled;
    };

    // baralho de cartas baralhado
    this.deck = this.shuffle(this.new_deck());
  }

  // métodos
  // devolve as cartas do dealer num novo array (splice)
  get_dealer_cards() {
    return this.dealer_cards.slice();
  }

  // devolve as cartas do player num novo array (splice)
  get_player_cards() {
    return this.player_cards.slice();
  }

  // Ativa a variável booleana "dealerTurn"
  setDealerTurn(val) {
    this.dealerTurn = true;
  }

  //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
  get_cards_value(cards) {
    let minValue = 0;
    let maxValue = 0;
    cards.forEach((card) => {
      switch (card.rank) {
        case "a":
          minValue += 1;
          maxValue += 11;
          break;
        case "j": case "q": case "k":
          minValue += 10;
          maxValue += 10;
          break;
        default:
          minValue += card.rank;
          maxValue += card.rank;
      }
    });
    return [minValue, maxValue];
  }

  dealer_move() {
    let card = this.deck.pop();
    this.dealer_cards.push(card);
    console.log(card);
    console.log(this.dealer_cards);
    return this.get_game_state();
  }

  player_move() {
    let card = this.deck.pop();
    this.player_cards.push(card);
    return this.get_game_state();
  }

  get_game_state() {

    /*
    (1) jogador faz 21 pontos;						gameEnded: true, dealerWon: false, playerBusted: false
    (2) jogador rebenta;							gameEnded: true, dealerWon: true, playerBusted: true
    (3) dealer faz mais pontos do que o jogador;	gameEnded: true, dealerWon: true, playerBusted: false
    (4) dealer rebenta.								gameEnded: true, dealerWon: false, playerBusted: true
    */
    let [minPlayerPoints,maxPlayerPoints] = this.get_cards_value(this.player_cards);
    let [minDealerPoints,maxDealerPoints] = this.get_cards_value(this.dealer_cards);


    if (minPlayerPoints == MAX_POINTS || maxPlayerPoints == MAX_POINTS) {
      this.state.gameEnded = true;
    } else if (minPlayerPoints > MAX_POINTS) {
      this.state.dealerWon = true;
      this.state.playerBusted = true;
      this.state.gameEnded = true;
    } else if (minDealerPoints> MAX_POINTS) {
      this.state.gameEnded = true;
    } 
   return this.state;
  }
}

