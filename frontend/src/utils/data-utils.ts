import {PDType, PDFilter, PDCurrentFilter} from '../types'

export const initPDFilters = (pds: PDType[]): {pdFilter: PDFilter, pdCurFilter: PDCurrentFilter} => {
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
  const ntRangeDate = pds.map(pd => new Date(`${pd.nt}T00:00:00`).getTime()).sort();
  pdFilter.ntRange = [ntRangeDate[0], ntRangeDate[ntRangeDate.length - 1]];
  pdFilter.cnys = Array.from(new Set(pds.map(pd => pd.cny)));
  pdFilter.cats = Array.from(new Set(pds.map(pd => pd.cat)));

  pdCurFilter.ntRange = [ntRangeDate[0], ntRangeDate[ntRangeDate.length - 1]];
  pdCurFilter.cny = pdFilter.cnys[0];
  pdCurFilter.cat = pdFilter.cats[0];
  return { pdFilter, pdCurFilter };
}
