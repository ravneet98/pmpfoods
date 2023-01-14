#PMP Foods
https://pmpfoods.herokuapp.com/

#PMP Foods is a MERN stack based e-commerce website. This application consist of two modules Admin and Customer.

Customer can perform activities like
Sign/Signup,
View Products,
Buy Products, 
Review and Rate Products

Admin is responsible for managing all the data on the website. Admin key features are 
Insert/Update/Delete Prodcuts,
Update/Delete Users,
Manage Orders

Paypal API is used for Order Payment

API Sample
To view a single product 
https://pmpfoods.herokuapp.com/api/products/productid

Eg:
https://pmpfoods.herokuapp.com/api/products/616c1af2f42c6d4ae895aa49

.env file is used to Store environment variable in the root directory of the project
JWT_EXPIRE,
JWT_SECRET,
MONGO_URI,
NODE_ENV=development,
PAYPAL_CLIENT_ID,
PORT=5000,

Use the above key for environment varirables


To run this application 
1. Clone this repo.
2. Install all the node modules using 'npm install' then cd frontend use 'npm install'.
3 Use 'npm run dev' to run backend(:5000) and frontend(:3000).
