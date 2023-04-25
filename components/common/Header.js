import { View, SafeAreaView, Image, StyleSheet } from 'react-native'

import { Avatar } from './Avatar'

import { useUserInfo } from '../../hooks'

export const Header = () => {
	const { userInfo } = useUserInfo()

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContent}>
				<Image
					source={require('../../assets/images/Logo.png')}
					style={styles.logo}
				/>

				<View style={styles.dp}>
					<Avatar name={userInfo?.name || ''} uri={userInfo?.imageURL || ''} />
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	headerContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '75%',
	},
	logo: {
		resizeMode: 'contain',
	},
	dp: {
		marginRight: 10,
	},
})
