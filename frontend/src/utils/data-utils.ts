import {PDType, PDTypeConvert, PDFilter, PDCurrentFilter, PDCurrentPartialFilter} from '../types'

export const initPDs = (pds: PDType[]): PDTypeConvert[] => {
  // convert pd data notice date from string to date
  // sort by notice date
  return pds.map(pd => ({
    nt: new Date(`${pd.nt}T00:00:00`),
    cny: pd.cny,
    cat: pd.cat,
    pd: pd.pd
  }))
  .sort((pd1, pd2) => pd1.nt.getTime() - pd2.nt.getTime());
}

export const filterPDBySW = (pds: PDTypeConvert[] | null, SWFilter: PDCurrentPartialFilter): {pdFilter: PDFilter, pdCurFilter: PDCurrentFilter} => {
  const pdFilter: PDFilter = {
    ntStart: new Date(),
    ntEnd: new Date(),
    cnys: [],
    cats: []
  }
  const pdCurFilter: PDCurrentFilter = {
    curNtStart: new Date(),
    curNtEnd: new Date(),
    cny: '',
    cat: ''
  }
  if (!pds) {
    return { pdFilter, pdCurFilter };
  }

  pdFilter.cnys = Array.from(new Set(pds.map(pd => pd.cny)));
  pdFilter.cats = Array.from(new Set(pds.map(pd => pd.cat)));

  // filter by service worker filters if service worker has country or category filter
  const filteredPds = pds.filter(pd => (!SWFilter.cny || pd.cny === SWFilter.cny) && (!SWFilter.cat || pd.cat === SWFilter.cat));

  pdFilter.ntStart = filteredPds[0].nt;
  pdFilter.ntEnd =  filteredPds.slice(-1)[0].nt

  pdCurFilter.curNtStart = filteredPds[0].nt;
  pdCurFilter.curNtEnd = filteredPds.slice(-1)[0].nt;

  pdCurFilter.cny = SWFilter.cny || pdFilter.cnys[0];
  pdCurFilter.cat = SWFilter.cat || pdFilter.cats[0];
  return { pdFilter, pdCurFilter };
}

export const filterPD = (pds: PDTypeConvert[], filter: PDCurrentFilter): PDTypeConvert[] => {
  const {curNtStart, curNtEnd, cny, cat} = filter
  return pds.filter(pd => pd.nt <= curNtEnd && pd.nt >= curNtStart && pd.cny === cny && pd.cat === cat)
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
