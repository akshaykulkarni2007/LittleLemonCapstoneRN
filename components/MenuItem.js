import { View, Text, Image, StyleSheet } from 'react-native'

export const MenuItem = (props) => {
	const { name, price, description, image, category } = props.item

	return (
		<View style={styles.container}>
			<View style={styles.details}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.description}>{description}</Text>
				<Text style={styles.price}>${price}</Text>
			</View>

			<View style={styles.imageContainer}>
				<Image
					source={{
						uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
					}}
					style={styles.image}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		maxWidth: '90%',
		marginLeft: '5%',
		paddingVertical: 10,
		borderBottomWidth: 2,
		borderBottomColor: '#edefee',
	},
	details: {
		width: '65%',
		marginRight: 16,
	},
	name: {
		fontFamily: 'Karla',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	description: {
		color: '#495e57',
		fontFamily: 'Karla',
		fontSize: 16,
		marginBottom: 10,
	},
	price: {
		color: '#495e57',
		fontFamily: 'Karla',
		fontSize: 16,
		fontWeight: '800',
	},
	imageContainer: {
		width: '30%',
	},
	image: {
		width: '100%',
		height: 100,
		resizeMode: 'contain',
	},
})
