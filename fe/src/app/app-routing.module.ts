import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailListComponent } from './email-list/email-list.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inbox', component: EmailListComponent },
  { path: 'email/:_id', component: EmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
