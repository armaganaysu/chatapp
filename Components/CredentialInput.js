import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

const CredentialInput = (props) => {
  return (
    <View style ={styles.viewStyle}>
      <TextInput style ={styles.textStyle}
                 maxLength={100}  
                 placeholder={props.placeholder}
                 keyboardType= {props.keyboardType}
                 value = {props.value}
                 onChangeText = {props.onChangeText}
                 secureTextEntry = {props.secureTextEntry}
                    />
    </View>
  )
}

export default CredentialInput

const styles = StyleSheet.create({
    viewStyle:{
        alignItems:'center',
        justifyContent: '',
        flexDirection:'row',
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 20,
        
    },
    textStyle: {
        borderWidth:1,
        borderColor : 'gray',
        borderRadius:10,
        height:46,
        flexDirection:'column',
        flex:1,
        paddingLeft:10
        
        
    },
})