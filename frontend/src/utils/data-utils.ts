import {PDType, PDTypeConvert, PDFilter, PDCurrentFilter} from '../types'

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
    nt: new Date(`${pd.nt}T00:00:00`).getTime(),
    cny: pd.cny,
    cat: pd.cat,
    pd: pd.pd
  }));
  // sort pds
  pdsConvert.sort((pd1, pd2) => pd1.nt - pd2.nt)
  const ntRangeDate = pds.map(pd => new Date(`${pd.nt}T00:00:00`).getTime()).sort();
  pdFilter.ntRange = [ntRangeDate[0], ntRangeDate[ntRangeDate.length - 1]];
  pdFilter.cnys = Array.from(new Set(pds.map(pd => pd.cny)));
  pdFilter.cats = Array.from(new Set(pds.map(pd => pd.cat)));

  pdCurFilter.ntRange = [ntRangeDate[0], ntRangeDate[ntRangeDate.length - 1]];
  pdCurFilter.cny = pdFilter.cnys[0];
  pdCurFilter.cat = pdFilter.cats[0];
  return { pds:pdsConvert, pdFilter, pdCurFilter };
}
