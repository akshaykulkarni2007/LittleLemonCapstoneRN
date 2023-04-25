import { View, Text, TextInput, StyleSheet } from 'react-native'

export const Searchbar = ({ searchText, setSearchText }) => {
	return (
		<View>
			<TextInput
				placeholder="Search menu"
				value={searchText}
				onChangeText={(val) => setSearchText(val)}
				style={styles.searchbar}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	searchbar: {
		backgroundColor: '#fff',
		borderRadius: 10,
		paddingVertical: 8,
		paddingHorizontal: 10,
		marginBottom: 20,
	},
})
