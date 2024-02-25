 // The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoibWF0c3Vpa2luIiwiYSI6ImNscjZmcHF3bTBmaTYybHBxM2dyYzU1Y20ifQ.w_XMoyb8safVDx3fbXBl2g";

// Define a map object by initialising a Map from Mapbox
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/matsuikin/clt0sxmtv007g01qp79ta1ioa"
});

  //add extra stlye:
  var btu=document.getElementsByTagName("styleButtonOrig");
    var divs=document.getElementsByTagName("div");
//When the page is opened, the first button and first div are displayed by default. light
var btn = document.getElementById("styleButtonDay");
btn.addEventListener("click", function() {
   const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/matsuikin/clrgft2tc00hp01qqenw1fhcv"
    });
    setPopup(map)


});
  
  //When click night button:
  var btn = document.getElementById("styleButtonNig");
btn.addEventListener("click", function() {
   const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/matsuikin/clt0as3re00h201po86hw7xu2"
});
setPopup(map)
});
  
  //When return to Original:
    var btn = document.getElementById("styleButtonOrig");
btn.addEventListener("click", function() {
   const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/matsuikin/clt0sxmtv007g01qp79ta1ioa"
    });
    setPopup(map)

});

setPopup(map)
function setPopup(map) {
        /*Add an event listener that runs when a user clicks on the map element.*/
    map.on('click', (event) => {
        debugger
    // If the user clicked on one of your markers, get its information.
    const features = map.queryRenderedFeatures(event.point, {
    layers: ['school'] 
    });
    if (!features.length) {
    return;
    }
    const feature = features[0];
    
    
    /*Create a popup, specify its options and properties, and add it to the map.*/
    const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
    `<p>${feature.properties.SchoolName}</p >`)
    .addTo(map);
    console.log(map.getLayer('care'));
    console.log(map.getFilter('care'))
    });

    /*Add an event listener again - Old Care layer*/
    map.on('click', (event) => {
    const features = map.queryRenderedFeatures(event.point, {
    layers: ['care'] 
    });
    if (!features.length) {
    return;
    }
    const feature = features[0];
    /*Create a popup, */
    const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
    `<p>${feature.properties.organisati}</p >`)
    .addTo(map);
    });

    /*Add an event listener - Hospitals layer*/
    map.on('click', (event) => {
    const features = map.queryRenderedFeatures(event.point, {
    layers: ['hospitals'] // replace with your layer name
    });
    if (!features.length) {
    return;
    }
    const feature = features[0];
    /*Create a popup */
    const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
    `<p>${feature.properties.hosp_name}</p >`)

    .addTo(map);
    });




    // text in legend
map.on("load", () => {
  const layers = [
    "<10",
    "20 ",
    "30 ",
    "40 ",
    "50 ",
    "60 ",
    "70 ",
    "80 ",
    "90 ",
    "100"
  ];
  const colors = [
    "#fefde6",
    "#ffffd9",
    "#edf8b1",
    "#c7e9b4",
    "#7fcdbb",
    "#41b6c4",
    "#1d91c0",
    "#225ea8",
    "#253494",
    "#081d58"
  ];
  // font color

  // create legend
  const legend = document.getElementById("legend");

  layers.forEach((layer, i) => {
    
    const color = colors[i];
    const key = document.createElement("div");
    //place holder
    
    key.className = "legend-key";
    key.style.backgroundColor = color;
    key.innerHTML = `${layer}`;

    legend.appendChild(key);
     if (i >= 5) {
    key.style.color = "white";
       // color of text in legend will change to veiw 
  }
  });
  
  // add interaction when mousemove
  map.addSource("hover", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] }
  });
//add interaction results
  map.addLayer({
    id: "dz-hover",
    type: "line",
    source: "hover",
    layout: {},
    paint: {
      "line-color": "orange",
      "line-width": 4
    }
});
  
  
const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in Glasgow", // Placeholder text for the search bar
  proximity: {
    longitude: 55.8642,
    latitude: 4.2518
  }
  // Coordinates of Glasgow center
});

  // Add mousemove event.
map.on("mousemove", (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ["glasgow"]
  });
  document.getElementById("pd").innerHTML = dzone.length
    ? `<h3>${dzone[0].properties.DZName}</h3><p> SIMD Rank: <strong>${dzone[0].properties.Percentv2}</strong> %</p >`
    : `<p>Hover over a data zone and click the fratures!</p >`;
  map.getSource("hover").setData({
    type: "FeatureCollection",
    features: dzone.map(function (f) {
      return { type: "Feature", geometry: f.geometry };
    })
  });
});
  
  //add extra interactive functions
map.addControl(geocoder, "top-left");

map.addControl(new mapboxgl.NavigationControl(), "top-left");

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-left"
);
});



// edit check-box
const schoolCheckbox = document.querySelector("#school-checkbox");
const careCheckbox = document.querySelector("#care-checkbox");
const hospitalsCheckbox = document.querySelector("#hospitals-checkbox");

function toggleLayer(layerId, event) {
    const checked = event.target.checked;
    if (checked) {
        map.setLayoutProperty(
            layerId,
            'visibility',
            'visible'
        );
    } else {
        map.setLayoutProperty(layerId, 'visibility', 'none');
    }
}

schoolCheckbox.addEventListener("change", toggleLayer.bind(null, "school"));
careCheckbox.addEventListener("change", toggleLayer.bind(null, "care"));
hospitalsCheckbox.addEventListener("change", toggleLayer.bind(null, "hospitals"));

}

//That's all thank you ^_^