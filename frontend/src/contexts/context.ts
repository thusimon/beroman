import {createContext, Dispatch} from 'react';
import {InitStateType, Action} from '../types';

export const initState: InitStateType = {
  pds: null,
  pdFilter: {
    ntRange: [],
    cnys: [],
    cats: []
  },
  pdCurFilter: {
    ntRange: [],
    cny: '',
    cat: ''
  },
  controls: {
    setting: false
  },
  mypd: 0
};

export const Context = createContext<{
  state: InitStateType,
  dispatch: Dispatch<Action>
}>({
  state: initState,
  dispatch: () => null
});
