import { DashboardData } from './data_provider.js';
import { getLogicalGapActions, renderGapActions } from './gap_analysis_module.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    let contractorChart = null;
    let predictionChart = null;


    const filterContractor = document.getElementById('filter-contractor');
    const filterRegion = document.getElementById('filter-region');
    const filterStatus = document.getElementById('filter-status');
    const resetBtn = document.getElementById('reset-filters');
    const tableBody = document.getElementById('orders-table');
    const totalOrdersEl = document.getElementById('total-orders-val');
    const highPressureEl = document.getElementById('high-pressure-val');
    const triggerAnalysisBtn = document.getElementById('trigger-analysis');



    function updateDashboard() {
        const cVal = filterContractor.value;
        const rVal = filterRegion.value;
        const sVal = filterStatus.value;


        const filtered = DashboardData.allOrders.filter(order => {
            const matchC = (cVal === 'all' || order.contractor === cVal);
            const matchR = (rVal === 'all' || order.region === rVal);
            const matchS = (sVal === 'all' || order.status === sVal);
            return matchC && matchR && matchS;
        });

        renderTable(filtered);
        renderCharts(filtered);
        updateKPIs(filtered);
        

        const actions = getLogicalGapActions(filtered);
        renderGapActions(actions);
    }

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(order => {
            const row = document.createElement('tr');
            const statusClass = order.status === 'مكتمل' ? 'bg-green-100 text-green-700' : (order.status === 'قيد التنفيذ' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700');
            
            row.innerHTML = `
                <td class="p-4 font-bold text-slate-700">#${order.id}</td>
                <td class="p-4 text-slate-600 font-medium">${order.contractor}</td>
                <td class="p-4">
                    <div class="flex flex-col">
                        <span class="text-xs font-bold">${order.region}</span>
                        <span class="text-[10px] text-slate-400">${order.neighborhood}</span>
                    </div>
                </td>
                <td class="p-4 text-xs text-slate-500">${order.engineer}</td>
                <td class="p-4 text-xs">${order.work}</td>
                <td class="p-4">
                    <span class="px-2 py-1 ${statusClass} text-[10px] rounded-full font-bold">
                        ${order.status}
                    </span>
                </td>
                <td class="p-4">
                    <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div class="bg-[#FFD700] h-full" style="width: ${order.completion}%"></div>
                    </div>
                    <span class="text-[9px] text-slate-400 mt-1 block">${order.completion}% إكمال</span>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function renderCharts(data) {

        const counts = data.reduce((acc, o) => {
            acc[o.contractor] = (acc[o.contractor] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(counts);
        const values = Object.values(counts);

        const ctxC = document.getElementById('contractorChart').getContext('2d');
        if (contractorChart) contractorChart.destroy();
        
        contractorChart = new Chart(ctxC, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'عدد الأوامر النشطة',
                    data: values,
                    backgroundColor: '#001f3f',
                    borderColor: '#FFD700',
                    borderWidth: 2,
                    borderRadius: 12
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });


        const ctxP = document.getElementById('predictionChart').getContext('2d');
        if (predictionChart) predictionChart.destroy();
        predictionChart = new Chart(ctxP, {
            type: 'line',
            data: {
                labels: DashboardData.predictionData.labels,
                datasets: [
                    {
                        label: 'المسار الفعلي الحالي',
                        data: DashboardData.predictionData.historical,
                        borderColor: '#001f3f',
                        backgroundColor: 'rgba(0,31,63,0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3
                    },
                    {
                        label: 'المسار التنبؤي (Target)',
                        data: DashboardData.predictionData.forecast,
                        borderColor: '#FFD700',
                        borderDash: [5, 5],
                        fill: false,
                        tension: 0.4,
                        borderWidth: 3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } }
                },
                scales: {
                    y: { max: 100, ticks: { callback: v => v + '%' } }
                }
            }
        });
    }

    function updateKPIs(data) {
        totalOrdersEl.innerText = data.length;
        const pressureCount = data.filter(o => o.contractor === 'فيصل السليماني').length;
        highPressureEl.innerText = pressureCount;
        

        const recText = document.getElementById('rec-text');
        const recs = DashboardData.recommendations;
        let idx = 0;
        
        if (!window.recInterval) {
            window.recInterval = setInterval(() => {
                recText.classList.add('opacity-0');
                setTimeout(() => {
                    recText.innerText = recs[idx];
                    recText.classList.remove('opacity-0');
                    idx = (idx + 1) % recs.length;
                }, 500);
            }, 5000);
        }
    }


    [filterContractor, filterRegion, filterStatus].forEach(el => {
        el.addEventListener('change', updateDashboard);
    });

    resetBtn.addEventListener('click', () => {
        filterContractor.value = 'all';
        filterRegion.value = 'all';
        filterStatus.value = 'all';
        updateDashboard();
    });

    triggerAnalysisBtn.addEventListener('click', () => {
        const btn = triggerAnalysisBtn;
        btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> جاري التحليل...';
        lucide.createIcons();
        setTimeout(() => {
            updateDashboard();
            btn.innerHTML = '<i data-lucide="cog" class="w-5 h-5"></i> تحديث التحليل المنطقي';
            lucide.createIcons();
        }, 800);
    });


    updateDashboard();
});
