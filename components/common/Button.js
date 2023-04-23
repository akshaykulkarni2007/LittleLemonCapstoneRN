import { Text, Pressable, StyleSheet } from 'react-native'

export const Button = ({
	variant = 'primary',
	disabled,
	handlePress,
	renderStyles,
	children,
}) => (
	<Pressable
		style={[
			styles.button,
			styles[variant],
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
	disabled: {
		opacity: 0.4,
	},
})
