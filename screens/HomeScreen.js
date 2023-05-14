import { useState, useEffect, useCallback, useMemo } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
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
	const [query, setQuery] = useState('')

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
		if (filters.length || query.length) {
			filterMenu()
		} else {
			setFilteredMenu(menu)
		}
	}, [filters, query])

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

						db.transaction((tx) => {
							tx.executeSql(
								`INSERT INTO menu (name, price, description, image, category) values ${APIMenu.map(
									(item) =>
										`("${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`
								).join(', ')}`,
								[],
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
		const selectedFilters = filters.length
			? filters.map((filter) => `category='${filter}'`)
			: categories.map((filter) => `category='${filter}'`)

		db.transaction(async (tx) => {
			tx.executeSql(
				`SELECT * FROM menu WHERE (name like '%${query}%') AND (${selectedFilters.join(
					' OR '
				)})`,
				[],
				(_, { rows: { _array } }) => {
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

	const lookup = useCallback((q) => {
		setQuery(q)
	}, [])

	const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup])

	const handleSearchChange = (text) => {
		setSearchText(text)
		debouncedLookup(text)
	}

	return (
		<View style={styles.container}>
			<Header navigation={navigation} />

			<HeroBanner searchText={searchText} setSearchText={handleSearchChange} />

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
