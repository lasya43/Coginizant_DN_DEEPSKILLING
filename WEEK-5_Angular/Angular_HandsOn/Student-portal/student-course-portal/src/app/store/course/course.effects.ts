import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, retry, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourseService } from '../../services/course';
import {
  loadCourses,
  loadCoursesSuccess,
  loadCoursesFailure,
  addCourse,
  addCourseSuccess,
  deleteCourse,
  deleteCourseSuccess
} from './course.actions';

@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      mergeMap(() =>
        this.courseService.getCoursesHttp().pipe(
          retry(1),
          tap(courses => console.log('[Effect] Loaded courses:', courses)),
          map(courses => loadCoursesSuccess({ courses })),
          catchError(err => of(loadCoursesFailure({ error: err.message })))
        )
      )
    )
  );

  addCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCourse),
      mergeMap(action =>
        this.courseService.addCourseHttp(action.course).pipe(
          map(course => addCourseSuccess({ course })),
          catchError(err => of(loadCoursesFailure({ error: err.message })))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCourse),
      mergeMap(action =>
        this.courseService.deleteCourseHttp(action.id).pipe(
          map(() => deleteCourseSuccess({ id: action.id })),
          catchError(err => of(loadCoursesFailure({ error: err.message })))
        )
      )
    )
  );
}
