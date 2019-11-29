var i = 0;
        var tagcache = new Array;
        function addtag() {

            if (i < 6) {
                if ($('#tags-input' + i).val() !== "") {

                    var cache = i
                    i = i + 1;
                    newtag[i] = `        
            <div id='addtags${i}' class='plustag'>
                <input id='tags-input${i}'  placeholder="标签">
                <div id='addtagbtn' onclick="addtag()">+</div>
                <div id='deletebtn' onclick="removetag(this.parentNode.id,${i})">-</div>
                
            </div>
            
            `



                    $('#addtags0').append(newtag[i])



                }
                else {


                    alert("TAG不能为空")
                }


            }
            else { alert("标签数量过多"); }
        }



        function removetag(id) {

            $('#' + id).remove();



        }
        var newArticle
        var newtag = new Array;
        var cachearray = new Array;


        function save() {
           
            function checkarray(value) {
                if (value !== "") { return value !== undefined }
                else alert("TAG不能为空")
            }

            var title = $("#title-input").val()
            var content = editor.txt.html();
            for (var p = 0; p <= i; p++) {
                cachearray[p] = $("#tags-input" + p).val()
                cachearray = cachearray.filter(checkarray);
            }

            if (title == "" || content == "") {
                alert("标题/内容不能为空")
            }
            else {
                newArticle = {
                    "title": title,
                    "content": content,
                    "hashtags": cachearray
                }
                
                $.ajax({
                    type: "POST",
                    async: false,
                    data: newArticle,
                    url: "http://127.0.0.1:8080/api/upload",
                    dataType: "text",
                    success: function (data) {
                        alert("发送成功");
                    },
                    error: function (err) {
                        alert(err)
                    }

                });

            }
        }