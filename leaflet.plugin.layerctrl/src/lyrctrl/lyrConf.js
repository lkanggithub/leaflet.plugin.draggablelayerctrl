var lyrConfig = {
    'physical':{
        title:'ESRI Physical',
        descriptioin:'',
        expanded:false,
        lyrs:{ 
    		'Terrain':{
    		    title: 'Terrain',
    		    description:'',
    		    endpoint:'http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
    		    params:{}
    		},
    		'Physical':{
    		    title: 'Physical',
    		    description:'',
    		    endpoint:'http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
    		    params:{}
    		}
        }
    },
    'ocean':{
        title:'ESRI Ocean',
        descriptioin:'',
        expanded:false,
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
        descriptioin:'',
        expanded:false,
        lyrs:{
    		'esri_street':{
    		    title: 'ESRI Street',
    		    description:'',
    		    endpoint:'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    		    params:{}
    		},   
    		'OSM':{
    		    title: 'OSM',
    		    description:'',
    		    endpoint:'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    		    params:{}
    		},   
        }
    }
};