const path = require('path');
const ResultProcessor = require('./ResultProcessor');

// First merge all reports
const resultsDir = path.join(__dirname, '..', 'results');
const combinedReportPath = ResultProcessor.mergeMochawesomeReports(resultsDir);

if (combinedReportPath) {
    // Generate dashboard using the combined report
    const processor = new ResultProcessor(combinedReportPath);
    const dashboardPath = processor.generateHTML();
    console.log(`Report generated successfully at: ${dashboardPath}`);
} else {
    console.error('No reports were found to process');
}