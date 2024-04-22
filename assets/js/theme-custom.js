/* curator-feed-default-feed-layout */
(function(){
var i,e,d=document,s="script";i=d.createElement("script");i.async=1;i.charset="UTF-8";
i.src="https://cdn.curator.io/published/3ceec12d-7235-44a6-8e3f-61991417dcfa.js";
e=d.getElementsByTagName(s)[0];e.parentNode.insertBefore(i, e);
})();

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
	// INITIALIZATION OF MEGA MENU
	// =======================================================


	// INITIALIZATION OF BOOTSTRAP VALIDATION
	// =======================================================
	HSBsValidation.init('.js-validate', {
	  onSubmit: data => {
		data.event.preventDefault()
		alert('Submited')
	  }
	})


	// INITIALIZATION OF BOOTSTRAP DROPDOWN
	// =======================================================
	HSBsDropdown.init()


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


	  // INITIALIZATION OF LEAFLET
	  // =======================================================
	  var tabEl = document.querySelector('[data-bs-target="#propertyOverviewNavThree"]');

	  if (tabEl) {
		tabEl.addEventListener('shown.bs.tab', function (event) {
		  $mapContainerEl = document.getElementById('map');
		  if ($mapContainerEl.classList.contains('leaflet-container')) return;

		  const leaflet = HSCore.components.HSLeaflet.init($mapContainerEl);

		  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			id: 'mapbox/light-v9'
		  }).addTo(leaflet);
		});
	  }
  })()
