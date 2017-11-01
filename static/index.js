window.onload = function() {
    var Navigator = (function() {
      var navigationButton  = document.querySelector('.navbar-burger');
      var navigationList = document.querySelector('.navigation__list');
      var navigationLinks = document.querySelectorAll('.navigation__link');
      var navigationToggledClass = 'navigation__list--active';
      var body = document.querySelector('html');
      var scrollDisabledClass = 'scroll-disabled';
      return {
        initEventListeners: function() {
          navigationButton.addEventListener('click', this.toggleNavigationList);
          navigationLinks.forEach(function(link) {
            link.addEventListener('click', this.closeNavigationList);
          }.bind(this));
        },
        toggleNavigationList: function() {
          if (navigationList.classList.contains(navigationToggledClass)) {
            navigationList.classList.remove(navigationToggledClass);
            body.classList.remove(scrollDisabledClass);
          } else {
            navigationList.classList.add(navigationToggledClass);
            body.classList.add(scrollDisabledClass);
          }
        },
        closeNavigationList: function() {
          navigationList.classList.remove(navigationToggledClass);
          body.classList.remove(scrollDisabledClass);
          
        }
      }
    })();

    Navigator.initEventListeners();

}
