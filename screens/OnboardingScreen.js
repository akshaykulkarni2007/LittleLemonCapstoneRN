import { useState } from 'react'
import { SafeAreaView, Text, TextInput, StyleSheet } from 'react-native'
import { useFormik } from 'formik'

import { Input, Button } from '../components'

import { onboardingSchema } from '../utils'

export const OnboardingScreen = () => {
	const [submitting, setSubmitting] = useState(false)

	const {
		values,
		errors,
		touched,
		isValid,
		dirty,
		handleSubmit,
		handleChange,
		handleBlur,
	} = useFormik({
		initialValues: {
			fname: '',
			email: '',
		},

		validationSchema: onboardingSchema,

		onSubmit: async (values) => {
			setSubmitting(true)

			try {
				console.log(values)
				setTimeout(() => setSubmitting(false), 2000)
			} catch (error) {
				console.log(error)
				setSubmitting(false)
			}
		},
	})

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Onboarding</Text>

			<Input
				label="First Name"
				name="fname"
				touched={touched.fname}
				errors={errors.fname}
				value={values.fname}
				handleChange={handleChange}
				handleBlur={handleBlur}
			/>

			<Input
				label="Email"
				name="email"
				touched={touched.email}
				errors={errors.email}
				value={values.email}
				keyboardType="email-address"
				handleChange={handleChange}
				handleBlur={handleBlur}
			/>

			<Button
				variant="primary"
				handlePress={handleSubmit}
				disabled={submitting || !(isValid && dirty)}
				renderStyles={styles.button}>
				<Text>Next</Text>
			</Button>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: '5%',
		backgroundColor: '#edefee',
	},
	title: {
		fontSize: 40,
		marginBottom: 24,
	},
	button: {
		width: '100%',
		marginTop: 24,
	},
})
