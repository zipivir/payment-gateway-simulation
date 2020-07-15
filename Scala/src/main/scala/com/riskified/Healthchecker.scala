package com.riskified

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.stream.Materializer

import scala.concurrent.duration._
import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class Healthchecker(
  httpClient: HttpClient,
  system: akka.actor.typed.ActorSystem[_]
)(implicit executionContext: ExecutionContext, mat: Materializer) {

  val route: Route =
    path("healthcheck") {
      get {
        complete(performCreditCardMockHealthcheck())
      }
    }

  private def performCreditCardMockHealthcheck() = {
    val responseFuture = httpClient
      .get("http://interview.riskxint.com/healthcheck")
    responseFuture.onComplete {
      case Success(response) if response.status.isSuccess =>
        system.log.info("Mock server is healthy")
      case Success(response) =>
        system.log
          .error(
            "Mock server is unhealthy. response: {} - {}",
            response.status,
            response.entity.toStrict(100.millis)
          )
      case Failure(ex) =>
        system.log.error("Mock server is unhealthy", ex)
    }

    responseFuture
  }

}
