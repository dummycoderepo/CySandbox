const fs = require('fs');
const path = require('path');
const glob = require('glob');

class ResultProcessor {
    constructor(jsonFilePath) {
        this.jsonFilePath = jsonFilePath;
        this.results = null;
    }

    static mergeMochawesomeReports(resultsDir) {
        const jsonFiles = glob.sync(path.join(resultsDir, 'mochawesome_*.json'));
        if (jsonFiles.length === 0) {
            console.log('No mochawesome_*.json files found to merge');
            return null;
        }

        let mergedReport = {
            stats: {
                suites: 0,
                tests: 0,
                passes: 0,
                pending: 0,
                failures: 0,
                duration: 0,
                testsRegistered: 0,
                passPercent: 0,
                pendingPercent: 0,
                other: 0,
                hasOther: false,
                skipped: 0,
                hasSkipped: false
            },
            results: [],
            meta: null
        };

        jsonFiles.forEach(file => {
            const content = JSON.parse(fs.readFileSync(file, 'utf8'));
            
            // Merge stats
            mergedReport.stats.suites += content.stats.suites;
            mergedReport.stats.tests += content.stats.tests;
            mergedReport.stats.passes += content.stats.passes;
            mergedReport.stats.pending += content.stats.pending;
            mergedReport.stats.failures += content.stats.failures;
            mergedReport.stats.duration += content.stats.duration;
            mergedReport.stats.testsRegistered += content.stats.testsRegistered;
            mergedReport.stats.other += content.stats.other;
            mergedReport.stats.skipped += content.stats.skipped;
            
            // Merge results
            mergedReport.results = mergedReport.results.concat(content.results);
            
            // Keep the meta information from the last file
            mergedReport.meta = content.meta;
        });

        // Calculate percentages
        mergedReport.stats.passPercent = Math.round((mergedReport.stats.passes / mergedReport.stats.testsRegistered * 100)) || 0;
        mergedReport.stats.pendingPercent = Math.round((mergedReport.stats.pending / mergedReport.stats.testsRegistered * 100)) || 0;
        mergedReport.stats.hasOther = mergedReport.stats.other > 0;
        mergedReport.stats.hasSkipped = mergedReport.stats.skipped > 0;

        // Write merged report
        const outputPath = path.join(resultsDir, 'combined.json');
        fs.writeFileSync(outputPath, JSON.stringify(mergedReport, null, 2));
        console.log(`Merged report saved to: ${outputPath}`);
        return outputPath;
    }

    processResults() {
        const rawData = fs.readFileSync(this.jsonFilePath, 'utf8');
        this.results = JSON.parse(rawData);
        
        const stats = this.results.stats;
        const testResults = this.results.results;
        
        return {
            summary: {
                total: stats.tests,
                passes: stats.passes,
                failures: stats.failures,
                pending: stats.pending,
                duration: stats.duration,
                passPercent: Math.round(stats.passPercent)
            },
            testDetails: this.extractTestDetails(testResults)
        };
    }

    extractTestDetails(results) {
        const details = [];
        
        const processTests = (tests) => {
            tests.forEach(test => {
                details.push({
                    title: test.title,
                    fullTitle: test.fullTitle,
                    duration: test.duration,
                    state: test.state || (test.fail ? 'failed' : 'passed'),
                    error: test.err && (test.err.message || JSON.stringify(test.err))
                });
            });
        };
        
        results.forEach(suite => {
            // Handle tests directly in the suite
            if (suite.tests && suite.tests.length > 0) {
                processTests(suite.tests);
            }
            
            // Handle tests in nested suites
            if (suite.suites && suite.suites.length > 0) {
                suite.suites.forEach(nestedSuite => {
                    if (nestedSuite.tests && nestedSuite.tests.length > 0) {
                        processTests(nestedSuite.tests);
                    }
                });
            }
        });

        return details;
    }

    generateHTML() {
        const data = this.processResults();
        const templatePath = path.join(__dirname, 'template.html');
        let template = fs.readFileSync(templatePath, 'utf8');

        // Replace placeholders with actual data
        template = template.replace('{{TOTAL_TESTS}}', data.summary.total)
            .replace('{{PASS_PERCENT}}', data.summary.passPercent)
            .replace('{{DURATION}}', (data.summary.duration / 1000).toFixed(2))
            .replace('{{TEST_DATA}}', JSON.stringify(data))
            .replace('{{TIMESTAMP}}', new Date().toLocaleString());

        // Write the generated HTML
        const outputPath = path.join(__dirname, 'dashboard.html');
        fs.writeFileSync(outputPath, template);
        return outputPath;
    }
}

module.exports = ResultProcessor;