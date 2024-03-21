import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
 @Input() title:string = ""
 @Input() data:any[] = []
 @Output() selectedValue = new EventEmitter()
  constructor(){ }

  ngOnInit(): void {

  }

  detectChanges(event:any){
    this.selectedValue.emit(event)
  }
}
