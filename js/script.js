$(document).ready(function(){
    /* ------------------------------------------
    데스크탑 gnb
    ------------------------------------------ */
    const header = $('#header');
    const oneDepth = $('#header .gnb > li');
    const twoDepth = oneDepth.children('.twoD');
    const thrBt = twoDepth.find('.thrBt');
    const gnbWrap = header.find('.gnbArea'); /* main menu */
    const gnbBg = header.children('.gnbBg'); /* sub menu */
    const leftArea = $('#header .leftArea');
    
    //메뉴 아래 삼각형 모양 표시
    oneDepth.each(function(idx, ele){
        $(this).on('mouseenter',function(){
            oneDepth.eq(idx).addClass('on');
        })
        $(this).on('mouseleave',function(){
            oneDepth.eq(idx).removeClass('on');
        })
    })
    
    $(gnbWrap).add(gnbBg).on("mouseenter",function(){
        console.log("마우스 들어감");
        gnbBg.stop().slideDown(300);
        leftArea.stop().fadeIn(300);
        twoDepth.stop().fadeIn(500);
        // //fadein effect
        // gnbBg.css('display','block');
        // gnbBg.css('visibility','visible');
        // gnbBg.stop().animate({opacity:1});
    })

    $(gnbWrap).add(gnbBg).on("mouseleave",function(){
        console.log("마우스 나감");
        
        gnbBg.stop().slideUp();
        leftArea.stop().fadeOut();
        twoDepth.stop().fadeOut();

        // //fadeout effect
        // gnbBg.stop().animate({opacity:0},function(){
        //     gnbBg.css('display','none');
        //     gnbBg.css('visibility','hidden');
        // });
    })

    // 3단계 메뉴 버튼
    thrBt.each(function(idx,ele){
        $(this).click(function(){
            $(this).toggleClass('on');
            $(this).next('.thrD').stop().slideToggle();

            /*
            if($(this).hasClass('on')){
                $(this).removeClass('on');
                $(this).next('.thrD').hide();
            }else{
                $(this).addClass('on');
                $(this).next('.thrD').show()
            }
            */
        })
    })
    
    //윈도우 스크롤되면
    $(window).scroll(function(){
        //250 : 영역이 시작되기 250 픽셀부터 보여주기
        let winScrollT = $(window).scrollTop() + 250;
        let winScrollT2 = $(window).scrollTop() + $('#footer').outerHeight(true) +200;
        let winScrollT3 = $(window).scrollTop() + $(window).height();

        let mCon1T = $('.mainCon1').offset().top;
        let mCon2T = $('.mainCon2').offset().top;
        let mCon3T = $('.mainCon3').offset().top;
        let footT = $('#footer').offset().top;
        
        console.log("scroll 위치",winScrollT);
        console.log("mainCon1 수직위치",mCon1T);
        // console.log("mainCon1 수직위치",mCon1T);
        // console.log("mainCon2 수직위치",mCon2T);
        // console.log("mainCon3 수직위치",mCon3T);
        // console.log("footer 수직위치",footT);
        console.log("푸터 높이",$('#footer').outerHeight(true));
        console.log("푸터 위치",$('#footer').offset().top);

        //스크롤 애니(순차적 표출:delay로 조정)
        if(winScrollT >= mCon1T && winScrollT <= mCon2T){
            $('.mainCon1 .mainTit').animate({top:0, opacity:1},600,'swing');
            $('.mainCon1 .mainTxt').delay(200).animate({top:0, opacity:1},600,'swing');
            $('.mainCon1 .mainCon1List').delay(400).animate({top:0, opacity:1},600,'swing');
        }else if(winScrollT >= mCon2T && winScrollT <= mCon3T){ //con2
            $('.mainCon2 .mainTit').animate({top:0, opacity:1},600,'swing');
            $('.mainCon2 .mainTxt').delay(200).animate({top:0, opacity:1},600,'swing');
            $('.mainCon2 .mainCon2List').delay(400).animate({top:0, opacity:1},600,'swing');
        }else if(winScrollT >= mCon3T && winScrollT <= footT){ //con3
            $('.mainCon3 .mainTit').animate({top:0, opacity:1},600,'swing');
            $('.mainCon3 .mainTxt').delay(200).animate({top:0, opacity:1},600,'swing');
            $('.mainCon3 .mainNews').delay(400).animate({top:0, opacity:1},600,'swing');
        }

        //헤더 고정
        if(winScrollT-250 > 100){
            $('#header').addClass('on');
        }else{
            $('#header').removeClass('on');
        }         
        
        //푸터가 보이기 시작한 위치부터 top버튼 보이기
        if($(window).scrollTop() + $(window).height() >= $("#footer").offset().top){
			$(".topBtn").css({"position":"absolute", "bottom":$("#footer").outerHeight(true)});
			$(".topBtn").fadeIn(500);
        }
            
        if(winScrollT3 >= footT){           
            $(".topBtn").css({"position":"absolute", "bottom":$("#footer").outerHeight()});
            $('.topBtn').fadeIn(500);
        }else{
            $(".topBtn").css({"position":"fixed", "bottom":0});
            $('.topBtn').fadeOut(500);
        }     
    })//스크롤 끝

    //전시 이미지 호버 시 배경 이미지 변경
    let mainConLI = $('.mainCon1List li');
    let mainCon1Bg = $('.mainCon1Bg > div');

    //stop:현재 애니 중지 후 다른 애니 실행-깜박임 현상 제거
    mainConLI.each(function(idx,ele){   
        $(this).hover(function(){            
            mainCon1Bg.eq(idx).stop().fadeIn(600);
        },function(){
            mainCon1Bg.eq(idx).stop().fadeOut(600);
        })
    })
    

    //topBtn 클릭하면 위로
    $('.topBtn').click(function(){
        $('html').animate({scrollTop:0},600);
    })

    /* ------------------------------------------
    모바일 gnb
    ------------------------------------------ */
    const mheader = $('.mHeader');
    const openBt = $('.mHeader .openBt'),
        mMArea = $('.mMenuArea'),
        closeBt = mMArea.find('.closeBt'),
        gnbArea = $('.gnbArea'),
        oneD = gnbArea.children('.oneD'),
        twoD = gnbArea.children('.twoD'),
        thrBtn = twoD.children('.thrBt'),
        thrD = twoD.children('.thrD');

         //openBt 클릭하면 mMArea 애니매니션 적용 {left: -100% => 0}
        openBt.click(function(){
            mMArea.animate({left :0},600)
        })        

        //closeBt 클릭하면 mMArea 애니매니션 적용 {left: 0 => -100%}
        closeBt.click(function(){
            mMArea.animate({'left' :'-100%'},600)
        })

         //oneD 클릭하면  twoD 닫기, oneD 'on' 클래스 제거
        //만약 twoD 보인다면 is(:visible)
        //부정! 
         //안보인다면 twoD를 나타나게
        oneD.click(function(){
            twoD.slideUp();
            oneD.removeClass('on');

            //two is visible?
            if(!$(this).next().is(':visible')){
                $(this).next().slideDown();
                $(this).addClass('on');
            }            
        })

        thrBtn.click(function(){
            $(this).next().slideToggle();
        })

})