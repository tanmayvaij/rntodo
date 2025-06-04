import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './screens/Home';
import Login from './screens/Login';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

import {useEffect, useState} from 'react';

const App = () => {
  GoogleSignin.configure({
    webClientId:
      '209642338204-j39fvqnmp6dfh55jfgulq4l3tip005m5.apps.googleusercontent.com',
  });

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(gUser => {
      setUser(gUser);
    });
    return subscribe;
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name="LOGIN_SCREEN"
            component={Login}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="HOME_SCREEN"
            component={Home}
            options={{title: 'To Do App', headerTitleAlign: 'center'}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
