import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkmodal',
  templateUrl: './checkmodal.component.html',
  styleUrls: ['./checkmodal.component.css']
})
export class CheckmodalComponent {

  @Output() onAnimationFinished = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.onAnimationFinished.emit();
    }, 2000);
  }

}
