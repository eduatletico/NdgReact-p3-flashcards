import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, Animated } from 'react-native'
import { connect } from 'react-redux'
import { white, lightGray, purple, gray, red, green } from '../utils/colors'
import QuizFinish from './QuizFinish'

class Card extends Component {

	state = {
		viewAnswer: false,
		position: 0,
		answerCount: 0
	}

	nextQuestion = (answer) => {
		const { position, answerCount } = this.state

		this.setState({
			viewAnswer: false,
			position: position + 1,
			answerCount: answerCount + answer
		})
	}

	flipCard = () => {
		this.setState({
			viewAnswer: true
		})
		if (this.value >= 90) {
			Animated.spring(this.animatedValue, {
				toValue: 0,
				friction: 8,
				tension: 10
			}).start()
		} else {
			Animated.spring(this.animatedValue, {
				toValue: 180,
				friction: 8,
				tension: 10
			}).start()
		}
	}

	flipCardAnswer = (answer) => {
		if (this.value >= 90) {
			Animated.spring(this.animatedValue, {
				toValue: 0,
				speed: 100
			}).start()
		} else {
			Animated.spring(this.animatedValue, {
				toValue: 180,
				speed: 100
			}).start()
		}
		setTimeout(() => this.nextQuestion(answer), 50);
	}

	componentWillMount () {
		this.animatedValue = new Animated.Value(0)
		this.value = 0

		this.animatedValue.addListener(({ value }) => {
			this.value = value
		})
		this.frontInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['0deg', '180deg']
		})
		this.backInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['180deg', '360deg']
		})
		this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });

    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
	}

	render () {
		const { cards } = this.props
		const { viewAnswer, position, answerCount } = this.state

		const frontAnimatedStyle = {
			transform: [
				{ rotateY: this.frontInterpolate }
			],
			opacity: this.frontOpacity
		}
		const backAnimatedStyle = {
			transform: [
				{ rotateY: this.backInterpolate }
			],
			opacity: this.backOpacity
		}

		const counter = position + 1
		const total = cards.length

		if (typeof cards[position] === 'undefined') {
			return <QuizFinish answerCount={answerCount} total={total} />
		}

		return (
			<View style={styles.container}>
				<View style={[styles.row, {justifyContent:'flex-end'}]}>
					<Text style={{fontSize:20}}>Card {counter} of {total}</Text>
				</View>

				<View>

					<Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
						<View style={styles.item}>
							<Text style={{fontSize:30,textAlign:'center'}}>{cards[position].question}</Text>
						</View>
						<View style={[styles.row, {marginTop:150}]}>
							<TouchableOpacity onPress={() => this.flipCard()}>
			        	<Text style={{color: purple, fontSize: 16}}>VIEW ANSWER</Text>
				      </TouchableOpacity>
						</View>
					</Animated.View>

					<Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
						<View style={{flex: 1,flexDirection: 'column',justifyContent:'space-between'}}>
							<View style={styles.item}>
								<View style={styles.row}>
									<Text style={{color:gray,fontStyle:'italic',fontSize:22}}>Answer:</Text>
								</View>
								<View style={styles.row}>
									<Text style={{fontSize:30,textAlign:'center'}}>{cards[position].answer}</Text>
								</View>
							</View>
							<View style={styles.row}>
								<TouchableOpacity
									disabled={!viewAnswer}
					      	style={[Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn, {backgroundColor:green}]}
					      	onPress={() => this.flipCardAnswer(1)}
					      >
				        	<Text style={styles.btnText}>Correct</Text>
					      </TouchableOpacity>

					      <TouchableOpacity
					      	disabled={!viewAnswer}
					      	style={[Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn, {backgroundColor:red}]}
					      	onPress={() => this.flipCardAnswer(0)}
					      >
				        	<Text style={styles.btnText}>Incorrect</Text>
					      </TouchableOpacity>
							</View>
						</View>
					</Animated.View>

				</View>

				<View style={styles.row}></View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
    padding: 15,
		justifyContent: 'space-between'
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
  flipCard: {
  	backfaceVisibility: 'hidden'
  },
  flipCardBack: {
  	position: 'absolute',
  	top: 0
  },
  iosBtn: {
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
		marginTop: 15
	},
	androidBtn: {
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 30,
		marginRight: 30,
		marginTop: 15
	},
	btnText: {
		color: white,
		fontSize: 18,
		textAlign: 'center'
	}
})

export default connect()(Card)