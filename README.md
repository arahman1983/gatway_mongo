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
        • Install dependencies using `npm i`
        • Run the project using `npm start`
        
### Change DB
        • you can use your own db by change .env file params ATLAS_URI

### Test APIs
        this app have two main routes :
        ``/gateways``
        - "/" method get : to get all gateways
        - "/add" method post: to add new gateway with required fields in body (serialNo:string, name:string, api:string)
        - "/update/:id" method put: to update specific gateway with required fields in body (serialNo:string, name:string, api:string) and id as params
        - "/:id" method delete: to delete specific gateway with id in params

        ``/peripheral``
        - "/" method get : to get all devices
        - "/add" method post: to add new device with required fields in body (vendor:string, UID:number, status:boolean)
        - "/update/:id" method put: to update specific device with required fields in body (vendor:string, UID:number, status:boolean) and id as params
        - "/:id" method delete: to delete specific device with id in params

##### the project demo is running on this [link](https://gatewayapis.herokuapp.com) 
