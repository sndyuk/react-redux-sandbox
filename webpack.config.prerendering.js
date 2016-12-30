const production = process.env.NODE_ENV === 'production';

const
  path = require('path'),
  webpack = require('webpack'),
  pack = require(production ? './webpack.config.production' : './webpack.config.development'),
  PrerenderSpaPlugin = require('prerender-spa-plugin');

pack.plugins.push(new PrerenderSpaPlugin(
  // Absolute path to compiled SPA
  path.resolve(__dirname, './build/'),
  // List of routes to prerender
  ['/'],
  // Options
  {
    // NOTE: Unless you are relying on asynchronously rendered content,
    // such as after an Ajax request, none of these options should be
    // necessary. All synchronous scripts are already executed before
    // capturing the page content.
  
    // Wait until a specific event is fired on the document.
    // captureAfterDocumentEvent: 'ready-for-prerender',
    // This is how you would trigger this example event:
    // document.dispatchEvent(new Event('ready-for-prerender'))
  
    // Wait until a specific element is detected with
    // document.querySelector.
    captureAfterElementExists: '#root',
  
    // Wait until a number of milliseconds has passed after scripts
    // have been executed. It's important to note that this may
    // produce unreliable results when relying on network
    // communication or other operations with highly variable timing.
    captureAfterTime: 20000,
  
    // NOTE: You can even combine strategies if you like. For example,
    // if you only _sometimes_ want to wait for an event to fire, you
    // can create a timeout by combining captureAfterTime with
    // captureAfterDocumentEvent. When combining strategies, page
    // content will be captured after the first triggered strategy.
  
    // Instead of loudly failing on JS errors (the default), ignore them.
    // ignoreJSErrors: true,
  
    // Because PhantomJS occasionally runs into an intermittent issue,
    // we will retry a page capture up to 10 times by default. You may
    // raise or lower this limit if you wish.
    maxAttempts: 10,
  
    // Prevent PhantomJS from navigating away from the URL passed to it
    // and prevent loading embedded iframes (e.g. Disqus and Soundcloud
    // embeds), which are not ideal for SEO and may introduce JS errors.
    // navigationLocked: true,
  
    // The options below expose configuration options for PhantomJS,
    // for the rare case that you need special settings for specific
    // systems or applications.
  
    // http://phantomjs.org/api/command-line.html#command-line-options
    phantomOptions: '--disk-cache=true',
  
    // http://phantomjs.org/api/webpage/property/settings.html
    phantomPageSettings: {
      loadImages: true
    },
  
    // Manually transform the HTML for each page after prerendering,
    // for example to set the page title and metadata in edge cases
    // where you cannot handle this via your routing solution.
    //
    // The function's context argument contains two properties:
    //
    // - html :: the resulting HTML after prerendering)
    // - route :: the route currently being processed
    //            e.g. "/", "/about", or "/contact")
    //
    // Whatever is returned will be printed to the prerendered file.
    // postProcessHtml: function (context) {
    //   var titles = {
    //     '/': 'Home',
    //     '/about': 'Our Story',
    //     '/contact': 'Contact Us'
    //   }
    //   return context.html.replace(
    //     /<title>[^<]*<\/title>/i,
    //     '<title>' + titles[context.route] + '</title>'
    //   )
    // }
  }
));

module.exports = pack;
