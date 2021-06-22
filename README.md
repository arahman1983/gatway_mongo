# Gateway Management
This is REST services (JSON/HTTP) for storing information about gateways and their associated devices. 
This information must be stored in Mongodb collections

## Each gateway has these data
        • a unique serial number (string), 
        • human-readable name (string),
        • IPv4 address (to be validated),
        • multiple associated peripheral devices. 

## Each peripheral device has:
        • a UID (number),
        • vendor (string),
        • date created,
        • status - online/offline.

### Project running
        • Clone this repo using `git clone https://github.com/arahman1983/gatway_mongo.git`
        • Install dependancies using `npm i`
        • Run the project using `npm start`
        
### Change DB
        • you can use your own db by change .env file params ATLAS_URI
        
#### the project demo is running on this [link]() 
