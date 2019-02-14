import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { white, gray, lightGray } from '../utils/colors'

class Home extends Component {
	state = {
		ready: false
	}

  async componentDidMount () {
    const { dispatch } = this.props

    const decks = await getDecks()
    await dispatch(receiveDecks(decks))

    this.setState({
    	ready: true
    })
  }

	render () {
		const { decks, navigation } = this.props
    const { ready } = this.state

		if (ready === false) {
			return <AppLoading />
		}

		return (
			<ScrollView style={styles.container}>
				<Text style={{fontSize:16}}>FlashCards</Text>
				{Object.keys(decks).length > 0
				? Object.keys(decks).map((key) => {
						if (typeof decks[key].title !== 'undefined') {
							return (
								<View key={key} style={styles.item}>
									<TouchableOpacity onPress={() => navigation.navigate(
				            'DeckDetail',
				            { deckId: key }
				          )}>
				          	<View>
					          	<Text style={{fontSize:20}}>{decks[key].title}</Text>
											<Text style={{textAlign: 'right', color: gray, fontStyle: 'italic'}}>{decks[key].questions.length} cards</Text>
				          	</View>
				          </TouchableOpacity>
								</View>
						)
					}
				})
				: <Text style={{marginTop: 20, color: gray}}>Add a Deck to start a quiz</Text>
				}
				<View style={{marginBottom: 30}}></View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: lightGray
	},
	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},
	item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  }
})

function mapStateToProps (decks, { navigation }) {
  return {
    decks,
    navigation
  }
}

export default connect(mapStateToProps)(Home)