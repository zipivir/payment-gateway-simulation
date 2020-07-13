package com.riskified

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route

object Healthcheck {

  val route: Route =
    path("healthcheck") {
      get {
        complete(StatusCodes.OK)
      }
    }

}
