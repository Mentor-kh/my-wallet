import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LoadCategories, LoadData, LogIn } from './actions/data.actions';
import { IScope } from './reducers';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  public $user: Subscription;
  public isAuthenticated: boolean = false;
  public $isAuthenticated: Subscription;
  public base: string = 'Your wallet';
  public name: string;

  public constructor(
    private store: Store<IScope>,
    private authService: AuthService
  ) {
    this.$isAuthenticated = this.store.select('scope', 'isAuthenticated').subscribe((value: boolean) => {
      if (JSON.parse(localStorage.getItem('user')) !== null) {
        this.store.dispatch(new LogIn(true));
        this.$user = this.store.select('scope', 'profile').subscribe((user: any) => {
          this.name = user.name;
        });

        this.store.dispatch(new LoadCategories());
        this.store.dispatch(new LoadData());
      } else {
        this.name = this.base;
      }
    });
  }

  public ngOnDestroy(): void {
    this.$isAuthenticated.unsubscribe();
    this.$user.unsubscribe();
  }
}
