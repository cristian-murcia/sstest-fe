import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IEsquemaTable } from 'src/app/shell/models/esquema-table';
import { ShellService } from 'src/app/shell/service/shell.service';
import { TypeTableEnum } from '../../enum/typeTable-enum';
import { customFormFactory } from '../../factories/custom-form.factory';
import { IDataTableOne, IDataTableThree, IDataTableTwo } from '../../models';
import { DataTableService } from '../../services/data-table.service';


//

const createFormGroup = (dataItem: any) => new FormGroup({
  'ProductID': new FormControl(dataItem.ProductID),
  'ProductName': new FormControl(dataItem.ProductName, Validators.required),
  'UnitPrice': new FormControl(dataItem.UnitPrice),
  'UnitsInStock': new FormControl(dataItem.UnitsInStock, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
  'CategoryID': new FormControl(dataItem.CategoryID, Validators.required)
});
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

  public idTable: number = 0;
  public showError: boolean = false;
  public structureTable: Array<IEsquemaTable> = [];
  public rows: Array<IDataTableOne | IDataTableTwo | IDataTableThree> = [];
  public form: FormGroup;
  private editedRowIndex: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _shellService: ShellService,
    private _dataTableService: DataTableService
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

  public async createOrUpdateRegister(): Promise<void> {

  }


  public async addHandler({ sender }: any): Promise<void> {
    console.log('addHandler');

    this.closeEditor(sender);

    /*this.formGroup = createFormGroup({
      'ProductName': '',
      'UnitPrice': 0,
      'UnitsInStock': '',
      'CategoryID': 1
    });*/

    this.form = await customFormFactory(this.structureTable);

    sender.addRow(this.form);
  }

  public async editHandler({ sender, rowIndex, dataItem }: any): Promise<void> {
    console.log('editHandler');

    this.closeEditor(sender);

    //this.formGroup = createFormGroup(dataItem);
    this.form = await customFormFactory(this.structureTable, dataItem);

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.form); //this.formGroup
  }

  public cancelHandler({ sender, rowIndex }: any) {
    console.log('cancelHandler');

    this.closeEditor(sender, rowIndex);
  }

  public async saveHandler({ sender, rowIndex, formGroup, isNew }: any): Promise<void> {
    console.log('saveHandler');

    const register = formGroup.value;
    console.log(1, register);

    //Mostrar spinner
    let result = await this._dataTableService.createRegisterOrUpdate(register, TypeTableEnum.TableOne, false).finally(() => {
      //Quitar spinner
    });

    console.log('resultado de guardar: ', result);
    await this.getDataTableForId();

    //this._dataTableService.save(register, isNew);

    sender.closeRow(rowIndex);
  }

  /**
   * Remove register
   * @param param0
   */
  public async removeRegister({ dataItem }: any): Promise<void> {
    let idRegisteDelete: number = this._dataTableService.getIdRegister(dataItem, String(this.idTable));
    let typeTable: TypeTableEnum = (String(this.idTable) == TypeTableEnum.TableOne)
      ? TypeTableEnum.TableOne : (String(this.idTable) == TypeTableEnum.TableTwo)
        ? TypeTableEnum.TableTwo : TypeTableEnum.TableThree;

    console.log('ELiminar registro ', idRegisteDelete, typeTable);

    return;

    //Mostrar alerta para confirmar borrado --> Todo correcto, terminar

    //Mostrar spinner
    let result = await this._dataTableService.deleteRegister(typeTable, idRegisteDelete).finally(() => {
      //Quitar spinner
    });

    if (result.status == 200) {
      // Mostrar alerta de ok

    } else {
      //Mostrar error
    }

  }

  /**
   * Close editor
   * @param grid
   * @param rowIndex
   */
  private closeEditor(grid: any, rowIndex = this.editedRowIndex) {
    console.log('closeEditor');
    grid.closeRow(rowIndex);
    this.editedRowIndex = 0;
    this.form = new FormGroup({});;
  }


}
