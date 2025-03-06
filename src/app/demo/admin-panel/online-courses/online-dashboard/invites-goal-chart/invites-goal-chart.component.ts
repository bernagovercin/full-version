// angular import
import { Component, OnInit, effect, inject } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';

// apexChart
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-invites-goal-chart',
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './invites-goal-chart.component.html',
  styleUrl: './invites-goal-chart.component.scss'
})
export class InvitesGoalChartComponent implements OnInit {
  private themeService = inject(ThemeService);

  // public props
  chartOptions!: ApexOptions;

  // constructor
  constructor() {
    effect(() => {
      this.updateThemeColor(this.themeService.theme());
      this.rerenderChartOnContainerResize(this.themeService.isBoxLayout());
    });
  }

  // life cycle hook
  ngOnInit(): void {
    this.chartOptions = {
      series: [76],
      chart: {
        type: 'radialBar',
        height: '345px',
        offsetY: -20,
        sparkline: {
          enabled: true
        }
      },
      colors: ['#2196f3'],
      plotOptions: {
        radialBar: {
          startAngle: -95,
          endAngle: 95,
          hollow: {
            margin: 15,
            size: '50%'
          },
          track: {
            background: '#eaeaea',
            strokeWidth: '97%',
            margin: 20
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: 0,
              fontSize: '20px'
            }
          }
        }
      },
      grid: {
        padding: {
          top: 10
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
  }

  // private methods
  private updateThemeColor(theme: string) {
    switch (theme) {
      case 'preset-1':
      default:
        this.chartOptions.colors = ['#673ab7'];
        break;
      case 'preset-2':
        this.chartOptions.colors = ['#009688'];
        break;
      case 'preset-3':
        this.chartOptions.colors = ['#ec407a'];
        break;
      case 'preset-4':
        this.chartOptions.colors = ['#c77e23'];
        break;
      case 'preset-5':
        this.chartOptions.colors = ['#3fb0ac'];
        break;
      case 'preset-6':
        this.chartOptions.colors = ['#2ca58d'];
        break;
      case 'preset-7':
        this.chartOptions.colors = ['#3f51b5'];
        break;
    }
  }

  private rerenderChartOnContainerResize(isBox: boolean) {
    const chart = { ...this.chartOptions.chart };
    chart.redrawOnWindowResize = !isBox;
    this.chartOptions = { ...this.chartOptions, chart } as ApexOptions;
  }
}
