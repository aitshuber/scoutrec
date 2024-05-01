
// Email Popup
 function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + d.toUTCString();
  document.cookie = name + '=' + value + '; ' + expires + '; path=/';
}


// Email Form
  ;(function (d, s, c) {
	  var j = d.createElement(s),
		t = d.getElementsByTagName(s)[0]
	  j.src = "https://sibforms.com/forms/end-form/elastic-apm-rum.umd.min.js"
	  j.onload = function () { elasticApm.init(c) }
	  t.parentNode.insertBefore(j, t)
  })(document, 'script', { serviceName: 'End Forms', serverUrl: 'https://596808a16dec4fc39413bf34b0a70240.apm.eu-west-1.aws.cloud.es.io:443' , environment : 'production'})

  window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
  window.LOCALE = 'en';
							  window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";

							  window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank. ";

  window.GENERIC_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";

  window.translation = {
	  common: {
		  selectedList: '{quantity} list selected',
		  selectedLists: '{quantity} lists selected'
	  }
  };

  var AUTOHIDE = Boolean(0);

  //Site Scripts
  (function() {
	// INITIALIZATION OF BOOTSTRAP VALIDATION
	HSBsValidation.init('.js-validate', {
	  onSubmit: data => {
		data.event.preventDefault()
		alert('Submited')
	  }
	})



	// INITIALIZATION OF BOOTSTRAP DROPDOWN
	// =======================================================
	HSBsDropdown.init()


	  // INITIALIZATION OF STICKY BLOCKS
	  // =======================================================
	  new HSStickyBlock('.js-sticky-block', {
		targetSelector: document.getElementById('header').classList.contains('navbar-fixed') ? '#header' : null
	  })

	// INITIALIZATION OF GO TO
	// =======================================================
	new HSGoTo('.js-go-to')


	// INITIALIZATION OF TEXT ANIMATION (TYPING)
	// =======================================================
	HSCore.components.HSTyped.init('.js-typedjs')
	// INITIALIZATION OF STICKY BLOCKS
	  // =======================================================
	  new HSStickyBlock('.js-sticky-block', {
		targetSelector: document.getElementById('header').classList.contains('navbar-fixed') ? '#header' : null
	  })


	  // INITIALIZATION OF NAV SCROLLER
	  // =======================================================
	  new HsNavScroller('.js-nav-scroller')

	  var slidesPerView = new Swiper('.js-swiper-slides-per-view', {
		slidesPerView: 3,
		spaceBetween: 30,
		pagination: {
		  el: '.js-swiper-slides-per-view-pagination',
		  clickable: true,
		},
		navigation: {
		  nextEl: '.js-swiper-slides-per-view-button-next',
		  prevEl: '.js-swiper-slides-per-view-button-prev',
		},
  })();

	$(function() {
	const cookieName = 'modalShown';
	const cookieValue = getCookie(cookieName);

	if (!cookieValue) {
	  setTimeout(function() {
		$('#exampleModalCenter').modal('show');
		$('#exampleModalCenter').on('hidden.bs.modal', function() {
		  const daysIn9999Years = 9999 * 365;
		  setCookie(cookieName, 'true', daysIn9999Years);
		});
	  }, 5000);
	}
	// =======================================================
	  AOS.init({
		duration: 650,
		once: true
	  });


	  // INITIALIZATION OF SWIPER
	  // =======================================================
	  let activeIndex = 0
	  var sliderThumbs = new Swiper('.js-swiper-thumbs', {
		slidesPerView: 1,
		autoplay: false,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		followFinger: false,
		loop: true,
		on: {
		  'slideChangeTransitionEnd': function (event) {
			if (sliderMain === undefined) return
			sliderMain.slideTo(event.activeIndex)
		  }
		}
	  });

	  var sliderMain = new Swiper('.js-swiper-main', {
		effect: 'fade',
		autoplay: false,
		disableOnInteraction: true,
		loop: true,
		navigation: {
		  nextEl: '.js-swiper-main-button-next',
		  prevEl: '.js-swiper-main-button-prev',
		},
		thumbs: {
		  swiper: sliderThumbs
		},
		on: {
		  'slideChangeTransitionEnd': function (event) {
			if (sliderThumbs === undefined) return
			sliderThumbs.slideTo(event.activeIndex)
		  }
		}
	  })


	   // Clients
	   var swiper = new Swiper('.js-swiper-clients',{
		 slidesPerView: 2,
		 breakpoints: {
		   380: {
			 slidesPerView: 3,
			 spaceBetween: 15,
		   },
		   768: {
			 slidesPerView: 4,
			 spaceBetween: 15,
		   },
		   1024: {
			 slidesPerView: 5,
			 spaceBetween: 15,
		   },
		 },
	   });

	   // Card Grid
	   var swiper = new Swiper('.js-swiper-card-blocks',{
		 slidesPerView: 1,
		 pagination: {
		   el: '.js-swiper-card-blocks-pagination',
		   dynamicBullets: true,
		   clickable: true,
		 },
		 breakpoints: {
		   620: {
			 slidesPerView: 2,
			 spaceBetween: 15,
		   },
		   1024: {
			 slidesPerView: 3,
			 spaceBetween: 15,
		   },
		 },
	   });
  })();
