function game() {
    return {
     cards: [
         { color: 'gold', flipped: false, cleared: false },
         { color: 'lime', flipped: false, cleared: false },
         { color: 'coral', flipped: false, cleared: false },
         { color: 'cornflowerblue', flipped: false, cleared: false },
         { color: 'Sienna', flipped: false, cleared: false },
         { color: 'darkmagenta', flipped: false, cleared: false },
         { color: 'gold', flipped: false, cleared: false },
         { color: 'lime', flipped: false, cleared: false },
         { color: 'coral', flipped: false, cleared: false },
         { color: 'cornflowerblue', flipped: false, cleared: false },
         { color: 'Sienna', flipped: false, cleared: false },
         { color: 'darkmagenta', flipped: false, cleared: false },
         ].sort(() => Math.random() - .5),

        get flippedCards() {
            return this.cards.filter(card => card.flipped);
        },

        get clearedCards () {
            return this.cards.filter(card => card.cleared);
        },

        get remainingCards() {
            return this.cards.filter(card => !card.cleared);
        },

        get points() {
         return this.clearedCards.length;
        },

        flipCard: async function (card) {

             if(this.flippedCards.length === 2) {
                 return;
             }

            card.flipped =!card.flipped;

            if(this.flippedCards.length === 2) {
                if(this.hasMatch()) {
                    flash('Match found, you should feel proud!');

                    await pause();

                    this.flippedCards.forEach(card => card.cleared = true);

                    if(!this.remainingCards.length) {
                        alert('Winner Winner chicken dinner');
                    }
                }

                await pause();
                this.flippedCards.forEach(card => card.flipped = false);
            }
        },

        hasMatch: function () {
           return this.flippedCards[0].color === this.flippedCards[1].color;
        }
    };
}

function pause(milliseconds = 850) {
    return new Promise(resolve =>  setTimeout(resolve,milliseconds));
}

function flash(message) {
    window.dispatchEvent(new CustomEvent('flash',{
        detail: {message}
    }))
}