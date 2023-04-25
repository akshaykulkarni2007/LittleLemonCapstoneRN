import { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

import { Header, MenuItem } from '../components'

export const HomeScreen = () => {
	const [menu, setMenu] = useState([])

	useEffect(() => {
		getMenu()
	}, [])

	const getMenu = async () => {
		const res = await fetch(
			'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
		)
		const data = await res.json()
		setMenu(data.menu)
	}

	return (
		<View>
			<Header />

			<FlatList
				data={menu}
				keyExtractor={(item) => item.name}
				renderItem={({ item }) => <MenuItem item={item} />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({})
