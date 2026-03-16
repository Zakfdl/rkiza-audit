// src/App.jsx
import { useState, useEffect, useCallback } from '/home/claude/.npm-global/lib/node_modules/react/index.js';
import './styles/design-system.css';
import { t } from './utils/i18n.js';
import {
  scores, kpis, webVitals, seoKeywords, issues, competitors,
  priorities, roadmap, funnelData, productPageFeatures
} from './data/auditData.js';

// ─────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────

function Badge({ type, children }) {
  return React.createElement('span', { className: `badge badge-${type}` }, children);
}

function ScoreColor(score) {
  if (score < 4.5) return '#E53935';
  if (score < 6.0) return '#FB8C00';
  return '#2E7D32';
}

function CompCell({ value }) {
  if (value === true || value === 'yes') return React.createElement('span', { className: 'comp-cell-yes' }, '✓');
  if (value === false || value === 'no') return React.createElement('span', { className: 'comp-cell-no' }, '✗');
  if (value === 'partial' || value === 'limited' || value === 'some') return React.createElement('span', { className: 'comp-cell-partial' }, '~');
  if (value === 'verified') return React.createElement('span', { className: 'comp-cell-yes' }, '✓ Verified');
  if (value === 'basic') return React.createElement('span', { className: 'comp-cell-partial' }, '~ Basic');
  if (value === 'app') return React.createElement('span', { className: 'comp-cell-yes' }, '✓ App');
  if (value === 'adequate') return React.createElement('span', { className: 'comp-cell-partial' }, '~ OK');
  if (value === 'good') return React.createElement('span', { className: 'comp-cell-yes' }, '✓ Good');
  return React.createElement('span', { className: 'comp-cell-partial' }, value);
}

function ProgressBar({ label, score, max = 10 }) {
  const pct = (score / max) * 100;
  const color = ScoreColor(score);
  return React.createElement('div', { className: 'progress-row' },
    React.createElement('div', { className: 'progress-label' }, label),
    React.createElement('div', { className: 'progress-track' },
      React.createElement('div', {
        className: 'progress-fill',
        style: { width: `${pct}%`, background: color }
      })
    ),
    React.createElement('div', { className: 'progress-val', style: { color } }, score)
  );
}

// ─────────────────────────────────────────────
// SVG CHARTS (no external deps)
// ─────────────────────────────────────────────

function FunnelChart({ lang }) {
  const colors = { current: '#E53935', optimized: '#2E7D32' };
  const maxW = 340;
  const stageH = 40, gap = 8;

  return React.createElement('div', { className: 'funnel-container' },
    // Current funnel
    React.createElement('div', { className: 'funnel-col' },
      React.createElement('div', { className: 'funnel-title', style: { color: colors.current } },
        t(lang, 'funnel_current')
      ),
      funnelData.current.map((s, i) => {
        const w = Math.max((s.pct / 100) * maxW, 80);
        const bg = i === funnelData.current.length - 1 ? '#FEF2F2' : '#F8FAFC';
        const textC = i === funnelData.current.length - 1 ? colors.current : '#1E293B';
        return React.createElement('div', { className: 'funnel-bar-wrap', key: i },
          React.createElement('div', {
            className: 'funnel-bar',
            style: {
              width: `${w}px`, background: bg,
              border: `1px solid ${i === funnelData.current.length-1 ? '#FECACA' : '#E2E8F0'}`,
              color: textC
            }
          },
            React.createElement('span', null, lang === 'ar' ? s.stage_ar : s.stage_en),
            React.createElement('span', null, `${s.pct}%`)
          )
        );
      })
    ),
    // Optimized funnel
    React.createElement('div', { className: 'funnel-col' },
      React.createElement('div', { className: 'funnel-title', style: { color: colors.optimized } },
        t(lang, 'funnel_optimized')
      ),
      funnelData.optimized.map((s, i) => {
        const w = Math.max((s.pct / 100) * maxW, 80);
        const bg = i === funnelData.optimized.length - 1 ? '#F0FDF4' : '#F8FAFC';
        const textC = i === funnelData.optimized.length - 1 ? colors.optimized : '#1E293B';
        return React.createElement('div', { className: 'funnel-bar-wrap', key: i },
          React.createElement('div', {
            className: 'funnel-bar',
            style: {
              width: `${w}px`, background: bg,
              border: `1px solid ${i === funnelData.optimized.length-1 ? '#BBF7D0' : '#E2E8F0'}`,
              color: textC
            }
          },
            React.createElement('span', null, lang === 'ar' ? s.stage_ar : s.stage_en),
            React.createElement('span', null, `${s.pct}%`)
          )
        );
      })
    )
  );
}

function ScoreRadarSVG({ lang }) {
  const cats = scores.categories;
  const W = 300, H = 300, cx = 150, cy = 150, maxR = 110;
  const levels = [2, 4, 6, 8, 10];
  const n = cats.length;

  const getPoint = (i, val) => {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const r = (val / 10) * maxR;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };

  const gridLines = levels.map(lv =>
    React.createElement('polygon', {
      key: lv,
      points: cats.map((_, i) => getPoint(i, lv).join(',')).join(' '),
      fill: 'none', stroke: '#E2E8F0', strokeWidth: 1
    })
  );

  const axisLines = cats.map((_, i) => {
    const [x, y] = getPoint(i, 10);
    return React.createElement('line', {
      key: i, x1: cx, y1: cy, x2, y2: y,
      stroke: '#E2E8F0', strokeWidth: 1
    });
  });

  const dataPoints = cats.map((c, i) => getPoint(i, c.score));
  const polyPoints = dataPoints.map(p => p.join(',')).join(' ');

  const labels = cats.map((c, i) => {
    const [x, y] = getPoint(i, 11.5);
    const label = lang === 'ar' ? c.ar : c.en;
    return React.createElement('text', {
      key: i, x, y,
      textAnchor: 'middle', dominantBaseline: 'middle',
      fontSize: 9.5, fill: '#475569', fontWeight: 600,
      fontFamily: lang === 'ar' ? 'Cairo, Arial' : 'Inter, Arial'
    }, label);
  });

  return React.createElement('svg', { viewBox: `0 0 ${W} ${H}`, style: { width: '100%', maxWidth: 320 } },
    ...gridLines, ...axisLines,
    React.createElement('polygon', {
      points: polyPoints,
      fill: 'rgba(21,101,192,0.15)',
      stroke: '#1565C0', strokeWidth: 2
    }),
    ...dataPoints.map(([x, y], i) =>
      React.createElement('circle', {
        key: i, cx: x, cy: y, r: 4,
        fill: ScoreColor(cats[i].score), stroke: '#fff', strokeWidth: 2
      })
    ),
    ...labels
  );
}

function BarChartSVG({ lang, title }) {
  const data = seoKeywords;
  const W = 500, H = 220, padL = 180, padR = 20, padT = 20, padB = 30;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxV = 8000;
  const barH = Math.floor(chartH / data.length) - 4;

  const colorMap = { critical: '#E53935', high: '#FB8C00', 'quick-win': '#2E7D32', blog: '#1565C0' };

  return React.createElement('div', { className: 'chart-wrap' },
    React.createElement('svg', { viewBox: `0 0 ${W} ${H}`, style: { width: '100%' } },
      // Grid lines
      [2000, 4000, 6000, 8000].map(v => {
        const x = padL + (v / maxV) * chartW;
        return React.createElement('g', { key: v },
          React.createElement('line', { x1: x, y1: padT, x2: x, y2: H - padB, stroke: '#E2E8F0', strokeDasharray: '3,3' }),
          React.createElement('text', { x, y: H - padB + 14, textAnchor: 'middle', fontSize: 9, fill: '#94A3B8' }, `${v/1000}k`)
        );
      }),
      // Bars
      ...data.map((kw, i) => {
        const y = padT + i * (barH + 4);
        const bw = (kw.volume / maxV) * chartW;
        const color = colorMap[kw.priority] || '#94A3B8';
        const label = lang === 'ar' ? kw.keyword : kw.keyword;
        return React.createElement('g', { key: i },
          React.createElement('text', {
            x: padL - 8, y: y + barH / 2,
            textAnchor: 'end', dominantBaseline: 'middle',
            fontSize: 10, fill: '#475569',
            fontFamily: lang === 'ar' ? 'Cairo, Arial' : 'Inter, Arial'
          }, label),
          React.createElement('rect', { x: padL, y, width: bw, height: barH, rx: 3, fill: color }),
          React.createElement('text', {
            x: padL + bw + 4, y: y + barH / 2,
            dominantBaseline: 'middle', fontSize: 9.5, fill: '#475569', fontWeight: 600
          }, `${(kw.volume / 1000).toFixed(1)}k`)
        );
      })
    )
  );
}

// ─────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────

function OverviewSection({ lang }) {
  return React.createElement('div', { className: 'fade-in' },
    React.createElement('div', { className: 'section-header' },
      React.createElement('div', { className: 'section-title' },
        React.createElement('span', { className: 'section-badge' }, '★'),
        t(lang, 'overview_title')
      ),
      React.createElement('div', { className: 'section-subtitle' }, t(lang, 'overview_subtitle'))
    ),

    // Alert
    React.createElement('div', { className: 'alert alert-critical mb-6' },
      React.createElement('span', { style: { fontSize: 20 } }, '⚠️'),
      React.createElement('div', null,
        React.createElement('div', { className: 'alert-title' }, t(lang, 'overview_title')),
        React.createElement('div', { className: 'alert-body' }, t(lang, 'overview_body'))
      )
    ),

    // KPI cards
    React.createElement('div', { className: 'grid-4 mb-6' },
      kpis.map(kpi => React.createElement('div', {
        key: kpi.key,
        className: 'kpi-card',
        style: { '--kpi-color': kpi.key === 'cvr' ? '#E53935' : kpi.key === 'lcp' ? '#FB8C00' : '#1565C0' }
      },
        React.createElement('div', { className: 'kpi-icon' }, kpi.icon),
        React.createElement('div', { className: 'kpi-label' }, t(lang, `kpi_${kpi.key}`)),
        React.createElement('div', { className: 'kpi-value' }, kpi.value)
      ))
    ),

    // Scores + radar
    React.createElement('div', { className: 'grid-2 mb-6' },
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-title' }, t(lang, 'sec_score')),
        scores.categories.map(c =>
          React.createElement(ProgressBar, {
            key: c.key,
            label: lang === 'ar' ? c.ar : c.en,
            score: c.score
          })
        )
      ),
      React.createElement('div', { className: 'card', style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 } },
        React.createElement('div', { style: { display: 'flex', gap: 32, justifyContent: 'center' } },
          React.createElement('div', { className: 'score-circle-wrap' },
            React.createElement('div', { className: 'score-circle', style: { '--score-color': '#E53935' } },
              React.createElement('div', { className: 'score-num', style: { color: '#E53935' } }, '4.9'),
              React.createElement('div', { className: 'score-denom' }, t(lang, 'score_out_of'))
            ),
            React.createElement('div', { className: 'score-label-text' }, t(lang, 'overall_score'))
          ),
          React.createElement('div', { className: 'score-circle-wrap' },
            React.createElement('div', { className: 'score-circle', style: { '--score-color': '#2E7D32', borderColor: '#2E7D32' } },
              React.createElement('div', { className: 'score-num', style: { color: '#2E7D32' } }, '8.2'),
              React.createElement('div', { className: 'score-denom' }, t(lang, 'score_out_of'))
            ),
            React.createElement('div', { className: 'score-label-text' }, t(lang, 'potential_score'))
          )
        ),
        React.createElement(ScoreRadarSVG, { lang })
      )
    ),

    // Summary stats
    React.createElement('div', { className: 'grid-4' },
      React.createElement('div', { className: 'card', style: { textAlign: 'center', '--kpi-color': '#E53935', borderTop: '3px solid #E53935' } },
        React.createElement('div', { style: { fontSize: 32, fontWeight: 800, color: '#E53935' } }, '6'),
        React.createElement('div', { style: { fontSize: 13, color: '#475569', marginTop: 4 } }, t(lang, 'critical_actions'))
      ),
      React.createElement('div', { className: 'card', style: { textAlign: 'center', borderTop: '3px solid #2E7D32' } },
        React.createElement('div', { style: { fontSize: 32, fontWeight: 800, color: '#2E7D32' } }, '5'),
        React.createElement('div', { style: { fontSize: 13, color: '#475569', marginTop: 4 } }, t(lang, 'quick_wins'))
      ),
      React.createElement('div', { className: 'card', style: { textAlign: 'center', borderTop: '3px solid #1565C0' } },
        React.createElement('div', { style: { fontSize: 32, fontWeight: 800, color: '#1565C0' } }, '2.9×'),
        React.createElement('div', { style: { fontSize: 13, color: '#475569', marginTop: 4 } }, t(lang, 'est_revenue_impact'))
      ),
      React.createElement('div', { className: 'card', style: { textAlign: 'center', borderTop: '3px solid #FB8C00' } },
        React.createElement('div', { style: { fontSize: 32, fontWeight: 800, color: '#FB8C00' } }, '12'),
        React.createElement('div', { style: { fontSize: 13, color: '#475569', marginTop: 4 } }, t(lang, 'months_roadmap'))
      )
    )
  );
}

function UXSection({ lang }) {
  const uxIssues = issues.filter(i => i.section === 'ux' || ['critical', 'high'].includes(i.severity));
  return React.createElement('div', { className: 'fade-in' },
    React.createElement('div', { className: 'section-header' },
      React.createElement('div', { className: 'section-title' },
        React.createElement('span', { className: 'section-badge' }, '3'),
        t(lang, 'sec_ux')
      )
    ),
    React.createElement('div', { className: 'grid-2 mb-6' },
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-title' }, lang === 'ar' ? 'مشكلات الصفحة الرئيسية' : 'Homepage Issues'),
        React.createElement('div', { className: 'issue-list' },
          [
            { sev: 'critical', en: 'No hero / value proposition', ar: 'غياب الهيرو وعرض القيمة', en_d: 'Visitors cannot identify what Rkiza sells within 3 seconds.', ar_d: 'لا يستطيع الزوار معرفة ما تبيعه ركيزة خلال 3 ثوانٍ.' },
            { sev: 'critical', en: 'No featured products displayed', ar: 'لا منتجات مميزة', en_d: 'Homepage offers no product exploration — blind navigation only.', ar_d: 'الصفحة الرئيسية لا تعرض أي منتجات للاستكشاف.' },
            { sev: 'critical', en: 'No social proof above the fold', ar: 'لا إثبات اجتماعي', en_d: 'No reviews, customer counts, or order stats in first screen.', ar_d: 'لا تقييمات أو إحصائيات عملاء في الشاشة الأولى.' },
            { sev: 'high', en: 'No promotional banner / offers', ar: 'لا بانر ترويجي', en_d: 'No urgency trigger to encourage further exploration.', ar_d: 'لا محفز إلحاح لتشجيع الاستكشاف.' },
          ].map((item, i) =>
            React.createElement('div', { key: i, className: `issue-item ${item.sev}` },
              React.createElement('div', null,
                React.createElement('div', { className: 'issue-title' }, lang === 'ar' ? item.ar : item.en),
                React.createElement('div', { className: 'issue-desc' }, lang === 'ar' ? item.ar_d : item.en_d),
                React.createElement('div', { className: 'issue-meta' },
                  React.createElement(Badge, { type: item.sev }, t(lang, `status_${item.sev}`))
                )
              )
            )
          )
        )
      ),
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-title' }, lang === 'ar' ? 'نقاط الاحتكاك في التحويل' : 'Conversion Friction Points'),
        React.createElement('div', { className: 'issue-list' },
          [
            { sev: 'critical', en: 'No WhatsApp chat widget', ar: 'غياب ودجت واتساب', en_d: 'Saudi buyers expect instant messaging — major abandonment trigger.', ar_d: 'المشترون السعوديون يتوقعون الرسائل الفورية.' },
            { sev: 'critical', en: 'Price hidden on category pages', ar: 'السعر مخفي في الفئات', en_d: 'Extra clicks needed to see pricing — every click loses conversions.', ar_d: 'كل نقرة إضافية لمعرفة السعر تُكلّف تحويلات.' },
            { sev: 'high', en: 'No guest checkout option', ar: 'لا شراء كضيف', en_d: 'Forced account creation adds friction for new visitors.', ar_d: 'إنشاء الحساب الإجباري يزيد الاحتكاك للزوار الجدد.' },
            { sev: 'high', en: 'No product comparison feature', ar: 'لا مقارنة بين المنتجات', en_d: 'Essential for technical products with multiple variants.', ar_d: 'ضرورية للمنتجات التقنية ذات المتغيرات المتعددة.' },
            { sev: 'high', en: 'No BNPL (Tabby/Tamara)', ar: 'غياب BNPL', en_d: 'Buy-now-pay-later is standard in Saudi e-commerce.', ar_d: 'الدفع الآجل معيار في التجارة الإلكترونية السعودية.' },
          ].map((item, i) =>
            React.createElement('div', { key: i, className: `issue-item ${item.sev}` },
              React.createElement('div', null,
                React.createElement('div', { className: 'issue-title' }, lang === 'ar' ? item.ar : item.en),
                React.createElement('div', { className: 'issue-desc' }, lang === 'ar' ? item.ar_d : item.en_d),
                React.createElement('div', { className: 'issue-meta' },
                  React.createElement(Badge, { type: item.sev }, t(lang, `status_${item.sev}`))
                )
              )
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'card' },
      React.createElement('div', { className: 'card-title' }, lang === 'ar' ? 'تحليل قمع التحويل' : 'Conversion Funnel Analysis'),
      React.createElement(FunnelChart, { lang }),
      React.createElement('div', { className: 'funnel-note mt-4' }, t(lang, 'funnel_note'))
    )
  );
}

function ProductSection({ lang }) {
  return React.createElement('div', { className: 'fade-in' },
    React.createElement('div', { className: 'section-header' },
      React.createElement('div', { className: 'section-title' },
        React.createElement('span', { className: 'section-badge' }, '5'),
        t(lang, 'sec_products')
      )
    ),
    React.createElement('div', { className: 'card mb-6' },
      React.createElement('div', { className: 'card-title' }, lang === 'ar' ? 'تحليل فجوات ميزات صفحة المنتج' : 'Product Page Feature Gap Analysis'),
      React.createElement('div', { className: 'table-wrap' },
        React.createElement('table', null,
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, t(lang, 'col_feature')),
              React.createElement('th', null, t(lang, 'col_rkiza')),
              React.createElement('th', null, t(lang, 'col_top_stores')),
              React.createElement('th', null, lang === 'ar' ? 'الأثر على التحويل' : 'Conversion Impact')
            )
          ),
          React.createElement('tbody', null,
            productPageFeatures.map((f, i) => {
              const rkizaStatus = f.rkiza === false ? 'missing' : f.rkiza === true ? 'present' : 'partial';
              const impactBadge = f.impact === 'very-high' ? 'critical' : f.impact === 'high' ? 'high' : 'medium';
              return React.createElement('tr', { key: i },
                React.createElement('td', null, lang === 'ar' ? f.feature_ar : f.feature_en),
                React.createElement('td', null, React.createElement(Badge, { type: rkizaStatus }, t(lang, `status_${rkizaStatus}`))),
                React.createElement('td', null, React.createElement(Badge, { type: 'present' }, t(lang, 'status_present'))),
                React.createElement('td', null, React.createElement(Badge, { type: impactBadge }, t(lang, `status_${impactBadge}`)))
              );
            })
          )
        )
      )
    ),
    React.createElement('div', { className: 'alert alert-info' },
      React.createElement('span', { style: { fontSize: 20 } }, '💡'),
      React.createElement('div', null,
        React.createElement('div', { className: 'alert-title' },
          lang === 'ar' ? 'أولويات تحسين محتوى المنتجات' : 'Priority Product Content Improvements'
        ),
        React.createElement('div', { className: 'alert-body' },
          lang === 'ar'
            ? '1. إضافة جدول المواصفات الفنية لكل منتج. 2. صور متعددة (3+ كحد أدنى). 3. مؤشر المخزون. 4. إرسال بريد إلكتروني لطلب التقييم بعد 7 أيام من التسليم.'
            : '1. Add spec table to every product. 2. Multiple images (3+ minimum). 3. Stock indicator. 4. Send post-purchase review request email 7 days after delivery.'
        )
      )
    )
  );
}

function SEOSection({ lang }) {
  return React.createElement('div', { className: 'fade-in' },
    React.createElement('div', { className: 'section-header' },
      React.createElement('div', { className: 'section-title' },
        React.createElement('span', { className: 'section-badge' }, '6'),
        t(lang, 'sec_seo')
      )
    ),
    React.createElement('div', { className: 'grid-2 mb-6' },
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-title' }, lang === 'ar' ? 'المشكلات الحرجة في SEO' : 'Critical SEO Issues'),
        React.createElement('div', { className: 'issue-list' },
          [
            { sev: 'critical', en: 'Numeric URL slugs (/categories/928120)', ar: 'روابط URL رقمية', en_d: 'Zero keyword signals. Fix: /categories/plumbing/float-valves', ar_d: 'الحل: /فئات/سباكة/عوامات' },
            { sev: 'critical', en: 'No blog / content hub', ar: 'غياب مدونة المحتوى', en_d: 'Zero top-of-funnel content. Missing searches like "how to install float valve".', ar_d: 'صفر محتوى معلوماتي. ضائعة بحثات مثل «كيفية تركيب عوامة».' },
            { sev: 'critical', en: 'Auto-generated meta descriptions', ar: 'وصف ميتا مُولَّد تلقائياً', en_d: 'Category pages use brand tagline as meta — no keyword targeting.', ar_d: 'صفحات الفئات تستخدم شعار الشركة كوصف ميتا.' },
            { sev: 'critical', en: 'No Product Schema markup', ar: 'غياب Product Schema', en_d: 'No rich snippets (star ratings, price) in Google results.', ar_d: 'لا مقتطفات منسقة (نجوم التقييم، السعر) في جوجل.' },
            { sev: 'high', en: 'Thin category pages', ar: 'صفحات فئات شحيحة', en_d: 'Only product thumbnails — no intro text, no topical authority.', ar_d: 'مجرد شبكات منتجات بلا نص — لا سلطة موضوعية لجوجل.' },
            { sev: 'high', en: 'No internal linking strategy', ar: 'لا استراتيجية ربط داخلي', en_d: 'No pillar-cluster architecture. Product pages don\'t link to categories.', ar_d: 'لا بنية محاور وأذرع. المنتجات لا تُحيل للفئات.' },
          ].map((item, i) =>
            React.createElement('div', { key: i, className: `issue-item ${item.sev}` },
              React.createElement('div', null,
                React.createElement('div', { className: 'issue-title' }, lang === 'ar' ? item.ar : item.en),
                React.createElement('div', { className: 'issue-desc' }, lang === 'ar' ? item.ar_d : item.en_d),
                React.createElement('div', { className: 'issue-meta' },
                  React.createElement(Badge, { type: item.sev }, t(lang, `status_${item.sev}`))
                )
              )
            )
          )
        )
      ),
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-title' }, lang === 'ar' ? 'خريطة فرص الكلمات المفتاحية' : 'Keyword Opportunity Map'),
        React.createElement(BarChartSVG, { lang }),
        React.createElement('div', { style: { marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' } },
          [['critical', lang === 'ar' ? 'حرج' : 'Critical'], ['high', lang === 'ar' ? 'عالٍ' : 'High'], ['quick-win', lang === 'ar' ? 'فرصة سريعة' : 'Quick Win'], ['blog', lang === 'ar' ? 'مقالة مدونة' : 'Blog']].map(([type, label]) =>
            React.createElement('div', { key: type, style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 } },
              React.createElement('div', { style: { width: 10, height: 10, borderRadius: 2, background: { critical: '#E53935', high: '#FB8C00', 'quick-win': '#2E7D32', blog: '#1565C0' }[type] } }),
              label
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'card' },
      React.createElement('div', { className: 'card-title' }, lang === 'ar' ? 'جدول فرص الكلمات المفتاحية' : 'Keyword Opportunities Table'),
      React.createElement('div', { className: 'table-wrap' },
        React.createElement('table', null,
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, t(lang, 'col_keyword')),
              React.createElement('th', null, t(lang, 'col_volume')),
              React.createElement('th', null, t(lang, 'col_rank')),
              React.createElement('th', null, t(lang, 'col_priority'))
            )
          ),
          React.createElement('tbody', null,
            seoKeywords.map((kw, i) => {
              const pBadge = kw.priority === 'critical' ? 'critical' : kw.priority === 'high' ? 'high' : kw.priority === 'quick-win' ? 'low' : 'medium';
              return React.createElement('tr', { key: i },
                React.createElement('td', null, kw.keyword),
                React.createElement('td', null, `~${kw.volume.toLocaleString()}`),
                React.createElement('td', null, React.createElement(Badge, { type: 'missing' }, lang === 'ar' ? 'غير مُصنَّف' : 'Not Ranking')),
                React.createElement('td', null, React.createElement(Badge, { type: pBadge }, t(lang, `status_${kw.priority === 'quick-win' ? 'medium' : kw.priority}`)))
              );
            })
          )
        )
      )
    )
  );
}

function PerformanceSection({ lang }) {
  const vitalColor = (status) => status === 'poor' ? '#E53935' : status === 'needs-work' ? '#FB8C00' : '#2E7D32';
  return React.createElement('div', { className: 'fade-in' },
    React.createElement('div', { className: 'section-header' },
      React.createElement('div', { className: 'section-title' },
        React.createElement('span', { className: 'section-badge' }, '7'),
        t(lang, 'sec_performance')
      )
    ),
    React.createElement('div', { className: 'card mb-6' },
      React.createElement('div', { className: 'card-title' }, t(lang, 'sec_webvitals')),
      React.createElement('div', { className: 'vitals-grid' },
        webVitals.map(v =>
          React.createElement('div', {
            key: v.metric,
            className: 'vital-card',
            style: { '--vital-color': vitalColor(v.status) }
          },
            React.createElement('div', { className: 'vital-metric' }, v.metric),
            React.createElement('div', { className: 'vital-value' }, v.value),
            React.createElement('div', { className: 'vital-unit' }, v.unit || '—'),
            React.createElement('div', { className: 'vital-name' }, lang === 'ar' ? v.ar : v.en),
            React.createElement('div', { className: 'vital-threshold', style: { color: '#94A3B8' } },
              `${lang === 'ar' ? 'الهدف' : 'Target'}: ${v.threshold}${v.unit}`
            ),
            React.createElement('div', {
              className: 'vital-status',
              style: { color: vitalColor(v.status) }
            }, t(lang, `status_${v.status.replace('-', '_')}` ) || v.status)
          )
        )
      )
    ),
    React.createElement('div', { className: 'card' },
      React.createElement('div', { className: 'card-title' }, lang === 'ar' ? 'جدول المشكلات التقنية' : 'Technical Issues'),
      React.createElement('div', { className: 'table-wrap' },
        React.createElement('table', null,
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, lang === 'ar' ? 'المشكلة التقنية' : 'Technical Issue'),
              React.createElement('th', null, t(lang, 'col_severity')),
              React.createElement('th', null, lang === 'ar' ? 'الإصلاح الموصى به' : 'Recommended Fix'),
              React.createElement('th', null, t(lang, 'col_effort'))
            )
          ),
          React.createElement('tbody', null,
            [
              { en_i: 'Images not in WebP format', ar_i: 'الصور بصيغة JPG/PNG وليس WebP', sev: 'critical', en_f: 'Enable WebP conversion in Salla/Zid settings', ar_f: 'تفعيل تحويل WebP في إعدادات سلة/زد', eff: 'easy' },
              { en_i: 'No image lazy loading', ar_i: 'لا Lazy Loading للصور', sev: 'high', en_f: 'Add loading="lazy" to all off-screen images', ar_f: 'إضافة loading="lazy" لصور المنتجات', eff: 'easy' },
              { en_i: 'No Product Schema (JSON-LD)', ar_i: 'غياب Product Schema', sev: 'high', en_f: 'Implement JSON-LD Product + BreadcrumbList', ar_f: 'تطبيق JSON-LD للمنتجات و BreadcrumbList', eff: 'medium' },
              { en_i: 'No XML Sitemap in GSC', ar_i: 'لا Sitemap XML', sev: 'high', en_f: 'Generate and submit sitemap to Google Search Console', ar_f: 'إنشاء Sitemap XML وإرساله عبر Search Console', eff: 'easy' },
              { en_i: 'No CDN for static assets', ar_i: 'لا CDN للأصول الثابتة', sev: 'medium', en_f: 'Enable Cloudflare or platform CDN', ar_f: 'تفعيل Cloudflare أو CDN المنصة', eff: 'medium' },
              { en_i: 'CLS layout shift issues', ar_i: 'مشكلات تحول التخطيط CLS', sev: 'medium', en_f: 'Reserve image dimensions in CSS to prevent shifts', ar_f: 'تحديد أبعاد الصور في CSS لمنع التحول', eff: 'easy' },
            ].map((row, i) =>
              React.createElement('tr', { key: i },
                React.createElement('td', null, lang === 'ar' ? row.ar_i : row.en_i),
                React.createElement('td', null, React.createElement(Badge, { type: row.sev }, t(lang, `status_${row.sev}`))),
                React.createElement('td', null, lang === 'ar' ? row.ar_f : row.en_f),
                React.createElement('td', null, React.createElement(Badge, { type: row.eff === 'easy' ? 'easy' : 'medium-effort' }, t(lang, `effort_${row.eff}`)))
              )
            )
          )
        )
      )
    )
  );
}

function CROSection({ lang }) {
  return React.createElement('div', { className: 'fade-in' },
    React.createElement('div', { className: 'section-header' },
      React.createElement('div', { className: 'section-title' },
        React.createElement('span', { className: 'section-badge' }, '8'),
        t(lang, 'sec_cro')
      )
    ),
    React.createElement('div', { className: 'grid-2 mb-6' },
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-title' }, lang === 'ar' ? 'تدقيق عناصر الثقة' : 'Trust Signal Audit'),
        React.createElement('div', { className: 'table-wrap' },
          React.createElement('table', null,
            React.createElement('thead', null,
              React.createElement('tr', null,
                React.createElement('th', null, lang === 'ar' ? 'عنصر الثقة' : 'Trust Element'),
                React.createElement('th', null, lang === 'ar' ? 'الحالة' : 'Status'),
                React.createElement('th', null, lang === 'ar' ? 'الأثر' : 'Impact')
              )
            ),
            React.createElement('tbody', null,
              [
                { en: 'Payment icons (Mada, Visa, Apple Pay)', ar: 'أيقونات الدفع (مدى، فيزا، Apple Pay)', status: 'missing', impact: 'critical' },
                { en: 'Saudi CR (commercial registration)', ar: 'السجل التجاري السعودي', status: 'missing', impact: 'high' },
                { en: 'Return & refund policy on product pages', ar: 'سياسة الإرجاع في صفحات المنتج', status: 'missing', impact: 'high' },
                { en: 'Verified reviews (platform/Google)', ar: 'تقييمات معتمدة', status: 'missing', impact: 'critical' },
                { en: 'Security badge (SSL visual)', ar: 'شارة أمان SSL', status: 'missing', impact: 'high' },
                { en: 'Order statistics counter', ar: 'عداد الطلبات', status: 'missing', impact: 'medium' },
                { en: 'WhatsApp contact integration', ar: 'تكامل واتساب', status: 'partial', impact: 'critical' },
                { en: 'Warranty badge (structured)', ar: 'شارة الضمان منظمة', status: 'partial', impact: 'medium' },
              ].map((row, i) =>
                React.createElement('tr', { key: i },
                  React.createElement('td', null, lang === 'ar' ? row.ar : row.en),
                  React.createElement('td', null, React.createElement(Badge, { type: row.status }, t(lang, `status_${row.status}`))),
                  React.createElement('td', null, React.createElement(Badge, { type: row.impact }, t(lang, `status_${row.impact}`)))
                )
              )
            )
          )
        )
      ),
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-title' }, lang === 'ar' ? 'المحفزات النفسية المفقودة' : 'Missing Psychological Triggers'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
          [
            { icon: '⚡', en_t: 'Scarcity', ar_t: 'الندرة', en_d: 'No "Only 3 left in stock" indicators.', ar_d: 'لا مؤشرات «لم يتبق إلا 3 قطع».' },
            { icon: '👥', en_t: 'Social Proof', ar_t: 'الإثبات الاجتماعي', en_d: 'No customer count or review snippets on category pages.', ar_d: 'لا عداد عملاء أو تقييمات في صفحات الفئات.' },
            { icon: '🏆', en_t: 'Authority', ar_t: 'السلطة', en_d: 'No press mentions, brand affiliations, or certifications.', ar_d: 'لا ذِكر في الصحافة أو شراكات أو شهادات جودة.' },
            { icon: '⏱️', en_t: 'Urgency', ar_t: 'الإلحاح', en_d: 'No time-limited offers with countdown timers.', ar_d: 'لا عروض محدودة الوقت مع عدادات تنازلية.' },
            { icon: '🔔', en_t: 'FOMO', ar_t: 'الخوف من الفوات', en_d: 'No "Someone in Riyadh just bought this" notifications.', ar_d: 'لا إشعارات «شخص في الرياض اشترى هذا للتو».' },
            { icon: '🎁', en_t: 'Reciprocity', ar_t: 'المعاملة بالمثل', en_d: 'No free guide offered for email signup.', ar_d: 'لا دليل مجاني مُقدَّم مقابل الاشتراك.' },
          ].map((item, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 12px', background: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' } },
              React.createElement('span', { style: { fontSize: 18, flexShrink: 0 } }, item.icon),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 13.5, fontWeight: 600, color: '#1E293B' } }, lang === 'ar' ? item.ar_t : item.en_t),
                React.createElement('div', { style: { fontSize: 12.5, color: '#475569', marginTop: 2 } }, lang === 'ar' ? item.ar_d : item.en_d)
              )
            )
          )
        )
      )
    )
  );
}

function CompetitorSection({ lang }) {
  const compFeatures = [
    { key: 'seoUrls', label_en: 'SEO-friendly URLs', label_ar: 'روابط URL بكلمات مفتاحية' },
    { key: 'blog', label_en: 'Blog / Content Hub', label_ar: 'مدونة / مركز محتوى' },
    { key: 'whatsapp', label_en: 'WhatsApp / Live Chat', label_ar: 'واتساب / دردشة مباشرة' },
    { key: 'schema', label_en: 'Product Schema', label_ar: 'Product Schema' },
    { key: 'reviews', label_en: 'Review System', label_ar: 'نظام التقييمات' },
    { key: 'b2b', label_en: 'B2B Pricing', label_ar: 'أسعار B2B' },
    { key: 'freeShip', label_en: 'Free Shipping', label_ar: 'شحن مجاني' },
    { key: 'mobile', label_en: 'Mobile UX', label_ar: 'تجربة الجوال' },
    { key: 'specs', label_en: 'Spec Tables', label_ar: 'جداول المواصفات' },
    { key: 'bnpl', label_en: 'BNPL', label_ar: 'BNPL (تابي/تمارا)' },
  ];
  return React.createElement('div', { className: 'fade-in' },
    React.createElement('div', { className: 'section-header' },
      React.createElement('div', { className: 'section-title' },
        React.createElement('span', { className: 'section-badge' }, '9'),
        t(lang, 'sec_competitors')
      )
    ),
    React.createElement('div', { className: 'card mb-6' },
      React.createElement('div', { className: 'table-wrap' },
        React.createElement('table', null,
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, t(lang, 'col_feature')),
              ...competitors.map(c => React.createElement('th', { key: c.name }, c.name))
            )
          ),
          React.createElement('tbody', null,
            compFeatures.map((f, fi) =>
              React.createElement('tr', { key: fi },
                React.createElement('td', null, lang === 'ar' ? f.label_ar : f.label_en),
                ...competitors.map((c, ci) =>
                  React.createElement('td', { key: ci, className: ci === 0 ? 'comp-rkiza' : '' },
                    React.createElement(CompCell, { value: c[f.key] })
                  )
                )
              )
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'alert alert-info' },
      React.createElement('span', { style: { fontSize: 20 } }, '🎯'),
      React.createElement('div', null,
        React.createElement('div', { className: 'alert-title' },
          lang === 'ar' ? 'الفرصة المحلية الذهبية' : 'Local SEO Golden Opportunity'
        ),
        React.createElement('div', { className: 'alert-body' },
          lang === 'ar'
            ? 'لم يستحوذ أي منافس رئيسي على كلمات SEO المحلية في القصيم / عنيزة / بريدة. بثلاثة إلى أربع صفحات موقع محلية وملف Google Business Profile محقق، يمكن لركيزة التفوق في نتائج البحث المحلي خلال 60-90 يوماً.'
            : 'None of the main competitors have claimed Al-Qassim / Unayzah / Buraydah local SEO keywords. With 3-4 location-specific pages and a verified Google Business Profile, Rkiza can dominate local search results within 60-90 days.'
        )
      )
    )
  );
}

function PrioritiesSection({ lang }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? priorities : priorities.filter(p => p.impact === filter);
  const filterBtns = ['all', 'critical', 'high', 'medium'];

  return React.createElement('div', { className: 'fade-in' },
    React.createElement('div', { className: 'section-header' },
      React.createElement('div', { className: 'section-title' },
        React.createElement('span', { className: 'section-badge' }, '10'),
        t(lang, 'sec_priorities')
      )
    ),
    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' } },
      filterBtns.map(f =>
        React.createElement('button', {
          key: f,
          onClick: () => setFilter(f),
          style: {
            padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', border: '1px solid',
            background: filter === f ? '#0A3D6B' : '#F8FAFC',
            color: filter === f ? '#fff' : '#475569',
            borderColor: filter === f ? '#0A3D6B' : '#E2E8F0',
            fontFamily: 'inherit',
            transition: 'all 0.15s',
          }
        }, f === 'all' ? (lang === 'ar' ? 'الكل' : 'All') : t(lang, `status_${f}`))
      )
    ),
    React.createElement('div', { className: 'card' },
      React.createElement('div', { className: 'table-wrap' },
        React.createElement('table', null,
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, '#'),
              React.createElement('th', null, t(lang, 'col_issue')),
              React.createElement('th', null, t(lang, 'col_impact')),
              React.createElement('th', null, t(lang, 'col_effort')),
              React.createElement('th', null, t(lang, 'col_roi'))
            )
          ),
          React.createElement('tbody', null,
            filtered.map(p =>
              React.createElement('tr', { key: p.id },
                React.createElement('td', null,
                  React.createElement('div', { className: 'priority-num' }, p.id)
                ),
                React.createElement('td', null, lang === 'ar' ? p.issue_ar : p.issue_en),
                React.createElement('td', null, React.createElement(Badge, { type: p.impact }, t(lang, `status_${p.impact}`))),
                React.createElement('td', null, React.createElement(Badge, { type: p.effort === 'easy' ? 'easy' : 'medium-effort' }, t(lang, `effort_${p.effort}`))),
                React.createElement('td', null,
                  React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: '#2E7D32' } },
                    lang === 'ar' ? p.roi_ar : p.roi_en
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

function RoadmapSection({ lang }) {
  return React.createElement('div', { className: 'fade-in' },
    React.createElement('div', { className: 'section-header' },
      React.createElement('div', { className: 'section-title' },
        React.createElement('span', { className: 'section-badge' }, '11'),
        t(lang, 'roadmap_title')
      ),
      React.createElement('div', { className: 'section-subtitle' }, t(lang, 'roadmap_subtitle'))
    ),
    React.createElement('div', { className: 'roadmap-grid' },
      roadmap.map(q =>
        React.createElement('div', { key: q.quarter, className: 'roadmap-quarter', style: { '--rq-color': q.color } },
          React.createElement('div', { className: 'roadmap-header', style: { background: q.color } },
            React.createElement('div', null,
              React.createElement('div', { className: 'roadmap-q-label' }, q.quarter),
              React.createElement('div', { className: 'roadmap-q-title' }, lang === 'ar' ? q.title_ar : q.title_en),
              React.createElement('div', { className: 'roadmap-period' }, lang === 'ar' ? q.months_ar : q.months_en)
            ),
            React.createElement('div', { style: { fontSize: 28, opacity: 0.5 } },
              { Q1: '🔥', Q2: '🔧', Q3: '🔍', Q4: '🚀' }[q.quarter]
            )
          ),
          React.createElement('div', { className: 'roadmap-items' },
            (lang === 'ar' ? q.items_ar : q.items_en).map((item, i) =>
              React.createElement('div', { key: i, className: 'roadmap-item' },
                React.createElement('div', { className: 'roadmap-dot' }),
                item
              )
            )
          )
        )
      )
    )
  );
}

function ScoreSection({ lang }) {
  return React.createElement('div', { className: 'fade-in' },
    React.createElement('div', { className: 'section-header' },
      React.createElement('div', { className: 'section-title' },
        React.createElement('span', { className: 'section-badge' }, '13'),
        t(lang, 'sec_score')
      )
    ),
    React.createElement('div', { className: 'grid-2 mb-6' },
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-title' }, t(lang, 'score_current') + ' — 4.9/10'),
        scores.categories.map(c =>
          React.createElement(ProgressBar, {
            key: c.key,
            label: lang === 'ar' ? c.ar : c.en,
            score: c.score
          })
        )
      ),
      React.createElement('div', { className: 'card', style: { display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', justifyContent: 'center' } },
        React.createElement('div', { style: { display: 'flex', gap: 32 } },
          [
            { score: 4.9, label: t(lang, 'score_current'), color: '#E53935' },
            { score: 8.2, label: t(lang, 'score_potential'), color: '#2E7D32' },
          ].map(s =>
            React.createElement('div', { key: s.score, className: 'score-circle-wrap' },
              React.createElement('div', { className: 'score-circle', style: { '--score-color': s.color, borderColor: s.color } },
                React.createElement('div', { className: 'score-num', style: { color: s.color } }, s.score),
                React.createElement('div', { className: 'score-denom' }, '/10')
              ),
              React.createElement('div', { className: 'score-label-text' }, s.label)
            )
          )
        ),
        React.createElement('div', { className: 'alert alert-success', style: { width: '100%' } },
          React.createElement('span', { style: { fontSize: 18 } }, '✅'),
          React.createElement('div', null,
            React.createElement('div', { className: 'alert-body' }, t(lang, 'score_note'))
          )
        )
      )
    ),
    React.createElement('div', { className: 'alert alert-info' },
      React.createElement('span', { style: { fontSize: 22 } }, '💼'),
      React.createElement('div', null,
        React.createElement('div', { className: 'alert-title' }, t(lang, 'consultant_note')),
        React.createElement('div', { className: 'alert-body' }, t(lang, 'consultant_body'))
      )
    )
  );
}

// ─────────────────────────────────────────────
// NAVIGATION CONFIG
// ─────────────────────────────────────────────
const navItems = [
  { key: 'overview',    icon: '📊', section: 1 },
  { key: 'ux',          icon: '🖥️', section: 3 },
  { key: 'seo',         icon: '🔍', section: 6 },
  { key: 'performance', icon: '⚡', section: 7 },
  { key: 'cro',         icon: '🎯', section: 8 },
  { key: 'competitors', icon: '⚔️', section: 9 },
  { key: 'priorities',  icon: '📋', section: 10 },
  { key: 'roadmap',     icon: '🗺️', section: 11 },
  { key: 'score',       icon: '🏆', section: 13 },
];

const sectionComponents = {
  overview:    OverviewSection,
  ux:          UXSection,
  seo:         SEOSection,
  performance: PerformanceSection,
  cro:         CROSection,
  competitors: CompetitorSection,
  priorities:  PrioritiesSection,
  roadmap:     RoadmapSection,
  score:       ScoreSection,
};

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('rkiza_lang') || 'en'; } catch { return 'en'; }
  });
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Apply RTL/LTR
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = lang === 'ar'
      ? 'rkiza.com — لوحة تدقيق الموقع 2026'
      : 'Rkiza.com — Audit Dashboard 2026';
    try { localStorage.setItem('rkiza_lang', lang); } catch {}
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(l => l === 'en' ? 'ar' : 'en');
  }, []);

  const navigate = useCallback((key) => {
    setActiveSection(key);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const ActiveComponent = sectionComponents[activeSection];

  const sectionNum = navItems.find(n => n.key === activeSection)?.section;

  return React.createElement('div', { className: 'app-layout' },
    // Sidebar overlay (mobile)
    React.createElement('div', {
      className: `sidebar-overlay ${sidebarOpen ? 'open' : ''}`,
      onClick: () => setSidebarOpen(false)
    }),

    // Sidebar
    React.createElement('aside', { className: `sidebar ${sidebarOpen ? 'open' : ''}` },
      React.createElement('div', { className: 'sidebar-logo' },
        React.createElement('div', { className: 'sidebar-logo-title' }, 'rkiza.com'),
        React.createElement('div', { className: 'sidebar-logo-sub' }, t(lang, 'nav_title'))
      ),
      React.createElement('nav', { className: 'sidebar-nav' },
        navItems.map(item =>
          React.createElement('div', {
            key: item.key,
            className: `sidebar-nav-item ${activeSection === item.key ? 'active' : ''}`,
            onClick: () => navigate(item.key)
          },
            React.createElement('span', { className: 'nav-icon' }, item.icon),
            t(lang, `nav_${item.key}`)
          )
        )
      ),
      React.createElement('div', { className: 'sidebar-footer' },
        React.createElement('div', null, t(lang, 'header_agency')),
        React.createElement('div', null, t(lang, 'header_date'))
      )
    ),

    // Main content
    React.createElement('div', { className: 'main-content' },
      // Header
      React.createElement('header', { className: 'top-header' },
        React.createElement('div', { className: 'header-left' },
          React.createElement('button', {
            className: 'mobile-menu-btn',
            onClick: () => setSidebarOpen(o => !o),
            'aria-label': 'Toggle menu'
          }, '☰'),
          React.createElement('div', null,
            React.createElement('div', { className: 'header-breadcrumb' },
              `${t(lang, 'header_site')} ${lang === 'ar' ? '←' : '/'} ${t(lang, `nav_${activeSection}`)}`
            )
          )
        ),
        React.createElement('div', { className: 'header-right' },
          React.createElement('div', { className: 'header-badge' },
            lang === 'ar' ? 'التقييم الإجمالي: 4.9/10' : 'Overall Score: 4.9/10'
          ),
          React.createElement('div', { className: 'lang-toggle' },
            React.createElement('button', {
              className: `lang-btn ${lang === 'en' ? 'active' : ''}`,
              onClick: () => setLang('en')
            }, 'EN'),
            React.createElement('button', {
              className: `lang-btn ${lang === 'ar' ? 'active' : ''}`,
              onClick: () => setLang('ar')
            }, 'ع')
          )
        )
      ),

      // Page
      React.createElement('main', { className: 'page-content' },
        React.createElement(ActiveComponent, { lang, key: `${activeSection}-${lang}` })
      )
    )
  );
}
