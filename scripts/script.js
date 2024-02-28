(function () {
    //nav 스크립트
    $(".nav_links ul li").hover(function () {
        $(this).find(".sub_nav").stop().slideDown(500);
    }, function(){
        $(this).find(".sub_nav").stop().slideUp(500);
    });



    // https://westzero.tistory.com/112
    // 메인페이지의 자기소개 글자 스크립트
    String.prototype.toKorChars = function () {
        var cCho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
            cJung = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'],
            cJong = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'], cho, jung, jong;
        var str = this,
            cnt = str.length,
            chars = [],
            cCode;
        for (var i = 0; i < cnt; i++) {
            cCode = str.charCodeAt(i);
            if (cCode == 32) {
                chars.push(" ");
                continue;
            } // 한글이 아닌 경우 
            if (cCode < 0xAC00 || cCode > 0xD7A3) {
                chars.push(str.charAt(i)); continue;
            }
            cCode = str.charCodeAt(i) - 0xAC00;

            jong = cCode % 28;
            // 종성 
            jung = ((cCode - jong) / 28) % 21

            // 중성 
            cho = (((cCode - jong) / 28) - jung) / 21
            // 초성 

            //기본 코드 테스트가 ㅌㅔㅅ-ㅌ- 형식으로 저장됨 
            // chars.push(cCho[cho], cJung[jung]); 
            // if (cJong[jong] !== '') { 
            //     chars.push(cJong[jong]); 
            //     } 


            //  테스트라는 문장이 있으면 ㅌ테ㅅ스ㅌ트 형식으로 저장되도록함 (타이핑을 위해서)
            chars.push(cCho[cho]);
            chars.push(String.fromCharCode(44032 + (cho * 588) + (jung * 28)));
            if (cJong[jong] !== '') {
                chars.push(String.fromCharCode(44032 + (cho * 588) + (jung * 28) + jong));
            }

        }

        return chars;
    }


    //타이핑할 문장
    var result1 = "안녕하십니까,";
    var result2 = "신입 디자이너 황승재 입니다.";
    var typeing1 = [], typeing2 = [];;
    result1 = result1.split(''); // 한글자씩자름
    result2 = result2.split(''); // 한글자씩자름

    //각글자 초성,중성,종성으로 나눔
    for (var i = 0; i < result1.length; i++) {
        typeing1[i] = result1[i].toKorChars();
    }
    for (var i = 0; i < result2.length; i++) {
        typeing2[i] = result2[i].toKorChars();
    }

    //출력할 엘리먼트요소 가져옴 
    var resultDiv1 = document.getElementsByClassName("result1")[0];
    var resultDiv2 = document.getElementsByClassName("result2")[0];

    //
    var text = "";
    var i = 0;
    var j = 0;

    //총글자수
    var imax1 = typeing1.length;
    var imax2 = typeing2.length;

    //setInterval을 이용해 반복적으로 출력 
    var inter = setInterval(typi, 150);
    var inter2;


    function typi() {
        //글자수만큼 반복후 종료 
        resultDiv1.classList.add("cursor");
        if (i <= imax1 - 1) {
            //각 글자가 초성 중성 종성 순서대로 추가되도록 
            var jmax1 = typeing1[i].length;
            resultDiv1.innerHTML = text + typeing1[i][j];
            j++;
            if (j == jmax1) {
                text += typeing1[i][j - 1];//초성중성종성 순서대로 출력된 글자는 저장 ( 다음 글자와 이어붙이기 위해서 )
                i++;
                j = 0;
            }
        } else {
            clearInterval(inter);
            text = "";
            i = 0;
            j = 0;
            setTimeout(function () {
                resultDiv1.classList.remove("cursor");
                setTimeout(function () {
                    resultDiv2.classList.add("cursor");
                    setTimeout(function () {
                        inter2 = setInterval(typi2, 150);
                    }, 400);
                }, 300);
            }, 400);
        }
    }

    function typi2() {
        //글자수만큼 반복후 종료 

        if (i <= imax2 - 1) {
            //각 글자가 초성 중성 종성 순서대로 추가되도록 
            var jmax2 = typeing2[i].length;
            resultDiv2.innerHTML = text + typeing2[i][j];
            j++;
            if (j == jmax2) {
                text += typeing2[i][j - 1];//초성중성종성 순서대로 출력된 글자는 저장 ( 다음 글자와 이어붙이기 위해서 )
                i++;
                j = 0;
            }
        } else {
            clearInterval(inter);
        }
    }


    // ipad page image hover 시 해당 이름 show
    var drawImgBtn1 = $(".ipad_goods_1 .top img:nth-child(1)");
    var drawImgBtn2 = $(".ipad_goods_1 .top img:nth-child(3)");
    var drawImgBtn3 = $(".ipad_goods_1 .mid img:not(.name)");
    var drawImgBtn4 = $(".ipad_goods_1 .bottom img:not(.name)");
    var drawImgName1 = $(".ipad_goods_1 .top img:nth-child(2)");
    var drawImgName2 = $(".ipad_goods_1 .top img:nth-child(4)");
    var drawImgName3 = $(".ipad_goods_1 .mid img:nth-child(2)");
    var drawImgName4 = $(".ipad_goods_1 .bottom img:nth-child(4)");
        

    drawImgBtn1.hover(function(){
        drawImgName1.css({"opacity" : 1});
    }, function(){
        drawImgName1.css({"opacity" : 0});
    });
    drawImgBtn2.hover(function(){
        drawImgName2.css({"opacity" : 1});
    }, function(){
        drawImgName2.css({"opacity" : 0});
    });
    drawImgBtn3.hover(function(){
        drawImgName3.css({"opacity" : 1});
    }, function(){
        drawImgName3.css({"opacity" : 0});
    });
    drawImgBtn4.hover(function(){
        drawImgName4.css({"opacity" : 1});
    }, function(){
        drawImgName4.css({"opacity" : 0});
    });


    var drawImgTop = $(".ipad_goods_2 .top img");
    var drawImgMid = $(".ipad_goods_2 .mid img");
    var drawImgBottom = $(".ipad_goods_2 .bottom img");

    drawImgTop.hover(function(){
        $(".ipad_goods_2 .top .name").css({"opacity" : 1});
    }, function(){
        $(".ipad_goods_2 .top .name").css({"opacity" : 0});
    });
    drawImgMid.hover(function(){
        $(".ipad_goods_2 .mid .name").css({"opacity" : 1});
    }, function(){
        $(".ipad_goods_2 .mid .name").css({"opacity" : 0});
    });
    drawImgBottom.hover(function(){
        $(".ipad_goods_2 .bottom .name").css({"opacity" : 1});
    }, function(){
        $(".ipad_goods_2 .bottom .name").css({"opacity" : 0});
    });


    // 클릭 시 부드러운 이동
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
    });


})(jQuery);