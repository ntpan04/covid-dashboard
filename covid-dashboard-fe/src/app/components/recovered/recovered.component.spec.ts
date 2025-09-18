import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveredComponent } from './recovered.component';

describe('RecoveredComponent', () => {
  let component: RecoveredComponent;
  let fixture: ComponentFixture<RecoveredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
