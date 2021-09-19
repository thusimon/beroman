import {ActionType, InitStateType, Action, SWMessageType, PDCurrentPartialFilter} from '../types';
import {filterPDBySW} from '../utils/data-utils';

export const Reducer = (state: InitStateType, action: Action) => {
  switch (action.type) {
    case ActionType.SET_ALL_PD: {
      return {
        ...state,
        ...action.data
      };
    }
    case ActionType.SET_FILTER_START_NOTICE_DATE: {
      return {
        ...state,
        ...{
          pdCurFilter: {
            ...state.pdCurFilter,
            ...{
              curNtStart: action.data
            }
          }
        }
      };
    }
    case ActionType.SET_FILTER_END_NOTICE_DATE: {
      return {
        ...state,
        ...{
          pdCurFilter: {
            ...state.pdCurFilter,
            ...{
              curNtEnd: action.data
            }
          }
        }
      };
    }
    case ActionType.SET_FILTER_COUNTRY: {
      navigator.serviceWorker.controller?.postMessage({type: SWMessageType.SET_DB_FILTER_COUNTRY, data: action.data});
      const newFilters = filterPDBySW(state.pds, {
        cny: action.data,
        cat: state.pdCurFilter.cat
      });
      return {
        ...state,
        ...newFilters
      };
    }
    case ActionType.SET_FILTER_CATEGORY: {
      navigator.serviceWorker.controller?.postMessage({type: SWMessageType.SET_DB_FILTER_CATEGORY, data: action.data});
      const newFilters = filterPDBySW(state.pds, {
        cny: state.pdCurFilter.cny,
        cat: action.data
      });
      return {
        ...state,
        ...newFilters
      };
    }
    case ActionType.CONTROL_SETTING_SHOW: {
      const stateUpdate = {
        ...state
      }
      stateUpdate.controls.setting = true;
      return stateUpdate;
    }
    case ActionType.CONTROL_SETTING_HIDE: {
      const stateUpdate = {
        ...state
      }
      stateUpdate.controls.setting = false;
      return stateUpdate;
    }
    case ActionType.SET_MY_PD: {
      const stateUpdate = {
        ...state
      };
      stateUpdate.mypd = action.data;
      navigator.serviceWorker.controller?.postMessage({type: SWMessageType.SET_DB_MY_PD, data: action.data});
      return stateUpdate;
    }
    default:
      return state;
  }
}