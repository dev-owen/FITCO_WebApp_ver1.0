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

    // getData()의 실행이 끝나면 호출되는 then()
    getData().then(function (tableData) {
        // resolve()의 결과 값이 여기로 전달됨
        $("tbody.size_list").html("");
        var htmlRow = "";
        for(var i=0; i<tableData.item[0].size.length; i++) {
            if(i === Math.floor(i<tableData.item[0].size.length/2)) {
                htmlRow += "<tr class='size_click selected_size'><td><img src='./img/ok_path_selected.png' width='15px'></td>";
                for(var part in size.target_size) {
                    size.target_size[part] = tableData.item[0].size[i][part]
                }
            } else {
                htmlRow += "<tr class='size_click'><td><img src='./img/ok_path.png' width='15px'></td>";
            }
            htmlRow += "<td class='size_name'>"+tableData.item[0].size[i].name+"</td>"
            for(var part in size.target_size) {
                if(tableData.item[0].size[i][part] === "") {
                    htmlRow += "<td></td>"
                } else {
                    htmlRow += "<td>"+ tableData.item[0].size[i][part]+"</td>"
                }
            }
            htmlRow += "</tr>";
        }
        $("tbody.size_list").append(htmlRow);

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
            if(Number(size.target_size.biacromion)-Number($("#biacromion_size").val()) >= 0) { size.size_tf.biacromion = "큼"} else { size.size_tf.biacromion = "작음"}
            if(Number(size.target_size.chest)-Number($("#chest_size").val()) >= 0) { size.size_tf.chest = "큼"} else { size.size_tf.chest = "작음" }
            if(Number(size.target_size.armLength)-Number($("#armLength_size").val()) >= 0) { size.size_tf.armLength = "큼"} else { size.size_tf.armLength = "작음"}
            if(Number(size.target_size.torso)-Number($("#torso_size").val()) >= 0) { size.size_tf.torso = "큼"} else { size.size_tf.torso = "작음"}
            // 오차값 계산 후 출력
            for(var part in size.target_size) {
                if(size.input_size[part] != 0) {
                    $("tfoot > tr.error_value > td:nth-child(" + j + ")").text(Math.abs((Number(size.target_size[part])-Number(size.input_size[part])).toFixed(1))+"cm "+size.size_tf[part]);
                    if(Number(size.target_size[part])-Number(size.input_size[part]) > 0) {
                        $("tfoot > tr.error_value > td:nth-child(" + j + ")").css('font-weight',400).css('color','#26a9e0');
                    } else if(Number(size.target_size[part])-Number(size.input_size[part]) === 0) {
                        $("tfoot > tr.error_value > td:nth-child(" + j + ")").text("적정");
                        $("tfoot > tr.error_value > td:nth-child(" + j + ")").css('font-weight',400).css('color','#555555');
                    } else {
                        $("tfoot > tr.error_value > td:nth-child(" + j + ")").css('font-weight',700).css('color','#f16522');
                    }
                }
                j++;
            }
        });
    });
});

var getData = function(callback) {
    return new Promise( function (resolve, reject) {
        $.get('https://tomorrancetestserver.azurewebsites.net/web/getItemSize?mallid=brummieowen&product_no[0]=15', function (res) {
            // 데이터를 받으면 resolve 호출
            resolve(res);
        });
    });
}

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
    if(biacromion_input < 0 || chest_input < 0 || armLength_input < 0 || torso_input < 0) {
        alert("숫자는 0 이상의 값을 입력해 주세요");
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
            if(Number(size.target_size[part])-Number(size.input_size[part]) > 0) {
                $("tfoot > tr.error_value > td:nth-child(" + i + ")").css('font-weight',400).css('color','#26a9e0');
            } else if(Number(size.target_size[part])-Number(size.input_size[part]) === 0) {
                $("tfoot > tr.error_value > td:nth-child(" + i + ")").text("적정");
                $("tfoot > tr.error_value > td:nth-child(" + i + ")").css('font-weight',400).css('color','#555555');
            } else {
                $("tfoot > tr.error_value > td:nth-child(" + i + ")").css('font-weight',700).css('color','#f16522');
            }
        }
        i++;
    }
};