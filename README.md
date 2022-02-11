# Answer Digital Python TechTest

Thank you for applying to become part of the Answer Digital team, we have prepared a technical test for you which is designed to help you demonstrate your technical problem solving skills.

Good luck!

## Prerequisites

- Python 3 - [https://www.python.org/downloads/](https://www.python.org/downloads/)
- An IDE such as Pycharm - [https://www.jetbrains.com/pycharm/download/](https://www.jetbrains.com/pycharm/download/)
- Alternative IDE's are available such as VS Code - [https://code.visualstudio.com/download](https://code.visualstudio.com/download)
- node.js and npm - [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- Postman - https://www.postman.com/downloads/ (Optional)

# Instructions
The test involves finishing the Flask API that has been already started.

- Look in the file app.py (should be in the api directory)
- You will see an already completed endpoint /api/people

Your task is to complete the API and add the missing endpoints which are
- **GET** /api/person/{id} - get person with given id
- **POST** /api/people - create 1 person
- **PUT** /api/person/{id} - Update a person with the given id
- **DELETE** /api/person/{id} - Delete a person with a given id

To test the api you will need to run it. 
You can use a tool like Postman to test to see if the endpoints are working or you can run the frontend which calls the endpoints above to test.
See instructions below on how to run the frontend & API

# Running the frontend
Ensure you are in the root of the project

- Step 0: Ensure you have a terminal/command prompt open
- Step 1: Install dependencies: `npm install` or `yarn`
- Step 2: Run the frontend `npm run dev` or `yarn run dev`

# Running the API

### Windows
Ensure you are in the root of the project
Run the API by running `npm run start-api-win` or `yarn run start-api-win`
-    > If you are using GitBash run the following from the `api` subdirectory: `cmd "/C run_api.bat"`

If this **doesn't** work then follow these steps to run the API manually:

- Step 0: Ensure you have a command prompt open
- Step 1: Ensure you are in the /api directory
    > If you are in the root of the project you can run `cd api` to get into the api directory
- Step 2: Install Pipenv: `pip install pipenv`
- Step 3: Install dependencies: `pipenv install`
- Step 4: Run the API: `pipenv run flask run`

You can stop running the api by pressing CTRL + C.

To rerun the API you can do `flask run`.

### Mac OS/Linux/Unix
- Step 0: Ensure you have a terminal open
- Step 1: Ensure you are in the /api directory
    > If you are in the root of the project you can run `cd api` to get into the api directory
- Step 2: Install Pipenv: `pip install pipenv`
- Step 3: Install dependencies: `pipenv install`
- Step 4: Run the API: `pipenv run flask run`

You can stop running the api by doing CTRL + C

To rerun the API you can do `pipenv run flask run` OR run `npm run start-api` in the root of the project
