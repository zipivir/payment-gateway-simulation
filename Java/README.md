# Welcome to Java boilerplate!

If you've decided to write your simulation in Java we just wanted to tell you that you rock!

This boilerplate holds the very basic spring server for you to be able to complete your simulation successfully.

### Build

Once you've cloned this repo you should first run:

	./gradlew build      

### Running the server

In order to run the server should just use the following command:

    ./gradlew bootRun

This will start the server on port **8080**.

If everything works fine you should be able to access the `/healthcheck` endpoint and receive the following response:

![simulation preview](https://drive.google.com/uc?id=1SofJmYALWAYUoAwdizo5XIzQNwK7DgYG)

### Mock server

As part of the simulation there is a mock server that you will have to work against. In order to make sure things are as smooth as possible we've made sure that upon accessing the `/healthcheck` endpoint we're also checking whether the mock server is accessible. If it fails please **contact your interviewer ASAP**.


**Good luck!**
