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

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd RuleEngine
Navigate to the backend directory:

bash
Copy code
cd backend
Install the required packages:

bash
Copy code
npm install
Set up the MongoDB database. You can either use a local MongoDB instance or MongoDB Atlas.

Create a .env file in the backend directory with the following content:

plaintext
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ruleEngine
Start the server:

bash
Copy code
node server.js
Open index.html in your browser to access the frontend.

Frontend
The frontend consists of three files:

index.html: The main HTML file that provides the user interface for rule creation, combination, and evaluation.
index.js: The JavaScript file handling user interactions, sending requests to the backend, and validating inputs.
style.css: The CSS file that styles the user interface.
Frontend Functionalities
Create Rule: Users can input a rule string (e.g., 'age > 30 AND salary < 70000') and create a rule.
Combine Rules: Users can combine multiple rules into a single rule using logical operators (AND/OR).
Evaluate Rule: Users can input an AST rule JSON and a data dictionary to evaluate the rule against the provided data.
Backend
The backend consists of several components:

helpers/ast.js: Contains helper functions for creating and evaluating the AST from rule strings.
models/Node.js: Defines the schema for storing the AST in MongoDB.
routes/rules.js: Defines API endpoints for creating, combining, and evaluating rules.
server.js: The main server file that initializes the Express app and connects to MongoDB.
Backend Functionalities
Create Rule: The /create_rule endpoint accepts a rule string, converts it into an AST, and stores it in the MongoDB database.
Combine Rules: The /combine_rules endpoint combines multiple rules into a single AST and stores it.
Evaluate Rule: The /evaluate_rule endpoint evaluates an AST against a data dictionary and returns the result.
API Endpoints
POST /rules/create_rule: Create a rule and store the AST.
POST /rules/combine_rules: Combine multiple rules into one AST.
POST /rules/evaluate_rule: Evaluate a rule from JSON AST and data.
How It Works
The user interacts with the frontend by creating rules, combining them, and evaluating them based on provided data.
The frontend sends requests to the backend API, which processes the rules, converts them into ASTs, and stores them in the MongoDB database.
The evaluation returns whether the conditions defined in the rules are satisfied based on the provided data.
