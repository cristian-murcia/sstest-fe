import { Injectable } from '@angular/core';
import { typeRequest } from 'src/app/core/enum/type-request';
import { ApiService } from 'src/app/core/services/api';
import { IEsquemaTableResponse } from '../models/esquema-table';
import { ITableResponse } from '../models/table';

@Injectable({
  providedIn: 'root'
})
export class ShellService {

  constructor(
    private _apiService: ApiService
  ) { }

  /**
   * Get all tables
   * @returns
   */
  public async getAllTables(): Promise<ITableResponse> {
    let result = await this._apiService.getDataPromise<any, ITableResponse>(
      `/table`,
      typeRequest.Get
    );

    return result;
  }

  /**
   * Get structure of table
   * @param idTable
   * @returns
   */
  public async getStructureTable(idTable: number): Promise<IEsquemaTableResponse> {
    let result = await this._apiService.getDataPromise<number, IEsquemaTableResponse>(
      `/table/${idTable}`,
      typeRequest.Get
    );

    return result;
  }

}
