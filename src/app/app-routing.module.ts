import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { AccountComponent } from "./account/account.component";
import { AuthGuard } from "./auth.guard";
 
const appRoutes: Routes= [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'account', component: AccountComponent, canActivate:[AuthGuard]},
    {path: '', component: HomeComponent},
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}