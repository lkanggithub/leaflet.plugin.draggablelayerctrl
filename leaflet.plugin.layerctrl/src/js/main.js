'use strict';

/*
 * Initialize map
 */
var viewCenter = [37.0, -92.5];
var viewSouthWest = L.latLng(24.0, -125.0);
var viewNorthEast = L.latLng(50.0, -60.0);
var viewBounds = L.latLngBounds(viewSouthWest, viewNorthEast);
var map = L.map('map', {
    zoom: 5,
    minZoom: 4,
    center: viewCenter,
    maxBounds: viewBounds
});
var baseLayer = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
baseLayer.addTo(map);

/*
 * Add Layer swiper
 */
var lyrConf = lyrConfig;
var layerCtrl = L.control.layerCtrl({
	lyrConf:lyrConf
}).addTo(map);
layerCtrl._initLyrCtrlPanel();