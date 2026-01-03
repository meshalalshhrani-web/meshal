/**
 * مصدر البيانات الموحد لنظام مراقبة الأداء
 * يعتمد على بيانات قطاع الطائف والمويه
 */
export const DashboardData = {
    summary: {
        totalOrders: 145,
        completionRate: 0,
        delayedTasks: 61,
    },
    
    contractors: [
        { name: "فيصل السليماني", orders: 61, capacity: 40, risk: "عالي" },
        { name: "الجدراوي", orders: 48, capacity: 40, risk: "متوسط" },
        { name: "نهضة الديار", orders: 32, capacity: 40, risk: "منخفض" },
        { name: "فاب", orders: 4, capacity: 40, risk: "منخفض" }
    ],

    regions: {
        "الطائف": ["وادي جليل", "ريحة", "العرفا", "المحاني"],
        "المويه": ["حي الإسكان"]
    },

    engineers: [
        "م. بسام الهميم", "م. فهد الغامدي", "م. عبدالله المالكي", "م. خالد الدعاس"
    ],


    predictionData: {
        labels: ["أسبوع 1", "أسبوع 2", "أسبوع 3", "أسبوع 4 (متوقع)"],
        historical: [0, 5, 12, 18], // نسب الإنجاز المسجلة
        forecast: [18, 45, 75, 100]  // التنبؤ في حال تفعيل GPS Verified
    },

    recommendations: [
        "تفعيل التحديث الميداني اللحظي عبر تطبيق موبايل لتقليل فجوة الصفر المئوي.",
        "تطبيق نظام GPS Verified لضمان صحة تقارير الإنجاز قبل الفوترة.",
        "إعادة توزيع 15% من أوامر 'فيصل السليماني' لتقليل مخاطر التكدس.",
        "تحديث نماذج السلامة لتشمل تقييم المهندس الإلزامي في المواقع الحرجة."
    ],

    allOrders: [
        { id: "252110940", contractor: "فيصل السليماني", region: "الطائف", neighborhood: "وادي جليل", work: "حفر وتمديد", engineer: "م. بسام الهميم", status: "قيد التنفيذ", completion: 0 },
        { id: "232105215", contractor: "الجدراوي", region: "الطائف", neighborhood: "وادي جليل", work: "تركيب عداد", engineer: "م. فهد الغامدي", status: "بانتظار التحديث", completion: 0 },
        { id: "252111724", contractor: "نهضة الديار", region: "الطائف", neighborhood: "ريحة", work: "تقوية عداد", engineer: "م. عبدالله المالكي", status: "قيد التنفيذ", completion: 0 },
        { id: "252111685", contractor: "فاب", region: "المويه", neighborhood: "حي الإسكان", work: "حفر وتمديد", engineer: "م. خالد الدعاس", status: "قيد التنفيذ", completion: 0 },
        { id: "252110941", contractor: "فيصل السليماني", region: "الطائف", neighborhood: "المحاني", work: "دفان", engineer: "م. بسام الهميم", status: "بانتظار التحديث", completion: 0 },
        { id: "252110942", contractor: "الجدراوي", region: "الطائف", neighborhood: "العرفا", work: "تطفية", engineer: "م. فهد الغامدي", status: "مكتمل", completion: 100 },
        { id: "252110943", contractor: "نهضة الديار", region: "الطائف", neighborhood: "المحاني", work: "تجهيز", engineer: "م. بسام الهميم", status: "قيد التنفيذ", completion: 25 },
        { id: "252110944", contractor: "فيصل السليماني", region: "الطائف", neighborhood: "وادي جليل", work: "تمديد", engineer: "م. فهد الغامدي", status: "قيد التنفيذ", completion: 0 }
    ]
};
