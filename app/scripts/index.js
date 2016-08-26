import Barba from 'barba.js';

document.addEventListener("DOMContentLoaded", function() {
    var FadeTransition = Barba.BaseTransition.extend({
      start: function() {
        Promise
          .all([this.newContainerLoading, this.fadeOut()])
          .then(this.fadeIn.bind(this));
      },

      fadeOut: function() {
        this.oldContainer.classList.toggle('fade-out');
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
               resolve();
           }, 500);
        });
      },

      fadeIn: function() {
        this.newContainer.classList.toggle('fade-in');
        this.done();
      }
    });

    Barba.Pjax.getTransition = function() {
      return FadeTransition;
    };

    Barba.Pjax.start();

    console.log('App started');
});
