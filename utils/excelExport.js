import * as XLSX from 'xlsx';

/**
 * Download DRR Report for all teams in one file
 * Format: Name, Pre Close, Grand Total, Paid, LEFT, ACH%
 * Creates separate sheet for each team + one combined sheet with all teams
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

  // Create combined sheet with all teams
  if (tlData.length > 1) {
    const combinedData = [];

    // Header
    combinedData.push(['Combined DRR Report - All Teams']);
    combinedData.push([`Period: ${periodLabel}`]);
    combinedData.push([`Date: ${new Date().toLocaleDateString('en-IN')}`]);
    combinedData.push([]);

    // Columns
    combinedData.push(['Team Leader', 'Name', 'Pre Close', 'Grand Total', 'Paid', 'LEFT', 'ACH%']);

    let overallTotalPreClose = 0;
    let overallTotalPaid = 0;
    let overallTotalLeft = 0;

    // Add all members from all teams
    tlData.forEach(tl => {
      // Add team header
      combinedData.push([]);
      combinedData.push([`Team: ${tl.name}`]);

      tl.members.forEach(exec => {
        const preClose = exec.target || 0;
        const paid = exec.collected || 0;
        const left = preClose - paid;
        const ach = preClose > 0 ? (paid / preClose) * 100 : 0;

        overallTotalPreClose += preClose;
        overallTotalPaid += paid;
        overallTotalLeft += left;

        combinedData.push([
          tl.name,
          exec.name,
          preClose.toLocaleString('en-IN'),
          preClose.toLocaleString('en-IN'),
          paid.toLocaleString('en-IN'),
          left.toLocaleString('en-IN'),
          ach.toFixed(2) + '%'
        ]);
      });
    });

    // Overall Grand Total row
    combinedData.push([]);
    combinedData.push(['OVERALL GRAND TOTAL', '', overallTotalPreClose.toLocaleString('en-IN'), overallTotalPreClose.toLocaleString('en-IN'), overallTotalPaid.toLocaleString('en-IN'), overallTotalLeft.toLocaleString('en-IN'), (overallTotalPreClose > 0 ? (overallTotalPaid / overallTotalPreClose) * 100 : 0).toFixed(2) + '%']);

    // Create combined worksheet
    const combinedWs = XLSX.utils.aoa_to_sheet(combinedData);
    XLSX.utils.book_append_sheet(wb, combinedWs, 'Combined_All_Teams');
  }

  // Download
  const fileName = `DRR_Report_${periodLabel.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
