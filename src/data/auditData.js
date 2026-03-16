// src/data/auditData.js
// Complete bilingual audit data for rkiza.com

export const scores = {
  overall: 4.9,
  potential: 8.2,
  categories: [
    { key: "ux",          en: "UX & Usability",        ar: "تجربة المستخدم",        score: 4.0, color: "#E53935" },
    { key: "seo",         en: "SEO",                   ar: "تهيئة محركات البحث",    score: 3.0, color: "#E53935" },
    { key: "design",      en: "Design & Brand",        ar: "التصميم والهوية",        score: 5.0, color: "#FB8C00" },
    { key: "cro",         en: "Conversion (CRO)",      ar: "معدل التحويل",           score: 3.5, color: "#E53935" },
    { key: "performance", en: "Performance",           ar: "الأداء التقني",          score: 5.2, color: "#FB8C00" },
    { key: "content",     en: "Content Quality",       ar: "جودة المحتوى",           score: 4.8, color: "#FB8C00" },
    { key: "trust",       en: "Trust Signals",         ar: "عناصر الثقة",            score: 3.0, color: "#E53935" },
    { key: "mobile",      en: "Mobile Experience",     ar: "تجربة الجوال",           score: 5.5, color: "#FB8C00" },
  ]
};

export const kpis = [
  { key: "categories",   en: "Product Categories",  ar: "فئات المنتجات",   value: "5+",       icon: "📦" },
  { key: "market",       en: "Market Opportunity",  ar: "حجم السوق",       value: "$8B+",     icon: "📈" },
  { key: "followers",    en: "Social Followers",    ar: "متابعو التواصل",  value: "4,444",    icon: "📱" },
  { key: "cvr",          en: "Est. Current CVR",    ar: "معدل التحويل الحالي", value: "1.2%", icon: "🎯" },
  { key: "cvrTarget",    en: "Target CVR",          ar: "معدل التحويل المستهدف", value: "3.5%", icon: "🚀" },
  { key: "lcp",          en: "LCP (est.)",          ar: "سرعة التحميل",    value: "3.8s",     icon: "⚡" },
];

export const webVitals = [
  { metric: "LCP", en: "Largest Contentful Paint", ar: "أكبر عنصر مرئي",     value: 3.8,  unit: "s",   threshold: 2.5, status: "poor" },
  { metric: "FID", en: "First Input Delay",        ar: "تأخير أول تفاعل",    value: 180,  unit: "ms",  threshold: 100, status: "poor" },
  { metric: "CLS", en: "Cumulative Layout Shift",  ar: "تحول تراكمي للتخطيط",value: 0.18, unit: "",    threshold: 0.1, status: "poor" },
  { metric: "FCP", en: "First Contentful Paint",   ar: "أول رسم محتوى",      value: 2.4,  unit: "s",   threshold: 1.8, status: "needs-work" },
  { metric: "TTFB",en: "Time to First Byte",       ar: "وقت أول بايت",       value: 820,  unit: "ms",  threshold: 600, status: "needs-work" },
  { metric: "SI",  en: "Speed Index",              ar: "مؤشر السرعة",        value: 4.2,  unit: "s",   threshold: 3.4, status: "poor" },
];

export const seoKeywords = [
  { keyword: "عوامة خزان المياه",        volume: 8000,  rank: null, priority: "critical" },
  { keyword: "أدوات سباكة السعودية",     volume: 5500,  rank: null, priority: "critical" },
  { keyword: "مواد بناء أونلاين",        volume: 3800,  rank: null, priority: "critical" },
  { keyword: "سخانات مياه للبيع",        volume: 4200,  rank: null, priority: "high" },
  { keyword: "tank float valve Saudi",   volume: 2200,  rank: null, priority: "high" },
  { keyword: "plumbing supplies Qassim", volume: 400,   rank: null, priority: "quick-win" },
  { keyword: "كيف تركب عوامة",           volume: 1800,  rank: null, priority: "blog" },
  { keyword: "مواد بناء القصيم",         volume: 600,   rank: null, priority: "quick-win" },
];

export const issues = [
  { id:1,  severity:"critical", en_title:"Numeric URL slugs",           ar_title:"روابط URL رقمية",             en_desc:"All category/product URLs use numeric IDs — no keyword signals for Google.", ar_desc:"جميع روابط الفئات والمنتجات تستخدم معرّفات رقمية — لا إشارات كلمات مفتاحية لجوجل.", impact:"high",   effort:"medium", section:"seo" },
  { id:2,  severity:"critical", en_title:"No WhatsApp chat widget",     ar_title:"غياب ودجت واتساب",            en_desc:"Saudi buyers expect instant messaging. Its absence is a major abandonment trigger.", ar_desc:"المشترون السعوديون يتوقعون الرسائل الفورية. غيابها يُسبب هجر الموقع.", impact:"high",   effort:"easy",   section:"cro" },
  { id:3,  severity:"critical", en_title:"No homepage hero / value prop",ar_title:"غياب الهيرو وعرض القيمة",   en_desc:"Visitors can't identify what Rkiza sells within 3 seconds.", ar_desc:"لا يستطيع الزوار معرفة ما تبيعه ركيزة خلال 3 ثوانٍ.", impact:"high",   effort:"medium", section:"ux" },
  { id:4,  severity:"critical", en_title:"No Product Schema markup",    ar_title:"غياب Product Schema",         en_desc:"Zero structured data — no rich snippets in Google results.", ar_desc:"لا بيانات منظمة — لا مقتطفات منسقة في نتائج جوجل.", impact:"high",   effort:"medium", section:"seo" },
  { id:5,  severity:"critical", en_title:"No spec tables on products",  ar_title:"غياب جداول المواصفات",        en_desc:"Technical buyers abandon without pipe diameter, voltage, pressure specs.", ar_desc:"المشترون التقنيون يغادرون بدون مواصفات قطر الأنبوب والجهد والضغط.", impact:"high",   effort:"medium", section:"ux" },
  { id:6,  severity:"critical", en_title:"No trust bar (payments/SSL)", ar_title:"غياب شريط الثقة",             en_desc:"No payment icons, warranty badges, or return policy summary visible.", ar_desc:"لا أيقونات دفع ولا شارات ضمان ولا ملخص سياسة إرجاع مرئية.", impact:"high",   effort:"easy",   section:"cro" },
  { id:7,  severity:"high",     en_title:"No blog / content hub",       ar_title:"غياب مدونة المحتوى",          en_desc:"Zero informational content — missing all top-of-funnel organic traffic.", ar_desc:"صفر محتوى معلوماتي — ضائعة كل حركة عضوية أعلى مسار التحويل.", impact:"high",   effort:"medium", section:"seo" },
  { id:8,  severity:"high",     en_title:"No product reviews",          ar_title:"غياب تقييمات المنتجات",       en_desc:"No verified review system — the #1 trust signal in e-commerce.", ar_desc:"لا نظام تقييمات معتمدة — إشارة الثقة الأولى في التجارة الإلكترونية.", impact:"high",   effort:"easy",   section:"cro" },
  { id:9,  severity:"high",     en_title:"Slow LCP (~3.8s)",            ar_title:"بطء LCP (~3.8 ثانية)",        en_desc:"Largest Contentful Paint 52% above the 2.5s threshold — hurts rankings.", ar_desc:"سرعة التحميل الرئيسي 52% فوق عتبة 2.5 ثانية — يضر بالترتيب.", impact:"medium", effort:"medium", section:"performance" },
  { id:10, severity:"high",     en_title:"No advanced product filters", ar_title:"غياب فلاتر المنتجات",         en_desc:"No price range, brand, or spec-based filters — critical for B2B buyers.", ar_desc:"لا فلاتر نطاق سعري أو ماركة أو مواصفات تقنية — حيوي لمشتري B2B.", impact:"medium", effort:"medium", section:"ux" },
  { id:11, severity:"high",     en_title:"No BNPL (Tabby/Tamara)",      ar_title:"غياب خيارات BNPL",            en_desc:"Buy-now-pay-later is standard in Saudi e-commerce — absence kills conversions.", ar_desc:"الدفع الآجل معيار في السعودية — غيابه يُقلّص التحويلات.", impact:"high",   effort:"medium", section:"cro" },
  { id:12, severity:"medium",   en_title:"Images not WebP format",      ar_title:"الصور ليست بصيغة WebP",       en_desc:"Serving JPG/PNG instead of WebP — 25-35% larger than necessary.", ar_desc:"تقديم JPG/PNG بدلاً من WebP — أكبر بنسبة 25-35% من اللازم.", impact:"medium", effort:"easy",   section:"performance" },
];

export const competitors = [
  { name: "rkiza.com",   seoUrls: false, blog: false, whatsapp: "partial", schema: false, reviews: "basic",   b2b: false, freeShip: "partial", mobile: "adequate", specs: false, bnpl: false },
  { name: "Tafassell",   seoUrls: true,  blog: "limited", whatsapp: true, schema: "partial", reviews: "verified", b2b: false, freeShip: true, mobile: "good",     specs: "some",  bnpl: true  },
  { name: "Mawadsa",     seoUrls: true,  blog: true,  whatsapp: true, schema: true,  reviews: "verified", b2b: "partial", freeShip: true, mobile: "good",     specs: true,    bnpl: true  },
  { name: "Masdar",      seoUrls: true,  blog: true,  whatsapp: true, schema: true,  reviews: "verified", b2b: true, freeShip: true, mobile: "adequate", specs: true,    bnpl: true  },
  { name: "Sawab",       seoUrls: "partial", blog: false, whatsapp: true, schema: "partial", reviews: true, b2b: "partial", freeShip: true, mobile: "app",  specs: true,    bnpl: true  },
];

export const priorities = [
  { id:1,  issue_en:"Add WhatsApp floating chat widget",          issue_ar:"إضافة ودجت واتساب عائم",            impact:"critical", effort:"easy",   roi_en:"+20-35% inquiries",      roi_ar:"+20-35% استفسارات" },
  { id:2,  issue_en:"Fix URL slugs to keyword-rich format",       issue_ar:"تصحيح روابط URL بكلمات مفتاحية",    impact:"critical", effort:"medium", roi_en:"+40-60% organic traffic", roi_ar:"+40-60% حركة عضوية" },
  { id:3,  issue_en:"Add trust bar (payment icons, warranty)",    issue_ar:"إضافة شريط الثقة",                   impact:"critical", effort:"easy",   roi_en:"+15-25% CVR",            roi_ar:"+15-25% معدل تحويل" },
  { id:4,  issue_en:"Implement Product Schema JSON-LD",           issue_ar:"تطبيق Product Schema JSON-LD",       impact:"critical", effort:"medium", roi_en:"+18% CTR from Google",   roi_ar:"+18% نسبة النقر" },
  { id:5,  issue_en:"Add product specification tables",           issue_ar:"إضافة جداول المواصفات الفنية",       impact:"critical", effort:"medium", roi_en:"+25% add-to-cart rate",  roi_ar:"+25% معدل إضافة للسلة" },
  { id:6,  issue_en:"Homepage hero redesign",                     issue_ar:"إعادة تصميم الهيرو الرئيسي",         impact:"critical", effort:"medium", roi_en:"+30-50% engagement",     roi_ar:"+30-50% تفاعل" },
  { id:7,  issue_en:"Launch Arabic content blog (10 articles)",   issue_ar:"إطلاق مدونة المحتوى العربية",        impact:"high",     effort:"medium", roi_en:"+3,000 organic sessions", roi_ar:"+3,000 جلسة عضوية" },
  { id:8,  issue_en:"Add related products + bought together",     issue_ar:"إضافة منتجات ذات صلة",               impact:"high",     effort:"easy",   roi_en:"+15-22% AOV",            roi_ar:"+15-22% متوسط الطلب" },
  { id:9,  issue_en:"Enable reviews + post-purchase email",       issue_ar:"تفعيل التقييمات والبريد",            impact:"high",     effort:"easy",   roi_en:"+20% product CVR",       roi_ar:"+20% تحويل المنتج" },
  { id:10, issue_en:"Add advanced product filters",               issue_ar:"إضافة فلاتر متقدمة",                 impact:"high",     effort:"medium", roi_en:"-35% bounce rate",       roi_ar:"-35% معدل الارتداد" },
  { id:11, issue_en:"Submit XML sitemap to GSC",                  issue_ar:"إرسال Sitemap XML",                   impact:"high",     effort:"easy",   roi_en:"Faster indexing",         roi_ar:"فهرسة أسرع" },
  { id:12, issue_en:"Create B2B landing page",                    issue_ar:"إنشاء صفحة هبوط B2B",               impact:"high",     effort:"medium", roi_en:"New high-value segment",  roi_ar:"شريحة عملاء عالية القيمة" },
  { id:13, issue_en:"Optimize images to WebP + lazy loading",     issue_ar:"تحسين الصور WebP + Lazy Loading",   impact:"medium",   effort:"easy",   roi_en:"LCP < 2.5s",             roi_ar:"LCP أقل من 2.5 ث" },
  { id:14, issue_en:"Abandoned cart email automation",            issue_ar:"أتمتة بريد السلة المهجورة",          impact:"medium",   effort:"medium", roi_en:"Recover 8-15% carts",    roi_ar:"استرداد 8-15% سلات" },
];

export const roadmap = [
  {
    quarter: "Q1", months_en: "Months 1–3", months_ar: "الأشهر 1-3",
    title_en: "Critical Fixes", title_ar: "الإصلاحات الحرجة",
    color: "#E53935",
    items_en: ["WhatsApp chat widget", "Trust bar (payments, warranty, shipping)", "XML Sitemap to Google Search Console", "Product spec tables (top 50 SKUs)", "Stock availability indicators", "Product + BreadcrumbList Schema", "Homepage hero redesign", "WebP images + lazy loading", "GA4 + GSC setup"],
    items_ar: ["ودجت واتساب عائم","شريط الثقة (دفع، ضمان، شحن)","Sitemap XML إلى Google Search Console","جداول مواصفات فنية (أعلى 50 منتج)","مؤشرات توافر المخزون","Product + BreadcrumbList Schema","إعادة تصميم الهيرو الرئيسي","صور WebP + Lazy Loading","إعداد GA4 + GSC"],
  },
  {
    quarter: "Q2", months_en: "Months 4–6", months_ar: "الأشهر 4-6",
    title_en: "UX & CRO", title_ar: "تجربة المستخدم والتحويل",
    color: "#FB8C00",
    items_en: ["Mega-menu navigation rebuild", "Advanced filters (price, brand, spec)", "Related products + frequently bought", "Post-purchase review email flow", "Product comparison feature", "A/B test CTA variants", "B2B landing page + quote form", "Abandoned cart email automation (3-step)", "Breadcrumb navigation site-wide", "Tabby / Tamara BNPL integration"],
    items_ar: ["إعادة بناء قائمة Mega Menu","فلاتر متقدمة (سعر، ماركة، مواصفات)","منتجات ذات صلة + يُشترى معاً","تدفق تقييم بعد الشراء","ميزة مقارنة المنتجات","اختبار A/B لأزرار CTA","صفحة هبوط B2B","أتمتة سلة التسوق المهجورة","مسار التنقل Breadcrumb","دمج تابي / تمارا"],
  },
  {
    quarter: "Q3", months_en: "Months 7–9", months_ar: "الأشهر 7-9",
    title_en: "SEO Expansion", title_ar: "توسيع حضور SEO",
    color: "#1565C0",
    items_en: ["Migrate URLs to keyword slugs (301 redirects)", "15 Arabic how-to blog articles", "Category page intro text (200 words each)", "Local SEO pages (Unayzah, Qassim, Buraydah)", "Internal linking strategy", "Google Business Profile launch", "Backlink outreach campaign", "FAQ Schema on top 20 products"],
    items_ar: ["ترحيل URLs مع إعادة توجيه 301","15 مقالة مدونة عربية","نص مقدمة صفحات الفئات (200 كلمة)","صفحات SEO محلية (عنيزة، القصيم، بريدة)","استراتيجية ربط داخلي","إطلاق Google Business Profile","حملة بناء الروابط الخلفية","FAQ Schema لأعلى 20 منتج"],
  },
  {
    quarter: "Q4", months_en: "Months 10–12", months_ar: "الأشهر 10-12",
    title_en: "Growth & Automation", title_ar: "النمو والأتمتة",
    color: "#2E7D32",
    items_en: ["Customer loyalty programme", "Real-time inventory management", "Email marketing list + welcome flow", "Ramadan / National Day campaigns", "Mobile app evaluation (B2B buyers)", "30 total blog articles published", "Affiliate / referral programme", "Annual KPI review vs. audit benchmarks"],
    items_ar: ["برنامج ولاء العملاء","إدارة مخزون في الوقت الفعلي","قائمة بريد إلكتروني + تدفق الترحيب","حملات رمضان / اليوم الوطني","تقييم تطبيق جوال B2B","نشر 30 مقالة مدونة","برنامج تابع / إحالة","مراجعة سنوية للأداء"],
  },
];

export const funnelData = {
  current: [
    { stage_en: "Visits",        stage_ar: "الزيارات",          pct: 100 },
    { stage_en: "Category View", stage_ar: "تصفح الفئات",       pct: 55 },
    { stage_en: "Product View",  stage_ar: "صفحة المنتج",        pct: 32 },
    { stage_en: "Add to Cart",   stage_ar: "إضافة للسلة",        pct: 8 },
    { stage_en: "Purchase",      stage_ar: "الشراء",             pct: 1.2 },
  ],
  optimized: [
    { stage_en: "Visits",        stage_ar: "الزيارات",          pct: 100 },
    { stage_en: "Category View", stage_ar: "تصفح الفئات",       pct: 68 },
    { stage_en: "Product View",  stage_ar: "صفحة المنتج",        pct: 48 },
    { stage_en: "Add to Cart",   stage_ar: "إضافة للسلة",        pct: 18 },
    { stage_en: "Purchase",      stage_ar: "الشراء",             pct: 3.5 },
  ],
};

export const productPageFeatures = [
  { feature_en: "Multiple product images (5-8)", feature_ar: "صور متعددة للمنتج", rkiza: false, topStores: true, impact: "very-high" },
  { feature_en: "Specification table",            feature_ar: "جدول المواصفات",    rkiza: false, topStores: true, impact: "very-high" },
  { feature_en: "Verified customer reviews",      feature_ar: "تقييمات معتمدة",    rkiza: "partial", topStores: true, impact: "very-high" },
  { feature_en: "Stock availability indicator",   feature_ar: "مؤشر المخزون",      rkiza: false, topStores: true, impact: "high" },
  { feature_en: "Related products",               feature_ar: "منتجات ذات صلة",    rkiza: false, topStores: true, impact: "medium" },
  { feature_en: "Frequently bought together",     feature_ar: "يُشترى معاً غالباً", rkiza: false, topStores: true, impact: "high" },
  { feature_en: "Installation guide PDF",         feature_ar: "دليل التركيب PDF",  rkiza: "partial", topStores: true, impact: "medium" },
  { feature_en: "Warranty badge (structured)",    feature_ar: "شارة الضمان",       rkiza: "partial", topStores: true, impact: "medium" },
  { feature_en: "BNPL payment options",           feature_ar: "خيارات الدفع الآجل", rkiza: false, topStores: true, impact: "high" },
  { feature_en: "Breadcrumb navigation",          feature_ar: "مسار التنقل",       rkiza: false, topStores: true, impact: "medium" },
];
