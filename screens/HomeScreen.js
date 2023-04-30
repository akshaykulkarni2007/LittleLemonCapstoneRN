import { useState, useEffect, useCallback } from 'react'
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ScrollView,
	LogBox,
} from 'react-native'
import Constants from 'expo-constants'
import * as SQLite from 'expo-sqlite'
import debounce from 'lodash.debounce'

import { Header, HeroBanner, MenuFilter, MenuItem } from '../components'

const db = SQLite.openDatabase('little_lemon')

export const HomeScreen = ({ navigation }) => {
	const [menu, setMenu] = useState([])
	const [filters, setFilters] = useState([])
	const [searchText, setSearchText] = useState('')

	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS menu (name TEXT, description TEXT, price TEXT, image TEXT, category TEXT)'
			)
		})

		fetchMenu()
		LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
	}, [])

	useEffect(() => {
		filterMenu()
	}, [filters, searchText])

	const categories = [...new Set(menu.map((item) => item.category))]

	const fetchMenu = async () => {
		db.transaction(async (tx) => {
			tx.executeSql(
				`SELECT * FROM menu`,
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

	const filterMenu = async () => {
		const transformedFilters = filters.map((a) => "'" + a + "'").join(',')
		console.log('filtering', transformedFilters)
		db.transaction(async (tx) => {
			tx.executeSql(
				`SELECT * FROM menu WHERE category IN (${transformedFilters}) AND name LIKE '%${searchText}%'`,
				null,
				async (txObj, { rows: { _array } }) => {
					const filteredMenu = _array
					console.log(filteredMenu)
				},
				(txObj, error) => console.log('Error ', error)
			)
		})
	}

	const handleChangeFilter = (text) => {
		filters.includes(text)
			? setFilters((prev) => prev.filter((v) => v !== text))
			: setFilters((prev) => [...prev, text])
	}

	const handleDebounceSearch = async (inputValue) => {
		console.log(inputValue)
	}

	const debounceSearch = useCallback(debounce(handleDebounceSearch, 500), [])

	return (
		<View style={styles.container}>
			<Header navigation={navigation} />

			<HeroBanner
				searchText={searchText}
				setSearchText={(val) => {
					setSearchText(val)
					debounceSearch(val)
				}}
			/>

			<MenuFilter
				categories={categories}
				selectedFilters={filters}
				setFilters={handleChangeFilter}
			/>

			<FlatList
				data={menu}
				keyExtractor={(item) => item.name}
				renderItem={({ item }) => <MenuItem item={item} />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
