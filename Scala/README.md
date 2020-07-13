# Scala payment-gateway skeleton
This skeleton is based on [Akka HTTP Quickstart for Scala](https://developer.lightbend.com/guides/akka-http-quickstart-scala/)
## To run the payment-gateway:

In a console, change directories to /payment-gateway-simulation/Scala.

### Start sbt:

On OSX or Linux systems, enter ./sbt
On Windows systems, enter sbt.bat.
When you run sbt, it downloads project dependencies. The > prompt indicates that sbt is running in interactive mode.

At the sbt prompt, enter reStart.

sbt builds the project, starts an Akka HTTP server, and runs the example application.

The output should look something like this:
```
[info] Loading global plugins from /Users/x/.sbt/0.13/plugins
...
[info] Running com.example.QuickstartServer
[2020-07-13 20:52:30,231] [INFO] [akka.actor.typed.ActorSystem] [HelloAkkaHttpServer-akka.actor.default-dispatcher-6] [] - Server online at http://127.0.0.1:8000/
[2020-07-13 20:52:30,963] [INFO] [akka.actor.typed.ActorSystem] [HelloAkkaHttpServer-akka.actor.default-dispatcher-7] [] - interview.riskxint.com is healthy
```
The Akka HTTP server is now running, and you can test it by sending simple HTTP requests.

You can restart it by entering reStart again, and stop it with reStop. To restart your application each time a change is detected, run ~reStart.
