window.refreshMenu = function () {
    $('.collapse-sidebar').click(function () {
        $app = $('.appWrapper');
        if ($app.hasClass('sidebar-sm')) {
            $app.removeClass('sidebar-sm').addClass('sidebar-xs');
        } else if ($app.hasClass('sidebar-xs')) {
            $app.removeClass('sidebar-xs');
        } else {
            $app.addClass('sidebar-sm');
        }

        $app.removeClass('sidebar-sm-forced sidebar-xs-forced');
        $app.parent().removeClass('sidebar-sm sidebar-xs');
        MINOVATE.navbar.removeRipple;
    });


    $navigation = $('.navigation-ver');
    $dropdowns = $navigation.find('ul').parent('li');
    $app = $('.appWrapper');
    $a = $dropdowns.children('a');
    console.debug("Found links", $a);
    var links = $(".has-perm");
    console.debug("Found Links", links);    

    $($a, "#sidebar-wrap").click(function () {
        console.debug("Link selected...");
    });
    $($a, "#sidebar-wrap").on('click', function (event) {
        console.debug("Processing sidebar menu...");
        if ($app.hasClass('sidebar-sm') || $app.hasClass('sidebar-xs') || $app.hasClass('hz-menu')) {
            return false;
        }

        var $this = $(this),
                $parent = $this.parent('li'),
                $openSubmenu = $('.submenu.open');

        if (!$parent.hasClass('submenu')) {
            $dropdowns.not($parent).removeClass('open').find('ul').slideUp();
        }

        $openSubmenu.not($this.parents('.submenu')).removeClass('open').find('ul').slideUp();
        $parent.toggleClass('open').find('>ul').stop().slideToggle();
    });
};




