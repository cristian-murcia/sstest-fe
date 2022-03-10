import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DataTableRoutingModule } from './data-table-routing.module';
import { PopupAnchorDirective } from './directive/popup.anchor-target.directive';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { IntlModule } from '@progress/kendo-angular-intl';
import "@progress/kendo-angular-intl/locales/bg/all";
// Load the required calendar data for the de locale
import "@progress/kendo-angular-intl/locales/de/calendar";


@NgModule({
  declarations: [HomeComponent, PopupAnchorDirective],
  imports: [
    CommonModule,
    DataTableRoutingModule,
    GridModule,
    DropDownListModule,
    IntlModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DataTableModule { }
