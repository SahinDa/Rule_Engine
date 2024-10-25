Rule Engine
This project is a simple Rule Engine that allows users to create, combine, and evaluate rules based on provided data. It consists of a backend built with Node.js and Express, and a frontend built with HTML, CSS, and JavaScript.

# Rule Engine

## File Structure

```plaintext
rule-engine/
├── backend/
│   ├── helpers/
│   │   └── ast.js            # Helper functions for AST processing
│   ├── models/
│   │   └── Node.js           # Mongoose schema for storing AST
│   ├── routes/
│   │   └── rules.js          # Express routes for rule operations
│   └── server.js             # Main server file for backend
└── frontend/
    ├── index.html            # Main HTML file for the frontend interface
    ├── index.js              # JavaScript file for handling frontend logic
    └── style.css             # CSS file for styling the frontend


```
## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- HTML/CSS/JavaScript

## Getting Started

### Install Required Packages

To install the necessary packages for the backend, run the following command:

```bash
npm install

### Frontend
## The frontend consists of three files:

- index.html: The main HTML file that provides the user interface for rule creation, combination, and evaluation.<br>
- index.js: The JavaScript file handling user interactions, sending requests to the backend, and validating inputs.<br>
- style.css: The CSS file that styles the user interface.<br>
##  Frontend Functionalities
- Create Rule: Users can input a rule string (e.g., 'age > 30 AND salary < 70000') and create a rule.<br>
- Combine Rules: Users can combine multiple rules into a single rule using logical operators (AND/OR).<br>
- Evaluate Rule: Users can input an AST rule JSON and a data dictionary to evaluate the rule against the provided data.<br>
### Backend
## The backend consists of several components:

- helpers/ast.js: Contains helper functions for creating and evaluating the AST from rule strings.<br>
- models/Node.js: Defines the schema for storing the AST in MongoDB.<br>
- routes/rules.js: Defines API endpoints for creating, combining, and evaluating rules.<br>
- server.js: The main server file that initializes the Express app and connects to MongoDB.<br>
## Backend Functionalities
- Create Rule: The /create_rule endpoint accepts a rule string, converts it into an AST, and stores it in the MongoDB database.<br>
- Combine Rules: The /combine_rules endpoint combines multiple rules into a single AST and stores it.<br>
- Evaluate Rule: The /evaluate_rule endpoint evaluates an AST against a data dictionary and returns the result.<br>
## API Endpoints
- POST /rules/create_rule: Create a rule and store the AST.<br>
- POST /rules/combine_rules: Combine multiple rules into one AST.<br>
- POST /rules/evaluate_rule: Evaluate a rule from JSON AST and data.<br>
## How It Works
- The user interacts with the frontend by creating rules, combining them, and evaluating them based on provided data. <br>
- The frontend sends requests to the backend API, which processes the rules, converts them into ASTs, and stores them in the MongoDB database.<br>
- The evaluation returns whether the conditions defined in the rules are satisfied based on the provided data.<br>
