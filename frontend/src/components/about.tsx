import { useState } from 'react';
import { ReactComponent as CloseSVG } from '../assets/close.svg';

//import './pd-setting-modal.scss';
import './about.scss';


const About = () => {
  const [ showMore, setShowMore ] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  }

  return (
    <div className='about-component' id='about-component'>
      <div title='About the author' className='about-icon' onClick={toggleShowMore}>ℹ️</div>
      {
        showMore && <>
          <div className='filter-setting-container'></div>
          <div className='filter-setting-modal author-content-modal'>
            <div className='author-content-header'>
              <p>About the author</p>
              <div className='filter-setting-modal-close author-content-header-close' onClick={toggleShowMore}>
                <CloseSVG />
              </div>
            </div>
            <div className='author-content-body'>
              <table>
                <tbody>
                  <tr>
                    <td>05/2015</td>
                    <td>Graduated and started a job as OPT</td>
                  </tr>
                  <tr>
                    <td>10/2016</td>
                    <td>H1B approved</td>
                  </tr>
                  <tr>
                    <td>07/2017</td>
                    <td>Started PERM application</td>
                  </tr>
                  <tr>
                    <td>03/2019</td>
                    <td>Changed job, extended H1B and restarted the whole process</td>
                  </tr>
                  <tr>
                    <td>01/2021</td>
                    <td>PERM approved and received Priority Date</td>
                  </tr>
                  <tr>
                    <td>09/2021</td>
                    <td>Created this web app to help myself track the Priority Date movement</td>
                  </tr>
                  <tr>
                    <td>02/2024</td>
                    <td>I-485 filed, waiting for the AOS</td>
                  </tr>
                  <tr>
                    <td>10/28/2025</td>
                    <td>I-485 Approved</td>
                  </tr>
                  <tr>
                    <td>11/07/2025</td>
                    <td>Received Green card</td>
                  </tr>
                </tbody>
              </table>
              <p>Thank you God, for walking beside me along this journey.</p>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default About;