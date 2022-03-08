import { IResponse } from "src/app/core/models/response"

export interface IEsquemaTable {
  id: number,
  header: string,
  dataType: string,
  format: string,
  required: number
}

export interface IEsquemaTableResponse extends IResponse {
  result: Array<IEsquemaTable>
}
