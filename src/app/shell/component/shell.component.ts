import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ITable } from '../models/table';
import { ShellService } from '../service/shell.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  public openSidebar: boolean = true;
  public showError: boolean = false;
  public listTable: Array<ITable> = [];
  public defaultTable: ITable;

  constructor(
    private readonly _shellService: ShellService,
    private readonly _router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getTables();
  }

  /**
   * Get all tables
   */
  public async getTables(): Promise<void> {
    //Mostrar spinner
    let result = await this._shellService.getAllTables().finally(() => {
      //Quitar spinner
    });

    if (result.status == 200) {
      this.listTable = result.result;
      this.defaultTable = this.listTable[0];

      this.listTable.shift();
      this.showError = true;

    } else {
      this.showError = false;
    }
  }

  /**
   * Event select table
   * @param data
   */
  public selectTable(data: ITable): void {
    this._router.navigate([`/table/list/${data.id}`])
  }

}
