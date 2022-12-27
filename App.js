import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Routes from './router';


const App = props => {
  return (
    <NativeBaseProvider>
      <Routes/>
    </NativeBaseProvider>
  );
};

export default App;