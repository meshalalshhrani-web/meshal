export const dashboardData = {
    summary: {
        totalWorkOrders: 145,
        activeContractors: 4,
        completionRate: 0,
        pendingTasks: 145
    },
    contractors: [
        { name: 'فيصل السليماني', count: 61, percentage: 42, engineer: 'م. فهد الغامدي' },
        { name: 'الجدراوي', count: 48, percentage: 33, engineer: 'م. بسام الهميم' },
        { name: 'نهضة الديار', count: 32, percentage: 22, engineer: 'م. خالد الدعاس' },
        { name: 'فاب', count: 4, percentage: 3, engineer: 'م. عبدالله المالكي' }
    ],
    geographicDistribution: {
        labels: ['الطائف (وادي جليل، ريحة، العرفا)', 'المويه (الإسكان)'],
        data: [140, 5],
        colors: ['#3b82f6', '#c7d2fe']
    },
    insights: [
        {
            title: "فجوة البيانات الرقمية",
            description: "تظهر البيانات نسبة إنجاز 0% لجميع المقاولين رغم وجود أوصاف عمل فنية (حفر، تمديد)، مما يشير إلى تأخر في الإدخال الرقمي وليس توقف العمل الميداني.",
            type: "critical"
        },
        {
            title: "تركيز المخاطر التشغيلية",
            description: "يستحوذ مقاول واحد (فيصل السليماني) على 42% من إجمالي الأوامر، مما يرفع احتمالية التأخير في حال تعطل سلاسل الإمداد لديه.",
            type: "warning"
        },
        {
            title: "كثافة المواقع الساخنة",
            description: "يتركز العمل في أحياء 'وادي جليل' و 'ريحة' بشكل مكثف، مما يتطلب تنسيقاً عمرانياً خاصاً لتجنب الازدحام.",
            type: "info"
        }
    ]
};
