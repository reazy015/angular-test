import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsWrapperComponent } from './feeds-wrapper.component';

describe('FeedsWrapperComponent', () => {
  let component: FeedsWrapperComponent;
  let fixture: ComponentFixture<FeedsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
