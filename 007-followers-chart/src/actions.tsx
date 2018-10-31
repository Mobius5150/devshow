import { BehaviorSubject } from 'rxjs';
import { Chart } from 'chart.js';

interface IFollowerState {
    timestamp: Date,
    count: number,
}

let chart: Chart;

const followerRecord: BehaviorSubject<IFollowerState[]> = new BehaviorSubject([]);

followerRecord
    .subscribe((points: IFollowerState[]) => {
        points.forEach(point => {
            // need to format the timestamp smaller
            chart.data.labels.push(point.timestamp.toLocaleDateString());
            chart.data.datasets.forEach((dataset: any) => {
                dataset.data.push(point.count);
            });
            chart.update();
        });
    });

export function setFollowerCount(count) {
    const timestamp = new Date();
    followerRecord.next([ ...followerRecord.getValue(), { timestamp, count}]);
    document.querySelector('.follower-count').textContent = `Follower count is now ${count}`;
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