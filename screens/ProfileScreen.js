import { useState, useEffect } from 'react'
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ScrollView,
	LogBox,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFormik } from 'formik'

import {
	Header,
	Avatar,
	Button,
	Checkbox,
	ProfileFormInputs,
} from '../components'

import { useUserInfo } from '../hooks'

import { profileSchema } from '../utils'

export const ProfileScreen = ({ navigation }) => {
	const { userInfo } = useUserInfo()

	const [submitting, setSubmitting] = useState(false)
	const [selectedNotifications, setSelectedNotifications] = useState([])
	const [defaultValues, setDefaultValues] = useState({
		fname: '',
		email: '',
		lname: '',
		phone: '',
		dp: '',
	})
	const [image, setImage] = useState(defaultValues?.dp || null)

	useEffect(() => {
		getDefaultValues()

		LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
	}, [])

	useEffect(() => {
		updateDPStorage()
	}, [image])

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
			fname: defaultValues.fname,
			lname: defaultValues.lname,
			email: defaultValues.email,
			phone: defaultValues.phone,
		},
		validationSchema: profileSchema,

		onSubmit: async (values) => {
			setSubmitting(true)

			try {
				await AsyncStorage.setItem(
					'userInfo',
					JSON.stringify({ ...values, selectedNotifications, dp: image })
				)

				navigation.navigate('Home')
			} catch (error) {
				console.log(error)
			} finally {
				setSubmitting(false)
			}
		},
	})

	const name = `${userInfo?.fname} ${userInfo?.lname || ''}`

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

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.canceled) {
			setImage(result.assets[0].uri)
		}
	}

	const handleRemoveDP = async () => {
		setImage(null)
	}

	const updateDPStorage = async () =>
		await AsyncStorage.mergeItem('userInfo', JSON.stringify({ dp: image }))

	const getDefaultValues = async () => {
		try {
			const res = await AsyncStorage.getItem('userInfo')
			const values = JSON.parse(res)

			setDefaultValues((prev) => {
				return { ...prev, ...values }
			})
			setImage(values?.dp || null)
			setSelectedNotifications([...values.selectedNotifications])
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
					<Avatar name={name || ''} uri={image || ''} style={styles.avatar} />

					<Button
						variant="dark"
						handlePress={pickImage}
						renderStyles={styles.button}>
						Change
					</Button>

					<Button
						variant="transparent"
						handlePress={handleRemoveDP}
						renderStyles={styles.button}>
						Remove
					</Button>
				</View>

				<View>
					<ProfileFormInputs
						touched={touched}
						errors={errors}
						values={values}
						handleChange={handleChange}
						handleBlur={handleBlur}
					/>

					<Text style={[styles.sectionTitle, styles.notificationTitle]}>
						Email notifications
					</Text>

					<FlatList
						data={notificationList}
						renderItem={({ item }) => {
							return (
								<Checkbox
									label={item.label}
									value={item.value}
									isSelected={selectedNotifications.includes(item.value)}
									handleChange={handleNotificationSelection}
								/>
							)
						}}
						scrollEnabled={false}
					/>

					<View style={styles.formButtonRow}>
						<Button
							variant="dark"
							handlePress={handleSubmit}
							disabled={submitting || !isValid}>
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
	avatar: {
		width: 70,
		height: 70,
		borderRadius: 70,
	},
	notificationTitle: {
		marginVertical: 16,
	},
	button: {
		paddingVertical: 0,
		paddingHorizontal: 16,
	},
	formButtonRow: {
		flexDirection: 'row',
		gap: 16,
		marginVertical: 24,
	},
})
