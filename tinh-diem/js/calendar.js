const calendar_div = {}

const HCalendar = {
    callAjaxApi: function (url, data, callbackSuccess, type = 'GET', callbackError) {
        if (token_api_v2 && token_api_v2 !== '') {
            $.ajax({
                // url: `${window.location.protocol}//edubit.vn/api/${url}`,
                url: `${base_url}/api/${url}`,
                type: type,
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    // Thêm header Authorization
                    xhr.setRequestHeader('Authorization', `Bearer ${token_api_v2}`);
                    xhr.setRequestHeader('contentType', `application/x-www-form-urlencoded`);
                    LHM.common.processBody('start', '')
                },
                not_loading: true,
                success: function (data) {
                    if (callbackSuccess) {
                        callbackSuccess(data)
                    }
                },
                error: function (resCallFail) {
                    if (callbackError) {
                        callbackError(resCallFail)
                    } else {
                        LHM.common.notify(null, 'danger', resCallFail.error ? resCallFail.error : __('Có lỗi xảy ra!'))
                    }
                },
                complete: function () {
                    LHM.common.processBody('end')
                }
            });
        } else {
            LHM.common.notify(null, 'danger', __('Không tồn tại token'))
        }
    },
    exportFile: function (schedule) {
        if(schedule){
            let ical = "BEGIN:VCALENDAR\r\n"
            ical += "VERSION:2.0\r\n";
            ical += "PRODID:-//My Company//NONSGML Event//EN\r\n";
            ical += "BEGIN:VEVENT\r\n";
            ical += "SUMMARY:" + schedule.title + "\r\n";
            ical += "DTSTAMP:" + LHM.common.convertTime(new Date().getTime() / 1000, 'YmdTHisZ') + "\r\n";
            ical += "DTSTART:" + LHM.common.convertTime(schedule.start_time['sec'], 'YmdTHis') + "\r\n";
            ical += "DTEND:" + LHM.common.convertTime(schedule.end_time['sec'], 'YmdTHis') + "\r\n";
            ical += "END:VEVENT\r\n";
            ical += "END:VCALENDAR";

            const blob = new Blob([ical], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url
            a.download = 'event.ics'; // Đặt tên tệp .ics
            a.click()
        }
    },
    selectAll: function (idCalendar, data = {}) {
        if (calendar_div[idCalendar]) {
            calendar_div[idCalendar].getEvents().forEach(function (event) {
                event.remove();
            })
            data['start_time'] = calendar_div[idCalendar].view.currentStart.getTime() / 1000
            data['end_time'] = calendar_div[idCalendar].view.currentEnd.getTime() / 1000 - 1
            this.callAjaxApi(calendar_div[idCalendar].urlSelectAll, data, function (res) {
                let current = new Date().getTime()
                $.each(res.items, function (k, v) {
                    let start = new Date(v.start).getTime()
                    let end = new Date(v.end).getTime()
                    res.items[k]['className'] = 'cursor-pointer font-weight-bold'
                    if(start > current){
                        res.items[k]['color'] = 'yellow'
                        res.items[k]['textColor'] = 'black'
                    }else if(end < current){
                        res.items[k]['color'] = 'red'
                        res.items[k]['textColor'] = 'while'
                    }else{
                        res.items[k]['color'] = 'green'
                        res.items[k]['textColor'] = 'while'
                    }
                })
                calendar_div[idCalendar].addEventSource(res.items);
            })
        }
    },
    editEvent: function (idCalendar, itemId = null, arg = null) {
        let data = {itemId: itemId}
        $.get(`/calendar/genHtmlEdit`, data, function (res) {
            let buttons = {}, titleConfirm = __('Thêm sự kiện')
            if (!res.hideAction) {
                buttons['Ok'] = {
                    text: __('Lưu lại'),
                    btnClass: 'btn-success',
                    action: function () {
                        let _this = this;
                        LHM.common.updateCkeditor('calendar_schedule_event')
                        HCalendar.callAjaxApi('v2/calendar/manage/edit', $('#calendar_schedule_event').serialize(), function (resCallSuccess) {
                            if (resCallSuccess.data) {
                                HCalendar.selectAll(idCalendar)
                                LHM.common.notify(null, 'success', __("Thêm sự kiện thành công"))
                                _this.close()
                            } else {
                                if (resCallSuccess.message) {
                                    LHM.common.notifyResponse(resCallSuccess.message)
                                } else {
                                    LHM.common.notify(null, 'danger', resCallSuccess.error ? resCallSuccess.error : __('Có lỗi xảy ra!!'))
                                }
                            }
                        }, 'POST', function (resCallFail) {
                            LHM.common.notify(null, 'danger', resCallFail.error ? resCallFail.error : __('Có lỗi xảy ra!'))
                        })
                        return false
                    }
                }
            }
            if (itemId) {
                titleConfirm = __('Sửa sự kiện') + ' - '
                if (res.isEnded) {
                    titleConfirm += __('Đã kết thúc')
                } else if (res.isHappening) {
                    titleConfirm += __('Đang diễn ra')
                } else {
                    titleConfirm += __('Chưa bắt đầu')
                }
                if (!res.hideAction) {
                    buttons['delete'] = {
                        text: __('Xóa sự kiện'),
                        btnClass: 'btn-danger',
                        action: function () {
                            let _this = this;
                            $.confirm({
                                title: __("Xóa sự kiện"),
                                content: __("Bạn có chắc chắn muốn xóa sự kiện đang chọn?"),
                                buttons: {
                                    Ok: {
                                        text: __('Đồng ý'),
                                        action: function () {
                                            HCalendar.callAjaxApi(`v2/calendar/manage/delete/${itemId}`, {}, function (res) {
                                                if (res.error && res.error === 'success') {
                                                    LHM.common.notify(null, 'success', __('Xóa sự kiện thành công!'))
                                                    calendar_div[idCalendar].getEvents().forEach(function (event) {
                                                        if (event.id === itemId) {
                                                            event.remove();
                                                        }
                                                    })
                                                    _this.close()
                                                } else {
                                                    LHM.common.notify(null, 'danger', res.error ? res.error : __('Có lỗi xảy ra!!'))
                                                }
                                            }, 'DELETE', function (res) {
                                                LHM.common.notify(null, 'danger', res.error ? res.error : __('Có lỗi xảy ra!'))
                                            })
                                        }
                                    },
                                    cancel: {
                                        text: __('Đóng'),
                                    }
                                }
                            })
                            return false
                        }
                    }
                }
                buttons['updateStudent'] = {
                    text: __('Chi tiết'),
                    btnClass: 'btn-info',
                    action: function () {
                        HCalendar.viewEvent(itemId, true, arg)
                        return false
                    }
                }
            }
            buttons['cancel'] = {
                text: __('Đóng')
            }
            $.confirm({
                title: titleConfirm,
                columnClass: 'col-md-10',
                content: res.html,
                onContentReady: function () {
                    LHM.common.genAllCustom()
                    if(!itemId){
                        let timestamp = new Date().getTime() / 1000
                        if (arg) {
                            $('[name="fields[start_date]"], [name="fields[end_date]"]').val(arg.startStr)
                            $('[name="fields[start_time]"]').val('00:00')
                            $('[name="fields[end_time]"]').val('23:59')
                        }else{
                            $('[name="fields[start_date]"]').val(LHM.common.convertTime(timestamp, 'Y-m-d'))
                            $('[name="fields[start_time]"]').val(LHM.common.convertTime(timestamp, 'H:i'))
                            timestamp += 3600;
                            $('[name="fields[end_date]"]').val(LHM.common.convertTime(timestamp, 'Y-m-d'))
                            $('[name="fields[end_time]"]').val(LHM.common.convertTime(timestamp, 'H:i'))
                        }
                    }
                    if (res.hideAction) {
                        $('#calendar_schedule_event').addClass('events-none')
                    }
                },
                buttons: buttons
            })
        })
    },
    listEvent: function (url, itemId, isManage = false) {
        LHM.common.getListTable('user_schedule', `${url}/${itemId}`, function (res) {
            let index = 1, colspan = 6
            if (res.items && res.items.length > 0) {
                $.each(res.items, function (k, v) {
                    let number = res.limit * res.page + index++
                    let html, action = ''
                    if (isManage) {
                        let textCheckin = '', textLeave = ''
                        if (v.checkin) {
                            textCheckin = `<i class="fa fa-check text-success" title="${v.checkin.typeTitle}"></i>`
                            if (v.checkin.status === 'disagree') {
                                textCheckin = `<i class="fa fa-times text-danger" title="${v.checkin.typeTitle} - ${v.checkin.statusTitle}"></i>`
                            }
                        }
                        if (v.leave) {
                            textLeave = `<i class="fa fa-check text-success" title="${v.leave.typeTitle}"></i>`
                            if (v.leave.status === 'disagree') {
                                textLeave = `<i class="fa fa-times text-danger" title="${v.leave.typeTitle} - ${v.leave.statusTitle}"></i>`
                            } else if (v.leave.status === 'unconfirmed') {
                                textLeave = `<a href="javascript:;" class="change-leave" data-event-id="${v.leave._id['$id']}" title="${v.leave.typeTitle}" data-reason="${v.leave.reason}"><i class="fa fa-check text-warning"></i><br/> Chưa xác nhận</a>`
                            }
                        }
                        html =
                            `
                                <tr>
                                    <td>${number}</td>
                                    <td>${v.user.full_name}</td>
                                    <td>${v.user.email}</td>
                                    <td class="text-center">${textCheckin}</td>
                                    <td class="text-center">${textLeave}</td>
                                    <td class="text-center"><a href="javascript:;" class="view-schedule-user" data-id="${v._id['$id']}"><i class="fa fa-eye"></i></a></td>
                                </tr>
                            `
                    } else {
                        let agreeTeacher = ''
                        if (v.status === 'agree') {
                            agreeTeacher = '<i class="fa fa-check text-success"></i>'
                        } else if (v.status === 'disagree') {
                            agreeTeacher = '<i class="fa fa-times text-danger" title="Từ chối"></i>'
                        }
                        if (v.canDelete && v.canDelete === 'true') {
                            action = `<a href="javascript:;" class="btn btn-danger btn-sm" onclick="HCalendar.user.deleteEventLeave('${v._id['$id']}')" title="Xóa"><i class="fa fa-trash"></i></a>`
                        }
                        html =
                            `
                                            <tr>
                                                <td>${number}</td>
                                                <td>${v.typeTitle}</td>
                                                <td>${LHM.common.convertTime(v.time['sec'], 'd/m/Y')}</td>
                                                <td>${LHM.common.convertTime(v.created_at['sec'], 'H:i d/m/Y')}</td>
                                                <td class="text-center">${agreeTeacher}</td>
                                                <td class="text-center">${action}</td>
                                            </tr>
                                        `
                    }
                    $('#user_schedule').append(html)
                })
            } else {
                $('#user_schedule').html(`<tr><td colspan="${colspan}" class="text-center">${__('Không tồn tại dữ liệu')}</td></tr>`)
            }
        }, {call_api_v2: 1})
    },
    viewEvent: function (itemId, isManage = false, agg = null) {
        let data = {
            'manage': isManage ? '1' : '0',
            'itemId': itemId
        }, url = '/api/v2/calendar/student/events', isCheckin = false
        $.get(`/calendar/genHtmlView`, data, function (res) {
            if (!res.close) {
                if (isManage) {
                    url = '/api/v2/calendar/manage/student_events'
                }
                let buttons = {}
                if (!isManage) {
                    if (res.type_user_schedule === 'waiting') {
                        buttons['accept'] = {
                            text: __('Chấp thuận'),
                            btnClass: 'btn-success',
                            action: function () {
                                HCalendar.user.changeTypeSchedule(itemId, 'accept', this)
                                return false
                            }
                        }
                        buttons['refuse'] = {
                            text: __('Từ chối tham dự'),
                            btnClass: 'btn-danger',
                            action: function () {
                                HCalendar.user.changeTypeSchedule(itemId, 'refuse', this, agg)
                                return false
                            }
                        }
                    } else if (res.status && res.status !== 'ended') {
                        if(res.item){
                            buttons['export'] = {
                                text: 'Export',
                                btnClass: 'btn-info',
                                action: function () {
                                    HCalendar.exportFile(res.item)
                                    return false
                                }
                            }
                        }
                        buttons['leave'] = {
                            text: __('Xin nghỉ'),
                            btnClass: 'btn-danger',
                            action: function () {
                                let that = this
                                $.get(`/calendar/genHtmlLeaveStudent/${itemId}`, function (resLeave) {
                                    if (resLeave.error) {
                                        LHM.common.notify(null, 'danger', resLeave.error)
                                    } else {
                                        $.confirm({
                                            title: __('Đơn xin nghỉ'),
                                            columnClass: 'col-md-6',
                                            content: resLeave.html,
                                            buttons: {
                                                Ok: {
                                                    text: __('Nộp'),
                                                    btnClass: 'btn-success',
                                                    action: function () {
                                                        let thatLeave = this
                                                        let dataForm = $('#form_leave_schedule').serialize()
                                                        dataForm += '&user_schedule_id=' + itemId
                                                        HCalendar.callAjaxApi('v2/calendar/student/leave', dataForm, function (resCallSuccess) {
                                                            if (resCallSuccess.error && resCallSuccess.error === 'success') {
                                                                thatLeave.close()
                                                                LHM.common.notify(null, 'success', __('Tạo đơn xin nghỉ thành công'))
                                                                setTimeout(function () {
                                                                    HCalendar.listEvent(url, itemId, isManage)
                                                                }, 1000)
                                                            } else {
                                                                if (resCallSuccess.message) {
                                                                    LHM.common.notifyResponse(resCallSuccess.message)
                                                                } else {
                                                                    LHM.common.notify(null, 'danger', resCallSuccess.error ? resCallSuccess.error : __('Có lỗi xảy ra!!'))
                                                                }
                                                            }
                                                        }, 'POST')
                                                        return false
                                                    }
                                                },
                                                cancel: {text: __('Đóng')}
                                            }
                                        })
                                    }
                                })

                                return false;
                            }
                        }
                        isCheckin = !!res.is_checkin;
                        if (res.status === 'happening') {
                            buttons['checkin'] = {
                                text: __(isCheckin ? 'Đã điểm danh' : 'Điểm danh'),
                                btnClass: 'btn-success',
                                action: function () {
                                    let that = this
                                    if (!isCheckin) {
                                        HCalendar.callAjaxApi('v2/calendar/student/checkin', {
                                            user_schedule_id: itemId
                                        }, function (resCallSuccess) {
                                            if (resCallSuccess.error && resCallSuccess.error === 'success') {
                                                isCheckin = true
                                                that.$$checkin.text('Đã điểm danh')
                                                LHM.common.notify(null, 'success', __('Điểm danh thành công'))
                                                setTimeout(function () {
                                                    HCalendar.listEvent(url, itemId, isManage)
                                                }, 1000)
                                            } else {
                                                if (resCallSuccess.message) {
                                                    LHM.common.notifyResponse(resCallSuccess.message)
                                                } else {
                                                    LHM.common.notify(null, 'danger', resCallSuccess.error ? resCallSuccess.error : __('Có lỗi xảy ra!!'))
                                                }
                                            }
                                        }, 'POST')
                                    }
                                    return false
                                }
                            }
                        }
                    }
                }
                buttons['cancel'] = {text: __('Đóng')}
                $.confirm({
                    title: __('Chi tiết sự kiện'),
                    columnClass: 'col-md-12',
                    content: res.html,
                    onContentReady: function () {
                        HCalendar.listEvent(url, itemId, isManage)
                        $('#user_schedule_filter_submit').click(function () {
                            HCalendar.listEvent(url, itemId, isManage)
                        })
                        if(isManage){
                            $('button.js-update-student-schedule').click(function () {
                                HCalendar.manage.updateUserSchedule(itemId)
                            })
                        }
                    },
                    buttons: buttons
                })
            } else {
                LHM.common.notify(null, 'danger', 'Sự kiện không hợp lệ')
            }
        })
    },
    loadCalendar: function (url, id, manage = true) {
        if ($(`#${id}`).length) {
            if (calendar_div[id]) {
                this.selectAll(id)
            } else {
                let currentDate = new Date();
                let year = currentDate.getFullYear(); // Năm
                let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
                let day = ('0' + currentDate.getDate()).slice(-2);
                let formattedDate = year + '-' + month + '-' + day;
                let calendarEl = document.getElementById(id);
                calendar_div[id] = new FullCalendar.Calendar(calendarEl, {
                    locale: 'vi', // Đặt locale thành 'vi' để sử dụng tiếng Việt
                    buttonText: {
                        today: 'Hôm nay',
                        month: 'Tháng',
                        week: 'Tuần',
                        day: 'Ngày',
                        // list: 'Danh sách',
                        listWeek: 'Tuần',
                        listMonth: 'Danh sách',
                        listDay: 'Ngày'
                    },
                    allDayText: 'Cả ngày',
                    headerToolbar: {
                        left: `prev,next today${manage ? ' newEvent' : ''}`,
                        center: 'title',
                        right: 'dayGridMonth,listMonth,listWeek,listDay' /*timeGridWeek,timeGridDay*/
                    },
                    initialDate: formattedDate,
                    navLinks: true, // can click day/week names to navigate views
                    selectable: true,
                    selectMirror: true,
                    customButtons: {
                        newEvent: {
                            text: __('Thêm sự kiện'),
                            click: function () {
                                if (manage) {
                                    HCalendar.editEvent(id)
                                }
                            }
                        }
                    },
                    eventClick: function (arg) {
                        if (manage) {
                            HCalendar.editEvent(id, arg.event.id)
                        } else {
                            HCalendar.viewEvent(arg.event.extendedProps.user_schedule_id, false, arg)
                        }
                        calendar_div[id].unselect()
                    },
                    datesSet: function () {
                        HCalendar.selectAll(id)
                    },
                    select: function (arg) {
                        if (manage) {
                            HCalendar.editEvent(id, null, arg)
                            calendar_div[id].unselect()
                        }
                    },
                    editable: false,
                    dayMaxEvents: true // allow "more" link when too many events
                });
                calendar_div[id].urlSelectAll = url
                setTimeout(function () {
                    calendar_div[id].render()
                })
            }
        }
    },
    manage: {
        changeLeave: function (event_id, confirm, status = 'agree') {
            HCalendar.callAjaxApi(`v2/calendar/manage/changeLeave/${event_id}`, {
                status: status
            }, function (res) {
                if (res.error && res.error === 'success') {
                    LHM.common.notify(null, 'success', __('Thao tác thành công'))
                    confirm.close()
                    $('#user_schedule_filter_submit').click()
                } else {
                    LHM.common.notify(null, 'danger', res.error ? res.error : __('Có lỗi xảy ra!!'))
                }
            }, 'POST')
        },
        eventByUser: function (user_schedule_id) {
            $.alert({
                title: 'Chi tiết học viên',
                content:
                `
                    <div class="form-list">
                    <form id="event_by_user_filter" class="display-none">
                        <button type="submit" id="event_by_user_filter_submit"></button>
                    </form>
                    <label class="label-100">Danh sách</label>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                        <thead>
                        <tr>
                        <th>#</th><th>Tiêu đề</th><th>Ngày sự kiện</th><th>Ngày tạo</th><th>Trạng thái</th>
                        </tr>
                        </thead>
                        <tbody id="event_by_user"></tbody>
                        </table>
                    </div>
                    </div>
                `,
                columnClass: 'col-md-8',
                onContentReady: function () {
                    $('#event_by_user_filter').submit(function (e) {
                        e.preventDefault()
                        LHM.common.getListTable('event_by_user', `/api/v2/calendar/manage/listEventByStudent/${user_schedule_id}`, function (res) {
                            let index = 1
                            if (res.items && res.items.length > 0) {
                                $.each(res.items, function (k, v) {
                                    let number = res.limit * res.page + index++
                                    let html =
                                        `
                                            <tr>
                                                <td>${number}</td>
                                                <td>${v.typeTitle}</td>
                                                <td>${LHM.common.convertTime(v.time['sec'], 'd/m/Y')}</td>
                                                <td>${LHM.common.convertTime(v.created_at['sec'], 'H:i d/m/Y')}</td>
                                                <td>${v.statusTitle}</td>
                                            </tr>
                                        `
                                    $('#event_by_user').append(html)
                                })
                            } else {
                                $('#event_by_user').html(`<tr><td colspan="5" class="text-center">${__('Không tồn tại dữ liệu')}</td></tr>`)
                            }
                        }, {call_api_v2: 1})
                    })
                    $('#event_by_user_filter_submit').click()
                },
            })
        },
        updateUserSchedule: function (schedule_id) {
            $.confirm({
                title: __('Xác nhận'),
                content:
                `
                <div class="font-weight-bold mb-2">${__('Hành động sẽ cập nhật những học viên mới được thêm vào khóa học')}</div>
                <label><input type="checkbox" name="delete_user"/> ${__('Xóa học viên bị xóa khỏi khóa học')}</label>
                `,
                buttons: {
                    Ok: {
                        text: __('Thực hiện'),
                        btnClass: 'btn-success',
                        action: function () {
                            HCalendar.callAjaxApi(`v2/calendar/manage/updateUserSchedule/${schedule_id}`, {
                                delete_user: $('input[name=delete_user]').prop('checked') ? 'true' : ''
                            }, function (res) {
                                if (res.error && res.error === 'success') {
                                    LHM.common.notify(null, 'success', __('Thao tác thành công'))
                                    $('#user_schedule_filter_submit').click()
                                } else {
                                    LHM.common.notify(null, 'danger', res.error ? res.error : __('Có lỗi xảy ra!!'))
                                }
                            }, 'POST')
                        }
                    },
                    cancel: { text: __('Đóng')}
                }
            })
        }
    },
    user: {
        changeTypeSchedule: function (itemId, type, that, arg = null) {
            $.confirm({
                title: __(type === 'accept' ? 'Chấp thuận' : 'Từ chối'),
                content: __(type === 'accept' ? 'Bạn chắc chắn muốn tham gia sự kiện này?' : 'Bạn chắc chắn muốn từ chối tham gia sự kiện này?'),
                buttons: {
                    Ok: {
                        text: __('Đồng ý'),
                        btnClass: type === 'accept' ? 'btn-success' : 'btn-danger',
                        action: function () {
                            HCalendar.callAjaxApi('v2/calendar/student/accept', {
                                user_schedule_id: itemId,
                                type: type
                            }, function (resCallSuccess) {
                                if (resCallSuccess.error && resCallSuccess.error === 'success') {
                                    LHM.common.notify(null, 'success', __('Thao tác thành công'))
                                    if(type === 'accept'){
                                        that.$$accept.remove()
                                        that.$$refuse.remove()
                                    }else{
                                        that.close()
                                        if(arg){
                                            arg.event.remove()
                                        }
                                    }
                                } else {
                                    if (resCallSuccess.message) {
                                        LHM.common.notifyResponse(resCallSuccess.message)
                                    } else {
                                        LHM.common.notify(null, 'danger', resCallSuccess.error ? resCallSuccess.error : __('Có lỗi xảy ra!!'))
                                    }
                                }
                            }, 'POST')
                        }
                    },
                    cancel: {
                        text: __('Đóng')
                    }
                }
            })
        },
        deleteEventLeave: function (user_schedule_event_id) {
            $.confirm({
                title: __('Xác nhận'),
                content: __('Bạn chắc chắn muốn xóa đơn xin nghỉ này?'),
                buttons: {
                    Ok: {
                        text: __('Đồng ý'),
                        btnClass: 'btn-success',
                        action: function () {
                            HCalendar.callAjaxApi(`v2/calendar/student/delete_leave/${user_schedule_event_id}`, { }, function (res) {
                                if (res.error && res.error === 'success') {
                                    LHM.common.notify(null, 'success', __('Thao tác thành công'))
                                    $('#user_schedule_filter_submit').click()
                                } else {
                                    LHM.common.notify(null, 'danger', res.error ? res.error : __('Có lỗi xảy ra!!'))
                                }
                            }, 'DELETE')
                        }
                    }, cancel: { text: __('Đóng') }
                }
            })
        }
    }
}

$(document).on('click', '#user_schedule a.change-leave', function () {
    let that = $(this), event_id = that.data('event-id')
    if(event_id){
        $.confirm({
            title: __('Xác nhận xin nghỉ'),
            content: `<div class="mb-2"><span class="font-weight-bold">${__('Lý do')}:</span> ${that.data('reason')}</div><div class="text-warning font-weight-bold">${__('Bạn có chắc chắn muốn duyệt đơn xin nghỉ này')} ?</div>`,
            buttons: {
                agree: {
                    text: __('Duyệt'),
                    btnClass: 'btn-success',
                    action: function () {
                        HCalendar.manage.changeLeave(event_id, this, 'agree')
                        return false
                    }
                },
                disagree: {
                    text: __('Từ chối'),
                    btnClass: 'btn-danger',
                    action: function () {
                        HCalendar.manage.changeLeave(event_id, this, 'disagree')
                        return false
                    }
                },
                cancel: {
                    text: __('Đóng')
                }
            }
        })
    }
}).on('click', '#user_schedule a.view-schedule-user', function () {
    let id = $(this).data('id')
    if(id){
        HCalendar.manage.eventByUser(id)
    }
})