import { SafeAreaView, StyleSheet, FlatList, View, TouchableOpacity, Text, TextInput, Modal, Button } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import RoomJoinButton from '../Components/RoomJoinButton';
import { ref, onValue, push } from 'firebase/database';
import { database } from '../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [roomName, setRoomName] = useState('');
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const chatRoomsRef = ref(database, "chatrooms");

    const unsubscribe = onValue(chatRoomsRef, (snapshot) => {
      if (snapshot.exists()) {
        setChatRooms(Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })));
      } else {
        setChatRooms([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddRoom = () => {
    setModalVisible(true);
  };

  const createRoom = async () => {
    if (roomName.trim() === '') {
      console.log("Room name is empty");
      return;
    }
    
    const user = auth.currentUser;
    if (!user) {
      console.log("No authenticated user found");
      return;
    }
  
    const chatRoomsRef = ref(database, "chatrooms");
  
    try {
      await push(chatRoomsRef, {
        createdBy: user.uid,
        name: roomName,
        timestamp: Date.now()
      });
      console.log("Room added successfully");
    } catch (error) {
      console.error("Error adding room:", error);
    }
  
    setModalVisible(false);
    setRoomName('');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSignOut} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screenStyling}>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        numColumns={2} 
        renderItem={({ item }) => (
          <View style={styles.roomButtonStyling}>
            <RoomJoinButton name={item.name} roomId={item.createdBy} />
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.fab} onPress={handleAddRoom}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Enter Room Name</Text>
            <TextInput 
              style={styles.input} 
              value={roomName} 
              onChangeText={setRoomName} 
              placeholder="Room Name"
            />
            <Button title="Create" onPress={createRoom} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  screenStyling: {
    flex: 1,
  },
  listContainer: {
    paddingRight: 1,
  },
  roomButtonStyling: {
    margin: 5,
    alignItems: 'center',
    width:'50%'
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 60,
    height: 60,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  headerButton: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    justifyContent: 'center',
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
