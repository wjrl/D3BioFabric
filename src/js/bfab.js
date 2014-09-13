////////////////////////////////////////////////////////////////////////////////
//
// Released under "The MIT License":
//
// Copyright (c) 2014 William J.R. Longabaugh
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
////////////////////////////////////////////////////////////////////////////////

var bfab = {};

///////////////////////////////////////////////////////////////////
//
// Data to build the color cycle
//

bfab.BioFabricD3 = function(width, height, md3) {

  this._tagOrder = [
                    "EX-blue",
				    "EX-orange",
				    "EX-dark-cyan",
				    "EX-red",
				    "EX-dark-orange",
				    "EX-dark-gray-purple",
				    "EX-cyan",
				    "EX-yellow-orange",
				    "EX-pure-blue",
				    "EX-dark-yellow-green",
				    "EX-dark-magenta",
				    "EX-dark-green",
				    "EX-blue-magenta",
				    "EX-yellow-green",
				    "EX-magenta",
				    "EX-green",
				    "EX-yellow",
				    "EX-purple",
				    "EX-dark-purple",
				    "EX-dark-red",
				    "EX-pale-green",
				    "EX-pale-blue",
				    "EX-dark-tan",
				    "EX-pale-blue-magenta",
				    "EX-pale-yellow orange",
				    "EX-medium-magenta",
				    "EX-pale-red",
				    "EX-pale-cyan",
				    "EX-pale-yellow-green",
				    "EX-pale-purple",
				    "EX-pale-magenta",
				    "EX-pale-red-orange"
				  ];

  this._baseColors = {
				     "EX-cyan":{"r":0, "g":255, "b":255},
				     "EX-dark-cyan":{"r":0, "g":100, "b":128},
				     "EX-yellow-orange":{"r":255, "g":153, "b":0},
				     "EX-pale-green":{"r":133, "g":205, "b":102},
				     "EX-dark-green":{"r":39, "g":128, "b":0},
				     "EX-pale-red-orange":{"r":230, "g":156, "b":138},
				     "EX-yellow-green":{"r":154, "g":255, "b":0},
				     "EX-yellow":{"r":255, "g":203, "b":0},
				     "EX-dark-gray-purple":{"r":0, "g":25, "b":128},
				     "EX-pale-magenta":{"r":212, "g":138, "b":230},
				     "EX-pale-purple":{"r":149, "g":165, "b":230},
				     "EX-purple":{"r":102, "g":51, "b":255},
				     "EX-dark-red":{"r":140, "g":56, "b":56},
				     "EX-red":{"r":255, "g":0, "b":0},
				     "EX-pale-yellow-green":{"r":222, "g":230, "b":138},
				     "EX-dark-purple":{"r":77, "g":56, "b":140},
				     "EX-pale-cyan":{"r":138, "g":230, "b":181},
				     "EX-pure-blue":{"r":0, "g":0, "b":255},
				     "EX-dark-yellow-green":{"r":114, "g":128, "b":0},
				     "EX-magenta":{"r":255, "g":0, "b":255},
				     "EX-dark-tan":{"r":166, "g":133, "b":83},
				     "EX-pale-blue":{"r":102, "g":183, "b":205},
				     "EX-orange":{"r":255, "g":103, "b":0},
				     "EX-medium-magenta":{"r":166, "g":83, "b":166},
				     "EX-blue-magenta":{"r":155, "g":0, "b":255},
				     "EX-green":{"r":0, "g":255, "b":0},
				     "EX-dark-magenta":{"r":102, "g":0, "b":128},
				     "EX-pale-blue-magenta":{"r":146, "g":102, "b":205},
				     "EX-pale-yellow orange":{"r":205, "g":175, "b":102},
				     "EX-dark-orange":{"r":128, "g":92, "b":0},
				     "EX-blue":{"r":0, "g":152, "b":255},
				     "EX-pale-red":{"r":205, "g":102, "b":153}
                    };

  this._d3 = md3;
  this._width = width;
  this._hw = this._width / 2;
  this._height = height;
  this._hh = this._height / 2;
  this._PAD = 40;
  this._GRID = 18;
  this._LINK_WIDTH = 3;
  this._NODE_WIDTH = 3;
  
  this._bsvg = this._d3.select(".inner").append("svg:svg")
					  .attr("width", this._width)
					  .attr("height", this._height)
					  .style("background-color", "#FFFFFF");
    
};

///////////////////////////////////////////////////////////////////
//
// Generate colors from the color cycle
//

bfab.BioFabricD3.prototype._cycleColor = function(mult) {
  var that = this;
  return function(d, i) { 
    var tag = that._tagOrder[i % that._tagOrder.length];
    var myR = Math.min(255, that._baseColors[tag].r * mult);
    var myG = Math.min(255, that._baseColors[tag].g * mult);
    var myB = Math.min(255, that._baseColors[tag].b * mult);
    return (that._d3.rgb(myR, myG, myB));
  };
};

///////////////////////////////////////////////////////////////////
//
// Draw the endpoint glyphs while bringing the links forward:
//

bfab.BioFabricD3.prototype._drawGlyphs = function(mySvg, myGraph) {
  var that = this;
  var myg = mySvg.selectAll(".glyph")
      .data(myGraph.links)
      .enter().append("svg:rect")
      .attr("class", "glyph")
      .attr("x", function(d) {return that._PAD + d.col* that._GRID - 5; })
      .attr("y", function(d) {return that._PAD + myGraph.nodes[d.source].row * that._GRID - 5; })
      .attr("width", 10)
      .attr("height", 10)
      .style("stroke-width", function(d) { return 4; })
      .style("stroke", "black")
      .style("fill", this._cycleColor(1/1.43))
      .style("opacity", "1.0")
      .append("svg:title")
      .text(function(d) { return myGraph.nodes[d.source].name + "-" + myGraph.nodes[d.target].name; });
  
 var myg2 = mySvg.selectAll(".glyph2")
      .data(myGraph.links)
      .enter().append("svg:rect")
      .attr("class", "glyph2")
      .attr("x", function(d) {return that._PAD + d.col * that._GRID - 5; })
      .attr("y", function(d) {return that._PAD + myGraph.nodes[d.target].row * that._GRID - 5; })
      .attr("width", 10)
      .attr("height", 10)
      .style("stroke-width", function(d) { return 4; })
      .style("stroke", "black")
      .style("fill", this._cycleColor(1/1.43))
      .style("opacity", "1.0")
      .append("svg:title")
      .text(function(d) { return myGraph.nodes[d.source].name + "-" + myGraph.nodes[d.target].name; });
};

///////////////////////////////////////////////////////////////////
//
// Draw node labels:
//

bfab.BioFabricD3.prototype._drawLabels = function(mySvg, myGraph) {
  var that = this;
  mySvg.selectAll(".nodeLabel")
       .data(myGraph.nodes)
       .enter().append("svg:text")
       .attr("class", "nodeLabel")
       .text(function(d) { return d.name; })
       .style("opacity", "0.98")
       .attr("x", function(d) { return that._PAD + (that._GRID * d.minCol); })
       .attr("y", function(d) { return that._PAD + (that._GRID * d.row); })
       .append("svg:title")
       .text(function(d) { return d.name; });

  var zlSel = mySvg.selectAll(".zoneLabel")
       .data(myGraph.nodes)
       .enter().append("svg:text")
       .attr("transform", function(d) { return "translate(0,0)"; })
       .attr("class", "zoneLabel")
       .text(function(d) { return d.name; })
       .style("opacity", "0.98");

  zlSel.append("svg:title").text(function(d) { return d.name; });

  function _sizeIt(d, i) {
    var bbw = zlSel[0][i].getBBox().width;
    var bbh = zlSel[0][i].getBBox().height;
    var sfac = (that._GRID * (d.zoneMax - d.zoneMin) * 0.667) / bbw;
    if (sfac > .33) {
      return "translate(" + (that._PAD + (that._GRID * (d.zoneMin + d.zoneMax) / 2)) + "," + (that._PAD + (that._GRID * (d.row - 1))) + ") scale(" + sfac  + ")";
    } else {
      return "translate(" + (that._PAD + (that._GRID * (d.zoneMin + d.zoneMax) / 2) + (0.4 * bbh / 2)) + "," + (that._PAD + (that._GRID * (d.row - 1)) - (0.4 * bbw / 2)) + ") rotate(" + -90  + ") scale(" + 0.4  + ")";
    }
  }
  zlSel.attr("transform", _sizeIt);
};


///////////////////////////////////////////////////////////////////
//
// Initialize some data:
//

bfab.BioFabricD3.prototype._initData = function(myGraph) {

  //
  // Add and initialize some stuff to the graph we read in:
  //
  for (var i = 0; i < myGraph.nodes.length; i++) {
    myGraph.nodes[i].row = -1;
    myGraph.nodes[i].degree = 0;
    myGraph.nodes[i].zoneMin = -1000;
    myGraph.nodes[i].zoneMax = -1000;
    myGraph.nodes[i].neighbors = [];
    myGraph.nodes[i].x = 0;
    myGraph.nodes[i].y = 0;
  }

  //
  // We calculate degree and record neighbors for later sorting: 
  //

  for (var i = 0; i < myGraph.links.length; i++) {
    var link = myGraph.links[i];
    myGraph.nodes[link.source].degree++;
    myGraph.nodes[link.target].degree++;
    myGraph.nodes[link.source].neighbors.push(myGraph.nodes[link.target]);
    myGraph.nodes[link.target].neighbors.push(myGraph.nodes[link.source]);
  }
};

///////////////////////////////////////////////////////////////////
//
// Build the graph
//

bfab.BioFabricD3.prototype._buildGraph = function(mySvg, myGraph) {
   var that = this;
   mySvg.selectAll(".node")
      .data(myGraph.nodes)
      .enter().append("svg:line")
      .attr("class", "node")
      .attr("y1", function(d) { return that._PAD + (d.row * that._GRID); })
      .attr("y2", function(d) { return that._PAD + (d.row * that._GRID); })
      .attr("x1", function(d) { return that._PAD + that._GRID * d.minCol; })
      .attr("x2", function(d) { return that._PAD + that._GRID * d.maxCol; })
      .style("stroke-width", this._NODE_WIDTH)
      .style("stroke", this._cycleColor(1.43))
      .style("opacity", "1.0");
  mySvg.selectAll(".linkF")
      .data(myGraph.links)
      .enter().append("svg:line")
      .attr("class", "linkF")
      .attr("x1", function(d) { return that._PAD + d.col * that._GRID; })
      .attr("y1", function(d) { return that._PAD + myGraph.nodes[d.source].row * that._GRID; })
      .attr("x2", function(d) { return that._PAD + d.col* that._GRID; })
      .attr("y2", function(d) { return that._PAD + myGraph.nodes[d.target].row * that._GRID; })
      .style("stroke", this._cycleColor(1 / 1.43))
      .style("stroke-width", this._LINK_WIDTH)
      .style("opacity", "1.0");

   this._drawGlyphs(mySvg, myGraph);
   this._drawLabels(mySvg, myGraph);
};

///////////////////////////////////////////////////////////////////
//
// Build the row sort. (Breadth first, from the highest degree node,
// traversing neighbors in the order of degree). CRAPPY! It will only 
// correctly handle a single connected component
//

bfab.BioFabricD3.prototype._sortGraph = function(myGraph) {
  var sorter = myGraph.nodes.slice(0);
  sorter.sort(this._compareNodes);
  var currNode = sorter[0];
  currNode.row = 0;
  this._orderKids(currNode, 1);
};

///////////////////////////////////////////////////////////////////
//
// Node sorting function based on degree and name:
//

bfab.BioFabricD3.prototype._compareNodes = function(a, b) {
  if (a.degree < b.degree) {
     return 1;
  } else if (a.degree > b.degree) {
     return -1;
  } else {
     return (-a.name.localeCompare(b.name));
  }
};

///////////////////////////////////////////////////////////////////
//
// Order the neighbors:
//

bfab.BioFabricD3.prototype._orderKids = function(myNode, currVal) {
	
  myNode.neighbors.sort(this._compareNodes);
  var toCheck = 0;
  for (var i = 0; i < myNode.neighbors.length; i++) {
    var checkNode = myNode.neighbors[i];
    if (checkNode.row === -1) {
      checkNode.row = currVal++;
      toCheck++;
    }
  }
  if (toCheck > 0) {
    for (var i = 0; i < myNode.neighbors.length; i++) {
      var checkNode = myNode.neighbors[i];
      if (checkNode.row !== -1) {
        currVal = this._orderKids(checkNode, currVal);
      }
    }
  }
  return (currVal);
};

///////////////////////////////////////////////////////////////////
//
// Link sorting comparator
//

bfab.BioFabricD3.prototype._compareGuys = function(a, b) {
	
  if (a.min < b.min) {
     return -1;
  }
  if (a.min > b.min) {
     return 1;
  // mins are the same:
  } 
  if (a.max < b.max) {
     return -1;
  } 
  if (a.max > b.max) {
     return 1;
  }
  return 0;
};

///////////////////////////////////////////////////////////////////
//
// Link sorting
//

// Horribly inefficient, but this is a small demo...

bfab.BioFabricD3.prototype._sortLinks = function(myGraph) {

  var sorter = [];
  for (var i = 0; i < myGraph.links.length; i++) {
    var link = myGraph.links[i];
    var aGuy = {};
    aGuy.min = Math.min(myGraph.nodes[link.source].row, myGraph.nodes[link.target].row);
    aGuy.max = Math.max(myGraph.nodes[link.source].row, myGraph.nodes[link.target].row);
    aGuy.index = i;
    sorter.push(aGuy);
  }
  sorter.sort(this._compareGuys);
  var lastGuy = null;
  for (var i = 0; i < sorter.length; i++) {
    var aGuy = sorter[i];
    var useLink = myGraph.links[aGuy.index];
    useLink.col = i;
    if ((lastGuy != null) && (aGuy.min > lastGuy.min)) {
      var gotIt = false;
      for (var j = i - 1; j >= 0; j--) {
        if ((sorter[j].min < lastGuy.min) || (j === 0)) {  
          for (var k = 0; k < myGraph.nodes.length; k++) {
            var chkNode = myGraph.nodes[k];
            if (chkNode.row === lastGuy.min) {
              gotIt = true;
              myGraph.nodes[k].zoneMin = j;
              myGraph.nodes[k].zoneMax = i;
              break;
            }
          }
          if (gotIt) {
            break;
          }
        }
      }
    }
    lastGuy = aGuy;
  }
};

///////////////////////////////////////////////////////////////////
//
// Figure out the final node lengths:
// 

bfab.BioFabricD3.prototype._boundNodes = function(myGraph) {

  for (var i = 0; i < myGraph.nodes.length; i++) {
    myGraph.nodes[i].minCol = Number.MAX_VALUE / 2;
    myGraph.nodes[i].maxCol = -Number.MAX_VALUE / 2;
  }

  for (var i = 0; i < myGraph.links.length; i++) {
    var link = myGraph.links[i];
    if (link.col < myGraph.nodes[link.source].minCol) {
      myGraph.nodes[link.source].minCol = link.col;
    }
    if (link.col > myGraph.nodes[link.source].maxCol) {
      myGraph.nodes[link.source].maxCol = link.col;
    }
    if (link.col < myGraph.nodes[link.target].minCol) {
      myGraph.nodes[link.target].minCol = link.col;
    }
    if (link.col > myGraph.nodes[link.target].maxCol) {
      myGraph.nodes[link.target].maxCol = link.col;
    }
  }
};

///////////////////////////////////////////////////////////////////
//
// Closure of function
// 

bfab.BioFabricD3.prototype._d3FuncClosure = function() {
  that = this;
  return (function (error, graph) { that._d3Func(error, graph); });
};


///////////////////////////////////////////////////////////////////
//
// Function to hand d3 with argument to instantiate:
// 

bfab.BioFabricD3.prototype._d3Func = function(error, graph) {

  //
  // Add and initialize some stuff to the graph we read in:
  //

  this._initData(graph);

  //
  // Figure out the width and height we need to zoom to fit it all in.
  // Note we are assuming more links than nodes: 
  //

  var gwidth = (2 * this._PAD) + (this._GRID * graph.links.length);
  var gheight = (2 * this._PAD) + (this._GRID * graph.nodes.length);
  var sfac = this._width / gwidth;

  //
  // Add the zooming transform at the top of the SVG tree. 
  //

  var svg = this._bsvg.append("svg:g").attr("transform", "translate(" + this._hw + "," + this._hh + ") scale(" + sfac + ") translate(-" + gwidth / 2 + ",-" + gheight / 2 + ")");

  //
  // Lay it out:
  //

  this._sortGraph(graph);
  this._sortLinks(graph);
  this._boundNodes(graph);

  //
  // Draw it:
  //

  this._buildGraph(svg, graph);

};


///////////////////////////////////////////////////////////////////
//
//  WARNING! The code has NOT been tested on different networks! Probably handles singleton nodes and duplicate links incorrectly!
// 

bfab.BioFabricD3.prototype.drawFabric = function(fileName) {
  this._d3.json(fileName, this._d3FuncClosure());
};

