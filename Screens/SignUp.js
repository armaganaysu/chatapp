import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import CredentialInput from '../Components/CredentialInput';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import {createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebaseConfig";
import { ref, set } from 'firebase/database';
import { database } from "../firebaseConfig";

const Signup = () => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleSegmentChange = (event) => {
    const newIndex = event.nativeEvent.selectedSegmentIndex;
    setSelectedIndex(newIndex);
    
    if (newIndex === 0) {
        navigation.goBack();
    }
  };


  const handleSignup = async(values) => {
    const {email, password, name, surname} = values
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        
        const userRef = ref(database, `users/${user.uid}`)
        await set(userRef, {
            name: name,
            surname: surname,
            email: email,
            createdAt: Date.now()
        })
        
        Alert.alert('Kayıt Başarılı!', `Hoşgeldiniz, ${name} ${surname}!`)
    }
    catch(error){
        console.log(error.code)
        Alert.alert('Kayıt Başarısız', error.message)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Headline */}
      <View style={styles.headline}>
        <Text style={styles.headtext}>Only a few steps left</Text>
        <Text style={styles.underHeadline}>
         and then you can experience our product...
        </Text>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <SegmentedControl
          style={styles.segmentedControl}
          values={['Log In', 'Sign Up']}
          selectedIndex={selectedIndex}
          onChange={handleSegmentChange}
        />

        <Formik
        initialValues={{
            name:'',
            surname:'',
            email:'',
            password:'',
        }}
        onSubmit={handleSignup}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.credentials}>
                        <Text>Name</Text>
                        <CredentialInput keyboardType="default" 
                                         placeholder="Enter your name" 
                                         onChangeText={handleChange('name')}
                                         onBlur={handleBlur('name')}
                                         value={values.name}/>


                        <Text>Surname</Text>
                        <CredentialInput keyboardType="default" 
                                         placeholder="Enter your surname" 
                                         onChangeText={handleChange('surname')}
                                         onBlur={handleBlur('surname')}
                                         value={values.surname}/>


                        <Text>Email</Text>
                        <CredentialInput keyboardType="email-address" 
                                         placeholder="Enter your email" 
                                         onChangeText={handleChange('email')}
                                         onBlur={handleBlur('email')}
                                         value={values.email}/>

                                         
                        <Text>Password</Text>
                        <CredentialInput keyboardType="default" 
                                         placeholder="Enter your password" 
                                         secureTextEntry= {true}
                                         onChangeText={handleChange('password')}
                                         onBlur={handleBlur('password')}
                                         value={values.password}/>

                        <View style={styles.buttonContainer}>
                                 <CustomButton
                                   text="Create Account"
                                   onPress={handleSubmit}
                                   colorOption={2}
                                 />
                                 <CustomButton
                                   text="Sign up with Google"
                                   onPress={() => Alert.alert('Google Signup Pressed!')}
                                   colorOption={2}
                                 />
                               </View>                                                                             
                      </View>
            )}
        </Formik>



      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(64,200,224)',
    },
    headtext: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
    },
    headline: {
      flex: 2, 
      alignItems: 'center',
      justifyContent: 'center',
    },
    underHeadline: {
      fontSize: 12,
      color: 'white',
      marginTop: 12,
      width: '80%',
      textAlign: 'center',
    },
    formSection: {
      flex: 5, 
      marginHorizontal: 10,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 40,
      paddingVertical: 30, 
      marginBottom: 30, 
    },
    segmentedControl: {
      width: '90%',
      height: 45,
    },
    credentials: {
      width: '90%',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10, 
    },
    buttonContainer: {
      width: '80%',
      alignItems: 'center',
      marginTop: 10, 
    },
  });