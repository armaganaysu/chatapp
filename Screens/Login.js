import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import CredentialInput from '../Components/CredentialInput';
import CustomButton from '../Components/CustomButton';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebaseConfig";

const Login = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isFocused) {
      setSelectedIndex(0);
    }
  }, [isFocused]);

  const handleSegmentChange = (event) => {
    const newIndex = event.nativeEvent.selectedSegmentIndex;
    setSelectedIndex(newIndex);
    
    if (newIndex === 1) {
      navigation.navigate('Signup');
    }
  };

  const handleLogin = async(values) => {
    const {email,password} = values
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.code)
      Alert.alert('Giriş Başarısız', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Headline */}
      <View style={styles.headline}>
        <Text style={styles.headtext}>Get Started Now</Text>
        <Text style={styles.underHeadline}>
          Create an account or log in to explore our app
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
          initialValues={{ email: '', password: '' }}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View style={styles.credentials}>
              <Text>Email</Text>
              <CredentialInput 
                keyboardType="email-address" 
                placeholder="Enter your email" 
                value={values.email} 
                onChangeText={handleChange('email')} 
              />

              <Text>Password</Text>
              <CredentialInput 
                keyboardType="default" 
                placeholder="Enter your password" 
                secureTextEntry = {true}
                value={values.password} 
                onChangeText={handleChange('password')} 
              />

              <View style={styles.buttonContainer}>
                <CustomButton
                  text="Login"
                  onPress={handleSubmit}
                  colorOption={2}
                />
                <CustomButton
                  text="Another Option"
                  onPress={() => Alert.alert('Another Option Pressed!')}
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

export default Login;

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
    flex: 3,
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
    flex: 4,
    marginHorizontal: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    paddingVertical: 20,
    marginBottom:50,
  },
  segmentedControl: {
    width: '90%',
    height: 45,
  },
  credentials: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
});
