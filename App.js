import { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Platform, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import {
	SplashScreen as CustomSplashScreen,
	HomeScreen,
	OnboardingScreen,
	ProfileScreen,
} from './screens'

import { useUserInfo } from './hooks'

const Stack = createNativeStackNavigator()

export default function App() {
	const { isOnboarded } = useUserInfo()

	const [isLoding, setIsLoading] = useState(false)
	const [initialRoute, setInitialRoute] = useState('Home')

	const [fontsLoaded] = useFonts({
		Karla: require('./assets/fonts/Karla-Regular.ttf'),
		MarkaziText: require('./assets/fonts/MarkaziText-Regular.ttf'),
	})

	useEffect(() => {
		setInitialRoute(isOnboarded ? 'Home' : 'Onboarding')
	}, [isOnboarded])

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded])

	if (isLoding || !fontsLoaded || !initialRoute) {
		return <CustomSplashScreen />
	}

	return (
		<NavigationContainer style={styles.container} onLayout={onLayoutRootView}>
			<Stack.Navigator
				initialRouteName={initialRoute}
				screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Profile" component={ProfileScreen} />

				<Stack.Screen name="Onboarding" component={OnboardingScreen} />
			</Stack.Navigator>

			<StatusBar style="auto" />
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
		backgroundColor: '#fff',
	},
})
