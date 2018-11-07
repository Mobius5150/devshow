import { BehaviorSubject } from 'rxjs';
import { Chart } from 'chart.js';
import { ISkillSummary } from './models';

let chart: Chart;

const skillSummary: BehaviorSubject<ISkillSummary> = new BehaviorSubject({});

skillSummary
    .subscribe((points: ISkillSummary[]) => {
        // reset our data chart
        if (!chart || !chart.data) {
            return;
        }

        chart.data.labels = [];
        chart.data.datasets.forEach((dataset: any) => {
            dataset.data = [];
        });


        Object.keys(points).forEach(point => {
            // need to format the timestamp smaller
            chart.data.labels.push(points[point].name);
            chart.data.datasets.forEach((dataset: any) => {
                dataset.data.push({ x: points[point].name, y: points[point].count });
            });
            chart.update();
        });
    });

export function updateSummaries(summary: ISkillSummary[]) {
    skillSummary.next(summary);
}

export function initChart() {
    var ctx = (document.getElementById('skills-chart') as HTMLCanvasElement).getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: "Skills Chart",
                data: [],
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}