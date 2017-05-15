// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

var opts = {
  lines: 13, // The number of lines to draw
  length: 10, // The length of each line
  width: 4, // The line thickness
  radius: 11, // The radius of the inner circle
  rotate: 0, // The rotation offset
  color: '#000', // #rgb or #rrggbb
  speed: 0.6, // Rounds per second
  trail: 32, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};

function element_in_scroll(elem){
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function infinitescrolling() {
  if (element_in_scroll(".blogpostlist .post-preview:last")) {
    $(document).unbind('scroll');
    var target = $('#loader').get(0);
    var spinner = new Spinner(opts);
    spinner.spin(target);
    $.ajax({
      type: "POST",
      url: '/loadposts/',
      dataType: "json",
      data: {index_count:$('#current_index').text()}
    }).done(function( msg ) {
      $(".blogpostlist").append(msg.htmlstring);
      $('p#current_index').text(msg.index_count);
      spinner.stop();
      if (msg.count != 0) {
        $(document).scroll(function(e){
          //callback to the method to check if the user scrolled to the last element of your list/feed
          infinitescrolling();
        })
      }
    });
  };
}

function post(path, parameters) {
    var form = $('<form></form>');

    form.attr("method", "post");
    form.attr("action", path);

    $.each(parameters, function(key, value) {
        var field = $('<input></input>');

        field.attr("type", "hidden");
        field.attr("name", key);
        field.attr("value", value);

        form.append(field);
    });

    // The form needs to be a part of the document in
    // order for us to be able to submit it.
    $(document.body).append(form);
    form.submit();
}

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else if (currentTop > this.previousTop) {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }

    $(document).scroll(function(e){
      infinitescrolling();
    });

    $('#createpost').click(function(){
      var bg_url = $('.intro-header').css('background-image');
    // ^ Either "none" or url("...urlhere..")
      bg_url = /^url\((['"]?)(.*)\1\)$/.exec(bg_url);
      bg_url = bg_url ? bg_url[2] : ""; // If matched, retrieve url, otherwise ""
      post('/blogposts/',{blogtitle:$('#h1_title').text(),blogimage:bg_url,blogfulltext:$('#p_fulltext').text()})
    });
    // $('.navbar-custom').click(function(){alert('clicked navbar!');});
    // $('.editHTML').css('visibility','hidden');
    // $('#blogfulltextpreview').css('visibility','hidden');
    // $('.previewHTML').click(function(){
    //   $('#blogfulltext').css('visibility','hidden');
    //   $('#blogfulltextpreview').css('visibility','visible');
    //   $('#blogfulltextpreview').text($('#blogfulltext').val());
    //   this.css('visibility','hidden');
    //   $('.editHTML').css('visibility','visible');
    // });
    //
    // $('#editHTML').click(function(){
    //   $('#blogfulltext').css('visibility','hidden');
    //   $('#blogfulltextpreview').css('visibility','visible');
    //   //$('#blogfulltextpreview').innerHTML = $('#blogfulltext').value;
    //   this.css('visibility','hidden');
    //   $('#previewHTML').css('visibility','visible');
    // });
});
