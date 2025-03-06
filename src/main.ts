import { enableProdMode, importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from './environments/environment';

// project import
import { AppRoutingModule } from './app/app-routing.module';
import { SharedModule } from './app/theme/shared/shared.module';
import { AppComponent } from './app/app.component';
import { BasicAuthInterceptor } from 'src/app/theme/shared/_helpers/basic-auth.interceptor';
import { ErrorInterceptor } from 'src/app/theme/shared/_helpers/error.interceptor';

// bootstrap import
import { NgbDropdownModule, NgbNavModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

// third party
import { ToastrModule } from 'ngx-toastr';
import { QuillModule } from 'ngx-quill';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      SharedModule,
      NgbDropdownModule,
      NgbNavModule,
      NgbTooltipModule,
      NgbModule,
      ToastrModule.forRoot(),
      QuillModule.forRoot(),
      SweetAlert2Module.forRoot()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    [provideHttpClient(withInterceptorsFromDi())],
    provideAnimations()
  ]
}).catch((err) => console.error(err));
