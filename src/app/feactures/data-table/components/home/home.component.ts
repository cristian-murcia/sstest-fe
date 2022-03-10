import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Align } from '@progress/kendo-angular-popup';
import { NotificationService } from "@progress/kendo-angular-notification";

import { IEsquemaTable } from 'src/app/shell/models/esquema-table';
import { ShellService } from 'src/app/shell/service/shell.service';
import { TypeTableEnum } from '../../enum/typeTable-enum';
import { customFormFactory } from '../../factories/custom-form.factory';
import { IDataTableOne, IDataTableThree, IDataTableTwo } from '../../models';
import { DataTableService } from '../../services/data-table.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

  public idTable: number = 0;
  private editedRowIndex: number;
  public showError: boolean = false;
  public showPopupDelete: boolean = false;
  public createRegister: boolean = false;
  public dataItem: any;
  public structureTable: Array<IEsquemaTable> = [];
  public rows: Array<IDataTableOne | IDataTableTwo | IDataTableThree> = [];
  public anchorAlign: Align = { horizontal: 'center', vertical: 'center' };
  public popupAlign: Align = { horizontal: 'center', vertical: 'center' };
  public form: FormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _shellService: ShellService,
    private _dataTableService: DataTableService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(async (param: Params) => {
      this.idTable = Number(param.idTable);

      if (this.idTable > 0) {
        await this.getStructureTable();
      } else {
        this.showError = true;
      }
    });
  }

  ngDoCheck(): void {
    console.log('form: ', this.form);
  }

  /**
   * Get structure table
   */
  public async getStructureTable(): Promise<void> {
    //Mostrar spinner
    let result = await this._shellService.getStructureTable(this.idTable).finally(() => {
      //Quitar spinner
    });

    if (result.status == 200 && result.result.columns.length > 0) {
      this.structureTable = result.result.columns;
      this.structureTable.forEach(camp => {
        camp.header = camp.header.toLowerCase();
      })

      this.form = await customFormFactory(this.structureTable);
      await this.getDataTableForId();
      console.log('Formulario mi rey: ', this.form, this.structureTable);
      this.showError = false;

    } else {
      this.showError = true;
    }
  }

  /**
   * Get data table for id
   */
  public async getDataTableForId(): Promise<void> {
    let typeTable: TypeTableEnum = (String(this.idTable) == TypeTableEnum.TableOne)
      ? TypeTableEnum.TableOne : (String(this.idTable) == TypeTableEnum.TableTwo)
        ? TypeTableEnum.TableTwo : TypeTableEnum.TableThree;

    //Mostrar spinner
    this._dataTableService.getDataTableForId(typeTable).subscribe(async (result) => {
      if (result.status == 200) {
        this.rows = result.result;

      } else {
        this.showError = true;
      }
    })

  }

  public async addHandler({ sender }: any): Promise<void> {
    this.createRegister = true;

    this.closeEditor(sender);
    this.form = await customFormFactory(this.structureTable);

    sender.addRow(this.form);
  }

  public async editHandler({ sender, rowIndex, dataItem }: any): Promise<void> {
    this.createRegister = false;
    this.closeEditor(sender);
    this.form = await customFormFactory(this.structureTable, dataItem);

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.form); //this.formGroup
  }

  public cancelHandler({ sender, rowIndex }: any) {
    console.log('cancelHandler');

    this.closeEditor(sender, rowIndex);
  }

  public async saveHandler({ sender, rowIndex, formGroup, isNew }: any): Promise<void> {
    console.log(formGroup);

    if (formGroup.invalid) {
      this.notificationService.show({
        content: "Existen campos obligatorios",
        animation: { type: "fade", duration: 500 },
        position: { horizontal: "right", vertical: "top" },
        type: { style: "warning", icon: true },
        closable: true,
        height: 50
      });
      return;
    }

    const register = formGroup.value;

    //Mostrar spinner
    let result = await this._dataTableService.createRegisterOrUpdate(register, TypeTableEnum.TableOne, this.createRegister).finally(() => {
      //Quitar spinner
    });

    if (result.status == 200) {
      this.notificationService.show({
        content: result.message,
        animation: { type: "fade", duration: 500 },
        position: { horizontal: "right", vertical: "top" },
        type: { style: "success", icon: true },
        closable: true,
        height: 50
      });
      await this.getDataTableForId();

    } else {
      this.notificationService.show({
        content: result.message,
        animation: { type: "fade", duration: 500 },
        position: { horizontal: "right", vertical: "top" },
        type: { style: "error", icon: true },
        closable: true,
        height: 50
      });
    }

    sender.closeRow(rowIndex);
  }

  /**
   * Show popup by delete register
   * @param param0
   */
  public removeRegister({ dataItem }: any): void {
    this.showPopupDelete = true;
    this.dataItem = dataItem;
  }

  /**
   * Remove register
   * @param param0
   */
  public async confirmDelete(): Promise<void> {
    let idRegisteDelete: number = this._dataTableService.getIdRegister(this.dataItem, String(this.idTable));
    let typeTable: TypeTableEnum = (String(this.idTable) == TypeTableEnum.TableOne)
      ? TypeTableEnum.TableOne : (String(this.idTable) == TypeTableEnum.TableTwo)
        ? TypeTableEnum.TableTwo : TypeTableEnum.TableThree;

    //Mostrar spinner
    let result = await this._dataTableService.deleteRegister(typeTable, idRegisteDelete).finally(() => {
      //Quitar spinner
    });

    if (result.status == 200) {
      this.notificationService.show({
        content: "Se ha eliminado el registro con éxito",
        animation: { type: "fade", duration: 10 },
        position: { horizontal: "right", vertical: "top" },
        type: { style: "success", icon: true },
        closable: true,
        height: 50
      });
      this.showPopupDelete = false;
      await this.getDataTableForId();

    } else {
      this.notificationService.show({
        content: result.message,
        animation: { type: "fade", duration: 10 },
        position: { horizontal: "right", vertical: "top" },
        type: { style: "error", icon: true },
        closable: true,
        height: 50
      });
    }
  }

  /**
   * Close editor
   * @param grid
   * @param rowIndex
   */
  private closeEditor(grid: any, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
  }


}
