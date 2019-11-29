function backToTop() {
    window.scrollTo(0, 0)
}
$.ajax({
    type: "GET",
    url: "http://127.0.0.1:8080/api/cookie",

    success: function () {

        $('#loginspan').children().text('欢迎您，阿卡莎')
    }
});

function formDate(dateForm) {
    if (dateForm === "") {  //解决deteForm为空传1970-01-01 00:00:00
        return "";
    } else {
        var dateee = new Date(dateForm).toJSON();
        var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        return date;
    }
}

function strlen(str) {

    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    return len;
}

function addblock(dataS) {
    dataJ = JSON.parse(dataS);
    const Dlength = dataJ.length
    for (i = 0; i < Dlength; i++) {

        data = dataJ[i]


        let originnumber = strlen(data.content);
        let number = (originnumber / 1000).toFixed(2);
        let time = (originnumber / 1000).toFixed(0);
        let createdtime = formDate(data.createdtime);
        let updatedtime = formDate(data.updatedtime)
        $("#postarea").append(
            `<div class='frame postblock'>
    <div class='title'><p>${data.title}</p></div>
    <div class=info>
        <div class='infodiv'><span class='time'>${createdtime}</span>
            <span class='division'>|</span>
            <span class='time'>${updatedtime}</span>
            <span class='division'>|</span>
            <span class='tags'>${data.hashtags}</span></div>
        <div class='infodiv'><span class='numberofword'>字数：${number}k</span>
            <span class='division'>|</span>
            <span class='timeofread'>阅读时间：${time}分钟</span></div>
    </div>
    <div class='postarticle'>${data.content}
    </div>
    <div class='btn-show-article' onclick=window.location.href="/articleindex.html?PAGE=${data._id}">
        阅读全文 》
    </div>
    </div>`
        );

        if (location.href !== 'http://127.0.0.1:8080/') {
            var comment = new Array;
            comment = data.comment;

            const Clength = comment.length
            if (Clength !== 0) {

                for (var p = 0; p < Clength; p++) {
                    var cache = comment[p]

                    if (document.cookie=='login=eHV3ZW5mZWkxOTk3eHdmMTk5NzExMDE%3D'){

                        $("#postarea").append(`<div id='comment' class='frame'>
                        <div id='commentinfo'><span style="margin:0 300px 0 0">昵称:${cache.userid}</span><span style="margin:0 300px 0 0">邮箱:${cache.email}</span><span style="margin:0 300px 0 0">${cache._id}楼</span><span  class='btn-show-article'  style='margin-left:0;padding: 0 10px 0 10px;' onclick=deletecomment(${cache._id})>删除</span></div>
                        <div><p>${cache.content}</p></div>
                        </div>`)}
                    else{
                        $("#postarea").append(`<div id='comment' class='frame'>
                        <div id='commentinfo'><span style="margin:0 300px 0 0">昵称:${cache.userid}</span><span style="margin:0 300px 0 0">邮箱:${cache.email}</span><span style="margin:0 300px 0 0">${cache._id}楼</span></div>
                        <div><p>${cache.content}</p></div>
                        </div>`)
                    }
                }
            }
        }
    }
}

function save() {
    var cache = $("span:last").text();

    var testdata = cache.substring(1, 2)

    if (testdata == '楼') {

        cache = cache.substring(0, 1)
        cache = parseInt(cache) + 1
        if ($('#commentid').val() == '' || $('#commentemail').val() == '') { alert('昵称/邮箱不能为空') }
        else {

            var data = { id: url[1].toString(), comment: { _id: cache, userid: $('#commentid').val(), email: $('#commentemail').val(), content: editor.txt.html() } }

            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8080/api/writecomment",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (data) {

                    alert('评论成功')
                    window.location.reload()
                }
            });
        }
    }
    else {

        cache = '1';
        var data = { id: url[1].toString(), comment: { _id: cache, userid: $('#commentid').val(), email: $('#commentemail').val(), content: editor.txt.html() } }

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8080/api/writecomment",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data) {

                alert('评论成功')
                window.location.reload()
            }
        });
    }

}

function deletecomment(_id) {


    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8080/api/deletecomment",
        dataType: "text",
        data: { id: url[1].toString(), _id: _id },
        success: function (data) {
            alert('评论已删除')
            window.location.reload()
        }
    });

}



$.ajax({
    type: "GET",
    url: "http://127.0.0.1:8080/api/countarticle",
    dataType: "text",
    success: function (data) {
        $("#numberofarticles").html(data + '<br />日志');
    }
});
$.ajax({
    type: "GET",
    url: "http://127.0.0.1:8080/api/counttags",
    dataType: "text",
    success: function (data) {
        $("#indexspe").html(data + '<br />分类');
    }
});






function tags() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8080/api/tagsinit",
        success: function (data) {
            var length = data.length

            for (var i = 0; i < length; i++) {
                var cache = data.shift();
                $("#tagblock").append(
                    `
            <a id='tagdiv' href="/tagindex.html?PAGE=${cache}")>${cache}</a>

            `
                )

            }
        }
    });
}

function addloginbox() {

    $(".shadow").show();
    $('.addBox').show();
    $('body').css("overflow", "hidden")
    return 0;
}


function createcookie(key) {

    $.cookie('login', key, {
        expires: 7,
        path: '/',
        domain: '127.0.0.1',
        secure: false
    })
}
function login(cache) {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8080/api/login",
        dataType: "text",
        async: false,
        data: cache,
        success: function (data) {

            createcookie(data)
            window.location.reload()
        },
        error: function (data) {
            alert('账号密码错误')
        }
    });
}


function closeloginbox() {
    $('body').css("overflow", "scroll")
    $(".shadow").hide();
    $('.addBox').hide();
}
function loginboxlogin() {
    var cache = { account: $("#account").val(), password: $("#password").val() }

    login(cache)

    closeloginbox();
}
