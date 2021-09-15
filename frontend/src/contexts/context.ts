import {createContext, Dispatch} from 'react';
import {InitStateType, Action} from '../types';

export const initState: InitStateType = {
  pds: null,
  pdFilter: {
    ntStart: new Date(),
    ntEnd: new Date(),
    cnys: [],
    cats: []
  },
  pdCurFilter: {
    curNtStart: new Date(),
    curNtEnd: new Date(),
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
