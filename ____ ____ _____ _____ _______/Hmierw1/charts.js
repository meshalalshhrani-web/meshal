import { dashboardData } from './data.js';

export function initCharts() {

    const geoCtx = document.getElementById('geoDistChart').getContext('2d');
    new Chart(geoCtx, {
        type: 'doughnut',
        data: {
            labels: dashboardData.geographicDistribution.labels,
            datasets: [{
                data: dashboardData.geographicDistribution.data,
                backgroundColor: dashboardData.geographicDistribution.colors,
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            cutout: '75%',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });


    const contractorCtx = document.getElementById('contractorWorkloadChart').getContext('2d');
    const contractorLabels = dashboardData.contractors.map(c => c.name);
    const contractorCounts = dashboardData.contractors.map(c => c.count);

    new Chart(contractorCtx, {
        type: 'bar',
        data: {
            labels: contractorLabels,
            datasets: [{
                label: 'أوامر العمل',
                data: contractorCounts,
                backgroundColor: '#3b82f6',
                borderRadius: 8,
                barThickness: 32
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Vazirmatn', size: 10 } }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { family: 'Vazirmatn', size: 10 } }
                }
            }
        }
    });
}
