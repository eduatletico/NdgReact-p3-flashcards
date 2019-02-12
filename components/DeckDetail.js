import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { purple, white, lightGray, gray } from '../utils/colors'


class DeckDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { deckId } = navigation.state.params

		return {
			title: `Deck ${deckId}`
		}
	}

	render () {
		const { deck, navigation } = this.props

		return (
			<View style={styles.container}>
				<View style={styles.row}>
					<Text style={{fontSize:16}}>Deck Details</Text>
				</View>
				<View style={[styles.item, {alignItems: 'center'}]}>
					<View style={styles.row}>
						<Text style={{fontSize:35}}>{deck.title}</Text>
					</View>
					<View style={styles.row}>
						<Text style={{color:gray,fontStyle:'italic',fontSize:22}}>{deck.questions.length} cards</Text>
					</View>
				</View>

				<View style={[styles.row, {justifyContent: 'space-between'}]}>
					<TouchableOpacity
						style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
						onPress={() => navigation.navigate('AddCard', { deckId: deck.title })}
	        >
	        	<Text style={styles.btnText}>Add Card</Text>
		      </TouchableOpacity>

		      <TouchableOpacity
		      	style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
		      	onPress={() => {
		      			deck.questions.length > 0
		      			? navigation.navigate('QuizStart',{ deckId: deck.title })
		      			: alert("Add a card before start quiz")
		      		}
		      	}
		      >
	        	<Text style={styles.btnText}>Start Quiz</Text>
		      </TouchableOpacity>
	      </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: lightGray,
		justifyContent: 'space-between'
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
	iosBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40
	},
	androidBtn: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnText: {
		color: white,
		fontSize: 18,
		textAlign: 'center'
	},
})

function mapStateToProps (state, { navigation }) {
	const { deckId } = navigation.state.params

	return {
		deckId,
		deck: state[deckId],
		navigation
	}
}

export default connect(mapStateToProps)(DeckDetail)