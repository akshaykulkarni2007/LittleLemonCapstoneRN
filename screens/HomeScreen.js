import { useState, useEffect, useCallback } from 'react'
import { View, Text, FlatList, StyleSheet, LogBox } from 'react-native'
import * as SQLite from 'expo-sqlite'
import debounce from 'lodash.debounce'

import { Header, HeroBanner, MenuFilter, MenuItem } from '../components'

const db = SQLite.openDatabase('little_lemon')

export const HomeScreen = ({ navigation }) => {
	const [menu, setMenu] = useState([])
	const [filteredMenu, setFilteredMenu] = useState([])
	const [categories, setCategories] = useState([])
	const [filters, setFilters] = useState([])
	const [searchText, setSearchText] = useState('')

	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS menu (name TEXT, description TEXT, price TEXT, image TEXT, category TEXT)'
			)
		})

		db.transaction(async (tx) => {
			tx.executeSql(
				`SELECT category FROM menu`,
				null,
				async (txObj, { rows: { _array } }) => {
					const categories = _array
					setCategories([...new Set(categories.map((item) => item.category))])
				},
				(txObj, error) => console.log('Error ', error)
			)
		})

		fetchMenu()
	}, [])

	useEffect(() => {
		if (menu.length) {
			setFilteredMenu(menu)
		}
	}, [menu])

	useEffect(() => {
		if (filters.length || searchText.length) {
			filterMenu()
		} else {
			setFilteredMenu(menu)
		}
	}, [filters, searchText])

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

	const emptyListComponent = (
		<Text style={styles.noItemsText}>No results found!</Text>
	)

	const filterMenu = async () => {
		const transformedFilters = filters.map((a) => "'" + a + "'").join(',')

		db.transaction(async (tx) => {
			tx.executeSql(
				`SELECT * FROM menu WHERE category IN (${transformedFilters}) AND name LIKE '%${searchText}%'`,
				null,
				async (txObj, { rows: { _array } }) => {
					const filteredMenu = _array
					setFilteredMenu(filteredMenu)
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
				data={filteredMenu}
				extraData={menu}
				keyExtractor={(item) => item.name}
				renderItem={({ item }) => <MenuItem item={item} />}
				ListEmptyComponent={emptyListComponent}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	noItemsText: {
		marginLeft: '5%',
	},
})
