export type PDType = {
  nt: string,
  cny: string,
  cat: string,
  pd: string
};

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
  SET_ALL_PD
};

export type Action = {
  type: ActionType;
  data: any;
};
