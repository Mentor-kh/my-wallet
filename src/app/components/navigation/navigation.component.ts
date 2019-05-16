import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IScope } from 'src/app/reducers';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy {
  public isAuthenticated: boolean;
  public $isAuthenticated: Subscription;

  public constructor(
    private store: Store<IScope>,
    private authService: AuthService
  ) {
    this.$isAuthenticated = this.store.select('scope', 'isAuthenticated')
      .subscribe((value: boolean) => this.isAuthenticated = value);
  }

  public ngOnDestroy(): void {
    this.$isAuthenticated.unsubscribe();
  }

  public logout(): void {
    this.authService.logout();
  }
}
