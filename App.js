import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './utils/configureStore'
import { MainNavigator } from './components/MainNavigator'
import AppStatusBar from './components/AppStatusBar'
import { setLocalNotification } from './utils/helpers'
import { purple } from './utils/colors'
import { AppLoading } from 'expo'

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <View style={{flex: 1}}>
            <AppStatusBar backgroundColor={purple} barStyle='light-content' />
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}