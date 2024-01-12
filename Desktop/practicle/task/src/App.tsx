import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import LocationList from './component/LocationList';
import AddLocationButton from './component/AddLocationModal';
import styles from './styles/App.module.css'
import Home from './Screen/Home';

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>

 
  );
}

export default App;
