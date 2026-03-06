/**
 * LEXARA - BUSINESS LOGIC AND UI INTERACTIONS
 * This file handles tab switching, role toggling, and dynamic report generation.
 */

/**
 * Switches between the main navigation tabs (Client Info, Case Details, Report).
 * @param {string} tabId - The ID of the tab content div to display.
 */
function switchTab(tabId) {
    // 1. Update the visual state of the tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        // Match button text to the tab ID to find which button to activate
        if (btn.textContent.toLowerCase().includes(tabId.split('-')[0])) {
            btn.classList.add('active');
        }
    });

    // 2. Hide all tab content sections and show only the requested one
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

/**
 * Manages the UI transition when toggling between Plaintiff and Defendant roles.
 * Adjusts colors, labels, and visible input sections.
 */
function toggleCaseType() {
    // Get state of the checkbox toggle
    const isDefendant = document.getElementById('case-type-toggle').checked;

    // Get references to role-specific containers
    const plaintiffDiv = document.getElementById('case-plaintiff');
    const defendantDiv = document.getElementById('case-defendant');

    // Get references to role labels for color highlighting
    const labelP = document.getElementById('label-plaintiff');
    const labelD = document.getElementById('label-defendant');

    if (isDefendant) {
        // Transition to DEFENDANT view
        plaintiffDiv.classList.remove('active');
        defendantDiv.classList.add('active');

        // Highlight Defendant label in Purple
        labelD.style.color = 'var(--accent-purple)';
        labelD.style.fontWeight = '600';

        // Dim Plaintiff label
        labelP.style.color = 'var(--text-muted)';
        labelP.style.fontWeight = '400';
    } else {
        // Transition to PLAINTIFF view
        plaintiffDiv.classList.add('active');
        defendantDiv.classList.remove('active');

        // Highlight Plaintiff label in Blue
        labelP.style.color = 'var(--accent-blue)';
        labelP.style.fontWeight = '600';

        // Dim Defendant label
        labelD.style.color = 'var(--text-muted)';
        labelD.style.fontWeight = '400';
    }
}

/**
 * Collects all form data and generates a professional HTML report.
 * Automatically switches the view to the 'Report' tab upon completion.
 */
function generateReport() {
    // 1. Data Collection: Gather values from Client Information fields
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const dob = document.getElementById('dob').value;

    // 2. Logic: Determine the current role and associated case details
    const isDefendant = document.getElementById('case-type-toggle').checked;
    const keywords = document.getElementById('keywords').value;

    // Conditional logic to pick the correct textarea based on chosen role
    const caseDetails = isDefendant ?
        document.getElementById('defendant-details').value :
        document.getElementById('plaintiff-details').value;

    const typeLabel = isDefendant ? "DEFENDANT" : "PLAINTIFF";

    // 3. Template Generation: Construct the report HTML structure
    const reportHtml = `
        <h2 style="text-align: center; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px;">
            Lexara Case Report
        </h2>
        
        <!-- Metadata Grid: Displays high-level info side-by-side -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
            <div>
                <strong style="color: var(--accent-blue); display: block; margin-bottom: 5px;">Client Information</strong>
                <p>Name: ${firstName} ${lastName}</p>
                <p>DOB: ${dob}</p>
            </div>
            <div>
                <strong style="color: var(--accent-purple); display: block; margin-bottom: 5px;">Case Metadata</strong>
                <p>Role: ${typeLabel}</p>
                <p>Keywords: ${keywords || 'None'}</p>
            </div>
        </div>

        <!-- Statement Section: Large text area for the case narrative -->
        <div style="margin-top: 20px;">
            <strong style="display: block; margin-bottom: 10px; font-size: 1.1rem;">Detailed Case Statement:</strong>
            <p style="white-space: pre-wrap; background: rgba(0,0,0,0.02); padding: 20px; border-radius: 8px; font-style: italic;">
                ${caseDetails || 'No details provided.'}
            </p>
        </div>

        <!-- Footer: Professional sign-off with generation date -->
        <p style="margin-top: 40px; font-size: 0.8rem; color: var(--text-muted); text-align: center; border-top: 1px solid #eee; pt: 10px;">
            This document was automatically generated via Lexara Legal Management System on ${new Date().toLocaleDateString()}
        </p>
    `;

    // 4. Output: Inject the generated HTML into the report container
    document.getElementById('report-output').innerHTML = reportHtml;

    // 5. Navigation: Redirect the user to the report tab to see the result
    switchTab('report');
}
