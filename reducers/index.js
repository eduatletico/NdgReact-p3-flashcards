import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

function decks (state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.payload
			}
		case ADD_DECK:
			return {
				...state,
				[action.payload]: {
					title: action.payload,
					questions: []
				}
			}
		case ADD_CARD:
			return {
				...state,
				[action.payload.title]: {
					...state[action.payload.title],
					questions: [
						...state[action.payload.title].questions,
						action.payload.card
					]
				}
			}
		default:
			return state
	}
}

const persistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['isLoggingIn']
}

export default persistReducer(persistConfig, decks)