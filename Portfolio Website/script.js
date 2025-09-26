$(document).ready(function(){
  // Smooth scroll for internal links
  $('a[href^="#"]').on('click', function(e){
    e.preventDefault();
    var target = $(this.hash);
    if(target.length){
      $('html, body').animate({ scrollTop: target.offset().top - 70 }, 600);
    }
  });

  // Fade-in sections
  $(window).on('scroll', function(){
    $('.section-fade').each(function(){
      var top = $(this).offset().top;
      var scroll = $(window).scrollTop() + $(window).height();
      if(scroll > top + 50){
        $(this).addClass('visible');
      }
    });
  });
});
