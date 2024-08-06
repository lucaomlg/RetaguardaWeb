import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotasSideNavComponent } from './rotas-side-nav.component';

describe('RotasSideNavComponent', () => {
  let component: RotasSideNavComponent;
  let fixture: ComponentFixture<RotasSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotasSideNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RotasSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
