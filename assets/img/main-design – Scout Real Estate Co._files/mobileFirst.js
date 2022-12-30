// Modernizr 3.1.1 | MIT & BSD
!function(e,n,t){function o(e,n){return typeof e===n}function a(){var e,n,t,a,s,i,r;for(var l in d)if(d.hasOwnProperty(l)){if(e=[],n=d[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(a=o(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],r=i.split("."),1===r.length?Modernizr[r[0]]=a:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=a),f.push((a?"":"no-")+r.join("-"))}}function s(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,a){var s,l,f,d,c="modernizr",p=i("div"),m=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=a?a[o]:c+(o+1),p.appendChild(f);return s=i("style"),s.type="text/css",s.id="s"+c,(m.fake?m:p).appendChild(s),m.appendChild(p),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),p.id=c,m.fake&&(m.style.background="",m.style.overflow="hidden",d=u.style.overflow,u.style.overflow="hidden",u.appendChild(m)),l=t(p,e),m.fake?(m.parentNode.removeChild(m),u.style.overflow=d,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],d=[],c={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){d.push({name:e,fn:n,options:t})},addAsyncTest:function(e){d.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=c,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),m=function(){var n=e.matchMedia||e.msMatchMedia;return n?function(e){var t=n(e);return t&&t.matches||!1}:function(n){var t=!1;return l("@media "+n+" { #modernizr { position: absolute; } }",function(n){t="absolute"==(e.getComputedStyle?e.getComputedStyle(n,null):n.currentStyle).position}),t}}();c.mq=m,a(),s(f),delete c.addTest,delete c.addAsyncTest;for(var h=0;h<Modernizr._q.length;h++)Modernizr._q[h]();e.idx.Modernizr=Modernizr}(window,document);
// smartresize
!function(n,t){"use strict";n.debounce=function(n,t,e){var i;return function(){var r=this,u=arguments,s=function(){e||n.apply(r,u),i=null};i?clearTimeout(i):e&&n.apply(r,u),i=setTimeout(s,t||100)}},n.fn[t]=function(e){return e?this.bind("resize",n.debounce(e)):this.trigger(t)}}(idx,"smartresize");

// mobileFirst
var contactFocus = false; // set to true when contact form input gets a focus event
(function (window) {
    idx(function() {
        // registration dialog
        var registration = idx('#IDX-registration');
        var regOption = idx('#IDX-registration').attr('data-regoption');
        var regModalOptions = {modal:true, title:'Sign Up', autoOpen:false, draggable:false, resizable:false};

        registration.find('form').addClass('IDX-modalForm');
        regModalOptions.dialogClass = 'IDX-registrationModal IDX-registration-'+regOption;

        idx('.IDX-contactForm input, .IDX-contactForm textarea').focus(function () {
            contactFocus = true;
        });

        // login dialog
        var ajaxLoadSmall = "<img src='/images/ajaxLoadSmall.gif' style='display:block; margin: 0 auto;' />";

        // If a device loads an IDX page via bfcache (back/forward cache) and clients use force registration, we need to show the prompt to ensure pages are locked down to client preference.
        window.addEventListener('pageshow', function (event) {
            if (event.persisted && registration && regOption === 'force') {
                registration.dialog('open');
            }
        });

        var loginValidate = function(data, $form, options) {
            // indicate that something is happening
            idx($form).find('.IDX-formResponse').html(ajaxLoadSmall);

            /**
             * If a contact form, verify that a input has been focused to prevent bots
             */
            if (idx($form).hasClass('IDX-contactForm')) {
                if (!contactFocus) {
                    idx($form).find('.IDX-formResponse').html('<p class="IDX-errorMessage"><span class="IDX-errorIcon"></span>A field needs to be focused, before submission.</p>').fadeIn('slow');
                    return false;
                }
            }
            var submitForm = true;
            var errorMessage = '';

            // start fresh
            idx('.IDX-errorField').removeClass('IDX-errorField');

            // check required field data
            idx($form).find('input[data-fieldrequired], textarea[data-fieldrequired], select[data-fieldrequired]').each(function() {
                // check any required field for a value
                if (idx(this).val() === '') {
                    idx(this).addClass('IDX-errorField');
                    submitForm = false;
                    errorMessage += '<br />Please fill out all required fields.';
                } else if (idx(this).attr('type') == 'checkbox') {
                    if (idx(this).prop('checked') === false) {
                        submitForm = false;
                        errorMessage += '<br />Please fill out all required fields.';
                        idx(this).parent().addClass('IDX-errorField');
                    }
                } else if (idx(this).attr('name') == 'email') {
                    // Check email field for validity.
                    idx(this).val(idx.trim(idx(this).val()));
                    var reg = /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,63})$/;
                    if (!reg.test(idx(this).val())) {
                        submitForm = false;
                        errorMessage += '<br />Email address format is not valid.';
                        idx(this).addClass('IDX-errorField');
                    }
                } else if (idx(this).attr('name') == 'phone') {
                    var reg = /^(?!(?:\d*-){5,})(?!(?:\d* ){5,})\+?[\d- ]+$/;
                    if (!reg.test(idx(this).val())) {
                        submitForm = false;
                        errorMessage += '<br />Phone number is not valid.';
                        idx(this).addClass('IDX-errorField');
                    }
                } else if (idx(this).attr('type') === 'radio') {
                    // Find all radio options of this name that are selected.
                    var selectedRadioCount = idx('input[name=' + idx(this).attr('name') + ']:checked').length;
                    if (!selectedRadioCount) {
                        submitForm = false;
                        errorMessage += '<br />Please fill out all required fields.';
                        idx(this).parent().addClass('IDX-errorField');
                    }
                }
            });

            //first make sure that field even exists
            if(idx($form).find('#IDX-additionalInfoInput').length > 0) {
                if(idx($form).find('#IDX-additionalInfoInput').val().length > 0) {
                    errorMessage += 'You are a bot and shall not pass!';
                    submitForm = false;
                }
            }

            /**
             * Show errors if found
             */
            if (!submitForm) {
                var type = idx($form).attr('data-type');
                idx($form).find('[type=password]').val('');
                idx($form).find('.IDX-formResponse').html('<p class="IDX-errorMessage"><span class="IDX-errorIcon"></span>Validation failed.' + errorMessage + '</p>').fadeIn('slow');
            }

            // return whether we can submit the form or not
            return submitForm;
        };

        var loginSuccess = function(responseText, statusText, xhr, $form) {
            var success = true;
            if (responseText.clientLeadRegistration) {
                if (typeof window.gtag === 'function') {
                    try {
                        gtag('event', 'Form Submission', {'event_category': 'Client Lead Registration', 'event_label': 'Client Lead'});
                        idxDataLayer.push({ 'event': 'Lead Registration' });
                    } catch (e) {
                        console.error('Unable to send new signup event');
                    }
                 } else {
                    try {
                        ga('send', 'event', 'Client Lead Registration', 'Form Submission', 'Client Lead');
                        idxDataLayer.push({ 'event': 'Lead Registration' });
                    } catch (e) {
                        console.error('Unable to send new signup event');
                    }
                }
            }

            if(responseText.error == 'y') {
                success = false;
                var msg = '';
            // Handle responses
                if (responseText.leadNotExist == 'y') {
                    msg = 'Your account does not exist. Please sign up ';
                    if (idx($form).hasClass('IDX-modalForm') || idx('#IDX-registration').hasClass('ui-page-active')) {
                        msg += '<a href="#" class="IDX-psudolink IDX-signupLoginToggle" id="IDX-modalSignupToggle">here</a>';
                    } else {
                        msg += '<a href="/idx/usersignup">here</a>';
                    }
                } else if (responseText.passwordNotMatch === 'y') {
                    msg = 'Password does not match';
                } else if (responseText.promptLogin === 'y') {
                // if the contact form, prompt them to log in
                    if (idx($form).hasClass('IDX-contactForm')) {
                          msg = 'You already have an account. Please log in to your account in order to continue.';
                    } else {
                        // if the modal is open
                        var linkStart;
                        if (idx($form).hasClass('IDX-modalForm') || idx('#IDX-registration').hasClass('ui-page-active')) {
                            linkStart = ' <a class="IDX-psudolink IDX-signupLoginToggle" href="#">';
                        } else {
                            linkStart = '<a href="/idx/userlogin">';
                        }

                        msg = 'The email address entered is already been used. '+linkStart+'You may log in here</a>.';
                    }
                } else {
                    msg = 'There is an error during your submission';
                }

                idx($form).find('.IDX-formResponse').html('<p class="IDX-errorMessage"><span class="IDX-errorIcon"></span>'+msg+'</p>');

                idx('#password').val('');
            } else {
                /**
                 * Check if an exsisting lead is not logged in and trying to submit a contact form
                 */
                if (idx($form).closest('.ui-dialog').hasClass('IDX-contactFormLogin')) {
                    // replace the registration fields with the leadID
                    idx('.IDX-customRegistrationFields').html('<input type="hidden" name="leadID" value="'+responseText.leadID+'" />');

                    idx('.IDX-contactForm').ajaxSubmit({success:formSuccess, dataType:'json'});
                } else {
                    // if email update saved search login, submit the form to go to the results page
                    if (responseText.emailUpdateSearch === true) {
                        idx('#IDX-searchForm').submit();
                    } else if (responseText.redirectLink) {
                        window.location = responseText.redirectLink;
                    } else if (responseText.savedProperty) {
                        window.location.reload();
                    } else if (responseText.append) {
                        window.location.hash = responseText.append;
                    }
                    if (idx('#IDX-registration').dialog('isOpen')) {
                        idx('#IDX-registration').dialog('close');
                    }
                } // end else standard success handling

                if (responseText.message) {
                    idx('.IDX-formResponse').html('<p class="IDX-successMessage">'+responseText.message+'</p>');
                }
                // reset the form if it has the class to do so
                if (success && idx($form).hasClass('IDX-resetForm')) {
                    idx($form).resetForm();
                }
            }
        };

        var bindRegistration = function() {
            if (regOption === 'force') {
                regModalOptions.close = function(event) {
                    // user initiated close
                    if (event.originalEvent && (event.originalEvent.type == 'click' || event.originalEvent.type == 'keydown')) {
                        var clientBaseURL = idx('#IDX-clientBaseURL').html();
                        var lastViewedPage = document.referrer;
                        var currentPageName = idx('#IDX-currentScriptName').html();
                        var lastSearchPageURL = idx('#IDX-lastSearchPageURL').html();

                        /**
                        * determine the search page. If client is using custom new search page, use that otherwise
                        * use ../idx/search
                        */
                        var defaultSearchPage = '';
                        if (idx('#IDX-customNewSearchLinkURL').html()) {
                            defaultSearchPage = idx('#IDX-customNewSearchLinkURL').html();
                        } else {
                            defaultSearchPage = clientBaseURL+'/idx/search/';
                        }


                        /**
                        * if closing a force dialog, redirect the user to the client website if on search page,
                        * redirect to search page if on results page, redirect to results page if on details page and redirect to details page if on photogallery page
                        * if on any other pages, redirect to the client website
                        */
                        if (idx(this).hasClass('IDX-registration-force')) {
                            var redirectLink;
                            if (currentPageName == 'search.php') {
                                redirectLink = idx('#IDX-clientWebsite').html();
                            } else if (currentPageName == 'results.php') {
                                if (lastViewedPage.match('/idx/search/')) {
                                    redirectLink = lastViewedPage;
                                } else {
                                    // if last search page is know use that, otherwise use custom new search url OR the default search page
                                    if (lastSearchPageURL) {
                                        redirectLink = clientBaseURL+lastSearchPageURL;
                                    } else {
                                        redirectLink = defaultSearchPage;
                                    }
                                }
                            } else if (currentPageName == 'details.php') {
                                // if coming from results or saved link
                                if (lastViewedPage.match('/idx/results/') || new RegExp(clientBaseURL + '/i/').exec(lastViewedPage) != null) {
                                    redirectLink = lastViewedPage;
                                } else {
                                    // if last search page is know use that, otherwise use the default search page
                                    if (lastSearchPageURL) {
                                        redirectLink = clientBaseURL+lastSearchPageURL;
                                    } else {
                                        redirectLink = defaultSearchPage;
                                    }
                                }
                            } else if (currentPageName == 'photogallery.php') {
                                // user can go to photoGallery page both from results and details page. make the necessary redirect
                                if (lastViewedPage.match('/idx/details/')) {
                                    redirectLink = lastViewedPage;
                                } else if (lastViewedPage.match('/idx/results/')) {
                                    redirectLink = lastViewedPage;
                                } else {
                                    // if last search page is know use that, otherwise use the default search page
                                    if (lastSearchPageURL) {
                                        redirectLink = clientBaseURL+lastSearchPageURL;
                                    } else {
                                        redirectLink = defaultSearchPage;
                                    }
                                }
                            } else {
                                redirectLink = idx('#IDX-clientWebsite').html();
                            }
                            window.location = redirectLink;
                        } // end if
                    }
                };
            }

            registration.dialog(regModalOptions);
            var softLoggedIn = idx('#IDX-registration').attr('data-softLoggedIn');
            if (regOption != 'none' && !softLoggedIn) {
                // When registration is requested, we need to pass that to and back to the
                // page so when it's refreshed we can open the request modal.
                registration.find('.IDX-social-registration').val(regOption).removeAttr('disabled');

                registration.dialog('open');
                idx('.IDX-registrationModal a.close').click(function(e) {
                    registration.dialog('close');
                    e.preventDefault();
                });

                idx('.IDX-controls span > input').click(function(e) {
                    e.stopPropagation();
                });

                idx(window).smartresize(function() {
                    idx('#IDX-registration').dialog("option", "position", {at: "center", collision: "fit", my: "center"});
                });
            }

            // toggle between signup and login
            idx('body').on('click','.IDX-signupLoginToggle', function(e) {
                e.preventDefault();
                var title;
                if (idx(this).closest('form').attr('data-type') == 'login')  {
                    title = 'Sign Up';
                    idx('#IDX-registrationDefaultMessage').show();
                } else {
                    title = 'Log in';
                    idx('#IDX-registrationDefaultMessage').hide();
                }
                registration.dialog({'title':title});


                idx('.IDX-signupLoginContent').toggle();
            });
        };

        var dynamicMeta = function() {
            if (!idx('meta[name=viewport]').size()) {
                var viewPortTag = document.createElement('meta');
                viewPortTag.name = 'viewport';
                viewPortTag.content = 'width=device-width, initial-scale=1';
                document.getElementsByTagName('head')[0].appendChild(viewPortTag);
            }
        };

        // bind login form
        idx('.IDX-form').ajaxForm({
            dataType: 'json',
            beforeSubmit: loginValidate,
            success: loginSuccess
        });

        dynamicMeta();
        bindRegistration();
    });

    /**
     * Search Page Loader Screen
     */
    idx(function() {

        var mobile = idx('#IDX-main').hasClass('IDX-wrapper-mobile');

        idx('#IDX-searchForm').on('submit', function(e) {

            /**
             *  Loading screen event only for standard form submitting
             *  only for none mobile
             */
            if (showSearchLoadingScreen(idx(this)))
            {
                idx('#IDX-loadingScreen').dialog({
                    autoOpen: true,
                    resizable: false,
                    width: 100,
                    open: function(event, ui) { idx('.ui-dialog-titlebar').hide(); },
                    hide: "fold",
                    modal: true
                });
            }
        });

        function showSearchLoadingScreen(form)
        {
            // No loading screen on mobile
            if (mobile) {
                return false;
            }

            // No loading screen on email updates
            if (form.closest('form').hasClass('IDX-emailUpdateSignupForm')) {
                return false;
            }

            // At this point is a viable page to show the loading screen
            // Now, check the setting for it
            return (idx('#IDX-loadingScreen').attr('data-showLoadingScreen') == 'y');
        }
    });

    window.disableFields = function () {
        // clear any persisting hidden quick list fields
        idx('.IDX-quickListHiddenField').remove();

        // Go through each input
        idx('#IDX-searchForm :input').each(function() {

            var disable = false;

            // if has the class no-disable, then skip
            if (idx(this).hasClass('no-disable')) {
                return; // basically like continue, but were in a function
            }

            // Disable and inputs that don't need to be submitted
            if (idx(this).hasClass('IDX-noSubmit') || idx(this).attr('name') === undefined) {
                disable = true;
            } else if (idx(this).val() === '' || idx(this).val() === null) {
                // If the field has nothing set or no data, disable it
                disable = true;
            } else if (idx(this).hasClass('IDX-quickList') && idx(this).attr('type') === 'hidden') {
                // handle any select2 inputs
                var currentElement = idx(this);
                idx.each(idx(this).select2("data"), function(key,value) {
                    currentElement.after('<input class="IDX-quickListHiddenField" type="hidden" name="'+currentElement.attr('name')+'[]" value="'+value.id+'" />');
                });
                disable = true;
            }

            /**
             * Disable it
             */
            if (disable) {
                idx(this).attr('disabled','disabled');
            }
        }); // end each

        return true;
    };

    window.moveHidden = function (container) {
        var value = container.val();
        // remove the hide toggle
        container.find('.hideToggle').remove();
        container.removeClass('hideToggleContainer');

        // Special case for inital loading of hidden ccz
        if (container.attr('id') == 'IDX-cczContainer') {
            container = idx('.IDX-cczList.IDX-active');
        }

        var input = container.find('.IDX-controls input[name*=], .IDX-controls select');
        if(input.size()) {
            var field = input.attr('id').replace('IDX-', '');

            var selector = container.attr('id');
            var display = (field == 'srtd') ? 'Sort' : idx.trim(container.find('label').html());

            display = '<strong>'+display+'</strong>';

            if (value) {
                display += ': ';

                // special case for city/county/zip field because values and labels differ
                if (cczField) {
                    // create the display from the ccz displays and not labels
                    idx('#'+selector+' .IDX-cczSelect option:selected').each(function() {
                        if (key > 0) {
                            display += ', ';
                        }
                        display += idx(this).html();
                    });
                } else {
                    display += value;
                }
            }

            var html = '<li data-field="'+field+'" data-value="'+value+'" data-selector="'+selector+'">'+display+'</li>';

            // hide the original
            idx(container).addClass('IDX-hidden');
            idx(container).find('input, select').addClass('IDX-noSubmit');

            // add to list of hidden fields
            idx('#hiddenFields').append(html);
        }
        // show the hidden fields
        idx('#hiddenFieldContainer').removeClass('hide');
    };
})(window);

