import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { typeRequest } from 'src/app/core/enum/type-request';
import { IResponse } from 'src/app/core/models/response';
import { ApiService } from 'src/app/core/services/api';
import { TypeTableConst } from '../const/typeTable';
import { TypeTableEnum } from '../enum/typeTable-enum';
import { IDataTableOne, IDataTableTwo, IDataTableThree } from '../models';

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
  public getDataTableForId(idTable: number): Observable<IResponse> {
    let result = this._apiService.getData<number, IResponse>(
      `/table/${idTable}`,
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

    if (create) {
      table = String(TypeTableConst.get(typeTable));
    } else {
      table = `${String(TypeTableConst.get(typeTable))}/${typeTable}`;
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
}
