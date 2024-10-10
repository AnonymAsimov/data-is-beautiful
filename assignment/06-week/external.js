// 건강 데이터 파싱
const rawData = `
Active Energy
10.4 290
10.5 297
10.6 268
10.7 350
10.8 284
10.9 318

Walking + Running Distance
10.4 3.4
10.5 3.9
10.6 3.5
10.7 4.3
10.8 3.2
10.9 4.2

Steps
10.4 8446
10.5 9046
10.6 8848
10.7 9771
10.8 8185
10.9 9633

Resting Energy
10.4 1818
10.5 1827
10.6 1819
10.7 1824
10.8 1818
10.9 1825

Flights Climbed
10.4 4
10.5 2
10.6 1
10.7 5
10.8 10
10.9 6
`;

// 데이터를 파싱하여 사용 가능한 형식으로 변환
function parseData(raw) {
    const lines = raw.trim().split('\n');
    const data = [];
    let currentMetric = '';

    lines.forEach(line => {
        if (isNaN(line.charAt(0))) {
            currentMetric = line.trim();
        } else {
            const [date, value] = line.trim().split(' ').map(Number);
            data.push({ date: `2024-10-${String(date).split('.')[1]}`, metric: currentMetric, value });
        }
    });

    return data;
}

const data = parseData(rawData);

// 그래프 생성
const chart = Plot.plot({
    width: 1152,
    height: 760,
    marginTop: 30,
    x: {
        type: 'time',
        label: '날짜',
        tickFormat: d3.timeFormat('%m.%d'),
        grid: true,
    },
    y: {
        label: '값',
        grid: true,
    },
    color: {
        legend: true,
        scheme: 'category10',
    },
    style: {
        background: '#0e0e10',
        color: '#ffffff',
        overflow: 'visible',
    },
    marks: [
        Plot.lineY(data, {
            x: d => new Date(d.date),
            y: 'value',
            stroke: 'metric',
            strokeWidth: 2,
            mixBlendMode: 'lighten',
            curve: 'catmull-rom',
        }),
    ],
});

document.getElementById('chart').appendChild(chart);
