var url = window.location.search;
url = url.split('=')





$.ajax({
    type: "POST",
    url: "http://127.0.0.1:8080/api/findarticle",
    dataType: "text",
    data: { key: url[1] },
    success: function (data1) {


        addblock(data1)
        $("#postarea").append(`   
        <div  class='frame' style='margin:2px 0 0 0'>        
         <div>
        <label>昵称：</label><input id='commentid' placeholder="在这里输入您的昵称" />
        <label>邮箱：</label><input id='commentemail' placeholder="在这里输入您的邮箱" />
    </div>
    <div id="editor">
        <p>在这里输入评论</p>
    </div>

    <!-- 注意， 只需要引用 JS，无需引用任何 CSS ！！！-->
    <script type="text/javascript" src="node_modules/wangeditor/release/wangEditor.min.js"></script>
    <script type="text/javascript">
        var E = window.wangEditor
        var editor = new E('#editor')
        // editor.txt.html('<p>在这里输入评论</p>')
        editor.customConfig.showLinkImg = false
        editor.customConfig.uploadImgServer = '/api/uploadimg'
        editor.create()

    </script>
                <div class='btn-show-article' id='btn-save-article' onclick='save()'>
                        发送 》
                    </div></div>`)

    }
})

