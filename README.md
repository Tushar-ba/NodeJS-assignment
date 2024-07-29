Node Wallet 
- git clone https://github.com/Tushar-ba/NodeJS-assignment
- npm install it install the dependencies
- npm start to start the server
- Use postman to test out the API's   live link  https://nodejs-assignment-tushar.onrender.com
- https://nodejs-assignment-tushar.onrender.com/api/users/registerUser  (to register new users)
- https://nodejs-assignment-tushar.onrender.com/api/users/loginUserr (to login)
- https://nodejs-assignment-tushar.onrender.com/api/users/getUserBalance (to fetch user balance)
- https://nodejs-assignment-tushar.onrender.com/api/users/transferBalance (to transfer balance using email id)
- https://nodejs-assignment-tushar.onrender.com/api/users/getTransactionDetails (to fetch transaction history admins only)
- https://nodejs-assignment-tushar.onrender.com/api/users/registerAdmin  (for admin registration)
- https://nodejs-assignment-tushar.onrender.com/api/users/getUserTransaction (to get logged in user balance)

Post man https://documenter.getpostman.com/view/36461517/2sA3kaCyfL


to run locally create .env file in root directory and add these fields 
- PORT = 5000
- MONGO_URI="Your mongo atlas uri"
- EMAIL_USER="mail id from which you have to send the email"
- EMAIL_PASS= "app code of the mail id"
- BASE_URL=http://localhost:5000
- JWT_SECRET=" your secret code"

