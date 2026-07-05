models:
User
Restaurant
MenuItem
Cart
Order
Payment

🔐 1️⃣ AUTH APIs
Register User

POST /api/auth/register

Login User

POST /api/auth/login

Logout User

POST /api/auth/logout

Get Current User

GET /api/auth/me

Update Profile

PUT /api/auth/update-profile

<!-- Change Password

PUT /api/auth/change-password -->

<!-- 👤 2️⃣ USER APIs (Admin)
Get All Users

GET /api/users

Get Single User

GET /api/users/:id

Update User Role

PUT /api/users/:id/role

Delete User

DELETE /api/users/:id -->

🏪 3️⃣ RESTAURANT APIs
Create Restaurant (Admin)

POST /api/restaurants

Get All Restaurants

GET /api/restaurants

Get Restaurant by ID

GET /api/restaurants/:id

Update Restaurant

PUT /api/restaurants/:id

Delete Restaurant

DELETE /api/restaurants/:id

Search Restaurants

GET /api/restaurants?search=pizza

Filter by Category

GET /api/restaurants?category=veg

🍔 4️⃣ MENU ITEM APIs
Create Menu Item

POST /api/menu

Get All Menu Items

GET /api/menu

Get Menu Items by Restaurant

GET /api/restaurants/:id/menu

Get Single Menu Item

GET /api/menu/:id

Update Menu Item

PUT /api/menu/:id

Delete Menu Item

DELETE /api/menu/:id

🛒 5️⃣ CART APIs
Get User Cart

GET /api/cart

Add Item to Cart

POST /api/cart

Update Cart Item Quantity

PUT /api/cart/:menuItemId

Remove Item from Cart

DELETE /api/cart/:menuItemId

Clear Cart

DELETE /api/cart

📦 6️⃣ ORDER APIs
Place Order

POST /api/orders

Get My Orders

GET /api/orders

Get Single Order

GET /api/orders/:id

Cancel Order

PUT /api/orders/:id/cancel

🏢 7️⃣ ORDER MANAGEMENT (Admin)
Get All Orders

GET /api/admin/orders

Update Order Status

PUT /api/admin/orders/:id/status

💳 8️⃣ PAYMENT APIs (Optional Advanced)
Create Payment

POST /api/payments/create

Verify Payment

POST /api/payments/verify

Get Payment Details

GET /api/payments/:id

⭐ BONUS (Recommended Advanced APIs)
Add Review

POST /api/reviews

Get Restaurant Reviews

GET /api/restaurants/:id/reviews

Add to Favorites

POST /api/favorites

Get Favorites

GET /api/favorites

🔥 Recommended Build Order

1️⃣ Auth
2️⃣ Restaurant
3️⃣ Menu
4️⃣ Cart
5️⃣ Order
6️⃣ Payment