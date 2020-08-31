//delete values
Array.prototype.clean = function() {
    for (var i = 0; i < this.length; i++) {
    if ((this[i] == null)||(this[i] == "")) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
Array.prototype.substituir = function(x,y) {
    for (var i = 0; i < this.length; i++) {
    	this[i] = "01-"+this[i].replace(x,y);
	}
  return this;
};
Array.prototype.combinar = function(x,y,z) {
    for (var i = 0; i < z; i++) {
    	this[i] = x[i]+y[i];
	}
  return this;
};