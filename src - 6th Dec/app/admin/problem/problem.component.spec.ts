import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { problemComponent } from './problem.component';
import { AppModule } from 'src/app/app.module';

describe('problemComponent', () => {
    let fixture: ComponentFixture<problemComponent>;
  let component: problemComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [
        problemComponent
      ],
      providers: [
      ]}).compileComponents()
     .then(() => {
        fixture = TestBed.createComponent(problemComponent);
        component = fixture.componentInstance;
     });
  }));


it('should', async(() => {
    spyOn(component, 'editproblem()');
 
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
 
    fixture.whenStable().then(() => {
    expect(component.editproblem(problem)).toHaveBeenCalled();
   })
}));