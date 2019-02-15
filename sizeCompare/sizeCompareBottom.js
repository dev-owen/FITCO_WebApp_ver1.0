var size = {
    // input_size는 내가 직접 입력한 사이즈
    "input_size" : {
        "crotch": "",
        "waist": "",
        "midThigh": "",
        "peach": "",
        "legLength": ""
    },
    // target_size는 내가 선택한(파란색) 사이즈
    "target_size" : {
        "crotch": "",
        "waist": "",
        "midThigh": "",
        "peach": "",
        "legLength": ""
    },
    // 사이즈가 큰지 작은지 string 값
    "size_tf" : {
        "crotch": "",
        "waist": "",
        "midThigh": "",
        "peach": "",
        "legLength": ""
    }
}

// 페이지 렌더링이 완료되면 실행되는 함수
$(document).ready(function () {

    $("tr.size_click").click(function () {
        $("tr.size_click").removeClass("selected_size");
        $("tr.size_click > td:first-child > img").attr('src',"./img/ok_path.png");
        $(this).addClass("selected_size");
        $(this).find(">:first-child > img").attr('src',"./img/ok_path_selected.png");
        $("#size_name").text($(this).find("td.size_name").text());
        var i = 2, j = 3;
        for(var part in size.target_size) {
            size.target_size[part] = $(this).find("td")[i].innerText;
            i++;
        }
        // 내 옷이 선택한 옷보다 큰지 작은지 판단(일단 지금은 놔두지만 너무 거지같다.. 빠른 시일 내에 고치자)
        if(Number(size.target_size.crotch)-Number($("#crotch_size").val()) >= 0) { size.size_tf.crotch = "큼"} else { size.size_tf.crotch = "작음"}
        if(Number(size.target_size.waist)-Number($("#waist_size").val()) >= 0) { size.size_tf.waist = "큼"} else { size.size_tf.waist = "작음" }
        if(Number(size.target_size.midThigh)-Number($("#midThigh_size").val()) >= 0) { size.size_tf.midThigh = "큼"} else { size.size_tf.midThigh = "작음"}
        if(Number(size.target_size.peach)-Number($("#peach_size").val()) >= 0) { size.size_tf.peach = "큼"} else { size.size_tf.peach = "작음"}
        if(Number(size.target_size.legLength)-Number($("#legLength_size").val()) >= 0) { size.size_tf.legLength = "큼"} else { size.size_tf.legLength = "작음"}
        // 오차값 계산 후 출력
        for(var part in size.target_size) {
            if(size.input_size[part] != 0) {
                $("tfoot > tr.error_value > td:nth-child(" + j + ")").text(Math.abs((Number(size.target_size[part])-Number(size.input_size[part])).toFixed(1))+"cm "+size.size_tf[part]);
            }
            j++;
        }
    });
});

// '확인' 버튼을 눌렀을 때 실행되는 함수 (여기도 너무 거지같다... 확장성 생각하면 빠른 시일 내에 고쳐야 한다.)
var sizeConfirm = function () {
    var crotch_input = Number(Number($("#crotch_size").val()).toFixed(1));
    if(Number(size.target_size.crotch)-crotch_input >= 0) { size.size_tf.crotch = "큼"} else { size.size_tf.crotch = "작음"}
    var waist_input = Number(Number($("#waist_size").val()).toFixed(1));
    if(Number(size.target_size.waist)-waist_input >= 0) { size.size_tf.waist = "큼"} else { size.size_tf.waist = "작음"}
    var midThigh_input = Number(Number($("#midThigh_size").val()).toFixed(1));
    if(Number(size.target_size.midThigh)-midThigh_input >= 0) { size.size_tf.midThigh = "큼"} else { size.size_tf.midThigh = "작음"}
    var peach_input = Number(Number($("#peach_size").val()).toFixed(1));
    if(Number(size.target_size.peach)-peach_input >= 0) { size.size_tf.peach = "큼"} else { size.size_tf.peach = "작음"}
    var legLength_input = Number(Number($("#legLength_size").val()).toFixed(1));
    if(Number(size.target_size.legLength)-legLength_input >= 0) { size.size_tf.legLength = "큼"} else { size.size_tf.legLength = "작음"}

    if(isNaN(crotch_input)||isNaN(waist_input)||isNaN(midThigh_input)||isNaN(peach_input)||isNaN(legLength_input)) {
        alert("숫자를 입력해 주세요.");
        return;
    }
    if((crotch_input < 20 && crotch_input !== 0) || crotch_input > 50 || (waist_input < 30 && waist_input !== 0) || waist_input > 60 || (midThigh_input < 20 && midThigh_input !== 0) || midThigh_input > 50 || (peach_input < 10 && peach_input !== 0) || peach_input > 40 || (legLength_input < 70 && legLength_input !== 0) || legLength_input > 120) {
        alert("정확한 값을 입력해 주세요.\n밑위단면 : 20cm ~ 50cm\n허리단면 : 30cm ~ 60cm\n허벅지단면 : 20cm ~ 50cm\n밑단단면 : 30cm ~ 60cm\n총장 : 70cm ~ 120cm");
        return;
    }

    size.input_size.crotch = crotch_input;
    if(crotch_input === 0) {
        $("tr.error_value td:nth-child(3)")[0].innerHTML = "-";
    }
    size.input_size.waist = waist_input;
    if(waist_input === 0) {
        $("tr.error_value td:nth-child(4)")[0].innerHTML = "-";
    }
    size.input_size.midThigh = midThigh_input;
    if(midThigh_input === 0) {
        $("tr.error_value td:nth-child(5)")[0].innerHTML = "-";
    }
    size.input_size.peach = peach_input;
    if(peach_input === 0) {
        $("tr.error_value td:nth-child(6)")[0].innerHTML = "-";
    }
    size.input_size.legLength = legLength_input;
    if(legLength_input === 0) {
        $("tr.error_value td:nth-child(7)")[0].innerHTML = "-";
    }

    var i = 3;
    for(var part in size.target_size) {
        if(size.input_size[part] != 0) {
            $("tfoot > tr.error_value > td:nth-child(" + i + ")").text(Math.abs((Number(size.target_size[part])-Number(size.input_size[part])).toFixed(1))+"cm "+size.size_tf[part]);
        }
        i++;
    }
};