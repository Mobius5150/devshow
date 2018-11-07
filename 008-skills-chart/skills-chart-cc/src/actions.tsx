import { BehaviorSubject } from 'rxjs';
import { Chart } from 'chart.js';

import { SkillsStateHistory } from '../../game-client/src/live_loader';
let chart: Chart;

const skillsRecord: BehaviorSubject<SkillsStateHistory> = new BehaviorSubject({});

skillsRecord
    .subscribe((points: SkillsStateHistory) => {
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
                dataset.data.push({x: points[point].name, y: points[point].count});
            });
            chart.update();
        });
    });

export function updateHistory(history: SkillsStateHistory) {
    skillsRecord.next(history);
}

export function initChart() {
    var ctx = (document.getElementById('follower-chart') as HTMLCanvasElement).getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "Following Chart",
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