# Project Installation

1. Clone the repository:

```bash
git clone <repository_url>
````
2. On root of the folder:

```bash
composer i
````

3. Create database with name dreamCast (from .env):

```bash
php artisan migrate:fresh --seed
````

4. Inside react folder for frontend:

```bash
npm i
npm start
````