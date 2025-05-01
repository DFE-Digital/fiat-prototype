//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here

  // Share button for reporting pages
  const copyLinkURL = document.getElementById('js-copy-link-btn');
  copyLinkURL.addEventListener('click', () => {
      // Copy the link
      const link = window.location.href;
      navigator.clipboard.writeText(link);
  });
})
