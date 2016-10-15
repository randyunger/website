package controllers

import akka.stream.scaladsl.{Flow, Sink, Source}
import play.api._
import play.api.http.websocket.{Message, TextMessage}
import play.api.libs.iteratee.{Enumerator, Iteratee}
import play.api.mvc._

import scala.concurrent.Future

class Application extends Controller {

  def myIndex = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def chatPage = Action {
    Ok(views.html.chat("Hey there"))
  }

  def socket = WebSocket(reqHeader => {
    import play.api.libs.concurrent.Execution.Implicits._
    val flow = Flow.apply[Message]
    val a = Future(Right(flow))
    Future(Left(Ok))
    val respSource = Source.repeat(TextMessage("Response!"))
    val printSink = Sink.ignore
    val b = Flow.fromSinkAndSource(printSink, respSource)

    val bFlow = Future(Right(b))
    a
    bFlow
  })

//  def socket = WebSocket.using[String] { request =>
//
//    // Log events to the console
//    val in = Iteratee.foreach[String](println).map { _ =>
//      println("Disconnected")
//    }
//
//    // Send a single 'Hello!' message
//    val out = Enumerator("Hello!")
//
//    (in, out)
//  }

}