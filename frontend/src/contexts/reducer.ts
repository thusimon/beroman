import {ActionType, InitStateType, Action} from '../types';

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
    default:
      return state;
  }
}