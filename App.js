import { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Platform, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import Constants from 'expo-constants'

import {
	SplashScreen as CustomSplashScreen,
	HomeScreen,
	OnboardingScreen,
	ProfileScreen,
} from './screens'

const Stack = createNativeStackNavigator()
// SplashScreen.preventAutoHideAsync()

export default function App() {
	const [isLoding, setIsLoading] = useState(false)
	const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false)

	const [fontsLoaded] = useFonts({
		Karla: require('./assets/fonts/Karla-Regular.ttf'),
		MarkaziText: require('./assets/fonts/MarkaziText-Regular.ttf'),
	})

	useEffect(() => {
		checkOnboarding()
		console.log('effect')
	}, [])

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync()
			console.log('done')
		}
	}, [fontsLoaded])

	const checkOnboarding = async () => {
		const onboardingStatus = await AsyncStorage.getItem('userInfo')
		setIsLoading(false)
		setIsOnboardingCompleted(!!onboardingStatus)
	}

	if (isLoding || !fontsLoaded) {
		return <CustomSplashScreen />
	}

	return (
		<NavigationContainer style={styles.container} onLayout={onLayoutRootView}>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{isOnboardingCompleted ? (
					<Stack.Screen name="Profile" component={ProfileScreen} />
				) : (
					<Stack.Screen name="Onboarding" component={OnboardingScreen} />
				)}

				<Stack.Screen name="Home" component={HomeScreen} />
			</Stack.Navigator>

			<StatusBar style="auto" />
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingTop: Constants.statusBarHeight,
		// marginTop: StatusBar.currentHeight,
		paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
		backgroundColor: '#fff',
	},
})
