import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = 'FlashCards:store'

export function getDecks () {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then((decks) => JSON.parse(decks))
}

export function saveDeckTitle (title) {
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
		[title]: { title, questions: [] }
	}))
}

export function addCardToDeck (title, card) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then((decks) => {
			const deck = JSON.parse(decks)[title]

			AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
				[title]: { title, questions: [...deck.questions, card] }
			}))
	})
}