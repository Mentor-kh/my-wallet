import { Component } from '@angular/core';

export interface ICategories {
  category: string;
  positive: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
}
