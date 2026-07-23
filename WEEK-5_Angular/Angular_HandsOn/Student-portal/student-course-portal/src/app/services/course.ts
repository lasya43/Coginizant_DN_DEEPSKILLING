import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, switchMap, of } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  // In-memory fallback used before json-server starts
  private courses: Course[] = [
    { id: 1, name: 'Angular Basics', code: 'ANG101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'Advanced React', code: 'REA201', credits: 4, gradeStatus: 'pending' },
    { id: 3, name: 'Node.js Backend', code: 'NOD301', credits: 3, gradeStatus: 'failed' },
    { id: 4, name: 'UI/UX Design', code: 'DES101', credits: 2, gradeStatus: 'passed' },
    { id: 5, name: 'Cloud Deployments', code: 'CLD401', credits: 4, gradeStatus: 'pending' },
  ];

  constructor(private http: HttpClient) {}

  // HTTP Methods — used by NgRx Effects (Hands-On 8)
  getCoursesHttp(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      map(courses => courses),
      catchError(() => of(this.courses)) // Fallback to in-memory if server is down
    );
  }

  addCourseHttp(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourseHttp(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course);
  }

  deleteCourseHttp(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Synchronous Methods — used by non-NgRx components (Hands-On 6)
  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}
