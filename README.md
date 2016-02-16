# Leaflet draggable layer control plug-in

## Features:
* Manage layers by group
* Set layer order through drag-n-drop 
* Toggle layer visibility
* Tune layer transparency
* Supported layers: L.tileLayer.wms, L.tileLayer (more layer types to be supported...)

## Usage:
    /*
    * Initialize leaflet map
    */
    var map = L.map('map');
    
    /*
    * Initialize base leaflet layer
    */
    var baseLayer = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
    baseLayer.addTo(map);
    
    /*
    * Initialize leaflet layer control with layer configuration (in lyrConf.js)
    */
    var lyrConf = lyrConfig;
    var layerCtrl = L.control.layerCtrl({
      lyrConf:lyrConf
    }).addTo(map);
    layerCtrl._initLyrCtrlPanel();
  
## Layer configuration Synopsis:
    /*
    * Config snippet (lyrConf.js)
    */
      'GROUP_ID':{
        title:'GROUP_TITLE',
        lyrs:{ 
      		'LAYER_ID':{
      		    title: 'LAYER_TITLE',
      		    endpoint:'WMS_ENDPOINT',
      		    params:{WMS_PARAM}
      		},
      		...
        }
      },

*	`GROUP_ID`: Layer group id
*	`GROUP_TITLE`: Title of layer group (for display)
*	`LAYER_ID`: ILayer id
*	`LAYER_TITLE`: Title of layer (for display)
*	`WMS_PARAM`: WMS parameter (please refer http://leafletjs.com/reference.html#tilelayer-wms-options) 

