// import { useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

import { Tag } from './common'

export const MenuFilter = ({ categories, selectedFilters, setFilters }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Order for delivery</Text>

			<FlatList
				data={categories}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<Tag
						label={item}
						selected={selectedFilters}
						handlePress={setFilters}
					/>
				)}
				horizontal
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '90%',
		marginLeft: '5%',
		marginVertical: 20,
		paddingBottom: 20,
		borderBottomColor: '#495e57',
		borderBottomWidth: 1,
	},
	title: {
		fontFamily: 'Karla',
		fontSize: 20,
		fontWeight: 800,
		textTransform: 'uppercase',
	},
})
