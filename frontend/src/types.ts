export type PDType = {
  nt: string,
  cny: string,
  cat: string,
  pd: string
};

export type PDTypeConvert = {
  nt: number,
  cny: string,
  cat: string,
  pd: string
}
export type PDFilter = {
  ntRange: number[],
  cnys: string[],
  cats: string[]
}

export type PDCurrentFilter = {
  ntRange: number[],
  cny: string,
  cat: string
}

export type InitStateType = {
  pds: PDType[] | null,
  pdFilter: PDFilter,
  pdCurFilter: PDCurrentFilter
};

export enum ActionType {
  SET_ALL_PD,
  SET_FILTER_START_NOTICE_DATE,
  SET_FILTER_END_NOTICE_DATE,
  SET_FILTER_COUNTRY,
  SET_FILTER_CATEGORY
};

export type Action = {
  type: ActionType;
  data: any;
};
