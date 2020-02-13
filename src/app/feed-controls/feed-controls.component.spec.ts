import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedControlsComponent } from './feed-controls.component';

describe('FeedControlsComponent', () => {
  let component: FeedControlsComponent;
  let fixture: ComponentFixture<FeedControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
