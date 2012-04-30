Javascript Timer
===============

This library is very useful if you are going to create a periodic update with
ajax requests or any long calculation function.

Inteval time calculation:

  interval = time * step

Usage
------

```javascript
  function getData(success) {
    $.get('/data', success);
  };

  var timer = new Timer(getData);
  timer.start();
```

```javascript
  function longOperation(success) {
    for(var i = 0 ; i < 1000000; i++);
    success();
  };

  var timer = new Timer({
    action: longOperation,
    name: "long_operation",
    time: 1000,
    step: 2
  });
  timer.start();
```

You can stop timer using method 'stop':

```javascript
  var timer = new Timer(function(succes) {
    console.log("how are you?");
    success();
  });
  timer.start();

  ... a lot of operations

  timer.stop();
```

