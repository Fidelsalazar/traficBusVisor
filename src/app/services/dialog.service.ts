import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogWithTemplateComponent } from '../components/assets/dialog-with-template/dialog-with-template.component';
import { DialogWithTemplate } from '../models/send/dialog-with-template';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) {
  }

  openDialogWithTemplate(data : DialogWithTemplate){
    return this.matDialog.open(DialogWithTemplateComponent, { data })
  }

  openDialogWithTemplateMod(data : DialogWithTemplate){
    return this.matDialog.open(DialogWithTemplateComponent, { data })
  }

  openDialogWithTemplateConf(data : DialogWithTemplate){
    return this.matDialog.open(DialogWithTemplateComponent)
  }
}
