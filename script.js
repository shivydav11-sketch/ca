/**
 * FINANCE & COMPLIANCE PARTNER - INTERACTIVE SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Dynamic Year
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      
      // Animate hamburger to X
      const bars = navToggle.querySelectorAll('.hamburger-bar');
      if (isOpen) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close mobile menu on click outside or on ESC key
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    function closeMobileMenu() {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      const bars = navToggle.querySelectorAll('.hamburger-bar');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  }

  // 3. Scroll Header Effect & Back to Top Button
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar shadow on scroll
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top appearance
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Update active nav link based on section in view
    updateActiveNavLink();
  });

  // 4. Scroll Spy - Highlight active menu item
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 5. Consultation Form Validation & Submission
  const consultationForm = document.getElementById('consultationForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnIcon = document.getElementById('btnIcon');
  const formSuccessMessage = document.getElementById('formSuccessMessage');
  const successSummary = document.getElementById('successSummary');

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Inputs
      const fullName = document.getElementById('fullName');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const serviceSelect = document.getElementById('serviceSelect');
      const message = document.getElementById('message');
      const partnerSelect = document.getElementById('partnerSelect');
      const company = document.getElementById('company');

      // Error fields
      const fullNameError = document.getElementById('fullNameError');
      const emailError = document.getElementById('emailError');
      const phoneError = document.getElementById('phoneError');
      const serviceError = document.getElementById('serviceError');
      const messageError = document.getElementById('messageError');

      // Clear previous error states
      [fullName, email, phone, serviceSelect, message].forEach(el => el.classList.remove('input-error'));
      [fullNameError, emailError, phoneError, serviceError, messageError].forEach(el => {
        el.textContent = '';
        el.classList.remove('visible');
      });

      // Name validation
      if (!fullName.value.trim() || fullName.value.trim().length < 2) {
        showError(fullName, fullNameError, 'Please enter your full name.');
        isValid = false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        showError(email, emailError, 'Please enter a valid business or personal email address.');
        isValid = false;
      }

      // Phone validation
      if (!phone.value.trim() || phone.value.trim().length < 7) {
        showError(phone, phoneError, 'Please provide a valid contact/WhatsApp phone number.');
        isValid = false;
      }

      // Service selection validation
      if (!serviceSelect.value) {
        showError(serviceSelect, serviceError, 'Please select the service required.');
        isValid = false;
      }

      // Message validation
      if (!message.value.trim() || message.value.trim().length < 10) {
        showError(message, messageError, 'Please provide brief details (at least 10 characters).');
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // UI Feedback
      submitBtn.disabled = true;
      btnText.textContent = 'Opening in Your Email Client...';
      btnIcon.className = 'fa-solid fa-spinner fa-spin';

      setTimeout(() => {
        // Collect form values
        const clientNameVal = fullName.value.trim();
        const emailVal = email.value.trim();
        const phoneVal = phone.value.trim();
        const companyVal = company.value.trim() || 'Not specified';
        const serviceVal = serviceSelect.value;
        const partnerVal = partnerSelect.value;
        const notesVal = message.value.trim();

        // Determine destination partner email(s)
        let targetEmail = 'guptaarjun2025@gmail.com,kshukla930@gmail.com,Aashishkarn10@gmail.com';
        if (partnerVal.includes('Arjun')) {
          targetEmail = 'guptaarjun2025@gmail.com';
        } else if (partnerVal.includes('Shubham')) {
          targetEmail = 'kshukla930@gmail.com';
        } else if (partnerVal.includes('Aashish')) {
          targetEmail = 'Aashishkarn10@gmail.com';
        }

        // Construct Email Subject & Body
        const emailSubject = `Engagement Inquiry: ${serviceVal} - ${clientNameVal}`;
        const emailBody = `Dear Partners,

I am writing to inquire regarding your finance and compliance advisory services. Below are my engagement details:

• Client Name: ${clientNameVal}
• Email Address: ${emailVal}
• Phone / WhatsApp: ${phoneVal}
• Company / Practice: ${companyVal}
• Core Service Required: ${serviceVal}
• Preferred Consultant: ${partnerVal}

Engagement Scope / Notes:
${notesVal}

Please review my inquiry and provide a structured scope and proposal.

Best regards,
${clientNameVal}`;

        const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        // Open in user's email client
        window.location.href = mailtoUrl;

        // Transition UI to Success confirmation
        consultationForm.style.display = 'none';
        formSuccessMessage.style.display = 'block';

        const openEmailClientBtn = document.getElementById('openEmailClientBtn');
        if (openEmailClientBtn) {
          openEmailClientBtn.href = mailtoUrl;
        }

        successSummary.innerHTML = `<strong>Thank you, ${clientNameVal}!</strong> Your email draft addressed to <em>${targetEmail}</em> has been generated with all your details. Please click <strong>Send</strong> in your email window to dispatch it.`;

        // Pre-configure WhatsApp Instant Links as backup option
        const waMessage = encodeURIComponent(`Hi, I'm ${clientNameVal}. I would like to inquire about ${serviceVal}. Scope: ${notesVal}`);
        const waArjun = document.getElementById('instantWaArjun');
        const waShubham = document.getElementById('instantWaShubham');
        const waAashish = document.getElementById('instantWaAashish');

        if (waArjun) waArjun.href = `https://wa.me/9779814245654?text=${waMessage}`;
        if (waShubham) waShubham.href = `https://wa.me/9779814205937?text=${waMessage}`;
        if (waAashish) waAashish.href = `https://wa.me/9779814263284?text=${waMessage}`;

        showToast('Email client opened with your inquiry! Click Send in your email client.');

        // Reset submit button state
        submitBtn.disabled = false;
        btnText.textContent = 'Submit Engagement Inquiry';
        btnIcon.className = 'fa-solid fa-paper-plane';
      }, 500);
    });
  }

  function showError(inputElement, errorElement, message) {
    inputElement.classList.add('input-error');
    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }

  // Clear errors when user types or changes value
  const inputs = document.querySelectorAll('#consultationForm input, #consultationForm select, #consultationForm textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('input-error');
      const errEl = document.getElementById(`${input.id}Error`);
      if (errEl) {
        errEl.textContent = '';
        errEl.classList.remove('visible');
      }
    });
  });
});

/**
 * Helper to select service directly in the form from Service cards
 */
function selectServiceInForm(serviceName) {
  const serviceDropdown = document.getElementById('serviceSelect');
  if (serviceDropdown) {
    for (let i = 0; i < serviceDropdown.options.length; i++) {
      if (serviceDropdown.options[i].value === serviceName) {
        serviceDropdown.selectedIndex = i;
        break;
      }
    }
  }

  // Flash highlight on the form to guide the user
  const formCard = document.querySelector('.form-card');
  if (formCard) {
    formCard.style.outline = '2px solid var(--blue-500)';
    setTimeout(() => {
      formCard.style.outline = 'none';
    }, 1500);
  }
}

/**
 * Reset form back to interactive entry state
 */
function resetFormView() {
  const consultationForm = document.getElementById('consultationForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');
  if (consultationForm && formSuccessMessage) {
    consultationForm.reset();
    
    // Clear any residual error states
    const errorInputs = consultationForm.querySelectorAll('.input-error');
    errorInputs.forEach(el => el.classList.remove('input-error'));
    
    const errorMessages = consultationForm.querySelectorAll('.field-error');
    errorMessages.forEach(el => {
      el.textContent = '';
      el.classList.remove('visible');
    });

    consultationForm.style.display = 'block';
    formSuccessMessage.style.display = 'none';

    // Focus on the first input
    const firstInput = document.getElementById('fullName');
    if (firstInput) {
      firstInput.focus();
    }
  }
}

/**
 * Copy contact number or details to clipboard with Toast Notification
 */
function copyContact(textToCopy, partnerName) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(`Copied ${partnerName}'s contact number (${textToCopy}) to clipboard!`);
    }).catch(() => {
      fallbackCopy(textToCopy, partnerName);
    });
  } else {
    fallbackCopy(textToCopy, partnerName);
  }
}

function fallbackCopy(text, partnerName) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`Copied ${partnerName}'s number to clipboard!`);
  } catch (err) {
    showToast(`Contact: ${text}`);
  }
  document.body.removeChild(textArea);
}

/**
 * Show temporary floating toast notification
 */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #60a5fa;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
