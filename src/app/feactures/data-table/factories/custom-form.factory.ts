import { FormControl, FormGroup, Validators } from "@angular/forms";

import { IEsquemaTable } from "src/app/shell/models/esquema-table";
import { IDataTableOne, IDataTableThree, IDataTableTwo } from "../models";

export async function customFormFactory(table: Array<IEsquemaTable>, data?: IDataTableOne | IDataTableTwo | IDataTableThree): Promise<FormGroup> {
  let result: FormGroup = new FormGroup({}, { updateOn: 'change' });

  table.forEach((camp) => {
    const nameHeader = camp.header.toLowerCase() as string;
    let value = data ? data[nameHeader as keyof typeof data] : '';

    result.addControl(
      camp.header.toLowerCase(),
      new FormControl(value, (camp.required == 1) ? Validators.required : [])
    )
  })

  return result;
}
