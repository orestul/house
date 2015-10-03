goog.provide('h.Main');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');

h.Main = function() { };

h.Main.prototype.init = function() {
    var self = this;
  goog.events.listen(goog.dom.getElement('file'), goog.events.EventType.CHANGE, function(e) {
    var reader = new FileReader();
    reader.onload = function(data) {
      self.handleData_(data.target.result, self);
    };
    reader.readAsText(e.target.files[0]);
  });
};

h.Main.prototype.handleData_ = function(data, self) {
  var array = data.split('\n');
  var data = [];
  var index = 0;
  do {
    var cost = array[index].split(',');
    var result = {
      cost: (cost[0] + cost[1]).trim(),
      agent: self.checkExists_('agency', cost),
      key: self.checkExists_('key', cost),
      deposit: self.checkExists_('deposit', cost),
      time: array[index + 1].replace(' minutes', '').trim(),
      site: array[index+ 2].trim()
    };
    data.push(result);
    index += 4;
  } while(index < array.length);
  var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(data));
  window.open(url, '_blank');
  window.focus();
};

h.Main.prototype.checkExists_ = function(needle, stack) {
  if(!stack) {
    return false;
  }
  for(var x = 0; x < stack.length; x++) {
    if(stack[x].indexOf(needle) >= 0) {
      return true;
    }
  }
  return false;
};