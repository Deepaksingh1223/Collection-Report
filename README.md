# Team & Brand Performance Dashboard (ABC Finance)

## Run
    npm install
    npm run dev          # http://localhost:3000

## How the data flows (read this first)
    data/*.js  ──►  hooks/useDashboard.js  ──►  app/page.js  ──►  components/*
    (mock data)     filters → rows → insights    (layout only)     (display only)

1. `data/` holds the mock data (teams, members, daily records). Imported CSV rows are stored in the browser (localStorage).
2. `hooks/useDashboard.js` applies the filters (month, dates, team, member, search, source) and builds every row the screen needs.
3. `app/page.js` only arranges components in order. 
4. Components only display what they receive. They never filter or calculate business numbers.

## Folder map
| Folder | What is inside |
|---|---|
| `app/` | `page.js` (screen order), `layout.js` (font), `globals.css` |
| `hooks/` | `useDashboard.js` – all filtering + calculations |
| `data/` | `tlData.js` (teams), `executiveData.js` (members), `dailyData.js` (date-wise records), `dashboardData.js` (brand + tier bands + incentive slabs) |
| `utils/` | `calculations.js`, `formatters.js`, `importCsv.js`, `csv.js` |
| `components/layout/` | Header, FilterBar, ActiveFilters, HeadlineBanner, SectionNav |
| `components/sections/` | BrandProgress, KPICards, TeamPerformance (+TLPerformance), MemberTable, DailyData (+MonthlyTrend), AttentionPanel |
| `components/charts/` | TeamChart, TrendChart, TopChart |
| `components/modals/` | SummaryModal (load popup), ImportDialog (CSV) |
| `components/ui/` | Card (with refresh icon), Bar, Badge, Pill, Btn, Pager … shared by all sections |

## Screen order (top → bottom)
Header → Filters → Focus strip → Headline → Section chips → Brand progress → KPI cards → Teams → TLs + chart → Members → Trend + Top performers → Date-wise + Month-wise → Attention required.

## Things you asked for
- **Refresh per section:** every section has a ⟳ icon. It refreshes only that section (short loading state, "Updated hh:mm:ss"). The header Refresh reloads everything.
- **Focus without losing the rest:** clicking a team, TL, member or date focuses it (KPIs, brand progress, headline follow). Team/TL/Top/Attention sections still list everyone, the member table has a *Selected / All members* switch, the date table has *Show all dates*, and the blue strip has *Show everything*. Click the same item again to un-focus.
- **Top / Average / Low:** `tierOf()` in `utils/calculations.js` using `performanceBands` in `data/dashboardData.js` (Top ≥ 75%, Average ≥ 60%, else Low). Change the numbers there.
- **Import:** header → Import data. Required columns: `date,userId,target,collected`; optional: `contactedAccounts,connectedAccounts,ptpCount,ptpAmount,ptpKept,paidAccounts`. Date `YYYY-MM-DD` or `DD-MM-YYYY`. Same date + userId replaces the old row. Imported rows get a **New data** badge; use *Data source → Imported only* to see only them.

## Common changes
- Add / rename a team: edit `data/tlData.js` (`teamSize`, `team`, `target`, `collected`).
- Replace mock data with an API: return the same shapes from `data/*.js` (or fetch inside `useDashboard.js`).
- Add a new section: create a component in `components/sections/`, wrap it in `<Card id="..." title="...">` (refresh icon comes free), render it in `app/page.js`.
