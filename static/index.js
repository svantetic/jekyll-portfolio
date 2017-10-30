window.onload = function() {
    var Navigator = (function() {
      var navigationButton  = document.querySelector('.navbar-burger');
      var navigationList = document.querySelector('.navigation__list');
      var navigationLinks = document.querySelectorAll('.navigation__link');
      var navigationToggledClass = 'navigation__list--active';
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
          } else navigationList.classList.add(navigationToggledClass);
        },
        closeNavigationList: function() {
          navigationList.classList.remove(navigationToggledClass);
          console.log('closing navigatin list');
        }
      }
    })();

    Navigator.initEventListeners();

    // navigationButton.addEventListener('click', function(event) {
    //   if (navigationList.classList.contains(navigationToggleClass)) {
    //     navigationList.classList.remove(navigationToggleClass);
    //   } else navigationList.classList.add(navigationToggleClass);
    // })
}
