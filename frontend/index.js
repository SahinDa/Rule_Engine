// Function for handling fetch requests
async function handleFetch(url, method, body) {
    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json', 'Authorization': 'your_secret_token' },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

// Function to validate operators in the rule string
function isValidOperator(ruleString) {
    const validOperators = ['>', '<', '>=', '<=', '=', '!='];
    const operatorsPattern = /(\b\w+\s*[><=!]=?\s*\d+\b)/g; // Matches valid conditions
    const matches = ruleString.match(operatorsPattern);
    return matches && matches.length > 0; // Ensure at least one valid condition is found
}

// Create Rule
document.getElementById('createRuleButton').addEventListener('click', async () => {
    const ruleString = document.getElementById('ruleStringInput').value.trim();
    if (!ruleString) {
        alert("Rule string cannot be empty!");
        return;
    }

    // Validate operators
    if (!isValidOperator(ruleString)) {
        alert("Invalid operators used in the rule string!");
        return;
    }

    // Validate the rule structure
    const hasOperator = ruleString.includes('AND') || ruleString.includes('OR');
    const parts = ruleString.split(/AND|OR/).map(part => part.trim());

    if (hasOperator) {
        // Check if both sides of the operator are present
        if (parts.length < 2 || parts.some(part => !part)) {
            alert("Both sides of the AND/OR operation must be complete!");
            return;
        }
    } else {
        // Single condition must be complete
        if (parts.length !== 1 || !parts[0]) {
            alert("Single rule must be complete!");
            return;
        }
    }

    const result = await handleFetch('http://localhost:3000/rules/create_rule', 'POST', { ruleString });
    document.getElementById('createRuleResult').textContent = JSON.stringify(result, null, 2);
});

// Combine Rules
document.getElementById('combineRuleButton').addEventListener('click', async () => {
    const ruleStrings = document.getElementById('combineRulesInput').value.trim().split('\n').filter(Boolean);
    
    // Ensure at least two rules are present
    if (ruleStrings.length < 2) {
        alert("At least two rules are required to combine!");
        return;
    }

    // Validate that there is at least one AND/OR operator
    const hasOperator = ruleStrings.some(rule => rule.includes('AND') || rule.includes('OR'));
    if (!hasOperator) {
        alert("At least one rule must contain AND/OR operator for combining!");
        return;
    }

    // Validate each rule for completeness and operators
    for (const rule of ruleStrings) {
        // Validate operators
        if (!isValidOperator(rule)) {
            alert(`Invalid operators used in the rule: '${rule}'!`);
            return;
        }

        const parts = rule.split(/AND|OR/).map(part => part.trim());
        if (parts.length < 2 || parts.some(part => !part)) {
            alert(`Rule '${rule}' must have both sides of the AND/OR operation complete!`);
            return;
        }
    }

    const combinedResult = await handleFetch('http://localhost:3000/rules/combine_rules', 'POST', { ruleStrings });
    document.getElementById('combineRuleResult').textContent = JSON.stringify(combinedResult, null, 2);
});

// Evaluate Rule
document.getElementById('evaluateRuleButton').addEventListener('click', async () => {
    try {
        const ast = JSON.parse(document.getElementById('evaluateRuleInput').value); // Get the AST JSON directly
        const data = JSON.parse(document.getElementById('evaluateDataInput').value);
        
        // Sending AST and data in the request body
        const result = await handleFetch('http://localhost:3000/rules/evaluate_rule', 'POST', { ast, data });
        
        document.getElementById('evaluateRuleResult').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('evaluateRuleResult').textContent = 'Error: ' + error.message;
    }
});
