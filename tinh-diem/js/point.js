let type, resultContent = $('.result .result-content')

const notifyN = (message, type) => {
    if (!type) type = 'danger'
    if (!message) message = 'Có lỗi xảy ra'
    LHM.common.notify(null, type, message)
}
const loadSubject = (parent) => {
    let number = 1;
    parent.children().each(function () {
        $(this).find('.title-subject').text(__('Tên môn') + ' ' + number);
        $(this).find('.number-credit').attr('placeholder', __('Số tín chỉ môn') + ' ' + number)
        $(this).find('.avg-score').attr('placeholder', __('Số điểm TB môn') + ' ' + number)
        number++
    })
}
$('body').on('click', 'a.js-delete-child-2', function () {
    let parent = $(this).closest('.parent-subject').find('.list-content-child-subject:first')
    if (parent.children().length > 2) {
        $(this).closest('.child-subject-content').remove()
        loadSubject(parent)
    } else {
        notifyN(__('Số môn phải >= 2. Bạn không thể tiếp tục xóa.'))
    }
})

$('.js-add-child-subject').click(function () {
    let parent = $(this).closest('.parent-subject').find('.list-content-child-subject:first')
    let totalSubject = parseInt(parent.data('subject'))
    if (parent.children().length >= totalSubject) {
        notifyN(__('Số môn không được vượt quá') + ' ' + totalSubject)
    } else {
        parent.append($('#child-content-2').html())
        loadSubject(parent)
        parent.scrollTop(parent[0].scrollHeight);
    }
})

$(() => {
    $('[name="quantity_point"]').change(function () {
        let listChild = $('.child-1-content-child')
        listChild.removeClass('d-flex')
        let point = $(this).val()
        listChild.each(function () {
            $(this).toggleClass('d-flex', $(this).data('number') <= point)
        })
    })
    $('[name="type"]').change(function () {
        $('.content-body-child').hide()
        type = $(this).val()
        if (type) {
            let content = $('.content-body-child.child-' + type)
            content.show('slow')
            if (['2', '3', '4'].includes(type) && !content.hasClass('added')) {
                content.find('.js-add-child-subject').click().click()
                content.addClass('added')
            }
        }
    })
    $('#submit-search').click(function () {
        if (type) {
            let that = $(this)
            let content = $('#look_up_point .child-' + type)
            if (content.length) {
                let pass = true
                content.find('input, select').each(function () {
                    if(this.offsetParent && !$(this).hasClass('not-required')){
                        let tagName = this.tagName.toLowerCase(), message
                        let message_first
                        if (tagName === 'input') {
                            message_first = $(this).attr('placeholder') ?? $(this).prev().text()
                        } else {
                            message_first = this.options[0].text
                        }
                        if (!$(this).val()) {
                            if (tagName === 'input') {
                                message = __('không được bỏ trống')
                            } else {
                                message = __('không được bỏ trống')
                            }
                        } else if (tagName === 'input') {
                            let val = parseFloat($(this).val()) || 0
                            if($(this).attr('min') && val < parseFloat($(this).attr('min'))) {
                                message = 'phải >= ' + $(this).attr('min')
                            } else if ($(this).attr('max') && val > parseFloat($(this).attr('max'))) {
                                message = 'phải <= ' + $(this).attr('max')
                            }
                        }
                        if(message) {
                            pass = false
                            notifyN(message_first + ' ' + message)
                        }
                    }

                })
                if (pass) {
                    resultContent.children().hide()
                    let divResultContent = resultContent.find('.result-content-' + type)
                    let result = 0
                    const range1s = [
                        {threshold: 8.5, text: '8,5 - 10,0', score_chart: 'A', score_number: '4.0'},
                        {threshold: 7, text: '7,0 - 8,4', score_chart: 'B', score_number: '3.0'},
                        {threshold: 5.5, text: '5,5 - 6,9', score_chart: 'C', score_number: '2.0'},
                        {threshold: 4, text: '4,0 - 5,4', score_chart: 'D', score_number: '1.0'},
                        {threshold: -Infinity, text: 'Dưới 4,0', score_chart: 'F', score_number: '0.0'}
                    ];
                    const range2s = [
                        {threshold: 9, text: '9,0 - 10,0', score_chart: 'A+', score_number: '4.0'},
                        {threshold: 8.5, text: '8,5 - 8,9', score_chart: 'A', score_number: '3.7'},
                        {threshold: 8, text: '8.0 - 8,4', score_chart: 'B+', score_number: '3.5'},
                        {threshold: 7, text: '7,0 - 7,9', score_chart: 'B', score_number: '3.0'},
                        {threshold: 6.5, text: '6,5 - 6,9', score_chart: 'C+', score_number: '2.5'},
                        {threshold: 5.5, text: '5,5 - 6,4', score_chart: 'C', score_number: '2.0'},
                        {threshold: 5, text: '5,0 - 5,4', score_chart: 'D+', score_number: '1.5'},
                        {threshold: 4, text: '4,0 - 4,9', score_chart: 'D', score_number: '1'},
                        {threshold: -Infinity, text: 'Dưới 4,0', score_chart: 'F', score_number: '0.0'}
                    ];
                    switch (type) {
                        case '1':
                            let resultOb = content.find('.child-1-content-child')
                                .map(function () {
                                    let ob = {
                                        total: 0,
                                        percent: 0
                                    }
                                    if (this.offsetParent) {
                                        ob.percent = parseFloat($(this).find('input.percent-score').val()) || 0;
                                        ob.total = (ob.percent / 100) * (parseFloat($(this).find('input.score').val()) || 0);
                                    }
                                    return ob;
                                })
                                .get()
                                .reduce(function (accumulator, currentValue) {
                                    accumulator.result += currentValue.total
                                    accumulator.percent += currentValue.percent
                                    return accumulator;
                                }, {result: 0, percent: 0});
                            console.log("resultOb: ", resultOb)
                            if(resultOb.percent === 100){
                                result = parseFloat(resultOb.result.toFixed(2));
                                let ob1s = range1s.find(range => result >= range.threshold)
                                let ob2s = range2s.find(range => result >= range.threshold)
                                divResultContent.find('tbody.tbody-score-5').html(`<td>${result}</td><td>${ob1s.score_chart}</td><td>${ob1s.score_number}</td>`)
                                divResultContent.find('tbody.tbody-score-9').html(`<td>${result}</td><td>${ob2s.score_chart}</td><td>${ob2s.score_number}</td>`)
                                divResultContent.show()
                                $('a.btn-step-by-step[data-step=2]').click()
                            } else {
                                notifyN('Tổng % điểm các điểm phải = 100')
                            }
                            break;
                        case '2':
                        case '3':
                        case '4':
                            let scoreOb = content.find('.child-subject-content')
                                .map(function () {
                                    return {
                                        score: parseFloat($(this).find('input.avg-score').val()) || 0,
                                        credit: parseFloat($(this).find('input.number-credit').val()) || 0,
                                    };
                                }).get()
                                .reduce(function (accumulator, currentValue) {
                                    accumulator.credit += currentValue.credit;
                                    accumulator.score += currentValue.credit * currentValue.score;
                                    return accumulator;
                                }, {score: 0, credit: 0})
                            let avgScore = scoreOb.score;
                            let credit = scoreOb.credit;
                            console.log('scoreOb: ', scoreOb)
                            result = credit > 0 ? parseFloat((avgScore / credit).toFixed(2)) : 0;
                            const resultRanges = [
                                {threshold: 3.6, text: 'Xuất sắc'},
                                {threshold: 3.2, text: 'Giỏi'},
                                {threshold: 2.5, text: 'Khá'},
                                {threshold: 2, text: 'Trung bình'},
                                {threshold: 1, text: 'Yếu'},
                                {threshold: -Infinity, text: 'Kém'}
                            ];
                            const result4 = resultRanges.find(range => result >= range.threshold);
                            divResultContent.find('.result-text').text(result4.text)
                            divResultContent.find('.tbody-score-4 tr').html(`<td>${result}</td><td>${result4.text}</td>`)
                            divResultContent.show()
                            $('a.btn-step-by-step[data-step=2]').click()
                            break;
                        case '5':
                            let degree_type = parseFloat($('select[name="degree_type"]').val())
                            let gpa = parseFloat(content.find('[name="gpa"]').val())
                            if (gpa > 0 && gpa <= 4) {
                                let need_credits = parseInt(content.find('[name="need_credits"]').val())
                                let credits = parseInt(content.find('[name="credits"]').val())
                                result = ((degree_type * credits) - (gpa * need_credits)) / (Math.max(credits - need_credits, 1));
                                result = parseFloat(result.toFixed(2))
                                console.log("result-5: ", result)
                                if (Number.isFinite(result) && !isNaN(need_credits) && !isNaN(credits) && credits >= need_credits) {
                                    divResultContent.find('.degree_option').text($('select[name="degree_type"] option:selected').text())
                                    divResultContent.children().hide()
                                    let class_pass = 'fail'
                                    if (credits === need_credits) {
                                        class_pass = gpa < degree_type ? 'fail' : 'pass'
                                    } else {
                                        class_pass = result > 4 || result === 0 ? 'fail' : 'pass'
                                    }
                                    divResultContent.find('.result-' + class_pass).show()
                                    divResultContent.find('.result-' + class_pass + ' .result-5').text(result)
                                    if(class_pass === 'pass') {
                                        range1s.reverse()
                                        range2s.reverse()
                                        let rank5 = range1s.find(range => result <= parseFloat(range.score_number))
                                        let rank9 = range2s.find(range => result <= parseFloat(range.score_number))
                                        divResultContent.find('tbody.tbody-score-5').html(`<td>${rank5.text}</td><td>${rank5.score_chart}</td><td>${rank5.score_number}</td>`)
                                        divResultContent.find('tbody.tbody-score-9').html(`<td>${rank9.text}</td><td>${rank9.score_chart}</td><td>${rank9.score_number}</td>`)
                                        divResultContent.find('.credits').text(credits - need_credits)
                                    }
                                    divResultContent.show()
                                    $('a.btn-step-by-step[data-step=2]').click()
                                } else {
                                    notifyN(__('Có vẻ bạn đã điền sai thông số nào đó. Vui lòng kiểm tra lại'))
                                }
                            } else {
                                notifyN(__('GPA phải > 0 và <= 4'))
                            }
                            break;
                    }
                }
                that.attr('disabled', 'disabled')
                setTimeout(function () {
                    that.removeAttr('disabled')
                }, 5000)
            }
        }
    })
})