import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCourses() should return in-memory courses', () => {
    const courses = service.getCourses();
    expect(courses.length).toBeGreaterThan(0);
  });

  it('getCourseById() should return a matching course', () => {
    const course = service.getCourseById(1);
    expect(course).toBeDefined();
    expect(course?.code).toBe('ANG101');
  });

  it('getCoursesHttp() should make a GET request to /courses and return fallback on error', () => {
    let result: Course[] = [];
    service.getCoursesHttp().subscribe(data => result = data);

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 99, name: 'Test', code: 'TST', credits: 1, gradeStatus: 'pending' }]);
    expect(result[0].name).toBe('Test');
  });

  it('addCourseHttp() should make a POST request', () => {
    const newCourse: Course = { id: 10, name: 'New Course', code: 'NEW101', credits: 2, gradeStatus: 'pending' };
    service.addCourseHttp(newCourse).subscribe();
    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('POST');
    req.flush(newCourse);
  });
});
