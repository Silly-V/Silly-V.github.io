(function init(){

	function main(){
	/*
		selector offset positioning
		------------------------------
		SpeciesNumber : 0
		NumberByPartyHours : 112
		ReportingCounts : 224
		ReportingObservers : 337
	*/

		var graphObj = {
			SpeciesNumber : {
				selectorPosition : 0,
				wheelAngle : 0,
				text : "Species Number"
			},
			NumberByPartyHours : {
				selectorPosition : 112,
				wheelAngle : -90,
				text : "Number by Party Hours"
			},
			ReportingCounts : {
				selectorPosition : 224,
				wheelAngle : -180,
				text : "Reporting Counts"
			},
			ReportingObservers : {
				selectorPosition : 337,
				wheelAngle : -270,
				text : "Reporting Observers"
			}
		};

		$(document).ready(function(){

			setTimeout(function(){

				new Vue({
					el: '#root',
					data: {
						link_previous : function(){ return $("#linkPrevious").text() + ".html" },
						link_next : function(){ return $("#linkNext").text() + ".html" },
						chosenItemInfo : graphObj,
						chosenItem : "SpeciesNumber",
						styleColor : function(name){
							if(name == this.chosenItem){
								return "#9e005d";
							} else {
								return "#534741";
							}
						},
						selectorPosition : 0
					},
					methods: {

					},
					watch: {
						chosenItem : function(){
							TweenLite.to("#selector", 1, { x : graphObj[this.chosenItem].selectorPosition });
							TweenLite.to("#wheel", 1, { rotation : graphObj[this.chosenItem].wheelAngle, transformOrigin : "center center" });
							// this.selectorPosition = graphObj[this.chosenItem];
							// console.log("The number is: " + graphObj[this.chosenItem]);
						}
					}
				});

				setTimeout(function(){$("#loader-zone").css({"opacity" : 0});},10);

				if(navigator.userAgent.indexOf("MSIE ") > 0 || navigator.userAgent.indexOf("Trident") > 0 || navigator.userAgent.indexOf("Edge") > 0){
					$("#rightArrow g,#leftArrow g").removeAttr("filter"); // this filter along with gradient, do not work well in IE11
				}

				var hiddenElems = $(".reveal-grp");
				hiddenElems.each(function(index, item){
					$(item).removeAttr("display");//.delay(120 * (index + 1)).fadeIn(500);
				});
				hiddenElems.not("#SpeciesNumberGraph,#NumberByPartyHoursGraph,#ReportingCountsGraph,#ReportingObserversGraph").each(function(index, item){
					$(item).delay(150 * (index)).animate({"opacity" : 1}, 600);
				});

			}, 10);
		});

	}

	var head = document.head || document.getElementsByTagName("head")[0] || document.getElementsByTagName("svg")[0];
	function createStyle(cssString, id, parent){
		var css = cssString,
	    style = document.createElement('style');

		style.type = 'text/css';
		style.id = id;
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}

		return parent.appendChild(style);
	};
	createStyle(
		'svg { width: 100%;height: 768px; }' +
		'body { background-color: ' + "#FFFFCE" +  '; }' +
		'#blank-pages { transition: all 0.25s; opacity: 1; }' +
		'text[active] tspan { color: #9e005d; }' +
		'text:not([active]) tspan { color: #534741; }' +
		'#BtnReportingObservers:hover,#BtnReportingCounts:hover,#BtnNumberByPartyHours:hover,#BtnSpeciesNumber:hover { cursor: pointer; }' +
		'#ReportingObserversGraph,#ReportingCountsGraph,#NumberByPartyHoursGraph,#SpeciesNumberGraph { transition: opacity 1s; }' +
		'#loader-zone { opacity : 1; transition: opacity 1s; }' +
		// '.reveal-grp { transition: opacity 0.3s }' +
		'#BtnReportingObservers[active] text tspan { color : #9e005d },#BtnReportingCounts[active] text tspan { color : #9e005d },#BtnNumberByPartyHours[active] text tspan { color : #9e005d },#BtnSpeciesNumber[active] text tspan { color : #9e005d } { cursor: pointer; }',
		"init-style",
		head
	);

	createStyle(
		'	@font-face {\n' + 
		'    font-family: \'TwCenMT-Regular\';\n' +
		'    src: url(\'fonts/Tw Cen MT.ttf\') format("truetype");\n' +
		'	}\n' +
		'	@font-face {\n' + 
		'    font-family: \'TwCenMT-Bold\';\n' +
		'    src: url(\'fonts/Tw Cen MT Bold.ttf\') format("truetype");\n' +
		'	}\n' +
		'	@font-face {\n' +
		'    font-family: \'Parisienne-Regular\';\n' +
		'    src: url(\'fonts/Parisienne-Regular.ttf\') format("truetype");\n' +
		'	}\n' +
		'	@font-face {\n' +
		'    font-family: \'CourierNewPSMT\';\n' +
		'    src: url(\'fonts/Courier New.ttf\') format("truetype");\n' +
		'	}',
		"font-style",
		head
	);

	$($("svg").get(0)).attr("id", "root");

	var keyNames = [
		"ReportingObservers",
		"ReportingCounts",
		"NumberByPartyHours",
		"SpeciesNumber"
	];

	$(window).on('load', function(){

		$("#graphName").attr("text-anchor", "middle").attr("transform", "matrix(1 0 0 1 763.22 146.9308)");

		var hiddenElems = $("g[display=none],g[DISPLAY=none]"), thisItem, thisItemId;
		hiddenElems.each(function(index, item){
			thisItem = $(item);
			thisItemId = (thisItem.get(0).id);

			thisItem.addClass("reveal-grp").css({"opacity" : 0});

		});

		var allNodes = $("*[onload]");
		// console.log(allNodes.length);
		allNodes.each(function(index, elem){
			var thisJsElem = $(elem), thisOnloadString = thisJsElem.attr("onload"), strArr = [], firstEqIndex, subStrArr = [], thisSubItem;
			if(thisOnloadString != ""){
				subStrArr = thisOnloadString.split("|||");
				for (var i = 0; i < subStrArr.length; i++) {
					thisSubItem = subStrArr[i];
					firstEqIndex = thisSubItem.indexOf("=");
					if(firstEqIndex == -1){
						continue;
					}
					thisJsElem.attr(thisSubItem.substring(0, firstEqIndex), thisSubItem.substring(firstEqIndex + 1, thisSubItem.length));
				}
				thisJsElem.attr(strArr[0], strArr[1]);
				thisJsElem.removeAttr("onload");
			}
		});

		$("#BtnReportingObservers text tspan,#BtnReportingCounts text tspan,#BtnNumberByPartyHours text tspan,#BtnSpeciesNumber text tspan").each(function(index, item){
			$(item).removeAttr("fill");
		});

		main();

	});


})();

// v-bind:fill=styleColor('NumberByPartyHours')|||v-bind:active=chosenItem=='NumberByPartyHours'