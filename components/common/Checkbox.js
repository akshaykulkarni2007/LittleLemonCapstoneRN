import { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CheckboxInput from 'expo-checkbox'

export const Checkbox = ({ label, value, isSelected, handleChange }) => {
	const [isChecked, setChecked] = useState(false)

	const setSelection = () => {
		setChecked((prev) => !prev)
		handleChange(value)
	}
	return (
		<View style={styles.container}>
			<CheckboxInput
				style={styles.checkbox}
				value={isSelected || isChecked}
				onValueChange={setSelection}
				color={isChecked ? '#495e57' : undefined}
			/>
			<Text style={styles.label}>{label}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	label: {
		fontSize: 15,
	},
	checkbox: {
		margin: 8,
	},
})
