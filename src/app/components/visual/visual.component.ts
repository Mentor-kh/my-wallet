import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IState } from 'src/app/reducers/data.reducer';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Store } from '@ngrx/store';
import { ITransaction } from '../data-table/data-table.component';
import { ICategories } from '../dashboard/dashboard.component';
import { FilterData, LoadData } from 'src/app/actions/data.actions';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss']
})
export class VisualComponent implements OnInit, OnDestroy {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public transactions: ITransaction[];
  public categories: ICategories[];
  public filterCategories: any;
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;
  public barChartPlugins: [any] = [pluginDataLabels];
  public barIncome: number[] = [];
  public barSpent: number[] = [];


  public barChartData: ChartDataSets[] = [
    {
      data: this.barSpent,
      label: 'Spent',
      backgroundColor: 'rgba(255, 0, 0, .3)'
    },
    {
      data: this.barIncome,
      label: 'Income',
      backgroundColor: 'rgba(11, 175, 46, .6)'
    }
  ];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend: boolean = true;
  public pieChartPlugins: any[] = [pluginDataLabels];
  public pieChartColors: any[] = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,255,255,0.3)'],
      hoverBackgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,255,255,0.3)'],
    },
  ];
  public $filterData: Subscription;
  public $categories: Subscription;
  public $filters: Subscription;
  public categoriesArray: any[] = [];
  public constructor(private store: Store<IState>) {
    this.$categories = this.store.select('scope', 'categories').subscribe(
      (categories: ICategories[]) => {
        return this.categories = categories;
      }
    );

    this.$filters = this.store.select('scope', 'filters').subscribe(
      (filters: any) => {
        if (filters) {
          return this.filterCategories = filters[0].categories;
        }
      });
    this.$filterData = this.store.select('scope', 'filterData').subscribe((data: ITransaction[]) => {
      this.transactions = data;
      let newDate: string = '';
      let totalIncome: number;
      let totalSpent: number;

      this.categories.map((value: ICategories, iCategory: number) => {
        const colors: string =
          `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, ${Math.random()})`;

        this.pieChartLabels.push(value.category);
        this.categoriesArray[iCategory] = 0;
        this.pieChartColors[0].backgroundColor.push(colors);
        this.pieChartColors[0].hoverBackgroundColor.push(colors);

        this.transactions.map((item: ITransaction, index: number) => {
          if (value.category === item.category) {
            if (item.positive) {
              this.categoriesArray[iCategory] += item.cost;
            } else {
              this.categoriesArray[iCategory] -= item.cost;
            }
          }
        });
      });

      this.transactions.map((item: ITransaction, index: number) => {
        const date: Date = new Date(item.date);
        const dateText: string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        if (newDate !== dateText) {
          newDate = dateText;
          this.barChartLabels.push(newDate);
          if (totalIncome !== undefined && totalSpent !== undefined) {
            this.barIncome.push(totalIncome);
            this.barSpent.push(totalSpent);
          }
          totalIncome = 0;
          totalSpent = 0;
        }
        if (item.positive) {
          totalIncome += item.cost;
        } else {
          totalSpent += Math.abs(item.cost);
        }
        if (index === data.length - 1) {
          this.barIncome.push(totalIncome);
          this.barSpent.push(totalSpent);
        }
      });
    });
  }
  public ngOnInit(): void {
    this.pieChartData = this.categoriesArray
      .reduce((acc: number[], value: number): number[] => [...acc, Math.abs(value)], []);
    for (let i: number = 0; i < this.pieChartData.length; i++) {
      this.pieChartData.map((value: number, index: number) => {
        if (value === 0) {
          this.pieChartLabels.splice(index, 1);
          this.pieChartData.splice(index, 1);
        }
      });
    }
  }

  public ngOnDestroy(): void {
    this.$filterData.unsubscribe();
    this.$filters.unsubscribe();
    this.$categories.unsubscribe();
  }

  public changeLegendPosition(): void {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }
}

