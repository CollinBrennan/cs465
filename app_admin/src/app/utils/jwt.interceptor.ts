import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
    console.log('JwtInterceptor initialized');
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var isAuthAPI: boolean;

    if (request.url.startsWith('login') || request.url.startsWith('register')) {
      isAuthAPI = true;
    } else {
      isAuthAPI = false;
    }
    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      let token = this.authenticationService.getToken();

      console.log('Intercepting:', request.url);

      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}

export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true,
};
