// reCAPTCHA Configuration is now handled inline in HTML for server-side injection

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const headerRight = document.getElementById('headerRight');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMobileMenu() {
    headerRight.classList.toggle('active');
    menuToggle.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (headerRight.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    headerRight.classList.remove('active');
    menuToggle.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', toggleMobileMenu);
menuOverlay.addEventListener('click', closeMobileMenu);

// Smooth Scroll Navigation
document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-scroll');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Close mobile menu if open
            if (headerRight.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Newsletter Form Submission - handled by comprehensive implementation below

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
        closeMobileMenu();
    }
});

// Scroll To Top
const scrollTopBtn = document.querySelector('.scroll-to-top');
const scrollTopElements = document.querySelectorAll('.scrollTop');

function updateScrollTopVisibility() {
    const showAfter = 300; // px
    if (window.scrollY > showAfter) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', updateScrollTopVisibility, { passive: true });
document.addEventListener('DOMContentLoaded', updateScrollTopVisibility);

if (scrollTopBtn && scrollTopElements) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    scrollTopElements.forEach(element => {
        element.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Testimonials Marquee (responsive apply/teardown on breakpoint change)

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.testimonials-grid');
    if (!grid) return;

    let originalHTML = grid.innerHTML;
    let isApplied = false;

    function enableMobileTestimonialsMarquee() {
        if (isApplied) return;
        grid.innerHTML = originalHTML;

        const columns = Array.from(grid.querySelectorAll('.testimonials-column'));
        if (columns.length === 0) return;

        const primaryColumn = columns[0];
        const primaryScroll = primaryColumn.querySelector('.testimonials-scroll');

        for (let i = 1; i < columns.length; i++) {
            columns[i].style.display = 'none';
        }

        for (let i = 1; i < columns.length; i++) {
            const cards = columns[i].querySelectorAll('.testimonial-card');
            cards.forEach(card => primaryScroll.appendChild(card.cloneNode(true)));
        }

        primaryScroll.innerHTML += primaryScroll.innerHTML;
        isApplied = true;
    }

    function disableMobileTestimonialsMarquee() {
        if (!isApplied) return;
        grid.innerHTML = originalHTML;
        isApplied = false;
    }

    const mql = window.matchMedia('(max-width: 768px)');

    function evaluate() {
        if (mql.matches) {
            enableMobileTestimonialsMarquee();
        } else {
            disableMobileTestimonialsMarquee();
        }
    }

    evaluate();

    if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', evaluate);
    } else if (typeof mql.addListener === 'function') {
        mql.addListener(evaluate);
    }

    let resizeRaf;
    window.addEventListener('resize', () => {
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(evaluate);
    });
});


(function () {
  'use strict';

  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var successHideTimer = null;

  function findForms() {
    // First try to find the specific newsletter form
    var newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      return [newsletterForm];
    }
    
    // Fallback: find forms that contain an email input
    var all = Array.prototype.slice.call(document.querySelectorAll('form'));
    return all.filter(function (f) {
      return !!f.querySelector('input[type="email"], input[name="email"]');
    });
  }

  function findNearby(rootEl, selector) {
    // Look within root, then climb up 3 ancestors to find the first match
    var cur = rootEl;
    for (var depth = 0; depth < 4 && cur; depth++) {
      var found = cur.querySelector(selector);
      if (found) return found;
      cur = cur.parentElement;
    }
    return document.querySelector(selector);
  }

  function pickMessageTarget(box) {
    if (!box) return null;
    return box.querySelector('.message') || box;
  }

  function clearMessages(successBox, errorBox, successMsgEl, errorMsgEl) {
    if (successHideTimer) {
      clearTimeout(successHideTimer);
      successHideTimer = null;
    }
    if (successMsgEl) successMsgEl.textContent = '';
    if (errorMsgEl) errorMsgEl.textContent = '';
    hide(successBox);
    hide(errorBox);
  }

  function show(el) {
    if (!el) return;
    el.removeAttribute('hidden');
    el.setAttribute('aria-hidden', 'false');
    el.style.display = 'block';
    el.style.opacity = '1';
  }

  function hide(el) {
    if (!el) return;
    el.setAttribute('aria-hidden', 'true');
    el.style.display = 'none';
    el.style.opacity = '0';
  }

  function setLoading(btn, emailInput, isLoading) {
    if (btn) {
      var hasSwapSpans =
        !!btn.querySelector('.newsletter-submit-text') &&
        !!btn.querySelector('.newsletter-loading');
      if (hasSwapSpans) {
        if (isLoading) btn.classList.add('is-loading');
        else btn.classList.remove('is-loading');
      } else {
        var original = btn.getAttribute('data-original-text');
        if (!original) {
          btn.setAttribute('data-original-text', btn.textContent || '');
          original = btn.getAttribute('data-original-text');
        }
        btn.textContent = isLoading ? 'Subscribing…' : (original || 'Subscribe');
      }
      btn.disabled = !!isLoading;
    }
    if (emailInput) emailInput.disabled = !!isLoading;
  }

  function isValidEmail(value) {
    var v = String(value || '').trim();
    if (!v) return false;
    // Use native validity if available, fallback to regex
    var probe = document.createElement('input');
    probe.type = 'email';
    probe.value = v;
    return (probe.validity && probe.validity.valid) || EMAIL_REGEX.test(v);
  }

  function attach(form) {
    var emailInput = form.querySelector('input[name="email"]') || form.querySelector('input[type="email"]');
    var submitBtn =
      form.querySelector('#newsletterSubmit') ||
      form.querySelector('button[type="submit"]') ||
      form.querySelector('input[type="submit"]');

    // Use your existing UI blocks
    var successBox =
      findNearby(form, '.success-message') || findNearby(form, '.newsletter-success');
    var errorBox =
      findNearby(form, '.error-message') || findNearby(form, '.newsletter-error');

    var successMsgEl = pickMessageTarget(successBox);
    var errorMsgEl = pickMessageTarget(errorBox);

    if (!emailInput || !submitBtn || !successBox || !errorBox) return;

    form.setAttribute('novalidate', 'novalidate');
    
    // Initialize message states as hidden
    hide(successBox);
    hide(errorBox);
    if (successMsgEl) successMsgEl.textContent = '';
    if (errorMsgEl) errorMsgEl.textContent = '';

    // Clear error messages when user starts typing (but not when programmatically cleared)
    emailInput.addEventListener('input', function() {
      // Only clear messages if the user is actually typing (input has content)
      // This prevents clearing success messages when form is reset programmatically
      if (emailInput.value.trim().length > 0) {
        clearMessages(successBox, errorBox, successMsgEl, errorMsgEl);
      }
    });

    // Clear error messages when user focuses on input (only if there's an error showing)
    emailInput.addEventListener('focus', function() {
      // Only hide error box if it's currently visible and there's no success message showing
      if (errorBox.getAttribute('aria-hidden') === 'false' && 
          successBox.getAttribute('aria-hidden') !== 'false') {
        hide(errorBox);
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      clearMessages(successBox, errorBox, successMsgEl, errorMsgEl);

      var email = (emailInput.value || '').trim();
      if (!email) {
        if (errorMsgEl) errorMsgEl.textContent = 'Email is required';
        show(errorBox);
        return;
      }
      if (!isValidEmail(email)) {
        if (errorMsgEl) errorMsgEl.textContent = 'Please enter a valid email address';
        show(errorBox);
        return;
      }

      setLoading(submitBtn, emailInput, true);

      // Execute reCAPTCHA if available and properly configured (matching React component approach)
      var newsletterV3Key = window.RECAPTCHA_SITE_KEY_V3 || window.RECAPTCHA_SITE_KEY;
      if (window.grecaptcha && newsletterV3Key) {
        try {
          window.grecaptcha.ready(function() {
            // v3 execute needs the v3 key; the practice page also holds a v2 key in RECAPTCHA_SITE_KEY
            window.grecaptcha.execute(newsletterV3Key, {action: 'newsletter'}).then(function(token) {
              if (token) {
                submitToAPI(email, token, submitBtn, emailInput, successBox, errorBox, successMsgEl, errorMsgEl);
              } else {
                // Fallback to submission without reCAPTCHA
                submitToAPI(email, null, submitBtn, emailInput, successBox, errorBox, successMsgEl, errorMsgEl);
              }
            }).catch(function(error) {
              console.warn('reCAPTCHA execution failed:', error);
              
              // Show user-friendly message about reCAPTCHA issue
              if (errorMsgEl) {
                errorMsgEl.textContent = 'Security verification unavailable. Proceeding without verification.';
                show(errorBox);
                setTimeout(function() {
                  hide(errorBox);
                }, 3000);
              }
              
              // Fallback to submission without reCAPTCHA
              setTimeout(function() {
                submitToAPI(email, null, submitBtn, emailInput, successBox, errorBox, successMsgEl, errorMsgEl);
              }, 1000);
            });
          });
        } catch (error) {
          console.warn('reCAPTCHA initialization error:', error);
          // Fallback to submission without reCAPTCHA
          submitToAPI(email, null, submitBtn, emailInput, successBox, errorBox, successMsgEl, errorMsgEl);
        }
      } else {
        // Fallback without reCAPTCHA (disabled or not available)
        submitToAPI(email, null, submitBtn, emailInput, successBox, errorBox, successMsgEl, errorMsgEl);
      }
    });
  }

  function submitToAPI(email, recaptchaToken, submitBtn, emailInput, successBox, errorBox, successMsgEl, errorMsgEl) {
    var payload = { email: email };
    if (recaptchaToken) {
      payload.recaptcha_token = recaptchaToken;
    }

    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
        .then(function (resp) {
          return Promise.all([resp.ok, resp.json().catch(function () { return {}; })]);
        })
      .then(function (res) {
        var ok = res[0];
        var data = res[1] || {};
        if (ok) {
          // Ensure error messages are hidden before showing success
          hide(errorBox);
          if (errorMsgEl) errorMsgEl.textContent = '';
          
          if (successMsgEl) {
            successMsgEl.textContent = data.message || 'Thank you for subscribing to our newsletter!';
          }
          show(successBox);
          emailInput.value = '';
          successHideTimer = setTimeout(function () {
            hide(successBox);
            if (successMsgEl) successMsgEl.textContent = '';
          }, 5000);
        } else {
          var msg;
          if (Array.isArray(data.errors) && data.errors[0]) {
            var error = data.errors[0];
            if (error.field === 'recaptcha') {
              msg = error.message || 'reCAPTCHA verification failed. Please try again.';
            } else {
              msg = error.message || 'Failed to subscribe. Please try again later.';
            }
          } else {
            msg = 'Failed to subscribe. Please try again later.';
          }
          if (errorMsgEl) errorMsgEl.textContent = msg;
          show(errorBox);
        }
      })
      .catch(function () {
        if (errorMsgEl) errorMsgEl.textContent = 'Network error. Please check your connection and try again.';
        show(errorBox);
      })
      .finally(function () {
        setLoading(submitBtn, emailInput, false);
      });
  }

  function init() {
    var forms = findForms();
    for (var i = 0; i < forms.length; i++) attach(forms[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Contact Form Multi-Step Handler
(function() {
  'use strict';

  var currentStep = 1;
  var formSessionId = null;
  var recaptchaToken = null;
  var states = [];

  // DOM Elements
  var form = document.getElementById('contactForm');
  var backBtn = document.getElementById('contactBackBtn');
  var nextBtn = document.getElementById('contactNextBtn');
  var submitBtn = document.getElementById('contactSubmitBtn');
  var successMessage = document.getElementById('contactSuccessMessage');
  var stepper = document.querySelector('.contact-form-stepper');

  if (!form) return;

  // Phone number masking
  function formatPhoneNumber(value) {
    var numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return '(' + numbers.slice(0, 3) + ') ' + numbers.slice(3);
    return '(' + numbers.slice(0, 3) + ') ' + numbers.slice(3, 6) + '-' + numbers.slice(6, 10);
  }

  var phoneInput = form.querySelector('input[name="phoneNumber"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      var cursorPosition = e.target.selectionStart;
      var oldValue = e.target.value;
      var formatted = formatPhoneNumber(e.target.value);
      e.target.value = formatted;
      
      // Adjust cursor position
      if (formatted.length < oldValue.length) {
        e.target.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
    
    // Also format on blur to ensure final format is correct
    phoneInput.addEventListener('blur', function(e) {
      var formatted = formatPhoneNumber(e.target.value);
      e.target.value = formatted;
    });
  }

  // Email validation
  function isValidEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Mirrors src/constants/validation.ts; the admin API rejects < and > too
  var NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} .'\u2019-]*$/u;
  var NO_HTML_PATTERN = /^[^<>]*$/;
  var NAME_ERROR_MESSAGE = 'Name can only contain letters, spaces, apostrophes, hyphens and periods.';
  var NO_HTML_ERROR_MESSAGE = 'This field cannot contain < or > characters.';

  // Phone validation
  function isValidPhone(phone) {
    // Clean the phone number and check if it has exactly 10 digits
    var numbers = phone.replace(/\D/g, '');
    
    // Check if we have exactly 10 digits
    if (numbers.length !== 10) {
      return false;
    }
    
    // Check the format matches (XXX) XXX-XXXX
    var regex = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;
    return regex.test(phone);
  }

  // Show error message
  function showError(fieldName, message) {
    var errorDiv = form.querySelector('.contact-error-message[data-field="' + fieldName + '"]');
    var input = form.querySelector('[name="' + fieldName + '"]');
    
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.classList.add('contact-error-visible');
    }
    
    if (input) {
      input.classList.add('contact-input-error');
    }
  }

  // Clear error message
  function clearError(fieldName) {
    var errorDiv = form.querySelector('.contact-error-message[data-field="' + fieldName + '"]');
    var input = form.querySelector('[name="' + fieldName + '"]');
    
    if (errorDiv) {
      errorDiv.textContent = '';
      errorDiv.classList.remove('contact-error-visible');
    }
    
    if (input) {
      input.classList.remove('contact-input-error');
    }
  }

  // Clear all errors
  function clearAllErrors() {
    var errors = form.querySelectorAll('.contact-error-message');
    errors.forEach(function(error) {
      error.textContent = '';
      error.classList.remove('contact-error-visible');
    });
    
    var inputs = form.querySelectorAll('.contact-input-error');
    inputs.forEach(function(input) {
      input.classList.remove('contact-input-error');
    });
  }

  // Add input listeners to clear errors
  var inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(function(input) {
    input.addEventListener('input', function() {
      clearError(input.name);
    });
  });

  // Validate current step
  function validateStep(step) {
    clearAllErrors();
    var isValid = true;

    if (step === 1) {
      var email = form.querySelector('input[name="email"]').value.trim();
      if (!email) {
        showError('email', 'Email is required');
        isValid = false;
      } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
      }
    }

    if (step === 2) {
      var name = form.querySelector('input[name="name"]').value.trim();
      var phone = form.querySelector('input[name="phoneNumber"]').value.trim();

      if (!name) {
        showError('name', 'Name is required');
        isValid = false;
      } else if (name.length > 255) {
        showError('name', 'Name must not exceed 255 characters');
        isValid = false;
      } else if (!NAME_PATTERN.test(name)) {
        showError('name', NAME_ERROR_MESSAGE);
        isValid = false;
      }

      if (!phone) {
        showError('phoneNumber', 'Phone number is required');
        isValid = false;
      } else if (!isValidPhone(phone)) {
        showError('phoneNumber', 'Please enter a valid phone number');
        isValid = false;
      }
    }

    if (step === 3) {
      var state = form.querySelector('select[name="state"]').value;
      var companyName = form.querySelector('input[name="companyName"]').value.trim();
      var comments = form.querySelector('textarea[name="comments"]').value.trim();

      if (!state) {
        showError('state', 'State is required');
        isValid = false;
      }

      if (companyName && companyName.length > 255) {
        showError('companyName', 'Company name must not exceed 255 characters');
        isValid = false;
      } else if (!NO_HTML_PATTERN.test(companyName)) {
        showError('companyName', NO_HTML_ERROR_MESSAGE);
        isValid = false;
      }

      if (comments && comments.length > 1000) {
        showError('comments', 'Comments must not exceed 1000 characters');
        isValid = false;
      } else if (!NO_HTML_PATTERN.test(comments)) {
        showError('comments', NO_HTML_ERROR_MESSAGE);
        isValid = false;
      }

      // Check reCAPTCHA v2 - required if configured
      var isRecaptchaConfigured = window.RECAPTCHA_SITE_KEY && window.RECAPTCHA_SITE_KEY !== 'null' && window.RECAPTCHA_SITE_KEY !== '';
      if (isRecaptchaConfigured && !recaptchaToken) {
        showError('recaptcha', 'Please complete the reCAPTCHA verification');
        isValid = false;
      }
    }

    return isValid;
  }

  // Update stepper UI
  function updateStepper() {
    // Update circles
    for (var i = 1; i <= 3; i++) {
      var circle = document.querySelector('.contact-step-circle[data-step="' + i + '"]');
      var label = circle.closest('.contact-step-item').querySelector('.contact-step-label');
      
      if (i <= currentStep) {
        circle.classList.add('contact-step-active');
      } else {
        circle.classList.remove('contact-step-active');
      }

      if (i === currentStep) {
        label.classList.add('contact-step-label-active');
      } else {
        label.classList.remove('contact-step-label-active');
      }
    }

    // Update connectors
    for (var j = 1; j <= 2; j++) {
      var connector = document.querySelector('.contact-step-connector[data-connector="' + j + '"]');
      if (j < currentStep) {
        connector.classList.add('contact-step-connector-active');
      } else {
        connector.classList.remove('contact-step-connector-active');
      }
    }
  }

  // Show step
  function showStep(step) {
    var steps = form.querySelectorAll('.contact-form-step');
    steps.forEach(function(stepEl) {
      var stepNum = parseInt(stepEl.getAttribute('data-step'));
      if (stepNum === step) {
        stepEl.classList.remove('contact-step-hidden');
      } else {
        stepEl.classList.add('contact-step-hidden');
      }
    });

    // Update buttons
    if (step === 1) {
      backBtn.classList.add('contact-btn-hidden');
      nextBtn.classList.remove('contact-btn-hidden');
      submitBtn.classList.add('contact-btn-hidden');
    } else if (step === 2) {
      backBtn.classList.remove('contact-btn-hidden');
      nextBtn.classList.remove('contact-btn-hidden');
      submitBtn.classList.add('contact-btn-hidden');
    } else if (step === 3) {
      backBtn.classList.remove('contact-btn-hidden');
      nextBtn.classList.add('contact-btn-hidden');
      submitBtn.classList.remove('contact-btn-hidden');
    }

    updateStepper();
  }

  // Split full name
  function splitFullName(fullName) {
    var parts = (fullName || '').trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return { first: '', last: '' };
    if (parts.length === 1) return { first: parts[0], last: '' };
    var first = parts[0];
    var last = parts.slice(1).join(' ');
    return { first: first, last: last };
  }

  // Submit step to API
  function submitStep(step, callback) {
    clearAllErrors();
    
    var requestBody = { step: step };

    // Add session ID for steps 2 and 3
    if (step > 1) {
      var sessionId = formSessionId || localStorage.getItem('contactFormSession');
      if (!sessionId) {
        showError('email', 'Session expired. Please start again from step 1.');
        currentStep = 1;
        showStep(1);
        return;
      }
      requestBody.form_session_id = sessionId;
      if (!formSessionId && sessionId) {
        formSessionId = sessionId;
      }
    }

    // Step 1: Email
    if (step === 1) {
      requestBody.email_id = form.querySelector('input[name="email"]').value.trim();
    }

    // Step 2: Name and Phone
    if (step === 2) {
      var fullName = form.querySelector('input[name="name"]').value.trim();
      var nameParts = splitFullName(fullName);
      requestBody.first_name = nameParts.first;
      if (nameParts.last) requestBody.last_name = nameParts.last;
      var phone = form.querySelector('input[name="phoneNumber"]').value.trim();
      if (phone) requestBody.phone_number = phone;
    }

    // Step 3: Company, State, Comments + reCAPTCHA
    if (step === 3) {
      var company = form.querySelector('input[name="companyName"]').value.trim();
      var state = form.querySelector('select[name="state"]').value;
      var comments = form.querySelector('textarea[name="comments"]').value.trim();

      if (company) requestBody.company_name = company;
      if (state) requestBody.state = state;
      if (comments) requestBody.comments = comments;

      // Add reCAPTCHA v2 token if available (obtained from checkbox widget)
      if (recaptchaToken) {
        requestBody.recaptcha_token = recaptchaToken;
      }
    }

    // Helper function for API submission (used by both reCAPTCHA v3 flow and direct flow)
    function submitToContactAPI(body, cb, buttons) {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then(function(response) {
        return Promise.all([response.ok, response.json().catch(function() { return {}; })]);
      })
      .then(function(result) {
        var ok = result[0];
        var data = result[1] || {};

        if (ok) {
          // Save session ID from step 1
          if (body.step === 1 && data.form_session_id) {
            formSessionId = data.form_session_id;
            localStorage.setItem('contactFormSession', formSessionId);
            localStorage.setItem('contactFormStep', '1');
          }

          // Update localStorage for steps 2 and 3
          if (body.step > 1 && formSessionId) {
            localStorage.setItem('contactFormStep', body.step.toString());
          }

          // If step 3 completed
          if (body.step === 3 && data.completion_status === 'completed') {
            localStorage.removeItem('contactFormSession');
            localStorage.removeItem('contactFormStep');
            formSessionId = null;
            recaptchaToken = null;

            // Show success message and hide stepper
            form.classList.add('contact-step-hidden');
            successMessage.classList.remove('contact-step-hidden');
            if (stepper) stepper.style.display = 'none';

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }

          cb(true);
        } else {
          // Handle errors
          if (data.status_code === 404) {
            localStorage.removeItem('contactFormSession');
            localStorage.removeItem('contactFormStep');
            formSessionId = null;
            currentStep = 1;
            showStep(1);
            showError('email', 'Session expired. Please start again.');
          } else if (data.status_code === 409) {
            showError('email', 'This form has already been completed.');
          } else if (data.errors && data.errors.length > 0) {
            // The recaptcha error box sits in step 3; earlier steps show general errors on their first field
            var generalField = body.step === 3 ? 'recaptcha' : (body.step === 2 ? 'name' : 'email');
            var fieldMap = {
              email_id: 'email',
              first_name: 'name',
              last_name: 'name',
              phone_number: 'phoneNumber',
              company_name: 'companyName',
              state: 'state',
              comments: 'comments',
              recaptcha: generalField,
              recaptcha_token: generalField
            };

            data.errors.forEach(function(error) {
              if (error.field) {
                var formFieldName = fieldMap[error.field] || error.field;
                showError(formFieldName, error.message);
              } else if (error.message) {
                showError(generalField, error.message);
              }
            });
          } else {
            showError(body.step === 3 ? 'recaptcha' : 'email', 'Something went wrong. Please try again.');
          }

          // A v2 token is single-use; the admin API has consumed it
          if (body.step === 3) resetContactRecaptcha();

          cb(false);
        }
      })
      .catch(function(error) {
        console.error('Error:', error);
        showError('email', 'Network error. Please check your connection and try again.');
        cb(false);
      })
      .finally(function() {
        buttons.forEach(function(btn) {
          if (btn) btn.disabled = false;
        });
        if (submitBtn) submitBtn.classList.remove('contact-loading');
      });
    }

    // Disable buttons
    var btns = [backBtn, nextBtn, submitBtn];
    btns.forEach(function(btn) {
      if (btn) btn.disabled = true;
    });

    if (submitBtn) submitBtn.classList.add('contact-loading');

    // Step 1 creates the record that receives reminder emails, so it carries a v3 token
    if (step === 1) {
      getContactStep1Token(function(token) {
        if (token) requestBody.recaptcha_token = token;
        submitToContactAPI(requestBody, callback, btns);
      });
      return;
    }

    // Use the helper function for API submission
    submitToContactAPI(requestBody, callback, btns);
  }

  // Resolves null when v3 is not configured or fails; the admin API then rejects the step
  function getContactStep1Token(cb) {
    var v3Key = window.RECAPTCHA_SITE_KEY_V3;
    if (!window.grecaptcha || !v3Key) {
      cb(null);
      return;
    }
    try {
      window.grecaptcha.ready(function() {
        window.grecaptcha.execute(v3Key, {action: 'contact_step1'}).then(cb, function() {
          cb(null);
        });
      });
    } catch (error) {
      cb(null);
    }
  }

  function resetContactRecaptcha() {
    recaptchaToken = null;
    if (window.grecaptcha && window.contactFormRecaptchaWidgetId !== undefined) {
      try {
        window.grecaptcha.reset(window.contactFormRecaptchaWidgetId);
      } catch (error) {
        // Widget not rendered
      }
    }
  }

  // Next button handler
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (validateStep(currentStep)) {
        submitStep(currentStep, function(success) {
          if (success) {
            currentStep++;
            showStep(currentStep);
          }
        });
      }
    });
  }

  // Back button handler
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });
  }

  // Submit handler
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (currentStep === 3 && validateStep(3)) {
        submitStep(3, function(success) {
          // Success is handled in submitStep
        });
      }
    });
  }


  // Load states
  function loadStates() {
    var stateSelect = form.querySelector('select[name="state"]');
    if (!stateSelect) return;

    stateSelect.innerHTML = '<option value="">Loading states...</option>';

    fetch('/api/states')
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch states');
      })
      .then(function(data) {
        if (data && data.rows) {
          states = data.rows;
          stateSelect.innerHTML = '<option value="">Select State</option>';

          states.forEach(function(state) {
            var option = document.createElement('option');
            option.value = state.name;
            option.textContent = state.name + ' (' + state.code + ')';
            stateSelect.appendChild(option);
          });
        }
      })
      .catch(function(error) {
        console.error('Error loading states:', error);
        stateSelect.innerHTML = '<option value="">Error loading states</option>';
      });
  }

  // Initialize reCAPTCHA v2 for contact form (checkbox widget)
  function initContactRecaptcha() {
    var recaptchaContainer = document.querySelector('.contact-recaptcha-container');

    // If reCAPTCHA v2 is not configured, hide the container
    if (!window.RECAPTCHA_SITE_KEY || window.RECAPTCHA_SITE_KEY === 'null' || window.RECAPTCHA_SITE_KEY === '') {
      if (recaptchaContainer) {
        recaptchaContainer.style.display = 'none';
      }
      return;
    }

    // Show the reCAPTCHA container if site key is configured
    if (recaptchaContainer) {
      recaptchaContainer.style.display = 'block';
    }

    if (!window.grecaptcha) return;

    try {
      window.grecaptcha.ready(function() {
        var container = document.getElementById('contactFormRecaptcha');
        if (container && window.RECAPTCHA_SITE_KEY) {
          window.contactFormRecaptchaWidgetId = window.grecaptcha.render('contactFormRecaptcha', {
            sitekey: window.RECAPTCHA_SITE_KEY,
            callback: function(token) {
              recaptchaToken = token;
              clearError('recaptcha');
            },
            'expired-callback': function() {
              recaptchaToken = null;
              showError('recaptcha', 'reCAPTCHA has expired. Please verify again.');
            },
            'error-callback': function() {
              recaptchaToken = null;
              showError('recaptcha', 'reCAPTCHA error occurred. Please try again.');
            }
          });
        }
      });
    } catch (error) {
      console.warn('reCAPTCHA initialization error:', error);
    }
  }

  // Initialize
  function init() {
    // Ensure form is shown and success message is hidden on page load/reload
    form.classList.remove('contact-step-hidden');
    successMessage.classList.add('contact-step-hidden');
    if (stepper) stepper.style.display = 'flex';

    showStep(currentStep);
    loadStates();

    // Initialize reCAPTCHA when available
    if (window.grecaptcha) {
      initContactRecaptcha();
    } else {
      // Wait for reCAPTCHA to load
      var recaptchaCheckInterval = setInterval(function() {
        if (window.grecaptcha) {
          clearInterval(recaptchaCheckInterval);
          initContactRecaptcha();
        }
      }, 100);

      // Stop checking after 10 seconds
      setTimeout(function() {
        clearInterval(recaptchaCheckInterval);
      }, 10000);
    }
  }

  // Run initialization
  init();

})();


// FAQ Accordion
(function() {
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', function() {
        var isExpanded = question.getAttribute('aria-expanded') === 'true';

        // Close all other FAQs
        faqItems.forEach(function(otherItem) {
          var otherQuestion = otherItem.querySelector('.faq-question');
          if (otherQuestion && otherQuestion !== question) {
            otherQuestion.setAttribute('aria-expanded', 'false');
            otherItem.classList.remove('faq-active');
          }
        });

        // Toggle current FAQ
        question.setAttribute('aria-expanded', !isExpanded);
        item.classList.toggle('faq-active', !isExpanded);
      });
    }
  });
})();