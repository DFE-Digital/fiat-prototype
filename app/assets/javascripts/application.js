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

    const closeButton = document.getElementById("fast-notification_close-button");
    const container = document.getElementById("fast-notification_container");
  
    if (closeButton && container) {
      closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        container.classList.add("govuk-!-display-none");
        console.log('it works!');
      });
    }

  document.querySelectorAll('.fiat-home-search select').forEach((select) => {
    if (!window.accessibleAutocomplete) {
      return
    }

    const inputId = select.id
    const emptyOption = [...select.options].find(option => !option.value)
    const placeholder = emptyOption ? emptyOption.text.trim() : ''

    const goToPage = (text) => {
      const option = [...select.options].find(o => o.text.trim() === (text || '').trim())
      if (option && option.dataset.url) {
        window.location.href = option.dataset.url
        return true
      }
    }

    window.accessibleAutocomplete.enhanceSelectElement({
      selectElement: select,
      defaultValue: '',
      name: 'q',
      placeholder,
      displayMenu: 'overlay',
      minLength: 2,
      autoselect: false,
      confirmOnBlur: false,
      inputClasses: 'dfe-search__input',
      onConfirm: goToPage
    })

    select.form?.addEventListener('submit', (event) => {
      if (goToPage(document.getElementById(inputId)?.value)) {
        event.preventDefault()
      }
    })
  })

  const headerSearchToggle = document.getElementById('app-header-search-toggle')
  const headerSearch = document.getElementById('app-header-search')

  if (headerSearchToggle && headerSearch) {
    const headerSearchInput = headerSearch.querySelector('input')

    const setHeaderSearchOpen = (open) => {
      headerSearchToggle.setAttribute('aria-expanded', String(open))
      headerSearchToggle.setAttribute('aria-label', open ? 'Close search' : 'Open search')
      headerSearch.hidden = !open
      document.body.classList.toggle('app-header-search-open', open)

      if (open) {
        headerSearchInput?.focus()
      }
    }

    headerSearchToggle.addEventListener('click', () => {
      const open = headerSearchToggle.getAttribute('aria-expanded') !== 'true'
      setHeaderSearchOpen(open)
    })

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && headerSearchToggle.getAttribute('aria-expanded') === 'true') {
        setHeaderSearchOpen(false)
        headerSearchToggle.focus()
      }
    })
  }
});

