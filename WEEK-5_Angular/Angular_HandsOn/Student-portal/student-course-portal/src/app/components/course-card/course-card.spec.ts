import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment';
import { CourseService } from '../../services/course';
import { provideHttpClient } from '@angular/common/http';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse: Course = {
    id: 1, name: 'Angular Basics', code: 'ANG101', credits: 3, gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [EnrollmentService, CourseService, provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Angular Basics');
  });

  it('should display course code', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.innerHTML).toContain('ANG101');
  });

  it('should have green border for passed course', () => {
    expect(component.borderStyle).toBe('5px solid green');
  });

  it('should toggle enrollment on button click', () => {
    const enrollSpy = spyOn(component, 'toggleEnrollment').and.callThrough();
    const btn = fixture.nativeElement.querySelectorAll('button')[1];
    btn.click();
    expect(enrollSpy).toHaveBeenCalled();
  });

  it('should use creditLabel pipe on credits value', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.innerHTML).toContain('3 Credits');
  });
});
