function switchTab(tabId) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(tabId.split('-')[0])) {
            btn.classList.add('active');
        }
    });

    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

function toggleCaseType() {
    const isDefendant = document.getElementById('case-type-toggle').checked;
    const plaintiffDiv = document.getElementById('case-plaintiff');
    const defendantDiv = document.getElementById('case-defendant');
    const labelP = document.getElementById('label-plaintiff');
    const labelD = document.getElementById('label-defendant');

    if (isDefendant) {
        plaintiffDiv.classList.remove('active');
        defendantDiv.classList.add('active');
        labelD.style.color = 'var(--accent-purple)';
        labelD.style.fontWeight = '600';
        labelP.style.color = 'var(--text-muted)';
        labelP.style.fontWeight = '400';
    } else {
        plaintiffDiv.classList.add('active');
        defendantDiv.classList.remove('active');
        labelP.style.color = 'var(--accent-blue)';
        labelP.style.fontWeight = '600';
        labelD.style.color = 'var(--text-muted)';
        labelD.style.fontWeight = '400';
    }
}

function generateReport() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const dob = document.getElementById('dob').value;
    const isDefendant = document.getElementById('case-type-toggle').checked;
    const keywords = document.getElementById('keywords').value;

    const caseDetails = isDefendant ?
        document.getElementById('defendant-details').value :
        document.getElementById('plaintiff-details').value;

    const typeLabel = isDefendant ? "DEFENDANT" : "PLAINTIFF";

    const reportHtml = `
        <h2 style="text-align: center; border-bottom: 2px solid var(--glass-border); padding-bottom: 10px; margin-bottom: 20px;">
            Lexara Case Report
        </h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
            <div>
                <strong style="color: var(--accent-blue);">Client Information</strong>
                <p>Name: ${firstName} ${lastName}</p>
                <p>DOB: ${dob}</p>
            </div>
            <div>
                <strong style="color: var(--accent-purple);">Case Metadata</strong>
                <p>Role: ${typeLabel}</p>
                <p>Keywords: ${keywords || 'None'}</p>
            </div>
        </div>
        <div style="margin-top: 20px;">
            <strong style="display: block; margin-bottom: 10px;">Detailed Case Statement:</strong>
            <p style="white-space: pre-wrap; background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px;">
                ${caseDetails || 'No details provided.'}
            </p>
        </div>
        <p style="margin-top: 40px; font-size: 0.8rem; color: var(--text-muted); text-align: center;">
            Generated via Lexara Legal Management System - ${new Date().toLocaleDateString()}
        </p>
    `;

    document.getElementById('report-output').innerHTML = reportHtml;
    switchTab('report');
}
