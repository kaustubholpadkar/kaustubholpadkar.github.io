( function( $ ) {
    
        'use strict';
        
        // Variables
        var main_menu      = $( '#main-menu' );
        var portfolioGrid  = $( '#portfolio-container' );
        var portfolioSlider  = $( '#portfolio-slider' );
        var contactForm    = $( '#contact-form' )
        var kraft_carousel = $( '.kraft-carousel' )
        
        var google_map     = $( '#googleMap' );
        
        // Superfish Init
        $( main_menu ).superfish({
            
            popUpSelector   : 'ul',
            delay   : 250,
            speed   : 350
            
        });
        
        // Menu Functions
        function menuTrigger () {
            
            var menu_trigger = $( '#menu-trigger' );
            
            menu_trigger.on( 'click', ( function() {
                
                $( this ).toggleClass( 'open' );
                main_menu.toggleClass( 'display-menu' );
                
            }));
            
        }
        function menuChildren () {
            
            var level_two = main_menu.find( 'ul > li > ul' );
            var level_three = level_two.find( 'li > ul' );
            
            main_menu.find( 'ul li:has(ul)' ).addClass( 'has-child' );
            
            level_two.addClass( 'level-two' );
            level_three.addClass( 'level-three' );
            
        }
        
        function dropdownInvert() {
            
            var submenus = main_menu.find( 'ul ul' );
            
            submenus.each( function ( index, element ) {
                
                var menuDropdown    = $( element );
                var windowWidth     = $( window ).width();
                
                var dropdownOffset  = menuDropdown.offset();
                var dropdownWidth   = menuDropdown.width();
                var dropdownLeft    = dropdownOffset.left;
                
                if ( windowWidth - ( dropdownWidth + dropdownLeft ) < 0 ) {
                    menuDropdown.addClass( 'invert-dropdown' );
                }
            });
            
        }
        
        function initDropdown() {           
            
            if ( $().superfish ) {                
                if( main_menu.has( 'ul ul' ) ){
                    
                    var submenus = main_menu.find( 'ul ul' );
                    
                    submenus.css( 'display', 'block' );
                    dropdownInvert();
                    
                    submenus.css( 'display', '' );
                }
            }
        }
        // Carousel
        kraft_carousel.each( function() {
            
            var carousel = $( this );
            
            carousel.owlCarousel({
                autoplay            : ( carousel.data( 'autoplay' ) == null ) ? false : carousel.data( 'autoplay' ),
                autoplaySpeed       : ( carousel.data( 'autoplayspeed' ) == null ) ? false : carousel.data( 'autoplayspeed' ),
                loop                : ( carousel.data( 'loop' ) == null ) ? true : carousel.data( 'loop' ),
                items               : ( carousel.data( 'items' ) == null ) ? 1 : carousel.data( 'items' ),             
                autoplayHoverPause  : ( carousel.data( 'stoponhover' ) == null ) ? false : carousel.data( 'stoponhover' ),
                slideBy             : ( carousel.data( 'slideby' ) == null ) ? 1 : carousel.data( 'slideby' ),
                nav                 : ( carousel.data( 'nav' ) == null ) ? false : carousel.data( 'nav' ),
                navText             : [ '<span class="ion-ios-arrow-left"></span>', '<span class="ion-ios-arrow-right"></span>' ],
                navSpeed            : ( carousel.data( 'navspeed' ) == null ) ? false : carousel.data( 'navspeed' ),
                dots                : ( carousel.data( 'dots' ) == null ) ? false : carousel.data( 'dots' ),
                dotsSpeed           : ( carousel.data( 'dotsspeed' ) == null ) ? false : carousel.data( 'dotsspeed' ),
                animateOut          : ( carousel.data( 'animateout' ) == null ) ? false : carousel.data( 'animateout' ),
                animateIn           : ( carousel.data( 'animatein' ) == null ) ? false : carousel.data( 'animatein' ),
                autoHeight          : (carousel.data('autoheight') == null) ? true : carousel.data('autoheight'),
                responsive: {
                    0: {
                        items: ( carousel.data( 'items-mobile-portrait' ) == null ) ? 1 : carousel.data( 'items-mobile-portrait' )
                    },
                    480: {
                        items: ( carousel.data( 'items-mobile-landscape' ) == null ) ? 1 : carousel.data( 'items-mobile-landscape' )
                    },
                    768: {
                        items: ( carousel.data( 'items-tablet' ) == null ) ? 1 : carousel.data( 'items-tablet' )
                    },
                    960: {
                        items: ( carousel.data( 'items' ) == null ) ? 1 : carousel.data( 'items' )
                    }
                }              
            });         
        });
        
     
        // Contact Form Ajax Submission       
        contactForm.on( 'submit', function( event ) {
            
            var form_process    = contactForm.find( '.form-process' );
            
            var name_error      = contactForm.find( '.name.contact-error-msg' );
            var email_error     = contactForm.find( '.email.contact-error-msg' );
            var message_error   = contactForm.find( '.message.contact-error-msg' );
            
            var contact_success = contactForm.find( '.contact-success' );
            var contact_failed  = contactForm.find( '.contact-failed' );
            
            

            form_process.fadeIn();
            
            name_error.removeClass( 'validation-error' );
 	    email_error.removeClass( 'validation-error' );
	    message_error.removeClass( 'validation-error' );
            
  	    contact_failed.removeClass( 'validation-error' );            
            contact_success.removeClass( 'validated' );
          
            // get the form data            
            var formData = {
                'name'   : contactForm.find( 'input[name=name]' ).val(),
                'email'  : contactForm.find( 'input[name=email]' ).val(),               
                'message': contactForm.find( 'textarea[name=message]' ).val()
            };

            // process the form
            $.ajax({
                type: 'POST',
                url: 'include/contact.php',
                data: formData,
                dataType: 'json',
                encode: true
            })
              
            // using the done promise callback
            .done( function( data ) {
		                 
                // here we will handle errors and validation messages
                if ( !data.success ) {
		
                   // handle errors for name
                    if ( data.errors.name ) {
                        name_error.toggleClass( 'validation-error' );
                    }
                    
                    // handle errors for email
                    if ( data.errors.email ) {
                        email_error.toggleClass( 'validation-error' );
                    }
                  
                    // handle errors for message
                    if ( data.errors.message ) {
                        message_error.toggleClass( 'validation-error' );
                    }
                    
                    // mail
                    if ( data.errors.mail_error ) {
                        contact_failed.toggleClass( 'validation-error' );
                    }                  
                }
                else {
                    contact_success.toggleClass( 'validated' );
                }
                
                form_process.fadeOut();
                
            })            
            .fail( function( data ) {
                
                form_process.fadeOut();
                contact_failed.toggleClass( 'validation-error' );
                
            });
            
            event.preventDefault();
            
        });
        
                            
        
        // Portfolio 
        portfolioGrid.cubeportfolio({
            filters             : '#filters-container',
            loadMore            : '#more-projects',
            loadMoreAction      : portfolioGrid.data( 'loadmoreaction' ),
            layoutMode          : ( portfolioGrid.data( 'layoutmode' ) == null ) ? 'grid' : portfolioGrid.data( 'layoutmode' ),
            sortToPreventGaps   : true,
            mediaQueries: [{
                    width: 1500,
                    cols: ( portfolioGrid.data('large-desktop' ) == null ) ? 4 : portfolioGrid.data( 'large-desktop' )
                }, {
                    width: 1100,
                    cols: ( portfolioGrid.data( 'medium-desktop' ) == null ) ? 3 : portfolioGrid.data( 'medium-desktop' )
                }, {
                    width: 800,
                    cols: ( portfolioGrid.data( 'tablet' ) == null ) ? 3 : portfolioGrid.data( 'tablet' )
                }, {
                    width: 480,
                    cols: ( portfolioGrid.data( 'mobile-landscape' ) == null ) ? 2 : portfolioGrid.data( 'mobile-landscape' )
                }, {
                    width: 320,
                    cols: ( portfolioGrid.data( 'mobile-portrait' ) == null ) ? 1 : portfolioGrid.data( 'mobile-portrait' )
                }],
            defaultFilter       : '*',
            animationType       : portfolioGrid.data( 'animationtype' ),
            gapHorizontal       : ( portfolioGrid.data( 'gaphorizontal' ) == null ) ? 0 : portfolioGrid.data( 'gaphorizontal' ),
            gapVertical         : ( portfolioGrid.data( 'gapvertical' ) == null ) ? 0   : portfolioGrid.data( 'gapvertical' ),
            gridAdjustment      : 'responsive',
            caption             : ( portfolioGrid.data( 'captionanimation' ) == null ) ? 'fadeIn' : portfolioGrid.data( 'captionanimation' ),
            displayType         : 'fadeIn',
            displayTypeSpeed    : 100,
            // lightbox
            lightboxDelegate    : '.cbp-lightbox',
            lightboxGallery     : true,
            lightboxTitleSrc    : 'data-title',
            lightboxCounter     : '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
        });
        
        // Portfolio Slider
        portfolioSlider.cubeportfolio({
            layoutMode: 'slider',
            drag: true,
            rewindNav: true,
            scrollByPage: false,
            gridAdjustment: 'responsive',
            mediaQueries: [{
                    width: 1500,
                    cols: ( portfolioSlider.data('large-desktop' ) == null ) ? 1 : portfolioSlider.data( 'large-desktop' )
                }, {
                    width: 1100,
                    cols: ( portfolioSlider.data( 'medium-desktop' ) == null ) ? 1 : portfolioSlider.data( 'medium-desktop' )
                }, {
                    width: 800,
                    cols: ( portfolioSlider.data( 'tablet' ) == null ) ? 1 : portfolioSlider.data( 'tablet' )
                }, {
                    width: 480,
                    cols: ( portfolioSlider.data( 'mobile-landscape' ) == null ) ? 1 : portfolioSlider.data( 'mobile-landscape' )
                }, {
                    width: 320,
                    cols: ( portfolioSlider.data( 'mobile-portrait' ) == null ) ? 1 : portfolioSlider.data( 'mobile-portrait' )
                }],
            animationType       : portfolioSlider.data( 'animationtype' ),
            gapHorizontal       : ( portfolioSlider.data( 'gaphorizontal' ) == null ) ? 0 : portfolioSlider.data( 'gaphorizontal' ),
            gapVertical         : ( portfolioSlider.data( 'gapvertical' ) == null ) ? 0   : portfolioSlider.data( 'gapvertical' ),
            caption             : ( portfolioSlider.data( 'captionanimation' ) == null ) ? 'fadeIn' : portfolioSlider.data( 'captionanimation' ),
            auto                : ( portfolioSlider.data( 'autoplay' ) == null ) ? 'true' : portfolioSlider.data( 'autoplay'),
            autoTimeout         : ( portfolioSlider.data( 'autoplaytimeout' ) == null ) ? '3500' : portfolioSlider.data( 'autoplaytimeout'),
            autoPauseOnHover    : ( portfolioSlider.data( 'autopauseonhover' ) == null ) ? 'true' : portfolioSlider.data( 'autopauseonhover'),
            showNavigation      : true,
            showPagination      : true,
            displayType         : 'fadeIn',
            displayTypeSpeed    : 100,
            // lightbox
            lightboxDelegate    : '.cbp-lightbox',
            lightboxGallery     : true,
            lightboxTitleSrc    : 'data-title',
            lightboxCounter     : '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
        });
        
        // Google Map 
        function initializeMap() {       

            var map_canvas = document.getElementById( 'googleMap' );                       
            
            var latitude       = google_map.data( 'latitude' );
            var longitude      = google_map.data( 'longitude' );
            var zoom           = google_map.data( 'zoom' );        
            var map_marker_img = google_map.data( 'mapmarker' );

            var map_options = {
                center: new google.maps.LatLng( latitude, longitude ),
                zoom: zoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                mapTypeControl: false,
                panControl: false,
                scaleControl: false,
                streetViewControl: false,
                zoomControl: false
            };

            var map = new google.maps.Map( map_canvas, map_options );

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng( latitude, longitude ),
                map: map,            
                icon: map_marker_img
            });        

            var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
            map.setOptions( {styles: styles} );
        }
        
        // Function Calls        
        
        if (typeof (google) !== 'undefined' && google_map.length > 0) {
            initializeMap();
        }
        
        menuChildren();
        menuTrigger();
        initDropdown();
   
})( jQuery );