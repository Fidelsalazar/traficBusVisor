import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogWithTemplate } from 'src/app/models/send/dialog-with-template';

@Component({
  selector: 'app-dialog-with-template',
  templateUrl: './dialog-with-template.component.html',
  styleUrls: ['./dialog-with-template.component.css']
})
export class DialogWithTemplateComponent {

 constructor( private dialogRef: MatDialogRef<DialogWithTemplate>,@Inject(MAT_DIALOG_DATA) public data: DialogWithTemplate){}

  onCloseModal() {
    this.dialogRef.close();
  }

}
