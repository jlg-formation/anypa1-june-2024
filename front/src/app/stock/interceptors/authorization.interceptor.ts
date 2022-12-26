import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const ANGULAR_SPECIFIC_TOKEN = 'Angular123!';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // The documentation says that the request MUST BE an immutable object.
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${ANGULAR_SPECIFIC_TOKEN}`,
      },
    });
    return next.handle(req);
  }
}
