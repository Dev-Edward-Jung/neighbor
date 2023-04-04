function collapse(element) {
    var before = document.getElementsByClassName("active")[0]               // 기존에 활성화된 버튼
    if (before && document.getElementsByClassName("active")[0] != element) {  // 자신 이외에 이미 활성화된 버튼이 있으면
        //before.nextElementSibling.style.maxHeight = null;   // 기존에 펼쳐진 내용 접고
        // before.classList.remove("active");                  // 버튼 비활성화
    }
    element.classList.toggle("active");         // 활성화 여부 toggle

    var content = element.nextElementSibling;
    if (content.style.maxHeight != 0) {         // 버튼 다음 요소가 펼쳐져 있으면
        content.style.maxHeight = null;         // 접기
    } else {
        content.style.maxHeight = content.scrollHeight + "px";  // 접혀있는 경우 펼치기
    }
}


/* mypageUpdatePassword.html */

/* 비밀번호 정규식 */
const passwordNumberRegex = /[0-9]/g;
const passwordEnglishRegex = /[a-z]/gi;
const passwordSpecialCharacterRegex = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi;
const $warnText = $('p.warn-text');
const $regexText = $('p.password-regex');
const $inputs = $('input[type="password"]');
/* 기존 비밀번호 입력칸 */
const $originalPassword = $('.original-password');
/* 새로운 비밀번호 입력칸 */
const $passwordInput = $('.new-password');
/* 새로운 비밀번호 한번더 입력칸 */
const $checkInput = $('.new-password-check');
/* 변경하기 버튼 */
const $changeButton = $('.change-button');

let regexMessage = '위 비밀번호와 일치하지 않습니다. 다시 입력해주세요.';
let passwordCheck;
let passwordCheckAll = [false, false, false];

$('.modal').hide();

/* 기존 비밀번호 검사 */
$originalPassword.on('blur', function () {
    let value = $(this).val();

    if (!value) {
        passwordCheck = false;
        passwordCheckAll[0] = passwordCheck;
        return;
    }

    passwordCheckAll[0] = true;
});

/* 새로운 비밀번호 검사 */
$passwordInput.on('blur', function () {
    let value = $(this).val();

    if (!value) {
        $regexText.css('color', 'rgb(153, 153, 153)');
        $passwordInput.css('border', '1px solid rgb(238, 238, 238)');
        passwordCheck = false;
        passwordCheckAll[1] = passwordCheck;
        return;
    }

    /* 정규식 검사 */
    let numberCheck = value.search(passwordNumberRegex);
    let englishCheck = value.search(passwordEnglishRegex);
    let specialCharacterCheck = value.search(passwordSpecialCharacterRegex);

    var condition1 =
        numberCheck >= 0 &&
        englishCheck >= 0 &&
        englishCheck >= 0 &&
        specialCharacterCheck >= 0 &&
        specialCharacterCheck >= 0 &&
        numberCheck >= 0;
    var condition2 = value.length > 9 && value.length < 21;
    var condition3 = value.search(/\s/) < 0;

    /* 정규식 검사 통과하면 true */
    passwordCheck = condition1 && condition2 && condition3;

    passwordCheckAll[1] = passwordCheck;

    if (!passwordCheck) {
        $regexText.css('color', 'rgb(222, 28, 34)');
        $passwordInput.css('border', '1px solid rgb(222, 28, 34)');
        passwordCheckAll[1] = passwordCheck;
    } else {
        $regexText.css('color', 'rgb(153, 153, 153)');
        $passwordInput.css('border', '1px solid rgb(238, 238, 238)');
    }
});

/* 새로운 비밀번호 한번 더 입력 검사 */
$checkInput.on('blur', function () {
    let value = $(this).val();

    if (value != $passwordInput.val()) {
        $warnText.show();
        $warnText.text(regexMessage);
        $checkInput.css('border', '1px solid rgb(222, 28, 34)');
        passwordCheck = false;
        passwordCheckAll[2] = passwordCheck;
    } else {
        $warnText.hide();
        passwordCheck = true;
        passwordCheckAll[2] = passwordCheck;
    }

    passwordCheckAll[2] = passwordCheck;

    if (!passwordCheck) {
        $warnText.show();
        $warnText.text(regexMessage);
        $checkInput.css('border', '1px solid rgb(222, 28, 34)');
        passwordCheckAll[2] = passwordCheck;
    } else {
        $warnText.hide();
        $checkInput.css('border', '1px solid rgb(238, 238, 238)');
    }
});


/* 입력한 값들이 모두 true라면 변경하기 버튼 활성화 */
$inputs.on('blur', function () {
    if (passwordCheckAll.filter((check) => check).length == 3) {
        $changeButton.attr('disabled', false);
        return;
    }
    $changeButton.attr('disabled', true);
});

const $oldpassword = $("input[name='oldPassword']").val();
originalPassword = $("input[name='originalPassword']").val(btoa($("input[name='originalPassword']").val()));

$changeButton.on('click', function () {
    let modalMessage = '';
    /* 기존 비밀번호 검사 후 false일 때 모달창 */
    if($originalPassword.val() === $oldpassword){
        modalMessage = '기존 비밀번호가 일치하지 않습니다.';
        showWarnModal(modalMessage);
    }else{
        /* 기존 비밀번호 검사 후 true일 때 모달창 */
        modalMessage = "변경되었습니다.";
        showWarnModal(modalMessage);
        $("input[name='memberPassword']").val(btoa($("input[name='memberPassword']").val()));
        $("form.update-password-form").submit();
    }
});

/* 모달창 */
let modalCheck;
function showWarnModal(modalMessage){
    modalCheck = false;
    $("div#content-wrap").html(modalMessage)
    $("div.warn-modal").css("animation", "popUp 0.5s");
    $("div.modal").css("display", "flex").hide().fadeIn(500);
    setTimeout(function(){modalCheck = true;}, 500);
}

$("div.modal").on("click", function(){
    if(modalCheck){
        $("div.warn-modal").css("animation", "popDown 0.5s");
        $("div.modal").fadeOut(500);
    }
});
