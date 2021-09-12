import React, {useContext} from 'react';
import {Context} from '../contexts/context';
import { ActionType } from '../types';

import './pd-setting-modal.scss';

const PDSettingModal = () => {
  const {state, dispatch} = useContext(Context);
  const closeModal = () => {
    dispatch({
      type: ActionType.CONTROL_SETTING_HIDE,
      data: ''
    });
  }
  return <div>
    <div className='filter-setting-container'></div>
    <div className='filter-setting-modal'>
      Setting here
      <div className='filter-setting-modal-close' onClick={closeModal}>close</div>
    </div>
  </div>;
}

export default PDSettingModal;
