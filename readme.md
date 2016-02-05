# Poling App

## Installation
1. Download the repository
2. Install npm modules: `npm install`
3. Install bower dependencies `bower install`
4. Start up the server: `nodemon server.js`
5. View in browser at http://localhost:8080

## Database

- Admins
    - email
    - password
    - name
- Polls
    - title
    - status: enabled|disabled
- PollOptions
    - poll_id
    - title
- Voters
    - name
    - email
    - ip_address
- Votes
    - voter_id
    - poll_id
    - option_id
    
