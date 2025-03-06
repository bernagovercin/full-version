// angular import
import { Component, OnInit, effect, inject } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';

// apexChart
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-activity-line-chart',
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './activity-line-chart.component.html',
  styleUrl: './activity-line-chart.component.scss'
})
export class ActivityLineChartComponent implements OnInit {
  private themeService = inject(ThemeService);

  // public props
  chartOptions!: ApexOptions;
  selectType: string = 'today';
  themeColors = ['#00c853', '#1677ff'];

  // constructor
  constructor() {
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkTheme());
      this.updateThemeColor(this.themeService.theme());
      this.rerenderChartOnContainerResize(this.themeService.isBoxLayout());
    });
  }

  // life cycle hook
  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'line',
        height: 300,
        toolbar: {
          show: false
        }
      },
      colors: this.themeColors,
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        position: 'top'
      },
      markers: {
        size: 1,
        colors: ['#fff', '#fff', '#fff'],
        strokeColors: this.themeColors,
        strokeWidth: 1,
        shape: 'circle',
        hover: {
          size: 4
        }
      },
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      grid: {
        strokeDashArray: 4,
        borderColor: '#f5f5f5'
      },
      series: [
        {
          name: 'Free Course',
          data: [20, 90, 65, 85, 20, 80, 30]
        },
        {
          name: 'Subscription',
          data: [70, 30, 40, 15, 60, 40, 95]
        }
      ],
      xaxis: {
        labels: {
          hideOverlappingLabels: true
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      }
    };
  }

  // public methods
  onOptionSelected() {
    switch (this.selectType) {
      case 'today':
        this.chartOptions.series = [
          {
            name: 'Free Course',
            data: [20, 90, 65, 85, 20, 80, 30]
          },
          {
            name: 'Subscription',
            data: [70, 30, 40, 15, 60, 40, 95]
          }
        ];
        break;
      case 'week':
        this.chartOptions.series = [
          {
            name: 'Free Course',
            data: [30, 50, 65, 80, 35, 55, 20]
          },
          {
            name: 'Subscription',
            data: [95, 80, 55, 10, 25, 50, 60]
          }
        ];
        break;
      case 'month':
        this.chartOptions.series = [
          {
            name: 'Free Course',
            data: [55, 75, 25, 40, 65, 95, 20]
          },
          {
            name: 'Subscription',
            data: [10, 65, 85, 45, 20, 10, 35]
          }
        ];
        break;
    }
  }

  // private methods
  private isDarkTheme(isDark: boolean) {
    const tooltipTheme = isDark === true ? 'dark' : 'light';
    const tooltip = { theme: tooltipTheme };
    const grid = { ...this.chartOptions.grid };
    grid.borderColor = isDark === true ? '#fafafa0d' : '#f5f5f5';
    this.chartOptions = { ...this.chartOptions, tooltip, grid };
  }

  private updateThemeColor(theme: string) {
    switch (theme) {
      case 'preset-1':
      default:
        this.themeColors = ['#00c853', '#673ab7'];
        break;
      case 'preset-2':
        this.themeColors = ['#00c853', '#009688'];
        break;
      case 'preset-3':
        this.themeColors = ['#00c853', '#ec407a'];
        break;
      case 'preset-4':
        this.themeColors = ['#00c853', '#c77e23'];
        break;
      case 'preset-5':
        this.themeColors = ['#00c853', '#3fb0ac'];
        break;
      case 'preset-6':
        this.themeColors = ['#00c853', '#2ca58d'];
        break;
      case 'preset-7':
        this.themeColors = ['#00c853', '#3f51b5'];
        break;
    }
    this.chartOptions = { ...this.chartOptions, colors: this.themeColors };
  }

  private rerenderChartOnContainerResize(isBox: boolean) {
    const chart = { ...this.chartOptions.chart };
    chart.redrawOnWindowResize = !isBox;
    this.chartOptions = { ...this.chartOptions, chart } as ApexOptions;
  }
}
