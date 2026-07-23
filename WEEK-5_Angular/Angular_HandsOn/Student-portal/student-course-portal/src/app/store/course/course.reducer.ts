import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { loadCoursesSuccess, loadCoursesFailure, addCourseSuccess, deleteCourseSuccess } from './course.actions';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null
};

export const courseReducer = createReducer(
  initialState,
  on(loadCoursesSuccess, (state, { courses }) => ({ ...state, courses, loading: false, error: null })),
  on(loadCoursesFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(addCourseSuccess, (state, { course }) => ({ ...state, courses: [...state.courses, course] })),
  on(deleteCourseSuccess, (state, { id }) => ({ ...state, courses: state.courses.filter(c => c.id !== id) }))
);
