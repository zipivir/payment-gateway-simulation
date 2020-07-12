# Welcome to Python boilerplate!

If you've decided to write your simulation in Python we just wanted to tell you that you rock!

This boilerplate holds the very basic python-flask server for you to be able to complete your simulation successfully.

### Installation

Since there are different ways to setup python environment we will leave this part to you (you can ask your interviewer if you find it difficult to set this up). However, we did provide a valid `requirements.txt` file once you do finish setting up your python environment. Install the requirements using the following command: 

    pip install -r requirements.txt

* We ecourage you to use python 3.6+. However, the boilerplate can run completely on python 2.7.

### Running the server

In order to run the server should just use the following command: 

    python manage.py run

This will start the server on port **5000**.

If everything works fine you should be able to access the `/healthcheck` endpoint and receive the following response:

![simulation preview](https://drive.google.com/uc?id=1IuIjsztYFQc3l5oObSDlqdh3T7NraU6d)

### Mock server

As part of the simulation there is a mock server that you will have to work against. In order to make sure things are as smooth as possible we've made sure that upon accessing the `/healthcheck` endpoint we're also checking whether the mock server is accessible. If it fails please **contact your interviewer ASAP**.


### Good luck!
