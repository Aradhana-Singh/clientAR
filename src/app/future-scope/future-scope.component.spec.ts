import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureScopeComponent } from './future-scope.component';

describe('FutureScopeComponent', () => {
  let component: FutureScopeComponent;
  let fixture: ComponentFixture<FutureScopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureScopeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
