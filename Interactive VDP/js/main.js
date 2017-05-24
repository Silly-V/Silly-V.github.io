(function main(){
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

})();
