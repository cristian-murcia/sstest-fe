import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localDate from '@angular/common/locales/es-CO';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from "@progress/kendo-angular-dropdowns";
import { PopupModule } from '@progress/kendo-angular-popup';
import '@progress/kendo-angular-intl/locales/de/all';

import { AppComponent } from './app.component';
import { ShellModule } from './shell/shell.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule, DataTableModule } from './feactures';
import { IntlModule } from '@progress/kendo-angular-intl';

//Location
registerLocaleData(localDate, 'es-CO');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    GridModule,
    DropDownsModule,
    DropDownListModule,
    PopupModule,
    LabelModule,
    InputsModule,
    ButtonsModule,
    IndicatorsModule,
    IntlModule,

    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    DataTableModule,
    CoreModule,
    ShellModule,
    GridModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "bg-BG",
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
