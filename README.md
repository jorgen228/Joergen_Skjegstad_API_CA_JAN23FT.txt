# REST API - Course Assignment

# Application Installation and Usage Instructions

To set up the application:

1. Create a database in mysql named "myTodo".

2. Run the command: "npm install" to get the required dependencies.

3. Start the application using "npm start".

4. To test the application, run the command: "npm test".

# Environment Variables

The variables that are needed are the following:
PORT
HOST
ADMIN_USERNAME
ADMIN_PASSWORD
DATABASE_NAME
DIALECT
TOKEN_SECRET

To get the token secret, rund the command "node" in the ternimal followed by this command:

require('crypto').randomBytes(64).toString('hex')

This commant will return an encryption string, copy this and paste is as the TOKEN_SECRET.

# Additional Libraries/Packages

No additional libraries or packages are nessecary.

# NodeJS Version Used

NodeJS version: v16.17.0

# POSTMAN Documentation link

https://documenter.getpostman.com/view/25198376/2s93XtzjzF
