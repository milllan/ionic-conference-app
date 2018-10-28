import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallPwaButtonComponent } from './install-pwa-button.component';

describe('InstallPwaButtonComponent', () => {
  let component: InstallPwaButtonComponent;
  let fixture: ComponentFixture<InstallPwaButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallPwaButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallPwaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
