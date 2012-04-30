var Timer = function(options) {
  if (typeof(options.action) === "undefined") throw new Exception("Action should be specified");

  this.action = typeof(options) === "function" ? options : options.action;
  this.name = options.name || this.guid();
  this.time = options.time || 1500;
  this.step = options.step || 1.5;

  Timer[this.name] = null;
};

Timer.prototype.next = function(t) {
  var self = this;

  if (Timer[this.name] === null) {
    Timer[this.name] = setTimeout(function() {
      self.action(function() {
        self.stop();
        self.next(t * self.step);
      });
    }, t * this.step);
  }
};

Timer.prototype.start = function() {
  this.next(this.time);
};

Timer.prototype.stop = function() {
  clearTimeout(Timer[this.name]);
  delete Timer[this.name];
  Timer[this.name] = null;
};

Timer.prototype.guid = function() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

