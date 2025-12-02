# 🔗 Shortlink Express API

**Shortlink Express** is a lightweight, secure RESTful API designed to manage URL shortening services. Built with **Node.js**, **Express**, and **Prisma ORM**, it provides robust user authentication and efficient link management capabilities using a MySQL database.

-----

## 🛠️ Tech Stack

  * **Runtime:** [Node.js](https://nodejs.org/)
  * **Framework:** [Express.js](https://expressjs.com/) (v5)
  * **Database:** MySQL
  * **ORM:** [Prisma](https://www.prisma.io/)
  * **Authentication:** JWT (JSON Web Tokens) & HTTP-Only Cookies
  * **Security:** Bcrypt (Password Hashing), CORS

-----

## ✨ Key Features

  * **User Authentication:**
      * Secure Register and Login.
      * Session management via HTTP-Only Cookies.
      * Password encryption using Bcrypt.
  * **Link Management:**
      * Create short links with auto-generated or custom slugs.
      * Edit existing destination URLs and slugs.
      * Delete links.
      * View all links associated with the authenticated user.
  * **Data Integrity:**
      * Unique constraints on Usernames and Slugs.
      * Relational mapping between Users and Links.

-----

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the root directory:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | Connection string for your MySQL database | `mysql://user:pass@localhost:3306/db_name` |
| `JWT_SECRET` | Secret key for signing JSON Web Tokens | `your_super_secret_key` |
| `NODE_ENV` | Environment mode (development/production) | `development` |

-----

## 🚀 Installation & Setup

Follow these steps to set up the project locally.

### 1\. Clone the repository

```bash
git clone https://github.com/inirizky/shortlink-express.git
cd shortlink-express
```

### 2\. Install dependencies

```bash
npm install
```

### 3\. Configure Database

Ensure you have MySQL running. Then, generate the Prisma client and push the schema to your database.

```bash
# Generate Prisma Client
npx prisma generate

# Run Migrations
npx prisma migrate dev --name init
```

### 4\. Run the application

```bash
# Start in development mode (using nodemon)
npm start
```

The server will start on `http://localhost:3001`.

-----

## 📂 Project Structure

```text
shortlink-express/
├── controller/        # Business logic for Users and Links
├── middleware/        # Authentication middleware
├── prisma/            # Database schema and migrations
├── routes/            # API route definitions
├── index.js           # App entry point and configuration
├── package.json       # Dependencies and scripts
└── .env               # Environment variables
```

-----

## 📡 API Usage Examples

### Authentication

**Register User**

```http
POST /api/users/register
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123",
  "fullname": "John Doe"
}
```

**Login User**

```http
POST /api/users/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

### Links

**Create Shortlink**
*(Requires Auth Cookie)*

```http
POST /api/links/new
Content-Type: application/json

{
  "url": "https://www.google.com",
  "slug": "goog" 
}
// Note: "slug" is optional. If omitted, a random string is generated.
```

**Get User's Links**
*(Requires Auth Cookie)*

```http
GET /api/links
```

-----

## 🤝 Contribution Guidelines

Contributions are welcome\! Please follow these steps:

1.  Fork the project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

-----

## 📝 License

This project is licensed under the **ISC License**.
