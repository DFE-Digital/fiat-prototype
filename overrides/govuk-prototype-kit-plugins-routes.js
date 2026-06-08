const requests = require('../../index').requests
const plugins = require('./plugins')

// Serve assets from plugins (encoded paths + decoded paths for reverse proxies e.g. Azure Front Door)
function setupPathsFor (item) {
  plugins.getPublicUrlAndFileSystemPaths(item)
    .forEach(paths => {
      requests.serveDirectory(paths.publicUrl, paths.fileSystemPath)
      try {
        const decodedUrl = decodeURIComponent(paths.publicUrl)
        if (decodedUrl !== paths.publicUrl) {
          requests.serveDirectory(decodedUrl, paths.fileSystemPath)
        }
      } catch (e) {}
      requests.serveDirectory(
        paths.publicUrl.replace('plugin-assets', 'extension-assets'), paths.fileSystemPath)
      try {
        const decodedExtension = decodeURIComponent(paths.publicUrl.replace('plugin-assets', 'extension-assets'))
        if (decodedExtension !== paths.publicUrl.replace('plugin-assets', 'extension-assets')) {
          requests.serveDirectory(decodedExtension, paths.fileSystemPath)
        }
      } catch (e) {}
    })
}

setupPathsFor('scripts')
setupPathsFor('stylesheets')
setupPathsFor('assets')