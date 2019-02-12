import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { purple, lightGray, white } from '../utils/colors'


class AddDeck extends Component {
	state = {
		title: ''
	}

	submit = () => {
		const { title } = this.state

		this.props.dispatch(addDeck(title))

		this.setState(() => ({
			title: ''
		}))

		this.props.navigation.goBack()

		saveDeckTitle(title)

		// clearLocalNotification()
		// 	.then(setLocalNotification())
	}

	render () {
		const { title } = this.state

		return (
			<View style={styles.container}>
				<View style={styles.row}>
					<Text style={{fontSize:16}}>Deck Name</Text>
				</View>
				<View style={styles.row}>
					<TextInput
						style={styles.formInput}
						placeholder='Title'
            onChangeText={(title) => this.setState({title})}
            value={title}
          />
				</View>
				<View style={[styles.row, {justifyContent:'flex-end'}]}>
					<TouchableOpacity
						disabled={title === ''}
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

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(AddDeck)