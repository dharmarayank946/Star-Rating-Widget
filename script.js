/**
 * VEDA Technology Web Development Internship — Task 19: Star Rating Widget
 * Pure Vanilla JavaScript (ES6+) Implementation
 * 
 * Developer: Nagalambika D Koralli
 * 
 * Requirements handled:
 * 1. Display five clickable stars (1 to 5).
 * 2. Highlight stars on hover to preview the rating.
 * 3. Keep selected rating after mouse leaves.
 * 4. Display selected rating: "Your rating: X/5".
 * 5. Allow users to change rating anytime by clicking another star.
 * 6. Reset Rating button to clear selection.
 * 7. Use data-value attributes for star values.
 * 8. Keep hover state strictly separate from selected rating state.
 * 9. Keyboard-accessible navigation (Arrows, Enter, Space, Home, End).
 * 10. Friendly initial message before any rating is selected.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. DOM ELEMENT REFERENCES
  // ---------------------------------------------------------------------------
  const starsContainer = document.getElementById('starsContainer');
  const starButtons = document.querySelectorAll('.star-btn');
  const feedbackCard = document.getElementById('feedbackCard');
  const ratingText = document.getElementById('ratingText');
  const ratingBadge = document.getElementById('ratingBadge');
  const ratingSentiment = document.getElementById('ratingSentiment');
  const hoverNotice = document.getElementById('hoverNotice');
  const hoverNoticeText = document.getElementById('hoverNoticeText');
  const resetBtn = document.getElementById('resetBtn');
  const guideItems = document.querySelectorAll('.guide-item');
  const presetChips = document.querySelectorAll('.preset-chip');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const checkIcon = toastNotification ? toastNotification.querySelector('.check-icon') : null;
  const resetIcon = toastNotification ? toastNotification.querySelector('.reset-icon') : null;

  // ---------------------------------------------------------------------------
  // 2. STATE MANAGEMENT
  // Requirement 8: Keep hover state separate from selected rating state.
  // ---------------------------------------------------------------------------
  let currentRating = 0; // 0 = No rating selected initially
  let hoverRating = 0;   // 0 = No active hover preview
  let toastTimeoutId = null;

  // Rating metadata lookup dictionary
  const ratingDetails = {
    0: {
      text: "Please click or tap a star to set your rating",
      sentiment: "We value your honest feedback to improve our services.",
      badge: ""
    },
    1: {
      text: "Your rating: 1/5",
      sentiment: "Poor — We are sorry to hear that. We will work hard to improve!",
      badge: "1 / 5"
    },
    2: {
      text: "Your rating: 2/5",
      sentiment: "Fair — Thank you for your feedback. We have room for improvement.",
      badge: "2 / 5"
    },
    3: {
      text: "Your rating: 3/5",
      sentiment: "Good — Glad to know you had a positive experience!",
      badge: "3 / 5"
    },
    4: {
      text: "Your rating: 4/5",
      sentiment: "Very Good — Awesome! Thank you for the positive rating.",
      badge: "4 / 5"
    },
    5: {
      text: "Your rating: 5/5",
      sentiment: "Excellent — Outstanding! Thank you so much for the 5-star support!",
      badge: "5 / 5"
    }
  };

  // ---------------------------------------------------------------------------
  // 3. TOAST NOTIFICATION UTILITY
  // ---------------------------------------------------------------------------
  function showToast(message, type = 'check') {
    if (!toastNotification || !toastMessage) return;

    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }

    toastMessage.textContent = message;

    if (type === 'reset') {
      if (checkIcon) checkIcon.classList.add('hidden');
      if (resetIcon) resetIcon.classList.remove('hidden');
    } else {
      if (checkIcon) checkIcon.classList.remove('hidden');
      if (resetIcon) resetIcon.classList.add('hidden');
    }

    toastNotification.classList.remove('hidden');

    toastTimeoutId = setTimeout(() => {
      toastNotification.classList.add('hidden');
    }, 2400);
  }

  // ---------------------------------------------------------------------------
  // 4. RENDER STAR STATES (SEPARATION OF HOVER & SELECTED)
  // ---------------------------------------------------------------------------
  function renderStars() {
    const isHoverActive = hoverRating > 0;

    // Toggle container state indicator class
    if (isHoverActive) {
      starsContainer.classList.add('is-hovering');
    } else {
      starsContainer.classList.remove('is-hovering');
    }

    // Update each star button state using classList and data-value
    starButtons.forEach((star) => {
      const starVal = parseInt(star.getAttribute('data-value'), 10);

      if (isHoverActive) {
        // In hover preview mode:
        // Highlight stars up to the hovered value
        if (starVal <= hoverRating) {
          star.classList.add('hovered');
        } else {
          star.classList.remove('hovered');
        }
      } else {
        // Normal mode (mouse left or keyboard idle):
        // Remove hover classes and show permanent selected state
        star.classList.remove('hovered');

        if (starVal <= currentRating) {
          star.classList.add('selected');
        } else {
          star.classList.remove('selected');
        }

        // Accessibility ARIA radio state
        star.setAttribute('aria-checked', starVal === currentRating ? 'true' : 'false');
      }
    });

    // Update hover preview pill
    if (isHoverActive) {
      if (hoverNotice) {
        hoverNoticeText.textContent = `Hover Preview: ${hoverRating} / 5`;
        hoverNotice.classList.remove('hidden');
      }
    } else {
      if (hoverNotice) {
        hoverNotice.classList.add('hidden');
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 5. UPDATE FEEDBACK CARD & RATING DISPLAY
  // ---------------------------------------------------------------------------
  function updateFeedbackDisplay() {
    const data = ratingDetails[currentRating] || ratingDetails[0];

    // Update primary text: e.g., "Your rating: 4/5" or initial message
    ratingText.textContent = data.text;
    ratingSentiment.textContent = data.sentiment;

    if (currentRating > 0) {
      ratingBadge.textContent = data.badge;
      ratingBadge.classList.remove('hidden');
      feedbackCard.classList.add('has-rating');
      resetBtn.disabled = false;
    } else {
      ratingBadge.classList.add('hidden');
      feedbackCard.classList.remove('has-rating');
      resetBtn.disabled = true;
    }

    // Highlight the corresponding row in the Rating Scale Guide
    guideItems.forEach((item) => {
      const guideVal = parseInt(item.getAttribute('data-guide-val'), 10);
      if (guideVal === currentRating) {
        item.classList.add('active-level');
      } else {
        item.classList.remove('active-level');
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 6. SET RATING (SELECTION ACTION)
  // ---------------------------------------------------------------------------
  function setRating(value, triggerToast = true) {
    const numericVal = parseInt(value, 10);

    // Validate 1 to 5 range
    if (numericVal < 1 || numericVal > 5) return;

    currentRating = numericVal;
    hoverRating = 0; // Clear any hover override upon selection

    renderStars();
    updateFeedbackDisplay();

    if (triggerToast) {
      showToast(`Rating confirmed: ${currentRating} of 5 stars!`, 'check');
    }
  }

  // ---------------------------------------------------------------------------
  // 7. RESET RATING
  // ---------------------------------------------------------------------------
  function resetRating() {
    if (currentRating === 0 && hoverRating === 0) return;

    currentRating = 0;
    hoverRating = 0;

    renderStars();
    updateFeedbackDisplay();

    // Reset ARIA states on all buttons
    starButtons.forEach((star) => {
      star.setAttribute('aria-checked', 'false');
    });

    showToast('Rating reset to initial state.', 'reset');
  }

  // ---------------------------------------------------------------------------
  // 8. EVENT LISTENERS: STARS HOVER & CLICK
  // ---------------------------------------------------------------------------

  // Individual star interaction
  starButtons.forEach((star, index) => {
    const starVal = parseInt(star.getAttribute('data-value'), 10);

    // Mouse Enter (Hover preview)
    star.addEventListener('mouseenter', () => {
      hoverRating = starVal;
      renderStars();
    });

    // Click (Select rating or change rating)
    star.addEventListener('click', () => {
      setRating(starVal, true);
    });

    // Keyboard Focus: preview on focus for screen reader / keyboard users
    star.addEventListener('focus', () => {
      hoverRating = starVal;
      renderStars();
    });

    // Keyboard Blur
    star.addEventListener('blur', () => {
      hoverRating = 0;
      renderStars();
    });

    // Keyboard Navigation Handler (Arrow keys, Space, Enter, Home, End)
    star.addEventListener('keydown', (event) => {
      let targetIndex = null;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          event.preventDefault();
          targetIndex = index < starButtons.length - 1 ? index + 1 : 0;
          break;

        case 'ArrowLeft':
        case 'ArrowDown':
          event.preventDefault();
          targetIndex = index > 0 ? index - 1 : starButtons.length - 1;
          break;

        case 'Home':
          event.preventDefault();
          targetIndex = 0;
          break;

        case 'End':
          event.preventDefault();
          targetIndex = starButtons.length - 1;
          break;

        case 'Enter':
        case ' ': // Space key
          event.preventDefault();
          setRating(starVal, true);
          return;

        default:
          return;
      }

      if (targetIndex !== null) {
        const nextStar = starButtons[targetIndex];
        nextStar.focus();
        const nextVal = parseInt(nextStar.getAttribute('data-value'), 10);
        // Automatically set rating upon arrow navigation (standard WAI-ARIA radio group pattern)
        setRating(nextVal, true);
      }
    });
  });

  // Mouse leaves entire stars container: revert to selected rating
  starsContainer.addEventListener('mouseleave', () => {
    hoverRating = 0;
    renderStars();
  });

  // ---------------------------------------------------------------------------
  // 9. EVENT LISTENERS: RESET & PRESETS
  // ---------------------------------------------------------------------------
  resetBtn.addEventListener('click', () => {
    resetRating();
    // Return focus to first star for keyboard accessibility
    if (starButtons.length > 0) {
      starButtons[0].focus();
    }
  });

  // Quick Test Preset Buttons
  presetChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const presetVal = parseInt(chip.getAttribute('data-preset'), 10);
      setRating(presetVal, true);
    });
  });

  // ---------------------------------------------------------------------------
  // 10. INITIALIZATION
  // ---------------------------------------------------------------------------
  renderStars();
  updateFeedbackDisplay();
});
