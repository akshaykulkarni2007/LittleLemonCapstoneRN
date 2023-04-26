import { Text, Pressable, StyleSheet } from 'react-native'

export const Button = ({
	variant = 'primary',
	disabled,
	size,
	handlePress,
	renderStyles,
	children,
}) => (
	<Pressable
		style={[
			styles.button,
			styles[variant],
			styles[size],
			renderStyles,
			disabled && styles.disabled,
		]}
		disabled={disabled}
		onPress={handlePress}>
		<Text style={[styles.label, styles[`${variant}Label`]]}>{children}</Text>
	</Pressable>
)

const styles = StyleSheet.create({
	button: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingVertical: 16,
		borderWidth: 1,
		borderRadius: 10,
	},
	label: {
		fontFamily: 'Karla',
		fontSize: 20,
	},
	primary: {
		backgroundColor: '#f4ce14',
		borderColor: '#f4ce14',
	},
	dark: {
		backgroundColor: '#495e57',
		borderColor: '#495e57',
	},
	darkLabel: {
		color: '#fff',
	},
	transparent: {
		backgroundColor: 'transparent',
		borderColor: '#495e57',
	},
	transparentLabel: {
		color: '#495e57',
	},
	small: {
		paddingTop: 0,
		paddingBottom: 10,
		paddingHorizontal: 5,
		borderRadius: 20,
	},
	disabled: {
		opacity: 0.4,
	},
})
