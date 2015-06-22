js-orgChart
========

Javascript Organizational Chart

<img src="https://img.shields.io/dub/l/vibe-d.svg" />

<h2><a name="about" class="anchor" href="#about"><span class="mini-icon mini-icon-link"></span></a>About</h2>

Based on Surnfu's <a href="http://www.on-cn.com">organization.js</a> and expansion feature for draw organizational chart.

V2 version with an example is available <a href="https://github.com/rchockxm/js-orgChart-2">here</a>.

<img src="http://i.imgur.com/Z3p0xJB.png" />
<img src="http://i.imgur.com/emBdz13.png" />
<img src="http://i.imgur.com/sMJN4K4.png" />

<h2><a name="usage" class="anchor" href="#usage"><span class="mini-icon mini-icon-link"></span></a>Usage</h2>

```html
<script language="javascript" src="js-orgchart.js"></script>
<link rel="stylesheet" type="text/css" href="js-orgchart.css">
<div id="OrgChart"></div>
<script>
var tOptions = new OrgOptions();
var tStyleSheet = new OrgStyleSheet();
var ogChart = new OrgChart();
ogChart.Options = tOptions;
ogChart.StyleSheet = tStyleSheet;
ogChart.Render();
</script>
```

<h2><a name="options" class="anchor" href="#options"><span class="mini-icon mini-icon-link"></span></a>Options</h2>

```js
var tOptions = new OrgOptions();
tOptions.AutoPos = true;
tOptions.Top = 8;
tOptions.Left = 20;
tOptions.paddingOffsetTop = 0;
tOptions,paddingOffsetLeft = 0;
tOptions.IntervalWidth = 100;
tOptions.IntervalHeight = 60;
tOptions.LineColor = "#3388dd";
tOptions.LineSize = 1;
tOptions.EdgeTemplet = "<div id=\"{Id}\" class=\"OrgEdge\"><span>{Caption}</span><div>{Description}</div></div>";
```

<h2><a name="stylesheet" class="anchor" href="#stylesheet"><span class="mini-icon mini-icon-link"></span></a>StyleSheet</h2>

```js
var tStyleSheet = new OrgStyleSheet();
tStyleSheet.CssText = "";
```

<h2><a name="event" class="anchor" href="#event"><span class="mini-icon mini-icon-link"></span></a>Event</h2>

```js
var ogChart = new OrgChart();
ogChart.NodeOnClick = function() {};
ogChart.NodeOnMouseMove = function() {};
ogChart.NodeOnMouseOver = function() {};
ogChart.NodeOnMouseOut = function() {};
ogChart.DepthOnProcess = function(Depths, n) {};
```

<h2><a name="usage" class="anchor" href="#usage"><span class="mini-icon mini-icon-link"></span></a>Google Organizational Chart Data Supported</h2>

```js
var tGoogleData = [
          [{v:'Mike', f:'Mike<div style="color:red; font-style:italic">President</div>'}, '', 'The President'],
          [{v:'Jim', f:'Jim<div style="color:red; font-style:italic">Vice President</div>'}, 'Mike', 'VP'],
          ['Alice', 'Mike', ''],
          ['Bob', 'Jim', 'Bob Sponge'],
          ['Carol', 'Bob', '']];
 
tRootNode = LoadGoogleOrgChartData(tGoogleData);
```

<a href="https://developers.google.com/chart/interactive/docs/gallery/orgchart">Google Chart</a>

You can view a demo of this <a href="http://jsfiddle.net/gh/get/library/pure/rchockxm/js-orgChart/tree/master/demo">here</a>.

<h2><a name="author" class="anchor" href="#author"><span class="mini-icon mini-icon-link"></span></a>Author</h2>
* 2013 rchockxm (rchockxm.silver@gmail.com)
* 2009 Surnfu composition (Surnfu@126.com)

<h2><a name="credits" class="anchor" href="#credits"><span class="mini-icon mini-icon-link"></span></a>Credits</h2>
* Surnfu - core
* yifeng - getElementPosLeft, getElementPosTop
