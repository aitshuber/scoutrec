// Site Scripts
;(function() {
  // INITIALIZATION OF BOOTSTRAP VALIDATION
  HSBsValidation.init('.js-validate', {
	onSubmit: data => {
	  data.event.preventDefault();
	  alert('Submited');
	}
  });

  // INITIALIZATION OF BOOTSTRAP DROPDOWN
  HSBsDropdown.init();

  // INITIALIZATION OF STICKY BLOCKS
  new HSStickyBlock('.js-sticky-block', {
	targetSelector: document.getElementById('header').classList.contains('navbar-fixed') ? '#header' : null
  });

  // INITIALIZATION OF GO TO
  new HSGoTo('.js-go-to');

  // INITIALIZATION OF TEXT ANIMATION (TYPING)
  HSCore.components.HSTyped.init('.js-typedjs');

  // INITIALIZATION OF NAV SCROLLER
  new HsNavScroller('.js-nav-scroller');

  var slidesPerView = new Swiper('.js-swiper-slides-per-view', {
	slidesPerView: 3,
	spaceBetween: 30,
	pagination: {
	  el: '.js-swiper-slides-per-view-pagination',
	  clickable: true
	},
	navigation: {
	  nextEl: '.js-swiper-slides-per-view-button-next',
	  prevEl: '.js-swiper-slides-per-view-button-prev'
	}
  });

  $(function() {
	// Check if the element that uniquely identifies the page is present
	if (document.querySelector('#exampleModalCenter')) {
	  // Define the getCookie function
	  function getCookie(name) {
		const value = '; ' + document.cookie;
		const parts = value.split('; ' + name + '=');
		if (parts.length === 2) return parts.pop().split(';').shift();
		return null; // Return null if the cookie isn't found
	  }

	  // Define the setCookie function
	  function setCookie(name, value, days) {
		const d = new Date();
		d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = 'expires=' + d.toUTCString();
		document.cookie = name + '=' + value + '; ' + expires + '; path=/';
	  }

	  // Ensure that the modal logic only runs on relevant pages by checking if an identifying element exists
	  if (document.querySelector('#exampleModalCenter')) {
		$(function() {
		  const cookieName = 'modalShown'; // Declare cookieName within scope
		  const cookieValue = getCookie(cookieName); // Get the value of the cookie

		  // Show the modal if the cookie isn't set (meaning the modal hasn't been shown before)
		  if (!cookieValue) {
			setTimeout(function() {
			  $('#exampleModalCenter').modal('show');
			  $('#exampleModalCenter').on('hidden.bs.modal', function() {
				// Set a cookie to remember that the modal has been shown
				const daysIn9999Years = 9999 * 365;
				setCookie(cookieName, 'true', daysIn9999Years);
			  });
			}, 5000); // Delay before showing the modal
		  }
		});
	  }
	}
	// INITIALIZATION OF AOS
	AOS.init({
	  duration: 650,
	  once: true
	});

	// INITIALIZATION OF SWIPER THUMBS
	let sliderThumbs = new Swiper('.js-swiper-thumbs', {
	  slidesPerView: 1,
	  autoplay: false,
	  watchSlidesVisibility: true,
	  watchSlidesProgress: true,
	  followFinger: false,
	  loop: true,
	  on: {
		'slideChangeTransitionEnd': function(event) {
		  if (sliderMain === undefined) return;
		  sliderMain.slideTo(event.activeIndex);
		}
	  }
	});

	let sliderMain = new Swiper('.js-swiper-main', {
	  effect: 'fade',
	  autoplay: false,
	  disableOnInteraction: true,
	  loop: true,
	  navigation: {
		nextEl: '.js-swiper-main-button-next',
		prevEl: '.js-swiper-main-button-prev'
	  },
	  thumbs: {
		swiper: sliderThumbs
	  },
	  on: {
		'slideChangeTransitionEnd': function(event) {
		  if (sliderThumbs === undefined) return;
		  sliderThumbs.slideTo(event.activeIndex);
		}
	  }
	});

	// Clients Swiper
	let swiperClients = new Swiper('.js-swiper-clients', {
	  slidesPerView: 2,
	  breakpoints: {
		380: {
		  slidesPerView: 3,
		  spaceBetween: 15
		},
		768: {
		  slidesPerView: 4,
		  spaceBetween: 15
		},
		1024: {
		  slidesPerView: 5,
		  spaceBetween: 15
		}
	  }
	});

	// Card Grid Swiper
	let swiperCardBlocks = new Swiper('.js-swiper-card-blocks', {
	  slidesPerView: 1,
	  pagination: {
		el: '.js-swiper-card-blocks-pagination',
		dynamicBullets: true,
		clickable: true
	  },
	  breakpoints: {
		620: {
		  slidesPerView: 2,
		  spaceBetween: 15
		},
		1024: {
		  slidesPerView: 3,
		  spaceBetween: 15
		}
	  }
	});
  });
})();
