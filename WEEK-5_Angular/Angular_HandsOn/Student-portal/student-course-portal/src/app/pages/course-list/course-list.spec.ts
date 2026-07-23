import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseList } from './course-list';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { Course } from '../../models/course.model';
import { Highlight } from '../../directives/highlight';
import { CourseCard } from '../../components/course-card/course-card';
import { provideHttpClient } from '@angular/common/http';

const mockCourses: Course[] = [
  { id: 1, name: 'Angular Basics', code: 'ANG101', credits: 3, gradeStatus: 'passed' },
];

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList, CourseCard, Highlight],
      providers: [
        provideHttpClient(),
        provideMockStore({
          selectors: [
            { selector: selectAllCourses, value: mockCourses },
            { selector: selectCoursesLoading, value: false },
            { selector: selectCoursesError, value: null }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course cards from store', () => {
    const cards = fixture.nativeElement.querySelectorAll('app-course-card');
    expect(cards.length).toBe(1);
  });
});
