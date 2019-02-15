// cafe24 FITCO WebApp module version 1.0
// 2019 Feb 15th

// Top, Bottom 분류하는 변수
var bigCategory = "", midCategory = "";

// 브라우저 창이 정상적으로 열릴 경우 실행되는 함수

var fitco = function () {
    // 상품 상세정보에 추가할 서비스 소개 이미지&모듈
    $("#prdDetail > div > p").after("<img src='https://jgyuity.cafe24.com/cafe24/jpg/demo_image2.jpg'>");
    if(bigCategory.includes('Bottoms') && midCategory.includes('Pants')) { // 바지일 경우
        $("#prdDetail > div > p").after("<div id='myFrame'><iframe class='size_compare_iframe' src='https://jgyuity.cafe24.com/cafe24/html/sizeCompareBottom.html' width='100%' height='920px'></iframe></div>");
        $("#prdDetail > div > p").after("<img src='https://jgyuity.cafe24.com/cafe24/jpg/pants_demo.jpg'>");
    } else if(midCategory.includes('Shirts')) { // 셔츠일 경우
        $("#prdDetail > div > p").after("<div id='myFrame'><iframe class='size_compare_iframe' src='https://jgyuity.cafe24.com/cafe24/html/sizeCompare.html' width='100%' height='850px'></iframe></div>");
        $("#prdDetail > div > p").after("<img src='https://jgyuity.cafe24.com/cafe24/jpg/shirts_demo.jpg'>");
    } else if(bigCategory.includes('Tops')) { // 니트일 경우
        $("#prdDetail > div > p").after("<div id='myFrame'><iframe class='size_compare_iframe' src='https://jgyuity.cafe24.com/cafe24/html/sizeCompare.html' width='100%' height='850px'></iframe></div>");
        $("#prdDetail > div > p").after("<img src='https://jgyuity.cafe24.com/cafe24/jpg/knit_demo.jpg'>");
    }
    $("#prdDetail > div > p").after("<img src='https://jgyuity.cafe24.com/cafe24/jpg/demo_image1.jpg'>");
};

if (document.readyState == 'complete') {
    try {
        bigCategory = $(".xans-product-headcategory li")[1].innerText; // Tops,Bottoms,Outerwear 구분
        midCategory = $(".xans-product-headcategory li")[2].innerText; // Shirts,Tee,Pants,Skirts ... 구분
    } catch (e) {
        // 모바일 header 이미지 대응
        // $("#topArea div h1").html('<a href="/"><img src="https://jgyuity.cafe24.com/cafe24/jpg/page_top.jpg" width="100%" height="100%">');
        var tmp = $("#contents div h1")[0].innerText;
        if(tmp.includes('니트')) {
            bigCategory = "Tops";
        } else if(tmp.includes('셔츠')) {
            midCategory = "Shirts";
        } else if(tmp.includes('바지')) {
            bigCategory = "Bottoms";
            midCategory = "Pants"
        }
    }
    fitco();
} else {
    console.log(onmessageerror);
    window.addEventListener('load', fitco);
}

// jQuery, Bootstrap 3 cdn 추가
document.querySelector('meta').setAttribute('name','viewport');
document.querySelector('meta').setAttribute('content','width=device-width, initial-scale=1.0');
$('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">');
$('head').append('<link rel="stylesheet" href="https://jgyuity.cafe24.com/cafe24/css/style.css">');
$('body').append('<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8" crossorigin="anonymous"></script>')
$('body').append('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>');
