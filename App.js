import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MealsNavigator from './navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

// Создаём Redux Store в компоненте верхнего уровня (The App).
// У приложения может быть несколько reducer-ов, которые объединяются
// в один словарь
const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);
  
  if (!fontLoaded) {
    return <AppLoading 
      startAsync={fetchFonts} 
      onFinish={() => setFontLoaded(true)} 
      onError={(err) => console.log(err)} />;
  }

  // Для того, чтобы Redux заработал, необходимо обернуть главный
  // компонент приложения в <Provider>...Provider>
  return (
    <Provider store={store}><MealsNavigator /></Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
