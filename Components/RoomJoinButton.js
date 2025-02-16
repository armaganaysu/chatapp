import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const RoomJoinButton = ({ name, roomId }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.sizing}>
       <TouchableOpacity style={styles.roomButton}onPress={() => navigation.navigate('ChatRoom', { roomId, roomName: name })}>
        <Text style={styles.textStyling} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoomJoinButton;

const styles = StyleSheet.create({
  sizing: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  roomButton: {
    borderWidth: 1,
    borderColor: 'rgb(10,132,255)',
    borderRadius: 20,
    height: 210,  // Fixed height
    width: 210,   // Fixed width
    justifyContent: 'center', // Center text inside
    alignItems: 'center',     // Center horizontally
    paddingHorizontal: 10,   // Prevent text overflow
  },
  textStyling: {
    textAlign: 'center',
    fontSize: 20, // Adjust font size if necessary
    color: 'rgb(10,132,255)',
    fontWeight: 'bold',
  },
});