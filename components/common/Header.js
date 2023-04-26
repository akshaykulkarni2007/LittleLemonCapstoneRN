import { View, SafeAreaView, Image, StyleSheet, Pressable } from 'react-native'

import { Avatar } from './Avatar'

import { useUserInfo } from '../../hooks'
import { Button } from './Button'

export const Header = ({ navigation, showBackButton }) => {
	const { userInfo } = useUserInfo()

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContent}>
				{showBackButton ? (
					<Button
						variant="dark"
						size="small"
						renderStyles={{ marginLeft: 10 }}
						handlePress={() => navigation.pop()}>
						&larr;
					</Button>
				) : (
					<View></View>
				)}
				<Image
					source={require('../../assets/images/Logo.png')}
					style={styles.logo}
				/>

				<Pressable
					onPress={() => navigation.navigate('Profile')}
					style={styles.dp}>
					<Avatar name={userInfo?.name || ''} uri={userInfo?.imageURL || ''} />
				</Pressable>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headerContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	logo: {
		resizeMode: 'contain',
	},
	dp: {
		marginRight: 10,
	},
})
