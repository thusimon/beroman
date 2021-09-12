import React from 'react';
import PDFilter from './pd-filter';
import PDChart from './pd-chart';
import './pd-view.scss';

const PDView = () => {
  return <div className='pd-view'>
    <h1>
      Employment Based Priority Date (Official release <a 
        href='https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html'
        target='_blank'>here</a>)
    </h1>
    <PDFilter />
    <PDChart />
  </div>
}

export default PDView;
