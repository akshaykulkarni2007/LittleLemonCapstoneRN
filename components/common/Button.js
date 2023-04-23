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
		<Text style={styles.label}>{children}</Text>
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
		borderRadius: 5,
	},
	label: {
		fontSize: 20,
	},
	primary: {
		backgroundColor: '#f4ce14',
		borderColor: '#f4ce14',
	},
	disabled: {
		opacity: 0.4,
	},
})
