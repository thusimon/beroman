import React, {useContext}  from 'react';
import {Context} from '../contexts/context';
import {getDateString} from '../utils/date-utils';
import {ActionType} from '../types';
import './pd-filter.scss';

const PDFilter = () => {
  const {state, dispatch} = useContext(Context);
  const [startDate, endDate] = state.pdFilter.ntRange;
  const {cnys, cats} = state.pdFilter;
  return <div className='filter-container'>
    <div className='filter-control'>
      <label htmlFor='date-from'>From:</label>
      <input type='date' id='date-from' defaultValue={getDateString(new Date(startDate))}
        min={getDateString(new Date(startDate))} max={getDateString(new Date(endDate))}
        onChange={evt => dispatch({
          type: ActionType.SET_FILTER_START_NOTICE_DATE,
          data: new Date(`${evt.target.value}T00:00:00`).getTime()
        })}
      ></input>
      <label htmlFor='date-to'>To:</label>
      <input type='date' id='date-to' defaultValue={getDateString(new Date(endDate))}
        min={getDateString(new Date(startDate))} max={getDateString(new Date(endDate))}
        onChange={evt => dispatch({
          type: ActionType.SET_FILTER_END_NOTICE_DATE,
          data: new Date(`${evt.target.value}T00:00:00`).getTime()
        })}
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
        {cnys.map(cny => <option value={cny} key={`pd-country-${cny}`}>{cny}</option>)}
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
        {cats.map(cat => <option value={cat} key={`pd-category-${cat}`}>{cat}</option>)}
      </select>
    </div>
  </div>
}

export default PDFilter;
