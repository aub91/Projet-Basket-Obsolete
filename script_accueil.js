function showMenu() {
            var x = document.getElementById("mobileMenu");
            if (x.className.indexOf("w3-show") == -1) {
                x.className += " w3-show";
            } else { 
                x.className = x.className.replace(" w3-show", "");
            }
}

function showLogin() {
	var x = document.getElementById("login");
	if (x.className.indexOf("w3-show") == -1) { 
		x.className += " w3-show";
	} else {
		x.className = x.className.replace(" w3-show", "");
	}
}
        

	var customLabel = {
		pointRelais: {
			label: 'PR'
		},
		producteur: {
			label: 'P'
		}
	};

        function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(48.856614, 2.352222),
          zoom: 8
        });
        var infoWindow = new google.maps.InfoWindow;
		var markerTab = [];
          // Change this depending on the name of your PHP or XML file
          downloadUrl('placeData.xml', function(data) {
            var xml = data.responseXML;
            var markers = xml.documentElement.getElementsByTagName('marker');
            Array.prototype.forEach.call(markers, function(markerElem) {
              var name = markerElem.getAttribute('name');
              var address = markerElem.getAttribute('address');
              var type = markerElem.getAttribute('type');
              var point = new google.maps.LatLng(
                  parseFloat(markerElem.getAttribute('lat')),
                  parseFloat(markerElem.getAttribute('lng')));

              var infowincontent = document.createElement('div');
              var strong = document.createElement('strong');
              strong.textContent = name
              infowincontent.appendChild(strong);
              infowincontent.appendChild(document.createElement('br'));

              var text = document.createElement('text');
              text.textContent = address
              infowincontent.appendChild(text);
              var icon = customLabel[type] || {};
              var marker = new google.maps.Marker({
                map: map,
                position: point,
                label: icon.label
              });
              marker.addListener('click', function() {
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker);
              });
			  markerTab.push(marker);
            });
			var markerCluster = new MarkerClusterer(map, markerTab,
            {imagePath: 'exampleClusterer/m'});
          });
		  
		  
		  // Add a marker clusterer to manage the markers.
        
        }

      function downloadUrl(url, callback) {
        var request = window.ActiveXObject ?
            new ActiveXObject('Microsoft.XMLHTTP') :
            new XMLHttpRequest;

        request.onreadystatechange = function() {
          if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
          }
        };

        request.open('GET', url, true);
        request.send(null);
      }

      function doNothing() {}
