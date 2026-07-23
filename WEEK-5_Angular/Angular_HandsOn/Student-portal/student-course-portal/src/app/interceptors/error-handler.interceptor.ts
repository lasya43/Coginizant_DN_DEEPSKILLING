import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      console.error('[HTTP Error]', error.status, error.message);
      const message = error.status === 404
        ? 'Resource not found.'
        : error.status === 500
        ? 'Server error. Please try again later.'
        : 'An unexpected error occurred.';
      alert(message);
      return throwError(() => error);
    })
  );
};
