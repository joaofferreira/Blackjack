// Classe Card - construtor
class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }



  htmlElement() {
    return (
      "<li><div class='card rank-" +
      this.rank +
      " " +
      this.suit +
      " '><span class='" +
      this.rank +
      "'> " +
      this.rank +
      "</span><span class='suit'>&" +
      this.suit +
      ";</span></div></li>"
    );
  }
}