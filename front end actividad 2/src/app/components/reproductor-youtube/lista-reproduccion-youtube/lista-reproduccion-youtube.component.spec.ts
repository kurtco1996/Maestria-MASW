import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReproduccionYoutubeComponent } from './lista-reproduccion-youtube.component';

describe('ListaReproduccionYoutubeComponent', () => {
  let component: ListaReproduccionYoutubeComponent;
  let fixture: ComponentFixture<ListaReproduccionYoutubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaReproduccionYoutubeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReproduccionYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
