
    var url =window.location.search;
    url= url.split('=')
    $('#postarea').append(`<div class='frame'><p>标签${url[1]}的搜索结果</p></div>`)
    
  
        
        var result = new Array

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8080/api/findtag",
            dataType: "text",
            data:{key:url[1]},
            success: function (data1) {
                console.log(data1)
                addblock(data1)

            }
        })