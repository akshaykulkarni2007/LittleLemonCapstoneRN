import { useState, useEffect, useCallback, useMemo } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import debounce from 'lodash.debounce'

import { Header, HeroBanner, MenuFilter, MenuItem } from '../components'

import { createTable, getAllCategories, filterMenu, fetchMenu } from '../utils'

export const HomeScreen = ({ navigation }) => {
	const [menu, setMenu] = useState([])
	const [filteredMenu, setFilteredMenu] = useState([])
	const [categories, setCategories] = useState([])
	const [filters, setFilters] = useState([])
	const [searchText, setSearchText] = useState('')
	const [query, setQuery] = useState('')

	useEffect(() => {
		const initApp = async () => {
			await createTable()
			const fetchedMenu = await fetchMenu()
			setMenu(fetchedMenu)

			const allCategories = await getAllCategories()
			setCategories(allCategories)
		}

		initApp()
	}, [])

	useEffect(() => {
		if (menu.length) {
			setFilteredMenu(menu)
		}
	}, [menu])

	useEffect(() => {
		const filteredMenu = async () => {
			if (filters.length || query.length) {
				const selectedFilters = filters.length
					? filters.map((filter) => `category='${filter}'`)
					: categories.map((filter) => `category='${filter}'`)

				const filteredMenuResults = await filterMenu(query, selectedFilters)
				setFilteredMenu(filteredMenuResults)
			} else {
				setFilteredMenu(menu)
			}
		}

		filteredMenu()
	}, [filters, query])

	const emptyListComponent = (
		<Text style={styles.noItemsText}>No results found!</Text>
	)

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
