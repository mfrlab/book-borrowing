# OrderManagement
Library Book Borrowing System

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version v18.16.0

# Getting Started
- Clone the repository
```
git clone  <gitlab url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Setup Database
```
setup your own cofiguration on `config/database.js`
```
- Build and run the project
```
npm run dev
or
npm run start
```
- Run the seeder
```
sequelize db:seed:all
```
  Navigate to `http://localhost:8000`


