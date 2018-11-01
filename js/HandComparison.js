
class HandComparison {
    constructor(player_cards, community_cards) {
        this.player_cards = player_cards
        this.community_cards = community_cards
        this.matching_cards_array = []
        this.flush_cards_array = []
        this.flush_cards = []
        this.j_count = 1
        this.player_hand_array = player_cards.concat(community_cards);
        this.flush_suit = flush_suit
        this.flush_card_numbers = []
        this.number_array = []
    }

    findMatchingCardsHands(player) {
        for (var i = 0; i < player_card_array.length; i++) {
            for (var j = j_count; j < player_card_array.length; j++) {
                if (player_card_array[i].number == player_card_array[j].number) {

                    console.log(player_card_array[i].number + ' = ' + player_card_array[j].number)
                    matching_cards_array.push(player_card_array[i])

                }
            }
            j_count++
        }
        return matching_cards_array
    }

    isPair(matching_cards_array) {
        if (matching_cards_array.length == 1) {
            return true
        }
    }
    isTwoPair(matching_cards_array) {
        if (matching_cards_array.length == 2) {
            return true
        }
    }
    isTrips(matching_cards_array) {
        if (matching_cards_array.length == 3) {
            return true
        }
    }
    isFullHouse(matching_cards_array) {
        if (matching_cards_array.length == 4) {
            return true
        }
    }
    isQuads(matching_cards_array) {
        if (matching_cards_array.length == 6) {
            return true
        }
    }


    detectFlush(player) {
        for (var i = 0; i < player_card_array.length; i++) {
            for (var j = j_count; j < player_card_array.length; j++) {
                if (player_card_array[i].suit == player_card_array[j].suit) {

                    console.log(player_card_array[i].suit + ' = ' + player_card_array[j].suit)
                    flush_cards_array.push(player_card_array[i])

                }
            }
            j_count++
        }
        return flush_cards_array
    }
    isFlush(flush_cards_array) {
        if (flush_cards_array.length > 9) {
            return true
        }
    }



    getFlushHighCard(flush_cards_array) {
        for (var i = 0; i < flush_cards_array.length - 2; i++) {
            if (flush_cards_array[i].suit == flush_cards_array[i + 1].suit && flush_cards_array[i + 1].suit == flush_cards_array[i + 2].suit) {
                flush_suit = flush_cards_array[i].suit
            }

        }
        for (var i = 0; i < flush_cards_array.length; i++) {
            if (flush_cards_array[i].suit == flush_suit) {
                flush_cards.push(flush_cards_array[i])
            }
        }
        for (var i = 0; i < flush_cards.length; i++) {
            flush_card_numbers.push(flush_cards[i].number)
        }

        function sortNumber(a, b) {
            return a - b;
        }

        flush_card_numbers.sort(sortNumber)
        return flush_card_numbers[flush_card_numbers.length]
    }



    findStraight(player, number_array) {

        for (var i = 0; i < number_array.length - 1; i++) {
            if (number_array[i] == number_array[i + 1]) {
                number_array.splice(i, 1)
            }
        }


        for (var i = 0; i < number_array.length - 3; i++) {
            if (number_array[i] == number_array[i + 1] - 1 && number_array[i] == number_array[i + 2] - 2 && number_array[i] == number_array[i + 3] - 3) {
                straight_array.push(number_array[i + 3])
            }
        }
        return straight_array
    }
    isStraight(player, straight_array) {
        if (straight_array.length > 1) {
            return true
        }
    }
    isWheelStraight(player, straight_array, number_array) {
        if (number_array[number_array.length - 1] == 14 && straight_array.length == 1 && straight_array[0] == 5) {
            return true
        }

    }


    getOrderedPlayerNumbers(player) {
        for (var i = 0; i < player_card_array.length; i++) {
            number_array.push(player_card_array[i].number)
        }
        function sortNumber(a, b) {
            return a - b;
        }
        return number_array.sort(sortNumber)
    }
}