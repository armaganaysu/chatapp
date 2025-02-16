import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ref, onValue, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { database } from '../firebaseConfig';

const ChatRoom = ({ route }) => {
  const { roomId } = route.params; // Get roomId from navigation
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [users, setUsers] = useState({}); // Kullanıcı bilgilerini saklamak için
  const auth = getAuth();
  const flatListRef = useRef(null); // FlatList için ref ekleyelim

  // Kullanıcı bilgilerini getir
  useEffect(() => {
    const usersRef = ref(database, 'users');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        setUsers(usersData);
      }
    });

    return () => unsubscribe();
  }, []);

  // Mesajları getir
  useEffect(() => {
    const messagesRef = ref(database, `chatrooms/${roomId}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
          senderName: users[data.sender]?.name + ' ' + users[data.sender]?.surname // Gönderenin adını ve soyadını ekle
        }));
        setMessages(messagesData);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [roomId, users]); // users değiştiğinde de yeniden çalışsın

  // Mesajlar değiştiğinde en alta kaydır
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // ✅ 2. Send a message function
  const sendMessage = async () => {
    if (messageText.trim() === '') return; // Prevent empty messages

    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const messagesRef = ref(database, `chatrooms/${roomId}/messages`);

    try {
      await push(messagesRef, {
        text: messageText,
        sender: user.uid,
        timestamp: Date.now(),
      });

      setMessageText(''); // Clear input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // FlatList renderItem fonksiyonunu güncelleyelim
  const renderMessage = ({ item }) => {
    const isCurrentUser = item.sender === auth.currentUser.uid;
    
    return (
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        <Text style={styles.senderName}>{item.senderName}</Text>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        inverted={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Mesajınızı yazın..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  senderName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});