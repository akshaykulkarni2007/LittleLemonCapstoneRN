import { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import * as SQLite from 'expo-sqlite'

import { Header, MenuItem } from '../components'

const db = SQLite.openDatabase('little_lemon')

export const HomeScreen = () => {
	const [menu, setMenu] = useState([])

	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS menu (name TEXT, description TEXT, price TEXT, image TEXT, category TEXT)'
			)
		})

		fetchMenu()
	}, [])

	const fetchMenu = async () => {
		db.transaction(async (tx) => {
			tx.executeSql(
				'SELECT * FROM menu',
				null,
				async (txObj, { rows: { _array } }) => {
					const dbMenu = _array

					if (dbMenu.length === 0) {
						const APIMenu = await fetchMenuFromAPI()
						setMenu(APIMenu)

						const recordCount = APIMenu.length
						const recordLength = Object.keys(APIMenu[0]).length

						const qms = '(' + '?,'.repeat(recordLength) + ')'
						const values = qms.repeat(recordCount)
						const placeholder = values.replace(/(,\))/gim, '), ')
						const finalPLaceholder = placeholder.trim().slice(0, -1)

						db.transaction((tx) => {
							console.log('inserting')

							tx.executeSql(
								'INSERT INTO menu (name, price, description, image, category) values ' +
									finalPLaceholder,
								[].concat.apply(
									[],
									APIMenu.map((x) => Object.values(x))
								),
								(txObj, resultSet) => console.log('inserted', resultSet),
								(txObj, error) => console.log('Error', error)
							)
						})
					} else {
						setMenu(dbMenu)
					}
				},
				(txObj, error) => console.log('Error ', error)
			)
		})
	}

	const fetchMenuFromAPI = async () => {
		const res = await fetch(
			'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
		)
		const data = await res.json()
		return data.menu
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
