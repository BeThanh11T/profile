var DEFAULT = {
    cart: {
        add: function (course_id, live_id, code_live, add_more) {
            add_more = add_more ? add_more : 'more'
            if (course_id != '') {
                $.ajax({
                    type: 'POST',
                    url: base_url + '/payment/addCart',
                    data: {course_id: course_id, live_id: live_id, add_more: add_more, _token: $.cookie('_token')},
                    dataType: 'json',
                    success: function (rs) {
                        if (rs.error) {
                            if (add_more == 'one')
                                window.location = base_url + '/cart';
                            else {
                                for (let i in rs.msg) {
                                    LHM.common.notify(null, 'warning', rs.msg[i]);
                                }
                            }

                        } else {
                            if (add_more == 'one')
                                window.location = base_url + '/checkout?pid=' + code_live;
                            else {
                                LHM.common.notify(null, 'success', rs.msg[0]);
                                if($('.menu-shopping-cart').length){
                                    $('.menu-shopping-cart').each(function () {
                                        if($(this).find('.count_cart').length) $(this).find('.count_cart').text(rs.qty)
                                        else $(this).append(`(<span class="count_cart">${rs.qty}</span>)`)
                                    })
                                } else $('.count_cart').text(rs.qty);
                            }

                        }
                    }
                })
            }
        },
        delete: function (course_id, curr) {
            if (course_id != '') {
                $.confirm({
                    title: "Thông báo",
                    content: "Bạn có muốn tiếp tục xóa?",
                    buttons: {
                        Ok: function () {
                            $.ajax({
                                type: 'POST',
                                url: base_url + '/payment/removeCart',
                                data: {course_id: course_id, _token: $.cookie('_token')},
                                dataType: 'json',
                                success: function (rs) {
                                    if (rs.error) {
                                        for (let i in rs.msg) {
                                            LHM.common.notify(null, 'warning', rs.msg[i])
                                        }
                                    } else {
                                        LHM.common.notify(null, 'success', rs.msg[0]);
                                        $('.count_cart').text(rs.qty);
                                        $('.total-cart').html(rs.total);
                                        $('.total-money-cart').html(rs.total_price.toLocaleString('vi-VN'));
                                        if (rs.qty != 0)
                                            $(curr).closest('.block-data-cart').remove();
                                        else {
                                            $(curr).closest('.block-info-cart').html(' <div class="col-md-12 block-empty-cart text-center">' +
                                                '<p><i class="fas fa-shopping-cart"></i></p>' +
                                                '<p>Hiện tại giỏ hàng của bạn chưa có khóa học nào.<br>Vui lòng lựa chọn khóa học mà bạn muốn học.</p>' +
                                                '<a href="/courses" class="btn btn-primary">Xem danh sách khóa học</a>' +
                                                '</div>');
                                        }
                                    }
                                }
                            })
                        },
                        Cancel: {
                            text: "Đóng"
                        }
                    }
                })
            }
        }
    },
    cart_product: {
        add: function (product_id) {
            if (product_id != '') {
                $.ajax({
                    type: 'POST',
                    url: base_url + '/payment/addCartProduct',
                    data: {product_id, _token: $.cookie('_token')},
                    dataType: 'json',
                    success: function (rs) {
                        if (rs.error) {
                            LHM.common.notify(null, 'danger', rs.msg);
                        } else {
                            if($('.menu-shopping-cart').length){
                                $('.menu-shopping-cart').each(function () {
                                    if($(this).find('.count_cart').length) $(this).find('.count_cart').text(rs.qty)
                                    else $(this).append(`(<span class="count_cart">${rs.qty}</span>)`)
                                })
                            } else $('.count_cart').text(rs.qty);
                            LHM.common.notify(null, 'success', rs.msg);
                        }
                    }
                });
            }
        },
        delete: function (product_id, curr) {
            if (product_id != '') {
                $.confirm({
                    title: "Thông báo",
                    content: "Bạn có muốn tiếp tục xóa?",
                    buttons: {
                        Ok: function () {
                            $.ajax({
                                type: 'POST',
                                url: base_url + '/payment/removeCartProduct',
                                data: {product_id: product_id, _token: $.cookie('_token')},
                                dataType: 'json',
                                success: function (rs) {
                                    if (rs.error) {
                                        for (let i in rs.msg) {
                                            LHM.common.notify(null, 'warning', rs.msg[i])
                                        }
                                    } else {
                                        LHM.common.notify(null, 'success', rs.msg[0]);
                                        $('.count_cart_product').text(rs.quantity);
                                        $('.total-cart-product').html(rs.total_price);

                                        $('.count_cart').text(rs.qty_popup);
                                        $('.total-money-cart').html(rs.total_price_popup.toLocaleString('vi-VN'));
                                        $('.block-data-cart-product').remove()
                                        if (rs.quantity != 0)
                                            $(curr).parents('.block-data-cart').remove();
                                    }
                                }
                            })
                        },
                        Cancel: {
                            text: "Đóng"
                        }
                    }
                })
            }
        }
    },
}