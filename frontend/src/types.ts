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
  ntStart: Date,
  ntEnd: Date,
  cnys: string[],
  cats: string[]
}

export type PDCurrentFilter = {
  curNtStart: Date,
  curNtEnd: Date,
  cny: string,
  cat: string
}

export type PDCurrentPartialFilter = {
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
  pdCurFilter: PDCurrentFilter,
  controls: {
    setting: boolean
  },
  mypd: number
};

export enum ActionType {
  SET_ALL_PD,
  SET_FILTER_START_NOTICE_DATE,
  SET_FILTER_END_NOTICE_DATE,
  SET_FILTER_COUNTRY,
  SET_FILTER_CATEGORY,
  CONTROL_SETTING_SHOW,
  CONTROL_SETTING_HIDE,
  SET_MY_PD
};

export type Action = {
  type: ActionType;
  data: any;
};

export enum SWMessageType {
  PAGE_LOADS,
  SEND_PAGE_INIT_DATA,
  SET_DB_MY_PD,  
  SET_DB_FILTER_COUNTRY,
  SET_DB_FILTER_CATEGORY
}
