var mall_id = ""
var url = "";
var access_token = "";
var script_no = "";
$(document).ready(function() {
    // 앱이 이미 설치되었는지 한 번 체크 하고 설치 되었으면 script_no 불러옴

    var urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('user_id') !== null) {
            var user_id = urlParams.get('user_id');
            codeRequest(user_id);
            // console.log(url);
            location.href = url;                
        } else if(urlParams.get('code') !== null) {
            var code = urlParams.get('code');
            tokenRequest(code);
        }
})

$(function() {
    $('#toggle-event').change(function() {
        // console.log($(this).prop('checked'));
        if($(this).prop('checked')) {
            $('span#activate').html('활성화');
            scriptAdd(access_token);
        } else {
            $('span#activate').html('비활성화');
            scriptDelete(access_token, script_no);
        }
    });
});

var sendToServer = function (tf) {
    // 관리자 페이지에서 서버로 mall_id, activated 값 전송
    var activated = 0;
    if(tf) {
        activated = 1;
    }
    // console.log('toggle mall_id : '+mall_id);
    // console.log('toggle script_no : '+script_no);
    // console.log('toggle activated : '+activated);
    $.ajax ({
        type: 'POST',
        contentType: "application/x-www-form-urlencoded",
        url: 'https://tomorrancetestserver.azurewebsites.net/web/activateJavascriptModule',
        data: {
            mall_id: mall_id,
            scripttag: script_no,
            activated: activated
        },
        success: function (res) {
            // console.log(res);
        }
    })
}

var codeRequest = function (user_id) {
    mall_id = user_id;
    var auth_code_receive_url = 'https://jgyuity.cafe24.com/fitco/html/fitcoManager.html';
    var client_id = 'IdZJS2JTKhxllIZnMpOGbA';
    var scope = 'mall.read_application,mall.write_application,mall.read_product,mall.read_category,mall.read_store';
    url = 'https://'+mall_id+'.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id='+client_id+'&redirect_uri='+auth_code_receive_url+'&scope='+scope;
    localStorage.setItem('mall_id',mall_id);
}

var tokenRequest = function (code) {
    mall_id = localStorage.getItem('mall_id');

    // console.log('code : '+code);
    // console.log('mall_id : '+mall_id);
    $.ajax({
        type: 'POST',
        data: 'code='+code+'&mall_id='+mall_id,
        url: 'https://jgyuity.cafe24.com/fitco/php/token_request.php',
        success: function(res) {
            access_token = res;
            scriptAdd(access_token);
        },
        error: function(err) {
            // console.log(err);
        }
    });
}

var scriptAdd = function (access_token) {
    // 가져와야 하는 변수 access_token, mall_id
    // console.log('access_token : '+access_token);
    $.ajax({
        type: 'POST',
        data: 'access_token='+access_token+'&mall_id='+mall_id,
        url: 'https://jgyuity.cafe24.com/fitco/php/admin_script_add.php',
        success: function(res) {
            // console.log(res);
            // console.log('script_no: '+res);
            script_no = res;
            sendToServer(true);
        },
        error: function(err) {
            // console.log(err);
        }
    });
}

var scriptDelete = function (access_token, script_no) {
    mall_id = localStorage.getItem('mall_id');
    // console.log('access_token: '+access_token);
    // console.log('script_no: '+script_no);
    $.ajax({
        type: 'POST',
        data: 'access_token='+access_token+'&mall_id='+mall_id+'&script_no='+script_no,
        url: 'https://jgyuity.cafe24.com/fitco/php/admin_script_delete.php',
        success: function(res) {
            // console.log(res);
            sendToServer(false);
        },
        error: function(err) {
            // console.log(err);
        }
    })
}