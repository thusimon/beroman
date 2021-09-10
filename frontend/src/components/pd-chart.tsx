import React, {useContext, useRef, useEffect} from 'react';
import {Context} from '../contexts/context';

const PDChart = () => {
  const {state} = useContext(Context);
  const svgRef = useRef(null);
  const {ntRange, cny, cat} = state.pdCurFilter;
  const pds = state.pds
  console.log(ntRange, cny, cat)
  useEffect(() => {
    if (svgRef.current) {
      const current = svgRef.current as HTMLElement
      current.style.width = `${window.innerWidth*0.9}px`;
      current.style.height = `${window.innerHeight*0.8}px`;
      current.style.backgroundColor = 'slategrey'
    }
  }, [svgRef])
  return <div>
    <svg ref={svgRef}></svg>
  </div>
}

export default PDChart;
