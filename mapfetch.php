
    <script>
                var marks=new Array();
                var _map;
    $(document).ready(function(){
        
    <?php if(config_db_item('map_version') =='open_street'):?>
    if($('#mapHolder').length){
        map = L.map('mapHolder', {
            <?php if(config_item('custom_map_center') === FALSE): ?>
            center: [{all_estates_center}],
            <?php else: ?>
            center: [<?php echo config_item('custom_map_center'); ?>],
            <?php endif; ?>
            zoom: {settings_zoom}+2,
            scrollWheelZoom: scrollWheelEnabled,
            dragging: !L.Browser.mobile,
            tap: !L.Browser.mobile
        });     
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        var positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png').addTo(map);
        
        <?php  if(!empty($all_estates))foreach($all_estates as $item): ?>
            <?php
                if(!isset($item['gps']))break;
                if(empty($item['gps']))continue;
            ?>
            var marker = L.marker(
                [<?php _che($item['gps']); ?>],
                {icon: L.divIcon({
                        html: '<img src="<?php _che($item['icon'])?>">',
                        className: 'open_steet_map_marker',
                        iconSize: [31, 46],
                        popupAnchor: [1, -35],
                        iconAnchor: [15, 30],
                    })
                }
            )/*.addTo(map)*/;
            marker.bindPopup("<?php echo _generate_popup($item, true); ?>");
            clusters.addLayer(marker);
            markers.push(marker);
        <?php endforeach; ?>
        map.addLayer(clusters);
    }
   <?php else:?>    
       _map= $("#wrap-map").gmap3({
         map:{
            options:{
             <?php if(config_item('custom_map_center') === FALSE && isset($all_estates_center)): ?>
             center: [{all_estates_center}],
             <?php elseif(config_item('custom_map_center')): ?>
             center: [<?php echo config_item('custom_map_center'); ?>],
             <?php endif; ?>
             zoom: {settings_zoom},
             scrollwheel: scrollWheelEnabled,
             mapTypeId: c_mapTypeId,
             mapTypeControlOptions: {
               mapTypeIds: c_mapTypeIds
             }
            }
         },
        styledmaptype:{
          id: "style1",
          options:{
            name: "<?php echo lang_check('CustomMap'); ?>"
          },
          styles: mapStyle
        },
         marker:{
            values:[
             <?php if(isset($all_estates))foreach($all_estates as $key=>$estate): if(!empty($estate['gps'])): ?>
                {latLng:[<?php echo _ch($estate['gps']);?>], adr:"<?php echo _ch($estate['address']);?>", options:{icon: "<?php _che($estate['icon'])?>"}, data:"<?php echo _generate_popup($estate, true); ?>"},
            <?php endif; endforeach; ?>
            ],
            cluster: clusterConfig,
            options: markerOptions,
            
        events:{
          <?php echo map_event(); ?>: function(marker, event, context){
              $(this).gmap3("get").setCenter(marker.getPosition())
              $(this).gmap3(
                        {
                            clear:"overlay",
                    center: marker.getPosition()
                        },

                        {
                            overlay:{
                                latLng: marker.getPosition(),
                                options:{
                                    content:   context.data,
                                    offset: {
                                        x:-38,
                                        y:-163
                                    }
                                }
                                
                            }
                        });
          },
          mouseout: function(){
            //var infowindow = $(this).gmap3({get:{name:"infowindow"}});
            //if (infowindow){
            //  infowindow.close();
            //}
          }
        }}});
       /* init_gmap_searchbox();*/
    <?php endif;?>
    });    
    </script>
    