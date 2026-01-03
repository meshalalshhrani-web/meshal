/**
 * معالج البيانات المستخرجة من التقرير
 */
export const DashboardData = {
    summary: {
        totalOrders: 145,
        completionRate: 0, // كما ورد في التحليل المنطقي
        contractorsCount: 4,
        delayedTasks: 61, // حصة فيصل السليماني كمثال للتكدس
    },
    contractors: [
        { name: "فيصل السليماني", orders: 61, rate: 0, quality: "تكدس عالي" },
        { name: "الجدراوي", orders: 48, rate: 0, quality: "متوسط" },
        { name: "نهضة الديار", orders: 32, rate: 0, quality: "تخصص فني" },
        { name: "فاب", orders: 4, rate: 0, quality: "مناطق نائية" }
    ],
    regions: {
        "الطائف": 140,
        "المويه": 5
    },
    recommendations: [
        "تفعيل التحديث الميداني اللحظي عبر تطبيق موبايل لتقليل فجوة الصفر المئوي.",
        "تطبيق نظام GPS Verified لضمان صحة تقارير الإنجاز قبل الفوترة.",
        "إعادة توزيع 15% من أوامر 'فيصل السليماني' لتقليل مخاطر التكدس.",
        "تحديث نماذج السلامة لتشمل تقييم المهندس الإلزامي في المواقع الحرجة."
    ],
    recentOrders: [
        { id: "252110940", contractor: "فيصل السليماني", region: "وادي جليل", work: "حفر وتمديد", status: "قيد التنفيذ" },
        { id: "232105215", contractor: "الجدراوي", region: "وادي جليل", work: "تركيب عداد", status: "بانتظار التحديث" },
        { id: "252111724", contractor: "نهضة الديار", region: "الفيصلية", work: "تقوية عداد", status: "قيد التنفيذ" },
        { id: "252111685", contractor: "فاب", region: "المويه", work: "حفر وتمديد", status: "قيد التنفيذ" }
    ]
};
