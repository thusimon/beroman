import {PDType, PDTypeConvert, PDFilter, PDCurrentFilter, ChartData} from '../types'

export const initPDFilters = (pds: PDType[]): {pds: PDTypeConvert[], pdFilter: PDFilter, pdCurFilter: PDCurrentFilter} => {
  const pdFilter: PDFilter = {
    ntRange: [],
    cnys: [],
    cats: []
  }
  const pdCurFilter: PDCurrentFilter = {
    ntRange: [],
    cny: '',
    cat: ''
  }
  // convert pd data notice date from string to date
  const pdsConvert = pds.map(pd => ({
    nt: new Date(`${pd.nt}T00:00:00`),
    cny: pd.cny,
    cat: pd.cat,
    pd: pd.pd
  }));
  // sort pds
  pdsConvert.sort((pd1, pd2) => pd1.nt.getTime() - pd2.nt.getTime());
  pdFilter.ntRange = [pdsConvert[0].nt, pdsConvert[pdsConvert.length - 1].nt];
  pdFilter.cnys = Array.from(new Set(pds.map(pd => pd.cny)));
  pdFilter.cats = Array.from(new Set(pds.map(pd => pd.cat)));

  pdCurFilter.ntRange = [pdsConvert[0].nt, pdsConvert[pdsConvert.length - 1].nt];
  pdCurFilter.cny = pdFilter.cnys[0];
  pdCurFilter.cat = pdFilter.cats[0];
  return { pds:pdsConvert, pdFilter, pdCurFilter };
}

export const filterPD = (pds: PDTypeConvert[], filter: PDCurrentFilter): PDTypeConvert[] => {
  const {ntRange, cny, cat} = filter
  return pds.filter(pd => pd.nt <= ntRange[1] && pd.nt >= ntRange[0] && pd.cny === cny && pd.cat === cat)
}

export const paddingPD = (pds: PDTypeConvert[]): PDTypeConvert[] => {
  if (pds.length === 0) {
    return pds;
  }
  const minDate: PDTypeConvert = {...pds[0]}
  const maxDate: PDTypeConvert = {...(pds.slice(-1)[0])}
  minDate.pd = 'C'
  minDate.nt.setMonth(minDate.nt.getMonth() - 1);
  maxDate.pd = 'C'
  maxDate.nt.setMonth(maxDate.nt.getMonth() + 1);
  pds.unshift(minDate)
  pds.push(maxDate);
  return pds;
}
