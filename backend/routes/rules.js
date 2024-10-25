const express = require('express');
const router = express.Router();
const { createRuleAST, combineRulesAST, evaluateAST } = require('../helpers/ast');
const Node = require('../models/Node');

// POST /create_rule - Create a rule and store AST in MongoDB
router.post('/create_rule', async (req, res) => {
    try {
        const { ruleString } = req.body;
        const ast = await createRuleAST(ruleString);

        // Check if the same AST already exists in the database
        const existingRule = await Node.findOne(ast);
        if (existingRule) {
            return res.status(400).json({ message: 'Rule already exists' });
        }

        // Save the AST in the database
        const newNode = new Node(ast);
        await newNode.save();

        res.json({ message: 'Rule created successfully!', ast: newNode });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating rule', error: error.message });
    }
});


// POST /combine_rules - Combine multiple rules into one AST
router.post('/combine_rules', async (req, res) => {
    try {
        const { ruleStrings } = req.body;
        const combinedAst = await combineRulesAST(ruleStrings);

        // Save the combined AST in the database
        const newNode = new Node(combinedAst);
        await newNode.save();

        res.json({ message: 'Combined rules saved successfully!', ast: newNode });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error combining rules', error: error.message });
    }
});

// POST /evaluate_rule - Evaluate a rule from JSON AST and data
router.post('/evaluate_rule', async (req, res) => {
    try {
        const { ast, data } = req.body; // Expecting AST JSON and data dictionary

        // Check for required inputs
        if (!ast || !data) {
            return res.status(400).json({ message: 'AST and data are required' });
        }

        const result = evaluateAST(ast, data); // Evaluate the AST against the data
        res.json({ result }); // Return the evaluation result
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error evaluating rule', error: error.message });
    }
});


module.exports = router;
