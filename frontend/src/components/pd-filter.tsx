import React, {useContext}  from 'react';
import {Context} from '../contexts/context';
import {getDateString} from '../utils/date-utils';
import {ActionType} from '../types';
import PDSettingModal from './pd-setting-modal';
import './pd-filter.scss';
import { ReactComponent as SettingSVG } from '../assets/settings.svg';

const PDFilter = () => {
  const {state, dispatch} = useContext(Context);

  const {ntStart, ntEnd, cnys, cats} = state.pdFilter;

  const {curNtStart, curNtEnd, cny, cat} = state.pdCurFilter;

  const {controls} = state;

  const handleSettings = () => {
    dispatch({
      type: ActionType.CONTROL_SETTING_SHOW,
      data: ''
    });
  }

  return <div className='filter-container'>
    <div className='filter-control'>
      <label htmlFor='date-from'>From:</label>
      <input type='date' id='date-from' defaultValue={getDateString(new Date(curNtStart))}
        min={getDateString(new Date(ntStart))} max={getDateString(new Date(ntEnd))}
        onChange={evt => {
          const updatedDate = new Date(`${evt.target.value}T00:00:00`).getTime();
          dispatch({
            type: ActionType.SET_FILTER_START_NOTICE_DATE,
            data: updatedDate
          });
        }}
      ></input>
      <label htmlFor='date-to'>To:</label>
      <input type='date' id='date-to' defaultValue={getDateString(new Date(curNtEnd))}
        min={getDateString(new Date(ntStart))} max={getDateString(new Date(ntEnd))}
        onChange={evt => {
          const updatedDate = new Date(`${evt.target.value}T00:00:00`).getTime();
          dispatch({
            type: ActionType.SET_FILTER_END_NOTICE_DATE,
            data: updatedDate
          })
        }}
      ></input>
    </div>
    <div className='filter-control'>
      <label htmlFor='pd-country'>Region:</label>
      <select id='pd-country'
        onChange={evt => dispatch({
          type: ActionType.SET_FILTER_COUNTRY,
          data: evt.target.value
        })}
      >
        {cnys.map(c => <option value={c} key={`pd-country-${c}`} selected={c == cny}>{c}</option>)}
      </select>
    </div>
    <div className='filter-control'>
      <label htmlFor='pd-category'>Category:</label>
      <select id='pd-category'
        onChange={evt => dispatch({
          type: ActionType.SET_FILTER_CATEGORY,
          data: evt.target.value
        })}
      >
        {cats.map(c => <option value={c} key={`pd-category-${c}`} selected={c == cat}>{c}</option>)}
      </select>
    </div>
    <div className='filter-control'>
      <button className='settings' onClick={handleSettings}>
        <SettingSVG />
      </button>
    </div>
    { controls.setting ? <PDSettingModal /> : <></>}
  </div>
}

export default PDFilter;
