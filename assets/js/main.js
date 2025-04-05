/*
    Strata by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $footer = $('#footer'),
        $main = $('#main'),
        settings = {

            // Parallax background effect?
                parallax: true,

            // Parallax factor (lower = more intense, higher = less intense).
                parallaxFactor: 20

        };

    // Breakpoints.
        breakpoints({
            xlarge:  [ '1281px',  '1800px' ],
            large:   [ '981px',   '1280px' ],
            medium:  [ '737px',   '980px'  ],
            small:   [ '481px',   '736px'  ],
            xsmall:  [ null,      '480px'  ],
        });

    // Play initial animations on page load.
        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-preload');
            }, 100);
        });

    // Touch?
        if (browser.mobile) {

            // Turn on touch mode.
                $body.addClass('is-touch');

            // Height fix (mostly for iOS).
                window.setTimeout(function() {
                    $window.scrollTop($window.scrollTop() + 1);
                }, 0);

        }

    // Footer.
        breakpoints.on('<=medium', function() {
            $footer.insertAfter($main);
        });

        breakpoints.on('>medium', function() {
            $footer.appendTo($header);
        });

    // Header.

        // Parallax background.

            // Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
                if (browser.name == 'ie'
                ||	browser.mobile)
                    settings.parallax = false;

            if (settings.parallax) {

                breakpoints.on('<=medium', function() {

                    $window.off('scroll.strata_parallax');
                    $header.css('background-position', '');

                });

                breakpoints.on('>medium', function() {

                    $header.css('background-position', 'left 0px');

                    $window.on('scroll.strata_parallax', function() {
                        $header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
                    });

                });

                $window.on('load', function() {
                    $window.triggerHandler('scroll');
                });

            }

    // Main Sections: Two.

        // Lightbox gallery.
            $window.on('load', function() {

                $('#two').poptrox({
                    caption: function($a) { return $a.next('h3').text(); },
                    overlayColor: '#2c2c2c',
                    overlayOpacity: 0.85,
                    popupCloserText: '',
                    popupLoaderText: '',
                    selector: '.work-item a.image',
                    usePopupCaption: true,
                    usePopupDefaultStyling: false,
                    usePopupEasyClose: false,
                    usePopupNav: true,
                    windowMargin: (breakpoints.active('<=small') ? 0 : 50)
                });

            });

    // Modal popup for project articles.
    $(document).ready(function() {
		var currentImages = [];
		var currentIndex = 0;
		
		$('.work-item a.modal-trigger').click(function(event) {
			event.preventDefault();
			var $el = $(this);
			var $workItem = $el.closest('.work-item'),
				title = $workItem.find('h3').text(),
				description = $el.data('desc') || $workItem.find('p').text(),
				imgData = $el.data('large') || $el.find('img').attr('src'),
				projectLink = $el.attr('href');  // Get the project's URL
			
			// Split the data-large attribute into an array of URLs (if more than one)
			currentImages = imgData.split(',').map(function(item) {
				return item.trim();
			});
			currentIndex = 0;
			
			$('#modal-title').text(title);
			$('#modal-description').html(description);
			$('#modal-img').attr('src', currentImages[currentIndex]);
			
			// Set the clickable project link
			$('#modal-project-link').html('Full Project here: <a href="' + projectLink + '" target="_blank">' + projectLink + '</a>');
			
			$('#project-modal').fadeIn();
		});
		
		$('#next-img').click(function() {
			if (currentImages.length) {
				currentIndex = (currentIndex + 1) % currentImages.length;
				$('#modal-img').attr('src', currentImages[currentIndex]);
			}
		});
		
		$('#prev-img').click(function() {
			if (currentImages.length) {
				currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
				$('#modal-img').attr('src', currentImages[currentIndex]);
			}
		});
		
		$('#project-modal .close').click(function() {
			$('#project-modal').fadeOut();
		});
		
		$(window).click(function(event) {
			if ($(event.target).is('#project-modal')) {
				$('#project-modal').fadeOut();
			}
		});
	});

})(jQuery);