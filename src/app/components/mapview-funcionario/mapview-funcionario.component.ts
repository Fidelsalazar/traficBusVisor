import { Component, TemplateRef } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-mapview-funcionario',
  templateUrl: './mapview-funcionario.component.html',
  styleUrls: ['./mapview-funcionario.component.css']
})
export class MapviewFuncionarioComponent {
  showModal = false;

  constructor (
    private dialogService: DialogService,
  ) {}

  openDialogWhtiTemplate(template : TemplateRef<any>){
    this.dialogService.openDialogWithTemplate({
      template
    })
    //.afterClosed()
    //.subscribe( (res) => console.log('Dialog Custom CLose',res));
  }

  openModal() {
    this.showModal = true;
  }

  public closeModal() {
    this.showModal = false;
  }
}
