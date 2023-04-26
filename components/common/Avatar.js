import { View, Text, Image, StyleSheet } from 'react-native'

import React from 'react'

export const Avatar = ({ uri, name, style }) => {
	return (
		<View style={[styles.container, style]}>
			{uri ? (
				<Image source={{ uri }} style={styles.image} />
			) : (
				<Text style={styles.initials}>
					{name
						.split(' ')
						.map((n) => n[0])
						.join('')}
				</Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 30,
		height: 30,
		backgroundColor: '#f4ce14',
		borderColor: '#f4ce14',
		borderWidth: 1,
		borderRadius: 30,
	},
	image: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		resizeMode: 'contain',
	},
	initials: {
		color: '#fff',
		fontSize: 16,
		fontFamily: 'Karla',
		textTransform: 'uppercase',
	},
})
