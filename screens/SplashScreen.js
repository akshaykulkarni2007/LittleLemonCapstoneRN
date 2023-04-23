import { View, Image, StyleSheet } from 'react-native'

export const SplashScreen = () => {
	return (
		<View style={styles.container}>
			<Image
				source={require('../assets/images/Logo.png')}
				style={styles.image}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		resizeMode: 'contain',
	},
})
