js-orgChart
========

Javascript Organizational Chart

<h2><a name="about" class="anchor" href="#about"><span class="mini-icon mini-icon-link"></span></a>About</h2>

Based on Surnfu's <a href="http://www.on-cn.com">organization.js</a> and expansion feature for draw organizational chart.

<img src="http://i.imgur.com/Z3p0xJB.png" />

<h2><a name="about" class="anchor" href="#about"><span class="mini-icon mini-icon-link"></span></a>Usage</h2>

<div class="highlight highlight-html">
<pre>
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
</pre>
<div>

<h2><a name="about" class="anchor" href="#about"><span class="mini-icon mini-icon-link"></span></a>Changelog</h2>

<h4>1.061</h4>
- Fixed example of 'Example-Select-Option.html' and 'Example.html', element has no document object(Thanks seanybob).

<h4>1.06</h4>
- Added DepthOnProcess for OrgChart to set event.

<h4>1.04</h4>
- Added NodeOnMouseMove, NodeOnMouseOver, NodeOnMouseOut for OrgChart to set node mouse event.
- Fixed some bugs.

<h4>1.03</h4>
- Added NodeOnClick for OrgChart to set node click event.
- Added RootNodes ror OrgChart to set nodes data.

<h4>1.02</h4/>
- Added GetContainerStyle function to get chart style.
- Added paddingOffsetTop and paddingOffsetLeft for OrgOptions to set padding pos.
- Added HightlightText and HightlightTextColor for OrgNode to set color text.
- Fixed some bugs.

<h4>1.01</h4/>
- Added support Google Organizational Chart data. 
- Added OrgOptions and OrgStyleSheet function.
- Added html parent element position adaptive.
- Fixed some bugs.

<h2><a name="author" class="anchor" href="#author"><span class="mini-icon mini-icon-link"></span></a>AUTHOR</h2>
* 2013 rchockxm (rchockxm.silver@gmail.com)
* 2009 Surnfu composition (Surnfu@126.com)

<h2><a name="credits" class="anchor" href="#credits"><span class="mini-icon mini-icon-link"></span></a>CREDITS</h2>
* Surnfu - core
* yifeng - getElementPosLeft, getElementPosTop
