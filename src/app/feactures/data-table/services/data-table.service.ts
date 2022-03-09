import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { typeRequest } from 'src/app/core/enum/type-request';
import { IResponse } from 'src/app/core/models/response';
import { ApiService } from 'src/app/core/services/api';
import { TypeTableConst } from '../const/typeTable';
import { TypeTableEnum } from '../enum/typeTable-enum';
import { IDataTableOne, IDataTableTwo, IDataTableThree, IDataTableResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor(
    private _apiService: ApiService
  ) { }

  /**
   * Get data for id table
   * @param idTable
   * @returns
   */
  public getDataTableForId(idTable: TypeTableEnum): Observable<IDataTableResponse> {
    let result = this._apiService.getData<number, IDataTableResponse>(
      `/${String(TypeTableConst.get(idTable))}`,
      typeRequest.Get
    );

    return result;
  }

  /**
   * Create  register
   * @param data
   * @param typeTable
   * @returns
   */
  public async createRegisterOrUpdate(data: IDataTableOne | IDataTableTwo | IDataTableThree, typeTable: TypeTableEnum, create: boolean): Promise<IResponse> {

    let table: string;
    let requestType = typeRequest.Post;
    let idRegister = this.getIdRegister(data, typeTable);

    if (create) {
      table = String(TypeTableConst.get(typeTable));
    } else {
      table = `${String(TypeTableConst.get(typeTable))}/${idRegister}`;
      requestType = typeRequest.Put;
    }

    let result = await this._apiService.getDataPromise<IDataTableOne | IDataTableTwo | IDataTableThree, IResponse>(
      `/${table}`,
      requestType,
      data
    );

    return result;
  }

  /**
   * Delete register
   * @param typeTable
   * @param idRegister
   * @returns
   */
  public async deleteRegister(typeTable: TypeTableEnum, idRegister: number): Promise<IResponse> {

    let result = await this._apiService.getDataPromise<any, IResponse>(
      `/${TypeTableConst.get(typeTable)}/${idRegister}`,
      typeRequest.Delete
    );

    return result;
  }

  /**
   * Get id register
   * @param data
   * @returns
   */
  public getIdRegister(data: IDataTableOne | IDataTableTwo | IDataTableThree, idTable: string): number {
    let idRegisteDelete: number = 0;

    switch (idTable) {

      case TypeTableEnum.TableOne:
        let data1: IDataTableOne = data as IDataTableOne;
        idRegisteDelete = data1.t1c1;
        break;

      case TypeTableEnum.TableTwo:
        let data2: IDataTableTwo = data as IDataTableTwo;
        idRegisteDelete = data2.t2c1;
        break;

      case TypeTableEnum.TableThree:
        let data3: IDataTableThree = data as IDataTableThree;
        idRegisteDelete = data3.t3c1;
        break;

    }

    return idRegisteDelete;
  }
}

