import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import { OnboardingScreen } from './screens'

export default function App() {
	return (
		<View style={styles.container}>
			<OnboardingScreen />
			<StatusBar style="auto" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
