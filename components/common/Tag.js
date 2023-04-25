import { Text, Pressable, StyleSheet } from 'react-native'

export const Tag = ({ label, selected, handlePress }) => {
	return (
		<Pressable
			onPress={() => handlePress(label)}
			style={[
				styles.button,
				selected.includes(label) ? styles.selectedBG : null,
			]}>
			<Text
				style={[
					styles.text,
					selected.includes(label) ? styles.selectedText : null,
				]}>
				{label}
			</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#495e57',
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginTop: 10,
		marginRight: 10,
		borderRadius: 10,
	},
	text: {
		color: '#fff',
		textTransform: 'capitalize',
		fontWeight: 'bold',
	},
	selectedBG: {
		backgroundColor: '#f4ce14',
	},
	selectedText: {
		color: '#495e57',
	},
})
