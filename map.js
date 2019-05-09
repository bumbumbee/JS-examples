// ======= MAP =======

// ----------- main variables and functions --------------
var map,
    infowindow,
    service,
    markers = [],
    marker,
    bounds,
    markerCluster,
    myStyles = [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                {visibility: "off"}
            ]
        }
    ],
    options = {
        zoom: 15,
        // mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: myStyles
    },
    clusterStyles = [
        {
            textColor: 'white',
            url: '../dist/images/glow.png',
            height: 46,
            width: 46,
            backgroundPosition: 'center',
            textSize: 14,
        },
    ];

function ZoomControl(controlDiv, map) {

    // Creating divs & styles for custom zoom control
    controlDiv.style.padding = '15px';

    // Set CSS for the control wrapper
    var controlWrapper = document.createElement('div');
    controlWrapper.style.cursor = 'pointer';
    controlWrapper.style.textAlign = 'center';
    controlWrapper.style.width = '41px';
    controlWrapper.style.height = '81px';
    controlDiv.appendChild(controlWrapper);

    // Set CSS for the zoomIn
    var zoomInButton = document.createElement('div');
    zoomInButton.style.width = '41px';
    zoomInButton.style.height = '41px';
    zoomInButton.style.borderRadius = '10px 10px 0 0';
    zoomInButton.style.borderBottom = '1px solid #e5e5e5';
    /* Change this to be the .png image you want to use */
    zoomInButton.style.backgroundImage = 'url("../dist/images/zoomin.png")';
    controlWrapper.appendChild(zoomInButton);

    // Set CSS for the zoomOut
    var zoomOutButton = document.createElement('div');
    zoomOutButton.style.width = '41px';
    zoomOutButton.style.height = '41px';
    zoomOutButton.style.borderRadius = '0 0 10px 10px';
    zoomOutButton.style.borderTop = '1px solid #e5e5e5';
    /* Change this to be the .png image you want to use */
    zoomOutButton.style.backgroundImage = 'url("../dist/images/zoomout.png")';
    controlWrapper.appendChild(zoomOutButton);

    // Setup the click event listener - zoomIn
    google.maps.event.addDomListener(zoomInButton, 'click', function () {
        map.setZoom(map.getZoom() + 1);
    });

    // Setup the click event listener - zoomOut
    google.maps.event.addDomListener(zoomOutButton, 'click', function () {
        map.setZoom(map.getZoom() - 1);
    });
}

function zControls() {
    var zoomControlDiv = document.createElement('div');
    var zoomControl = new ZoomControl(zoomControlDiv, map);

    zoomControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(zoomControlDiv);
}

function createMap() {
    map = new google.maps.Map(document.getElementById('map'), options);
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    google.maps.event.addListener(map, 'zoom_changed', function () {
        infowindow.close();
    });
    google.maps.event.addListener(map, 'drag', function () {
        infowindow.close();
    });
}

function createSwiper(content, info) {
    infowindow.setContent('<div class="close-card close-swiper" onclick="infowindow.close()"></div>\n' +
        '<div class="swiper-container results-slider lunch-swiper banq-swiper">' +
        '<div class="swiper-wrapper slider-wrapper" id="wrapper">'
        + content.toString().split("</div>,").join("</div> ") +
        '</div>' +
        '</div>' +
        '<div id="controlers" class="slider-controllers">' +
        '<div class="swiper-button-prev controller left"><img src="../dist/images/prev.png"></div>' +
        '<div class="swiper-button-next controller right"><img src="../dist/images/next.png"></div>' +
        '</div>'
    );
    infowindow.open(map, info);
    infowindow.addListener("domready", function () {
        var swiper = document.getElementById('wrapper');
        var resultSwiper = new Swiper('.results-slider', {
            slidesPerView: 1,
            spaceBetween: 10,
            autoHeight: true,
            navigation: {
                nextEl: '.swiper-button-next.controller',
                prevEl: '.swiper-button-prev.controller'
            },
        });
    });
}

function toggleC(heart) {
    heart.classList.toggle('clicked');
}

function showMore(card) {
    $(card).closest('.main').addClass('hidden');
    $(card).closest('.lunch-card').find('.expand').removeClass('hidden');
}


// =================== MAIN MAP
function initMap() {
    var places = [{
        "geometry": {
            "location": {"lat": 55.70329479999999, "lng": 21.14427950000004},
            "viewport": {"south": 55.613358, "west": 21.07531800000004, "north": 55.7973229, "east": 21.2404669}
        },
        "icon": "../dist/images/beer.png",
        "id": "8cfe2ead1cc0225307e2d11a1ed1aa90db12a2f7",
        "name": "Klaipėda",
        "photos": [{
            "height": 1000,
            "html_attributions": ["<a href=\"https://maps.google.com/maps/contrib/104949121987198987785/photos\">Vladimir Iliev</a>"],
            "width": 1688
        }],
        "place_id": "ChIJi0RH5Prb5EYRoYdtFGe8rIA",
        "reference": "ChIJi0RH5Prb5EYRoYdtFGe8rIA",
        "scope": "GOOGLE",
        "types": ["locality", "political"],
        "vicinity": "Klaipėda",
        "html_attributions": []
    },
        {
            "geometry": {
                "location": {"lat": 55.7110551, "lng": 21.12998659999994},
                "viewport": {
                    "south": 55.7097442697085,
                    "west": 21.12858481970852,
                    "north": 55.7124422302915,
                    "east": 21.131282780291485
                }
            },
            "icon": "../dist/images/wine.png",
            "id": "38668bb999604bdb4efda24dadd24be228657871",
            "name": "Amberton Hotel Klaipėda",
            "opening_hours": {"open_now": true},
            "photos": [{
                "height": 2661,
                "html_attributions": ["<a href=\"https://maps.google.com/maps/contrib/106674915298335320916/photos\">Amberton Hotel Klaipėda</a>"],
                "width": 3992
            }],
            "place_id": "ChIJBTWSUuXb5EYRfID8wMj5KDo",
            "plus_code": {"compound_code": "P46H+CX Klaipėda, Lietuva", "global_code": "9G73P46H+CX"},
            "rating": 4.2,
            "reference": "ChIJBTWSUuXb5EYRfID8wMj5KDo",
            "scope": "GOOGLE",
            "types": ["lodging", "point_of_interest", "establishment"],
            "user_ratings_total": 1382,
            "vicinity": "Naujojo Sodo gatvė 1A, Klaipėda",
            "html_attributions": []
        },
        {
            "geometry": {
                "location": {"lat": 55.713151, "lng": 21.12667280000005},
                "viewport": {
                    "south": 55.7118461197085,
                    "west": 21.12541956970847,
                    "north": 55.7145440802915,
                    "east": 21.128117530291547
                }
            },
            "icon": "../dist/images/coffee.png",
            "id": "42d5c7b3606bca4ae75c50db67781b781f3f3bb7",
            "name": "LITINTERP svečių namai, UAB KAMAVA",
            "opening_hours": {"open_now": true},
            "photos": [{
                "height": 576,
                "html_attributions": ["<a href=\"https://maps.google.com/maps/contrib/103010605782000056098/photos\">LITINTERP svečių namai, UAB KAMAVA</a>"],
                "width": 1024
            }],
            "place_id": "ChIJuZWxqOXb5EYRmtle8G9LzvQ",
            "plus_code": {"compound_code": "P47G+7M Klaipėda, Lietuva", "global_code": "9G73P47G+7M"},
            "rating": 4.3,
            "reference": "ChIJuZWxqOXb5EYRmtle8G9LzvQ",
            "scope": "GOOGLE",
            "types": ["lodging", "point_of_interest", "establishment"],
            "user_ratings_total": 103,
            "vicinity": "Puodžių gatvė 17, Klaipėda",
            "html_attributions": []
        },
        {
            "geometry": {
                "location": {"lat": 55.7165597, "lng": 21.12840410000001},
                "viewport": {
                    "south": 55.7152230197085,
                    "west": 21.127116019708524,
                    "north": 55.7179209802915,
                    "east": 21.129813980291487
                }
            },
            "icon": "../dist/images/coffee.png",
            "id": "35289be6dd3ca42c21fe7982713c6a642bea00c8",
            "name": "Hotel Navalis",
            "photos": [{
                "height": 1333,
                "html_attributions": ["<a href=\"https://maps.google.com/maps/contrib/105555895672045703140/photos\">Anatolij Chomko</a>"],
                "width": 2000
            }],
            "place_id": "ChIJNzX-deTb5EYRCCHyUmNONxc",
            "plus_code": {"compound_code": "P48H+J9 Klaipėda, Lietuva", "global_code": "9G73P48H+J9"},
            "rating": 4.1,
            "reference": "ChIJNzX-deTb5EYRCCHyUmNONxc",
            "scope": "GOOGLE",
            "types": ["lodging", "point_of_interest", "establishment"],
            "user_ratings_total": 303,
            "vicinity": "H. Manto gatvė 23, Klaipėda",
            "html_attributions": []
        },
        {
            "geometry": {
                "location": {"lat": 55.7164849, "lng": 21.13057219999996},
                "viewport": {
                    "south": 55.7150761197085,
                    "west": 21.12934646970848,
                    "north": 55.7177740802915,
                    "east": 21.132044430291444
                }
            },
            "icon": "../dist/images/pizza1.png",
            "id": "c6920fae6db686553d9ef5442d347999cf9aa6cb",
            "name": "Radisson Blu Hotel Klaipėda",
            "opening_hours": {"open_now": true},
            "photos": [{
                "height": 754,
                "html_attributions": ["<a href=\"https://maps.google.com/maps/contrib/111865143353442762845/photos\">Radisson Blu Hotel, Klaipeda</a>"],
                "width": 1341
            }],
            "place_id": "ChIJ0aOLOR_j5UYRhLXQRxf5lMk",
            "plus_code": {"compound_code": "P48J+H6 Klaipėda, Lietuva", "global_code": "9G73P48J+H6"},
            "rating": 4.6,
            "reference": "ChIJ0aOLOR_j5UYRhLXQRxf5lMk",
            "scope": "GOOGLE",
            "types": ["lodging", "point_of_interest", "establishment"],
            "user_ratings_total": 268,
            "vicinity": "28 Sauliu Street, Klaipėda",
            "html_attributions": []
        },
        {
            "geometry": {
                "location": {"lat": 55.718264, "lng": 21.126671999999985},
                "viewport": {
                    "south": 55.7169894197085,
                    "west": 21.125690019708486,
                    "north": 55.7196873802915,
                    "east": 21.128387980291564
                }
            },
            "icon": "../dist/images/beer.png",
            "id": "06d12318a7d8bcca84c0bc054dfdeb456164b9f4",
            "name": "Kubu",
            "opening_hours": {"open_now": true},
            "photos": [{
                "height": 720,
                "html_attributions": ["<a href=\"https://maps.google.com/maps/contrib/116833707181430751362/photos\">Hostel Kubu</a>"],
                "width": 960
            }],
            "place_id": "ChIJXaHR3uPb5EYRhilwi3IogpM",
            "plus_code": {"compound_code": "P49G+8M Klaipėda, Lietuva", "global_code": "9G73P49G+8M"},
            "rating": 4.4,
            "reference": "ChIJXaHR3uPb5EYRhilwi3IogpM",
            "scope": "GOOGLE",
            "types": ["lodging", "point_of_interest", "establishment"],
            "user_ratings_total": 108,
            "vicinity": "H. Manto gatvė 37, Klaipėda",
            "html_attributions": []
        },
        {
            "geometry": {
                "location": {"lat": 55.70856999999999, "lng": 21.13130000000001},
                "viewport": {
                    "south": 55.7072648197085,
                    "west": 21.12988011970856,
                    "north": 55.7099627802915,
                    "east": 21.132578080291523
                }
            },
            "icon": "../dist/images/wine.png",
            "id": "98c6636814a325af719aa1791f0d93112f8f16c7",
            "name": "National Hotel",
            "opening_hours": {"open_now": true},
            "photos": [{
                "height": 1020,
                "html_attributions": ["<a href=\"https://maps.google.com/maps/contrib/102166259385002416839/photos\">National Hotel, Vertaine Ltd.</a>"],
                "width": 1021
            }],
            "place_id": "ChIJpVXdQfDb5EYRj39SDgYSiGQ",
            "plus_code": {"compound_code": "P45J+CG Klaipėda, Lietuva", "global_code": "9G73P45J+CG"},
            "rating": 4.4,
            "reference": "ChIJpVXdQfDb5EYRj39SDgYSiGQ",
            "scope": "GOOGLE",
            "types": ["lodging", "restaurant", "point_of_interest", "food", "establishment"],
            "user_ratings_total": 211,
            "vicinity": "Žvejų gatvė 21, Klaipėda",
            "html_attributions": []
        },];
    createMap();
    createMarkers(places);
    zControls();
}

function createMarkers(places) {
    bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {
        // create each marker and push it to markers array
        marker = new google.maps.Marker({
            map: map,
            icon: place.icon,
            title: place.name,
            label: '',
            position: place.geometry.location,
            background: place.photos,
            rating: place.rating,
            address: place.vicinity,
        });
        bounds.extend(place.geometry.location);
        markers.push(marker);
    }
    map.fitBounds(bounds);

    // info popup for each marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].addListener('click', function () {
            infowindow.setContent(
                setCont(this)
            );
            infowindow.open(map, this);
        });
    }

    markerCluster = new MarkerClusterer(map, markers,
        {
            zoomOnClick: false,
            styles: clusterStyles,
        });

    google.maps.event.addListener(markerCluster, 'clusterclick', function (cluster) {
        var currMarkers = cluster.getMarkers();
        var content = [];
        var info = new google.maps.MVCObject;
        info.set('position', cluster.center_);

        for (i = 0; i < currMarkers.length; i++) {
            content = [...content, setCont(currMarkers[i])]
        }
        createSwiper(content, info);
    });
}

function setCont(m) {
    var content = '<div class="close-card" onclick="infowindow.close()"></div>\n' +
        '<div class="c-container swiper-slide">\n' +
        '    <div class="card card-nearby map-card">\n' +
        '        <div class="cover">\n' +
        '            <img src="../dist/images/dock.png" alt="">\n' +
        '        </div>\n' +
        '        <div class="row top-row">\n' +
        '            <div class="col-8 p-0">\n' +
        '                <div class="title card-title">\n' +
        '                    <a class="one-line" href="">' + m.title + '</a>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="col-4 p-0 ">\n' +
        '                <div class="ratingf">\n' +
        '                    <img class="fork" src="../dist/images/fork-low.png" alt="">\n' +
        '                    <img class="fork-abs" style="clip-path: inset(calc(100% - 81%) 0 0 0);"\n' +
        '                         src="../dist/images/fork-full.png" alt="">\n' +
        '                         <span>4,6</span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="row bottom-row">\n' +
        '            <div class="col-9 p-0 ellipsis">\n' +
        '                <img class="marker" src="../dist/images/marker.png" alt="">\n' +
        '                <span class="distance">1 km, </span>\n' +
        '                <span class="address">' + m.address + '</span>\n' +
        '            </div>\n' +
        '            <div class="col-3 p-0 text-right">' +
        '            <div class="price low">\n' +
        '                 <span>€</span>\n' +
        '                 <span>€</span>\n' +
        '                 <span>€</span>\n' +
        '            </div>' +
        '</div>\n' +
        '        </div>\n' +
        '        <div class="row reserve-row">\n' +
        '            <div class="col-12">\n' +
        '                <a href="">\n' +
        '                    <img class="icon" src="../dist/images/clock-black.png" alt="">\n' +
        '                    <span>Rezervuoti laiką</span>\n' +
        '                </a>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';
    return content;
}


// =================== SINGLE LOCATION MAP
function initMap2() {
    var loc = {
        "geometry": {
            "location": {"lat": 55.70856999999999, "lng": 21.13130000000001},
            "viewport": {
                "south": 55.7072648197085,
                "west": 21.12988011970856,
                "north": 55.7099627802915,
                "east": 21.132578080291523
            }
        },
        "icon": "../dist/images/wine.png",
        "id": "98c6636814a325af719aa1791f0d93112f8f16c7",
        "name": "National Hotel",
        "opening_hours": {"open_now": true},
        "photos": [{
            "height": 1020,
            "html_attributions": ["<a href=\"https://maps.google.com/maps/contrib/102166259385002416839/photos\">National Hotel, Vertaine Ltd.</a>"],
            "width": 1021
        }],
        "place_id": "ChIJpVXdQfDb5EYRj39SDgYSiGQ",
        "plus_code": {"compound_code": "P45J+CG Klaipėda, Lietuva", "global_code": "9G73P45J+CG"},
        "rating": 4.4,
        "reference": "ChIJpVXdQfDb5EYRj39SDgYSiGQ",
        "scope": "GOOGLE",
        "types": ["lodging", "restaurant", "point_of_interest", "food", "establishment"],
        "user_ratings_total": 211,
        "vicinity": "Žvejų gatvė 21, Klaipėda",
        "html_attributions": []
    };

    var options = {
        zoom: 15,
        center: loc.geometry.location,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: myStyles
    };

    // DESKTOP
    if ($('#map2').length) {
        map = new google.maps.Map(document.getElementById('map2'), options);
        var marker = new google.maps.Marker({
            position: loc.geometry.location,
            icon: '../dist/images/wine.png',
            map: map
        });
        zControls();
    }

    // MOBILE
    map = new google.maps.Map(document.getElementById('map3'), options);
    var marker = new google.maps.Marker({
        position: loc.geometry.location,
        icon: '../dist/images/wine.png',
        map: map
    });
    zControls();

};


// =================== DISCOUNTS MAP
function initMap3() {
    var discounts = [{
        "geometry": {
            "location": {"lat": 55.70856999999999, "lng": 21.13130000000001},
        },
        "icon": "../dist/images/wine.png",
        "title": "Austrių turgus kiekvieną antradienį",
        "name": "National Hotel",
        "photos": "../dist/images/discount4.png",
        "valid": "2019 liep. 15",
        "vicinity": "Žvejų gatvė 21, Klaipėda",
    },
        {
            "geometry": {
                "location": {"lat": 55.70329479999999, "lng": 21.14427950000004},
            },
            "icon": "../dist/images/beer.png",
            "title": "Mažasis penktadienis su draugais! Kokteiliai 2 už 1!",
            "name": "National Hotel",
            "photos": "../dist/images/discount3.png",
            "valid": "2019 liep. 15",
            "vicinity": "Žvejų gatvė 21, Klaipėda",
        },];
    createMap();
    createMarkersD(discounts);
    zControls();
}

function createMarkersD(discounts) {
    bounds = new google.maps.LatLngBounds();

    for (var i = 0, discount; discount = discounts[i]; i++) {
        // create each marker and push it to markers array
        marker = new google.maps.Marker({
            map: map,
            icon: discount.icon,
            title: discount.title,
            label: '',
            position: discount.geometry.location,
            background: discount.photos,
            valid: discount.valid,
            name: discount.name,
            address: discount.vicinity,
        });
        bounds.extend(discount.geometry.location);
        markers.push(marker);
    }
    map.fitBounds(bounds);

    // info popup for each marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].addListener('click', function () {
            infowindow.setContent(
                setContD(this)
            );
            infowindow.open(map, this);
        });
    }

    markerCluster = new MarkerClusterer(map, markers,
        {
            zoomOnClick: false,
            styles: clusterStyles,
        });

    google.maps.event.addListener(markerCluster, 'clusterclick', function (cluster) {
        var currMarkers = cluster.getMarkers();
        var content = [];
        var info = new google.maps.MVCObject;
        info.set('position', cluster.center_);

        for (i = 0; i < currMarkers.length; i++) {
            content = [...content, setContD(currMarkers[i])]
        }
        createSwiper(content, info);
    });
}

function setContD(m) {
    var content = '<div class="close-card" onclick="infowindow.close()"></div>\n' +
        '<div class="c-container swiper-slide">\n' +
        '    <div class="card card-nearby map-card disc-card">\n' +
        '         <div class="cover btn-wrapper"\n' +
        '                                     style="background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%),\n' +
        '                                url(' + m.background + ') no-repeat center/cover;">\n' +
        '                                    <button class="heart" onclick="toggleC(this)"></button>\n' +
        '                                    <div class="valid">Galioja iki 2019 liep. 15</div>\n' +
        '                                </div>\n' +
        '                                <div class="row top-row">\n' +
        '                                    <div class="col-12 t-wrapper p-0">\n' +
        '                                        <div class="title card-title">\n' +
        '                                            <a href="">' + m.title + '</a>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '        <div class="row bottom-row">\n' +
        '                                    <div class="col-12 p-0">\n' +
        '                                        <div class="place">California</div>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-12 ellipsis p-0">\n' +
        '                                        <img class="marker" src="../dist/images/marker.png" alt="">\n' +
        '                                        <span class="address">1 km, Liepų g. 63, Klaipėda</span>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '         <div class="row action-row">\n' +
        '                                    <div class="col-12">\n' +
        '                                        <a href="">\n' +
        '                                            <img class="icon" src="../dist/images/tag-black.png" alt="">\n' +
        '                                            <span>Gauti nuolaidą</span>\n' +
        '                                        </a>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '    </div>\n' +
        '</div>';
    return content;
}


// =================== LUNCH MAP
function initMap4() {
    var places = [{
        "geometry": {
            "location": {"lat": 55.70856999999999, "lng": 21.13130000000001},
        },
        "icon": "../dist/images/wine.png",
        "logo": "../dist/images/mini-logo.png",
        "title": "Monai",
        "rating": "4,8",
        "photo": "../dist/images/bottom-img3.png",
        "dish1": "Žaliųjų žirnelių sriuba su mėtomis ir morkomis 2 Eur",
        "dish2": "Lakštinių makaronų sluoksniuotis su jautiena ir kietuoju sūriu 6,5 Eur",
        "dish3": "Skumbrė su keptais burokėliais ir krienais, morkų kremu ir brokoliais 7,50 Eur",
        "dish4": "salotų lapų ir daržovių junginys 5 Eur",
    },
        {
            "geometry": {
                "location": {"lat": 55.70329479999999, "lng": 21.14427950000004},
            },
            "icon": "../dist/images/wine.png",
            "logo": "../dist/images/mini-logo.png",
            "title": "Monai",
            "rating": "4,8",
            "photo": "../dist/images/bottom-img3.png",
            "dish1": "Žaliųjų žirnelių sriuba su mėtomis ir morkomis 2 Eur",
            "dish2": "Lakštinių makaronų sluoksniuotis su jautiena ir kietuoju sūriu 6,5 Eur",
            "dish3": "Skumbrė su keptais burokėliais ir krienais, morkų kremu ir brokoliais 7,50 Eur",
            "dish4": "salotų lapų ir daržovių junginys 5 Eur",
        },];
    createMap();
    createMarkersL(places);
    zControls();
}

function createMarkersL(places) {
    bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {
        // create each marker and push it to markers array
        marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: place.icon,
            logo: place.logo,
            title: place.title,
            rating: place.rating,
            photo: place.photo,
            dish1: place.dish1,
            dish2: place.dish2,
            dish3: place.dish3,
            dish4: place.dish4,
        });
        bounds.extend(place.geometry.location);
        markers.push(marker);
    }
    map.fitBounds(bounds);

    // info popup for each marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].addListener('click', function () {
            infowindow.setContent(
                setContL(this)
            );
            infowindow.open(map, this);
        });
    }

    markerCluster = new MarkerClusterer(map, markers,
        {
            zoomOnClick: false,
            styles: clusterStyles,
        });

    google.maps.event.addListener(markerCluster, 'clusterclick', function (cluster) {
        var currMarkers = cluster.getMarkers();
        var content = [];
        var info = new google.maps.MVCObject;
        info.set('position', cluster.center_);

        for (i = 0; i < currMarkers.length; i++) {
            content = [...content, setContL(currMarkers[i])]
        }
        createSwiper(content, info);
    });
}

function setContL(m) {
    var content = '<div class="close-card" onclick="infowindow.close()"></div>\n' +
        '<div class="c-container swiper-slide">\n' +
        ' <div class="lunch-card map-card shadow">\n' +
        '                                <div class="top">\n' +
        '                                    <div class="circle"\n' +
        '                                         style="background: url(' + m.logo + ') no-repeat center/contain;"></div>\n' +
        '                                    <h6>PANK’olis Brolis</h6>\n' +
        '                                    <div class="wrapper">\n' +
        '                                    <div class="ratingf">\n' +
        '                                                        <img class="fork" src="../dist/images/fork-low.png" alt="">\n' +
        '                                                        <img class="fork-abs" style="clip-path: inset(calc(100% - 31%) 0 0 0);"\n' +
        '                                                             src="../dist/images/fork-full.png" alt="">\n' +
        '                                                        <span>4,6</span>\n' +
        '                                                    </div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="main">\n' +
        '                                    <div class="text">\n' +
        '                                        <a href="" data-toggle="modal" data-target="#lunch-modal" class="btn btn-white more">DAUGIAU</a>\n' +
        '                                        <p>Šio penktadienio pietūs IN\'uose:</p>\n' +
        '                                        <p>Žaliųjų žirnelių sriuba su mėtomis ir morkomis 2 Eur</p>\n' +
        '                                        <p>Lakštinių makaronų sluoksniuotis su jautiena ir kietuoju sūriu 6,5 Eur</p>\n' +
        '                                        <p>Skumbrė su keptais burokėliais ir krienais, morkų kremu ir brokoliais 7,50 Eur</p>\n' +
        '                                    </div>\n' +
        '                                    <img class="bottom" src=" ' + m.photo + ' " alt="">\n' +
        '                                </div>\n' +
        '                                <div class="expand hidden">\n' +
        '                                    <div class="text">\n' +
        '                                        <p>Dienos pietūs Valgomajame.</p>\n' +
        '                                        <p>#skoniuzaismas #dienospietus #pietusklaipedoje #skanaus #pietus #meniult</p>\n' +
        '                                    </div>\n' +
        '                                    <img class="bottom" src="../dist/images/todayslunch.png" alt="">\n' +
        '                                </div>\n' +
        '    </div>\n' +
        '</div>';
    return content;
}


// =================== BANQUET MAP
function initMap5() {
    var places = [{
        "geometry": {
            "location": {"lat": 55.70856999999999, "lng": 21.13130000000001},
        },
        "icon": "../dist/images/beer.png",
        "title": "Monai",
        "address": "1 km, Liepų g. 64, Klaipėda",
        "reviews": "100",
        "rating": "4,8",
        "pricing": "€€€",
        "photo": "../dist/images/momo.png",
    },
        {
            "geometry": {
                "location": {"lat": 55.70329479999999, "lng": 21.14427950000004},
            },
            "icon": "../dist/images/wine.png",
            "title": "assdfcsf",
            "address": "1 km, Liepų g. 64, Klaipėda",
            "reviews": "100",
            "rating": "4,8",
            "pricing": "€€€",
            "photo": "../dist/images/meatlovers.png",
        },];
    createMap();
    createMarkersB(places);
    zControls();
}

function createMarkersB(places) {
    bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {
        // create each marker and push it to markers array
        marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: place.icon,
            title: place.title,
            address: place.address,
            reviews: place.reviews,
            rating: place.rating,
            pricing: place.pricing,
            photo: place.photo,
        });
        bounds.extend(place.geometry.location);
        markers.push(marker);
    }
    map.fitBounds(bounds);

    // info popup for each marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].addListener('click', function () {
            infowindow.setContent(
                setContB(this)
            );
            infowindow.open(map, this);
        });
    }

    markerCluster = new MarkerClusterer(map, markers,
        {
            zoomOnClick: false,
            styles: clusterStyles,
        });

    google.maps.event.addListener(markerCluster, 'clusterclick', function (cluster) {
        var currMarkers = cluster.getMarkers();
        var content = [];
        var info = new google.maps.MVCObject;
        info.set('position', cluster.center_);

        for (i = 0; i < currMarkers.length; i++) {
            content = [...content, setContB(currMarkers[i])]
        }
        createSwiper(content, info);
    });
}

function setContB(m) {
    var content = '<div class="close-card" onclick="infowindow.close()"></div>\n' +
        '<div class="c-container swiper-slide">\n' +
        ' <div class="card card-nearby map-card b-card">\n' +
        '                <div class="cover">\n' +
        '                    <img src="../dist/images/dock.png" alt="">\n' +
        '                    <ul class="mark">\n' +
        '                        <li>POPULIARIAUSIAS</li>\n' +
        '                    </ul>\n' +
        '                </div>\n' +
        '                <div class="row top-row">\n' +
        '                    <div class="col-12 p-0">\n' +
        '                        <div class="title card-title">\n' +
        '                            <a class="one-line" href="">Amberton Hotel Klaipėda</a>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="row bottom-row">\n' +
        '                    <div class="col-12 p-0 ellipsis">\n' +
        '                        <img class="marker" src="../dist/images/marker.png" alt="">\n' +
        '                        <span class="distance">1 km, </span>\n' +
        '                        <span class="address">Naujojo Sodo gatvė 1A, Klaipėda</span>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="info">\n' +
        '                    <div class="btn btn-red"\n' +
        '                         style="background: url(../dist/images/profile-w.png) no-repeat 10px 4px/12px 14px, #c91d2c;">100</div>\n' +
        '                  <div class="ratingf">\n' +
        '                                                        <img class="fork" src="../dist/images/fork-low.png" alt="">\n' +
        '                                                        <img class="fork-abs" style="clip-path: inset(calc(100% - 31%) 0 0 0);"\n' +
        '                                                             src="../dist/images/fork-full.png" alt="">\n' +
        '                                                        <span>4,6</span>\n' +
        '                                                    </div>\n' +
        '                    <div class="price low">\n' +
        '                                                        <span>€</span>\n' +
        '                                                        <span>€</span>\n' +
        '                                                        <span>€</span>\n' +
        '                                                    </div>\n' +
        '                </div>\n' +
        '                <div class="row reserve-row">\n' +
        '                    <div class="col-12">\n' +
        '                        <a href="">\n' +
        '                            <img class="icon" src="../dist/images/profile-b.png" alt="">\n' +
        '                            <span>Siųsti užklausą</span>\n' +
        '                        </a>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '    </div>\n' +
        '</div>';
    return content;
}

