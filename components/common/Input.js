import { View, Text, TextInput, StyleSheet } from 'react-native'

export const Input = ({
	label,
	name,
	value,
	touched,
	errors,
	keyboardType = 'default',
	handleChange,
	handleBlur,
}) => {
	const isInvalid = touched && errors
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				name={name}
				style={styles.input}
				onChangeText={handleChange(name)}
				onBlur={handleBlur(name)}
				value={value}
				keyboardType={keyboardType}
			/>
			{isInvalid ? <Text style={styles.error}>{errors}</Text> : null}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginTop: 16,
	},
	label: {
		fontFamily: 'Karla',
		fontSize: 18,
		marginBottom: 14,
	},
	input: {
		width: '100%',
		paddingVertical: 8,
		paddingHorizontal: 8,
		borderColor: '#333',
		borderWidth: 1,
		borderRadius: 10,
	},
	error: {
		color: 'red',
		fontSize: 14,
		marginTop: 8,
	},
})
