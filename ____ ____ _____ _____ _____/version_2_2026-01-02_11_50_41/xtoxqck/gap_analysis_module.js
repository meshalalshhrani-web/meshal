/**
 * وحدة حلول الفجوات والتحليل المنطقي (Logical Analysis)
 * تهدف لمعالجة فجوة الـ 0% واقتراح إجراءات تصحيحية
 */

export function getLogicalGapActions(filteredOrders) {
    const zeroCompletionCount = filteredOrders.filter(o => o.completion === 0).length;
    const totalCount = filteredOrders.length;
    const zeroRatio = totalCount > 0 ? (zeroCompletionCount / totalCount) : 0;

    const actions = [];


    if (zeroRatio > 0.5) {
        actions.push({
            type: "diagnostic",
            title: "فجوة التدوين الرقمي",
            desc: "تم رصد نسبة عالية من الإنجاز الصفري. يوصى بتفعيل 'التحديث بالصور الحية' لتجاوز خلل التدوين الميداني.",
            icon: "camera",
            urgency: "high"
        });
    }


    const contractorCounts = filteredOrders.reduce((acc, obj) => {
        acc[obj.contractor] = (acc[obj.contractor] || 0) + 1;
        return acc;
    }, {});

    for (const [name, count] of Object.entries(contractorCounts)) {
        if (count > 4) { // افتراض أن 4 هو حد السعة للتجربة
            actions.push({
                type: "capacity",
                title: `تكدس: ${name}`,
                desc: `المقاول يتجاوز سعة التشغيل الآمنة بـ (${count}) أوامر. خطر تأخير المسار الحرج مرتفع.`,
                icon: "alert-triangle",
                urgency: "critical"
            });
            break; // فقط أول تحذير
        }
    }


    const hotRegions = filteredOrders.filter(o => o.region === "الطائف" && o.neighborhood === "وادي جليل");
    if (hotRegions.length > 3) {
        actions.push({
            type: "geo",
            title: "بؤرة ضغط: وادي جليل",
            desc: "تمركز عالي للأوامر في منطقة جغرافية واحدة. يفضل انتداب فرقة مسح ميداني إضافية.",
            icon: "map",
            urgency: "medium"
        });
    }


    if (actions.length === 0) {
        actions.push({
            type: "info",
            title: "الوضع مستقر",
            desc: "البيانات المفلترة تظهر توزيعاً متوازناً. استمر في المراقبة الدورية.",
            icon: "check-circle",
            urgency: "low"
        });
    }

    return actions;
}

export function renderGapActions(actions) {
    const container = document.getElementById('gap-action-cards');
    if (!container) return;

    container.innerHTML = '';

    actions.forEach(action => {
        const borderClass = action.urgency === 'critical' ? 'border-red-500' : (action.urgency === 'high' ? 'border-[#FFD700]' : 'border-white/20');
        const bgClass = action.urgency === 'critical' ? 'bg-red-500/10' : 'bg-white/5';

        const card = document.createElement('div');
        card.className = `${bgClass} p-5 rounded-2xl border ${borderClass} transition-all hover:scale-[1.02]`;
        card.innerHTML = `
            <h4 class="font-bold text-[#FFD700] mb-2 flex items-center gap-2">
                <i data-lucide="${action.icon}" class="w-4 h-4"></i> ${action.title}
            </h4>
            <p class="text-sm text-slate-300 leading-relaxed">${action.desc}</p>
            <button class="mt-4 text-[10px] font-bold uppercase tracking-wider bg-[#FFD700] text-[#001f3f] px-3 py-1 rounded hover:bg-white transition">
                اتخاذ إجراء
            </button>
        `;
        container.appendChild(card);
    });
    
    lucide.createIcons();
}
