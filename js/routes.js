routes = [
  {
    path: '/',
    url: './index.html',
    on: {
    pageInit: function (e, page) {
    	getLatestListings();
    	getUserData();
    	}
    },
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
    {
    path: '/profile/',
    url: './pages/profile.html',
    on: {pageInit: function (e, page) {profileLoginCheck();}
    },
  },
    {
      path: '/blog/',
      url: './pages/blog.html',
      on: {
      pageInit: function (e, page) {
            getFullNews();
      },
      }
    },
        {
      path: '/add-product/',
      url: './pages/add-product.html',
      on: {
      pageInit: function (e, page) {
      logChk("add-product.html");
      },
      }
    },
    {
      path: '/blank/',
      url: './pages/_blank.html',
      on: {
      pageInit: function (e, page) {

//do whatever

      },
      }
    },
     {
      path: '/machinecatlisting/',
      url: './pages/machine-cat-listing.html',
      on: {
      pageInit: function (e, page) {
            getAllMachines();
      },
      }
    },
    {
      path: '/autocat/',
      url: './pages/auto-categories.html',
      on: {
      pageInit: function (e, page) {
            getCatListing();
      },
      }
    },
      {
      path: '/booking/',
      url: './booking-form.html',
    },
    {
      path: '/faqs/',
      url: './pages/faqs.html',
      on : {
          pageInit: function (e, page) {
              getFaqs();
          },
      }
    },
    {
      path: '/how-it-works/',
      url: './pages/how-it-works.html'
    },
    {
      path: '/junk-cars-search/',
      url: './pages/junk-cars-search.html'
    },
    {
      path: '/login/',
      url: './pages/login.html'
    },
    {
      path: '/product-category/',
      url: './pages/product-category.html'
    },
    {
      path: '/product-single/',
      url: './pages/product-single.html',
      on: {
      pageInit: function (e, page) {
            displayProduct();
      },
      }
    },
    {
      path: '/register/',
      url: './pages/register.html'
    },
    {
      path: '/inquire/',
      url: './pages/inquiry.html',
      on : {
        pageInit: function (e, page) {
            doInquiry(localStorage.productID);
    }
    }
    },
    {
      path: '/searchresults/',
      url: './pages/search-results.html',
      on: {
      pageInit: function (e, page) {
            doSearch(localStorage.searchKeyword);
      },
      }
    },
    {
      path: '/detailedsearchresults/',
      url: './pages/detailed-search-results.html',
      on: {
      pageInit: function (e, page) {
            doSearchDetail();
      },
      }
    },
    {
      path: '/remember-password/',
      url: './pages/remember-password.html'
    },
    {
      path: '/sitemap/',
      url: './pages/sitemap.html'
    },
    {
      path: '/used-car-parts/',
      url: './pages/used-car-parts.html'
    },
    {
      path: '/users/:userId/',
      url: './pages/user.html',
    },
    {
      path: '/blog-read/',
      url: './pages/blog-read.html',
      on: {
      pageInit: function (e, page) {
            displayFullNews();
      },
      }
    },      
  {
    path: '/test/',
    url: './pages/test.html',
    on: {
    pageInit: function (e, page) {
          console.log("teh");
    },
    }
  },
  {
    path: '/main/',
    url: './pages/main.html',
  },  
  {
    path: '/form/',
    url: './pages/form.html',
  },
  // Page Loaders & Router
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/request-and-load.html',
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
