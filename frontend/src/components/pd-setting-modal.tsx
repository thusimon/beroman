import React, {useContext} from 'react';
import {Context} from '../contexts/context';
import { ActionType } from '../types';
import {getDateString} from '../utils/date-utils';
import { ReactComponent as CloseSVG } from '../assets/close.svg';

import './pd-setting-modal.scss';

const PDSettingModal = () => {
  const {state, dispatch} = useContext(Context);
  const closeModal = () => {
    dispatch({
      type: ActionType.CONTROL_SETTING_HIDE,
      data: ''
    });
  }
  const mypd = state.mypd > 0 ? new Date(state.mypd) : new Date();
  return <div>
    <div className='filter-setting-container'></div>
    <div className='filter-setting-modal'>
      <div className='filter-setting-modal-close' onClick={closeModal}>
        <CloseSVG />
      </div>
      <div className='filter-setting-modal-main'>
        <div className='filter-setting-modal-row'>
          <label htmlFor='my-pd-date'>Choose Your Priority Date:</label>
          <input type='date' id='my-pd-date' defaultValue={getDateString(mypd)}
            onChange={evt => {
              dispatch({
                type: ActionType.SET_MY_PD,
                data: new Date(`${evt.target.value}T00:00:00`).getTime()
              })
            }}
          ></input>
        </div>
      </div>
    </div>
  </div>;
}

export default PDSettingModal;
