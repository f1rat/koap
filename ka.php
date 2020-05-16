<div class="row">
                    <?php if(count($slideshow_property_images)>0):?>
                            <div class="col-md-7 clearfix">
                                <div class="product-gallery">
                                    <div class="primary-image">
                                        <div id="myCarousel" class="carousel carousel-property slide" data-ride="carousel">
                                            <!-- Carousel items -->
                                            <div class="carousel-inner">
                                            <?php foreach($slideshow_property_images as $file): ?>
                                                <a href="<?php echo _simg($file['url'], '470x311');?>"  data-link="<?php echo $file['url']; ?>" class=" item <?php echo  $file['first_active'];?>" rel="group" hidefocus="true">
                                                    <img src="<?php echo _simg($file['url'], '470x311');?>" class="img-responsive" alt="<?php echo _ch($file['alt']);?>">
                                                </a>

                                            <?php endforeach; ?>
                                            </div>
                                            <?php if(count($slideshow_property_images)>1):?>
                                                <!-- Carousel nav -->
                                                <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                                                    <i class="fa fa-angle-left"></i>
                                                </a>
                                                <a class="right carousel-control" href="#myCarousel" data-slide="next">
                                                    <i class="fa fa-angle-right"></i>
                                                </a>
                                            <?php endif;?> 
                                        </div>
                                    </div>
                                    <div class="thumbnail-images">
                                        <?php if(count($slideshow_property_images)>1):?>
                                            <?php foreach($slideshow_property_images as $k=>$file): ?>
                                            <a href="<?php echo _simg($file['url'], '470x311'); ?>" data-link="<?php echo $file['url']; ?>" data-to='<?php echo $k;?>' title="<?php echo $file['filename']; ?>"  alt="" class="" rel="group" hidefocus="true">
                                                <img src="<?php echo _simg($file['url'],  '470x311'); ?>" alt="<?php echo _ch($file['alt']);?>">
                                            </a>
                                            <?php endforeach; ?>
                                        <?php endif;?>
                                    </div>
                                </div>
                                
                                <?php if(file_exists(APPPATH.'controllers/admin/favorites.php')):?>
                                <?php
                                    $favorite_added = false;
                                    if(count($not_logged) == 0)
                                    {
                                        $CI =& get_instance();
                                        $CI->load->model('favorites_m');
                                        $favorite_added = $CI->favorites_m->check_if_exists($this->session->userdata('id'), 
                                                                                            $estate_data_id);
                                        if($favorite_added>0)$favorite_added = true;
                                    }
                                ?>
                                <div class="pull-left favorite clearfix" style="margin-bottom: 20px;">
                                    <a class="btn btn-warning" id="add_to_favorites" href="#" style="<?php echo ($favorite_added)?'display:none;':''; ?>"><i class="icon-star icon-white"></i> <?php echo lang_check('Add to favorites'); ?> <i class="load-indicator"></i></a>
                                    <a class="btn btn-success" id="remove_from_favorites" href="#" style="<?php echo (!$favorite_added)?'display:none;':''; ?>"><i class="icon-star icon-white"></i> <?php echo lang_check('Remove from favorites'); ?> <i class="load-indicator"></i></a>
                                </div>
                                <?php endif; ?>
                                <?php _widget('custom_property_center_reports');?>
                            </div>
                            <div class="col-md-5">
                        <?php else: ?>
                            <div class="col-md-12">
                        <?php endif;?>
                                <div class="product-info">
                                    <h3>{page_title}</h3>
									<h6>İlan No: {estate_data_id}</h6>
                                    <div class="wp-block property list no-border">
                                        <div class="wp-block-content clearfix">
                                            <p class="description mb-15"><?php echo _ch($estate_data_option_8, ''); ?></p>
                                            <span class="pull-left">
                                                <span class="price">
                                                <?php if(!empty($estate_data_option_36) || !empty($estate_data_option_37)): ?>
                                                <?php 
                                                    if(!empty($estate_data_option_36))echo $options_prefix_36.price_format($estate_data_option_36, $lang_id).$options_suffix_36;
                                                    if(!empty($estate_data_option_37))echo ' '.$options_prefix_37.price_format($estate_data_option_37, $lang_id).$options_suffix_37;
                                                ?>
                                                <?php else: ?>
                                                <?php endif; ?>
                                                </span> 
                                            </span>
                                        </div>
                                        <div class="wp-block-footer style2 mt-15">
                                            <?php if(file_exists(APPPATH.'libraries/Pdf.php')) : ?>
            <a class='btn btn-default' style="border-color: #ccc;" href='<?php echo site_url('api/pdf_export/'.$property_id.'/'.$lang_code) ;?>'><img src='assets/img/icons/filetype/pdf.png' height="20px"/>
            <span style="vertical-align: middle;"><?php echo _l('PDF export');?> </span>
                                            </a>
<?php endif;?>
                                            <?php if(file_exists(APPPATH.'controllers/propertycompare.php')):?>

<?php
//for php 5.3
$session_compare=$this->session->userdata('property_compare');
?>

<div class="widget widget-compare contact" >
    <div class="content">
        <div class="clearfix text-left">
            <a class="btn btn-warning" id='add_to_compare' style="<?php echo (empty($session_compare) || !isset($session_compare[$estate_data_id]))?'':'display:none;'; ?>" href='#'> <?php echo lang_check('Add to comparison list');?> </a>
            <a class="btn btn-success" id='remove_from_compare' style="<?php echo (!empty($session_compare)&&isset($session_compare[$estate_data_id]))?'':'display:none;'; ?>" href='#'> <?php echo lang_check('Remove from comparison list');?> </a>
        </div>
        <div class="compare-content">
            
            <ul class='compare-list'>
                <?php if(!empty($session_compare)&&count($session_compare)>0):?>
                <?php foreach ($session_compare as $key => $value):?>
                    <li data-id="<?php _che($key);?>"> 
                        <a href="<?php echo slug_url($listing_uri.'/'.$key.'/'.$lang_code.'/'.url_title_cro($value));?>"> <?php _che($key);?>, <?php _che($value);?></a>
                    </li>
                <?php endforeach; ?>
                <?php endif; ?>
            </ul>
            <a class="btn btn-primary" style="<?php echo (!empty($session_compare)&&count($session_compare)>1)?'':'display:none;'; ?>" href='<?php echo site_url('/propertycompare/'.$estate_data_id.'/'.$lang_code); ?>'> <?php echo lang_check('Compare listings');?> </a>
        </div>
        
    </div>
</div>

<script>
   $('document').ready(function(){
       
       
    $("#add_to_compare").click(function(e){
        e.preventDefault();
        var data = { property_id: {estate_data_id} };
        
        $.post("<?php echo site_url('api/add_to_compare/'.$lang_code);?>", data, 
            function(data){
            /*var data=jQuery.parseJSON(data);  */             
            ShowStatus.show(data.message);
            
            if(data.success)
            {
                if( data.remove_first){
                    $('.compare-list li').first().remove();
                }
                 $('.compare-list').append('<li data-id="'+data.property_id+'"><a href="'+data.property_url+'">'+data.property+'</a></li>')
                 $("#add_to_compare").css('display', 'none');
                 $("#remove_from_compare").css('display', 'inline-block');
                 
                if( $('.compare-list li').length>1)
                    $(".compare-content .btn").css('display', 'inline-block');
            }
        });
        return false;
    });
    
    $("#remove_from_compare").click(function(e){
        e.preventDefault();
        var data = { property_id: {estate_data_id} };
        
        $.post("<?php echo site_url('api/remove_from_compare/'.$lang_code);?>", data, 
            function(data){
           /* var data=jQuery.parseJSON(data);   */            
            ShowStatus.show(data.message);
            
            if(data.success)
            {
                $('.compare-list li').filter('[data-id="'+data.property_id+'"]').remove();
                $("#remove_from_compare").css('display', 'none');
                $("#add_to_compare").css('display', 'inline-block');
                if( !$('.compare-list li').length || $('.compare-list li').length<2 )
                    $(".compare-content .btn").css('display', 'none');
            }
        });
        return false;
    });
   })
   
   
</script>
<?php endif;?>


                                        </div>
                                    </div>
                                    
                                    <span class="clearfix"></span> 
                                    
                                </div>
                                <?php if(file_exists(APPPATH.'controllers/admin/favorites.php') && count($slideshow_property_images)==0):?>
                                <?php
                                    $favorite_added = false;
                                    if(count($not_logged) == 0)
                                    {
                                        $CI =& get_instance();
                                        $CI->load->model('favorites_m');
                                        $favorite_added = $CI->favorites_m->check_if_exists($this->session->userdata('id'), 
                                                                                            $estate_data_id);
                                        if($favorite_added>0)$favorite_added = true;
                                    }
                                ?>
                                <div class="pull-left favorite clearfix" style="margin-bottom: 20px;">
                                    <a class="btn btn-warning" id="add_to_favorites" href="#" style="<?php echo ($favorite_added)?'display:none;':''; ?>"><i class="icon-star icon-white"></i> <?php echo lang_check('Add to favorites'); ?> <i class="load-indicator"></i></a>
                                    <a class="btn btn-success" id="remove_from_favorites" href="#" style="<?php echo (!$favorite_added)?'display:none;':''; ?>"><i class="icon-star icon-white"></i> <?php echo lang_check('Remove from favorites'); ?> <i class="load-indicator"></i></a>
                                </div>
                                <?php endif; ?>
                                <?php if(count($slideshow_property_images)==0):?>
                                    <?php _widget('custom_property_center_reports');?>
                                <?php endif; ?>
                                
                            </div>
                        </div>
                           
                           
<script>
    
$(document).ready(function(){
        
    $(document).on('touchstart click', '.carousel-inner a', function () {
        var myLinks = new Array();
        var current_link = $(this).attr('data-link');
        var curIndex=0;
        $('.carousel-inner a').each(function (i) {
            var img_link = $(this).attr('data-link');
            myLinks[i] = img_link;
            if(current_link == img_link)
                curIndex = i;
        });
        options = {index: curIndex};
        blueimp.Gallery(myLinks,options);
        
        return false;
    });   
    
    if (!$('#blueimp-gallery').length)
    $('body').append('<div id="blueimp-gallery" class="blueimp-gallery">\n\
                     <div class="slides"></div>\n\
                     <h3 class="title"></h3>\n\
                     <a class="prev">&lsaquo;</a>\n\
                     <a class="next">&rsaquo;</a>\n\
                     <a class="close">&times;</a>\n\
                     <a class="play-pause"></a>\n\
                     <ol class="indicator"></ol>\n\
                     </div>');
})
    
</script>