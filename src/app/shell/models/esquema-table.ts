import { IResponse } from "src/app/core/models/response"
import { ITable } from "./table"

export interface IEsquemaTable {
  id: number,
  header: string,
  dataType: string,
  format: string,
  required: number
}

export interface IStructure extends ITable {
  columns: Array<IEsquemaTable>
}

export interface IEsquemaTableResponse extends IResponse {
  result: IStructure
}
