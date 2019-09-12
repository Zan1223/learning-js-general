
const numbers = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
const suits = ["hearts","spades","clubs","diamonds"]

function getDeck() {
	const deck =  numbers.reduce((c, v) => ([ ...c, ...suits.map(s => ({ value: v, suit: s })) ]), []);
	return deck
}

function shuffle() {
	for (let i = 0; i < 1000; i++) {
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let t = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = t;
	}
}


function render () {
	const cardLength = document.getElementsByClassName('cardLength')[0]
	cardLength.innerHTML = getDeck().length
}

function getCards () {
	// shuffle cards before dealing
	shuffle()

	// removing 4 cards from deck
	let dealtCards = deck.splice(0,4)

	// render removed cards in html
	const cardsDiv = document.getElementsByClassName('newCards')[0]
	cardsDiv.innerHTML = ''
	
	for (let i = 0; i < dealtCards.length; i++) {
		CardDiv = document.createElement('div')
		ValueDiv1 = document.createElement('div')
		ValueDiv2 = document.createElement('div')
		SuitDiv = document.createElement('div')
		
		CardDiv.className = 'card'
		ValueDiv1.className = 'cardVal1'
		ValueDiv2.className = 'cardVal2'
		SuitDiv.className = 'cardSuit my-3' + ' ' + dealtCards[i].suit

		cardsDiv.appendChild(CardDiv)
		CardDiv.appendChild(ValueDiv1)
		CardDiv.appendChild(SuitDiv)
		CardDiv.appendChild(ValueDiv2)

		ValueDiv1.innerHTML = dealtCards[i].value
		ValueDiv2.innerHTML = dealtCards[i].value
	}

	const cardLength = document.getElementsByClassName('cardLength')[0]
	cardLength.innerHTML = deck.length

	// disable "Deal" button when no card left in deck
	if (deck.length === 0) {
		const dealBtn = document.getElementsByClassName('dealBtn')[0]
		dealBtn.disabled = true
	}
	return dealtCards
}

function initialLoad () {
	deck = getDeck()
	render()
}

window.onload = initialLoad