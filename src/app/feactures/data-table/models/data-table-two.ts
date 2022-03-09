import { IResponse } from "src/app/core/models/response";
import { IDataTableOne } from "./data-table-one";
import { IDataTableThree } from "./data-table-three";

export interface IDataTableTwo {
  t2c1: number,
  t2c2: string,
  t2c3: number,
  t2c4: string | Date,
  t2c5: number
}

export interface IDataTableResponse extends IResponse {
  result: Array<IDataTableOne | IDataTableTwo | IDataTableThree>
}
