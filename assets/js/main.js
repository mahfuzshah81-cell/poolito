(function ($) {
  "use strict";


  /*---------- 01. On Load Function ----------*/
  $(window).on('load', function () {
    $('.preloader').fadeOut();
  });



  /*---------- 02. Preloader ----------*/
  if ($('.preloader').length > 0) {
    $('.preloaderCls').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.preloader').css('display', 'none');
      })
    });
  };



  /*---------- 03. Mobile Menu Active ----------*/
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend({
      menuToggleBtn: '.vs-menu-toggle',
      bodyToggleClass: 'vs-body-visible',
      subMenuClass: 'vs-submenu',
      subMenuParent: 'vs-item-has-children',
      subMenuParentToggle: 'vs-active',
      meanExpandClass: 'vs-mean-expand',
      appendElement: '<span class="vs-mean-expand"></span>',
      subMenuToggleClass: 'vs-open',
      toggleSpeed: 400,
    }, options);

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = '.' + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css('display', 'none')
            $(this).parent().removeClass(opt.subMenuParentToggle);
          };
        });
      };

      // Class Set Up for every submenu
      menu.find('li').each(function () {
        var submenu = $(this).find('ul');
        submenu.addClass(opt.subMenuClass);
        submenu.css('display', 'none');
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev('a').append(opt.appendElement);
        submenu.next('a').append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next('ul').length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next('ul').slideToggle(opt.toggleSpeed);
          $($element).next('ul').toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev('ul').length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev('ul').slideToggle(opt.toggleSpeed);
          $($element).prev('ul').toggleClass(opt.subMenuToggleClass);
        };
      };

      // Submenu toggle Button
      var expandToggler = '.' + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on('click', function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on('click', function () {
          menuToggle();
        })
      })

      // Hide Menu On out side click
      menu.on('click', function (e) {
        e.stopPropagation();
        menuToggle()
      })

      // Stop Hide full menu on menu click
      menu.find('div').on('click', function (e) {
        e.stopPropagation();
      });

    });
  };

  $('.vs-menu-wrapper').vsmobilemenu();


  /*---------- 04. Sticky fix ----------*/
  var lastScrollTop = '';
  var scrollToTopBtn = '.scrollToTop';

  function stickyMenu($targetMenu, $toggleClass, $parentClass) {
    var st = $(window).scrollTop();
    var height = $targetMenu.css('height');
    $targetMenu.parent().css('min-height', height);
    if ($(window).scrollTop() > 800) {
      $targetMenu.parent().addClass($parentClass);

      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);
      } else {
        $targetMenu.addClass($toggleClass);
      };
    } else {
      $targetMenu.parent().css('min-height', '').removeClass($parentClass);
      $targetMenu.removeClass($toggleClass);
    };
    lastScrollTop = st;
  };
  $(window).on("scroll", function () {
    stickyMenu($('.sticky-active'), "active", "will-sticky");
    if ($(this).scrollTop() > 500) {
      $(scrollToTopBtn).addClass('show');
    } else {
      $(scrollToTopBtn).removeClass('show');
    }
  });


  /*---------- 05. Scroll To Top ----------*/
  $(scrollToTopBtn).each(function () {
    $(this).on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, lastScrollTop / 3);
      return false;
    });
  })


  /*---------- 06.Set Background Image ----------*/
  if ($('[data-bg-src]').length > 0) {
    $('[data-bg-src]').each(function () {
      var src = $(this).attr('data-bg-src');
      $(this).css('background-image', 'url(' + src + ')');
      $(this).removeAttr('data-bg-src').addClass('background-image');
    });
  };

  /*----------- 08. Global Slider ----------*/
  $('.vs-carousel').each(function () {
    var asSlide = $(this);

    // Collect Data 
    function d(data) {
      return asSlide.data(data);
    }

    // Custom Arrow Button
    var prevButton = '<button type="button" class="slick-prev"><i class="' + d('prev-arrow') + '"></i></button>',
      nextButton = '<button type="button" class="slick-next"><i class="' + d('next-arrow') + '"></i></button>';

    // Function For Custom Arrow Btn 
    $('[data-slick-next]').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault()
        $($(this).data('slick-next')).slick('slickNext');
      })
    })

    $('[data-slick-prev]').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault()
        $($(this).data('slick-prev')).slick('slickPrev');
      })
    })

    // Check for arrow wrapper
    if (d('arrows') == true) {
      if (!asSlide.closest('.arrow-wrap').length) {
        asSlide.closest('.container').parent().addClass('arrow-wrap')
      }
    }

    asSlide.slick({
      dots: (d('dots') ? true : false),
      fade: (d('fade') ? true : false),
      arrows: (d('arrows') ? true : false),
      speed: (d('speed') ? d('speed') : 1000),
      asNavFor: (d('asnavfor') ? d('asnavfor') : false),
      autoplay: ((d('autoplay') == false) ? false : true),
      infinite: ((d('infinite') == false) ? false : true),
      slidesToShow: (d('slide-show') ? d('slide-show') : 1),
      adaptiveHeight: (d('adaptive-height') ? true : false),
      centerMode: (d('center-mode') ? true : false),
      autoplaySpeed: (d('autoplay-speed') ? d('autoplay-speed') : 8000),
      centerPadding: (d('center-padding') ? d('center-padding') : '0'),
      focusOnSelect: (d('focuson-select') ? true : false),
      pauseOnFocus: (d('pauseon-focus') ? true : false),
      pauseOnHover: (d('pauseon-hover') ? true : false),
      variableWidth: (d('variable-width') ? true : false),
      vertical: (d('vertical') ? true : false),
      verticalSwiping: (d('vertical') ? true : false),
      prevArrow: (d('prev-arrow') ? prevButton : '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></i></button>'),
      nextArrow: (d('next-arrow') ? nextButton : '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>'),
      rtl: ($('html').attr('dir') == 'rtl') ? true : false,
      responsive: [{
        breakpoint: 1600,
        settings: {
          arrows: (d('xl-arrows') ? true : false),
          dots: (d('xl-dots') ? true : false),
          slidesToShow: (d('xl-slide-show') ? d('xl-slide-show') : d('slide-show')),
          centerMode: (d('xl-center-mode') ? true : false),
          centerPadding: 0
        }
      }, {
        breakpoint: 1400,
        settings: {
          arrows: (d('ml-arrows') ? true : false),
          dots: (d('ml-dots') ? true : false),
          slidesToShow: (d('ml-slide-show') ? d('ml-slide-show') : d('slide-show')),
          centerMode: (d('ml-center-mode') ? true : false),
          centerPadding: 0
        }
      }, {
        breakpoint: 1200,
        settings: {
          arrows: (d('lg-arrows') ? true : false),
          dots: (d('lg-dots') ? true : false),
          slidesToShow: (d('lg-slide-show') ? d('lg-slide-show') : d('slide-show')),
          centerMode: (d('lg-center-mode') ? d('lg-center-mode') : false),
          centerPadding: 0
        }
      }, {
        breakpoint: 992,
        settings: {
          arrows: (d('md-arrows') ? true : false),
          dots: (d('md-dots') ? true : false),
          slidesToShow: (d('md-slide-show') ? d('md-slide-show') : 1),
          centerMode: (d('md-center-mode') ? d('md-center-mode') : false),
          centerPadding: 0
        }
      }, {
        breakpoint: 767,
        settings: {
          arrows: (d('sm-arrows') ? true : false),
          dots: (d('sm-dots') ? true : false),
          slidesToShow: (d('sm-slide-show') ? d('sm-slide-show') : 1),
          centerMode: (d('sm-center-mode') ? d('sm-center-mode') : false),
          centerPadding: 0
        }
      }, {
        breakpoint: 576,
        settings: {
          arrows: (d('xs-arrows') ? true : false),
          dots: (d('xs-dots') ? true : false),
          slidesToShow: (d('xs-slide-show') ? d('xs-slide-show') : 1),
          centerMode: (d('xs-center-mode') ? d('xs-center-mode') : false),
          centerPadding: 0
        }
      }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });

  });



  // cta

  $(".slider-custom").slick({

    autoplay: true,
    dots: true,
    arrows:false,
    customPaging : function(slider, i) {
        var thumb = $(slider.$slides[i]).data('thumb');
        return '<a><img src="'+thumb+'"></a>';
    },

    responsive: [{ 
        breakpoint: 500,
        settings: {
            dots: false,
            arrows: false,
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 2
        } 
    }]
});




//smooth scrolling
document.querySelectorAll('nav a').forEach(anchor => {
anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
});
});



 // isotop
 var gridfilter = $('.filter-item1');
 if (gridfilter.length) {
   $('.filter-item1').imagesLoaded(function () {
     $('.filter-menu-active').on('click', 'button', function () {
       var filterValue = $(this).attr('data-filter');
       $grid.isotope({
         filter: filterValue
       });
     });
     var $grid = $('.filter-item1').isotope({
       itemSelector: '.filter-item',
       percentPosition: true,
       masonry: {
         columnWidth: '.filter-item',
       }
     });
   });
 }

 $('.filter-menu button').on('click', function (event) {
   event.preventDefault();
   if (!$(this).hasClass('active')) {
     // If the clicked button does not have the 'active' class, we add it to the clicked button and remove it from its siblings.
     $(this).addClass('active').siblings('.active').removeClass('active');
   }
 });
})(jQuery);

