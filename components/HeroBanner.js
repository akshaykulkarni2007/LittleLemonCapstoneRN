import { View, Text, Image, StyleSheet } from 'react-native'

import { Searchbar } from './Searchbar'

export const HeroBanner = ({ searchText, setSearchText }) => {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Little Lemon</Text>
				<View style={styles.details}>
					<View style={styles.textContent}>
						<Text style={styles.subtitle}>Chicago</Text>
						<Text style={styles.description}>
							We are a family owned Mediterranean restaurant, focused on
							traditional recipes server with a modern twist
						</Text>
					</View>
					<Image
						source={require('../assets/images/hero.png')}
						style={styles.image}
					/>
				</View>

				<Searchbar searchText={searchText} setSearchText={setSearchText} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#495e57',
	},
	content: {
		width: '90%',
		marginLeft: '5%',
	},
	title: {
		color: '#f4ce14',
		fontSize: 64,
		fontFamily: 'MarkaziText',
	},
	details: {
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	textContent: {
		width: '50%',
	},
	subtitle: {
		color: '#fff',
		fontSize: 40,
		fontFamily: 'MarkaziText',
	},
	description: {
		color: '#fff',
		fontSize: 16,
	},
	image: {
		width: '50%',
		height: 180,
		resizeMode: 'contain',
		borderRadius: 20,
		marginBottom: 20,
	},
})
