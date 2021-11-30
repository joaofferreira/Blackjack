// pcm 20172018a Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;


// Classe BlackJack - construtor
class BlackJack {
    constructor() {
        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {
            //TODO mudar lets
            let deck=[];
            for (let i = 0; i < 4; i++) {
                for (let j = 1; j < 14; j++) {
                    deck.push(j);
                }                
            }
            return deck;
        };

        this.shuffle = function (deck) {
            //TODO mudar lets
            let indexs=[];
            for (let i = 0; i < 52; i++) {
                indexs.push(i)
            }

            let number;
            let shuffled=[];

            for (let i = indexs.length; i > 0; i--) {
                number = Math.trunc(Math.random() * indexs.length);
                shuffled.push(deck[indexs[number]]);
                indexs.splice(number,1);
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
    setDealerTurn (val) {
        this.dealerTurn = true;
    }

    //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
    get_cards_value(cards) {
        //TODO mudar let
        let value=0;
        cards.forEach(card => {
            value+=card<10?card:10;
        });
        return value;
    }

    dealer_move() {
        let card=this.deck.pop();
        this.dealer_cards.push(card);
        return this.get_game_state();
    }

    player_move() {
        let card=this.deck.pop();
        this.player_cards.push(card);
        return this.get_game_state();
    }

    get_game_state() {
        let playerPoints=this.get_cards_value(this.player_cards);
        let dealerPoints=this.get_cards_value(this.dealer_cards);

        if (playerPoints==MAX_POINTS){
            this.state.gameEnded=true;
        } else if (playerPoints>MAX_POINTS){
            this.state.playerBusted=true;
            this.state.gameEnded=true;

        }
        if (dealerPoints==MAX_POINTS){
            this.state.dealerWon=true;
            this.state.gameEnded=true; 
        } else if (dealerPoints>MAX_POINTS){
            this.state.gameEnded=true;
        }
        return this.state;
    }
}

