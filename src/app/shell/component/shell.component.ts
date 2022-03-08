import { Component, OnInit } from '@angular/core';
import { ShellService } from '../service/shell.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor(
    private readonly _shellService: ShellService
  ) { }

  async ngOnInit(): Promise<void> {
    this._shellService.getAllTables();
    this._shellService.getStructureTable(1);

  }

}
