import * as XLSX from 'xlsx';

/**
 * Generate WhatsApp-style simple report (Daily Report - DRR)
 * Format matches WhatsApp reports: Name, Pre Close, Grand Total, Paid, LEFT, ACH%
 * @param {Array} execRows - Executive data
 * @param {String} tlName - Team leader name for header
 * @param {String} periodLabel - Period label for filename
 */
export function downloadWhatsAppReport(execRows, tlName, periodLabel) {
  const worksheetData = [];

  // Header like WhatsApp report
  worksheetData.push([`Daily Report - ${tlName}`]);
  worksheetData.push([`Period: ${periodLabel}`]);
  worksheetData.push([`Date: ${new Date().toLocaleDateString('en-IN')}`]);
  worksheetData.push([]);

  // Columns matching WhatsApp format
  worksheetData.push(['Name', 'Pre Close', 'Grand Total', 'Paid', 'LEFT', 'ACH%']);

  let grandTotalPreClose = 0;
  let grandTotalPaid = 0;
  let grandTotalLeft = 0;

  // Add member data
  execRows.forEach(exec => {
    const preClose = exec.target || 0;
    const paid = exec.collected || 0;
    const left = preClose - paid;
    const ach = preClose > 0 ? (paid / preClose) * 100 : 0;

    grandTotalPreClose += preClose;
    grandTotalPaid += paid;
    grandTotalLeft += left;

    worksheetData.push([
      exec.name,
      preClose.toLocaleString('en-IN'),
      preClose.toLocaleString('en-IN'),
      paid.toLocaleString('en-IN'),
      left.toLocaleString('en-IN'),
      ach.toFixed(2) + '%'
    ]);
  });

  // Grand Total row
  worksheetData.push([]);
  worksheetData.push(['Grand Total', grandTotalPreClose.toLocaleString('en-IN'), grandTotalPreClose.toLocaleString('en-IN'), grandTotalPaid.toLocaleString('en-IN'), grandTotalLeft.toLocaleString('en-IN'), (grandTotalPreClose > 0 ? (grandTotalPaid / grandTotalPreClose) * 100 : 0).toFixed(2) + '%']);

  // Create workbook
  const ws = XLSX.utils.aoa_to_sheet(worksheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Daily Report');

  // Download
  const fileName = `DRR_${tlName.replace(/\s+/g, '_')}_${periodLabel.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

/**
 * Generate Excel report for day-wise collection
 * @param {Array} dailyData - Daily collection data
 * @param {Object} tlRows - Team leader data
 * @param {Object} execRows - Executive data
 * @param {String} periodLabel - Period label for filename
 */
export function downloadDaywiseReport(dailyData, tlRows, execRows, periodLabel) {
  const worksheetData = [];

  // Header
  worksheetData.push(['Date-wise Collection Report']);
  worksheetData.push([`Period: ${periodLabel}`]);
  worksheetData.push(['Date', 'Target', 'Collection', 'Remaining', 'Achievement %', 'Top Performer', 'Best Team Leader', 'Source']);

  // Add daily data
  dailyData.forEach(day => {
    worksheetData.push([
      day.date,
      day.target?.toLocaleString('en-IN') || 0,
      day.collected?.toLocaleString('en-IN') || 0,
      day.pending?.toLocaleString('en-IN') || 0,
      day.achievement?.toFixed(1) || 0,
      day.topMember || 'N/A',
      day.bestTL || 'N/A',
      day.importedCount > 0 ? 'Imported' : 'Historical'
    ]);
  });

  // Add member-wise breakdown for each date
  worksheetData.push([]);
  worksheetData.push(['Member-wise Daily Collection']);
  worksheetData.push(['Date', 'Member', 'Team Leader', 'Team', 'Target', 'Collection', 'Remaining', 'Achievement %']);

  // Group members by their team leader
  const membersByTL = {};
  execRows.forEach(exec => {
    if (!membersByTL[exec.tlId]) {
      membersByTL[exec.tlId] = [];
    }
    membersByTL[exec.tlId].push(exec);
  });

  // Add data for each date with all members
  const uniqueDates = [...new Set(dailyData.map(d => d.date))].sort();
  uniqueDates.forEach(date => {
    tlRows.forEach(tl => {
      const tlMembers = membersByTL[tl.id] || [];
      tlMembers.forEach(member => {
        worksheetData.push([
          date,
          member.name,
          tl.name,
          tl.team,
          member.target?.toLocaleString('en-IN') || 0,
          member.collected?.toLocaleString('en-IN') || 0,
          (member.target - member.collected)?.toLocaleString('en-IN') || 0,
          member.achievement?.toFixed(1) || 0
        ]);
      });
    });
  });

  // Create workbook
  const ws = XLSX.utils.aoa_to_sheet(worksheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Daywise Report');

  // Download
  const fileName = `Daywise_Collection_${periodLabel.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

/**
 * Generate Excel report for month-wise collection by team
 * @param {Array} tlRows - Team leader data
 * @param {Array} execRows - Executive data
 * @param {String} periodLabel - Period label for filename
 */
export function downloadMonthwiseReport(tlRows, execRows, periodLabel) {
  const worksheetData = [];

  // Header
  worksheetData.push(['Month-wise Collection Report']);
  worksheetData.push([`Period: ${periodLabel}`]);
  worksheetData.push(['Team', 'Team Leader', 'Team Size', 'Target', 'Collection', 'Remaining', 'Achievement %', 'Incentive', 'Status']);

  // Add team data
  tlRows.forEach(tl => {
    worksheetData.push([
      tl.team,
      tl.name,
      tl.teamSize,
      tl.target?.toLocaleString('en-IN') || 0,
      tl.collected?.toLocaleString('en-IN') || 0,
      tl.pending?.toLocaleString('en-IN') || 0,
      tl.achievement?.toFixed(1) || 0,
      tl.eligible ? tl.incentive?.toLocaleString('en-IN') || 0 : 'Not Eligible',
      tl.status || 'N/A'
    ]);
  });

  // Add member data
  worksheetData.push([]);
  worksheetData.push(['Member-wise Collection']);
  worksheetData.push(['Member', 'Team Leader', 'Team', 'Target', 'Collection', 'Remaining', 'Achievement %', 'Incentive', 'Status']);

  execRows.forEach(exec => {
    worksheetData.push([
      exec.name,
      exec.tlName,
      exec.tlName,
      exec.target?.toLocaleString('en-IN') || 0,
      exec.collected?.toLocaleString('en-IN') || 0,
      (exec.target - exec.collected)?.toLocaleString('en-IN') || 0,
      exec.achievement?.toFixed(1) || 0,
      exec.eligible ? exec.incentive?.toLocaleString('en-IN') || 0 : 'Not Eligible',
      exec.achievement >= 75 ? 'Top' : exec.achievement >= 60 ? 'Average' : 'Low'
    ]);
  });

  // Create workbook
  const ws = XLSX.utils.aoa_to_sheet(worksheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Monthwise Report');

  // Download
  const fileName = `Monthwise_Collection_${periodLabel.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
