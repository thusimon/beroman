import React, {useReducer} from 'react';
import {Context, initState} from './contexts/context';
import {Reducer} from './contexts/reducer';

import Main from './components/main';
import './App.scss';
function App() {
  const [state, dispatch] = useReducer(Reducer, initState);

  return (
    <Context.Provider value={{
      state,
      dispatch
    }}>
      <div className="App">
        <Main />
      </div>
    </Context.Provider>
  );
}

export default App;
