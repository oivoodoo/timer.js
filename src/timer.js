var Timer = function(options) {
  if (typeof(options.action) === "undefined")
    throw new Exception("Action should be specified");

  this.action = typeof(options) === "function" ? options : options.action;
  this.name = options.name || this.guid();
  this.time = options.time || 1500;
  this.step = options.step || 1.2;
  this.max_time = options.max_time || 5 * 60 * 1000;

  Timer[this.name] = null;
};

Timer.prototype.calculate = function() {
  this.time = this.step * this.time;
  return this.time;
};

Timer.prototype.next = function() {
  var self = this;

  if (Timer[this.name] === null) {
    var time = this.tick();

    Timer[this.name] = setTimeout(function() {
      self.action(function() {
        self.stop();
        self.next();
      });
    }, time);
  }
};

Timer.prototype.tick = function(t) {
  var time = this.calculate();
  return time >= this.max_time ? this.max_time : time;
};

Timer.prototype.start = function() {
  this.next();
};

Timer.prototype.stop = function() {
  clearTimeout(Timer[this.name]);
  delete Timer[this.name];
  Timer[this.name] = null;
};

Timer.prototype.guid = function() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

