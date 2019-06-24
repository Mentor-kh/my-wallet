import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ParamInterceptor } from './interceptors/api.interceptor';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ChartsModule } from 'ng2-charts';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { VisualComponent } from './components/visual/visual.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FilterComponent } from './components/filter/filter.component';

import { metaReducers, reducers } from './reducers';
import { DataEffects } from './effects/data.effects';
import { UsersService } from './services/users.service';
import { DataService } from './services/data.service';
import { CategoryService } from './services/category.service';
import { NotificationService } from './services/notification.service';

import { DateFilterPipe } from './pipes/date-filter.pipe';

import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { FilterService } from './services/filter.service';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    VisualComponent,
    ProfileComponent,
    DataTableComponent,
    TransactionComponent,
    DialogComponent,
    FilterComponent,
    DateFilterPipe,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
  entryComponents: [DialogComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatFormFieldModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    ChartsModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCardModule,
    MatSnackBarModule,
    MatTabsModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([DataEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    CategoryService,
    DataService,
    FilterService,
    UsersService,
    AngularFirestore,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    },
    NotificationService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
