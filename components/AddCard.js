import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import { purple, lightGray, white } from '../utils/colors'


class AddCard extends Component {
	static navigationOptions = ({ navigation }) => {
		const { deckId } = navigation.state.params

		return {
			title: `Add Card to Deck ${deckId}`
		}
	}

	state = {
		question: '',
		answer: ''
	}

	isDisabled = () => {
    return this.state.question === '' || this.state.answer === ''
  }

	submit = () => {
		const { deck, navigation } = this.props
		const { question, answer } = this.state

		this.props.dispatch(addCard(deck.title, {question, answer}))

		this.setState(() => ({
			question: '',
			answer: ''
		}))

		navigation.goBack()

		addCardToDeck(deck.title, {question, answer})
	}

	render () {
		const { deck, navigation } = this.props
		const { question, answer } = this.state

		return (
			<View style={styles.container}>
				<View style={styles.row}>
					<Text style={{fontSize:16}}>Add Card</Text>
				</View>
				<View style={styles.row}>
          <TextInput
						style={styles.formInput}
						placeholder='Question'
            onChangeText={(question) => this.setState({question})}
            value={question}
          />
				</View>
				<View style={styles.row}>
          <TextInput
						style={styles.formInput}
						placeholder='Answer'
            onChangeText={(answer) => this.setState({answer})}
            value={answer}
          />
				</View>
				<View style={[styles.row, {justifyContent:'flex-end'}]}>
					<TouchableOpacity
						disabled={this.isDisabled()}
						style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
						onPress={this.submit}>
						<Text style={styles.submitBtnText}>SUBMIT</Text>
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
		justifyContent: 'flex-start'
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	iosSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40
	},
	androidSubmitBtn: {
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
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	},
	formInput: {
    borderBottomColor: purple,
    borderBottomWidth:  1,
    color: purple,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingTop: 16,
    marginLeft: 22,
    marginRight: 22,
    marginBottom: 30,
    marginTop: 10,
    flex: 1,
    fontSize: 16
  }
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

	return {
		deckId,
		deck: state[deckId],
		navigation
	}
}

export default connect(mapStateToProps)(AddCard)