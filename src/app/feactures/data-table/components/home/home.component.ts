import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IEsquemaTable } from 'src/app/shell/models/esquema-table';
import { ShellService } from 'src/app/shell/service/shell.service';
import { customFormFactory } from '../../factories/custom-form.factory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public idTable: number = 0;
  public showError: boolean = false;
  public structureTable: Array<IEsquemaTable> = [];
  public form: FormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _shellService: ShellService
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
      this.form = await customFormFactory(this.structureTable);
      console.log('Formulario mi rey: ', this.form);
      this.showError = false;

    } else {
      this.showError = true;
    }
  }


}
