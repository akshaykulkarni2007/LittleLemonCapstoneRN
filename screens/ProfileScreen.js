import { useState, useEffect } from 'react'
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ScrollView,
	LogBox,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFormik } from 'formik'

import { Header, Avatar, Input, Button, Checkbox } from '../components'

import { useUserInfo } from '../hooks'

import { profileSchema } from '../utils'

export const ProfileScreen = ({ navigation }) => {
	const { userInfo } = useUserInfo()

	const [submitting, setSubmitting] = useState(false)
	const [selectedNotifications, setSelectedNotifications] = useState([])
	const [defaultValues, setDefaultValues] = useState({ name: '', email: '' })

	useEffect(() => {
		getDefaultValues()

		LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
	}, [])

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
		enableReinitialize: true,
		initialValues: {
			fname: defaultValues.name,
			lname: '',
			email: defaultValues.email,
			phone: '',
		},
		validationSchema: profileSchema,

		onSubmit: async (values) => {
			setSubmitting(true)

			try {
				console.log(values)
				console.log(selectedNotifications)
				// ["orders", "password"] //selectedNotifications
				// {"email": "Akshaykulkarni2007@gmail.com", "fname": "akshay ", "lname": "Kulkarni ", "phone": "1234567890"}
			} catch (error) {
				console.log(error)
			} finally {
				setSubmitting(false)
			}
		},
	})

	const notificationList = [
		{ id: 1, label: 'Order statuses', value: 'orders', isChecked: false },
		{ id: 2, label: 'Password changes', value: 'password', isChecked: false },
		{ id: 3, label: 'Special offers', value: 'offers', isChecked: false },
		{ id: 4, label: 'Newsletter', value: 'newsletters', isChecked: false },
	]

	const handleNotificationSelection = (val) => {
		setSelectedNotifications((prev) =>
			prev.includes(val) ? prev.filter((p) => p !== val) : [...prev, val]
		)
	}

	const getDefaultValues = async () => {
		try {
			const values = await AsyncStorage.getItem('userInfo')
			setDefaultValues((prev) => {
				return { ...prev, ...JSON.parse(values) }
			})
		} catch (error) {
			console.log(error)
		}
	}

	const handleLogout = async () => {
		try {
			await AsyncStorage.clear()
			navigation.navigate('Onboarding')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<ScrollView style={styles.container}>
			<Header navigation={navigation} showBackButton={true} />

			<View style={styles.pageContainer}>
				<Text style={styles.sectionTitle}>Personal Information</Text>

				<View style={styles.dpSection}>
					<Avatar
						name={userInfo?.name || ''}
						uri={userInfo?.imageURL || ''}
						style={{ width: 50, height: 50 }}
					/>

					<Button
						variant="dark"
						handlePress={() => {}}
						renderStyles={styles.button}>
						Change
					</Button>

					<Button
						variant="transparent"
						handlePress={() => {}}
						renderStyles={styles.button}>
						Remove
					</Button>
				</View>

				<View>
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
						label="Last Name"
						name="lname"
						touched={touched.lname}
						errors={errors.lname}
						value={values.lname}
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
					<Input
						label="Phone number"
						name="phone"
						touched={touched.phone}
						errors={errors.phone}
						value={values.phone}
						keyboardType="phone-pad"
						handleChange={handleChange}
						handleBlur={handleBlur}
					/>
					<Text style={[styles.sectionTitle, styles.notificationTitle]}>
						Email notifications
					</Text>

					<FlatList
						data={notificationList}
						renderItem={({ item }) => (
							<Checkbox
								label={item.label}
								value={item.value}
								isSelected={
									defaultValues?.selectedNotifications?.includes[item.value]
								}
								handleChange={handleNotificationSelection}
							/>
						)}
						scrollEnabled={false}
					/>

					<View style={styles.formButtonRow}>
						<Button
							variant="dark"
							handlePress={handleSubmit}
							disabled={submitting || !(isValid && dirty)}>
							Save changes
						</Button>

						<Button
							variant="transparent"
							handlePress={() => {
								navigation.navigate('Home')
							}}>
							Discard changes
						</Button>
					</View>
					<Button variant="primary" handlePress={handleLogout}>
						Logout
					</Button>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	pageContainer: {
		width: '90%',
		marginHorizontal: '5%',
		marginVertical: 16,
	},
	sectionTitle: {
		fontFamily: 'Karla',
		fontSize: 18,
		fontWeight: 'bold',
	},
	dpSection: {
		flexDirection: 'row',
		gap: 24,
		marginVertical: 16,
	},
	notificationTitle: {
		marginVertical: 16,
	},
	button: {
		paddingVertical: 0,
		paddingHorizontal: 10,
	},
	formButtonRow: {
		flexDirection: 'row',
		gap: 16,
		marginVertical: 24,
	},
})
