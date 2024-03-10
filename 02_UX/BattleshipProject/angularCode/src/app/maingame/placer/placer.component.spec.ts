import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacerComponent } from './placer.component';

describe('PlacerComponent', () => {
  let component: PlacerComponent;
  let fixture: ComponentFixture<PlacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
