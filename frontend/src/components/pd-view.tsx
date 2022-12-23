import { useState } from 'react';
import PDFilter from './pd-filter';
import PDChart from './pd-chart';
import { ReactComponent as DisclaimerSVG } from '../assets/disclaimer.svg';

import './pd-view.scss';

const PDView = () => {
  const [ disclaimerToggle, setDisclaimerToggle] = useState(false);

  const onDisclaimerClick = () => {
    setDisclaimerToggle(!disclaimerToggle);
  }
  return <div className='pd-view'>
    <div className='pd-view-head'>
      <h1>
        Employment Based Priority Date (Official release <a 
          href='https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html'
          target='_blank'>here</a>)
      </h1>
      <span title='Disclaimer' onClick={onDisclaimerClick}>
        <DisclaimerSVG />
      </span>
      { 
        disclaimerToggle &&
        <div className='disclaimer-text'>
          <p>Disclaimer: This tool is just for employment based US green card applicants' convenience, remembering the region, category and Priority Date on the device locally and visualizing the history data.</p>
          <p>All the data are derived from the USCIS official website, if there is any data wrong/missing on this website or USCIS disallows distributing its ground truth elsewhere, this website is not responsible for these cases, and please refer to the USCIS official website</p>
        </div>
      }
    </div>
    <PDFilter />
    <PDChart />
  </div>
}

export default PDView;
