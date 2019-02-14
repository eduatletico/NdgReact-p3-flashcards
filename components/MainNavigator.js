import React from 'react'
import { Platform } from 'react-native'
import {
	createBottomTabNavigator,
	createMaterialTopTabNavigator,
	createAppContainer,
	createStackNavigator
} from 'react-navigation'
import { purple, white } from '../utils/colors'
import { FontAwesome } from '@expo/vector-icons'
import Home from './Home'
import AddDeck from './AddDeck'
import DeckDetail from './DeckDetail'
import AddCard from './AddCard'
import QuizStart from './QuizStart'

const TabsConfigs = {
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => <FontAwesome name='home' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}
const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}
const Tabs =
  Platform.OS === "ios"
  ? createBottomTabNavigator(TabsConfigs, TabNavigatorConfig)
  : createMaterialTopTabNavigator(TabsConfigs, TabNavigatorConfig)

const MainStack = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  QuizStart: {
    screen: QuizStart,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})

export const MainNavigator = createAppContainer(MainStack)