// angular project
import { Component, OnInit, effect, inject } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';

// third party
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-student-states-chart',
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './student-states-chart.component.html',
  styleUrl: './student-states-chart.component.scss'
})
export class StudentStatesChartComponent implements OnInit {
  private themeService = inject(ThemeService);

  // public props
  chartOptions!: ApexOptions;

  //constructor
  constructor() {
    effect(() => {
      this.updateThemeColor(this.themeService.theme());
      this.rerenderChartOnContainerResize(this.themeService.isBoxLayout());
    });
  }

  // life cycle hook
  ngOnInit() {
    this.chartOptions = {
      chart: {
        height: 275,
        type: 'donut'
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%'
          }
        }
      },
      labels: ['Total Signups', 'Active Student'],
      series: [76.7, 30],
      legend: {
        show: true,
        position: 'bottom'
      },
      colors: ['#2196f3', '#FFC107']
    };
  }

  // private methods
  private updateThemeColor(theme: string) {
    switch (theme) {
      case 'preset-1':
      default:
        this.chartOptions.colors = ['#2196f3', '#673ab7'];
        break;
      case 'preset-2':
        this.chartOptions.colors = ['#607d8b', '#009688'];
        break;
      case 'preset-3':
        this.chartOptions.colors = ['#203461', '#ec407a'];
        break;
      case 'preset-4':
        this.chartOptions.colors = ['#16595a', '#c77e23'];
        break;
      case 'preset-5':
        this.chartOptions.colors = ['#173e43', '#3fb0ac'];
        break;
      case 'preset-6':
        this.chartOptions.colors = ['#0a2342', '#2ca58d'];
        break;
      case 'preset-7':
        this.chartOptions.colors = ['#3f51b5', '#3f51b5'];
        break;
    }
  }

  private rerenderChartOnContainerResize(isBox: boolean) {
    const chart = { ...this.chartOptions.chart };
    chart.redrawOnWindowResize = !isBox;
    this.chartOptions = { ...this.chartOptions, chart } as ApexOptions;
  }
}
