import React, { useContext } from 'react';
import { useEffect } from 'react';
import {Context} from '../contexts/context';
import {ActionType} from '../types';
import Loading from './loading';
import axios from 'axios';

const Main = () => {
  const {state, dispatch} = useContext(Context);

  useEffect(() => {
    const getAllPD = async () => {
      const resp = await axios.get('/api/all_pd');
      if (resp.status === 200 && resp.data) {
        dispatch({
          type: ActionType.SET_ALL_PD,
          data: resp.data
        });
      }
    }
    getAllPD();
  }, [dispatch]);

  return (<div>
    { state.pds === null ? <Loading /> : <div>Hello</div>}
  </div>);
}

export default Main;
