import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';

import { SharedModule } from '../../shared';
import { LoginPageComponent } from './login-page.component';
import { LoginService } from './services/login.service';
import { AuthStore } from './store/auth.store';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, SharedModule, CoreModule],
  exports: [LoginPageComponent],
  providers: [LoginService, AuthStore]
})
export class LoginPageModule {}
