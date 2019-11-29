
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8080/api/tagsinit",
        success: function (data) {

        }
    });

    var page = 0;
        var nextPageCache;
        getNextPage();

        $(document).ready(function () {
            $(".btn_click").click(function () {
                //                alert("hello");
                $(".box_bg").fadeIn(100);
                $(".box_lg").slideDown(200);
            });
            $(".close").click(function () {
                $(".box_bg").fadeOut(100);
                $(".box_lg").hide(100);
            })
        })



        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8080/api/sortarticle",
            dataType: "text",
            data: { "page": page },
            success: function (data1) {
                
                addblock(data1)

            }
        });
        function getNextPage() {

            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8080/api/sortarticle",
                dataType: "text",
                async: false,
                data: { "page": page },
                success: function (data1) {

                    nextPageCache = data1;
                    page = page + 1

                }
            });
        }

 
        $(window).scroll(function () {
            
            var a = $('#postarea')[0].lastChild.offsetTop;

            if (a - $(window).scrollTop() < 500) {
                



                addblock(nextPageCache)

                getNextPage();
            }

        })





 