import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAnuncioComponent } from './ver-anuncio.component';

describe('VerAnuncioComponent', () => {
  let component: VerAnuncioComponent;
  let fixture: ComponentFixture<VerAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerAnuncioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
