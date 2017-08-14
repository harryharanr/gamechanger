import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsthesisComponent } from './prosthesis.component';

describe('ProsthesisComponent', () => {
  let component: ProsthesisComponent;
  let fixture: ComponentFixture<ProsthesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsthesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
