L.Control.layerCtrl = L.Control.extend({
    options: {
        id: "layerCtrl",
        title: 'Layer Control',
        collapsed: true,
        lyrConf:null
    },
    
    initialize: function (options) {
        L.setOptions(this, options);
        this._lyrConf = this.options.lyrConf || [];
        this._collapsed = this.options.collapsed || true;
        this._lyrGroupStatus = {};
    },
    
    onAdd: function (map) {
    	this._map = map;
        this._initCtrl(); 
        return this._container;
    },
    
    _initCtrl: function () {
        var className = 'leaflet-layer-control';
        var container = this._container = L.DomUtil.create('div', className);
        L.DomEvent.disableClickPropagation(this._container);
        var ctrlLink = this._ctrlLink = L.DomUtil.create('a', className + '-toggle', this._container);
        this._ctrlLink.setAttribute("title", this.options.title);
        if (this._collapsed) {
            if (!L.Browser.android) {
            	L.DomEvent.on(this._ctrlLink, 'click', this._toggleCtrl, this);
				
            }
            if (L.Browser.touch) {
                L.DomEvent
                    .on(this._ctrlLink, 'click', L.DomEvent.stop)
                    .on(this._ctrlLink, 'click', this._expand, this);
            } else {
                L.DomEvent.on(this._ctrlLink, 'focus', this._expand, this);
            }
        } else {
            this._expand();
        }
        this._renderLyrCtrlPanel(this._lyrConf);
    },
    
    _toggleCtrl: function(){
    	if(this._collapsed == true){
    		this._expand();
    	}else{
    		this._collapse();
    	}
    	this._collapsed = !this._collapsed;
    },

    _expand: function () {
        L.DomUtil.addClass(this._container, 'leaflet-layer-control-expanded');
        
    },

    _collapse: function () {
        L.DomUtil.removeClass(this._container, 'leaflet-layer-control-expanded');
    },
    
    _renderLyrCtrlPanel: function(lyrGroupConfs){
    	var ctrlContainer = L.DomUtil.create('div', 'panel',this._container);
    	var lyrGroupStatus = this._lyrGroupStatus;
    	var lyrGroupNum = Object.keys(lyrGroupConfs).length;
    	lyrGroupNum = lyrGroupNum+2;//ugly
    	var lyrGroupStatus = this._lyrGroupStatus;
    	$.each(lyrGroupConfs,function(lyrGroupConfId,lyrGroupConf){
    		var lyrGroupCtrl = L.DomUtil.create('div', 'dragbox', ctrlContainer);
			lyrGroupCtrl.setAttribute('id',lyrGroupConfId);
			lyrGroupStatus[lyrGroupConfId]={
				order:lyrGroupNum,
				loaded:false,
        		visible:false,
        		transp:0.0,
        		layer:null,
        		id:null
			};
			lyrGroupNum = lyrGroupNum -1;
			var groupTitle = lyrGroupConf.title || '';
    		var lyrGroupHeadCtrl = L.DomUtil.create('div', 'dragbox-head', lyrGroupCtrl);
    		lyrGroupHeadCtrl.innerHTML = groupTitle;
    		var lyrGroupContentCtrl = L.DomUtil.create('div', 'dragbox-content', lyrGroupCtrl);
    		var subPanelLeftCtrl = L.DomUtil.create('div', 'subPanel_left', lyrGroupContentCtrl);
    		var subPanelRight1Ctrl = L.DomUtil.create('div', 'subPanel_right1', lyrGroupContentCtrl);
    		var subPanelRight2Ctrl = L.DomUtil.create('div', 'subPanel_right2', lyrGroupContentCtrl);
    		var subPanelRight3Ctrl = L.DomUtil.create('div', 'subPanel_right3', lyrGroupContentCtrl);
    		subPanelLeftCtrl.innerHTML='<div id="'+lyrGroupConfId+'_visCtrl'+'" style="cursor:pointer" class="glyphicon glyphicon-eye-close"></div>';
    		subPanelRight2Ctrl.innerHTML='<div id="'+lyrGroupConfId+'_trpCtrl"></div>';
    		var lyrConfs = lyrGroupConf.lyrs;
        	var tmpInnerHTML = '';
    		$.each(lyrConfs,function(lyrId,lyrConf){
        		if(lyrId.length>0){
        			var lyrTitle = lyrConf.title || '';
        			tmpInnerHTML=tmpInnerHTML+
        			'<div class="singleCheck" lyrId="'+lyrId+'"><label><input type="checkbox"/>'+lyrTitle+'</label></div>';
        		}
        	});
    		subPanelRight1Ctrl.innerHTML=tmpInnerHTML;
    	});
    },
    
    _initLyrCtrlPanel: function(){
    	var _this = this;
    	var updateGroupLyrOrderFunc = this._updateGroupLyrOrder;
    	var lyrVisibilityHandlerFunc = this._lyrVisibilityHandler;
    	var lyrTransparencyHandlerFunc = this._lyrTransparencyHandler;
    	var lyrHandlerFunc = this._lyrHandler;
    	var setLyrStatusUIFunc = this._setLyrStatusUI;
    	$('.panel').sortable({
    		connectWith: '.panel',
    		handle: '.dragbox-head',
    		cursor: 'move',
    		placeholder: 'ui-state-highlight',
    		forcePlaceholderSize: false,
    		opacity: 0.4,
    		update: function(event, ui){
    			$('.panel').each(function(){
    				var updatedGroupOrder = $(this).sortable('toArray');
    				updateGroupLyrOrderFunc.call(this,_this._map,_this._lyrGroupStatus,updatedGroupOrder);
    			});
    		}
    	})
    	.disableSelection();
    	
    	
    	$('.dragbox-head')
    	.each(function(){
    		$(this).dblclick(function(){
    			$(this).siblings('.dragbox-content').toggle();
    		})
    		.end()
    	});    	
    	
    	$.each(this._lyrConf,function(lyrGroupConfId,lyrGroupConf){
    		if($('#'+lyrGroupConfId).find('.singleCheck').length>=1){
    			$.each($('#'+lyrGroupConfId).find('.singleCheck'),function(idx,lyrSelCtrl){
                    lyrSelCtrl.addEventListener('click', function(){
                    	$(this).siblings().find('input').prop('checked', false);
                    	var lyrId = $(this).attr('lyrId');
                    	lyrHandlerFunc.call(this,_this._map,lyrGroupConfId,lyrId,lyrGroupConf,_this._lyrGroupStatus);
                    	setLyrStatusUIFunc.call(this,lyrGroupConfId,_this._lyrGroupStatus,$('#'+lyrGroupConfId+'_visCtrl'),$('#'+lyrGroupConfId+'_trpCtrl'));
                    });
    			});
    		}
    		if($('#'+lyrGroupConfId+'_trpCtrl').length==1){
    			$('#'+lyrGroupConfId+'_trpCtrl').slider({
    				value:0.0,
    				min:0.0,
    				max:1.0,
    				step:0.1,
    				disabled:true,
    				slide: function( event, ui ){
    					lyrTransparencyHandlerFunc.call(this,_this._map,lyrGroupConfId,_this._lyrGroupStatus,ui.value,$('#'+lyrGroupConfId+'_visCtrl'));
    					setLyrStatusUIFunc.call(this,lyrGroupConfId,_this._lyrGroupStatus,$('#'+lyrGroupConfId+'_visCtrl'),$('#'+lyrGroupConfId+'_trpCtrl'));
    				}
    			});
    		}
    		if($('#'+lyrGroupConfId+'_visCtrl').length==1){
    			$('#'+lyrGroupConfId+'_visCtrl').prop('disabled',true);
    			$('#'+lyrGroupConfId+'_visCtrl').on('click',function(){
    				lyrVisibilityHandlerFunc.call(this,_this._map,lyrGroupConfId,_this._lyrGroupStatus,$('#'+lyrGroupConfId+'_trpCtrl'));
    				setLyrStatusUIFunc.call(this,lyrGroupConfId,_this._lyrGroupStatus,$('#'+lyrGroupConfId+'_visCtrl'),$('#'+lyrGroupConfId+'_trpCtrl'));
    			});
    		}
    	});
    },
    
    _updateGroupLyrOrder:function(map,lyrGroupStatus,groupOrder){
    	$.each(groupOrder,function(idx,groupId){
    		var _lyrGroupStatus = lyrGroupStatus[groupId];
    		_lyrGroupStatus.order=groupOrder.length-idx;
    		_lyrGroupStatus.order=_lyrGroupStatus.order+2;//ugly
    		if(_lyrGroupStatus.layer!=null){
    			_lyrGroupStatus.layer.setZIndex(_lyrGroupStatus.order);
    		}
    	});
    },
    
    _lyrHandler: function(map,groupId,lyrId,lyrGroupConf,lyrGroupStatus){
    	var _lyrGroupStatus = lyrGroupStatus[groupId];
    	if(_lyrGroupStatus!=null){
    		if(_lyrGroupStatus.layer!=null){
        		map.removeLayer(_lyrGroupStatus.layer);
        		_lyrGroupStatus.loaded=false;
        		_lyrGroupStatus.visible=false;
        		_lyrGroupStatus.transp=0.0;
        		_lyrGroupStatus.layer=null;
        		_lyrGroupStatus.id=null;
    		}
    		if($(this).find('input').prop('checked')){
        		var lyrConf = lyrGroupConf.lyrs[lyrId];
        		if(lyrConf!=null){
                	var lyrAccessParams = lyrConf.params || {};
                	var lyrEndpoint = lyrConf.endpoint || '';
                	var lyr = null;
                	if(lyrEndpoint.length>0){
                		if(Object.keys(lyrAccessParams).length==0){
                    		lyr = L.tileLayer(lyrEndpoint);
                    		lyr.setZIndex(_lyrGroupStatus.order);
                    	}else{
                    		lyr = L.tileLayer.wms(lyrEndpoint, lyrAccessParams);	
                    		lyr.setZIndex(_lyrGroupStatus.order);
                    	}
                    	if(lyr!=null){
        	            	map.addLayer(lyr);
        	            	if(map.hasLayer(lyr)){
            	        		_lyrGroupStatus.loaded=true;
            	        		_lyrGroupStatus.visible=true;
            	        		_lyrGroupStatus.transp=1.0;
            	        		_lyrGroupStatus.layer=lyr;
            	        		_lyrGroupStatus.id=lyrId;
        	            	}
                    	}
                	}
                }
    		}
    	}
    },
    
    _lyrVisibilityHandler: function(map,lyrGroupId,lyrGroupStatus,lyrTransparencyCtrl){
    	var lyr = lyrGroupStatus[lyrGroupId].layer;
    	var jqLyrVisCtrl = $(this);
    	if(lyr!=null){
    		if(map.hasLayer(lyr)){
    	    	if(jqLyrVisCtrl.hasClass('glyphicon-eye-open')){
    				lyr.setOpacity(0.0);
    	    		lyrGroupStatus[lyrGroupId].visible = false;
    	    		lyrGroupStatus[lyrGroupId].transp = 0.0;
    	    	}else{
    	    		lyr.setOpacity(1.0);
    	    		lyrGroupStatus[lyrGroupId].visible = true;
    	    		lyrGroupStatus[lyrGroupId].transp = 1.0;
    	    	}
    	    	lyrTransparencyCtrl.slider('value',lyrGroupStatus[lyrGroupId].transp);
    		}
    	}	
    },
    
    _lyrTransparencyHandler: function(map,lyrGroupId,lyrGroupStatus,lyrOpacity,jqLyrVisCtrl){
    	var lyr = lyrGroupStatus[lyrGroupId].layer;
    	if(lyr!=null){
    		if(map.hasLayer(lyr)){
    			lyr.setOpacity(lyrOpacity);
    			lyrGroupStatus[lyrGroupId].transp = lyrOpacity;
    			if(lyrOpacity==0.0){
    	    		lyrGroupStatus[lyrGroupId].visible = false;
    			}else{
    	    		lyrGroupStatus[lyrGroupId].visible = true;
    			}
    		}
    	}
    },
    
    _setLyrStatusUI:function(groupId,lyrGroupStatus,jqLyrVisCtrl,lyrTransparencyCtrl){
    	if(lyrGroupStatus[groupId].layer==null){
			if(jqLyrVisCtrl.hasClass('glyphicon-eye-open')){
	    		jqLyrVisCtrl.removeClass('glyphicon-eye-open');
	    		jqLyrVisCtrl.addClass('glyphicon-eye-close');
			}
    		jqLyrVisCtrl.prop('disabled',true);
    		jqLyrVisCtrl.prop('enabled',false);
    		lyrTransparencyCtrl.slider('value',lyrGroupStatus[groupId].transp);
    		lyrTransparencyCtrl.slider('disable');
    	}else{     		
    		if(lyrGroupStatus[groupId].transp==0.0){
				if(jqLyrVisCtrl.hasClass('glyphicon-eye-open')){
		    		jqLyrVisCtrl.removeClass('glyphicon-eye-open');
		    		jqLyrVisCtrl.addClass('glyphicon-eye-close');
				}
    		}else{
				if(jqLyrVisCtrl.hasClass('glyphicon-eye-close')){
		    		jqLyrVisCtrl.removeClass('glyphicon-eye-close');
		    		jqLyrVisCtrl.addClass('glyphicon-eye-open');
				}
    		}
    		jqLyrVisCtrl.prop('disabled',false);
    		jqLyrVisCtrl.prop('enabled',true);
    		lyrTransparencyCtrl.slider('value',lyrGroupStatus[groupId].transp);
    		lyrTransparencyCtrl.slider('enable');    		
    	}
    }
    
});
L.control.layerCtrl = function (f, options) {
    return new L.Control.layerCtrl(f, options);
};