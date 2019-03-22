// cafe24 FITCO WebApp module version 1.0
// 2019 Feb 25th

// Top, Bottom 분류하는 변수
var bigCategory = "", midCategory = "";

// 브라우저 창이 정상적으로 열릴 경우 실행되는 함수

var fitco = function () {
    // 상품 상세정보에 추가할 서비스 소개 이미지&모듈
    if(bigCategory.includes('Bottoms')) { // 하의일 경우
        $("#prdDetail > div:last-child").after("<div id='myFrame'><iframe class='size_compare_iframe bottom' src='https://jgyuity.cafe24.com/fitco/sizeCompare/sizeCompareBottom.html' width='100%'></iframe></div>");
    } else if(bigCategory.includes('Tops') || bigCategory.includes('Outer')) { // 상의일 경우
        console.log('It works');
        $("#prdDetail > div:last-child").after("<div id='myFrame'><iframe class='size_compare_iframe top' src='https://jgyuity.cafe24.com/fitco/sizeCompare/sizeCompareTop.html' width='100%'></iframe></div>");
    }
};

var getMeta = function() {
    var metas = document.getElementsByTagName('meta');
    for(var i=0; i<metas.length; i++) {
        if(metas[i].getAttribute('name') === 'keywords') {
            console.log(metas[i].getAttribute('content'));
            return metas[i].getAttribute('content');
        }
    }
    return '';
}

if (document.readyState == 'complete') {
    try {
        bigCategory = $(".xans-product-headcategory li")[1].innerText; // Tops,Bottoms,Outerwear 구분
        //console.log('bigCategory: '+bigCategory);
    } catch (e) {
        console.log(e);
        var tmp = getMeta();
        //console.log(tmp);
        if(tmp.includes('Tops') || tmp.includes('Shirts') || tmp.includes('Outer')) {
            bigCategory = "Tops";
        } else if(tmp.includes('Bottoms') || tmp.includes('Pants')) {
            bigCategory = "Bottoms";
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
$('head').append('<link rel="stylesheet" href="https://jgyuity.cafe24.com/fitco/css/style.css">');
$('body').append('<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8" crossorigin="anonymous"></script>')
$('body').append('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>');
