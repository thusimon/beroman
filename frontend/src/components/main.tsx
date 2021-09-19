import React, { useContext } from 'react';
import { useEffect } from 'react';
import {Context} from '../contexts/context';
import {ActionType, SWMessageType} from '../types';
import {initPDs, filterPDBySW} from '../utils/data-utils';
import Loading from './loading';
import PDView from './pd-view';
import axios from 'axios';

const Main = () => {
  const {state, dispatch} = useContext(Context);

  useEffect(() => {
    const getAllPD = async () => {
      // TODO GraphQL
      const resp = await axios.get('/api/all_pd');
      if (resp.status === 200 && resp.data) {
        return initPDs(resp.data);
      } else {
        return [];
      }
    }

    navigator.serviceWorker.addEventListener('message', async (event) => {
      if (!event.data) {
        return;
      }
      switch (event.data.type) {
        case SWMessageType.SEND_PAGE_INIT_DATA:{
          const dataFromSW = event.data.data;
          const pdsFromRequest = await getAllPD();

          const initFilters = filterPDBySW(pdsFromRequest, dataFromSW.pdCurFilter);

          dispatch({
            type: ActionType.SET_ALL_PD,
            data: {
              pds: pdsFromRequest,
              ...initFilters,
              mypd: dataFromSW.mypd
            }
          });
          break;
        }
        default:
          break;
      }
    });

    navigator.serviceWorker.controller?.postMessage({type: SWMessageType.PAGE_LOADS});
  }, [dispatch]);

  return (<div>
    { state.pds === null ? <Loading /> : <PDView />}
  </div>);
}

export default Main;
