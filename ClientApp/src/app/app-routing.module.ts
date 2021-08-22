import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { TicketsFollowUpComponent } from './components/tickets/tickets-follow-up/tickets-follow-up.component';
import { TicketsListComponent } from './components/tickets/tickets-list/tickets-list.component';
import { TicketsNewComponent } from './components/tickets/tickets-new/tickets-new.component';
import { TicketsViewerComponent } from './components/tickets/tickets-viewer/tickets-viewer.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', runGuardsAndResolvers: 'always', canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'tickets/followup', component: TicketsFollowUpComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: 'tickets/details/:ticketID', component: TicketsViewerComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: 'tickets/new', component: TicketsNewComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: 'tickets', component: TicketsListComponent, canActivate: [AuthGuardService]  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
