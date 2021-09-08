export type PDType = {
  nt: string,
  cny: string,
  cat: string,
  pd: string
};

export type InitStateType = {
  pds: PDType[] | null
};

export enum ActionType {
  SET_ALL_PD
};

export type Action = {
  type: ActionType;
  data: any;
};
