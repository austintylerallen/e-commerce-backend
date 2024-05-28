# E-Commerce Back End

## Description

This project is the back end for an e-commerce website, built using Express.js and Sequelize to interact with a PostgreSQL database. The application provides a RESTful API for managing categories, products, and tags.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Video Walkthrough](#video-walkthrough)
- [License](#license)
- [Contact](#contact)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/austintylerallen/e-commerce-backend.git
   cd e-commerce-backend
   ```
2. Install Dependencies:
```bash
    npm install
```
3. Set up the environment variables:
Create a .env file in the root of the project with the following content:
```bash
DB_NAME=shop_db
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
```

4. Create the database schema and seed the database:

```bash
npm run seed
```
5. Start the server:

```bash
npm start
```

## Usage

- Use an API client like Insomnia or Postman to test the API endpoints.
- Ensure the server is running by navigating to `http://localhost:3001`.


## Video Walkthrough

Please see submission with attached video for video walkthrough.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For any questions or feedback, please contact me at austintallen07@gmail.com
