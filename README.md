# ehrecords-hyperledger-blockchain
## Electronic Health Records blockchain implemented using Hyperledger Fabric framework. (Computer Systems Engineering Final Year Project).

### Instructions to execute
* Check that you installed al the requirements of Hyperledger Fabric (https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html)
* Download the fabric-samples (Version 1.4.0) and copy the bin folder into the project.
* Install MongoDB (https://www.mongodb.com/)
* Define a .env file in the backend folder with the constants MONGODB_URI (uri of mongodb), SECRET (String that will be
  used for the JWT generation) and PORT (To run the server. Must be the same port that the one defined in REACT_APP_API_URL
  at the start script of the frontend - File: package.json).
  For example: PORT=4000 MONGODB_URI=mongodb://127.0.0.1:27017 SECRET='my_secret'
* Run the fabric network from the root directory with the command **./ehrNetwork.sh up**
* In /web-app/backend/ execute **npm run dev** to run the node.js server.
* In /web-app execute **npm start** to run the reactJS application.
* Run **GET /admin/** in the backend to enroll admin
* Run **GET /admin/register/{username}** to register any user
* In the frontend enroll user with the secret code
* Have fun!!
* **IMPORTANT: If you restart the server you need to cleanup the mongodb table of users.**
