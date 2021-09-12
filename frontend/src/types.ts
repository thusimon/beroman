export type PDType = {
  nt: string,
  cny: string,
  cat: string,
  pd: string
};

export type PDTypeConvert = {
  nt: Date,
  cny: string,
  cat: string,
  pd: string
}
export type PDFilter = {
  ntRange: Date[],
  cnys: string[],
  cats: string[]
}

export type PDCurrentFilter = {
  ntRange: Date[],
  cny: string,
  cat: string
}

export type ChartData = {
  val: number,
  note: string,
  nt: Date,
  pd: Date
}

export type InitStateType = {
  pds: PDTypeConvert[] | null,
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
