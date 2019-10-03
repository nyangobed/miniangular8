$('li.ng-star-inserted').off('click').on('click', function (e) {
    var $activeDropdown = $(this).find('ul');
    if ($(this).hasClass('open')) {
        if ($activeDropdown.find('li').hasClass('submenu')) {
            $(this).removeClass('open').find('ul').slideUp();
            $activeDropdown.find('li').removeClass('submenu');
            $activeDropdown.off('click');
        }
    } else {
        $(this).addClass('open');
        $activeDropdown.css('display', 'block').find('li').addClass('submenu');
    }
});