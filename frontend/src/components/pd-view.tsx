import React, {useContext} from 'react';
import {Context} from '../contexts/context';
import {getDateString} from '../utils/date-utils';

const PDView = () => {
  const {state} = useContext(Context);
  console.log(7, state.pdCurFilter, state.pdFilter);
  const [startDate, endDate] = state.pdFilter.ntRange;
  const {cnys, cats} = state.pdFilter
  return <div>
    <div>
      <div>
        <label htmlFor='date-from'>From</label>
        <input type='date' id='date-from' defaultValue={getDateString(new Date(startDate))}
          min={getDateString(new Date(startDate))} max={getDateString(new Date(endDate))}></input>
        <label htmlFor='date-to'>To</label>
        <input type='date' id='date-to' defaultValue={getDateString(new Date(endDate))}
          min={getDateString(new Date(startDate))} max={getDateString(new Date(endDate))}></input>
      </div>
      <div>
        <label htmlFor='pd-country'>Regions</label>
        <select id='pd-country'>
          {cnys.map(cny => <option value={cny} key={`pd-country-${cny}`}>{cny}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor='pd-category'>Categories</label>
        <select id='pd-category'>
          {cats.map(cat => <option value={cat} key={`pd-category-${cat}`}>{cat}</option>)}
        </select>
      </div>
    </div>
  </div>
}

export default PDView;
