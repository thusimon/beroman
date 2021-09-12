import React, {useContext, useRef, useEffect} from 'react';
import {Context} from '../contexts/context';
import {filterPD} from '../utils/data-utils';
import {timespanToString, getDateString, getChartText} from '../utils/date-utils';
import {ChartData} from '../types';
import * as d3 from 'd3';

const PDChart = () => {
  const {state} = useContext(Context);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current || !state.pds) {
      return;
    }
    const current = svgRef.current as HTMLElement
    const svgWidth = window.innerWidth * 0.9;
    const svgHeight = window.innerHeight * 0.8;
    const margin = {
      top: 100,
      right: 10,
      bottom: 30,
      left: 70
    };
    current.style.width = `${svgWidth}px`;
    current.style.height = `${svgHeight}px`;
    current.style.backgroundColor = 'slategrey';
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;

    const filteredPD = filterPD(state.pds, state.pdCurFilter);
    
    console.log(filteredPD, state.pdCurFilter);
    
    const xScale = d3.scaleTime()
    .domain(state.pdCurFilter.ntRange)
    .range([0, chartWidth])

    const data: ChartData[] = filteredPD.map(pd => {
      const res = {
        val: 1000,
        note: '',
        nt: pd.nt,
        pd: new Date()
      };
      if (pd.pd === 'C' || pd.pd === 'U') {
        res.note = pd.pd
      } else {
        const pdDate = new Date(`${pd.pd}T00:00:00`);
        if (isNaN(pdDate.getTime())) {
          res.note = 'NAN';
        } else {
          res.val = res.nt.getTime() - pdDate.getTime();
          res.pd = pdDate;
        }
      }
      return res;
    });

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, y => y.val)!])
    .range([chartHeight, 0]);
    
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove()

    const bisect = d3.bisector<ChartData, Date>(d => {
      return d.nt
    }).left;

    // chart area
    const chartRect = svg
    .append('rect')
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .attr('class', 'pd-chart-area')
    .attr('width', chartWidth)
    .attr('height', chartHeight)
    .attr('transform', `translate(${margin.left},${margin.top})`)
    .on('mousemove', (evt) => {
      const xPos = evt.offsetX - margin.left;
      const dataX = xScale.invert(xPos);
      const dataIdx = bisect(data, dataX, 1);
      const selectedData = data[dataIdx];
      if (!selectedData) {
        return;
      }
      focus
      .attr('cx', xScale(selectedData.nt) + margin.left)
      .attr('cy', yScale(selectedData.val) + margin.top)

      const texts = getChartText(selectedData);
      //focusText
      //.attr('x', xScale(selectedData.nt) + margin.left - 20)
      //.attr('y', yScale(selectedData.val) + margin.top - 60);

      focusText.selectAll('.sub-text')
      .data(texts)
      .text(d => d)
      //.attr('x', xScale(selectedData.nt) + margin.left - 20)

    })
    .on('mouseout', () => {
      focus.style('opacity', 0);
      focusText.style('opacity', 0);
    })
    .on('mouseover', () => {
      focus.style('opacity', 1);
      focusText.style('opacity', 1);
    })

    const chart = svg.append('g')
    .attr('class', 'pd-chart')
    .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add X grid lines with labels
    const xAxis = d3.axisBottom<Date>(xScale)
    .ticks(d3.timeYear)
    .tickFormat(d3.timeFormat('%Y'))
    const xAxisGroup = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${chartHeight + margin.top})`)
    .call(xAxis);

    // Add Y grid lines with labels
    const yAxis = d3.axisLeft(yScale)
    .tickFormat(d => timespanToString(d.valueOf(), false))

    const yAxisGroup = svg.append('g').call(yAxis)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const line = d3.line<ChartData>()
    .x(d => xScale(d.nt))
    .y(d => yScale(d.val))

    chart.append('path')
    .attr('stroke-width', 1.5)
    .attr('fill', 'none')
    .attr('stroke', 'bisque')
    .attr('d', line(data));

    const focus = svg
    .append('g')
    .append('circle')
    .style('fill', 'red')
    .attr('stroke', 'red')
    .attr('r', 3)
    .style('opacity', 0)

    const focusText = svg
    .append('g')
    .append('text')
    .style('opacity', 0)
    .style('fill', 'white')
    .attr('x', margin.left + 20)
    .attr('y', margin.top + 20)
    .attr('text-anchor', 'left')
    .attr('alignment-baseline', 'middle')

    for (let i = 0; i < 3; i++) {
      focusText.append('tspan')
      .attr('class', 'sub-text')
      .attr('x', margin.left + 20)
      .attr('dy', '1em');
    }

    const latestText = getChartText(data.slice(-1)[0]);
    const captionText = svg
    .append('g')
    .append('text')
    .style('fill', 'white')
    .style('font-size', '3em')
    .attr('x', 150)
    .attr('y', 60)
    .text(`From the latest data, ${latestText[1]}`)
    
    
  }, [svgRef, state.pdCurFilter, state.pds, state.pdFilter])
  return <div>
    <svg ref={svgRef} className='svg-container'></svg>
  </div>
}

export default PDChart;
