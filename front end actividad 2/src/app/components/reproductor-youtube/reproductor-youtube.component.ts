import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name:'seguro'})export class PipeSeguro implements PipeTransform{
  constructor(private sanitizer: DomSanitizer){}
  transform(url:string) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-reproductor-youtube',
  templateUrl: './reproductor-youtube.component.html',
  styleUrls: ['./reproductor-youtube.component.css']
})
export class ReproductorYoutubeComponent implements OnInit {
  @Input() url="";

  constructor() { }

  ngOnInit(): void {
  }

}
