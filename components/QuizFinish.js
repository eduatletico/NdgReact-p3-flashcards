import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, lightGray, purple, gray } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'

class QuizFinish extends Component {

	componentDidMount () {
		clearLocalNotifications().then(setLocalNotification)
	}

	render () {
		const { answerCount, total, restartQuiz, navigation, id } = this.props

		const perc = Math.round((answerCount / total) * 100)

		let textAnswer = ""
		let icon = ""
		if (perc >= 75) {
			textAnswer = "Awesome!"
			icon = "emoticon-excited"
		} else if (perc >= 50) {
			textAnswer = "Good Job!"
			icon = "emoticon"
		} else if (perc >= 25) {
			textAnswer = "Almost there. Try again"
			icon = "emoticon-happy"
		} else {
			textAnswer = "You can do better. Try again"
			icon = "emoticon-neutral"
		}

		return (
			<View style={styles.container}>
				<View style={styles.item}>
					<View style={styles.row}>
						<Text style={{color:gray,fontStyle:'italic',fontSize:30}}>Quiz Finished</Text>
					</View>
					<View style={styles.row}>
						<Text style={{fontSize:25}}>You got {answerCount} out of {total}!</Text>
					</View>
					<View style={styles.row}>
						<Text style={{fontSize:22}}>Your performance was {perc}%</Text>
					</View>
					<View style={styles.row}>
						<MaterialCommunityIcons name={icon} size={80} color={purple} />
					</View>
					<View style={styles.row}>
						<Text style={{fontSize:22}}>{textAnswer}</Text>
					</View>
					<View style={[styles.row, {marginTop:30}]}>

					</View>
				</View>
				<View style={[styles.row, {marginTop:30}]}>

					<TouchableOpacity
		      	style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
		      	onPress={() => restartQuiz()}
		      >
	        	<Text style={styles.btnText}>Restart Quiz</Text>
		      </TouchableOpacity>

		      <TouchableOpacity
		      	style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
		      	onPress={() => {
		      		navigation.navigate(
					      'DeckDetail',
					      { deckId: id }
					    )
		      	}}
		      >
	        	<Text style={styles.btnText}>Back to Deck</Text>
		      </TouchableOpacity>

				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
    padding: 15,
    justifyContent: 'center'
  },
  row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
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
		alignItems: 'center',
		marginLeft: 15,
		marginRight: 15,
		marginTop: 15
	},
	btnText: {
		color: white,
		fontSize: 20,
		textAlign: 'center'
	},
})

export default connect()(QuizFinish)