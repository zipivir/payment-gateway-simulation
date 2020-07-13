package com.riskified

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.headers.RawHeader
import akka.http.scaladsl.model._

import scala.concurrent.Future

class HttpClient()(implicit val system: ActorSystem) {

  def get(uri: String,
          headers: List[(String, String)] = Nil,
          json: String = ""): Future[HttpResponse] =
    Http().singleRequest(
      HttpRequest(
        uri = uri,
        entity = toJsonEntity(json),
        headers = prepareHeaders(headers)
      )
    )

  def post(uri: String,
           headers: List[(String, String)] = Nil,
           json: String = ""): Future[HttpResponse] =
    Http().singleRequest(
      HttpRequest(
        method = HttpMethods.POST,
        uri = uri,
        entity = toJsonEntity(json),
        headers = prepareHeaders(headers)
      )
    )

  private def toJsonEntity(json: String) =
    HttpEntity(ContentTypes.`application/json`, json)

  private def prepareHeaders(headers: List[(String, String)]) =
    headers.map(t => RawHeader(t._1, t._2))
}
