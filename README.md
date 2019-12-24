# ehrecords-hyperledger-blockchain
## Electronic Health Records blockchain implemented using Hyperledger Fabric framework. (0Computer Systems Engineering Final Year Project).

### Instructions to execute
* Check that you installed al the requirements of Hyperledger Fabric (https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html)
* Install MongoDB (https://www.mongodb.com/)
* Run the fabric network from the root directory with the command **./ehrNetwork.sh up**
* In /web-app/backend/ execute **npm run dev** to run the node.js server.
* In /web-app execute **npm start** to run the reactJS application.
* Run **GET /admin/** in the backend to enroll admin
* Run **GET /admin/register/{username}** to register any user
* In the frontend enroll user with the secret code
* Have fun!!
* **IMPORTANT: If you restart the server you need to cleanup the mongodb table of users.**
