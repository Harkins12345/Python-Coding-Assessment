echo Installing Pipenv
pip install pipenv

echo Installing from Pipfile
pipenv install

echo Activating Python Virtual Environment
echo Running Flask API
pipenv run flask run
