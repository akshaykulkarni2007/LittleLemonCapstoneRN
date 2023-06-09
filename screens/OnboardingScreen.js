import { useState } from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFormik } from 'formik'

import { Input, Button } from '../components'

import { onboardingSchema } from '../utils'

export const OnboardingScreen = ({ navigation }) => {
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
				await AsyncStorage.setItem(
					'userInfo',
					JSON.stringify({ fname: values.fname, email: values.email })
				)

				navigation.navigate('Home')
			} catch (error) {
				console.log(error)
			} finally {
				setSubmitting(false)
			}
		},
	})

	return (
		<SafeAreaView style={styles.container}>
			<Image
				source={require('../assets/images/Logo.png')}
				style={styles.headerImage}
			/>

			<View style={styles.formContainer}>
				<Text style={styles.title}>Let us get to know you!</Text>

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
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	headerImage: {
		width: '100%',
		resizeMode: 'contain',
		marginVertical: 20,
	},
	formContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: '5%',
		backgroundColor: '#edefee',
	},
	title: {
		fontSize: 64,
		textAlign: 'center',
		marginBottom: 24,
		fontFamily: 'MarkaziText',
	},
	button: {
		width: '100%',
		marginTop: 24,
	},
})
