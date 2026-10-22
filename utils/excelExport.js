import * as XLSX from 'xlsx';

/**
 * Download DRR Report
 * Format: Name, Pre Close, Grand Total, Paid, LEFT, ACH%
 * Creates separate sheet for each team
 */
export function downloadWhatsAppReport(tlData, periodLabel) {
  const wb = XLSX.utils.book_new();

  // Create separate sheet for each team
  tlData.forEach(tl => {
    const worksheetData = [];

    // Header
    worksheetData.push([`Daily Report - ${tl.name}`]);
    worksheetData.push([`Period: ${periodLabel}`]);
    worksheetData.push([`Date: ${new Date().toLocaleDateString('en-IN')}`]);
    worksheetData.push([]);

    // Columns
    worksheetData.push(['Name', 'Pre Close', 'Grand Total', 'Paid', 'LEFT', 'ACH%']);

    let grandTotalPreClose = 0;
    let grandTotalPaid = 0;
    let grandTotalLeft = 0;

    // Add member data
    tl.members.forEach(exec => {
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

    // Create worksheet for this team
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(wb, ws, tl.name);
  });

  // Download
  const fileName = `DRR_Report_${periodLabel.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
