goog.provide('h.Control');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');

h.Control = function() {};

h.Control.prototype.init = function() {
  this.list_ = goog.dom.getElement('list-body');
  this.view_ = goog.dom.getElement('right-view');
  this.price_ = goog.dom.getElement('price');
  this.commute_ = goog.dom.getElement('commute');
  this.data_ = this.createData_();
  this.view_.src = this.data_[0].site;
  this.initData_();
  var self = this;
  goog.events.listen(this.price_, goog.events.EventType.CLICK, function() {
    self.priceSort_();
  });
  goog.events.listen(this.commute_, goog.events.EventType.CLICK, function() {
    self.commuteSort_();
  });
};

h.Control.prototype.initData_ = function() {
  var self = this;
  for(var x = 0; x < this.data_.length; x++) {
    var row = this.createRow_(this.data_[x]);
    goog.dom.appendChild(this.list_, row);
    goog.events.listen(row, goog.events.EventType.CLICK, function(e) {
      var row = e.target;
      if(row.tagName === goog.dom.TagName.TD) {
        row = goog.dom.getParentElement(row);
      }
      var url = row.getAttribute('data');
      self.view_.src = url;
      var old = goog.dom.getElementByClass('selected');
      old.className = 'left-list-body-row';
      row.className = 'left-list-body-row selected';
    });
  }
  this.list_.children[0].className += ' selected';
};

h.Control.prototype.priceSort_ = function() {
  var newRows = [];
  do {
    var rows = this.list_.children;
    var smallest = 120000;
    var index = 0;
    for(var x = 0; x < rows.length; x++) {
      var price = parseInt(rows[x].children[0].textContent);
      if(price <= smallest) {
        smallest = price;
        index = x;
      }
    }
    newRows.push(rows[index]);
    goog.dom.removeNode(rows[index]);
  } while(this.list_.children.length > 0);
  for(var x = 0; x < newRows.length; x++) {
    goog.dom.appendChild(this.list_, newRows[x]);
  }
};

h.Control.prototype.commuteSort_ = function() {
  var newRows = [];
  do {
    var rows = this.list_.children;
    var smallest = 120000;
    var index = 0;
    for(var x = 0; x < rows.length; x++) {
      var price = parseInt(rows[x].children[1].textContent.replace(' minutes', ''));
      if(price <= smallest) {
        smallest = price;
        index = x;
      }
    }
    newRows.push(rows[index]);
    goog.dom.removeNode(rows[index]);
  } while(this.list_.children.length > 0);
  for(var x = 0; x < newRows.length; x++) {
    goog.dom.appendChild(this.list_, newRows[x]);
  }
};

h.Control.prototype.createRow_ = function(data) {
  var $tr = goog.dom.createDom('tr', {
    'className' : 'left-list-body-row'
  });
  goog.dom.append($tr, goog.dom.createDom('td', {
    'className' : 'left-list-body-row-cell',
    'textContent' : data.cost
  }), goog.dom.createDom('td', {
    'className' : 'left-list-body-row-cell',
    'textContent' : data.time + ' minutes'
  }), goog.dom.createDom('td', {
    'className' : 'left-list-body-row-cell',
    'textContent' : data.deposit ? '1' : '0'     
  }), goog.dom.createDom('td', {
    'className' : 'left-list-body-row-cell',
    'textContent' : data.key ? '1' : '0'
  }), goog.dom.createDom('td', {
    'className' : 'left-list-body-row-cell',
    'textContent' : data.agent ? '1' : '0'
  }), goog.dom.createDom('td', {
    'className' : 'left-list-body-row-cell',
    'innerHTML': '<a href="' + data.site + '" target="_blank">URL</a>'
  }));
  $tr.setAttribute('data', data.site);
  return $tr;
};

h.Control.prototype.createData_ = function() {
  return JSON.parse('[{"cost":"83000","agent":true,"key":false,"deposit":true,"time":"36","site":"http://www.tokyoapartment.com/en/rent/view/243799"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"24","site":"http://www.tokyoapartment.com/en/rent/view/207144"},{"cost":"86000","agent":true,"key":false,"deposit":true,"time":"23","site":"http://www.tokyoapartment.com/en/rent/view/163932"},{"cost":"87000","agent":true,"key":true,"deposit":false,"time":"19","site":"http://www.tokyoapartment.com/en/rent/view/329827"},{"cost":"79000","agent":false,"key":true,"deposit":true,"time":"23","site":"http://www.tokyoapartment.com/en/rent/view/188208"},{"cost":"81000","agent":true,"key":true,"deposit":true,"time":"30","site":"http://www.tokyoapartment.com/en/rent/view/246811"},{"cost":"85000","agent":true,"key":true,"deposit":false,"time":"35","site":"http://www.tokyoapartment.com/en/rent/view/310893"},{"cost":"79000","agent":true,"key":true,"deposit":true,"time":"40","site":"http://www.tokyoapartment.com/en/rent/view/307118"},{"cost":"83000","agent":true,"key":true,"deposit":true,"time":"35","site":"http://www.tokyoapartment.com/en/rent/view/305522"},{"cost":"86000","agent":true,"key":true,"deposit":true,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/316081"},{"cost":"86000","agent":true,"key":false,"deposit":false,"time":"41","site":"http://www.tokyoapartment.com/en/rent/view/231372"},{"cost":"78000","agent":true,"key":false,"deposit":false,"time":"35","site":"http://www.tokyoapartment.com/en/rent/view/201161"},{"cost":"85500","agent":true,"key":false,"deposit":false,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/166078"},{"cost":"86000","agent":true,"key":true,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/314797"},{"cost":"86000","agent":true,"key":true,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/307117"},{"cost":"83000","agent":true,"key":true,"deposit":true,"time":"35","site":"http://www.tokyoapartment.com/en/rent/view/296625"},{"cost":"81000","agent":true,"key":true,"deposit":true,"time":"30","site":"http://www.tokyoapartment.com/en/rent/view/294384"},{"cost":"87000","agent":true,"key":false,"deposit":false,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/160495"},{"cost":"87500","agent":true,"key":false,"deposit":true,"time":"35","site":"http://www.tokyoapartment.com/en/rent/view/163830"},{"cost":"84000","agent":true,"key":false,"deposit":true,"time":"28","site":"http://www.tokyoapartment.com/en/rent/view/229683"},{"cost":"82500","agent":true,"key":false,"deposit":true,"time":"30","site":"http://www.tokyoapartment.com/en/rent/view/132761"},{"cost":"84800","agent":false,"key":false,"deposit":false,"time":"30","site":"http://www.tokyoapartment.com/en/rent/view/328853"},{"cost":"83000","agent":true,"key":false,"deposit":true,"time":"23","site":"http://www.tokyoapartment.com/en/rent/view/163838"},{"cost":"87000","agent":true,"key":false,"deposit":true,"time":"23","site":"http://www.tokyoapartment.com/en/rent/view/119196"},{"cost":"83000","agent":true,"key":true,"deposit":true,"time":"25","site":"http://www.tokyoapartment.com/en/rent/view/252060"},{"cost":"86000","agent":true,"key":true,"deposit":true,"time":"27","site":"http://www.tokyoapartment.com/en/rent/view/314662"},{"cost":"84000","agent":true,"key":false,"deposit":true,"time":"33","site":"http://www.tokyoapartment.com/en/rent/view/142395"},{"cost":"86000","agent":true,"key":false,"deposit":true,"time":"36","site":"http://www.tokyoapartment.com/en/rent/view/264835"},{"cost":"86000","agent":true,"key":false,"deposit":true,"time":"35","site":"http://www.tokyoapartment.com/en/rent/view/132137"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"12","site":"http://www.tokyoapartment.com/en/rent/view/204057"},{"cost":"87000","agent":true,"key":true,"deposit":true,"time":"23","site":"http://www.tokyoapartment.com/en/rent/view/255972"},{"cost":"83000","agent":false,"key":false,"deposit":false,"time":"41","site":"http://www.tokyoapartment.com/en/rent/view/238929"},{"cost":"86000","agent":false,"key":true,"deposit":false,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/63426"},{"cost":"87400","agent":true,"key":false,"deposit":false,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/130400"},{"cost":"87000","agent":false,"key":false,"deposit":false,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/240146"},{"cost":"86000","agent":true,"key":false,"deposit":true,"time":"40","site":"http://www.tokyoapartment.com/en/rent/view/215262"},{"cost":"84000","agent":true,"key":false,"deposit":true,"time":"40","site":"http://www.tokyoapartment.com/en/rent/view/215260"},{"cost":"83000","agent":false,"key":false,"deposit":false,"time":"45","site":"http://www.tokyoapartment.com/en/rent/view/204382"},{"cost":"84000","agent":true,"key":false,"deposit":false,"time":"40","site":"http://www.tokyoapartment.com/en/rent/view/157397"},{"cost":"82000","agent":false,"key":false,"deposit":false,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/209249"},{"cost":"85000","agent":true,"key":false,"deposit":true,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/151706"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"28","site":"http://www.tokyoapartment.com/en/rent/view/215223"},{"cost":"85000","agent":false,"key":false,"deposit":false,"time":"35","site":"http://www.tokyoapartment.com/en/rent/view/191408"},{"cost":"86500","agent":false,"key":false,"deposit":false,"time":"35","site":"http://www.tokyoapartment.com/en/rent/view/238622"},{"cost":"86500","agent":false,"key":false,"deposit":false,"time":"35","site":"http://www.tokyoapartment.com/en/rent/view/230895"},{"cost":"83000","agent":true,"key":false,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/189938"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"29","site":"http://www.tokyoapartment.com/en/rent/view/130279"},{"cost":"86000","agent":true,"key":false,"deposit":true,"time":"29","site":"http://www.tokyoapartment.com/en/rent/view/264843"},{"cost":"85000","agent":true,"key":false,"deposit":true,"time":"27","site":"http://www.tokyoapartment.com/en/rent/view/130271"},{"cost":"86000","agent":true,"key":true,"deposit":true,"time":"36","site":"http://www.tokyoapartment.com/en/rent/view/294989"},{"cost":"85000","agent":true,"key":false,"deposit":true,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/136722"},{"cost":"86000","agent":true,"key":false,"deposit":true,"time":"29","site":"http://www.tokyoapartment.com/en/rent/view/130069"},{"cost":"86500","agent":true,"key":false,"deposit":true,"time":"29","site":"http://www.tokyoapartment.com/en/rent/view/130456"},{"cost":"85000","agent":false,"key":false,"deposit":false,"time":"51","site":"http://www.tokyoapartment.com/en/rent/view/238656"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/295515"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"31","site":"http://www.tokyoapartment.com/en/rent/view/255986"},{"cost":"86000","agent":true,"key":true,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/255984"},{"cost":"81000","agent":true,"key":true,"deposit":false,"time":"41","site":"http://www.tokyoapartment.com/en/rent/view/197431"},{"cost":"84000","agent":true,"key":true,"deposit":true,"time":"41","site":"http://www.tokyoapartment.com/en/rent/view/224353"},{"cost":"84000","agent":true,"key":true,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/296555"},{"cost":"78000","agent":true,"key":false,"deposit":true,"time":"30","site":"http://www.tokyoapartment.com/en/rent/view/116493"},{"cost":"82000","agent":true,"key":false,"deposit":true,"time":"30","site":"http://www.tokyoapartment.com/en/rent/view/224543"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"28","site":"http://www.tokyoapartment.com/en/rent/view/129727"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"36","site":"http://www.tokyoapartment.com/en/rent/view/252735"},{"cost":"87000","agent":true,"key":false,"deposit":true,"time":"33","site":"http://www.tokyoapartment.com/en/rent/view/205117"},{"cost":"85000","agent":true,"key":false,"deposit":true,"time":"30","site":"http://www.tokyoapartment.com/en/rent/view/224750"},{"cost":"83000","agent":true,"key":false,"deposit":false,"time":"37","site":"http://www.tokyoapartment.com/en/rent/view/201366"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"37","site":"http://www.tokyoapartment.com/en/rent/view/224537"},{"cost":"87000","agent":true,"key":true,"deposit":false,"time":"41","site":"http://www.tokyoapartment.com/en/rent/view/327835"},{"cost":"85000","agent":true,"key":false,"deposit":false,"time":"35","site":"http://www.tokyoapartment.com/en/rent/view/281659"},{"cost":"82000","agent":true,"key":true,"deposit":true,"time":"31","site":"http://www.tokyoapartment.com/en/rent/view/256518"},{"cost":"87000","agent":true,"key":false,"deposit":true,"time":"36","site":"http://www.tokyoapartment.com/en/rent/view/78001"},{"cost":"73500","agent":false,"key":false,"deposit":false,"time":"42","site":"http://www.tokyoapartment.com/en/rent/view/136833"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/316290"},{"cost":"84000","agent":true,"key":true,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/129730"},{"cost":"82000","agent":true,"key":true,"deposit":true,"time":"36","site":"http://www.tokyoapartment.com/en/rent/view/305147"},{"cost":"85000","agent":true,"key":false,"deposit":true,"time":"40","site":"http://www.tokyoapartment.com/en/rent/view/309158"},{"cost":"75000","agent":true,"key":false,"deposit":false,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/298783"},{"cost":"78000","agent":true,"key":false,"deposit":false,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/131244"},{"cost":"75800","agent":true,"key":false,"deposit":false,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/326468"},{"cost":"78000","agent":true,"key":false,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/131296"},{"cost":"87000","agent":false,"key":false,"deposit":false,"time":"45","site":"http://www.tokyoapartment.com/en/rent/view/131296"},{"cost":"78000","agent":true,"key":false,"deposit":false,"time":"42","site":"http://www.tokyoapartment.com/en/rent/view/131241"},{"cost":"82500","agent":true,"key":false,"deposit":false,"time":"49","site":"http://www.tokyoapartment.com/en/rent/view/288812"},{"cost":"77000","agent":true,"key":true,"deposit":true,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/223511"},{"cost":"83000","agent":true,"key":false,"deposit":false,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/125030"},{"cost":"80000","agent":true,"key":true,"deposit":false,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/131188"},{"cost":"79500","agent":true,"key":false,"deposit":false,"time":"46","site":"http://www.tokyoapartment.com/en/rent/view/281607"},{"cost":"85000","agent":false,"key":false,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/68578"},{"cost":"85540","agent":false,"key":false,"deposit":false,"time":"50","site":"http://www.tokyoapartment.com/en/rent/view/159721"},{"cost":"81500","agent":true,"key":false,"deposit":false,"time":"31","site":"http://www.tokyoapartment.com/en/rent/view/160787"},{"cost":"86000","agent":true,"key":true,"deposit":true,"time":"31","site":"http://www.tokyoapartment.com/en/rent/view/314759"},{"cost":"86000","agent":true,"key":true,"deposit":true,"time":"33","site":"http://www.tokyoapartment.com/en/rent/view/303655"},{"cost":"82000","agent":true,"key":false,"deposit":false,"time":"42","site":"http://www.tokyoapartment.com/en/rent/view/230861"},{"cost":"83000","agent":true,"key":false,"deposit":true,"time":"47","site":"http://www.tokyoapartment.com/en/rent/view/231380"},{"cost":"83800","agent":false,"key":false,"deposit":false,"time":"45","site":"http://www.tokyoapartment.com/en/rent/view/326154"},{"cost":"83000","agent":true,"key":true,"deposit":true,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/314758"},{"cost":"87000","agent":true,"key":true,"deposit":true,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/230855"},{"cost":"84000","agent":false,"key":false,"deposit":false,"time":"46","site":"http://www.tokyoapartment.com/en/rent/view/331168"},{"cost":"81000","agent":true,"key":true,"deposit":true,"time":"32","site":"http://www.tokyoapartment.com/en/rent/view/256046"},{"cost":"86000","agent":true,"key":false,"deposit":true,"time":"34","site":"http://www.tokyoapartment.com/en/rent/view/137277"},{"cost":"85800","agent":false,"key":false,"deposit":false,"time":"36","site":"http://www.tokyoapartment.com/en/rent/view/328854"},{"cost":"87000","agent":true,"key":false,"deposit":false,"time":"31","site":"http://www.tokyoapartment.com/en/rent/view/135076"},{"cost":"87000","agent":false,"key":true,"deposit":false,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/328682"},{"cost":"83000","agent":true,"key":false,"deposit":true,"time":"29","site":"http://www.tokyoapartment.com/en/rent/view/155271"},{"cost":"87000","agent":true,"key":false,"deposit":true,"time":"24","site":"http://www.tokyoapartment.com/en/rent/view/262505"},{"cost":"69000","agent":true,"key":true,"deposit":true,"time":"34","site":"http://www.tokyoapartment.com/en/rent/view/315512"},{"cost":"75000","agent":true,"key":false,"deposit":true,"time":"32","site":"http://www.tokyoapartment.com/en/rent/view/143396"},{"cost":"80000","agent":true,"key":true,"deposit":true,"time":"30","site":"http://www.tokyoapartment.com/en/rent/view/287797"},{"cost":"79000","agent":true,"key":true,"deposit":true,"time":"32","site":"http://www.tokyoapartment.com/en/rent/view/287796"},{"cost":"79000","agent":true,"key":true,"deposit":true,"time":"30","site":"http://www.tokyoapartment.com/en/rent/view/287806"},{"cost":"79000","agent":true,"key":true,"deposit":true,"time":"30","site":"http://www.tokyoapartment.com/en/rent/view/287804"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"36","site":"http://www.tokyoapartment.com/en/rent/view/153486"},{"cost":"86000","agent":true,"key":true,"deposit":true,"time":"34","site":"http://www.tokyoapartment.com/en/rent/view/132995"},{"cost":"83000","agent":true,"key":true,"deposit":true,"time":"33","site":"http://www.tokyoapartment.com/en/rent/view/314628"},{"cost":"80000","agent":true,"key":true,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/295802"},{"cost":"80500","agent":true,"key":true,"deposit":true,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/314767"},{"cost":"85500","agent":true,"key":false,"deposit":true,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/309130"},{"cost":"84500","agent":true,"key":true,"deposit":true,"time":"29","site":"http://www.tokyoapartment.com/en/rent/view/151411"},{"cost":"86000","agent":false,"key":true,"deposit":true,"time":"32","site":"http://www.tokyoapartment.com/en/rent/view/248800"},{"cost":"82000","agent":true,"key":true,"deposit":false,"time":"32","site":"http://www.tokyoapartment.com/en/rent/view/231382"},{"cost":"83000","agent":true,"key":true,"deposit":true,"time":"31","site":"http://www.tokyoapartment.com/en/rent/view/205112"},{"cost":"78000","agent":true,"key":true,"deposit":true,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/204770"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"40","site":"http://www.tokyoapartment.com/en/rent/view/205111"},{"cost":"80000","agent":true,"key":true,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/306051"},{"cost":"82000","agent":true,"key":true,"deposit":false,"time":"36","site":"http://www.tokyoapartment.com/en/rent/view/287813"},{"cost":"82000","agent":true,"key":true,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/285294"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"40","site":"http://www.tokyoapartment.com/en/rent/view/302436"},{"cost":"86000","agent":true,"key":true,"deposit":true,"time":"42","site":"http://www.tokyoapartment.com/en/rent/view/299507"},{"cost":"87000","agent":false,"key":false,"deposit":false,"time":"45","site":"http://www.tokyoapartment.com/en/rent/view/238808"},{"cost":"84000","agent":false,"key":false,"deposit":false,"time":"41","site":"http://www.tokyoapartment.com/en/rent/view/239281"},{"cost":"84000","agent":false,"key":false,"deposit":false,"time":"41","site":"http://www.tokyoapartment.com/en/rent/view/233191"},{"cost":"87000","agent":true,"key":true,"deposit":true,"time":"46","site":"http://www.tokyoapartment.com/en/rent/view/312663"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/212539"},{"cost":"84000","agent":true,"key":false,"deposit":true,"time":"42","site":"http://www.tokyoapartment.com/en/rent/view/153487"},{"cost":"69000","agent":true,"key":false,"deposit":false,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/130269"},{"cost":"84000","agent":true,"key":false,"deposit":false,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/74920"},{"cost":"67000","agent":true,"key":false,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/251894"},{"cost":"68000","agent":true,"key":false,"deposit":true,"time":"42","site":"http://www.tokyoapartment.com/en/rent/view/182958"},{"cost":"82000","agent":true,"key":false,"deposit":false,"time":"41","site":"http://www.tokyoapartment.com/en/rent/view/61634"},{"cost":"76000","agent":true,"key":false,"deposit":true,"time":"41","site":"http://www.tokyoapartment.com/en/rent/view/130406"},{"cost":"79000","agent":true,"key":false,"deposit":true,"time":"40","site":"http://www.tokyoapartment.com/en/rent/view/215258"},{"cost":"86000","agent":true,"key":true,"deposit":true,"time":"37","site":"http://www.tokyoapartment.com/en/rent/view/159167"},{"cost":"82000","agent":true,"key":false,"deposit":false,"time":"41","site":"http://www.tokyoapartment.com/en/rent/view/286483"},{"cost":"82000","agent":true,"key":false,"deposit":false,"time":"41","site":"http://www.tokyoapartment.com/en/rent/view/215559"},{"cost":"83000","agent":true,"key":false,"deposit":false,"time":"41","site":"http://www.tokyoapartment.com/en/rent/view/286486"},{"cost":"82000","agent":false,"key":false,"deposit":false,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/239261"},{"cost":"82000","agent":false,"key":false,"deposit":false,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/233158"},{"cost":"82500","agent":false,"key":false,"deposit":false,"time":"45","site":"http://www.tokyoapartment.com/en/rent/view/133203"},{"cost":"79000","agent":true,"key":false,"deposit":true,"time":"35","site":"http://www.tokyoapartment.com/en/rent/view/243779"},{"cost":"84000","agent":true,"key":false,"deposit":true,"time":"40","site":"http://www.tokyoapartment.com/en/rent/view/243702"},{"cost":"83000","agent":true,"key":true,"deposit":true,"time":"34","site":"http://www.tokyoapartment.com/en/rent/view/329370"},{"cost":"83000","agent":true,"key":false,"deposit":true,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/136036"},{"cost":"80000","agent":true,"key":true,"deposit":true,"time":"33","site":"http://www.tokyoapartment.com/en/rent/view/328370"},{"cost":"80000","agent":true,"key":true,"deposit":true,"time":"33","site":"http://www.tokyoapartment.com/en/rent/view/247187"},{"cost":"80000","agent":true,"key":false,"deposit":true,"time":"32","site":"http://www.tokyoapartment.com/en/rent/view/130444"},{"cost":"81000","agent":true,"key":true,"deposit":true,"time":"33","site":"http://www.tokyoapartment.com/en/rent/view/59135"},{"cost":"85000","agent":true,"key":true,"deposit":false,"time":"31","site":"http://www.tokyoapartment.com/en/rent/view/130615"},{"cost":"83000","agent":true,"key":true,"deposit":true,"time":"33","site":"http://www.tokyoapartment.com/en/rent/view/59138"},{"cost":"85000","agent":true,"key":true,"deposit":true,"time":"36","site":"http://www.tokyoapartment.com/en/rent/view/297632"},{"cost":"86000","agent":true,"key":true,"deposit":true,"time":"39","site":"http://www.tokyoapartment.com/en/rent/view/59040"},{"cost":"67000","agent":true,"key":false,"deposit":true,"time":"32","site":"http://www.tokyoapartment.com/en/rent/view/148720"},{"cost":"77000","agent":true,"key":false,"deposit":true,"time":"32","site":"http://www.tokyoapartment.com/en/rent/view/252081"},{"cost":"79000","agent":true,"key":true,"deposit":true,"time":"32","site":"http://www.tokyoapartment.com/en/rent/view/148729"},{"cost":"75000","agent":true,"key":false,"deposit":true,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/295005"},{"cost":"83000","agent":true,"key":false,"deposit":true,"time":"40","site":"http://www.tokyoapartment.com/en/rent/view/132796"},{"cost":"72000","agent":true,"key":false,"deposit":true,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/116175"},{"cost":"73000","agent":true,"key":true,"deposit":true,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/252084"},{"cost":"77000","agent":true,"key":true,"deposit":true,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/314744"},{"cost":"77000","agent":true,"key":false,"deposit":true,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/309140"},{"cost":"79000","agent":true,"key":true,"deposit":false,"time":"42","site":"http://www.tokyoapartment.com/en/rent/view/212526"},{"cost":"82000","agent":false,"key":true,"deposit":false,"time":"40","site":"http://www.tokyoapartment.com/en/rent/view/63417"},{"cost":"83000","agent":false,"key":true,"deposit":false,"time":"40","site":"http://www.tokyoapartment.com/en/rent/view/63423"},{"cost":"76000","agent":true,"key":true,"deposit":true,"time":"45","site":"http://www.tokyoapartment.com/en/rent/view/291971"},{"cost":"79500","agent":true,"key":false,"deposit":true,"time":"45","site":"http://www.tokyoapartment.com/en/rent/view/132773"},{"cost":"83000","agent":false,"key":false,"deposit":false,"time":"46","site":"http://www.tokyoapartment.com/en/rent/view/120435"},{"cost":"85000","agent":true,"key":false,"deposit":false,"time":"45","site":"http://www.tokyoapartment.com/en/rent/view/130581"},{"cost":"75000","agent":true,"key":false,"deposit":true,"time":"32","site":"http://www.tokyoapartment.com/en/rent/view/136189"},{"cost":"85000","agent":true,"key":false,"deposit":true,"time":"34","site":"http://www.tokyoapartment.com/en/rent/view/189661"},{"cost":"83000","agent":true,"key":false,"deposit":true,"time":"29","site":"http://www.tokyoapartment.com/en/rent/view/262654"},{"cost":"80000","agent":true,"key":false,"deposit":false,"time":"30","site":"http://www.tokyoapartment.com/en/rent/view/136188"},{"cost":"77000","agent":true,"key":false,"deposit":true,"time":"44","site":"http://www.tokyoapartment.com/en/rent/view/252068"},{"cost":"79000","agent":true,"key":false,"deposit":true,"time":"52","site":"http://www.tokyoapartment.com/en/rent/view/130278"},{"cost":"82000","agent":true,"key":true,"deposit":true,"time":"52","site":"http://www.tokyoapartment.com/en/rent/view/206820"},{"cost":"83000","agent":true,"key":false,"deposit":true,"time":"50","site":"http://www.tokyoapartment.com/en/rent/view/132766"},{"cost":"80000","agent":true,"key":false,"deposit":false,"time":"37","site":"http://www.tokyoapartment.com/en/rent/view/130465"},{"cost":"79000","agent":true,"key":false,"deposit":true,"time":"41","site":"http://www.tokyoapartment.com/en/rent/view/240382"},{"cost":"83000","agent":true,"key":false,"deposit":false,"time":"37","site":"http://www.tokyoapartment.com/en/rent/view/326313"},{"cost":"77000","agent":true,"key":false,"deposit":false,"time":"43","site":"http://www.tokyoapartment.com/en/rent/view/209258"},{"cost":"86000","agent":true,"key":false,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/68612"},{"cost":"87000","agent":true,"key":false,"deposit":true,"time":"38","site":"http://www.tokyoapartment.com/en/rent/view/68614"},{"cost":"79000","agent":true,"key":false,"deposit":true,"time":"36","site":"http://www.tokyoapartment.com/en/rent/view/142951"},{"cost":"81000","agent":true,"key":true,"deposit":true,"time":"45","site":"http://www.tokyoapartment.com/en/rent/view/299419"},{"cost":"80000","agent":true,"key":false,"deposit":true,"time":"27","site":"http://www.tokyoapartment.com/en/rent/view/130630"},{"cost":"82000","agent":true,"key":true,"deposit":true,"time":"27","site":"http://www.tokyoapartment.com/en/rent/view/294635"},{"cost":"82000","agent":true,"key":false,"deposit":true,"time":"35","site":"http://www.tokyoapartment.com/en/rent/view/129731"},{"cost":"83000","agent":true,"key":false,"deposit":true,"time":"30","site":"http://www.tokyoapartment.com/en/rent/view/130065"},{"cost":"82000","agent":true,"key":false,"deposit":true,"time":"31","site":"http://www.tokyoapartment.com/en/rent/view/264848"},{"cost":"81000","agent":true,"key":false,"deposit":true,"time":"37","site":"http://www.tokyoapartment.com/en/rent/view/122060"},{"cost":"84000","agent":true,"key":false,"deposit":true,"time":"35","site":"http://www.tokyoapartment.com/en/rent/view/300066"},{"cost":"77000","agent":true,"key":false,"deposit":false,"time":"50","site":"http://www.tokyoapartment.com/en/rent/view/152743"},{"cost":"85000","agent":false,"key":false,"deposit":true,"time":"30","site":"http://www.tokyoapartment.com/en/rent/view/326148"},{"cost":"84000","agent":true,"key":true,"deposit":true,"time":"31","site":"http://www.tokyoapartment.com/en/rent/view/287825"}]');
};