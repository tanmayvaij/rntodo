import {View, Text, Image, StyleSheet, Pressable} from 'react-native';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Login = () => {
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const {data} = await GoogleSignin.signIn();

      if (data) {
        const googleCredentials = auth.GoogleAuthProvider.credential(
          data.idToken,
        );

        auth().signInWithCredential(googleCredentials);

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={style.screen}>
      <Text style={style.title}>To Do App</Text>
      <Image
        style={style.imageStyle}
        source={require('../assets/todoimage.jpg')}
      />
      <Pressable onPress={googleSignIn} style={style.buttonContainer}>
        <Text style={style.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
  },
  imageStyle: {
    width: 400,
    height: 400,
  },
  buttonContainer: {
    backgroundColor: 'dodgerblue',
    width: '100%',
    padding: 14,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Login;
