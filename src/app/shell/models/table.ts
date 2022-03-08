import { IResponse } from "src/app/core/models/response";

export interface ITable {
  id: number;
  name: string;
}

export interface ITableResponse extends IResponse {
  result: Array<ITable>
}
