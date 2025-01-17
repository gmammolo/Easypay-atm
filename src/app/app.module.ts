import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginPageModule } from './features/login-page/login-page.module';
import { PaymentsModule } from './features/payments/payments.module';
import { TemplateModule } from './features/template/template.module';
import { SharedModule } from './shared';
import { RechargeModule } from './features/recharge/recharge.module';
import { HomeModule } from './features/home/home.module';
import { MovementsModule } from './features/movements/movements.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    TemplateModule,
    LoginPageModule,
    HomeModule,
    PaymentsModule,
    RechargeModule,
    MovementsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
