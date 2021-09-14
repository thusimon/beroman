import {ActionType, InitStateType, Action, SWMessageType} from '../types';

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
              ntRange: [action.data, state.pdCurFilter.ntRange[1]]
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
              ntRange: [state.pdCurFilter.ntRange[0], action.data]
            }
          }
        }
      };
    }
    case ActionType.SET_FILTER_COUNTRY: {
      return {
        ...state,
        ...{
          pdCurFilter: {
            ...state.pdCurFilter,
            ...{
              cny: action.data
            }
          }
        }
      };
    }
    case ActionType.SET_FILTER_CATEGORY: {
      return {
        ...state,
        ...{
          pdCurFilter: {
            ...state.pdCurFilter,
            ...{
              cat: action.data
            }
          }
        }
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