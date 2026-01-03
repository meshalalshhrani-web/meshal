import { dashboardData } from './data.js';

export function renderInsights() {
    const container = document.getElementById('insights-list');
    if (!container) return;

    dashboardData.insights.forEach(insight => {
        const item = document.createElement('div');
        item.className = 'insight-item';
        
        const borderColors = {
            critical: 'border-red-500',
            warning: 'border-orange-500',
            info: 'border-blue-500'
        };

        const icons = {
            critical: 'alert-triangle',
            warning: 'shield-alert',
            info: 'info'
        };

        item.classList.add(borderColors[insight.type]);

        item.innerHTML = `
            <div class="flex gap-4">
                <div class="text-${insight.type === 'critical' ? 'red' : insight.type === 'warning' ? 'orange' : 'blue'}-500">
                    <i data-lucide="${icons[insight.type]}" class="w-6 h-6"></i>
                </div>
                <div>
                    <h5 class="font-bold text-slate-800 text-sm mb-1">${insight.title}</h5>
                    <p class="text-xs text-slate-500 leading-relaxed">${insight.description}</p>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
    

    lucide.createIcons();
}
