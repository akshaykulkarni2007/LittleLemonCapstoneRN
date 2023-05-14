import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('little_lemon')

export const createTable = async () =>
	new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					'CREATE TABLE IF NOT EXISTS menu (name TEXT, description TEXT, price TEXT, image TEXT, category TEXT)'
				)
			},
			reject,
			resolve
		)
	})

export const getAllCategories = async () =>
	new Promise((resolve, reject) => {
		db.transaction(async (tx) => {
			tx.executeSql(
				`SELECT category FROM menu`,
				null,
				async (txObj, { rows: { _array } }) => {
					const categories = _array

					resolve([...new Set(categories.map((item) => item.category))])
				},
				(txObj, error) => {
					console.log('Error ', error)
					reject()
				}
			)
		})
	})

export const getMenu = async () =>
	new Promise((resolve, reject) => {
		db.transaction(async (tx) => {
			tx.executeSql(
				`SELECT * FROM menu`,
				null,
				async (txObj, { rows: { _array } }) => {
					const menu = _array
					resolve(menu)
				},
				(txObj, error) => console.log('Error ', error)
			)
		})
	})

export const insertMenu = async (menu) =>
	new Promise((resolve, reject) => {
		db.transaction(async (tx) => {
			tx.executeSql(
				`INSERT INTO menu (name, price, description, image, category) values ${menu
					.map(
						(item) =>
							`("${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`
					)
					.join(', ')}`,
				[],
				(txObj, resultSet) => {
					console.log('inserted', resultSet)
					resolve(resultSet)
				},
				(txObj, error) => console.log('Error', error)
			)
		})
	})

export const filterMenu = async (query, filters) => {
	return new Promise((resolve, reject) => {
		db.transaction(async (tx) => {
			tx.executeSql(
				`SELECT * FROM menu WHERE (name like '%${query}%') AND (${filters.join(
					' OR '
				)})`,
				[],
				(_, { rows: { _array } }) => {
					const filteredMenu = _array
					resolve(filteredMenu)
				},
				(txObj, error) => console.log('Error ', error)
			)
		})
	})
}

export const fetchMenu = async () => {
	let menu

	menu = await getMenu()
	if (menu.length === 0) {
		menu = await fetchMenuFromAPI()
		insertMenu(menu)
	}

	return menu
}

export const fetchMenuFromAPI = async () => {
	const res = await fetch(
		'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
	)
	const data = await res.json()
	return data.menu
}
