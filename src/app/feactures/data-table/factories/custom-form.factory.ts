import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IEsquemaTable } from "src/app/shell/models/esquema-table";

export async function customFormFactory(table: Array<IEsquemaTable>): Promise<FormGroup> {
  let result: FormGroup = new FormGroup({}, { updateOn: 'change' });

  table.forEach((camp) => {
    result.addControl(
      camp.header,
      new FormControl('', (camp.required == 1) ? Validators.required : [])
    )
  })

  return result;
}
