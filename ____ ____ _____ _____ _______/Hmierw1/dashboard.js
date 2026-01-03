import { initCharts } from './charts.js';
import { renderInsights } from './insights_engine.js';
import { dashboardData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {

    const totalWoElem = document.getElementById('total-wo-count');
    if (totalWoElem) {
        totalWoElem.textContent = dashboardData.summary.totalWorkOrders;
    }


    initCharts();
    renderInsights();


    const cards = document.querySelectorAll('.kpi-card, .chart-container');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });


    console.log("Dashboard Loaded: Logical Problem Analysis Integrated.");
    console.log(`Gap Identified: ${dashboardData.summary.totalWorkOrders} orders at 0% completion.`);
});
