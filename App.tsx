/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {store} from './src/redux/store'
import { Provider } from 'react-redux';
import AppStack from './src/navigation/AppStack';
import {DetailScreen,HomeScreen,LoginScreen} from './src/screen'



function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
}



export default App;
