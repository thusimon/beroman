import {createContext, Dispatch} from 'react';
import {InitStateType, Action} from '../types';

export const initState: InitStateType = {
  pds: null
};

export const Context = createContext<{
  state: InitStateType,
  dispatch: Dispatch<Action>
}>({
  state: initState,
  dispatch: () => null
});
