// Helper functions for AST processing

// Create AST from rule string
async function createRuleAST(ruleString) {
    const parts = ruleString.match(/(.*?)(AND|OR)(.*)/);
    if (!parts) {
        return createOperandNode(ruleString.trim());
    }

    const leftCondition = parts[1].trim();
    const operator = parts[2].trim();
    const rightCondition = parts[3].trim();

    const leftNode = await createRuleAST(leftCondition);
    const rightNode = await createRuleAST(rightCondition);

    return {
        type: 'operator',
        value: operator,
        left: leftNode,
        right: rightNode
    };
}

// Combine multiple rules into a single AST
async function combineRulesAST(ruleStrings) {
    if (!Array.isArray(ruleStrings) || ruleStrings.length === 0) return null;

    const operatorCount = { AND: 0, OR: 0 };
    const asts = [];

    for (const rule of ruleStrings) {
        const parts = rule.match(/(.*?)(AND|OR)(.*)/);
        if (parts) {
            operatorCount[parts[2].trim()]++;
            asts.push(await createRuleAST(rule.trim()));
        } else {
            asts.push(createOperandNode(rule.trim()));
        }
    }

    const mainOperator = operatorCount.AND >= operatorCount.OR ? 'AND' : 'OR';

    let combinedAst = asts[0];
    for (let i = 1; i < asts.length; i++) {
        combinedAst = {
            type: 'operator',
            value: mainOperator,
            left: combinedAst,
            right: asts[i]
        };
    }
    return combinedAst;
}

// Create an operand node for simple conditions
function createOperandNode(condition) {
    return {
        type: 'operand',
        value: condition
    };
}

// Evaluate AST based on given data
function evaluateAST(node, data) {
    if (!node) return false;

    if (node.type === 'operand') {
        const [field, operator, value] = node.value.split(' ');
        const dataValue = data[field];

        if (dataValue === undefined) return false;

        switch (operator) {
            case '>':
                return dataValue > parseInt(value);
            case '<':
                return dataValue < parseInt(value);
            case '=':
                return dataValue == value;
            default:
                return false;
        }
    } else if (node.type === 'operator') {
        const leftResult = evaluateAST(node.left, data);
        const rightResult = evaluateAST(node.right, data);
        return node.value === 'AND' ? leftResult && rightResult : leftResult || rightResult;
    }
    return false;
}


module.exports = { createRuleAST, combineRulesAST, evaluateAST };
