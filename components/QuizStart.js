import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Card from './Card'

class QuizStart extends Component {
	static navigationOptions = ({ navigation }) => {
		const { deckId } = navigation.state.params

		return {
			title: `Quiz - ${deckId}`
		}
	}

	render () {
		const { deck, navigation } = this.props

		return (
			<View style={styles.container}>
				<Card cards={deck.questions} navigation={navigation} id={deck.title} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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

export default connect(mapStateToProps)(QuizStart)