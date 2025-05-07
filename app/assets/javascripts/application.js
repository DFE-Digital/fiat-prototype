//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Share button for reporting pages
  const copyLinkURL = document.getElementById('js-copy-link-btn');
  const copyLinkBanner = document.getElementById('js-copy-link-banner');

  if (copyLinkURL && copyLinkBanner) {
    copyLinkURL.addEventListener('click', () => {
      const link = window.location.href;

      navigator.clipboard.writeText(link).then(() => {
        // Show banner if copy succeeds
        copyLinkBanner.classList.remove('govuk-!-display-none');
        copyLinkBanner.classList.add('govuk-!-display-block');
      }).catch(err => {
        console.error('Failed to copy the link: ', err);
        // Optionally show an error message to the user here
      });
    });
  }
  
});