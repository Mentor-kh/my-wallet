import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Store } from '@ngrx/store';
import { IScope } from '../reducers';
import { LogIn } from '../actions/data.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;
  public constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private store: Store<IScope>
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  public checkLogin(login: string) {
    // simulate http.get()
    return of({ isLoginAvailable: login !== 'test' }).pipe(delay(400));
  }

  public async login(email: string, password: string) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['dashboard']);
    this.store.dispatch(new LogIn(true));
  }

  public async register(email: string, password: string) {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.router.navigate(['admin']);
    // this.sendEmailVerification();
  }

  public async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['admin/verify-email']);
  }

  public async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  public async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['admin']);
    this.store.dispatch(new LogIn(false));
  }

  public isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  public async loginWithGoogle() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigate(['admin']);
  }
}
