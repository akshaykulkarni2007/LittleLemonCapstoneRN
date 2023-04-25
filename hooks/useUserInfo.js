import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useUserInfo = () => {
	const [userInfo, setUserInfo] = useState(null)

	useEffect(() => {
		const checkOnboarding = async () => {
			const onboardingStatus = await AsyncStorage.getItem('userInfo')
			setUserInfo(JSON.parse(onboardingStatus))
		}

		checkOnboarding()
	}, [])

	return { isOnboarded: !!userInfo, userInfo }
}
