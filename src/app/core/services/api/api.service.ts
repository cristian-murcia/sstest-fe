import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { typeRequest } from '../../enum/type-request';
import { IResponse } from '../../models/response';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public HTTP_OPTIONS: any;

  constructor(
    private _http: HttpClient
  ) {
    this.HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  /**
   * Method for sending request
   * @param data
   * @param url
   * @param type
   * @returns
   */
  public getData<U = any, T extends IResponse = IResponse>(
    url: string,
    type: typeRequest,
    data?: U
  ): Observable<T> {

    let response: Observable<ArrayBuffer | Object>;
    let apiUrl: string = environment.serverUrl + url;
    let isProduction = environment.production;

    switch (type) {
      case typeRequest.Get:
        response = this._http.get(apiUrl, this.HTTP_OPTIONS);
        break;
      case typeRequest.Post:
        response = this._http.post(apiUrl, data, this.HTTP_OPTIONS);
        break;
      case typeRequest.Put:
        response = this._http.put(apiUrl, data, this.HTTP_OPTIONS);
        break;
      case typeRequest.Delete:
        response = this._http.delete(apiUrl, this.HTTP_OPTIONS);
        break;
    }

    if (!isProduction) {
      console.log('PETICION: ', {
        url: apiUrl,
        data
      });
    }

    return response.pipe(
      map((body: any) => {

        if (!isProduction) {
          console.warn('RESPUESTA: ', body);
        }
        return body;
      })
    );
  }

  /**
   * Method that returns a promise from the http request
   * @param data
   * @param url
   * @param type
   * @returns
   */
  public async getDataPromise<U = any, T extends IResponse = IResponse>(url: string, type: typeRequest, data?: U): Promise<T> {
    try {

      const response = await this.getData<U, T>(url, type, data).toPromise();
      return {
        ...response
      }

    } catch (error) {
      return {
        status: 500,
        error: error,
        message: 'Ocurrio un error interno'
      } as T;
    }
  }
}
