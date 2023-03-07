import { importProvidersFrom } from "@angular/core";
import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { provideHttpClient } from '@angular/common/http'
import { HomeComponent } from "./app/components/home/home.component";
import { LoginComponent } from "./app/components/login/login.component";
import { RegisterComponent } from "./app/components/register/register.component";
import { AuthGuard } from "./app/guards/auth.guard";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot([
        {
          path: "",
          component: HomeComponent,
          canActivate: [AuthGuard]
        },
        {
          path: "login",
          component: LoginComponent
        },
        {
          path: "register",
          component: RegisterComponent
        }
      ])
    )
  ]
})