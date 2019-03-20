//获取数据  渲染页面  滚动条事件
(function () {
    var oLi = $('li');
    var num = 1;
    var flag = false;
    getData();
    function getData() {
        if (!flag) {
            flag = true;
            $.ajax({
                type: 'GET',
                url: 'http://localhost/waterFull/src/getPics.php?cPage=' + num,
                success: addDom,
                error: function () {
                    console.log('error');
                },
                beforeSend: function () {
                    $('.loading').show();
                }
            });
            num++;
        }

    };
    function addDom(data) {
        console.log('success');
        $('.loading').hide();
        var dataList = JSON.parse(data);
        if (dataList.length > 0) {
            dataList.forEach(function (ele, index) {
                var iDiv = $('<div class="item"></div>');
                var oImg = new Image();
                var oP = $('<p></p>');
                oP.text(ele.title);
                oImg.src = ele.preview;
                oImg.onload = function () {
                    iDiv.append(oImg).append(oP);
                    var index = getMinIndex();
                    console.log(index);
                    $(oLi[index]).append(iDiv);
                    //向最短的一列li添加item   getMinIndex
                }
            })
        }
        flag = false;
    };
    //获取到最短的li
    function getMinIndex() {
        var minH = parseInt($(oLi[0]).css('height'));
        var index = 0;
        for (var i = 1; i < oLi.length; i++) {
            var h = parseInt($(oLi[i]).css('height'));
            if (h < minH) {
                minH = h;
                index = i;
            }
        }
        return index;
    };


    $(window).scroll(function () {
        var scrollH = $(this).scrollTop();
        var clientH = $(window).height();
        var minLiH = parseInt($(oLi[getMinIndex()]).css('height'));
        if (scrollH + clientH >= minLiH) {
            getData();
        }
    });
})()