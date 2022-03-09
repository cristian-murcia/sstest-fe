import { Component, OnInit } from '@angular/core';

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

  constructor(
    private readonly _shellService: ShellService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getTables();
  }

  /**
   * Get all tables
   */
  public async getTables(): Promise<void> {

    let result = await this._shellService.getAllTables().finally(() => {
      //Quitar spinner
    });

    if (result.status == 200) {
      this.listTable = result.result;
      this.showError = true;

    } else {
      this.showError = false;
    }
  }

}
