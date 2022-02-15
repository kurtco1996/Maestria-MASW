import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: []
})
export class LibroComponent implements OnInit {
  @Input() titulo="";
  @Input() autor="";
  constructor(){ }
  ngOnInit(): void {
  }

}
