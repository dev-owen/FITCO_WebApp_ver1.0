var size = {
    // input_size는 내가 직접 입력한 사이즈
    "input_size" : {
        "biacromion": "",
        "chest": "",
        "armLength": "",
        "torso": ""
    },
    // target_size는 내가 선택한(파란색) 사이즈
    "target_size" : {
        "biacromion": "",
        "chest": "",
        "armLength": "",
        "torso": ""
    },
    // 사이즈가 큰지 작은지 string 값
    "size_tf" : {
        "biacromion": "",
        "chest": "",
        "armLength": "",
        "torso": ""
    }
}

// 페이지 렌더링이 완료되면 실행되는 함수
$(document).ready(function () {
    var i = 2, j = 3;
    for(var part in size.target_size) {
        size.target_size[part] = $(this).find("td")[i].innerText;
        console.log(size.target_size[part]);
        i++;
    }
    $("tr.size_click").click(function () {
        $("tr.size_click").removeClass("selected_size");
        $("tr.size_click > td:first-child > img").attr('src',"./img/ok_path.png");
        $(this).addClass("selected_size");
        $(this).find(">:first-child > img").attr('src',"./img/ok_path_selected.png");
        $("#size_name").text($(this).find("td.size_name").text());
        var i = 2, j = 3;
        for(var part in size.target_size) {
            size.target_size[part] = $(this).find("td")[i].innerText;
            console.log(size.target_size[part]);
            i++;
        }
        // 내 옷이 선택한 옷보다 큰지 작은지 판단(일단 지금은 놔두지만 너무 거지같다.. 빠른 시일 내에 고치자)
        if(Number(size.target_size.biacromion)-Number($("#biacromion_size").val()) >= 0) { size.size_tf.biacromion = "큼"} else { size.size_tf.biacromion = "작음"}
        if(Number(size.target_size.chest)-Number($("#chest_size").val()) >= 0) { size.size_tf.chest = "큼"} else { size.size_tf.chest = "작음" }
        if(Number(size.target_size.armLength)-Number($("#armLength_size").val()) >= 0) { size.size_tf.armLength = "큼"} else { size.size_tf.armLength = "작음"}
        if(Number(size.target_size.torso)-Number($("#torso_size").val()) >= 0) { size.size_tf.torso = "큼"} else { size.size_tf.torso = "작음"}
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
    var biacromion_input = Number(Number($("#biacromion_size").val()).toFixed(1));
    if(Number(size.target_size.biacromion)-biacromion_input >= 0) { size.size_tf.biacromion = "큼"} else { size.size_tf.biacromion = "작음"}
    var chest_input = Number(Number($("#chest_size").val()).toFixed(1));
    if(Number(size.target_size.chest)-chest_input >= 0) { size.size_tf.chest = "큼"} else { size.size_tf.chest = "작음"}
    var armLength_input = Number(Number($("#armLength_size").val()).toFixed(1));
    if(Number(size.target_size.armLength)-armLength_input >= 0) { size.size_tf.armLength = "큼"} else { size.size_tf.armLength = "작음"}
    var torso_input = Number(Number($("#torso_size").val()).toFixed(1));
    if(Number(size.target_size.torso)-torso_input >= 0) { size.size_tf.torso = "큼"} else { size.size_tf.torso = "작음"}
    if(isNaN(biacromion_input)||isNaN(chest_input)||isNaN(armLength_input)||isNaN(torso_input)) {
        alert("숫자를 입력해 주세요.");
        return;
    }
    if((biacromion_input < 30 && biacromion_input !== 0) || biacromion_input > 60 || (chest_input < 40 && chest_input !== 0) || chest_input > 70 || (armLength_input < 50 && armLength_input !== 0) || armLength_input > 80 || (torso_input < 60 && torso_input !== 0) || torso_input > 90) {
        alert("정확한 값을 입력해 주세요.\n어깨너비 : 30cm ~ 60cm\n가슴단면 : 40cm ~ 70cm\n소매길이 : 50cm ~ 80cm\n총장 : 60cm ~ 90cm");
        return;
    }

    size.input_size.biacromion = biacromion_input;
    if(biacromion_input === 0) {
        $("tr.error_value td:nth-child(3)")[0].innerHTML = "-";
    }
    size.input_size.chest = chest_input;
    if(chest_input === 0) {
        $("tr.error_value td:nth-child(4)")[0].innerHTML = "-";
    }
    size.input_size.armLength = armLength_input;
    if(armLength_input === 0) {
        $("tr.error_value td:nth-child(5)")[0].innerHTML = "-";
    }
    size.input_size.torso = torso_input;
    if(torso_input === 0) {
        $("tr.error_value td:nth-child(6)")[0].innerHTML = "-";
    }

    var i = 3;
    for(var part in size.target_size) {
        if(size.input_size[part] != 0) {
            $("tfoot > tr.error_value > td:nth-child(" + i + ")").text(Math.abs((Number(size.target_size[part])-Number(size.input_size[part])).toFixed(1))+"cm "+size.size_tf[part]);
        }
        i++;
    }
};