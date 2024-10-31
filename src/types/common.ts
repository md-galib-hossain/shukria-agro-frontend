/* eslint-disable @typescript-eslint/no-explicit-any */
export type TMeta = {
    page : number;
    limit: number;
    total: number
}

export type TResponseSuccessType= {
    data : any;
    statusCode?: number;
    meta? : TMeta
}
export type IGenericErrorMessage = {
    path: string | number;
    message: string;
  };
export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
  };