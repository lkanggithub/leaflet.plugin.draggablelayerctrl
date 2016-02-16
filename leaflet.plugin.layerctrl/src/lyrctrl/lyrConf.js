var lyrConfig = {
    'physical':{
        title:'ESRI Physical',
        lyrs:{ 
    		'Terrain':{
    		    title: 'Terrain',
    		    endpoint:'http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
    		    params:{}
    		},
    		'Physical':{
    		    title: 'Physical',
    		    endpoint:'http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
    		    params:{}
    		}
        }
    },
    'ocean':{
        title:'ESRI Ocean',
        lyrs:{ 
    		'ocean':{
    		    title: 'Ocean',
    		    description:'',
    		    endpoint:'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}',
    		    params:{}
    		},
        }
    },
    'Street':{
        title:'Street Map',
        lyrs:{
    		'esri_street':{
    		    title: 'ESRI Street',
    		    endpoint:'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    		    params:{}
    		},   
    		'OSM':{
    		    title: 'OSM',
    		    endpoint:'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    		    params:{}
    		},   
        }
    }
};