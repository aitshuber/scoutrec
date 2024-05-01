
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
  })();
