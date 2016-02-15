var lyrConfig = {
    'Irrigation':{
        title:'Irrigation',
        descriptioin:'',
        expanded:false,
        lyrs:{ 
    		'mirad2002_1':{
    		    title: '2002',
    		    description:'',
    		    endpoint:'http://ows9.csiss.gmu.edu/cgi-bin/nn',
    		    params:{
    					layers: 'data/base/mirad4CMG_2002_1',
    				    format: 'image/png',
    				    transparent: true,
    				    styles:'default'
    				}
    		},
    		'mirad2007_1':{
    		    title: '2007',
    		    description:'',
    		    endpoint:'http://ows9.csiss.gmu.edu/cgi-bin/nn',
    		    params:{
    					layers: 'data/base/mirad4CMG_2007_1',
    				    format: 'image/png',
    				    transparent: true,
    				    styles:'default'
    				}
    		},
    		'mirad2012_1':{
    		    title: '2012',
    		    description:'',
    		    endpoint:'http://ows9.csiss.gmu.edu/cgi-bin/nn',
    		    params:{
    					layers: 'data/base/mirad4CMG_2012_1',
    				    format: 'image/png',
    				    transparent: true,
    				    styles:'default'
    				}
    		}
        }
    },
    'Phenology':{
        title:'Phenology',
        descriptioin:'',
        expanded:false,
        lyrs:{ 
    		'VIP07P7003_1980_2010_sos':{
    		    title: 'SOS',
    		    description:'',
    		    endpoint:'http://ows9.csiss.gmu.edu/cgi-bin/nn',
    		    params:{
    					layers: 'data/base/VIP07P7003_1980_2010_sos',
    				    format: 'image/png',
    				    transparent: true,
    				    styles:'default'
    				}
    		},
    		'VIP07P7003_1980_2010_eos':{
    		    title: 'EOS',
    		    description:'',
    		    endpoint:'http://ows9.csiss.gmu.edu/cgi-bin/nn',
    		    params:{
    					layers: 'data/base/VIP07P7003_1980_2010_eos',
    				    format: 'image/png',
    				    transparent: true,
    				    styles:'default'
    				}
    		},
    		'VIP07P7003_1980_2010_dop':{
    		    title: 'DOP',
    		    description:'',
    		    endpoint:'http://ows9.csiss.gmu.edu/cgi-bin/nn',
    		    params:{
    					layers: 'data/base/VIP07P7003_1980_2010_dop',
    				    format: 'image/png',
    				    transparent: true,
    				    styles:'default'
    				}
    		},
    		'VIP07P7003_1980_2010_los':{
    		    title: 'LOS',
    		    description:'',
    		    endpoint:'http://ows9.csiss.gmu.edu/cgi-bin/nn',
    		    params:{
    					layers: 'data/base/VIP07P7003_1980_2010_los',
    				    format: 'image/png',
    				    transparent: true,
    				    styles:'default'
    				}
    		}
        }
    },
    'Grass':{
        title:'Grass fraction',
        descriptioin:'',
        expanded:false,
        lyrs:{ 
    		'nlcd4CMG_1992_71':{
    		    title: '1992',
    		    description:'',
    		    endpoint:'http://ows9.csiss.gmu.edu/cgi-bin/nn',
    		    params:{
    					layers: 'data/base/nlcd4CMG_1992_71',
    				    format: 'image/png',
    				    transparent: true,
    				    styles:'default'
    				}
    		},
    		'nlcd4CMG_2001_71':{
    		    title: '2001',
    		    description:'',
    		    endpoint:'http://ows9.csiss.gmu.edu/cgi-bin/nn',
    		    params:{
    					layers: 'data/base/nlcd4CMG_2001_71',
    				    format: 'image/png',
    				    transparent: true,
    				    styles:'default'
    				}
    		},
    		'nlcd4CMG_2006_71':{
    		    title: '2006',
    		    description:'',
    		    endpoint:'http://ows9.csiss.gmu.edu/cgi-bin/nn',
    		    params:{
    					layers: 'data/base/nlcd4CMG_2006_71',
    				    format: 'image/png',
    				    transparent: true,
    				    styles:'default'
    				}
    		},
    		'nlcd4CMG_2011_71':{
    		    title: '2011',
    		    description:'',
    		    endpoint:'http://ows9.csiss.gmu.edu/cgi-bin/nn',
    		    params:{
    					layers: 'data/base/nlcd4CMG_2011_71',
    				    format: 'image/png',
    				    transparent: true,
    				    styles:'default'
    				}
    		}
        }
    },
    'Base':{
        title:'Base map',
        descriptioin:'',
        expanded:false,
        lyrs:{
    		'dem':{
    		    title: 'dem',
    		    description:'',
    		    endpoint:'http://ows9.csiss.gmu.edu/cgi-bin/nn',
    		    params:{
    					layers: 'data/base/dem4CMG',
    				    format: 'image/png',
    				    transparent: true,
    				    styles:'default'
    				}
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