function imgToSvg(){
	$('img.svg').each(function(){
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg');

			// Add replaced image's ID to the new SVG
			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a').removeAttr('width').removeAttr('height');

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');

	});

} //imgToSvg


/*------------------------------------*\
	#TOGGLE FUNCTIONS
\*------------------------------------*/

var canadamap = document.getElementById("canada-map"),
	provinceInfo = document.getElementById("provinceInfo"),
	allProvinces = canadamap.querySelectorAll("g");
	canadamap.addEventListener("click", function(e){
		var province = e.target.parentNode;
		if(e.target.nodeName == "path") {
		for (var i=0; i < allProvinces.length; i++) {
			allProvinces[i].classList.remove("active");
		}
		province.classList.add("active");
		var provinceName = province.querySelector("title").innerHTML,
		provincePara = province.querySelector("desc p");
		sourceImg = province.querySelector("img"),
		imgPath = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/";
		provinceInfo.innerHTML = "";
		provinceInfo.insertAdjacentHTML("afterbegin", "<img src="+imgPath + sourceImg.getAttribute('xlink:href')+" alt='"+sourceImg.getAttribute('alt')+"'><h1>"+provinceName+"</h1><p>"+provincePara.innerHTML+"</p>");
		provinceInfo.classList.add("show");
		}
	})