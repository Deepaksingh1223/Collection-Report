# Loan Collection Dashboard - Complete Documentation

## 📋 टेबल ऑफ कंटेंट्स (Table of Contents)
1. [Dashboard Overview](#dashboard-overview)
2. [Features](#features)
3. [User Roles & Permissions](#user-roles--permissions)
4. [How to Run](#how-to-run)
5. [Screen Sections](#screen-sections)
6. [Filter Options](#filter-options)
7. [DRR Report Download](#drr-report-download)
8. [Data Flow](#data-flow)
9. [Technical Architecture](#technical-architecture)
10. [Folder Structure](#folder-structure)

---

## 🎯 Dashboard Overview

यह एक **Loan Collection Dashboard** है जो team leaders और team members की performance को track करता है। यह dashboard daily reports और monthly trends को monitor करने में help करता है।

### Main Objectives:
- Team Leaders की performance track करना
- Daily collection monitoring
- Monthly trends analysis
- Incentive calculation
- Member-wise performance tracking
- Excel report generation (DRR)

---

## ✨ Features

### 1. **Dashboard Header**
- Brand name और logo display
- Current time और date display
- Period selector (month/date range)
- Summary button
- Import data button
- DRR Report download button
- Audit Log button
- Refresh button
- Logout button

### 2. **Filter Panel**
- **Reporting Month**: Month-wise selection
- **From Date / To Date**: Custom date range
- **Quick Presets**: Today, Yesterday, Last 7 days
- **Data Source**: Imported only / Historical only
- **Instant Fundz (TL Selection)**: Team Leader selection dropdown
- **Team Member**: Individual member selection
- **Search**: Search by member name, user ID, TL, team
- **Reset All**: Clear all filters

### 3. **Active Filters Strip**
- Selected filters को blue strip में display करता है
- Individual filters को clear करने का option
- "Show everything" button

### 4. **Headline Banner**
- Total target और collection display
- Achievement percentage
- Best performing TL और member
- Performance insights

### 5. **Brand Progress**
- Company की overall progress
- Target vs Collection comparison
- Achievement percentage with visual progress bar

### 6. **KPI Cards**
- Total Target
- Total Collection
- Pending Amount
- Achievement %
- Incentive Amount
- Member count

### 7. **Team Tree**
- Team hierarchy display
- TL के under के members
- Visual tree structure

### 8. **Team Performance Section**
- All TLs की performance comparison
- Target, Collection, Pending, Achievement %
- Performance ranking
- Top/Average/Low tags

### 9. **TL Performance Section**
- TL-wise detailed performance
- Collection vs Target
- Achievement percentage
- Team size और average per member

### 10. **Member Table**
- All members की detailed list
- Columns: Name, Target, Collection, Pending, Achievement, Status, Tier
- Performance tier (Top/Average/Low)
- Add/Edit/Delete members
- Individual member selection

### 11. **Top Performers Chart**
- Top performing members visualization
- Bar chart display

### 12. **Daily Data Section**
- Date-wise collection data
- Daily target vs collection
- Daily achievement %
- Date selection capability
- Show all dates option

### 13. **Monthly Trend**
- Month-wise collection trend
- Growth percentage
- Line chart visualization

### 14. **Attention Panel**
- Low performance TLs और members
- Behind target members
- Action items

### 15. **DRR Report Download**
- Excel format में report download
- TL-wise individual reports
- Company-wise combined report
- Filter-based download

---

## 👥 User Roles & Permissions

### 1. **Head (Admin)**
- सभी data access
- सभी TLs और members देख सकता है
- Full dashboard access
- All filters use कर सकता है
- DRR report download (Company और individual TL)

### 2. **Team Leader (TL)**
- सिर्फ अपनी team की data देख सकता है
- अपने members की performance monitor कर सकता है
- Filter में सिर्फ अपनी team दिखेगी
- DRR report download (सिर्फ अपनी team की)

### 3. **Executive (Team Member)**
- सिर्फ अपनी individual performance देख सकता है
- अपनी KPIs और progress
- Limited dashboard access
- अपनी ही report download कर सकता है

---

## 🚀 How to Run

### Prerequisites:
- Node.js (version 14 या higher)
- npm या yarn

### Installation Steps:

```bash
# 1. Navigate to project directory
cd loan-dashboard

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
# Dashboard will open at http://localhost:3000

# 4. For production build
npm run build
npm start
```

### Default Login:
- **Username**: Admin credentials से login होता है
- **Role**: User role automatically set होता है based on user ID

---

## 📱 Screen Sections (Top to Bottom)

### 1. **Header Section**
```
[Brand Logo] [Brand Name] [User Name · Role]
[Date] [Time] [Summary] [Import Data] [DRR Report] [Audit Log] [Refresh] [Logout]
```

### 2. **Filter Panel**
```
┌─────────────────────────────────────────────┐
│ Reporting Month | From Date | To Date      │
│ Data Source | Quick Presets                 │
│ Instant Fundz (TL) | Team Member | Search    │
│ [Reset All]                               │
└─────────────────────────────────────────────┘
```

### 3. **Active Filters Strip** (जब कोई filter apply हो)
```
🔵 Filter: TL=Prabhleen [×] 🔵 Date: Today [×] [Show everything]
```

### 4. **Headline Banner**
```
┌─────────────────────────────────────────────┐
│ Total Target: ₹10 Cr | Collection: ₹8 Cr    │
│ Achievement: 80% | Best TL: Shivani        │
└─────────────────────────────────────────────┘
```

### 5. **Brand Progress**
```
┌─────────────────────────────────────────────┐
│ ████████████░░░░░░░░░░ 80%                │
│ Target: ₹10 Cr | Collected: ₹8 Cr          │
└─────────────────────────────────────────────┘
```

### 6. **KPI Cards**
```
┌─────────┬─────────┬─────────┬─────────┐
│ Target  │Collected│ Pending │ Ach%   │
│₹10 Cr   │₹8 Cr    │₹2 Cr    │ 80%    │
└─────────┴─────────┴─────────┴─────────┘
```

### 7. **Team Tree**
```
Shivani (TL)
├── Suzain khan
├── Shreeyanshu
├── Mansi
├── Sahil
├── Pinky
└── Archana

Prabhleen (TL)
├── Abhishek
├── Indal singh
├── Noor mohammad
├── Tanisha
├── Vanshika
└── Lalita
```

### 8. **Team Performance Table**
```
┌─────────────┬────────┬──────────┬─────────┬────────┐
│ Team Leader │ Target  │Collected │ Pending │ Ach%   │
├─────────────┼────────┼──────────┼─────────┼────────┤
│ Shivani     │ ₹5 Cr  │ ₹4.2 Cr  │ ₹0.8 Cr │ 84%    │ ↑ Top
│ Prabhleen   │ ₹5 Cr  │ ₹3.8 Cr  │ ₹1.2 Cr │ 76%    │ ↑ Top
└─────────────┴────────┴──────────┴─────────┴────────┘
```

### 9. **Member Table**
```
┌─────────────┬──────────┬──────────┬─────────┬────────┬────────┐
│ Name        │ Target   │Collected │ Pending │ Ach%   │ Tier   │
├─────────────┼──────────┼──────────┼─────────┼────────┼────────┤
│ Abhishek    │ ₹83 Lak  │ ₹50 Lak  │ ₹33 Lak │ 60%    │ Average│
│ Indal singh │ ₹83 Lak  │ ₹45 Lak  │ ₹38 Lak │ 54%    │ Low    │
└─────────────┴──────────┴──────────┴─────────┴────────┴────────┘
```

### 10. **Daily Data Section**
```
┌─────────────┬──────────┬──────────┬─────────┬────────┐
│ Date        │ Target   │Collected │ Pending │ Ach%   │
├─────────────┼──────────┼──────────┼─────────┼────────┤
│ 2026-10-01  │ ₹33 Lak  │ ₹30 Lak  │ ₹3 Lak  │ 91%    │
│ 2026-10-02  │ ₹33 Lak  │ ₹28 Lak  │ ₹5 Lak  │ 85%    │
└─────────────┴──────────┴──────────┴─────────┴────────┘
```

---

## 🔍 Filter Options

### 1. **Reporting Month**
- Month-wise data filter करने के लिए
- Examples: October 2026, September 2026
- जब month select होता है, date range automatically set हो जाता है

### 2. **Custom Date Range**
- **From Date**: Start date select करें
- **To Date**: End date select करें
- Custom period के लिए

### 3. **Quick Presets**
- **Today**: आज की data
- **Yesterday**: कल की data
- **Last 7 days**: पिछले 7 दिनों की data
- **Reset dates**: All dates reset करें

### 4. **Data Source**
- **Imported only**: सिर्फ imported CSV data
- **Historical only**: सिर्फ base mock data
- Default: दोनों combined

### 5. **Instant Fundz (TL Selection)**
- **All**: सभी TLs की data (default)
- **Instant Fundz · Shivani**: सिर्फ Shivani की team
- **Instant Fundz · Prabhleen**: सिर्फ Prabhleen की team

### 6. **Team Member**
- Individual member selection
- TL selection के based available होते हैं
- सिर्फ selected TL के members दिखेंगे

### 7. **Search**
- Search by:
  - Member name
  - User ID
  - TL name
  - Team name
- Real-time search filtering

---

## 📊 DRR Report Download

### Report Types:

#### 1. **Company Report (जब "All" select हो)**
- सभी TLs की combined data
- All 12 members की data एक ही sheet में
- Sheet name: "Company Report"
- Total company collection दिखती है
- Overall Grand Total row

**Columns:**
```
Name | Pre Close | Grand Total | Paid | LEFT | ACH%
```

**Example:**
```
Daily Report - Company Report
Period: October 2026
Date: 22/10/2026

Name           | Pre Close  | Grand Total | Paid    | LEFT    | ACH%
Abhishek       | 83,33,333  | 83,33,333   | 50,00,000| 33,33,333| 60.00%
Indal singh    | 83,33,333  | 83,33,333   | 45,00,000| 38,33,333| 54.00%
...
Grand Total    | 10,00,00,000|10,00,00,000| 8,00,00,000|2,00,00,000|80.00%
```

#### 2. **Individual TL Report (जब specific TL select हो)**

**Shivani Report:**
- सिर्फ Shivani के 6 members की data
- Sheet name: "Shivani"
- Shivani की team की total collection

**Prabhleen Report:**
- सिर्फ Prabhleen के 6 members की data
- Sheet name: "Prabhleen"
- Prabhleen की team की total collection

### How to Download:

1. **Company Report Download:**
   - Filter में "All" select करें (TL dropdown में)
   - "DRR Report" button पर click करें
   - Excel file download होगी

2. **Individual TL Report Download:**
   - Filter में specific TL select करें (जैसे "Instant Fundz · Shivani")
   - "DRR Report" button पर click करें
   - Excel file download होगी

### File Naming:
```
DRR_Report_[Period]_[Date].xlsx
Example: DRR_Report_October_2026_2026-10-22.xlsx
```

---

## 🔄 Data Flow

```
┌─────────────────┐
│   Data Files     │
│  (mock data)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ useDashboard    │
│   Hook          │
│ (filters +      │
│  calculations)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   page.js       │
│  (component     │
│   arrangement)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Components     │
│  (display only) │
└─────────────────┘
```

### Data Sources:

1. **Base Data (Mock Data):**
   - `data/tlData.js`: Team Leaders data
   - `data/executiveData.js`: Team Members data
   - `data/dailyData.js`: Daily collection records
   - `data/dashboardData.js`: Brand settings, incentive slabs

2. **Imported Data (CSV):**
   - User द्वारा imported CSV data
   - Stored in browser (localStorage)
   - Base data को override करती है

3. **Member Changes:**
   - Add/Edit/Delete members
   - Stored in localStorage
   - Base executives data को modifies करती है

---

## 🏗️ Technical Architecture

### Technology Stack:
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Excel Export**: XLSX library
- **State Management**: React Hooks (useState, useEffect, useMemo, useCallback)

### Key Hooks:
- `useDashboard`: Main dashboard logic, filtering, calculations
- `useState`: Component state management
- `useEffect`: Side effects (localStorage, timers)
- `useMemo`: Performance optimization (caching calculations)
- `useCallback`: Function memoization

### Key Files:

#### 1. **app/page.js**
- Main dashboard page
- Component arrangement
- Download logic
- Modal management

#### 2. **hooks/useDashboard.js**
- THE BRAIN of dashboard
- All filtering logic
- All calculations
- Data transformations
- Role-based access control

#### 3. **components/layout/**
- `DashboardHeader.jsx`: Top header with buttons
- `FilterBar.jsx`: Filter panel
- `ActiveFilters.jsx`: Active filters display
- `HeadlineBanner.jsx`: Performance summary
- `SectionNav.jsx`: Section navigation

#### 4. **components/sections/**
- `BrandProgress.jsx`: Company progress bar
- `KPICards.jsx`: KPI metrics display
- `TeamPerformance.jsx`: Team comparison
- `TLPerformance.jsx`: TL-wise performance
- `MemberTable.jsx`: Member list with CRUD
- `DailyData.jsx`: Date-wise collection
- `MonthlyTrend.jsx`: Monthly trend chart
- `AttentionPanel.jsx`: Low performance alerts

#### 5. **components/charts/**
- `TeamChart.jsx`: Team performance chart
- `TrendChart.jsx`: Trend line chart
- `TopChart.jsx`: Top performers chart

#### 6. **components/modals/**
- `SummaryModal.jsx`: Summary popup
- `ImportDialog.jsx`: CSV import dialog
- `AddMemberModal.jsx`: Add member form
- `EditMemberModal.jsx`: Edit member form
- `DeleteConfirmModal.jsx`: Delete confirmation

#### 7. **utils/**
- `calculations.js`: Business calculations (achievement, incentive, tier)
- `formatters.js`: Date and number formatting
- `excelExport.js`: Excel report generation
- `dataManager.js`: Member CRUD operations
- `importCsv.js`: CSV parsing and validation

#### 8. **data/**
- `tlData.js`: Team Leaders data (Shivani, Prabhleen)
- `executiveData.js`: Team Members data (12 members)
- `dailyData.js`: Daily collection records
- `dashboardData.js`: Brand settings, performance bands

---

## 📁 Folder Structure

```
loan-dashboard/
├── app/
│   ├── page.js                 # Main dashboard page
│   ├── layout.js               # Root layout with font
│   ├── globals.css             # Global styles
│   └── login/                  # Login page
│       └── page.js
├── components/
│   ├── layout/                 # Layout components
│   │   ├── DashboardHeader.jsx
│   │   ├── FilterBar.jsx
│   │   ├── ActiveFilters.jsx
│   │   ├── HeadlineBanner.jsx
│   │   └── SectionNav.jsx
│   ├── sections/               # Dashboard sections
│   │   ├── BrandProgress.jsx
│   │   ├── KPICards.jsx
│   │   ├── TeamPerformance.jsx
│   │   ├── TLPerformance.jsx
│   │   ├── MemberTable.jsx
│   │   ├── DailyData.jsx
│   │   ├── MonthlyTrend.jsx
│   │   ├── AttentionPanel.jsx
│   │   └── TeamTree.jsx
│   ├── charts/                 # Chart components
│   │   ├── TeamChart.jsx
│   │   ├── TrendChart.jsx
│   │   └── TopChart.jsx
│   ├── modals/                 # Modal dialogs
│   │   ├── SummaryModal.jsx
│   │   ├── ImportDialog.jsx
│   │   ├── AddMemberModal.jsx
│   │   ├── EditMemberModal.jsx
│   │   └── DeleteConfirmModal.jsx
│   └── ui/                     # Shared UI components
│       ├── Elements.jsx
│       └── index.js
├── hooks/
│   └── useDashboard.js         # Main dashboard hook
├── data/
│   ├── tlData.js               # Team Leaders data
│   ├── executiveData.js        # Team Members data
│   ├── dailyData.js            # Daily records
│   └── dashboardData.js        # Brand settings
├── utils/
│   ├── calculations.js         # Business calculations
│   ├── formatters.js           # Formatting utilities
│   ├── excelExport.js          # Excel export logic
│   ├── dataManager.js          # Member CRUD
│   └── importCsv.js            # CSV import
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 💡 Performance Bands & Tiers

### Achievement Tiers:
- **Top Performance**: ≥ 75% achievement
- **Average Performance**: ≥ 60% achievement
- **Low Performance**: < 60% achievement

### Incentive Slabs:
- Achievement based incentive calculation
- Eligible if achievement ≥ 60%
- Slabs defined in `data/dashboardData.js`

---

## 🔐 Security Features

1. **Authentication**
   - Login required
   - Role-based access control
   - Session management (localStorage)

2. **Role-Based Filtering**
   - Head: Full access
   - TL: Own team only
   - Executive: Own data only

3. **Audit Log**
   - Track all member changes
   - Before/after comparison
   - User and timestamp tracking

---

## 📝 Common Operations

### Add New Member:
1. Dashboard में "Add Member" button click करें
2. Form fill करें:
   - Name
   - Team Leader selection
   - Target amount
   - Contact details
3. Save करें

### Edit Member:
1. Member table में member पर click करें
2. Edit icon पर click करें
3. Details update करें
4. Save करें

### Delete Member:
1. Member table में member पर click करें
2. Delete icon पर click करें
3. Confirm deletion

### Import CSV Data:
1. Header में "Import Data" button click करें
2. CSV file select करें
3. Required columns: `date,userId,target,collected`
4. Optional columns: `contactedAccounts,connectedAccounts,ptpCount,ptpAmount,ptpKept,paidAccounts`
5. Upload करें

### Refresh Data:
- **Full Refresh**: Header में Refresh button
- **Section Refresh**: Individual section के refresh icon
- Auto-updates time stamps

---

## 🎨 Styling & Theme

### Brand Colors:
- **Primary**: Orange to Red gradient
- **Secondary**: Slate gray
- **Success**: Green (for high performance)
- **Warning**: Amber (for attention required)
- **Info**: Blue (for active filters)

### Font:
- **Primary**: Inter (Google Fonts)
- **Display**: Sans-serif

---

## 🐛 Troubleshooting

### Common Issues:

1. **Report में सिर्फ एक TL दिख रहा है:**
   - Filter में "All" select करें
   - TL dropdown को reset करें

2. **Data not updating:**
   - Refresh button click करें
   - Browser cache clear करें

3. **Login issues:**
   - LocalStorage clear करें
   - फिर से login करें

4. **CSV import failed:**
   - Column names check करें
   - Date format verify करें (YYYY-MM-DD या DD-MM-YYYY)
   - Required columns ensure करें

---

## 📞 Support

For issues or questions:
- Check `README.md` for basic setup
- Review code comments in files
- Check browser console for errors

---

## 🔄 Version History

### Latest Updates:
- **DRR Report Download**: Filter-based TL selection
- **Company Report**: Combined all TLs report
- **Individual TL Reports**: TL-wise download
- **Role-based Access**: Proper permission handling
- **Member CRUD**: Add/Edit/Delete functionality
- **Audit Log**: Track all changes
- **Excel Export**: Multi-sheet reports

---

## 📄 License

This is a proprietary dashboard for internal use.

---

**Last Updated**: October 22, 2026
**Version**: 4.2
