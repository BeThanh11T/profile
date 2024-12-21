jQuery(document).ready(function($) {
    $("#covert").click(function(){

        var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlRegex.test($("#url").val())) {
            $.toast({
                heading: 'Error',
                text: 'Vui lòng nhập một URL hợp lệ!',
                icon: 'error',
                loader: true,
                loaderBg: '#fff',
                showHideTransition: 'fade',
                hideAfter: 2000,
                allowToastClose: false,
                position: 'top-left'
            });
            return;
        }

        $.ajax({
            url: "api.php",
            type: "POST",
            data: { link : $("#url").val(), custom : $("#custom").val() },
            success: function(result){
                var response = JSON.parse(result);
                if (response.error === "0") {
                    $.toast({
                        heading: 'Error',
                        text: 'Nội dung custom đã được sử dụng, vui lòng chọn nội dung khác',
                        icon: 'error',
                        loader: true,
                        loaderBg: '#fff',
                        showHideTransition: 'fade',
                        hideAfter: 2000,
                        allowToastClose: false,
                        position: 'top-left'
                    });
                } else {
                    var hyperLink = response.hyper_link;
                    $("#url").val(hyperLink); 
                    $("#covert").hide();
                    $("#copy").show();
                    $("#copy").removeClass("d-none");
                }
            },
            error: function() {
                $.toast({
                    heading: 'Error',
                    text: 'Đã xảy ra lỗi trong khi xử lý yêu cầu của bạn',
                    icon: 'error',
                    loader: true,
                    loaderBg: '#fff',
                    showHideTransition: 'fade',
                    hideAfter: 2000,
                    allowToastClose: false,
                    position: 'top-left'
                });
            }
        });

    });

    const copyButton = document.querySelector("#copy");
    const inputField = document.querySelector("#url");
    copyButton.addEventListener("click", function() {
        inputField.select();           
        document.execCommand("copy");   
        $.toast({
            heading: 'Success',
            text: 'Đã copy thành công',
            icon: 'success',
            loader: true,
            loaderBg: '#fff',
            showHideTransition: 'fade',
            hideAfter: 2000,
            allowToastClose: false,
            position: 'top-left'
        });
        $("#url").val("");       
        $("#custom").val("");       
        $("#copy").hide();
        $("#covert").show();
    });

    $("#toggleButton").click(function(){
        $("#advanced").toggle();
    });
});
