import React from 'react'
import { TextInput, View, Text } from 'react-native'

const Input = ({ label, placeholder, value, onChangeText, secureTextEntry }) => {
	const { inputStyle, labelStyle, containerStyle } = styles;

	return ( 
		<View style={containerStyle}>
			<Text style={labelStyle}>{label}</Text>
			<TextInput 
				secureTextEntry={secureTextEntry} // can list it if it's true instead of setting equal to true
				placeholder={placeholder}
				autoCorrect={false}
				style={inputStyle}
				value={value}
				onChangeText={onChangeText}
				autoCapitalize={'none'}
			/>
		</View>
	);
};

const styles = {
	labelStyle: {
		fontSize: 18,
		paddingLeft: 20,
		flex: 1
	},
	inputStyle: {
		color: '#000',
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 18,
		lineHeight: 23,
		flex: 2 // 2/3 of available space will be taken up by input
	},
	containerStyle: {
		height: 40,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	}
};

export { Input };