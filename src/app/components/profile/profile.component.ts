import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IScope } from 'src/app/reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {
  public userData: any;
  private $loadingSubscribe: Subscription;
  private $profile: Subscription;

  public constructor(
    private store: Store<IScope>
  ) {
    this.$loadingSubscribe = this.store.select('scope', 'isLoading').subscribe((data: boolean) => data);
    this.$profile = this.store.select('scope', 'profile').subscribe((data: boolean) => {
      if (!data) {
        this.userData = {
          name: '',
          amount: null
        };
      } else {
        this.userData = data;
      }
    });
  }

  public ngOnDestroy(): void {
    this.$loadingSubscribe.unsubscribe();
    this.$profile.unsubscribe();
  }
}
