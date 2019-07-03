# Long polling

Long polling is the simplest way of having persistent connection with server, that doesn't use any specific protocol like WebSocket or Server Side Events.

Being very easy to implement, it's also good enough in a lot of cases.

## Regular Polling

The simplest way to get new information from the server is polling.

That is, periodical requests to the server: "Hello, I'm here, do you have any information for me?". For example, once in 10 seconds.

In response, the server first takes a notice to itself that the client is online, and second - sends a packet of messages it got till that moment.

That works, but there are downsides:
1. Messages are passed with a delay up to 10 seconds.
2. Even if there are no messages, the server is bombed with requests every 10 seconds. That's quite a load to handle for backend, speaking performance-wise.

So, if we're talking about a very small service, the approach may be viable.

But generally, it needs an improvement.

## Long polling

Long polling -- is a better way to poll the server.

It's also very easy to implement, and delivers messages without delays.

The flow:

1. A request is sent to the server.
2. The server doesn't close the connection until it has a message.
3. When a message appears - the server responds to the request with the data.
4. The browser makes a new request immediately.

The situation when the browser sent a request and has a pending connection with the server, is standard for this method. Only when a message is delivered, the connection is reestablished.

![](long-polling.png)

Even if the connection is lost, because of, say, a network error, the browser immediately sends a new request.

A sketch of client-side code:

```js
async function subscribe() {
  let response = await fetch("/subscribe");

  if (response.status == 502) {
    // Connection timeout, happens when the connection was pending for too long
    // let's reconnect
    await subscribe();
  } else if (response.status != 200) {
    // Show Error
    showMessage(response.statusText);
    // Reconnect in one second
    await new Promise(resolve => setTimeout(resolve, 1000));
    await subscribe();
  } else {
    // Got message
    let message = await response.text();
    showMessage(message);
    await subscribe();
  }
}

subscribe();
```

The `subscribe()` function makes a fetch, then waits for the response, handles it and calls itself again.

```warn header="Server should be ok with many pending connections"
The server architecture must be able to work with many pending connections.

Certain server architectures run a process per connect. For many connections there will be as many processes, and each process takes a lot of memory. So many connections just consume it all.

That's often the case for backends written in PHP, Ruby languages, but technically isn't a language, but rather implementation issue.

Backends written using Node.js usually don't have such problems.
```

## Demo: a chat

Here's a demo:

[codetabs src="longpoll" height=500]

## Area of usage

Long polling works great in situations when messages are rare.

If messages come very often, then the chart of requesting-receiving messages, painted above, becomes saw-like.

Every message is a separate request, supplied with headers, authentication overhead, and so on.

So, in this case, another method is preferred, such as [Websocket](info:websocket) or [Server Sent Events](info:server-sent-events).
