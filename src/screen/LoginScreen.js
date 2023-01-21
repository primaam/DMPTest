import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../components/helper';
import axios from 'axios';

import {storeJobData} from '../redux/JobRed';
import {useDispatch} from 'react-redux';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  const submit = async () => {
    try {
      const jobUrl =
        'http://dev3.dansmultipro.co.id/api/recruitment/positions.json';
      if (username !== '' && password !== '') {
        const jobResult = await axios(jobUrl);

        dispatch(storeJobData(jobResult.data));
        navigation.navigate('Home');
      } else {
        Alert.alert('Username or Password is empty');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleText}>Please, write anything to Login</Text>
        <TextInput
          value={username}
          onChangeText={val => setUsername(val)}
          placeholder="Username"
          style={styles.inputContainer}
        />
        <TextInput
          value={password}
          onChangeText={val => setPassword(val)}
          placeholder="Password"
          style={styles.inputContainer}
        />
        <Pressable style={styles.buttonContainer} onPress={submit}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(10),
  },
  inputContainer: {
    borderWidth: 0.5,
    width: '100%',
    paddingHorizontal: horizontalScale(10),
    borderRadius: 15,
    marginVertical: verticalScale(20),
  },
  buttonContainer: {
    borderRadius: 15,
    width: horizontalScale(350),
    height: verticalScale(50),
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'blue',
  },
  titleText: {
    fontWeight: 'bold',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    color: '#fff',
  },
});
