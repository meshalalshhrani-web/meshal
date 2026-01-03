import { DashboardData } from './data_provider.js';
import { processGapAnalysis, getSmartRecommendations } from './gap_analysis_module.js';

document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();


    const tableBody = document.getElementById('orders-table');
    DashboardData.recentOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-4 font-bold text-slate-700">${order.id}</td>
            <td class="p-4">${order.contractor}</td>
            <td class="p-4">${order.region}</td>
            <td class="p-4 text-xs">${order.work}</td>
            <td class="p-4">
                <span class="px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] rounded-full font-bold">
                    ${order.status}
                </span>
            </td>
            <td class="p-4">
                <span class="flex items-center gap-1 text-slate-400 italic text-[10px]">
                    <i data-lucide="map-pin" class="w-3 h-3"></i> بانتظار GPS
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });
    lucide.createIcons(); // Re-run for dynamic icons


    const ctxContractor = document.getElementById('contractorChart').getContext('2d');
    new Chart(ctxContractor, {
        type: 'bar',
        data: {
            labels: DashboardData.contractors.map(c => c.name),
            datasets: [{
                label: 'عدد أوامر العمل',
                data: DashboardData.contractors.map(c => c.orders),
                backgroundColor: '#001f3f',
                borderColor: '#FFD700',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });


    const ctxGeo = document.getElementById('geoChart').getContext('2d');
    new Chart(ctxGeo, {
        type: 'doughnut',
        data: {
            labels: Object.keys(DashboardData.regions),
            datasets: [{
                data: Object.values(DashboardData.regions),
                backgroundColor: ['#001f3f', '#FFD700'],
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });


    const recText = document.getElementById('rec-text');
    const recs = getSmartRecommendations();
    let index = 0;
    
    function rotateRecs() {
        recText.style.opacity = 0;
        setTimeout(() => {
            recText.innerText = recs[index];
            recText.style.opacity = 1;
            index = (index + 1) % recs.length;
        }, 500);
    }
    
    rotateRecs();
    setInterval(rotateRecs, 5000);


    processGapAnalysis();
});
