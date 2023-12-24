/**
 * Smoothly scroll to the top of the page
 */
export function scrollToTop() {
  window.scrollTo({
    behavior: 'smooth',
    left: 0,
    top: 0,
  });
}
