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
            var markers = {
				"marker": [
					{"name": "Ferme de Paris", "address": "1 route de Pesage, 75012 Paris, France", "lat": "48.822477", "lng": "2.444399", "type": "producteur"},
					{"name": "Supérette d'Orléans", "address": "130 Boulevard Brune, 75014 Paris, France", "lat": "48.823423", "lng": "2.323553", "type": "pointRelais"},
					{"name": "Supérette", "address": "21 Avenue de Verdun, 92170 Vanves, France", "lat": "48.820826", "lng": "2.294402", "type": "pointRelais"},
					{"name": "Ferme de Gally", "address": "33 Rue de Chatou, 78500 Sartrouville, France", "lat": "48.941605", "lng": "2.189682", "type": "producteur"},
					{"name": "Ferme pédagogique de la Butte Pinson", "address": "16 Rue Suzanne Valadon, 95360 Montmagny", "lat": "48.967287", "lng": "2.353129", "type": "producteur"}			
				]
			};
			
            for (var i = 0; i<markers.marker.length; i++) {
              var name = markers.marker[i].name;
              var address = markers.marker[i].address;
              var type = markers.marker[i].type;
              var point = new google.maps.LatLng(
                  parseFloat(markers.marker[i].lat),
                  parseFloat(markers.marker[i].lng));
              var infowincontent = document.createElement('div');
              var strong = document.createElement('strong');
              strong.textContent = name;
              infowincontent.appendChild(strong);
              infowincontent.appendChild(document.createElement('br'));
              var text = document.createElement('text');
              text.textContent = address;
              infowincontent.appendChild(text);
              var icon = customLabel[markers.marker[i].type] || {};
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
            }
			
			var markerCluster = new MarkerClusterer(map, markerTab,
            {imagePath: 'markerClusterer/m'});
			
          };

      function doNothing() {}
