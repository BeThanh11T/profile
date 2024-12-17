'use strict';

function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
}
function _regeneratorRuntime() {
    "use strict";

    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
    _regeneratorRuntime = function _regeneratorRuntime() {
        return exports;
    };
    var exports = {},
        Op = Object.prototype,
        hasOwn = Op.hasOwnProperty,
        defineProperty = Object.defineProperty || function (obj, key, desc) {
            obj[key] = desc.value;
        },
        $Symbol = "function" == typeof Symbol ? Symbol : {},
        iteratorSymbol = $Symbol.iterator || "@@iterator",
        asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
        toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
            generator = Object.create(protoGenerator.prototype),
            context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
        return this;
    });
    var getProto = Object.getPrototypeOf,
        NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
            define(prototype, method, function (arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg,
                    value = result.value;
                return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
                    invoke("next", value, resolve, reject);
                }, function (err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function (unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function (error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function (resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function (method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for (context.method = method, context.arg = arg;;) {
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method,
            method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [{
            tryLoc: "root"
        }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1,
                    next = function next() {
                        for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                        return next.value = undefined, next.done = !0, next;
                    };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
        return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
        return this;
    }), define(Gp, "toString", function () {
        return "[object Generator]";
    }), exports.keys = function (val) {
        var object = Object(val),
            keys = [];
        for (var key in object) keys.push(key);
        return keys.reverse(), function next() {
            for (; keys.length;) {
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i],
                    record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"),
                        hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
var uri = $(location).attr('href').split('/');
var base_url = uri[0] + '//' + uri[2];
var totalAjax = 0,
    pageNotification = 0;
function loadingProcess() {
    var div = $('#process-body');
    if (arguments.length && $.isNumeric(arguments[0])) {
        var percent = arguments[0];
        if (div.length === 0) {
            $('body').append("<div id=\"process-body\" class='d-flex'><div class=\"progress m-auto\" style='width: 700px; max-width: 90%'><div class=\"progress-bar progress-bar-striped progress-bar-animated\" role=\"progressbar\" style=\"width: " + percent + "%;\" aria-valuenow='" + percent + "' aria-valuemin=\"0\" aria-valuemax=\"100\">" + percent + "%</div></div></div>");
        } else {
            div.find('.progress-bar').css('width', percent + '%').attr('aria-valuenow', percent).text(percent + '%');
        }
    } else if (div.length === 0) {
        $('body').append("<div id=\"process-body\"><i class=\"fas fa-spinner fa-spin\"></i></div>");
    }
}
function stopLoadingProcess() {
    var div = $('#process-body');
    if (div.length) {
        div.remove();
    }
}

// loader khi su dung ajax
$(document).ajaxSend(function (event, jqXHR, ajaxOptions) {
    var requestUrl = ajaxOptions.url;
    if (!/^http/.test(requestUrl) || requestUrl.indexOf(base_url) === 0) {
        if (!ajaxOptions.not_loading) {
            if (totalAjax < 0) {
                totalAjax = 0;
            }
            totalAjax++;
            loadingProcess();
        }
    }
});
$(document).ajaxComplete(function (event, jqXHR, ajaxOptions) {
    var requestUrl = ajaxOptions.url;
    if (!/^http/.test(requestUrl) || requestUrl.indexOf(base_url) === 0) {
        if (!ajaxOptions.not_loading) {
            totalAjax--;
            if (totalAjax <= 0) {
                stopLoadingProcess();
                totalAjax = 0;
            }
        }
        if(ajaxOptions.type && ajaxOptions.type.toUpperCase() === 'POST'){
            $('input[name="_token"]').val($.cookie('_token'));
        }
    }
});
var star_replace = function star_replace() {
    $('.rate_star_replace:not(.star_change)').each(function () {
        var _$$attr;
        $(this).raty({
            starHalf: 'fas fa-fw fa-star-half-alt',
            // The name of the half star image.
            starOff: 'far fa-fw fa-star',
            // Name of the star image off.
            starOn: 'fas fa-fw fa-star',
            starType: 'i',
            score: (_$$attr = $(this).attr('data-star')) !== null && _$$attr !== void 0 ? _$$attr : 0,
            click: false,
            readOnly: true
        }).addClass('star_change');
    });
};
var removeDiv = function removeDiv(div, callback, title, content) {
    $.confirm({
        title: title !== null && title !== void 0 ? title : __('Xóa dữ liệu'),
        content: content !== null && content !== void 0 ? content : __('Bạn có chắc chắn muốn xóa dữ liệu này không?'),
        buttons: {
            Ok: {
                title: __('Đồng ý'),
                action: function action() {
                    div.remove();
                    if (callback) callback();
                }
            },
            Cancel: {
                title: __('Đóng')
            }
        }
    });
};
var load_slide = function load_slide(div, configText) {
    if (div.length && configText) {
        var config = JSON.parse(configText);
        var options = {
            dots: !!(config.dot && config.dot != '0'),
            autoplay: !(config.hide_auto_play && config.hide_auto_play != '0'),
            autoplaySpeed: LHM.common.getValueInt(config, 'speed', 3) * 1000,
            speed: 300,
            centerPadding: '20%',
            arrows: !(config.hide_arrow && config.hide_arrow != '0'),
            centerMode: !!(config.center_mode && config.center_mode != '0'),
            slidesToShow: LHM.common.getValueInt(config, 'to_show', 3),
            slidesToScroll: LHM.common.getValueInt(config, 'to_scroll'),
            rows: LHM.common.getValueInt(config, 'rows'),
            responsive: [{
                breakpoint: 800,
                settings: {
                    slidesToShow: LHM.common.getValueInt(config, 'to_show_tablet', 2),
                    slidesToScroll: LHM.common.getValueInt(config, 'to_scroll_tablet')
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: LHM.common.getValueInt(config, 'to_show_mobile'),
                    slidesToScroll: LHM.common.getValueInt(config, 'to_scroll_mobile')
                }
            }]
        };
        div.each(function () {
            if (!$(this).hasClass('is_load')) {
                var next = $(this).next(),
                    optionFor = options;
                if (next.length && next.hasClass('appendArrows')) {
                    if (config.arrow_bottom && config.arrow_bottom != '0') {
                        optionFor['appendArrows'] = next;
                    }
                    optionFor['appendDots'] = next;
                }
                $(this).slick(options);
                $(this).show().addClass('is_load');
            }
        });
    }
};
var showStudentRegister = function showStudentRegister(selector, names) {
    if ($(selector).length) {
        var runText = function runText() {
            var index = 0;
            var currentNameElement = $(selector).find('.name');
            currentNameElement.show();
            function displayNextName() {
                currentNameElement.find('.span-name').text(names[index]);
                currentNameElement.css('transform', 'translateY(0)');
                currentNameElement.css('opacity', '1');
                setTimeout(function () {
                    currentNameElement.css('transform', 'translateY(-100%)');
                    currentNameElement.css('opacity', '0');
                    setTimeout(function () {
                        index = (index + 1) % names.length;
                        currentNameElement.css('transform', 'translateY(100%)');
                        setTimeout(displayNextName, 1000);
                    }, 1000);
                }, 3000);
            }
            displayNextName();
        };
        runText();
    }
};
jconfirm.defaults = {
    type: 'blue'
};
function checkAlGroup(cur) {
    var listInput = $('input[type=checkbox].' + cur.data('id'));
    var length = listInput.length;
    if (length > 0) {
        cur.addClass('cursor-pointer').change(function () {
            listInput.prop('checked', $(this).prop('checked'));
        });
        listInput.addClass('cursor-pointer').change(function () {
            cur.prop('checked', $('input[type=checkbox].' + cur.data('id') + ':checked').length === length);
        });
    }
}
$(document).ready(function () {
    star_replace();
    $('.js-sortable').sortable();
    $('#new-notification-user .list-action button').click(function () {
        var type = $(this).data('type');
        $('#new-notification-user .list-action button').removeClass('active');
        $(this).addClass('active');
        pageNotification = 0;
        LHM.common.loadNewNotification({
            type: type,
            page: pageNotification
        });
    });
    $('body').on('click', '.category-tree a.js-open-close', function () {
        var i = $(this).find('i'),
            ul = $(this).closest('li').find('ul:first');
        i.toggleClass('fa-plus-circle fa-minus-circle');
        ul.toggleClass('d-none');
    });
    $('.js-check-all-group[type=checkbox]').each(function () {
        checkAlGroup($(this));
    });
    $('#btn_sort_course').click(function () {
        $.get('/courses/selectList', function (res) {
            if (res.items && res.items.length) {
                var content = '<div class="" id="sort_course">';
                $.each(res.items, function (k, v) {
                    content += "<div class=\"mt-2 border bg-f5 rounded px-2\" data-id=\"".concat(v._id['$id'], "\">").concat(v.name, "</div>");
                });
                $.confirm({
                    title: __('Sắp xếp khóa học'),
                    content: content + "</div>",
                    columnClass: 'col-md-6',
                    onContentReady: function onContentReady() {
                        $('#sort_course').sortable();
                    },
                    buttons: {
                        Ok: function Ok() {
                            var that = this;
                            LHM.common.confirmAjax('/courses/saveSort', 'POST', {
                                _token: $.cookie('_token'),
                                items: $('#sort_course').children().map(function () {
                                    return $(this).data('id');
                                }).get()
                            }, function (res) {
                                if (res.success) {
                                    LHM.common.notify(null, 'success', res.message ? res.message : 'Sắp xếp thành công');
                                    that.close();
                                    $('#list_schedule_courses_form').submit();
                                } else {
                                    LHM.common.notify(null, 'danger', res.message ? res.message : 'Sắp xếp thất bại');
                                }
                            }, null, __('Xác nhận'), __('Bạn có chắc chắn muốn sắp xếp lại khóa học?'));
                            return false;
                        },
                        cancel: {}
                    }
                });
            } else {
                LHM.common.notify(null, 'danger', __('Không tồn tại khóa học trên site'));
            }
        });
    });
    $('#new-notification-user .new-notification-content').click(function (event) {
        event.stopPropagation();
    });
    $('#new-notification-user').on('show.bs.dropdown', function () {
        $('#dropdown_new_notification').addClass('active');
        if ($('#new-notification-user .list-action button.active').length === 0) {
            $('#new-notification-user .list-action button:first').click();
        }
        var countNew = $('#dropdown_new_notification .count-new-notification'),
            number = parseInt(countNew.attr('data-number'));
        if (number !== 0) {
            countNew.attr('data-number', 0);
            $.ajax({
                url: "/new_notification/viewNewNotification",
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'add',
                    _token: $.cookie('_token')
                },
                not_loading: true
            });
        }
    });
    $('#new-notification-user').on('hide.bs.dropdown', function () {
        $('#dropdown_new_notification').removeClass('active');
    });
    $('#list-new-notification, #new_notification_list').on('click', 'div.new-notification-child', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var id, un_read, href;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
                case 0:
                    id = $(this).data('id'), un_read = $(this).find('.un_read:first'), href = $(this).data('href');
                    if (!un_read.length) {
                        _context.next = 6;
                        break;
                    }
                    un_read.remove();
                    $(this).removeClass('text-primary');
                    _context.next = 6;
                    return $.ajax({
                        url: "/new_notification/readNotification",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            itemId: id,
                            _token: $.cookie('_token')
                        }
                        // not_loading: true
                    });

                case 6:
                    if (!(href && href !== '')) {
                        _context.next = 28;
                        break;
                    }
                    if (!(/\/manage#/.test(window.location.href) && /\/manage#/.test(href))) {
                        _context.next = 27;
                        break;
                    }
                    href = href.replace('/manage#', '');
                    _context.t0 = href;
                    _context.next = _context.t0 === 'quiz_questions-test_result' ? 12 : _context.t0 === 'students-study' ? 15 : _context.t0 === 'students-certificate_student' ? 18 : _context.t0 === 'students-registed' ? 21 : 24;
                    break;
                case 12:
                    $("a[href=\"#quiz_questions\"]").click();
                    href = 'v-pills-test-result-student';
                    return _context.abrupt("break", 24);
                case 15:
                    $("a[href=\"#students\"]").click();
                    href = 'v-pills-report-process-study';
                    return _context.abrupt("break", 24);
                case 18:
                    $("a[href=\"#students\"]").click();
                    href = 'v-pills-student-certificate';
                    return _context.abrupt("break", 24);
                case 21:
                    $("a[href=\"#students\"]").click();
                    href = 'students-registed';
                    return _context.abrupt("break", 24);
                case 24:
                    if ($("a[href=\"#".concat(href, "\"]")).length) {
                        $("a[href=\"#".concat(href, "\"]:first")).click();
                    }
                    _context.next = 28;
                    break;
                case 27:
                    window.location.href = href;
                case 28:
                case "end":
                    return _context.stop();
            }
        }, _callee, this);
    })));
    //bắt sự kiện f5 khi làm bài thi
    $(document.body).on("keydown", this, function (event) {
        if (event.keyCode === 116 || event.ctrlKey && event.keyCode === 82) {
            if ($('#form-submit-test').length > 0 && $('.confirm-refresh-page').length === 0) {
                event.preventDefault();
                $.confirm({
                    title: 'Cảnh báo',
                    columnClass: 'confirm-refresh-page',
                    content: 'Bạn có chắc chắn muốn dừng thi?',
                    buttons: {
                        OK: {
                            text: 'OK',
                            btnClass: 'btn-blue',
                            action: function action() {
                                window.location.reload();
                            }
                        },
                        cancel: {
                            text: 'Đóng'
                        }
                    }
                });
            }
        }
    });
    LHM.common.genAllCustom();
    $('body').on('click', '.btn-search-quiz', function () {
        var quiz_find = $('.text_find_quiz').val();
        if (quiz_find) {
            window.location = base_url + '/search_quiz?key=' + quiz_find;
        }
    });
    $('body').on('keypress', '.input-number', function (event) {
        return /\d/.test(String.fromCharCode(event.keyCode || event.which));
    }).on('keypress', 'input.js-coupon', function (event) {
        return /[a-z0-9-_]/i.test(event.key);
    }).on('click', '.js_print_pdf', function () {
        if ($(this).attr('data-url') && $(this).attr('data-url') !== '') {
            var iframe = document.createElement('iframe');
            iframe.style.visibility = "hidden";
            iframe.src = $(this).attr('data-url');
            document.body.appendChild(iframe);
        }
    }).on('click', '.js-download-certificate', function () {
        var code = $(this).attr('data-code'),
            user_id = $(this).attr('data-user-id');
        $.ajax({
            type: 'GET',
            url: "".concat(base_url, "/certificates/checkCertificateLanguage/").concat(code),
            dataType: 'json',
            success: function success(items) {
                if (items.length) {
                    if (items.length === 1) {
                        window.location = items[0].link + '/' + user_id;
                    } else {
                        var content = '<div class="d-flex justify-content-around">';
                        $.each(items, function (k, v) {
                            content += "<a class=\"btn btn-default border\" href=\"".concat(v.link, "/").concat(user_id, "\">").concat(v.title, "</a>");
                        });
                        content += '</div>';
                        $.alert({
                            title: '<p class="text-center">Tải chứng chỉ</p>',
                            content: content,
                            type: 'blue'
                        });
                    }
                }
            }
        });
    }).on('click', 'button#btn-config-delete-student-map-course', function () {
        var that = $(this),
            total = that.attr('data-number'),
            checked = that.attr('data-checked');
        var content = "\n            <form id=\"config-delete-student-map-course\" class=\"font-weight-bold\">\n                <label class=\"mb-3 w-100\">\n                    <input type=\"checkbox\" name=\"status_checked\" ".concat(checked, "/> B\u1EADt c\u1EA5u h\xECnh\n                </label>\n                <div class=\"form-group d-flex\" style=\"column-gap: 10px\">\n                    <span class=\"my-auto\" style=\"flex: none\">Sau: </span>\n                    <input type=\"number\" name=\"number_delete\" class=\"input-number form-control\" value=\"").concat(total, "\" min=\"1\"/>\n                    <span class=\"my-auto\" style=\"flex: none\">ng\xE0y kh\xF4ng \u0111\u0103ng nh\u1EADp</span>\n                </div>\n                <span>H\u1EC7 th\u1ED1ng s\u1EBD t\u1EF1 \u0111\u1ED9ng x\xF3a d\u1EEF li\u1EC7u \u0111\u0103ng k\xFD kh\xF3a h\u1ECDc v\xE0 h\u1ECDc t\u1EADp c\u1EE7a nh\u1EEFng h\u1ECDc vi\xEAn th\u1EA3o m\xE3n \u0111i\u1EC1u ki\u1EC7n tr\xEAn v\xE0o l\xFAc 22h h\xE0ng ng\xE0y!</span>\n            </form>\n            ");
        $.confirm({
            title: 'Cấu hình xóa học viên tự động',
            content: content,
            buttons: {
                Ok: function Ok(event) {
                    var message = 'Đã có lỗi xảy ra. Vui lòng thử lại',
                        type = 'danger',
                        confirm = this,
                        form = $('#config-delete-student-map-course'),
                        number_day_delete = form.find('[name="number_delete"]').val(),
                        status_checked = form.find('[name="status_checked"]').prop('checked');
                    $.ajax({
                        type: 'POST',
                        url: base_url + '/users/saveSettingAuto',
                        data: {
                            _token: $.cookie('_token'),
                            number_day_delete: number_day_delete,
                            status_checked: status_checked ? '1' : ''
                        },
                        dataType: 'json',
                        success: function success(res) {
                            if (res.success) {
                                type = 'success';
                                message = res.message ? res.message : 'Cập nhật thành công';
                                if (status_checked) {
                                    that.attr('data-number', number_day_delete).attr('data-checked', 'checked');
                                } else {
                                    that.attr('data-checked', '');
                                }
                                confirm.close();
                            } else {
                                message = res.message ? res.message : 'Cập nhật thất bại';
                            }
                        }
                    }).always(function () {
                        LHM.common.notify(null, type, message);
                    });
                    return false;
                },
                Cancel: function Cancel() {}
            }
        });
    }).on('click', 'a.js-change-log-sms-banking', function () {
        var id = $(this).attr('data-id');
        if (id !== '') {
            $.confirm({
                title: "Kích hoạt tự động",
                columnClass: 'save-log-sms-banking',
                content: "<label class='w-100'>Đơn hàng: </label><input type='text' class='form-control' name='order_id' />",
                buttons: {
                    Ok: {
                        text: __('Đồng ý'),
                        action: function action() {
                            var that = this;
                            LHM.common.confirmAjax("/payment/activeLogSmsBanking/".concat(id), 'POST', {
                                _token: $.cookie('_token'),
                                order_id: $('.save-log-sms-banking input[name=order_id]').val()
                            }, function (res) {
                                var messageDefault,
                                    type = 'danger';
                                if (res.success) {
                                    messageDefault = 'Thành Công';
                                    type = 'success';
                                    setTimeout(function () {
                                        $('button#sms_banking_form_submit').click();
                                        that.close();
                                    }, 1000);
                                } else {
                                    messageDefault = 'Có lỗi xảy ra';
                                }
                                LHM.common.notifyResponse(res.message ? res.message : messageDefault, type);
                            }, null, "Xác nhận", "Bạn có chắc chắn muốn kích hoạt đơn hàng này?");
                            return false;
                        }
                    },
                    cancel: {
                        text: "Đóng lại"
                    }
                }
            });
        }
    });
    $('body').on('click', '.config-header-footer', function () {
        $.ajax({
            type: 'GET',
            url: base_url + '/pages/checkPageEnd',
            dataType: 'json',
            success: function success(res) {
                if (res.success && res.pid) {
                    window.open("/home/editPageConfig/".concat(res.pid), '_blank');
                }
            }
        });
    }).on('click', '.button-tabs .tab-item', function () {
        var parent = $(this).parent().parent(),
            id = $(this).data('id');
        parent.find('.tab-item').removeClass('active');
        $(this).addClass('active');
        parent.find('.tab-content-item').hide();
        $("#".concat(id)).show();
    }).on('click', 'button.js-add-course-relate', function () {
        var button = $(this);
        $.confirm({
            title: "Thêm sản phẩm Upsell",
            content: "Đang lấy nhật dữ liệu <i class='fa fa-spinner fa-spin'></i>",
            columnClass: 'col-md-5',
            onContentReady: function onContentReady() {
                var that = this,
                    id_except = [];
                if (button.attr('data-id')) {
                    id_except.push(button.attr('data-id'));
                }
                if ($('#list-course-relate .relate-item').length) {
                    $('#list-course-relate .relate-item').each(function () {
                        id_except.push($(this).attr('data-id'));
                    });
                }
                $.get('/courses/getListCourse', {
                    id_except: id_except
                }, function (res) {
                    var html;
                    if (res.items.length) {
                        html = '<select class="js-select2-new form-control js-option_relate" name="option_relate" multiple data-placeholder="--Chọn khóa học--">';
                        $.each(res.items, function (k, v) {
                            html += "<option value=\"".concat(v._id['$id'], "\" data-img=\"").concat(v.img, "\" data-price=\"").concat(v.price, "\" data-unit=\"").concat(res.unit, "\" data-price-sell=\"").concat(v.price_sell, "\">").concat(v.name, "</option>");
                        });
                        html += '</select>';
                    } else {
                        html = '<div>Không tồn tại khóa học upsell</div>';
                    }
                    that.$content.html(html);
                    LHM.common.genSelect2New();
                });
            },
            buttons: {
                Ok: function Ok() {
                    var content = this.$content,
                        option_relate = content.find('[name="option_relate"]');
                    if (option_relate.length && option_relate.val()) {
                        var value = option_relate.val();
                        content.find('.js-option_relate option').each(function () {
                            var relate = $(this);
                            if (relate.val() && value.indexOf(relate.val()) !== -1) {
                                var price_text = '<strong>0' + relate.data('unit') + '</strong>',
                                    price = parseInt(relate.data('price')),
                                    price_sell = parseInt(relate.data('price-sell'));
                                if (price > 0) {
                                    price_text = "<strong class=\"mr-2\">".concat(price_sell.toLocaleString().replace(/,/g, '.')).concat(relate.data('unit'), "</strong><strike>").concat(price.toLocaleString().replace(/,/g, '.'), "</strike>").concat(relate.data('unit'));
                                }
                                $('#list-course-relate').append("\n                                    <div class=\"relate-item\" data-id=\"".concat(relate.val(), "\">\n                                        <div class=\"text-center m-auto\" style=\"width: 40px\">\n                                            <input type=\"hidden\" name=\"relates[]\" value=\"").concat(relate.val(), "\"/>\n                                            <i class=\"fas fa-grip-vertical fa-6\"></i>\n                                        </div>\n                                        <div class=\"flex-1 d-flex align-items-center\" style=\"column-gap: 10px\">\n                                            <img width=\"60\" height=\"40\" src=\"").concat(relate.attr('data-img'), "\"/>\n                                            <div class=\"flex-1 font-weight-blod\">").concat(relate.text(), "</div>\n                                        </div>\n                                        <div class=\"flex-1 text-center m-auto\">\n                                        ").concat(price_text, "\n                                        </div>\n                                        <div class=\"text-center m-auto\" style=\"width: 40px\">\n                                            <a href=\"javascript:;\" class=\"remove-relate\"><i class=\"fa fa-trash\"></i></a>\n                                        </div>\n                                    </div>\n                                    "));
                            }
                        });
                    }
                },
                Cancel: function Cancel() {}
            }
        });
    }).on('click', 'a.remove-relate', function () {
        var that = $(this);
        $.confirm({
            title: 'Xóa sản phẩm upsell',
            content: 'Bạn có chắc chắn muốn xóa sản phẩm upsell này?',
            buttons: {
                Ok: {
                    text: __('Đồng ý'),
                    action: function action() {
                        that.parents('.relate-item:first').remove();
                    }
                },
                cancel: {
                    text: "Close"
                }
            }
        });
    });
    $('.js-pagination').on('click', 'a', function () {
        var parent = $(this).parents('.js-pagination:first');
        if (parent.length) {
            var input = parent.find('input:first'),
                number = parseInt(input.val()),
                type = $(this).attr('data-type');
            if (type === 'next') {
                number++;
            } else {
                number--;
            }
            number = Math.max.apply(Math, [0, number]);
            input.val(number).change();
        }
    }).on('change', 'input', function () {
        var parent = $(this).parents('.js-pagination:first');
        if (parent.length && parent.data('form') && $('#' + parent.data('form')).length && $('button#btn-' + parent.data('form')).length) {
            $('#' + parent.data('form')).find('input[name=page]').val($(this).val());
            $('button#btn-' + parent.data('form')).click();
        }
    });
    $('body').on('click', '.join_room_quiz_edubit', function () {
        var quiz_join = $('.id_join_quiz').val();
        if (quiz_join) {
            var data = {
                _token: $.cookie('_token'),
                quiz_join: quiz_join
            };
            $.ajax({
                type: 'POST',
                url: base_url + '/quiz/check_code_join',
                data: data,
                dataType: 'json',
                success: function success(res) {
                    if (!res.error && res.link) {
                        window.location = res.link;
                    } else {
                        LHM.common.notify(null, 'danger', 'Mã không đúng');
                    }
                    return false;
                }
            });
        }
    });
    $('body').on('click', '.btn-submit-popup', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var form_order = $('#formCreateContactEbook').serialize() + '&_token=' + $.cookie('_token') + '&link=' + window.location.href;
        $(this).attr('disabled', 'disabled');
        $('.loading-ebook').html('<i class="fa fa-spinner fa-spin"></i>');
        $.ajax({
            url: '/id/submitRegisterPopup',
            type: 'POST',
            data: form_order,
            success: function success(res) {
                $('.btn-submit-popup').removeAttr('disabled');
                if (res.error) {
                    $('.error-form-ebook').html('');
                    $.each(res.msg, function (index, el) {
                        $('.ebk-' + index).text(el);
                    });
                } else {
                    $('#ebook-popup').modal('hide');
                    LHM.common.notify(null, 'success', 'Đăng ký thành công');
                }
                $('.loading-ebook').html('');
            }
        });
    });

    $('body').on('click', '.show_view_page_quiz', function () {
        if (!$('#box-list-page-quiz .list-button-quiz').hasClass('show_page')) {
            $('#box-list-page-quiz .list-button-quiz').addClass("show_page");
        } else {
            $('#box-list-page-quiz .list-button-quiz').removeClass("show_page");
        }
    });
    $('body').on('click', '.blank-add-quiz-all', function () {
        $.get('/quiz/genAddTypeQuiz', function (res) {
            $.dialog({
                title: 'Chọn loại câu hỏi',
                columnClass: 'col-md-6 dialog-popup',
                content: res
            });
        });
    });
    $('body').on('click', '.view_edit_quiz', function () {
        var qid = $(this).attr("data-qid");
        window.open('/save_quiz?itemId=' + qid, '_blank');
    });
    //xem chi tiết danh sách học viên tham gia khóa học
    $('body').on('click', '.show-student-course', function () {
        var that = $(this), data = [];
        $.alert({
            title: "Danh sách học viên",
            columnClass: 'container',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/courses/listStudentOfCourse',
                    type: 'GET',
                    data: {
                        course_id: that.data('course'),
                        live_id: that.data('live')
                    }
                }).done(function (res) {
                    if (res.success) {
                        if (res.data.length > 0) {
                            var html = '<div class="row mx-0"><div class="col-3 form-group"><input type="text" class="form-control" placeholder="Tìm theo họ và tên" id="find-td-name"/></div><div class="col-3 form-group"><input type="text" class="form-control" id="find-td-email" placeholder="Tìm theo email"/></div><div class="col-3 form-group"><input type="text" class="form-control" placeholder="Tìm theo số điện thoại" id="find-td-phone"/></div></div><div class="table-responsive">' + '<table class="table">' + '<thead>' + '<tr>' + '<th width="2%">#</th>' + '<th width="11%">Họ tên</th>' + '<th width="19%">Email</th>' + '<th width="9%">Phone</th>' + '<th width="18%">Ngày đăng ký khóa học</th>' + '<th width="14%">Ngày hết hạn</th>' + '<th width="12%">Đăng nhập cuối</th>' + '<th width="3%"></th>' + '</tr>' + '</thead>' + '<tbody id="list-student-by-course">';
                            data = res.data;
                            html += '</tbody>' + '</table>' + '<div class="mt-3" id="twbsPagination-demo"></div></div>';
                            self.setContent(html);
                        } else self.setContent('Không có dữ liệu');
                    }
                }).fail(function () {}).always(function () {});
            },
            onContentReady: function () {
                if(data.length){
                    let data_search = data,
                        paginationDiv = $('#twbsPagination-demo'),
                        tbody = $('#list-student-by-course'), itemPerPage = 20;
                    const pagination = () => {
                        paginationDiv.twbsPagination('destroy');
                        if(data_search.length){
                            paginationDiv.twbsPagination({
                                totalPages: Math.ceil(data_search.length / itemPerPage),
                                visiblePages: 5,
                                onPageClick: function (event, page) {
                                    tbody.empty();
                                    data_search.slice((page - 1) * itemPerPage, page * itemPerPage).forEach((v, k) => {
                                        tbody.append('<tr class="student-row-' + v.user_id + '">' + '<td width="2%">' + ((page - 1) * itemPerPage + k + 1) + '</td>' + '<td width="11%" class="find-name">' + v.fullname + '</td>' + '<td width="19%" class="find-email">' + v.email + '</td>' + '<td width="9%" class="find-phone">' + v.phone + '</td>' + '<td width="18%">' + v.createdAt + '</td>' + '<td width="14%">' + v.end + '</td>' + '<td width="12%">' + v.last_login + '</td>' + '<td width="3%"><div><i class="fa fa-trash header_popup_view_list_student_course_delete_student" data-user-id="' + v.user_id + '" data-live-id="' + v.live_id + '" data-course-id="' + v.course_id + '" style="color: red;"></i></div></td>' + '</tr>');
                                    })
                                }
                            });
                        } else {
                            tbody.html('<tr><td colspan="7">Không có dữ liệu</td></tr>');
                        }
                    }
                    const search = () => {
                        var byName = $('#find-td-name').val(),
                            byEmail = $('#find-td-email').val(),
                            byPhone = $('#find-td-phone').val()
                        data_search = data.filter(function(item) {
                            return (!byName || item.fullname.toLowerCase().indexOf(byName.toLowerCase()) !== -1) &&
                                (!byEmail || item.email.toLowerCase().indexOf(byEmail.toLowerCase()) !== -1) &&
                                (!byPhone || item.phone.toLowerCase().indexOf(byPhone.toLowerCase()) !== -1)
                        });
                        pagination();
                    }
                    pagination();
                    $('#find-td-name, #find-td-email, #find-td-phone').on('change', search)
                    this.$content.on('click', 'i.header_popup_view_list_student_course_delete_student', function () {
                        var that = $(this)
                        $.confirm({
                            title: 'Xóa học viên',
                            columnClass: 'col-md-6',
                            content: 'Bạn có chắc muốn xóa học viên này?',
                            buttons: {
                                Ok: {
                                    text: 'OK',
                                    btnClass: 'btn-blue',
                                    action: function action() {
                                        $.ajax({
                                            url: base_url + '/courses/deleteStudent',
                                            type: 'POST',
                                            data: {
                                                live_id: that.data('live-id'),
                                                user_id: that.data('user-id'),
                                                _token: $.cookie('_token'),
                                                course_id: that.data('course-id')
                                            },
                                            success: function () {
                                                that.closest('tr').remove();
                                            },
                                            error: function (res) {
                                                LHM.common.readError(res)
                                            }
                                        })
                                    }
                                },
                                cancel: {
                                    text: 'Đóng'
                                }
                            }
                        });
                    })
                }
            }
        });
    });
    //xem chi tiết danh sách học viên trong combo
    $('body').on('click', '.show-student-combo-dethi', function () {
        var combo_id = $(this).data('id');
        $.alert({
            title: "Danh sách học viên trong combo đề thi",
            columnClass: 'col-md-12',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/combosite/getListStudentByCombo',
                    type: 'GET',
                    data: {
                        combo_id: combo_id,
                        view_list_json: 1
                    }
                }).done(function (res) {
                    if (res.success) {
                        if (res.data.length > 0) {
                            var html = '<div class="table-responsive header_popup_view_list_student_course">' + '<table class="table">' + '<thead>' + '<tr>' + '<th width="5%">#</th>' + '<th width="15%">Họ tên</th>' + '<th width="20%">Email</th>' + '<th width="12%">Phone</th>' + '<th width="15%">Ngày đăng ký</th>' + '<th width="15%">Đăng nhập cuối</th>' + '<th width="18%">Nhóm</th>' + '</tr>' + '</thead>' + '<tbody>';
                            $.each(res.data, function (k, v) {
                                html += '<tr>' + '<td width="5%">' + (k + 1) + '</td>' + '<td width="15%">' + v.fullname + '</td>' + '<td width="20%">' + v.email + '</td>' + '<td width="12%">' + v.phone + '</td>' + '<td width="15%">' + v.createdAt + '</td>' + '<td width="15%">' + v.last_login + '</td>' + '<td width="18%">' + v.group + '</td>' + '</tr>';
                            });
                            html += '</tbody>' + '</table>' + '</div>';
                            self.setContent(html);
                        } else self.setContent('Không có dữ liệu');
                    }
                }).fail(function () {}).always(function () {});
            }
        });
    });
    $('body').on('click', '.btn-upload-mdd-background', function () {
        LHM.quiz.filemanager();
        window.type_image = 'mdd_background';
    });
    $('body').on('click', '.btn-create-drag-image', function () {
        var drag_zone_length = $('.drag-zone-element').length;
        $.alert({
            title: "Chọn ảnh",
            content: 'url:' + base_url + '/uploader/genuploader?extratools=library,upimage',
            columnClass: "col-sm-8",
            buttons: {
                close: {
                    text: 'Đóng'
                }
            },
            onContentReady: function onContentReady() {
                window.filemanager = this;
                LHM.uploader.init(function (data_file) {
                    var img_url = '';
                    var img_fid = '';
                    if (data_file._id) {
                        img_url = data_file['url'];
                        img_fid = data_file['_id']['$id'];
                    } else {
                        for (var i in data_file) {
                            img_url = data_file[i]['url'];
                            img_fid = data_file[i]['fid'];
                        }
                    }
                    var content = '';
                    content += '<div class="ui-widget-content drag-zone-element drag-img-zone dgz-element-' + drag_zone_length + '">\n' +
                        // '<a href="javascript:void(0);" onclick="LHM.quiz.deleteDragDropZone(this)" class="fa-trash-img-zone"><i class="far fa-trash-alt"></i></a>\n' +
                        '<a class="fa-trash-icon-zone cursor-pointer" data-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v"></i></a>\n' + '<div class="dropdown-menu dropdown-menu-domain">\n' + '<a class="dropdown-item" href="javascript:void(0);" onclick="LHM.quiz.editDragDropZone(this,\'image\',\'' + drag_zone_length + '\')"> Chỉnh sửa </a>\n' + '\n' + '<a class="dropdown-item" href="javascript:void(0);" onclick="LHM.quiz.deleteDragDropZone(this)"> Xóa</a>\n' + '\n' + '</div>\n' + '<img src="' + img_url + '" class="drag-img-element drag-img-size img-element-' + drag_zone_length + '">\n' + '<input type="hidden" name="data_drag_zone[' + drag_zone_length + '][drag_box_content_width]" id="drag_box_content_width_' + drag_zone_length + '" class="drag-box-content-width" value="150"> \n' + '<input type="hidden" name="data_drag_zone[' + drag_zone_length + '][drag_box_content_height]" id="drag_box_content_height_' + drag_zone_length + '" class="drag-box-content-height" value="100"> \n' + '<input type="hidden" name="data_drag_zone[' + drag_zone_length + '][drag_box_content_left]" id="drag_box_content_left_' + drag_zone_length + '" class="drag-box-content-left" value="10">\n' + '<input type="hidden" name="data_drag_zone[' + drag_zone_length + '][drag_box_content_top]" id="drag_box_content_top_' + drag_zone_length + '" class="drag-box-content-top" value="10">\n' + '<input type="hidden" name="data_drag_zone[' + drag_zone_length + '][drag_box_content_detail]" id="drag_box_content_detail_' + drag_zone_length + '" class="drag-box-content-detail" value="' + img_fid + '">\n' + '<input type="hidden" name="data_drag_correct[' + drag_zone_length + ']" id="drag_correct_' + drag_zone_length + '" class="drag-correct" value="' + drag_zone_length + '">\n' + '<input type="hidden" name="data_drag_zone[' + drag_zone_length + '][drag_type]" id="drag_type' + drag_zone_length + '" class="drag-type" value="image">\n' + '</div>';
                    $('.background-image-zone').append(content);
                    $('.dgz-element-' + drag_zone_length).css('left', '10px');
                    $('.dgz-element-' + drag_zone_length).css('top', '10px');
                    $('.drag-img-element').resizable({
                        handles: "all",
                        ghost: true,
                        autoHide: true,
                        stop: function stop(event, ui) {
                            $(this).parents('.drag-img-zone').find('.drag-box-content-width').val(ui.size.width);
                            $(this).parents('.drag-img-zone').find('.drag-box-content-height').val(ui.size.height);
                        }
                    });
                    $('.drag-zone-element').draggable({
                        containment: ".background-image-zone",
                        scroll: false,
                        cursor: "move",
                        stop: function stop(event, ui) {
                            $(this).find('.drag-box-content-left').val(Math.round(ui.position.left));
                            $(this).find('.drag-box-content-top').val(Math.round(ui.position.top));
                        }
                    });
                    drag_zone_length += 1;
                    window.filemanager.close();
                });
            }
        });
    });
    $('body').on('click', '.btn-create-drag-text', function () {
        var drag_zone_length = $('.drag-zone-element').length,
            quizNew = false;
        if ($('#element-size').length) {
            quizNew = true;
            drag_zone_length = parseInt($('#element-size').val());
        }
        var html = '';
        html += '<div class="form-group">' + '<textarea id="drag_text_content" cols="100" name="drag_text_content" rows="10"></textarea>' + '</div>';
        $.confirm({
            title: 'Tạo văn bản',
            columnClass: 'col-md-8',
            type: 'blue',
            content: html,
            onContentReady: function onContentReady() {
                LHM.common.ckeditor('drag_text_content');
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        CKEDITOR.instances.drag_text_content.updateElement();
                        var drag_text_val = $('#drag_text_content').val();
                        if (drag_text_val == '') {
                            LHM.common.notify(null, 'danger', 'Bạn cần điền văn bản!');
                        } else {
                            var drag_text_resiable_class = '';
                            if (drag_text_val.includes("iframe") || drag_text_val.includes("img") || drag_text_val.includes("audio")) {
                                drag_text_resiable_class = '';
                            } else {
                                drag_text_resiable_class = 'drag-text-resiable-' + drag_zone_length;
                            }
                            var content = '';
                            content += '<div class="ui-widget-content drag-zone-element drag-text-zone dgz-element-' + drag_zone_length + ' ' + drag_text_resiable_class + '">\n' +
                                // '<a href="javascript:void(0);" onclick="LHM.quiz.deleteDragDropZone(this)" class="fa-trash-icon-zone"><i class="far fa-trash-alt"></i></a>\n' +
                                '<a class="fa-trash-icon-zone cursor-pointer" data-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v"></i></a>\n' + '<div class="dropdown-menu dropdown-menu-domain">\n' + '<a class="dropdown-item" href="javascript:void(0);" onclick="LHM.quiz.editDragDropZone(this,\'text\',\'' + drag_zone_length + '\')"> Chỉnh sửa </a>\n' + '\n' + '<a class="dropdown-item" href="javascript:void(0);" onclick="LHM.quiz.deleteDragDropZone(this)"> Xóa</a>\n' + '\n' + '</div>\n' + '<span class="drag-text-position">\n' + '' + drag_text_val + '\n' + '</span>\n' + '<input type="hidden" name="data_drag_zone[' + drag_zone_length + '][drag_box_content_left]" id="drag_box_content_left_' + drag_zone_length + '" class="drag-box-content-left" value="10">\n' + '<input type="hidden" name="data_drag_zone[' + drag_zone_length + '][drag_box_content_top]" id="drag_box_content_top_' + drag_zone_length + '" class="drag-box-content-top" value="10">\n' + '<input type="hidden" name="data_drag_zone[' + drag_zone_length + '][drag_box_content_width]" id="drag_box_content_width_' + drag_zone_length + '" class="drag-box-content-width" value="">\n' + '<input type="hidden" name="data_drag_zone[' + drag_zone_length + '][drag_box_content_height]" id="drag_box_content_height_' + drag_zone_length + '" class="drag-box-content-height" value="">\n' + '<input type="hidden" name="data_drag_zone[' + drag_zone_length + '][drag_box_content_line_height]" id="drag_box_content_line_height_' + drag_zone_length + '" class="drag-box-content-line-height" value="">\n' + '<input type="hidden" name="data_drag_zone[' + drag_zone_length + '][drag_box_content_detail]" id="drag_box_content_detail_' + drag_zone_length + '" class="drag-box-content-detail" value="">\n' + '<input type="hidden" name="data_drag_correct[' + drag_zone_length + ']" id="drag_correct_' + drag_zone_length + '" class="drag-correct" value="' + drag_zone_length + '">\n' + '<input type="hidden" name="data_drag_zone[' + drag_zone_length + '][drag_type]" id="drag_type' + drag_zone_length + '" class="drag-type" value="text">\n' + '</div>';
                            $('.background-image-zone').append(content);
                            var width = document.querySelector('.dgz-element-' + drag_zone_length).offsetWidth;
                            var height = document.querySelector('.dgz-element-' + drag_zone_length).offsetHeight;
                            $('#drag_box_content_width_' + drag_zone_length).val(width);
                            $('#drag_box_content_height_' + drag_zone_length).val(height);
                            $('#drag_box_content_line_height_' + drag_zone_length).val(height);
                            $('.dgz-element-' + drag_zone_length + ' .drag-text-position').css('line-height', height + 'px');
                            $('.dgz-element-' + drag_zone_length).css('left', '10px');
                            $('.dgz-element-' + drag_zone_length).css('top', '10px');
                            $('#drag_box_content_detail_' + drag_zone_length).val(drag_text_val);
                            if (drag_text_val.includes("iframe") || drag_text_val.includes("img") || drag_text_val.includes("audio")) {
                                drag_text_resiable_class = '';
                            } else {
                                $('.' + drag_text_resiable_class).resizable({
                                    // minHeight: 60,
                                    // minWidth: 80,
                                    alsoResize: '.drag-text-' + drag_zone_length,
                                    resize: function resize(e, ui) {
                                        $(this).find('.drag-box-content-width').val(Math.round(ui.size.width));
                                        $(this).find('.drag-box-content-height').val(Math.round(ui.size.height));
                                        $(this).find('.drag-box-content-line-height').val(Math.round(ui.size.height));
                                        $(this).find('.drag-text-position').css('line-height', ui.size.height + 'px');
                                    }
                                });
                            }
                            $('.drag-zone-element').draggable({
                                containment: ".background-image-zone",
                                scroll: false,
                                cursor: "move",
                                stop: function stop(event, ui) {
                                    $(this).find('.drag-box-content-left').val(Math.round(ui.position.left));
                                    $(this).find('.drag-box-content-top').val(Math.round(ui.position.top));
                                }
                            });
                            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                            drag_zone_length += 1;
                            if (quizNew) {
                                $('#element-size').val(drag_zone_length);
                            }
                            this.close();
                        }
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.student-test-quiz', function () {
        window.check_link_to_test_quiz = true;
        var qid = $(this).attr("data-id");
        var personal_site = $(this).attr("data-personal_site");
        $('#v-pills-test-result-student-tab').trigger('click', window.check_link_to_test_quiz);
        LHM.mnDashboard.getAllResult(0, qid);
    });
    $(".validate-hex-color").keyup(function (e) {
        var curr = this;
        var data = {
            _token: $.cookie('_token'),
            hex: this.value
        };
        $.ajax({
            type: 'POST',
            url: base_url + '/courses/regexHexColor',
            data: data,
            dataType: 'json',
            success: function success(res) {
                if (res.login && res.login == 1) {
                    if (!res.status) {
                        $(curr).css('border', '1px solid #ff0000');
                    } else {
                        $(curr).css('border', '1px solid #ced4da');
                    }
                } else if (res.login && res.login == 2) {
                    window.location = data.href;
                }
            }
        });
    });

    //xem chi tiết danh sách user đăng kí sử dụng aff trong tháng
    $('body').on('click', '.view_list_user_aff_signin', function () {
        var user_id = $(this).data('id');
        var time = $(this).data('time');
        $.confirm({
            title: 'Danh sách user',
            columnClass: 'col-md-8',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/dashboard/profit_affiliate_user_signin',
                    type: 'GET',
                    data: {
                        user_id: user_id,
                        time: time
                    },
                    success: function success(res) {
                        var html = '<div class="table-responsive">' + '<table class="table table-hover">' + '<thead>' + '<tr class="table-active">' + '<th width="5%" style="text-align: center;">TT</th>' + '<th width="35%" style="text-align: center;">Họ tên</th>' + '<th style="text-align: center;">Email</th>' + '</tr>' + '</thead>' + '<tbody id="list-profit-affiliate">';
                        if (res.data) {
                            $.each(res.data, function (k, v) {
                                html += '<tr>' + '<td style="text-align: center;">' + v.stt + '</td>' + '<td style="text-align: center;">' + v.fullname + '</td>' + '<td style="text-align: center;">' + v.email + '</td>' + '</tr>';
                            });
                        } else {
                            html = '<tr>' + '<td colspan="3" style="border:0px !important;">Không có dữ liệu</td>' + '</tr>';
                        }
                        html += '</tbody></table></div>';
                        self.setContent(html);
                    }
                });
            },
            buttons: {
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });

    //xem chi tiết danh sách order do user aff mua trong tháng
    $('body').on('click', '.view_list_all_order_aff', function () {
        var user_id = $(this).data('id');
        var time = $(this).data('time');
        $.confirm({
            title: 'Danh sách order',
            columnClass: 'col-md-10',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/dashboard/profit_affiliate_order_aff_user',
                    type: 'GET',
                    data: {
                        user_id: user_id,
                        time: time
                    },
                    success: function success(res) {
                        var html = '<div class="table-responsive">' + '<table class="table table-hover">' + '<thead>' + '<tr class="table-active">' + '<th width="5%" style="text-align: center;">TT</th>' + '<th width="15%" style="text-align: center;">Order Id</th>' + '<th width="30%" style="text-align: center;">Họ tên</th>' + '<th width="30%"style="text-align: center;">Email</th>' + '<th style="text-align: center;">Số điện thoại</th>' + '</tr>' + '</thead>' + '<tbody id="list-profit-affiliate">';
                        if (res.data) {
                            $.each(res.data, function (k, v) {
                                html += '<tr>' + '<td style="text-align: center;">' + v.stt + '</td>' + '<td style="text-align: center;">' + v.order_id + '</td>' + '<td style="text-align: center;">' + v.fullname + '</td>' + '<td style="text-align: center;">' + v.email + '</td>' + '<td style="text-align: center;">' + v.phone + '</td>' + '</tr>';
                            });
                        } else {
                            html = '<tr>' + '<td colspan="5" style="border:0px !important;">Không có dữ liệu</td>' + '</tr>';
                        }
                        html += '</tbody></table></div>';
                        self.setContent(html);
                    }
                });
            },
            buttons: {
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });

    //show layout header site
    $('.btn-edit-header-layout').on('click', function () {
        window.create_live_popup = $.confirm({
            title: 'Cài đặt header',
            columnClass: 'col-md-9 popup_header',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/sites/getNavigation?s=' + sid,
                    dataType: 'json',
                    method: 'get'
                }).done(function (data) {
                    if (data.login && data.login == 1) {
                        var html = '<div class="col-sm-12" style="padding: 15px; font-size:20px;">' + '<span class="mr-30">Chiều rộng header: </span>' + '<span class="mr-30">' + '<input class="form-check-input" type="radio" name="header_height" id="header_fullscreen" value="0" checked style="margin-top: 10px;">' + '<label class="form-check-label" for="header_fullscreen">' + 'Fullscreen' + '</label>' + '</span>' + '<span>' + '<input class="form-check-input" type="radio" id="header_container" name="header_height" value="1" style="margin-top: 10px;">' + '<label class="form-check-label" for="header_container">' + 'Container' + '</label>' + '</span>' + '</div>' + '<div class="col-sm-12">' + '<div class="table-responsive">' + '<table class="table">' + '<thead>' + '<tr>' + '<th width="35%">Title</th>' + '<th width="35%">URL</th>' + '<th width="15%">Trạng thái</th>' + '<th class="text-center" style="padding-left: 35px;">Sửa</th>' + '</tr>' + '</thead>' + '<tbody data-type="header" id="menu-header-layout-cms">';
                        var header = '';
                        data.header.forEach(function (ih) {
                            //store for edit
                            window[ih._id['$id']] = ih;
                            header += '<tr id="' + ih._id['$id'] + '">' + '<td>' + ih.title + '</td>' + '<td>' + (ih.url != '/' ? '/' + ih.url : ih.url) + '</td>' + '<td>' + (ih.on_header.status != 4 ? 'Hiển thị' : 'Ẩn') + '</td>' + '<td align="center">' + '<ul class="list-unstyled acts-li">';
                            if (ih["delete"]) {
                                header += '<li class=""><a href="javascript:;" onclick="LHM.mnDashboard.deleteLink(\'' + ih._id['$id'] + '\')" title="Xóa"><i class="far fa-trash-alt"></i> </a></li>';
                            }
                            if (ih.modify) {
                                header += '<li class=""><a href="javascript:;" onclick="LHM.mnDashboard.navAddEditLink(\'edit\', \'header\',\'' + ih._id['$id'] + '\')" title="Sửa"><i class="fas fa-edit"></i></a></li>';
                            } else {
                                header += '<li class=""><a href="javascript:;" onclick="LHM.mnDashboard.navAddEditLink(\'edit\', \'header\',\'' + ih._id['$id'] + '\', \'1\')" title="Sửa"><i class="fas fa-edit"></i></a></li>';
                            }
                            header += '</ul>' + '</td>' + '</tr>';
                        });
                        html += header;
                        html += '</tbody>' + '</table>' + '</div>' + '</div>';
                        self.setContentAppend(html);
                        setTimeout(function () {
                            $(".jconfirm-buttons").append('<a href="javascript:;" onclick="LHM.mnDashboard.navAddEditLink(\'add\', \'header\')" class="btn btn-link add_new_link_header"><i class="fa fa-plus"></i> Thêm link</a>');
                            if (data.height_header) {
                                $('input[type=radio][name=header_height][value=' + data.height_header + ']').prop('checked', true);
                                $('input[type=radio][name=header_height][value=' + data.height_header + ']').trigger('change');
                            }
                            $('.jconfirm .jconfirm-box').css('padding', '15px 0 0 0');
                            $('.jconfirm-title-c').css('border-bottom', '1px solid #333');
                            $('.jconfirm-title-c').css('padding-left', '15px');
                        }, 100);
                        setTimeout(function () {
                            $('#menu-header-layout-cms').sortable({
                                cursorAt: {
                                    top: 10
                                },
                                update: function update(e, ui) {
                                    var data = $(this).sortable('toArray', {
                                        attribute: 'id'
                                    });
                                    $.post('/sites/updateSortLink', {
                                        lid: data,
                                        type: $(e.target).data('type'),
                                        '_token': $.cookie('_token')
                                    }, function (rs) {
                                        if (rs.error) {
                                            for (var i in rs.msg) {
                                                var _error = '';
                                                for (var i in rs.msg) {
                                                    _error += '- ' + rs.msg[i] + '<br>';
                                                }
                                            }
                                        } else {}
                                    });
                                }
                            });
                        }, 500);
                    } else if (data.login && data.login == 2) {
                        window.location = data.href;
                    }
                }).fail(function () {}).always(function () {
                    //self.setContentAppend('<div>Always!</div>');
                });
            },
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            buttons: {
                formSubmit: {
                    text: 'Cập nhật',
                    btnClass: 'btn-blue btn_save_config_layout',
                    action: function action() {
                        var _this = this;
                        $('.btn_save_config_layout').html('<i class="fas fa-spinner fa-spin"></i> Đang cập nhật');
                        $(".btn_save_config_layout").attr("disabled", "disabled");
                        var data = {
                            _token: $.cookie('_token'),
                            header_height: $('input[type=radio][name="header_height"]:checked').val()
                        };
                        $.post('/sites/heighHeaderConfig', data, function (rs) {
                            if (rs.login && rs.login == 1) {
                                $('.btn_save_config_layout').html('Cập nhật');
                                $(".btn_save_config_layout").removeAttr('disabled');
                                if (!rs.error) {
                                    _this.close();
                                    LHM.common.notify(null, 'success', 'Cập nhật thành công');
                                } else {
                                    LHM.common.notify(null, 'notify', 'Có lỗi xảy ra');
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('.btn-edit-footer-layout').on('click', function () {
        window.create_live_popup = $.confirm({
            title: 'Danh sách link trong footer',
            columnClass: 'col-md-9 popup_header',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/sites/getNavigation?s=' + sid,
                    dataType: 'json',
                    method: 'get'
                }).done(function (data) {
                    if (data.login && data.login == 1) {
                        var html = '<div class="col-sm-12">' + '<div class="table-responsive">' + '<table class="table">' + '<div class="col-md-12">' + '<ul class="list-unstyled float-right acts">' + '<li><a href="javascript:;" onclick="LHM.mnDashboard.navAddEditLink(\'add\', \'footer\')" class="btn btn-link"><i class="fa fa-plus"></i> Thêm link</a></li>' + '</ul>' + '</div>' + '<thead>' + '<tr>' + '<th width="35%">Title</th>' + '<th width="35%">URL</th>' + '<th width="15%">Trạng thái</th>' + '<th></th>' + '</tr>' + '</thead>' + '<tbody data-type="footer" id="menu-footer-layout-cms">';
                        var footer = '';
                        for (var i in data.footer) {
                            var ih = data.footer[i];
                            //store for edit
                            window[ih._id['$id']] = ih;
                            footer += '<tr id="' + ih._id['$id'] + '">' + '<td>' + ih.title + '</td>' + '<td>' + (ih.url != '/' ? ih.url.indexOf('http') != -1 ? ih.url : '/' + ih.url : ih.url) + '</td>' + '<td>' + (ih.on_footer.status != 4 ? 'Hiển thị' : 'Ẩn') + '</td>' + '<td align="center">' + '<ul class="list-unstyled acts-li">';
                            if (ih.modify) {
                                footer += '<li class=""><a href="javascript:;" onclick="LHM.mnDashboard.navAddEditLink(\'edit\', \'footer\',\'' + ih._id['$id'] + '\')" title="Sửa"><i class="fas fa-edit"></i></a></li>';
                            }
                            if (ih["delete"]) {
                                footer += '<li class=""><a href="javascript:;" onclick="LHM.mnDashboard.deleteLink(\'' + ih._id['$id'] + '\')" title="Xóa"><i class="far fa-trash-alt"></i> </a></li>';
                            }
                            footer += '</ul>' + '</td>' + '</tr>';
                        }
                        html += footer;
                        html += '</tbody>' + '</table>' + '</div>' + '</div>';
                        self.setContentAppend(html);
                        setTimeout(function () {
                            $('#menu-footer-layout-cms').sortable({
                                cursorAt: {
                                    top: 10
                                },
                                update: function update(e, ui) {
                                    var data = $(this).sortable('toArray', {
                                        attribute: 'id'
                                    });
                                    $.post('/sites/updateSortLink', {
                                        lid: data,
                                        type: $(e.target).data('type'),
                                        '_token': $.cookie('_token')
                                    }, function (rs) {
                                        if (rs.error) {
                                            for (var i in rs.msg) {
                                                var _error2 = '';
                                                for (var i in rs.msg) {
                                                    _error2 += '- ' + rs.msg[i] + '<br>';
                                                }
                                            }
                                        } else {}
                                    });
                                }
                            });
                        }, 500);
                    } else if (data.login && data.login == 2) {
                        window.location = data.href;
                    }
                }).fail(function () {}).always(function () {
                    //self.setContentAppend('<div>Always!</div>');
                });
            },
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            buttons: {
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });

    // đồng bộ khóa học từ unica
    $('body').on('click', '.btn-sync-course-unica', function () {
        $.confirm({
            title: "Đồng bộ khóa học từ Unica",
            columnClass: 'col-md-10',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: '/sites/getSyncCourse',
                    dataType: 'json',
                    method: 'get'
                }).done(function (response) {
                    if (response.login && response.login == 1) {
                        var html = '';
                        html += '<div class="form-group">';
                        html += '<input type="text" class="form-control" name="token_unica" id="token_unica" placeholder="Nhập token của Giảng viên trên Unica.vn"></div>';
                        if ($.cookie('course_include')) {
                            html += '<div class="form-group"><input type="text" class="form-control" name="course_include" id="course_include" placeholder="Nhập ID khóa học cần đồng bộ tồn tại trong TOKEN(Ngăn cách nhau bởi dấu ,)(default: lấy tất cả)"></div>';
                        }
                        if (response.data.length > 0) {
                            html += '<div class="form-group">';
                            html += '<label class="label_radio">' + '<input type="radio" value="1" alt="online" name="type_overwrite_course" checked> <b>Ghi đè các khóa đã có trong hệ thống</b>' + '</label></br>';
                            html += '<label class="label_radio">' + '<input type="radio" value="2" alt="online" name="type_overwrite_course"> <b>Không ghi đè các khóa đã có trong hệ thống</b>' + '</label>';
                            html += '</div>';
                            html += '<div class="form-group">';
                            html += '<label>Tùy chọn khóa học</label>';
                            html += '<select id="course-select-sync" class="form-control" name="courses[]" multiple>';
                            $.each(response.data, function (k, v) {
                                html += '<option value="' + v.code_sync + '">' + v.name + '</option>';
                            });
                            html += '</select>';
                            html += '</div>';
                        }
                        html += '<span style="font-size:12px;">1. Không mất dung lượng lưu trữ trên edubit.</span><br>';
                        html += '<span style="font-size:12px;">2. Để lấy token của Giảng viên trên Unica: Đăng nhập Unica.vn >> Giảng viên >> Bài Giảng >> click nút "Đồng bộ edubit"</span>';
                        html += '<div class="note_sync_course text-primary" style="display: none;"><i class="fa fa-spinner fa-spin"></i> Vui lòng giữ nguyên màn hình khi đang đồng bộ khóa học!</div>';
                        html += '<div class="invalid-feedback"></div>';
                        self.setContentAppend(html);
                    } else if (response.login && response.login == 2) {
                        window.location = response.href;
                    }
                }).fail(function () {}).always(function () {
                    //self.setContentAppend('<div>Always!</div>');
                });
            },
            onContentReady: function onContentReady() {
                $('#course-select-sync').select2({
                    allowClear: true,
                    placeholder: "Tất cả khóa học"
                });
            },
            buttons: {
                formSubmit: {
                    text: 'THÊM KHÓA HỌC',
                    btnClass: 'btn-blue',
                    action: function action() {
                        $('.btn-blue').html('<i class="fas fa-spinner fa-spin"></i> ĐANG THÊM');
                        $(".btn-blue").attr("disabled", "disabled");
                        var _this = this;
                        _this.$content.find('.invalid-feedback').hide();
                        var data = {
                            _token: $.cookie('_token'),
                            key: $('#token_unica').val(),
                            type_overwrite_course: _this.$content.find('input[type=radio]:checked').val(),
                            courses: _this.$content.find('#course-select-sync').val()
                        };
                        if ($.cookie('course_include')) {
                            data.course_include = _this.$content.find('#course_include').val();
                        }
                        _this.$content.find('.note_sync_course').show();
                        $.post('/sites/syncUnica', data, function (rs) {
                            if (rs.login && rs.login == 1) {
                                $('.btn-blue').html('THÊM KHÓA HỌC');
                                $(".btn-blue").removeAttr('disabled');
                                if (!rs.error) {
                                    _this.close();
                                    LHM.common.notify(null, 'success', 'Đồng bộ dữ liệu thành công');
                                    LHM.mnDashboard.init('courses');
                                } else {
                                    _this.$content.find('.invalid-feedback').html(rs.msg).show();
                                }
                                _this.$content.find('.note_sync_course').hide();
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });

    // lấy token đồng bộ khóa học sang unica
    $('body').on('click', '.btn-get-token-sync-course-to-unica', function () {
        var token = $(this).attr('data-token');
        var html = '';
        html += '<div class="form-group col-md-11" style="padding:0px;">';
        html += '<span style="font-size:14px;">TOKEN:</span>';
        html += '<div class="input-group">';
        html += '<input readonly="readonly" type="text" class="form-control" id="token_edubit_to_unica" value="' + token + '">';
        html += '<div class="input-group-prepend">';
        html += '<button type="button" class="btn btn-success btn-save-token-sync-course-to-unica" data-id_user= "' + token + '"><i class="fas fa-copy text-primary" style="color:#fff !important;"></i> Copy</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<span style="font-size:14px;">Giảng viên có thể đồng bộ các khóa học của mình từ Edubit sang Unica.</span><br><span>Truy cập Unica.vn >> Chọn giảng viên >> Đồng bộ Edubit >> Nhập token từ Edubit >> Click đồng bộ.</span>';
        $.confirm({
            title: "Đồng bộ khóa học sang Unica.vn",
            columnClass: 'col-md-6',
            content: html,
            onContentReady: function onContentReady() {
                $('.btn-save-token-sync-course-to-unica').click(function (event) {
                    var coppy_token = $(this).attr('data-id_user');
                    LHM.common.copy_link(coppy_token, 'Đã sao chép link chia sẻ!');
                });
            },
            buttons: {
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });

    // lấy token đồng bộ khóa học sang unica.expert
    $('body').on('click', '.btn-get-token-sync-course-to-expert', function () {
        var token = $(this).attr('data-token');
        var tokenAt = $(this).attr('data-token-at');
        var html = '';
        html += '<div class="form-group col-md-11" style="padding:0px;">';
        html += '<span style="font-size:14px;">TOKEN:</span>';
        html += '<div class="input-group">';
        html += '<input readonly="readonly" type="text" class="form-control" id="token_edubit_to_expert" value="' + token + '">';
        html += '<div class="input-group-prepend">';
        html += '<button type="button" class="btn btn-success btn-save-token-sync-course-to-expert"><i class="fas fa-copy text-primary" style="color:#fff !important;"></i> Copy</button>';
        html += '</div>';
        html += '</div>';
        html += '<span><b>Tạo lúc: ' + tokenAt + '</b></span>';
        html += '</div>';
        html += '<span style="font-size:14px;">Token có thời hạn 1 ngày từ thời điểm tạo. Khi quá hạn sẽ tự động tạo lại khi tải lại trang.</span>';
        $.confirm({
            title: "Đồng bộ khóa học sang Unica.expert",
            columnClass: 'col-md-6',
            content: html,
            onContentReady: function onContentReady() {
                $('.btn-save-token-sync-course-to-unica').click(function (event) {
                    LHM.common.copy_link(token, 'Đã sao chép token!');
                });
            },
            buttons: {
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });

    // Display change password ranger
    $('.check-password-display').change(function () {
        var html = $('<div class="row"><div class="col-md-4"><div class="form-group">' + '                        <label>' + __('Mật khẩu cũ') + '</label>' + '                        <input type="password" name="old_pwd" class="form-control old_pwd" placeholder="' + __('Mật khẩu cũ') + '">' + '                    </div></div></div>' + '                    <div class="row"><div class="col-md-4"><div class="form-group">' + '                        <label>' + __('Mật khẩu mới') + '</label>' + '                        <input type="password" name="new_pwd" class="form-control new_pwd" placeholder="' + __('Mật khẩu mới') + '">' + '                    </div></div></div>' + '                    <div class="row"><div class="col-md-4"><div class="form-group">' + '                        <label>' + __('Nhắc lại mật khẩu mới') + ' </label>' + '                        <input type="password" name="re_new_pwd" class="form-control re_new_pwd" placeholder="' + __('Nhắc lại mật khẩu mới') + '">' + '                    </div></div></div>');
        /*      note = '<h1>'+loadTranslation('Tất cả khóa học')+'</h1>'+
    '<h1>'+loadTranslation('Nhắc lại mật khẩu mới')+'</h1>'*/
        // console.log(translations)

        if ($(this).is(':checked')) {
            $('.change-password-box').html(html);
        } else {
            $('.change-password-box').html('');
        }
    });
    $('.check-password-display-student').change(function () {
        var html = $('<div class="row"><div class="col-md-4"><div class="form-group">' + '                        <label>Mật khẩu mới</label>' + '                        <input type="password" name="new_pwd" class="form-control new_pwd" placeholder="Mật khẩu mới">' + '                    </div></div></div>' + '                    <div class="row"><div class="col-md-4"><div class="form-group">' + '                        <label>Nhắc lại mật khẩu mới </label>' + '                        <input type="password" name="re_new_pwd" class="form-control re_new_pwd" placeholder="Nhắc lại mật khẩu cũ">' + '                    </div></div></div>');
        if ($(this).is(':checked')) {
            $('.change-password-student-box').html(html);
        } else {
            $('.change-password-student-box').html('');
        }
    });
    $('input:radio[name=price_check]').on('change', function (e) {
        e.target.value === 'paid' ? $('#hide-paid').show() : $('#hide-paid').hide();
    });
    $('input:radio[name=price_combo_quiz_check]').on('change', function (e) {
        e.target.value === 'paid' ? $('#hide-paid-combo-quiz').show() : $('#hide-paid-combo-quiz').hide();
    });
    $('input:radio[name=price_check_document]').on('change', function (e) {
        e.target.value === 'paid' ? $('.hide-paid-document').show() : $('.hide-paid-document').hide();
    });

    /*if ($('#content_campaign').length != 0) {
    var editor = CKEDITOR.replace('content_campaign', {
        height: '300px',
        filebrowserUploadUrl: '',
        removeButtons: 'iframe,find,div,showblocks,maximize,selectall,forms,about,language,save,newpage,preview,print,templates,bidi,Youtube,Videojs,Html5audio',
    }).on('fileUploadRequest', function (evt) {
        evt.data.requestData._token = $.cookie('_token');
    });
  }*/
    $('input:radio[name=type_send]').on('change', function (e) {
        e.target.value === '1' ? $('#block_date_to_send').show() : $('#block_date_to_send').hide();
    });
    $('input:radio[name=choose_send_to]').on('change', function (e) {
        console.log(e.target.value);
        e.target.value === '1' ? $('#block_choose_course').show() : $('#block_choose_course').hide();
        e.target.value === '2' ? $('#block_list_email').show() : $('#block_list_email').hide();
        e.target.value === '3' ? $('#block_choose_course_live').show() : $('#block_choose_course_live').hide();
        e.target.value === '4' ? $('#block_email_form').show() : $('#block_email_form').hide();
    });
    $('body').on('click', '.btn-delete-email-campaign', function () {
        var email_campaign_id = $(this).data('id');
        var table = $('#list_email_campaign_cms');
        $.confirm({
            title: 'Xóa chiến dịch',
            content: 'Bạn có muốn tiếp tục không?',
            buttons: {
                Ok: function Ok() {
                    $.ajax({
                        type: 'POST',
                        url: base_url + '/sites/delete_email_campaign',
                        data: {
                            _token: $.cookie('_token'),
                            email_campaign_id: email_campaign_id
                        },
                        dataType: 'json',
                        success: function success(res) {
                            if (res.status) {
                                table.find('.email-campaign-' + email_campaign_id).remove();
                                LHM.common.notify(null, 'success', res.message);
                            } else {
                                LHM.common.notify(null, 'danger', res.message);
                            }
                        },
                        error: function error(err) {
                            LHM.common.notify(null, 'danger', 'có lỗi xảy ra');
                        }
                    });
                },
                Cancel: function Cancel() {}
            }
        });
    });

    // Upload logo site
    $('#img-user').change(function () {
        $('.form-avatar').ajaxSubmit({
            url: '/upload-avatar',
            data: {
                _token: $.cookie('_token')
            },
            success: function success(res) {
                if (res.status) {
                    if (res.upload_type == 'logos') {
                        $('#form-update-options #logo_site').attr('src', res.avatar_url);
                    } else if (res.upload_type == 'favicon' || res.upload_type == 'avatars') {
                        $('.img-user').find('img').attr('src', res.avatar_url);
                        $('.small-img').attr('src', res.avatar_url);
                    }
                    LHM.common.notify(null, 'success', res.message);
                } else {
                    LHM.common.notify(null, 'danger', res.message);
                }
            }
        });
    });

    // Upload thumb share
    $('#share_thumb_site').change(function () {
        $('.form-share_thumb').ajaxSubmit({
            url: '/upload-thumb',
            data: {
                _token: $.cookie('_token')
            },
            success: function success(res) {
                if (res.status) {
                    $('#share_thumb').attr('src', res.thumb_url);
                    LHM.common.notify(null, 'success', res.message);
                } else {
                    LHM.common.notify(null, 'danger', res.message);
                }
            }
        });
    });
    $('#img-logo-landing').change(function () {
        $('.form-logo-landing').ajaxSubmit({
            url: '/upload-avatar',
            data: {
                _token: $.cookie('_token')
            },
            success: function success(res) {
                if (res.status) {
                    if (res.upload_type == 'logos') {
                        $('#logo-landing').attr('src', res.avatar_url);
                    } else if (res.upload_type == 'favicon' || res.upload_type == 'avatars') {
                        $('.img-user-landing').find('img').attr('src', res.avatar_url);
                        $('.small-img').attr('src', res.avatar_url);
                    }
                    LHM.common.notify(null, 'success', res.message);
                } else {
                    LHM.common.notify(null, 'danger', res.message);
                }
            }
        });
    });
    $('#img-logo-layout').change(function () {
        $('.form-logo-layout').ajaxSubmit({
            url: '/upload-avatar',
            data: {
                _token: $.cookie('_token')
            },
            success: function success(res) {
                if (res.status) {
                    if (res.upload_type == 'logos') {
                        $('#logo-layout').attr('src', res.avatar_url);
                    }
                    LHM.common.notify(null, 'success', res.message);
                } else {
                    LHM.common.notify(null, 'danger', res.message);
                }
            }
        });
    });
    $('#img-favicon1').change(function () {
        var uid = $('#uid').val();
        $('.form-favicon').ajaxSubmit({
            url: '/upload-avatar',
            data: {
                _token: $.cookie('_token'),
                type: 'avatars',
                upload_avatar_student: 'student',
                user_id: uid
            },
            success: function success(res) {
                if (res.status) {
                    $('.img-favicon1').find('img').attr('src', res.avatar_url);
                    $('.small-img').attr('src', res.avatar_url);
                    LHM.common.notify(null, 'success', res.message);
                } else {
                    LHM.common.notify(null, 'danger', res.message);
                }
            }
        });
    });

    // Upload favicon
    $('#img-favicon').change(function () {
        $('.form-favicon').ajaxSubmit({
            url: '/upload-avatar',
            data: {
                _token: $.cookie('_token'),
                type: 'favicon'
            },
            success: function success(res) {
                if (res.status) {
                    if (res.upload_type == 'favicon') {
                        $('.img-favicon').find('img').attr('src', res.avatar_url);
                        $('.small-img').attr('src', res.avatar_url);
                    }
                    LHM.common.notify(null, 'success', res.message);
                } else {
                    LHM.common.notify(null, 'danger', res.message);
                }
            }
        });
    });
    $('#img-favicon_landing_page').change(function () {
        $('.form-favicon-landing').ajaxSubmit({
            url: '/upload-avatar',
            data: {
                _token: $.cookie('_token'),
                type: 'favicon'
            },
            success: function success(res) {
                if (res.status) {
                    if (res.upload_type == 'favicon') {
                        $('#favicon-landing').attr('src', res.avatar_url);
                        $('.small-img').attr('src', res.avatar_url);
                    }
                    LHM.common.notify(null, 'success', res.message);
                } else {
                    LHM.common.notify(null, 'danger', res.message);
                }
            }
        });
    });
    $('#img-favicon_layout').change(function () {
        $('.form-favicon-layout').ajaxSubmit({
            url: '/upload-avatar',
            data: {
                _token: $.cookie('_token'),
                type: 'favicon'
            },
            success: function success(res) {
                if (res.status) {
                    if (res.upload_type == 'favicon') {
                        $('#favicon-layout').attr('src', res.avatar_url);
                        $('.small-img').attr('src', res.avatar_url);
                    }
                    LHM.common.notify(null, 'success', res.message);
                } else {
                    LHM.common.notify(null, 'danger', res.message);
                }
            }
        });
    });

    // Get token
    $('body').on('click', '.btn-get-token-key', function () {
        var _this = $(this);
        var time = _this.data('time');
        var token = _this.data('token');
        var $temp = $('<input>');
        $('body').append($temp);
        $temp.val(token).select();
        document.execCommand("copy");
        $temp.remove();
        $.ajax({
            url: base_url + '/sites/update_token_time?s=' + sid,
            type: 'POST',
            data: {
                token_time: time,
                _token: $.cookie('_token')
            },
            success: function success(res) {
                if (res.status) {
                    _this.html('Copied');
                    _this.css('cursor', 'no-drop');
                } else {
                    LHM.common.notify(null, 'danger', res.message);
                }
            },
            error: function error() {
                LHM.common.notify(null, 'danger', 'Đã có lỗi xảy ra. Vui lòng thử lại');
            }
        });
    }).on('click', '.js-change-show-hide', function () {
        var id = $(this).attr('data-id');
        var parent = $('.parent-' + id);
        if (!parent.length) {
            parent = $('.chapter-no-' + id);
            if (!parent.length) parent = $('.chapter-no-' + $(this).attr('data-chapter-no'));
        }
        if (parent.length) {
            if ($(this).find('i').hasClass('fa-chevron-down')) {
                parent.find('.js-show-hide:first').hide('slow');
                $(this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-right');
            } else {
                parent.find('.js-show-hide:first').show('slow');
                $(this).find('i').removeClass('fa-chevron-right').addClass('fa-chevron-down');
            }
        }
    }).on('click', '.js-collapsed-click', function (e) {
        e.stopPropagation();
        var id = $(this).data('id');
        if (id) {
            if ($(this).find('i').hasClass('fa-minus')) {
                // đang mở
                $('.' + id).hide('slow');
            } else {
                $('.' + id).show('slow');
            }
            $(this).find('i').toggleClass('fa-minus fa-plus');
        }
    });

    // View list course of teacher
    $('body').on('click', '.btn-list-course', function () {
        var modal = $('#modalListCourse');
        var teacher_id = $(this).data('id');
        $.alert({
            title: "Danh sách lớp",
            columnClass: 'col-md-4',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/sites/listLives',
                    type: 'GET',
                    data: {
                        teacher_id: teacher_id
                    }
                }).done(function (res) {
                    if (res.success) {
                        if (res.data.length > 0) {
                            var html = '<div class="table-responsive">' + '<table class="table">' + '<tbody>';
                            $.each(res.data, function (k, v) {
                                html += '<tr>' + '<td width="80%">' + v.name + '</td>' + '<td><a target="_blank" href="' + base_url + '/preview/' + v.code + '" class="btn btn-link">Chi tiết</a></td>' + '</tr>';
                            });
                            html += '</tbody>' + '</table>' + '</div>';
                            self.setContent(html);
                        } else self.setContent('Không có dữ liệu');
                    }
                }).fail(function () {}).always(function () {});
            }
        });
    });

    // View order detail
    $('body').on('click', '.btn-view-order-aff', function () {
        var order_id = $(this).data('id');
        $.alert({
            title: __('Chi tiết đơn hàng #') + order_id,
            columnClass: 'col-md-8',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/affiliate/listOrderDetails',
                    type: 'GET',
                    data: {
                        order_id: order_id
                    }
                }).done(function (res) {
                    if (res.success) {
                        if (res.data.length > 0) {
                            var html = '<div class="table-responsive">' + '<table class="table">' + '<thead>' + '<tr>' + '<th>#</th>' + '<th>' + __('Tên sản phẩm') + '</th>' + '<th>' + __('Số lượng') + '</th>' + '<th>' + __('Đơn giá') + '</th>' + '<th>' + __('Giảm giá') + '</th>' + '<th>' + __('Tổng tiền') + '</th>' + '</tr>' + '</thead>' + '<tbody>';
                            $.each(res.data, function (k, v) {
                                html += '<tr>' + '<td width="5%">' + v.stt + '</td>' + '<td width="25%">' + v.course_class + '</td>' + '<td width="10%">' + v.qty + '</td>' + '<td width="20%">' + v.price + '</td>' + '<td width="20%">' + v.discount + '</td>' + '<td width="20%">' + Intl.NumberFormat().format(v.total) + ' đ</td>' + '</tr>';
                            });
                            if (res.discount_all != 0) {
                                html += '<tr><td colspan="4" class="text-center">' + __('Giảm giá trên tổng đơn hàng') + '</td><td>' + res.discount_all + '</td><td>' + Intl.NumberFormat().format(res.total_discount_all) + ' đ</td></tr>';
                            }
                            html += '</tbody>' + '</table>' + '</div>';
                            self.setContent(html);
                        } else self.setContent(__('Không có dữ liệu'));
                    }
                }).fail(function () {}).always(function () {});
            }
        });
    });

    // View order detail
    $('body').on('click', '.btn-view-order-agency', function () {
        var order_id = $(this).data('id');
        $.alert({
            title: __('Chi tiết đơn hàng #') + order_id,
            columnClass: 'col-md-8',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/agency/listOrderDetails',
                    type: 'GET',
                    data: {
                        order_id: order_id
                    }
                }).done(function (res) {
                    if (res.success) {
                        if (res.data.length > 0) {
                            var html = '<div class="table-responsive">' + '<table class="table">' + '<thead>' + '<tr>' + '<th>#</th>' + '<th>' + __('Tên sản phẩm') + '</th>' + '<th>' + __('Số lượng') + '</th>' + '<th>' + __('Đơn giá') + '</th>' + '<th>' + __('Giảm giá') + '</th>' + '<th>' + __('Tổng tiền') + '</th>' + '</tr>' + '</thead>' + '<tbody>';
                            $.each(res.data, function (k, v) {
                                html += '<tr>' + '<td width="5%">' + v.stt + '</td>' + '<td width="25%">' + v.course_class + '</td>' + '<td width="10%">' + v.qty + '</td>' + '<td width="20%">' + v.price + '</td>' + '<td width="20%">' + v.discount + '</td>' + '<td width="20%">' + Intl.NumberFormat().format(v.total) + ' đ</td>' + '</tr>';
                            });
                            if (res.discount_all != 0) {
                                html += '<tr><td colspan="4" class="text-center">' + __('Giảm giá trên tổng đơn hàng') + '</td><td>' + res.discount_all + '</td><td>' + Intl.NumberFormat().format(res.total_discount_all) + ' đ</td></tr>';
                            }
                            html += '</tbody>' + '</table>' + '</div>';
                            self.setContent(html);
                        } else self.setContent(__('Không có dữ liệu'));
                    }
                }).fail(function () {}).always(function () {});
            }
        });
    });

    // View order detail
    $('body').on('click', '.btn-view-membership', function () {
        var view_detail = $(this).attr('data-membership');
        var name = $(this).parents('tr').attr('data-name');
        var email = $(this).parents('tr').attr('data-email');
        var start = $(this).parents('tr').attr('data-start');
        var end = $(this).parents('tr').attr('data-end');
        var phone = $(this).parents('tr').attr('data-phone');
        var photo = $(this).parents('tr').attr('data-photo');
        var custom = $(this).parents('tr').attr('data-custom');
        var userid = $(this).parents('tr').attr('data-userid');
        var html = '';
        html = '<div class="table-responsive">' + '<p><img src="' + photo + '" width="145" height="145"></p>' + '<p><i class="fas fa-user-tie"></i> Họ tên : <strong>' + name + '</strong></p>' + '<p><i class="fas fa-envelope"></i> Email : <strong>' + email + '</strong></p>' + '<p><i class="fas fa-phone"></i> Số điện thoại : <strong>' + phone + '</strong></p>' + '<p><i class="fas fa-clock"></i> Ngày bắt đầu : <span class="text-danger">*</span> <input id="edit_start_membership" name ="edit_start_membership" value="' + start + '"></p>' + '<p><i class="fas fa-clock"></i> Ngày kết thúc : <span class="text-danger">*</span> <input id="edit_end_membership" name ="edit_end_membership" value="' + end + '"></p>';
        if (custom != '') html += '<p><i class="fas fa-file-signature"></i> Hình thức tham gia : <strong>' + custom + '</strong></p>';
        html += '<table class="table">' + '<thead>' + '<tr>' + '<th>Mô tả membership</th>' + '<th>Gói membership</th>' + '</tr>' + '</thead>' + '<tbody>';
        html += view_detail;
        html += '</tbody>' + '</table>' + '</div>';
        html += '<div class="invalid-feedback"></div>';
        $.confirm({
            title: "Chi tiết membership",
            columnClass: 'col-md-8',
            content: html,
            onContentReady: function onContentReady() {
                $('#edit_start_membership').datetimepicker({
                    format: 'd/m/Y',
                    minDate: '-2019/01/01',
                    timepicker: false
                });
                $('#edit_end_membership').datetimepicker({
                    format: 'd/m/Y',
                    minDate: '-2019/01/01',
                    timepicker: false
                });
            },
            buttons: {
                formSubmit: {
                    text: 'Cập nhật',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        _this.$content.find('.invalid-feedback').hide();
                        var edit_start_membership = this.$content.find('#edit_start_membership').val();
                        var edit_end_membership = this.$content.find('#edit_end_membership').val();
                        if (!edit_start_membership || !edit_end_membership) {
                            _this.$content.find('.invalid-feedback').html('Vui lòng nhập ngày bắt đầu và ngày kết thúc.').show();
                            return false;
                        } else {
                            $.post('/sites/edit_membership_user', {
                                userid: userid,
                                edit_start_membership: edit_start_membership,
                                edit_end_membership: edit_end_membership,
                                _token: $.cookie('_token')
                            }, function (rs) {
                                if (rs.login && rs.login == 1) {
                                    $('#v-pills-student-membership-tab').click();
                                    if (rs.error) {
                                        _this.$content.find('.invalid-feedback').html("Ngày kết thúc phải lớn hơn ngày bắt đầu.").show();
                                    } else {
                                        _this.close();
                                        LHM.common.notify(null, 'success', 'Thay đổi thông tin thanh công!');
                                    }
                                } else if (rs.login && rs.login == 2) {
                                    window.location = rs.href;
                                }
                            });
                        }
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '#list_user_quiz_test', function (e, arg) {
        var direction = LHM.mnDashboard.getCourseTest(0, 1);
    });
    $('body').on('click', '#list_quiz_test_send_link', function (e) {
        var arg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (arg == false) {
            var direction = LHM.mnDashboard.getQuizTestLink(0, 1);
        }
    });
    $('body').on('click', '#v-pills-test-student-tab', function (e) {
        var arg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (arg == false) {
            LHM.mnDashboard.init('course_test');
        }
    });
    $('body').on('click', '#quiz_start_test', function () {
        var qid = $("#quiz_info_test").find('#quiz_id').val();
        var lid = $("#quiz_info_test").find('#lesson_id').val();
        var user_id = $("#quiz_info_test").find('#user_id_app').val();
        if (!uid && !user_id) {
            window.location = base_url + '/signin?redirect=' + window.location.href;
        } else {
            if (!lid) {
                $("#header-list-quiz-edubit").hide();
                $("#header-quiz-edubit").show();
                $("#footer_quiz").show();
                $("#footer_edubit_home").hide();
                LHM.quiz.getTest(qid, "", "test", user_id);
            } else {
                LHM.quiz.getTest(qid, lid, "test", user_id);
            }
        }
    });

    //kích hoạt khóa học
    $('body').on('click', '.btn-input-active-code, .btn-active-code-site', function () {
        var code = $(this).hasClass('btn-active-code-site') ? $('#active_code_site').val() : $("#form-charge-card").find('.code').val();
        if (!code) {
            LHM.common.notify(null, 'danger', 'Vui lòng nhập mã')
        } else {
            LHM.common.callAjax('/lives/join_room', 'POST', {
                _token: $.cookie('_token'),
                code: code
            }, function (res) {
                if(res.success) {
                    $.alert({
                        title: __('Thông báo'),
                        content: res.message,
                        autoClose: 'Ok|5000',
                        type: 'blue',
                        buttons: {
                            Ok: {
                                action: function action() {
                                    window.location.href = base_url + (res.type === 'membership' ? '' : '/my-courses');
                                }
                            }
                        }
                    });
                }
            })
        }
        return false;
    });

    // submit nhập mã phòng học ảo không public
    $('body').on('click', '#submit_active_password', function () {
        var password = $("#form_active_password").find('#active_password').val();
        var live_id = $(this).attr("data-live_id");
        $.ajax({
            url: base_url + '/lives/active_password_room',
            type: 'POST',
            data: {
                _token: $.cookie('_token'),
                password: password,
                live_id: live_id
            },
            success: function success(res) {
                if (res.login && res.login == 1) {
                    if (res.error) {
                        LHM.common.notify(null, 'danger', res.message);
                    } else {
                        if (res.link) {
                            window.location = res.link;
                        }
                    }
                } else if (res.login && res.login == 2) {
                    window.location = res.href;
                }
            }
        });
    });
    $('body').on('click', '.btn-add-chapter', function () {
        var name_lesson = $('.parent').length + 1;
        var dataCourseId = $(this).data('courseid');
        var userChapterStudyTime = $(this).data('user_chapter_study_time');
        var content = "<div class=\"form-group\">\n<input type=\"text\" placeholder=\"Nh\u1EADp t\xEAn ch\u01B0\u01A1ng\" class=\"name-chapter form-control\" required value=\"Ch\u01B0\u01A1ng ".concat(name_lesson, "\"/>\n<input type=\"hidden\" name=\"dataCourseId\"  required value=\"").concat(dataCourseId, "\"/>\n        </div><p class=\"error\" style=\"color: red;\"></p>");
        if (userChapterStudyTime) {
            content += '<div  class="mb-4">\n' + '                <div class="input-group">\n' + '                    <input type="text" class="form-control" placeholder="Thời lượng chương học" name="time" value="">\n' + '                    <div class="input-group-append">\n' + '                        <span class="input-group-text" id="basic-addon2">phút</span>\n' + '                    </div>\n' + '                </div>\n' + '                <p class="error-time" style="color: red;"></p>\n' + '            </div>';
        }
        content += '<div class="form-group m-0"><label><input type="checkbox" name="hide_show_find_chapter" class="hide_show_find_lesson"><span class="label-text"></span> Copy từ một khóa học khác</label></div><div class="box-find-chapter" style="display: none"><div class="form-group"><select name="lecture_course_id" class="form-control js-select2-new" data-not-clear="1" data--ajax="/lessons/getAllCourses"><option value="">Chọn khóa học</option></select></div><div class="form-group"><select name="lecture_chapter_id" data-not-clear="1" class="form-control js-select2-new" data-url="/lessons/getLessonByCourseId" data-cascade="course_id:lecture_course_id"><option value="">Chon chương</option></select></div></div>';
        $.confirm({
            title: 'Thêm chương',
            columnClass: 'col-md-6',
            content: content,
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            onContentReady: function onContentReady() {
                // onOpen attach the events.
                LHM.common.genSelect2New();
                var that = this;
                this.$content.find('[name=hide_show_find_chapter]').click(function () {
                    that.$content.find('.box-find-chapter').toggle('slow');
                });
                that.$content.find('.name-chapter').keyup(function () {
                    $(this).addClass('u-keyup')
                })
                that.$content.find('select[name=lecture_chapter_id]').change(function () {
                    let name_chapter = that.$content.find('.name-chapter')
                    if($(this).val() && !name_chapter.hasClass('u-keyup')) {
                        name_chapter.val($(this).find('option:selected').text())
                    }
                })
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var error = this.$content.find('.error'),
                            name_chapter = this.$content.find('.name-chapter').val(),
                            hide_show_find_lesson = this.$content.find('.hide_show_find_lesson'),
                            lesson_id = this.$content.find('[name=lecture_chapter_id]').val(),
                            course_id = this.$content.find('[name=lecture_course_id]').val(),
                            dataCourseId = this.$content.find('input[name="dataCourseId"]').val(),
                            timeChapter = null;
                        error.html('');
                        if (!name_chapter) {
                            error.html('Vui lòng nhập tên chương');
                            return false;
                        }
                        if (userChapterStudyTime) {
                            timeChapter = this.$content.find('[name=time]').val();
                        }
                        if (hide_show_find_lesson.is(':checked')) {
                            if (!course_id || !lesson_id || !dataCourseId) {
                                error.html('Vui lòng chọn cả khóa học và chương');
                            } else {
                                LHM.lessons.duplicateLesson(lesson_id, dataCourseId, name_chapter, timeChapter);
                                this.close();
                            }
                        } else {
                            LHM.lessons.add_lesson_submit(name_chapter, timeChapter);
                            this.close();
                        }
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-add-site', function () {
        $.get('/sites/getPageCreateSite', function (res) {
            if (res.success) {
                $.alert({
                    title: '',
                    columnClass: 'col-md-10',
                    content: res.html,
                    type: 'blue',
                    scrollToPreviousElement: false,
                    scrollToPreviousElementAnimate: false,
                    buttons: {
                        cancel: {
                            text: 'Đóng'
                        }
                    }
                });
            } else {
                LHM.common.notify(null, 'danger', 'Rất tiếc. Mỗi tài khoản chỉ được tạo 1 website free. Xin vui lòng nâng cấp các site còn lại để tạo thêm website tiếp nhé!');
            }
        });
    });
    $('body').on('change', '.choose_site select', function () {
        var sid = $(this).val();
        if (sid != 'choose_site') {
            for (var i in window.teacher_and_course.sites) {
                if (window.teacher_and_course.sites[i]['_id']['$id'] == sid) {
                    var teachers = window.teacher_and_course.sites[i].teachers;
                    var option_teacher = '';
                    option_teacher += '<option value="' + window.teacher_and_course.current_user._id + '">' + window.teacher_and_course.current_user.fullname + '</option>';
                    for (var j in teachers) {
                        option_teacher += '<option value="' + teachers[j]._id['$id'] + '">' + teachers[j].fullname + '</option>';
                    }
                    $('select[name=teacher_id]').html('<option value="">--Chọn--</option>');
                    $('select[name=teacher_id]').html(option_teacher);
                    $('select[name=teacher_id]').removeAttr('disabled');
                }
                if (window.teacher_and_course.sites[i]['_id']['$id'] == sid) {
                    var courses = window.teacher_and_course.sites[i].courses;
                    var option_course = '';
                    for (var j in courses) {
                        option_course += '<option value="' + courses[j].code + '">' + courses[j].name + '</option>';
                    }
                    // $('select[name=course_code]').html('<option value="">-- Học tự do (Miễn phí) --</option>');
                    $('select[name=course_code]').append(option_course);
                    // $('select[name=course_code]').removeAttr('disabled');

                    $('#chk_recurring_schedule').hide();
                    $('#count_student_in_live').show();
                    $('#form_chooses_course_room').show();
                    $('select[name=room_status]').change(function () {
                        var room_status = $('select[name=room_status]').val();
                        if (room_status == 0) {
                            $('#password_room_live').show();
                        } else {
                            $('#password_room_live').hide();
                        }
                    });
                    $('#form_chooses_course_room input:radio').change(function () {
                        var val_radio = $(this).val();
                        if (val_radio == 0) {
                            var room_status = $('select[name=room_status]').val();
                            if (room_status == 0) {
                                $('#password_room_live').show();
                            } else {
                                $('#password_room_live').hide();
                            }
                            $('#select_room_status').show();
                            $('#list_course_room_live').hide();
                        } else {
                            $('#password_room_live').show();
                            $('#select_room_status').hide();
                            $('#list_course_room_live').show();
                        }
                    });
                }
            }
        } else {
            $('select[name=teacher_id]').attr('disabled', true);
            $('#form_chooses_course_room').hide();
            $('#password_room_live').hide();
            // $('select[name=course_code]').attr('disabled',true);
        }
    });

    $('body').on('click', '.btn-edit-user', function () {
        var id = $(this).parents('.item-user').attr('id');
        var gen_name = $(this).parents('.item-user').find('[alt=g]').text();
        var facebook = $(this).parents('.item-user').find('[alt=facebook]').text();
        var youtube = $(this).parents('.item-user').find('[alt=youtube]').text();
        var f = $(this).parents('.item-user').find('[alt=f]').text();
        var e = $(this).parents('.item-user').find('[alt=e]').text();
        var p = $(this).parents('.item-user').find('[alt=p]').text();
        var photo = $(this).parents('.item-user').attr('data-photo');
        var path = $(this).parents('.item-user').attr('data-path');
        var pos = $(this).attr('data-position');
        var owner = $(this).attr('data-owner');
        var formupload = "\n<input type=\"hidden\" name=\"photo\" id=\"photo\" >\n<a href=\"javascript:;\" class=\"btnupload-thumbnail btnupload\" onclick=\"LHM.courses.fileManagerUnica($(this),'#photo')\">\n<img src=\"".concat(path, "\" class=\"img-thumbnail preview-thumbnail\" style=\"width:145px;height:145px;\"></a>");
        var contents = '' + '<div class="form-group">' + '<p class="control-label">Hình đại diện</p>' + '<div class="img-teacher text-left">' + formupload + '</div>' + '</div>' + '<form id="edit-user" method="POST" enctype="multipart/form-data">' + '<div class="form-group">' + '<label>Họ tên <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Họ tên" name="fullname" value="' + f + '" class="form-control" required />' + '<div class="block-error-name area-error"></div>' + '</div>' + '<div class="form-group">' + '<label>Danh xưng : </label>' + '<input type="text" placeholder="Danh xưng" name="general_names" value="' + gen_name + '" class="form-control" required />' + '</div>' +
            // '<div class="form-group">' +
            //  '<label>Link Facebook : </label>'+
            // '<input type="text" placeholder="Link Facebook" name="facebook" value="'+ facebook +'" class="form-control" required />' +
            // '<div class="block-error-facebook area-error"></div>' +
            // '</div>' +
            // '<div class="form-group">' +
            //  '<label>Link Youtube : </label>'+
            // '<input type="text" placeholder="Link Youtube" name="youtube" value="'+ youtube +'" class="form-control" required />' +
            // '<div class="block-error-youtube area-error"></div>' +
            // '</div>' +
            '<div class="form-group">' + '<label>Email <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Email" disabled name="email" value="' + e + '" class="form-control" required />' + '<div class="block-error-email area-error"></div>' + '</div>' + '<div class="form-group">' + '<label>Số điện thoại <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Số điện thoại" name="phone" value="' + p + '" class=" form-control" required />' + '<div class="block-error-phone area-error"></div>' + '</div>';
        if (!owner) {
            contents += '<label>Vị trí: <span class="text-danger">*</span></label>' + '<div class="form-check">' + '<input class="form-check-input position" type="radio" name="position[]" id="admin" value="8">' + '<label class="form-check-label" for="admin">' + 'Admin' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input position" type="radio" id="Leader" name="position[]" value="1">' + '<label class="form-check-label" for="Leader">' + 'Sale Leader' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input position" type="radio" id="Sale" name="position[]" value="2">' + '<label class="form-check-label" for="Sale">' + 'Sale' + '</label>' + '</div>' +
                //  '<div class="form-check">' +
                //   '<input class="form-check-input position" type="radio" id="Marketing" name="position[]" value="3">' +
                //   '<label class="form-check-label" for="Marketing">' +
                //     'Marketing' +
                //   '</label>' +
                // '</div>' +
                //  '<div class="form-check">' +
                //   '<input class="form-check-input position" type="radio" id="dealer" name="position[]" value="4">' +
                //   '<label class="form-check-label" for="dealer">' +
                //     'Đại lý phân phối mã kích hoạt' +
                //   '</label>' +
                // '</div>' +
                '<div class="form-check">' + '<input class="form-check-input position" type="radio" id="CSKH" name="position[]" value="5">' + '<label class="form-check-label" for="CSKH">' + 'CSKH' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input position" type="radio" id="KT" name="position[]" value="6">' + '<label class="form-check-label" for="KT">' + 'Kế toán' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input position" type="radio" id="gv" name="position[]" value="7">' + '<label class="form-check-label" for="gv">' + 'Giảng viên' + '</label>' + '</div>' + '<br>';
        }
        contents +=
            // '<div class="form-check">' +
            //   '<input class="form-check-input" type="checkbox" name="change-pw" id="change-pw" value="change-pw">' +
            //   '<label class="form-check-label" for="change-pw">' +
            //     'Đổi mật khẩu' +
            //   '</label>' +
            // '</div>' +
            // '<div id="input-change-pw" style="display:none;margin-top:10px;">' +
            // '<div class="form-group">' +
            //  '<label>Mật khẩu <span class="text-danger">*</span> : </label>'+
            // '<input type="password" placeholder="Mật khẩu" name="password" class=" form-control" required />' +
            //  '<div class="block-error-password area-error"></div>' +
            // '</div>' +
            // '<div class="form-group">' +
            //  '<label>Xác nhận lại mật khẩu <span class="text-danger">*</span> : </label>'+
            // '<input type="password" type="text" placeholder="Xác nhận lại mật khẩu" name="repassword" class=" form-control" required />' +
            //  '<div class="block-error-repassword area-error"></div>' +
            // '</div>' +
            // '<div class="form-group">' +
            //  '<label>Thông tin giảng viên : </label>'+
            // '<textarea id="info_teacher" cols="100" name="info_teacher" rows="10">Nhập thông tin giảng viên</textarea>' +
            // '</div>' +
            '<p class="error" style="color: red;"></p>' + '</div>' + '</form>' + '<div class="invalid-feedback"></div>';
        $.confirm({
            title: 'Sửa User',
            columnClass: 'col-md-6',
            content: contents,
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            onContentReady: function onContentReady() {
                var positions = pos.split('-');
                // LHM.common.ckeditor('info_teacher');
                // CKEDITOR.instances.info_teacher.setData(window[id]);
                $('.position').each(function (index, el) {
                    if ($.inArray($(el).val(), positions) >= 0) {
                        $(el).prop('checked', true);
                    }
                });

                // Upload avatar teacher
                $('#img-teacher').change(function () {
                    $('.form-avatar-teacher').ajaxSubmit({
                        url: '/upload-avatar',
                        data: {
                            _token: $.cookie('_token')
                        },
                        success: function success(res) {
                            if (res.status) {
                                $('.img-teacher').find('img').attr('src', res.avatar_url);
                                $('.small-img').attr('src', res.avatar_url);
                                $('#photo').val(res.filename);
                                LHM.common.notify(null, 'success', res.message);
                            } else {
                                LHM.common.notify(null, 'danger', res.message);
                            }
                        }
                    });
                });
            },
            buttons: {
                formSubmit: {
                    text: 'Cập nhật',
                    btnClass: 'btn-blue btn-edit-teacher-popup',
                    action: function action() {
                        var _this = this;
                        _this.$content.find('.invalid-feedback').hide();
                        // CKEDITOR.instances.info_teacher.updateElement();
                        var form = _this.$content.find('form').serialize();
                        form += '&_token=' + $.cookie('_token') + '&id=' + id + '&photo=' + $('#photo').val();
                        $('.btn-edit-teacher-popup').html('<i class="fas fa-spinner fa-spin"></i> OK');
                        $('.btn-edit-teacher-popup').attr('disabled', true);
                        $.post('/id/updateUser/edit', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                $('.btn-edit-teacher-popup').html('OK');
                                $('.btn-edit-teacher-popup').removeAttr('disabled');
                                if (rs.error) {
                                    _this.$content.find('.area-error').html('');
                                    $.each(rs.msg, function (index, el) {
                                        _this.$content.find('.block-error-' + index).html('<p class="text-danger">' + el + '</p>');
                                    });
                                } else {
                                    var str_position = [];
                                    window[rs.data._id['$id']] = rs.data.info;
                                    $.each(rs.data.position, function (index, el) {
                                        str_position[index] = index;
                                    });
                                    var html = '<tr class="item-user" id="' + id + '"data-photo="' + rs.data.photo + '" data-path="' + rs.data.avatar + '">' + '<td>-</td>' + '<td alt="facebook" style="display:none;">' + (rs.data.facebook || ' ') + '</td>' + '<td alt="youtube" style="display:none;">' + (rs.data.youtube || ' ') + '</td>' + '<td alt="f">' + rs.data.fullname + '</td>' + '<td alt="pl">' + rs.data.data_position_text + '</td>' + '<td alt="g" style="display:none;">' + (rs.data.general_names || ' ') + '</td>' + '<td alt="e">' + rs.data.email + '</td>' + '<td alt="p">' + rs.data.phone + '</td>';
                                    if (rs.data.is_owner) {
                                        html += ' <td align="center">' + '<ul class="list-unstyled acts-li">' + '           <li><a href="javascript:;" class="btn-edit-user" data-owner="1" data-position="' + str_position.join('-') + '"><i class="fas fa-info-circle"></i> Sửa</a></li>' + '           </ul>' + ' </td>';
                                    } else {
                                        html += '<ul class="list-unstyled acts-li">' + '   <li><td><a href="javascript:;" class="btn-apply-permission"><i class="far fa-check-square"></i> Phân quyền</a></td></li>' + '   <li><td><a href="javascript:;" class="btn-edit-user" data-position="' + str_position.join('-') + '"><i class="fa fa-edit"></i> Sửa </a></td></li>' + '   <li><td><a href="javascript:;" onclick=LHM.mnDashboard.removeUser(this,"' + rs.data._id['$id'] + '")><i class="fa fa-trash deletes"></i> Xóa</a></td></li>' + '</ul>';
                                    }
                                    '</tr>';
                                    // LHM.common.checkTableData($('#dashboard #v-pills-users tbody'), html, id);
                                    LHM.mnDashboard.init('users');
                                    LHM.common.notify(null, 'success', 'Cập nhật thành công');
                                    _this.close();
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-add-membership', function () {
        $.confirm({
            title: 'Thêm membership',
            columnClass: 'dialog-add-membership col-md-6',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/sites/create_membership',
                    type: 'GET',
                    success: function success(res) {
                        if (res.login && res.login == 1) {
                            if (res.success) {
                                if (res.data) {
                                    var pass_default = res.pass_default ? res.pass_default : '';
                                    var html = '<div class="input-add-user">' + '<form id="add-user-non-account" method="POST" enctype="multipart/form-data">' + '<input type="hidden" name="type" value="non-account">' + '<input type="hidden" name="trail" value="month">' + '<div class="form-group hidden-div">' + '<label>Họ tên <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Họ tên" name="fullname" class="form-control" required />' + '<div class="block-error-name area-error"></div>' + '</div>' + '<div class="form-group">' + '<label>Email <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Nhập email học viên" name="email" class="form-control" required id="email-user-non-account"/>' + '<div class="block-error-email area-error"></div>' + '</div>' + '<div class="form-group hidden-div">' + '<label>Số điện thoại : </label>' + '<input type="text" placeholder="Số điện thoại" name="phone" class=" form-control" required />' + '<div class="block-error-phone area-error"></div>' + '</div>' + '<div class="form-group hidden-div">' + '<label>Mật khẩu <span class="text-danger">*</span> : </label>' + '<input type="password" placeholder="Mật khẩu" name="password" value="' + pass_default + '" class=" form-control" required />' + '<div class="block-error-password area-error"></div>' + '</div>' + '<div class="form-group hidden-div">' + '<label>Xác nhận lại mật khẩu <span class="text-danger">*</span> : </label>' + '<input type="password" placeholder="Xác nhận lại mật khẩu" name="repassword" value="' + pass_default + '" class=" form-control" required />' + '<div class="block-error-repassword area-error"></div>' + '</div>';
                                    html += '<div class="form-group">' + '<label>Gói Membership: <span class="text-danger">*</span></label>';
                                    $.each(res.data, function (k, v) {
                                        if (!v.type) v.type = 'month';
                                        if (v.month == 'unlimit') var m = 'Không giới hạn - ' + v.price_per_month_format + 'đ';else var m = v.month + (v.type === 'day' ? ' ngày' : ' tháng') + ' - ' + v.price_per_month_format + ' đ/tháng';
                                        html += '<div class="form-check">' + '<input class="form-check-input" type="radio" class="period" name="period" data-type="' + v.type + '" value="' + v.month + '" id="' + v.month + '">' + '<label class="form-check-label" class="lbl-membership" for="' + v.month + '">' + m + '</label>' + '</div>';
                                    });
                                    html += '<div class="block-error-period area-error"></div>';
                                    html += '</div>' + '<h6>Nhập từ file excel (<a href="/data/sites/import_user_course.xlsx">Tải mẫu</a>)</h6>' + '<div class="form-group">    ' + '<label for="file_excel_user_course_membership" style="color: #007bff;"><i class="fa fa-upload"></i> UPLOAD FILE  </label> <a></a>' + '<input type="file" name="file_excel_user_course_membership" id="file_excel_user_course_membership" style="display:none;" >' + '<script type="text/javascript">' + '$("#file_excel_user_course_membership").change(function() {' + 'var i = $(this).prev("a").clone();' + 'var file = $("#file_excel_user_course_membership")[0].files[0].name;' + '$(this).prev("a").text(file);' + '});' + '</script>' + '</div>  ' + '</form>';
                                    html += '<div class="block-error-upload_file area-error"></div>';
                                    html += '</form>';
                                    html += '<div class="invalid-feedback"></div></div>';
                                    self.setContent(html);
                                }
                            } else {
                                self.buttons.formSubmit.hide();
                                self.setContent('<p class="text-danger">Cài đặt membership chưa được xác định - Click <a href="#" class="redirect-to-membership">VÀO ĐÂY</a> để cài đặt</p>');
                            }
                        } else if (res.login && res.login == 2) {
                            window.location = res.href;
                        }
                    }
                });
            },
            onContentReady: function onContentReady() {
                $('#add-user-non-account input[name="period"]').click(function () {
                    if ($(this).attr('data-type')) {
                        $('#add-user-non-account input[name="trail"]').val($(this).attr('data-type'));
                    }
                });
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        $('.btn-blue').html('<i class="fas fa-spinner fa-spin"></i> Đang tạo');
                        $(".btn-blue").attr("disabled", "disabled");
                        $('#add-user-non-account').ajaxSubmit({
                            type: 'POST',
                            url: base_url + '/sites/create_membership',
                            data: {
                                _token: $.cookie('_token')
                            },
                            dataType: 'json',
                            success: function success(data) {
                                if (data.login && data.login == 1) {
                                    var _this = this;
                                    $('.btn-blue').html('OK');
                                    $(".btn-blue").removeAttr('disabled');
                                    $('#v-pills-student-membership-tab').click();
                                    if (data.error) {
                                        $('.area-error').html('');
                                        $.each(data.msg, function (index, el) {
                                            $('.block-error-' + index).html('<p class="text-danger">' + el + '</p>');
                                        });
                                        if (data.no_account) {
                                            $('.hidden-div').show();
                                        }
                                    } else {
                                        if (data.success) {
                                            LHM.common.notify('', 'success', data.success);
                                        } else {
                                            LHM.common.notify('', 'success', 'Gắn khóa học thành công');
                                        }
                                        $('.btn-default').click();
                                    }
                                } else if (data.login && data.login == 2) {
                                    window.location = data.href;
                                }
                            },
                            error: function error(err) {
                                LHM.common.notify(null, 'danger', 'có lỗi xảy ra trong quá trình upload');
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-add-student-no-add-course, .btn-add-student-excel-no-add-course', function () {
        var textPlus = $(this).hasClass('btn-add-student-no-add-course') ? 'Email' : 'Excel';
        var items;
        $.confirm({
            title: 'Thêm học viên bằng ' + textPlus,
            columnClass: 'col-md-6',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/sites/getFormCreateStudent?by=' + textPlus,
                    type: 'GET',
                    success: function success(res) {
                        if (res.html) {
                            self.setContent(res.html);
                        } else {
                            self.buttons.formSubmit.hide();
                            self.setContent('<p class="text-danger">Đã xảy ra lỗi! Vui lòng thử lại sau</p>');
                        }
                    }
                });
            },
            onContentReady: function onContentReady() {
                if (textPlus === 'Excel') {
                    $("#form-add-account-cms #file_excel_user").change(function () {
                        var that = this;
                        $('#form-add-account-cms .file-name').text(that.files[0].name);
                        readFileExcel(that, function (excelData) {
                            items = excelData;
                            $('#form-add-account-cms .data-text').text('Dữ liệu đã nhận: ' + excelData.length + ' dữ liệu');
                        });
                    });
                }
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this,
                            itemExcels = items ? items.slice() : [];
                        var data = $('#form-add-account-cms').serialize();
                        if (textPlus !== 'Excel') {
                            LHM.common.callAjax('/sites/createStudentCMSByEmail', 'POST', data + '&_token=' + $.cookie('_token'), function () {
                                _this.close();
                            });
                        } else {
                            if (!itemExcels || itemExcels.length === 0) {
                                LHM.common.notify(null, 'danger', 'Thiếu file excel hoặc dữ liệu file excel không tồn tại');
                            } else if (itemExcels.length > 2000) {
                                LHM.common.notify(null, 'danger', 'Dữ liệu file excel vượt quá 2000 kết quả. vui lòng xóa bớt dữ liệu');
                            } else {
                                var processAddExcel = function processAddExcel(page) {
                                    var dataExcel = itemExcels.splice(0, limit);
                                    if (dataExcel.length) {
                                        var dataProcess = data + '&_token=' + $.cookie('_token') + '&page=' + page + '&' + $.param({
                                            items: dataExcel
                                        });
                                        $.ajax({
                                            type: 'POST',
                                            url: '/sites/createStudentCMSByExcel',
                                            data: dataProcess,
                                            not_loading: true,
                                            dataType: 'json'
                                        }).always(function (res) {
                                            percent = Math.ceil(100 * (limit * page + dataExcel.length) / totalItem);
                                            loadingProcess(percent);
                                            if (res.items && res.items.length) {
                                                dataResult = dataResult.concat(res.items);
                                            }
                                            processAddExcel(++page);
                                        });
                                    } else {
                                        stopLoadingProcess();
                                        LHM.common.notify(null, 'success', 'Đã import xong dữ liệu! Bạn vui lòng kiểm tra kết quả trả về');
                                        var html = '';
                                        $.each(dataResult, function (k, v) {
                                            var class_tr = 'color-while bg-danger';
                                            if (v[2] && v[2] === '1') class_tr = '';
                                            html += '<tr class="' + class_tr + '"><td>' + (k + 1) + '</td><td>' + (v[0] ? v[0] : '') + '</td><td>' + (v[1] ? v[1] : '') + '</td></tr>';
                                        });
                                        $.confirm({
                                            title: "Kết quả import Excel",
                                            columnClass: 'col-md-6 col-10',
                                            content: '<div class="table-responsive"><table class="table table-bordered"><thead><tr><th>#</th><th>Email</th><th>Kết quả</th></tr></thead><tbody>' + html + '</tbody></table></div>',
                                            buttons: {
                                                Ok: function Ok() {
                                                    LHM.mnDashboard.getStudents.getUserRegisted(0);
                                                }
                                            }
                                        });
                                        _this.close();
                                    }
                                };
                                var limit = 20;
                                var totalItem = itemExcels.length;
                                var percent = 0;
                                var dataResult = [];
                                data += '&limit=' + limit;
                                LHM.common.notify(null, 'success', 'Hệ thông đang tiến hành thêm dữ liệu. Xin vui lòng đợi');
                                loadingProcess(0);
                                processAddExcel(0);
                            }
                        }
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-import-quiz-question', function () {
        $.confirm({
            title: 'Import câu hỏi từ Excel',
            columnClass: 'dialog-add-membership col-md-6',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: '<div class="add-excel-quiz-question">' + '<div id="exist-account" style="margin-top: 10px;">' + '<form id="add-excel-quiz-question" class="active" method="POST" enctype="multipart/form-data">' + '<input type="hidden" name="type" value="0">' + '<h6>Nhập từ file excel (<a href="/data/sites/import_quiz_question.xlsx">Tải mẫu</a>)</h6>' + '<div class="form-group">    ' + '<label for="file_excel_question" style="color: #007bff;"><i class="fa fa-upload"></i> UPLOAD FILE  </label> <a></a>' + '<input type="file" name="file_excel_question" id="file_excel_question" style="display:none;" >' + '<script type="text/javascript">' + '$("#file_excel_question").change(function() {' + 'var i = $(this).prev("a").clone();' + 'var file = $("#file_excel_question")[0].files[0].name;' + '$(this).prev("a").text(file);' + '});' + '</script>' + '</div>  ' + '<div class="form-group">' + '<div class="block-error-assign_course text-danger"></div>' + '</div>' + '</form>' + '</div></div>',
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue btn-import-excel-quiz-question-popup',
                    action: function action(type) {
                        var self = this;
                        $('#add-excel-quiz-question').ajaxSubmit({
                            type: 'POST',
                            url: base_url + '/quiz/import_excel_quiz_question',
                            data: {
                                _token: $.cookie('_token'),
                                check_post: 1,
                                category_id: sessionStorage.getItem('folder_quiz')
                            },
                            dataType: 'json',
                            beforeSubmit: function beforeSubmit() {
                                $('.block-error-assign_course').html('');
                                $('.btn-import-excel-quiz-question-popup').html('<i class="fas fa-spinner fa-spin"></i> OK');
                                $(".btn-import-excel-quiz-question-popup").attr("disabled", "disabled");
                            },
                            success: function success(data) {
                                if (data.error) {
                                    $.each(data.msg, function (index, el) {
                                        $('.block-error-assign_course').append('<span>' + el + '</span><br>');
                                    });
                                } else {
                                    LHM.common.notify('', 'success', data.success ? data.success : 'Thêm mới câu hỏi thành công');
                                    self.close();
                                    $('#v-pills-bank-question-tab').click();
                                }
                                $('.btn-import-excel-quiz-question-popup').html('OK');
                                $(".btn-import-excel-quiz-question-popup").removeAttr('disabled');
                            },
                            error: function error() {
                                $('.btn-import-excel-quiz-question-popup').html('OK');
                                $(".btn-import-excel-quiz-question-popup").removeAttr('disabled');
                                $('.block-error-assign_course').append('<p class="text-danger">có lỗi xảy ra trong quá trình upload</p>');
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.import-quiz-question-to-doc', function () {
        var testId = '',
            submit = true,
            textTest = '';
        if ($(this).attr('data-test')) {
            testId = $(this).attr('data-test');
            textTest = '<label class="w-100"><input type="checkbox" name="delete_quiz_old" /> Xóa câu hỏi cũ đã tồn tại trong đề</label>';
        }
        var content = "\n                <div class=\"add-excel-quiz-question\">\n                    <div id=\"exist-account\" style=\"margin-top: 10px;\">\n                        <form id=\"add-doc-quiz-question\" class=\"active\" method=\"POST\" enctype=\"multipart/form-data\">\n                            <input type=\"hidden\" name=\"_token\" value=\"".concat($.cookie('_token'), "\"/>\n                            <input type=\"hidden\" name=\"test_id\" value=\"").concat(testId, "\" />\n                            <h6>\n                                H\u01B0\u1EDBng d\u1EABn nh\u1EADp c\xE2u h\u1ECFi t\u1EEB file word<br/>\n                                (<a href=\"/data/sites/HDSD_Word.docx?v=1.0.1\">File h\u01B0\u1EDBng d\u1EABn</a>)\n                            </h6>\n                            ").concat(textTest, "\n                            <div class=\"form-group\">\n                                <h6>Tag b\u1ED5 sung:</h6>\n                                <input type=\"text\" class=\"form-control\" placeholder=\"M\u1ED7i tag \u0111\u01B0\u1EE3c ng\u0103n c\xE1ch nhau b\u1EDFi d\u1EA5u ;\" name=\"tag_plus\"/>\n                            </div>\n                            <label for=\"file_doc_question\" style=\"color: #007bff;\">\n                            <i class=\"fa fa-upload\"></i> \n                            UPLOAD FILE  \n                            <span class=\"title-file\" style=\"color: #000\"></span>\n                            </label>\n                            <input type=\"file\" name=\"file_doc_question\" id=\"file_doc_question\" style=\"display:none;\" accept=\".doc,.docx\">\n                            <div class=\"block-error-import_doc text-danger my-2\"></div>\n                        </form>\n                    </div>\n                </div>\n            ");
        $.confirm({
            title: 'Import câu hỏi từ word',
            columnClass: 'dialog-add-membership col-md-5',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: content,
            onContentReady: function onContentReady() {
                $("#file_doc_question").change(function () {
                    var textFile = '',
                        file = $("#file_doc_question")[0].files;
                    if (file.length > 0) {
                        textFile = file[0].name;
                    }
                    $('span.title-file').text(textFile);
                });
                $('.jconfirm-title-c').addClass('text-center');
                if(sessionStorage.getItem('folder_quiz')) {
                    $('#add-doc-quiz-question').append('<input type="hidden" name="category_id" value="'+sessionStorage.getItem('folder_quiz')+'">');
                }
            },
            buttons: {
                formSubmit: {
                    text: 'Lưu',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var self = this;
                        if (submit) {
                            submit = false;
                            var divError = $('.block-error-import_doc');
                            $('#add-doc-quiz-question').ajaxSubmit({
                                type: 'POST',
                                url: base_url + '/quiz/import_doc_quiz_question',
                                dataType: 'json',
                                beforeSubmit: function beforeSubmit() {
                                    divError.html('Hệ thống đang convert câu hỏi. Xin vui lòng đợi trong giây lát!');
                                    self.buttons.formSubmit.setText('<i class="fas fa-spinner fa-spin"></i> Đang lưu');
                                },
                                success: function success(data) {
                                    if (data.success) {
                                        LHM.common.notify(null, 'success', data.msg ? data.msg : 'Import câu hỏi thành công');
                                        if (testId === '') {
                                            setTimeout(function () {
                                                $('#v-pills-bank-question-tab').click();
                                            }, 1000);
                                            self.close();
                                        } else {
                                            window.location.reload();
                                        }
                                    } else {
                                        divError.html('');
                                        $.each(data.msg, function (index, el) {
                                            divError.append('<span>' + el + '</span><br>');
                                        });
                                        submit = true;
                                        self.buttons.formSubmit.setText('Lưu lại');
                                    }
                                },
                                error: function error() {
                                    LHM.common.notify(null, 'warning', 'Có lỗi xảy ra trong quá trình upload');
                                    self.close();
                                }
                            });
                        }
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-add-student', function () {
        var itemExcels;
        $.confirm({
            title: 'Thêm học viên',
            columnClass: 'dialog-add-membership col-md-8',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: '<form id="form-pills-student-register">' + $('#v-pills-student-register-template').html() + '</form>',
            onContentReady: function onContentReady() {
                $("#form-pills-student-register #file_excel_user").change(function () {
                    var that = this;
                    $('#form-pills-student-register .file-name').text(that.files[0].name);
                    readFileExcel(that, function (excelData) {
                        itemExcels = excelData;
                        $('#form-pills-student-register .data-text').text('Dữ liệu đã nhận: ' + excelData.length + ' dữ liệu');
                    });
                });
                $('#form-pills-student-register .config-product select').addClass('js-select2-new');
                LHM.common.genSelect2New();
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-success',
                    action: function action() {
                        var _this = this,
                            items = itemExcels ? itemExcels.slice() : [];
                        var limit = 20;
                        var email = $('#form-pills-student-register [name=email]').val();
                        var totalItem = items.length;
                        if (email) {
                            totalItem++;
                            items.push({
                                'full_name': $('#form-pills-student-register [name=full_name]').val(),
                                'email': email,
                                'phone': $('#form-pills-student-register [name=phone]').val(),
                                'password': $('#form-pills-student-register [name=password]').val(),
                                'source': 'cms'
                            });
                        }
                        if (totalItem > 0) {
                            var endProcessForm = function endProcessForm() {
                                stopLoadingProcess();
                                LHM.common.notify(null, 'success', 'Đã import xong dữ liệu! Bạn vui lòng kiểm tra kết quả trả về');
                                var html = '',
                                    totalSuccess = 0,
                                    closeAll = true;
                                $.each(dataResult, function (k, v) {
                                    var class_tr = 'color-while bg-danger';
                                    if (v[2] && v[2] === '1') {
                                        class_tr = '';
                                        totalSuccess++;
                                    } else closeAll = false;
                                    html += '<tr class="' + class_tr + '"><td>' + (k + 1) + '</td><td>' + (v[0] ? v[0] : '') + '</td><td>' + (v[1] ? v[1] : '') + '</td></tr>';
                                });
                                if (totalSuccess > 0) {
                                    $('.btn-filter-retail').click();
                                }
                                if (!closeAll && itemExcels) {
                                    itemExcels = null;
                                    $('#form-pills-student-register .data-text').text('');
                                }
                                $.confirm({
                                    title: "Kết quả import Excel",
                                    columnClass: 'col-md-6 col-10',
                                    content: '<div class="table-responsive"><table class="table table-bordered"><thead><tr><th>#</th><th>Email</th><th>Kết quả</th></tr></thead><tbody>' + html + '</tbody></table></div>',
                                    buttons: {
                                        Ok: {
                                            text: __('Đóng'),
                                            btnClass: 'btn-primary',
                                            action: function action() {
                                                if (closeAll) {
                                                    _this.close();
                                                }
                                            }
                                        }
                                    }
                                });
                                // _this.close();
                            };
                            var processForm = function processForm(page) {
                                var dataExcel = items.splice(0, limit);
                                if (dataExcel.length) {
                                    var dataProcess = data + '&_token=' + $.cookie('_token') + '&page=' + page + '&' + $.param({
                                        items: dataExcel
                                    });
                                    $.ajax({
                                        type: 'POST',
                                        url: '/students/createStudentMapCourse',
                                        data: dataProcess,
                                        not_loading: true,
                                        dataType: 'json'
                                    }).done(function (res) {
                                        if (res.show_message) {
                                            loadingProcess(100);
                                            stopLoadingProcess();
                                            LHM.common.notify(null, 'info', res.show_message);
                                            _this.close();
                                            $('.btn-filter-retail').click();
                                        } else {
                                            percent = Math.ceil(100 * (limit * page + dataExcel.length) / totalItem);
                                            loadingProcess(percent);
                                            if (res.items && res.items.length) {
                                                dataResult = dataResult.concat(res.items);
                                            }
                                            processForm(++page);
                                        }
                                    }).fail(function (jqXHR) {
                                        stopLoadingProcess();
                                        LHM.common.readError(jqXHR);
                                        if (page > 0) {
                                            dataResult.push(['kết thúc', 'có lỗi xảy ra']);
                                            endProcessForm();
                                        }
                                    });
                                } else {
                                    endProcessForm();
                                }
                            };
                            var percent = 0,
                                dataResult = [];
                            var data = $('#form-pills-student-register').serialize();
                            LHM.common.notify(null, 'success', 'Hệ thông đang tiến hành thêm dữ liệu. Xin vui lòng đợi');
                            loadingProcess(0);
                            processForm(0);
                        } else {
                            LHM.common.notify(null, 'danger', 'Bạn cần điền email hoặc import dữ liệu từ file excel');
                        }
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-edit-student', function () {
        var id = $(this).attr('data-id');
        if (id !== '') {
            $.alert({
                title: 'Thông tin tham gia khóa học',
                columnClass: 'col-md-12 js-edit-student-dialog',
                type: 'blue',
                scrollToPreviousElement: false,
                scrollToPreviousElementAnimate: false,
                content: '',
                onContentReady: function onContentReady() {
                    var self = this,
                        submit = true;
                    function getContentDialog() {
                        $.ajax({
                            url: base_url + '/sites/update_student_retail',
                            data: {
                                id: id
                            },
                            type: 'GET',
                            success: function success(html) {
                                self.setContent(html);
                                LHM.common.genSelect2New();
                            }
                        });
                    }
                    getContentDialog();
                    function submitAjax(url, data) {
                        var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
                        var confirmDiv = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
                        if (submit) {
                            $.ajax({
                                url: url,
                                data: data,
                                type: 'POST',
                                success: function success(rs) {
                                    var typeNotify = 'warning',
                                        messageDefault = 'Có lỗi xảy ra';
                                    if (rs.success) {
                                        typeNotify = 'success';
                                        messageDefault = 'Thành công';
                                        getContentDialog(self);
                                        if (confirmDiv) {
                                            confirmDiv.close();
                                        }
                                    }
                                    LHM.common.notify(null, typeNotify, rs.message ? rs.message : messageDefault);
                                    setTimeout(function () {
                                        submit = true;
                                    }, delay);
                                }
                            });
                        }
                    }
                    $('.js-edit-student-dialog').on('click', 'a.js-delete-map', function () {
                        var tr = $(this).parents('tr:first');
                        $.confirm({
                            title: 'Xóa dữ liệu',
                            content: 'Bạn có chắc chắn muốn xóa dữ liệu này?',
                            buttons: {
                                Ok: function Ok() {
                                    submitAjax(base_url + '/students/deleteStudentRetailByCondition', {
                                        _token: $.cookie('_token'),
                                        userId: id,
                                        type: tr.attr('data-type'),
                                        itemId: tr.attr('data-id')
                                    }, 500);
                                },
                                Cancel: {
                                    'text': 'Đóng'
                                }
                            }
                        });
                    }).on('click', 'a.js-edit-map', function () {
                        var tr = $(this).parents('tr:first');
                        var limit = false,
                            end_time = '',
                            start_time;
                        if ($(this).attr('data-limit') == '1') {
                            limit = true;
                            start_time = $(this).attr('data-start-time');
                            end_time = $(this).attr('data-end-time');
                        }
                        $.confirm({
                            title: 'Cập nhật thời gian học',
                            content: "\n                                <form id=\"update-time-student-course\" method=\"post\">\n                                    <div class=\"mb-2 d-flex\" style=\"column-gap: 10px\">\n                                        <label><input type=\"radio\" name=\"type_time\" value=\"lifetime\" checked/> Tr\u1ECDn \u0111\u1EDDi</label>\n                                        <label><input type=\"radio\" name=\"type_time\" value=\"limit\"/> C\xF3 th\u1EDDi h\u1EA1n</label>\n                                    </div>\n                                    <div class=\"time-limit\" style=\"pointer-events: none; display: none;\">\n                                        <div>\n                                            <label class=\"w-100\">Th\u1EDDi gian b\u1EAFt \u0111\u1EA7u: </label>\n                                            <input type=\"datetime-local\" name=\"start_time\" class=\"form-control\" value=\"".concat(start_time, "\"/>\n                                        </div>\n                                        <div>\n                                            <label class=\"w-100\">Th\u1EDDi gian k\u1EBFt th\xFAc: </label>\n                                            <input type=\"datetime-local\" name=\"end_time\" class=\"form-control\" value=\"").concat(end_time, "\"/>\n                                        </div>\n                                    </div>\n                                </form>\n                            "),
                            onContentReady: function onContentReady() {
                                $('#update-time-student-course input[name=type_time]').change(function () {
                                    if ($(this).val() === 'limit') {
                                        $('#update-time-student-course .time-limit').css('pointer-events', 'auto').show();
                                        if ($("#update-time-student-course .time-limit input[name=start_time]").val() === '') {
                                            var now = new Date();
                                            var formattedNow = now.toISOString().slice(0, 16);
                                            $("#update-time-student-course .time-limit input[name=start_time]").val(formattedNow);
                                        }
                                    } else {
                                        $('#update-time-student-course .time-limit').css('pointer-events', 'none').hide();
                                    }
                                });
                                if (limit) {
                                    $('#update-time-student-course input[name=type_time][value=limit]').prop('checked', true).change();
                                }
                            },
                            buttons: {
                                Ok: {
                                    text: 'Cập nhật',
                                    action: function action() {
                                        var confirmDiv = this;
                                        var dataStr = $('#update-time-student-course').serialize() + "&_token=".concat($.cookie('_token'), "&userId=").concat(id, "&type=").concat(tr.attr('data-type'), "&itemId=").concat(tr.attr('data-id'));
                                        submitAjax(base_url + '/students/updateTimeCourse', dataStr, 1000, confirmDiv);
                                        return false;
                                    }
                                },
                                Cancel: {
                                    'text': 'Đóng lại'
                                }
                            }
                        });
                    }).on('click', 'button.submit-add-map-student', function () {
                        var dataStr = $('#add-map-student').serialize() + '&_token=' + $.cookie('_token') + "&userId=".concat(id);
                        submitAjax(base_url + '/students/addStudentRetail', dataStr);
                    });
                },
                buttons: {
                    Ok: {
                        text: "Đóng lại"
                    }
                }
            });
        } else {
            LHM.common.notify(null, 'danger', 'Có lỗi xảy ra');
        }
    });
    $('body').on('click', '.view-process-study-user', function () {
        var id = $(this).attr('data-id');
        $.confirm({
            title: 'Chi tiết tiến độ học của user',
            columnClass: 'col-md-10',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/dashboard/getProcessStudyUser',
                    data: {
                        id: id
                    },
                    type: 'GET',
                    success: function success(res) {
                        if (res.login && res.login == 1) {
                            if (res.data.length > 0) {
                                var coupon = res.data;
                                var html = '<div class="table-responsive">' + '<table class="table">' + '<thead>' + '<tr>' + '<th width="5%">#</th>' + '<th width="15%">Họ tên</th>' + '<th width="20%">Email</th>' + '<th width="20%">Tiến trình học tập</th>' + '<th width="25%">Khóa học</th>' + '<th width="15%">SĐT</th>' + '</tr>' + '</thead>' + '<tbody>';
                                $.each(res.data, function (k, v) {
                                    var styleProcess = 'style="width:' + v.percent + '%;color:black"';
                                    html += '<tr>' + '<td>' + (k + 1) + '</td>' + '<td>' + v.name + '</td>' + '<td>' + v.email + '</td>' + '<td><div class="progress list-detail-lesson" style="height:30px;cursor:pointer;"><div class="progress-bar progress-bar-striped active progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + v.percent + '" aria-valuemin="0" aria-valuemax="100" ' + styleProcess + '>' + v.percent + '%</div></div></td>' + '<td>' + v.course_name + '</td>' + '<td>' + v.phone + '</td>' + '</tr>';
                                });
                                html += '</tbody>' + '</table>' + '</div>';
                                self.setContent(html);
                                $('.progress-bar').each(function () {
                                    var valueNow = $(this).attr('aria-valuenow');
                                    if (parseInt(valueNow) > 0) {
                                        $(this).animate({
                                            width: valueNow + '%',
                                            percent: 100
                                        }, {
                                            progress: function progress(a, p, n) {
                                                $(this).css('width', valueNow * p + '%').html(Math.round(valueNow * p) + '%');
                                            }
                                        }, 100);
                                    }
                                });
                            } else self.setContent('Không có dữ liệu');
                        } else if (res.login && res.login == 2) {
                            window.location = res.href;
                        }
                    }
                });
            },
            buttons: {
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.send-mail-user-aff-child', function () {
        var id = $(this).attr('data-id');
        var email = $(this).attr('data-email');
        var html = '<div class="form-group">';
        html += '       <label>Tiêu đề<span class="text-danger">*</span>: </label>';
        html += '    <input style="margin-bottom: 5px;" type="text" class="form-control" id="aff_manager_email_title" placeholder="Nhập tiêu đề email">';
        html += '       <label>Nội dung<span class="text-danger">*</span>: </label>';
        html += '    <textarea name="aff_manager_email_description" id="aff_manager_email_description" class="form-control" rows="8" placeholder="Nhập nội dung email"></textarea>';
        html += '    <div class="invalid-feedback"></div>';
        html += '</div>';
        $.confirm({
            title: 'Email nhắc nhở học tập cho <strong>' + email + '</strong>',
            columnClass: 'col-md-10',
            type: 'blue',
            content: html,
            onContentReady: function onContentReady() {
                LHM.common.ckeditor('aff_manager_email_description');
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue btn-send-now',
                    action: function action() {
                        CKEDITOR.instances.aff_manager_email_description.updateElement();
                        var _this = this;
                        $('.btn-send-now').attr('disabled', 'disabled');
                        $('.btn-send-now').html('OK <i class="fas fa-spinner fa-spin"></i>');
                        $.ajax({
                            url: base_url + '/sites/sendMailAff',
                            data: {
                                id: id,
                                title: $('#aff_manager_email_title').val(),
                                desc: $('#aff_manager_email_description').val()
                            },
                            type: 'GET',
                            success: function success(res) {
                                if (res.login && res.login == 1) {
                                    if (res.success) {
                                        LHM.common.notify(null, 'success', "Gửi mail thành công");
                                        ;
                                        _this.close();
                                    } else {
                                        LHM.common.notify(null, 'danger', res.msg);
                                        $('.btn-send-now').removeAttr('disabled');
                                        $('.btn-send-now').html('OK');
                                    }
                                } else if (res.login && res.login == 2) {
                                    window.location = res.href;
                                }
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.redirect-to-membership', function (e) {
        e.preventDefault();
        $('.jconfirm').remove();
        $('#dashboard a.nav-link[href^="#setting"]').click();
        $('#v-pills-tab a[href="#membership"]').click();
    });
    $('body').on('click', '.btn-add-user', function () {
        var formupload = "<a href=\"javascript:;\" class=\"btnupload-thumbnail btnupload\" onclick=\"LHM.courses.fileManagerUnica($(this),'#photo')\"><img src=\"/data/share/no-thumb.png\" class=\"img-thumbnail preview-thumbnail\" style=\"width:145px;\"></a>";
        $.confirm({
            title: 'Thêm nhân viên',
            columnClass: 'col-md-6',
            content: '' + '<div class="input-add-user">' + '<div class="form-group add-img-user-account" style="display:none;">' + '<p class="control-label">Hình đại diện</p>' + '<div class="img-teacher text-left">' + formupload + '</div>' + '<input type="hidden" name="photo" class="hidden" id="photo" value="nophoto.png">' + '</div>' + '<div id="exist-account" style="margin-top: 10px;">' + '<form id="add-user-exist-account" class="active">' + '<input type="hidden" name="type" value="exist-account">' + '<div class="form-group">' + '<label>Email <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Nhập email user" name="email" id="email-user-exist-account" class="form-control" required />' + '<div class="block-error-email area-error"></div>' + '<label>Vị trí: <span class="text-danger">*</span></label>' + '<div class="form-check">' + '<input class="form-check-input" type="radio" name="position[]" id="admin" value="8">' + '<label class="form-check-label" for="admin">' + 'Admin' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input" type="radio" name="position[]" id="Leader" value="1">' + '<label class="form-check-label" for="Leader">' + 'Sale Leader' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input" type="radio" name="position[]" id="Sale" value="2">' + '<label class="form-check-label" for="Sale">' + 'Sale' + '</label>' + '</div>' +
                //  '<div class="form-check">' +
                //   '<input class="form-check-input" type="radio" name="position[]" id="Marketing" value="3">' +
                //   '<label class="form-check-label" for="Marketing">' +
                //     'Marketing' +
                //   '</label>' +
                // '</div>' +
                //  '<div class="form-check">' +
                //   '<input class="form-check-input" type="radio" name="position[]" id="dealer" value="4">' +
                //   '<label class="form-check-label" for="dealer">' +
                //     'Đại lý phân phối mã kích hoạt' +
                //   '</label>' +
                // '</div>' +
                '<div class="form-check">' + '<input class="form-check-input" type="radio" name="position[]" id="cskh" value="5">' + '<label class="form-check-label" for="cskh">' + 'CSKH' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input" type="radio" id="KT" name="position[]" value="6">' + '<label class="form-check-label" for="KT">' + 'Kế toán' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input position" type="radio" id="gv" name="position[]" value="7">' + '<label class="form-check-label" for="gv">' + 'Giảng viên' + '</label>' + '</div>' + '<div class="block-error-position area-error"></div>' + '</div><br>' + '</form>' + '</div>' + '<div id="non-account" style="display:none;margin-top: 10px;">' + '<form id="add-user-non-account">' + '<input type="hidden" name="type" value="non-account">' + '<div class="form-group">' + '<label>Họ tên <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Họ tên" name="fullname" class="form-control" required />' + '<div class="block-error-name area-error"></div>' + '</div>' +
                // '<div class="form-group">' +
                // '<label>Danh xưng : </label>'+
                // '<input type="text" placeholder="Danh xưng" name="general_names" class="form-control" required />' +
                // '</div>' +
                // '<div class="form-group">' +
                // '<label>Link Facebook : </label>'+
                // '<input type="text" placeholder="Link Facebook" name="facebook" class="form-control" required />' +
                // '<div class="block-error-facebook area-error"></div>' +
                // '</div>' +
                // '<div class="form-group">' +
                // '<label>Link Youtube : </label>'+
                // '<input type="text" placeholder="Link Youtube" name="youtube" class="form-control" required />' +
                // '<div class="block-error-youtube area-error"></div>' +
                // '</div>' +
                '<div class="form-group">' + '<label>Email <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Email" name="email" class="form-control" required id="email-user-non-account"/>' + '<div class="block-error-email area-error"></div>' + '</div>' + '<div class="form-group">' + '<label>Số điện thoại <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Số điện thoại" name="phone" class=" form-control" required />' + '<div class="block-error-phone area-error"></div>' + '</div>' + '<div class="form-group">' + '<label>Mật khẩu <span class="text-danger">*</span> : </label>' + '<input type="password" placeholder="Mật khẩu" name="password" class=" form-control" required />' + '<div class="block-error-password area-error"></div>' + '</div>' + '<div class="form-group">' + '<label>Xác nhận lại mật khẩu <span class="text-danger">*</span> : </label>' + '<input type="password" type="text" placeholder="Xác nhận lại mật khẩu" name="repassword" class=" form-control" required />' + '<div class="block-error-repassword area-error"></div>' + '</div>' + '<label>Vị trí: <span class="text-danger">*</span></label>' + '<div class="form-check">' + '<input class="form-check-input" type="radio" name="position[]" id="Admin" value="8">' + '<label class="form-check-label" for="Admin">' + 'Admin' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input" type="radio" name="position[]" id="lead" value="1">' + '<label class="form-check-label" for="lead">' + 'Sale Leader' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input" type="radio" name="position[]" id="sales" value="2">' + '<label class="form-check-label" for="sales">' + 'Sale' + '</label>' + '</div>' +
                //  '<div class="form-check">' +
                //   '<input class="form-check-input" type="radio" name="position[]" id="mkt" value="3">' +
                //   '<label class="form-check-label" for="mkt">' +
                //     'Marketing' +
                //   '</label>' +
                // '</div>' +
                //  '<div class="form-check">' +
                //   '<input class="form-check-input" type="radio" name="position[]" id="deal" value="4">' +
                //   '<label class="form-check-label" for="deal">' +
                //     'Đại lý phân phối mã kích hoạt' +
                //   '</label>' +
                // '</div>' +
                '<div class="form-check">' + '<input class="form-check-input" type="radio" name="position[]" id="csk" value="5">' + '<label class="form-check-label" for="csk">' + 'CSKH' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input" type="radio" name="position[]" id="kt" value="6">' + '<label class="form-check-label" for="kt">' + 'Kế toán' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input position" type="radio" id="GV" name="position[]" value="7">' + '<label class="form-check-label" for="GV">' + 'Giảng viên' + '</label>' + '</div>' + '<div class="block-error-position area-error"></div>' +
                // '<div class="form-group">' +
                //  '<label>Thông tin giảng viên : </label>'+
                // '<textarea id="info_teacher" cols="100" name="info_teacher" rows="10">Nhập thông tin giảng viên</textarea>' +
                // '</div>' +
                '</div>' + '</form>' + '<div class="invalid-feedback"></div>' + '<div class="block-error-member-of area-error"></div>' + '</div>',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            onContentReady: function onContentReady() {
                // when content is fetched
                LHM.common.ckeditor('info_teacher');
                // Upload avatar teacher
                /*$('#img-teacher').change(function () {
        $('.form-avatar-teacher').ajaxSubmit({
        url: '/upload-avatar',
        data: {_token: $.cookie('_token')},
        success: function (res) {
            if (res.status) {
                $('.img-teacher').find('img').attr('src', res.avatar_url);
                $('.small-img').attr('src', res.avatar_url);
                $('#photo').val(res.filename);
                LHM.common.notify(null, 'success', res.message);
            } else {
                LHM.common.notify(null, 'danger', res.message);
            }
        }
        });
        });*/

                $('#email-user-non-account').keyup(function () {
                    var email = $(this).val();
                    $.get('/id/checkExistUser', {
                        email: $(this).val()
                    }, function (rs) {
                        if (rs.exist) {
                            $('#exist-account').show();
                            $('.add-img-user-account').hide();
                            $('#non-account').hide();
                            $('#email-user-exist-account').val(email);
                            $('form').removeClass('active');
                            $('#add-user-exist-account').addClass('active');
                        }
                    });
                });
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue btn-update-teacher-popup',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        var form;
                        // CKEDITOR.instances.info_teacher.updateElement();
                        form = _this.$content.find('form.active').serialize();
                        form += '&_token=' + $.cookie('_token') + '&sid=' + sid + '&photo=' + $('#photo').val();
                        $('.btn-update-teacher-popup').html('<i class="fas fa-spinner fa-spin"></i> OK');
                        $('.btn-update-teacher-popup').attr('disabled', true);
                        $.post('/id/updateUser/add', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                $('.btn-update-teacher-popup').html('OK');
                                $('.btn-update-teacher-popup').removeAttr('disabled');
                                if (rs.error) {
                                    _this.$content.find('.area-error').html('');
                                    $.each(rs.msg, function (index, el) {
                                        _this.$content.find('.block-error-' + index).html('<p class="text-danger">' + el + '</p>');
                                    });
                                    if (rs.non_account) {
                                        $('.add-img-user-account').show();
                                        $('#exist-account').hide();
                                        $('#non-account').show();
                                        $('form').removeClass('active');
                                        $('#email-user-non-account').val($('#email-user-exist-account').val());
                                        $('#add-user-non-account').addClass('active');
                                        _this.setTitle("Tạo mới nhân viên");
                                    }
                                } else {
                                    // var str_position = [];
                                    // var list_id = [];
                                    // $.each(rs.data.position,function(index, el) {
                                    //     str_position[index] = index;
                                    // });

                                    // $('#list-users tbody tr').each(function(index, el) {
                                    //     list_id[index] = $(this).attr('id');
                                    // });

                                    // if ($('#list_schedule_users tr').length == 1 && !$('#list_schedule_users tr').hasClass('item-user'))
                                    //     $('#list_schedule_users').html('');

                                    // if ($('#list_schedule_users tr').length == 1 && !$('#list_schedule_users tr').hasClass('item-user'))
                                    //     $('#list_schedule_users').html('');

                                    // if ($.inArray(rs.data._id['$id'],list_id) < 0)
                                    // {
                                    //     window[rs.data._id['$id']] = rs.data.info;
                                    //      let html = '<tr class="item-user" id="'+ rs.data._id['$id'] +'" data-photo="'+rs.data.photo +'">' +
                                    //         '<td>-</td>' +
                                    //         '<td alt="f">'+ rs.data.fullname +'</td>' +
                                    //         '<td alt="pl">'+ rs.data.data_position_text +'</td>' +
                                    //         '<td alt="g" style="display:none;">'+ (rs.data.general_names ? rs.data.general_names : '')+'</td>' +
                                    //         '<td alt="e">'+ rs.data.email +'</td>' +
                                    //         '<td alt="p">'+ rs.data.phone +'</td>' +
                                    //         '<td alt="facebook" style="display:none;">'+rs.data.facebook+'</td>' +
                                    //         '<td alt="youtube" style="display:none;">'+rs.data.youtube+'</td>' +
                                    //         ' <td align="center">' +
                                    //             '<ul class="list-unstyled acts-li">' +
                                    //                 '<li><a href="javascript:;" onclick=LHM.mnDashboard.removeUser(this,"'+rs.data._id['$id']+'")><i class="fa fa-trash deletes"></i> Xóa</a></li>' +
                                    //                 '<li><a href="javascript:;" class="btn-edit-user" data-position="'+str_position.join('-')+'"><i class="fas fa-info-circle"></i> Chi tiết</a></li>' +
                                    //                 '<li><a href="javascript:;" class="btn-apply-permission"><i class="far fa-check-square"></i> Phân quyền</a></li>' +
                                    //             '</ul>';
                                    //         ' </td>' +
                                    //     '</tr>';
                                    //     LHM.common.checkTableData($('#dashboard #v-pills-users tbody'), html);
                                    // }else
                                    // {
                                    //     $('#'+rs.data._id['$id']).find('.btn-edit-user').attr('data-position',str_position.join('-'));
                                    // }
                                    LHM.common.notify(null, 'success', 'Thêm thành công');
                                    $('#tab_pills_users').trigger('click');
                                    _this.close();
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-add-user-agency', function () {
        $.confirm({
            title: 'Thêm mới user',
            columnClass: 'col-md-6',
            content: '' + '<div class="input-add-user">' + '<form id="add-user-agency">' + '<div class="form-group">' + '<label>Họ tên <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Họ tên" name="fullname" class="form-control" required />' + '<div class="block-error-name area-error"></div>' + '</div>' + '<div class="form-group">' + '<label>Email <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Email" name="email" class="form-control" required id="email-user-non-account"/>' + '<div class="block-error-email area-error"></div>' + '</div>' + '<div class="form-group">' + '<label>Mật khẩu <span class="text-danger">*</span> : </label>' + '<input type="password" placeholder="Mật khẩu" name="password" class=" form-control" required />' + '<div class="block-error-password area-error"></div>' + '</div>' + '<div class="form-group">' + '<label>Xác nhận lại mật khẩu <span class="text-danger">*</span> : </label>' + '<input type="password" type="text" placeholder="Xác nhận lại mật khẩu" name="repassword" class=" form-control" required />' + '<div class="block-error-repassword area-error"></div>' + '</div>' + '</form>' + '<div class="invalid-feedback"></div>' + '</div>',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue btn-update-user-agency',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        var form;
                        form = _this.$content.find('form#add-user-agency').serialize();
                        form += '&_token=' + $.cookie('_token');
                        $('.btn-update-user-agency').html('<i class="fas fa-spinner fa-spin"></i> OK');
                        $('.btn-update-user-agency').attr('disabled', true);
                        $.post('/agency/addUser', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                $('.btn-update-user-agency').html('OK');
                                $('.btn-update-user-agency').removeAttr('disabled');
                                if (rs.error) {
                                    _this.$content.find('.area-error').html('');
                                    $.each(rs.msg, function (index, el) {
                                        _this.$content.find('.block-error-' + index).html('<p class="text-danger">' + el + '</p>');
                                    });
                                } else {
                                    LHM.common.notify(null, 'success', 'Thêm thành công');
                                    $('#aff-users').trigger('click');
                                    _this.close();
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-add-coupon', function () {
        $.confirm({
            title: 'Tạo Coupon',
            columnClass: 'col-md-6',
            type: 'blue',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/courses/gen_discount',
                    type: 'GET',
                    success: function success(res) {
                        if (res.login && res.login == 1) {
                            if (res.success) {
                                if (res.data) {
                                    var html = '<div class="col-sm-12"><form class="needs-validation" id="gen-discounts" novalidate>' + '<div class="form-row">' + '<div class="col-md-12 mb-3 js-code-coupon" style="display: none"><label>Mã Coupon <i class="fas fa-question-circle" data-toggle="tooltip" data-placement="right" title="Mã Coupon bao gồm chữ không dấu, số và ký hiệu - _.Hệ thống sẽ tự động sinh ra mã Coupon khi bạn không điền mã"></i></label><input type="text" name="code_coupon" class="form-control js-coupon" placeholder="Mã Coupon" /></div>' + '<div class="col-md-12 mb-3">' + '<label for="">Loại</label>' + '<div class="form-check">' + '<input class="form-check-input" name="type_reduce" onchange="pre_gen()" type="radio" class="radio_type_reduce"  value="money" checked required>' + '<label class="form-check-label" >' + 'Tiền' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input" name="type_reduce" onchange="pre_gen()" type="radio" class="radio_type_reduce" value="percent" required>' + '<label class="form-check-label">' + '%' + '</label>' + '</div>' + '</div>' + '<div class="col-md-6 mb-3">' + '<label for="">Thuộc tính mã</label>' + '<div class="form-check">' + '<input class="form-check-input" name="limited" onchange="pre_gen()" type="radio" id="once" value="once" checked required>' + '<label class="form-check-label" for="once">' + 'Cho 1 học viên sử dụng' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input" name="limited" onchange="pre_gen()" type="radio" id="multi" value="multi" required>' + '<label class="form-check-label" for="multi">' + 'Cho nhiều học viên sử dụng' + '</label>' + '</div>' + '<div class="form-group limited-use" style="display: none;">' + '<input class="form-control" id="value-limited" placeholder="Số lượng học viên" value="100" max="100" type="number">' + '</div>' + '</div>' + '<div class="form-row col-md-12">' + '<div class="col-md-6 mb-3">' + '<label for="reduce">Nhập % hoặc số tiền <span class="text-danger">*</span></label>' + '<input type="number" class="form-control" placeholder="Vd: 20 hoặc 20000" id="reduce" onkeyup="pre_gen()" required>' + '</div>' + '<div class="col-md-6 mb-3">' + '<label for="s-discount">Số lượng mã tạo</label>' + '<input id="s-discount" onkeyup="pre_gen()" type="text" value="1" class="form-control" required>' + '</div>' + '</div>' + '<div class="form-row" style="width: 100%;">' + '<div class="col-md-12">' + '<input type="checkbox" name="set_time_expire_date" class="check-password-display-student" id ="checkbox_set_time_expire_date">' + '<label for="checkbox_set_time_expire_date">&nbsp;Cài đặt thời hạn</label>' + '</div>' + '<div class="col-md-12">' + '<div id ="expire_date" style="display: none;">' + '<input type="text" class="form-control datetimepicker" name="expire_date" id="datetimepicker" placeholder="Chọn thời hạn cho Coupon, mã kích hoạt" required="">' + '</div>' + '</div>' + '</div>';
                                    html += '<div class="form-row mt-10" style="width:100%;padding-right: 5px;padding-left: 5px;">' + '<label>Gắn khóa học </label></br>';
                                    html += '<select class="form-control" id="course-active-code-coupon" multiple>';
                                    $.each(res.data.courses, function (k, v) {
                                        html += '<option value="' + v._id + '">' + v.name + '</option>';
                                    });
                                    html += '</select></div>';
                                    html += '<div class="form-row form-tag-coupon">' + '<label>Gắn tag: </label>' + '<input type="text" class="hash_tag_coupon" name="hash_tag_coupon" value="" class="form-control input-step" placeholder="Nhập từng tag sau đó Enter" />' + '</div>' + '</form><div class="invalid-feedback"></div></div>';
                                    self.setContent(html);
                                }
                            } else {
                                self.buttons.formSubmit.hide();
                                self.setContent('<p class="text-danger">Đã xảy ra lỗi - Vui lòng thử lại!</p>');
                            }
                        } else if (res.login && res.login == 2) {
                            window.location = res.href;
                        }
                    }
                });
            },
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            onContentReady: function onContentReady() {
                $('#course-active-code-coupon').select2({
                    allowClear: true,
                    placeholder: "--- Chọn khóa học ---"
                });
                $('#datetimepicker').datetimepicker({
                    format: 'Y-m-d H:i:s',
                    minDate: '-2019-01-01',
                    defaultTime: '00:00:00'
                });
                $('.hash_tag_coupon').tagsInput({
                    autocomplete_url: base_url + '/sites/getTagOfDiscounts',
                    defaultText: 'Nhập từng tag sau đó Enter',
                    autocomplete: {
                        selectFirst: true,
                        autoFill: true
                    },
                    width: '100%',
                    removeWithBackspace: false,
                    minInputWidth: '250px',
                    onAddTag: function onAddTag(value) {
                        var list_tag = $(this).val();
                        var list_tag_lower_case = [];
                        list_tag = list_tag.split(',');
                        list_tag.pop();
                        for (var i = 0; i < list_tag.length; i++) {
                            list_tag_lower_case[i] = list_tag[i].toLowerCase();
                        }
                        if (jQuery.inArray(value.toLowerCase(), list_tag_lower_case) < 0) {
                            list_tag.push(value);
                            $(this).importTags(list_tag.join(','));
                        } else {
                            $('#' + $(this).attr('id') + '_tag').addClass('not_valid');
                            $(this).importTags(list_tag.join(','));
                            $('#' + $(this).attr('id') + '_tag').val(value);
                            $('#' + $(this).attr('id') + '_tag').focus();
                        }
                        $('.ui-autocomplete').hide();
                    }
                });
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue btn-add-gen-discount-popup',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var courses = [];
                        var reduce = $('#reduce').val();
                        var s_discount = $('#s-discount').val();
                        var opt2 = $("#gen-discounts input[name='limited']:checked").val();
                        var value_limited = $('#value-limited').val();
                        var tags = $('.hash_tag_coupon').val();
                        var type_reduce = $('input[name="type_reduce"]:checked').val();
                        $('#course-active-code-coupon :selected').each(function () {
                            courses.push({
                                name: "courses",
                                value: $(this).val()
                            });
                        });
                        var expire_date = $("input[name=expire_date]").val();
                        var set_time_expire_date = 0;
                        if ($("input[name=set_time_expire_date]").is(":checked")) {
                            set_time_expire_date = 1;
                        }
                        var data = {
                            sid: sid,
                            reduce: reduce,
                            courses: courses,
                            s_discount: s_discount,
                            opt2: opt2,
                            value_limited: value_limited,
                            tags: tags,
                            expire_date: expire_date,
                            set_time_expire_date: set_time_expire_date,
                            code_coupon: $('input[name="code_coupon"]').val(),
                            type_reduce: type_reduce,
                            _token: $.cookie('_token')
                        };
                        $('.btn-add-gen-discount-popup').html('<i class="fas fa-spinner fa-spin"></i> OK');
                        $('.btn-add-gen-discount-popup').attr('disabled', true);
                        $.ajax({
                            type: 'POST',
                            url: '/courses/gen_discount',
                            data: data,
                            dataType: "json",
                            beforeSend: function beforeSend() {},
                            cache: true,
                            success: function success(rs) {
                                if (rs.login && rs.login == 1) {
                                    $('.btn-add-gen-discount-popup').html('OK');
                                    $('.btn-add-gen-discount-popup').removeAttr('disabled');
                                    if (rs.error) {
                                        var _error3 = '';
                                        for (var i in rs.msg) {
                                            _error3 += '- ' + rs.msg[i] + '<br>';
                                        }
                                        _this.$content.find('.invalid-feedback').html(_error3).show();
                                    } else {
                                        // $('.btn-create-live-cms').html('OK');
                                        // $('.btn-create-live-cms').removeAttr('disabled');
                                        //print code to list
                                        var newList = '';
                                        for (var i in rs.data) {
                                            newList += '<tr _id="' + rs.data[i]._id['$id'] + '">' + '<td _code>' + rs.data[i].code + '</td>' + '<td class="money-label">' + rs.data[i].reduce;
                                            if (rs.data[i].type_reduce == 'percent') newList += '<sup>%</sup>';else newList += '<sup>đ</sup>';
                                            newList += '</td>' + '<td>' + LHM.mnDashboard.checker_discount(rs.data[i], 'status') + '</td>' + '<td>' + LHM.mnDashboard.checker_discount(rs.data[i], 'property') + '</td>' + '<td>' + moment.unix(rs.data[i].createdAt.sec).format('DD/MM/YYYY H:mm:ss') + '</td>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td align="center"><a href="javascript:void(0);" data-id="' + rs.data[i]._id['$id'] + '"  class="btn-update-coupon"><span class="fas fa-info-circle"></span> Chi tiết</a> </td>' + '<td align="center"><a href="javascript:;" title="Xóa" onclick="LHM.mnDashboard.del_discount(\'' + rs.data[i]._id['$id'] + '\', this)" class="delete"><span class="fa fa-trash"></span> Xóa</a></td>' + '</tr>';
                                        }

                                        // LHM.common.checkTableData($('#coupons tbody'), newList);
                                        _this.close();
                                        LHM.common.notify(null, 'success', 'Tạo thành công');
                                        LHM.mnDashboard.init('coupons');
                                    }
                                } else if (rs.login && rs.login == 2) {
                                    window.location = rs.href;
                                }
                            },
                            complete: function complete() {}
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-add-membership-card', function () {
        $.confirm({
            title: 'Tạo thẻ',
            columnClass: 'dialog-add-membership col-md-6',
            type: 'blue',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/sites/create_membership_card',
                    type: 'GET',
                    success: function success(res) {
                        if (res.login && res.login == 1) {
                            if (res.success) {
                                if (res.data) {
                                    var html = '<div id="membership-card" style="margin-top: 10px;">' + '<div class="form-group">' + '<label>Số lượng : <span class="text-danger">*</span></label>' + '<input type="number" placeholder="Nhập số lượng" id="soluong" class="form-control" required value="1"/>' + '</div>' + '</div>';
                                    html += '<div class="form-group">' + '<label>Gói Membership: <span class="text-danger">*</span></label>';
                                    $.each(res.data, function (k, v) {
                                        html += '<div class="form-check">' + '<input class="form-check-input" type="radio" name="period" value="' + v.month + '" id="' + v.month + '">' + '<label class="form-check-label" class="lbl-membership" for="' + v.month + '">' + v.title + ' tháng - ' + v.price_per_month_format + ' đ/tháng' + v.trail + '</label>' + '</div>';
                                    });
                                    html += '</div>';

                                    // html += '<div class="form-group">'+
                                    //         '<label>Gắn đại lý: </label>';
                                    // html += '<select class="form-control" id="dealer" name="dealer">';
                                    // html += '<option value="">--Không có đại lý--</option>';
                                    //     $.each(res.dealer, function (k, v) {
                                    //         html += '<option value="'+v._id['$id']+'">'+v.name+'</option>';
                                    //     });
                                    // html += '</select></div>';
                                    // html += '<div id="dealer_off"></div>';

                                    html += '<div class="form-group">' + '<input type="checkbox" name="set_time_expire_date" class="check-password-display-student set_time_expire_date" id ="checkbox_set_time_expire_date">' + '<label for="checkbox_set_time_expire_date">&nbsp;Cài đặt thời hạn</label>' + '<div id ="expire_date" style="display: none;">' + '<input type="text" class="form-control expire_date" name="expire_date" id="datetimepicker" placeholder="Chọn thời hạn cho mã kích hoạt" required="">' + '</div>' + '</div>';
                                    html += '<div class="form-group">' + '<label>Gắn nhóm học viên: </label></br>';
                                    html += '<select class="form-control" id="student_gr" name="student_gr" style="width:100%">';
                                    html += '<option value="">-- Không gắn nhóm --</option>';
                                    $.each(res.student_gr, function (k, v) {
                                        html += '<option value="' + v._id + '">' + v.name + '</option>';
                                    });
                                    html += '</select></div>';
                                    html += '<div class="form-group">' + '<label>Gắn tag: </label>' + '<input type="text" class="hash_tag_create_code_membership" name="hash_tag_create_code_membership" value="" class="form-control input-step" placeholder="Nhập từng tag sau đó Enter" />' + '</div>';
                                    html += '<div class="invalid-feedback"></div></div>';
                                    self.setContent(html);
                                }
                            } else {
                                self.buttons.formSubmit.hide();
                                self.setContent('<p class="text-danger">Cài đặt membership chưa được xác định - Click <a href="#" class="redirect-to-membership">VÀO ĐÂY</a> để cài đặt</p>');
                            }
                        } else if (res.login && res.login == 2) {
                            window.location = res.href;
                        }
                    }
                });
            },
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            onContentReady: function onContentReady() {
                // $('#dealer').change(function() {
                //     $('#dealer_off').html('');
                //     if ($(this).val() != '')
                //     {
                //         var html =  '<div class="form-group">' +
                //                     '<label>Chiết khấu : </label>'+
                //                     '<input type="number" placeholder="Nhập % chiết khấu" id="input-dealer-off" class="form-control"/>' +
                //                     '</div>';
                //         $('#dealer_off').html(html);
                //     }
                // });

                $('#datetimepicker').datetimepicker({
                    format: 'Y-m-d H:i:s',
                    minDate: '-2019-01-01',
                    defaultTime: '00:00:00'
                });
                $('.hash_tag_create_code_membership').tagsInput({
                    autocomplete_url: base_url + '/sites/getTagOfDiscounts',
                    defaultText: 'Nhập từng tag sau đó Enter',
                    autocomplete: {
                        selectFirst: true,
                        autoFill: true
                    },
                    width: '100%',
                    removeWithBackspace: false,
                    minInputWidth: '250px',
                    onAddTag: function onAddTag(value) {
                        var list_tag = $(this).val();
                        var list_tag_lower_case = [];
                        list_tag = list_tag.split(',');
                        list_tag.pop();
                        for (var i = 0; i < list_tag.length; i++) {
                            list_tag_lower_case[i] = list_tag[i].toLowerCase();
                        }
                        if (jQuery.inArray(value.toLowerCase(), list_tag_lower_case) < 0) {
                            list_tag.push(value);
                            $(this).importTags(list_tag.join(','));
                        } else {
                            $('#' + $(this).attr('id') + '_tag').addClass('not_valid');
                            $(this).importTags(list_tag.join(','));
                            $('#' + $(this).attr('id') + '_tag').val(value);
                            $('#' + $(this).attr('id') + '_tag').focus();
                        }
                        $('.ui-autocomplete').hide();
                    }
                });
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var forms = [];
                        $('#student_gr :selected').each(function () {
                            forms.push($(this).val());
                        });
                        var form;
                        var set_time_expire_date = 0;
                        if ($("input[name=set_time_expire_date]").is(":checked")) {
                            set_time_expire_date = 1;
                        }
                        form = {
                            '_token': $.cookie('_token'),
                            'soluong': _this.$content.find('#soluong').val(),
                            'period': _this.$content.find('input[type=radio]:checked').val(),
                            // 'dealer': _this.$content.find('#dealer').val(),
                            // 'dealer_off': _this.$content.find('#input-dealer-off').val(),
                            'hash_tag_create_code_membership': $('.hash_tag_create_code_membership').val(),
                            'student_gr': forms,
                            "expire_date": $('.expire_date').val(),
                            'set_time_expire_date': set_time_expire_date
                        };
                        $.post('/sites/create_membership_card', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                if (rs.error) {
                                    for (var i in rs.msg) {
                                        var _error4 = '';
                                        for (var i in rs.msg) {
                                            _error4 += '- ' + rs.msg[i] + '<br>';
                                        }
                                        _this.$content.find('.invalid-feedback').html(_error4).show();
                                    }
                                } else {
                                    $('#dashboard #v-pills-membership-card-tab').click();
                                    _this.close();
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-update-member-ship-card', function () {
        var id = $(this).data('id');
        var email_user = $(this).data('email-user');
        $.confirm({
            title: 'Cập nhật mã thẻ',
            columnClass: 'col-md-6',
            type: 'blue',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/sites/updateMemberShipCard',
                    data: {
                        id: id
                    },
                    type: 'GET',
                    success: function success(res) {
                        if (res.login && res.login == 1) {
                            if (res.success) {
                                if (res.data) {
                                    var html = '<div id="membership-card" style="margin-top: 10px;">' + '<div class="form-group">' + '<label>Số lượng : <span class="text-danger">*</span></label>' + '<input type="number" placeholder="Nhập số lượng" id="number" class="form-control" disabled required value="1"/>' + '</div>' + '</div>';
                                    html += '<div class="form-group">' + '<label>Gói Membership: <span class="text-danger">*</span></label>';
                                    $.each(res.package_member_ships, function (key, value) {
                                        html += '<div class="form-check">' + '<input class="form-check-input" type="radio" name="period" value="' + value.month + '" id="' + value.month + '" ' + value.checked + '>' + '<label class="form-check-label" class="lbl-membership" for="' + value.month + '">' + value.title + ' tháng - ' + value.price_per_month_format + ' đ/tháng' + value.trail + '</label>' + '</div>';
                                    });
                                    html += '</div>';
                                    html += '<div class="form-group">' + '<input type="checkbox" name="set_time_expire_date" class="check-password-display-student set_time_expire_date" id ="checkbox_set_time_expire_date" ' + res.data.coupon.expired_discount_check + '>' + '<label for="checkbox_set_time_expire_date">&nbsp;Cài đặt thời hạn</label>' + '<div id ="expire_date" style="display: ' + res.data.coupon.add_style_to_class + ';">' + '<input type="text" class="form-control expire_date" name="expire_date" id="datetimepicker" placeholder="Chọn thời hạn cho mã kích hoạt" value="' + res.data.coupon.expire_date + '">' + '</div>' + '</div>';
                                    html += '<div class="form-group">' + '<label>Gắn nhóm học viên: </label></br>';
                                    html += '<select class="form-control" id="student_gr" name="student_gr" style="width:100%">';
                                    html += '<option value="">-- Không gắn nhóm --</option>';
                                    $.each(res.std_group, function (k, v) {
                                        html += '<option value="' + v._id + '" ' + v.selected + '>' + v.name + '</option>';
                                    });
                                    html += '</select></div>';
                                    html += '<div class="form-group">' + '<label>Gắn tag: </label>' + '<input type="text" class="hash_tag_create_code_edit" name="hash_tag_create_code_edit" value="' + res.data.tags + '" class="form-control input-step" placeholder="Nhập từng tag sau đó Enter" />' + '</div>';
                                    html += '<div class="invalid-feedback"></div></div>';
                                    self.setContent(html);
                                    if (email_user) {
                                        self.buttons.formSubmit.hide();
                                    }
                                }
                            } else {
                                self.buttons.formSubmit.hide();
                                self.setContent('<p class="text-danger">Đã xảy ra lỗi - Vui lòng thử lại!</p>');
                            }
                        } else if (res.login && res.login == 2) {
                            window.location = res.href;
                        }
                    }
                });
            },
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            onContentReady: function onContentReady() {
                $('#datetimepicker').datetimepicker({
                    format: 'Y-m-d H:i:s',
                    minDate: '-2019-01-01',
                    defaultTime: '00:00:00'
                });
                $('.hash_tag_create_code_edit').tagsInput({
                    autocomplete_url: base_url + '/sites/getTagOfDiscounts',
                    defaultText: 'Nhập từng tag sau đó Enter',
                    autocomplete: {
                        selectFirst: true,
                        autoFill: true
                    },
                    width: '100%',
                    removeWithBackspace: false,
                    minInputWidth: '250px',
                    onAddTag: function onAddTag(value) {
                        var list_tag = $(this).val();
                        var list_tag_lower_case = [];
                        list_tag = list_tag.split(',');
                        list_tag.pop();
                        for (var i = 0; i < list_tag.length; i++) {
                            list_tag_lower_case[i] = list_tag[i].toLowerCase();
                        }
                        if (jQuery.inArray(value.toLowerCase(), list_tag_lower_case) < 0) {
                            list_tag.push(value);
                            $(this).importTags(list_tag.join(','));
                        } else {
                            $('#' + $(this).attr('id') + '_tag').addClass('not_valid');
                            $(this).importTags(list_tag.join(','));
                            $('#' + $(this).attr('id') + '_tag').val(value);
                            $('#' + $(this).attr('id') + '_tag').focus();
                        }
                        $('.ui-autocomplete').hide();
                    }
                });
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue btn-update-member-ship-code-popup',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var forms = [];
                        $('#student_gr :selected').each(function () {
                            forms.push($(this).val());
                        });
                        var form;
                        var set_time_expire_date = 0;
                        if ($("input[name=set_time_expire_date]").is(":checked")) {
                            set_time_expire_date = 1;
                        }
                        form = {
                            '_token': $.cookie('_token'),
                            '_id': id,
                            'period': _this.$content.find('input[type=radio]:checked').val(),
                            'hash_tag_create_code_membership': $('.hash_tag_create_code_edit').val(),
                            'student_gr': forms,
                            "expire_date": $('.expire_date').val(),
                            'set_time_expire_date': set_time_expire_date
                        };
                        $.post('/sites/updateMemberShipCard', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                if (rs.error) {
                                    for (var i in rs.msg) {
                                        var _error5 = '';
                                        for (var i in rs.msg) {
                                            _error5 += '- ' + rs.msg[i] + '<br>';
                                        }
                                        _this.$content.find('.invalid-feedback').html(_error5).show();
                                    }
                                } else {
                                    $('#dashboard #v-pills-membership-card-tab').click();
                                    _this.close();
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.redirect-to-membership', function (e) {
        e.preventDefault();
        $('.jconfirm').remove();
        $('#dashboard a.nav-link[href^="#setting"]').click();
        $('#v-pills-tab a[href="#membership"]').click();
    });
    $('body').on('click', '.btn-check-card', function () {
        var data = {
            code: $('#input-check-card').val(),
            _token: $.cookie('_token')
        };
        $.ajax({
            url: base_url + '/sites/check_info_card',
            type: 'POST',
            data: data,
            beforeSend: function beforeSend() {
                $('#tbl-check-membership-card').html('<tr><td colspan="10" style="text-align:center;"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>');
            },
            success: function success(res) {
                if (res.login && res.login == 1) {
                    $('#tbl-check-membership-card').html('');
                    $('#invalid-check-card').html('');
                    if (res.success) {
                        if (res.data) {
                            for (var i = 0; i < res.data.length; i++) {
                                switch (res.data[i].type_reduce) {
                                    case 'membership_card':
                                        var html = '<thead>' + '<tr class="filters">' + '<th width="10%">Mã thẻ</th>' + '<th width="10%">Serial</th>' + '<th width="10%">Thời hạn</th>' + '<th width="10%">Tình trạng</th>' + '<th width="10%">Ngày tạo</th>' + '<th width="10%">Người dùng</th>' + '<th width="10%">Email</th>' + '<th width="10%">Ngày dùng</th>' + '<th width="10%">Nhóm học viên</th>' + '<th width="10%">Tag</th>' + '</tr>' + '</thead>' + '<tbody id="list_check_membership_cards">' + '<tr>' + '<td>' + res.data[i].code + '</td>' + '<td>' + res.data[i].serial + '</td>' + '<td>' + res.data[i].period + '</td>' + '<td>' + LHM.mnDashboard.checker_discount(res.data[i], 'status') + '</td>' + '<td>' + moment.unix(res.data[i].createdAt.sec).format('DD/MM/YYYY H:mm') + '</td>' + '<td>' + res.data[i].user + '</td>' + '<td>' + res.data[i].email + '</br>' + res.data[i].phone + '</td>' + '<td>' + (res.data[i].createdAt.sec == res.data[i].updatedAt.sec ? '' : moment.unix(res.data[i].updatedAt.sec).format('DD/MM/YYYY H:mm')) + '</td>' + '<td>' + res.data[i].std_group + '</td>' + '<td>' + res.data[i].tags + '</td>' + '</tr>' + '</tbody>';
                                        break;
                                    case 'active':
                                        var html = '<thead>' + '<tr class="filters">' + '<th width="10%">Mã thẻ</th>' + '<th width="10%">Tình trạng</th>' + '<th width="10%">Ngày tạo</th>' + '<th width="10%">Ngày dùng</th>' + '<th width="10%">Người dùng</th>' + '<th width="10%">Email</th>';
                                        if (res.data[i].type_active == '0') {
                                            html += '<th width="10%">Khóa học - Lớp học</th>';
                                        } else if (res.data[i].type_active == '1') {
                                            html += '<th width="10%">Đề thi</th>';
                                        } else if (res.data[i].type_active == '2') {
                                            html += '<th width="10%">Tài liệu</th>';
                                        }
                                        html += '<th width="10">Nhóm học viên</th>' + '<th width="10%">Tag</th>' + '</tr>' + '</thead>' + '<tbody id="list_check_active_card">' + '<tr>' + '<td>' + res.data[i].code + '</td>' + '<td>' + LHM.mnDashboard.checker_discount(res.data[i], 'status') + '</td>' + '<td>' + moment.unix(res.data[i].createdAt.sec).format('DD/MM/YYYY H:mm') + '</td>' + '<td>' + (res.data[i].createdAt.sec == res.data[i].updatedAt.sec ? '' : moment.unix(res.data[i].updatedAt.sec).format('DD/MM/YYYY H:mm')) + '</td>' + '<td>' + res.data[i].user + '</td>' + '<td>' + res.data[i].email + '</br>' + res.data[i].phone + '</td>';
                                        if (res.data[i].type_active == '0') {
                                            html += '<td>' + res.data[i].course_live + '</td>';
                                        } else if (res.data[i].type_active == '1') {
                                            html += '<td>' + res.data[i].list_quiz + '</td>';
                                        } else if (res.data[i].type_active == '2') {
                                            html += '<td>' + res.data[i].list_document + '</td>';
                                        }
                                        html += '<td>' + res.data[i].std_group + '</td>' + '<td>' + res.data[i].tags + '</td>' + '</tr>' + '</tbody>';
                                        break;
                                    case 'percent':
                                        var html = '<thead>' + '<tr class="filters">' + '<th width="15%">Mã thẻ</th>' + '<th width="10%">Tiết kiệm</th>' + '<th width="15%">Tình trạng</th>' + '<th width="15%">Thuộc tính</th>' + '<th width="15%">Ngày tạo</th>' + '</tr>' + '</thead>' + '<tbody id="list_check_coupon">' + '<tr>' + '<td>' + res.data[i].code + '</td>' + '<td>' + (res.data[i].reduce > 100 ? res.data[i].reduce.format(0, 3, '.', ',') + '<sup>đ</sup>' : res.data[i].reduce + '<sup>%</sup>') + '</td>' + '<td>' + LHM.mnDashboard.checker_discount(res.data[i], 'status') + '</td>' + '<td>' + LHM.mnDashboard.checker_discount(res.data[i], 'property') + '</td>' + '<td>' + moment.unix(res.data[i].createdAt.sec).format('DD/MM/YYYY H:mm:ss') + '</td>' + '</tr>' + '</tbody>';
                                        break;
                                    case 'money':
                                        var html = '<thead>' + '<tr class="filters">' + '<th width="15%">Mã thẻ</th>' + '<th width="10%">Tiết kiệm</th>' + '<th width="15%">Tình trạng</th>' + '<th width="15%">Thuộc tính</th>' + '<th width="15%">Ngày tạo</th>' + '</tr>' + '</thead>' + '<tbody id="list_check_coupon">' + '<tr>' + '<td>' + res.data[i].code + '</td>' + '<td>' + (res.data[i].reduce > 100 ? res.data[i].reduce.format(0, 3, '.', ',') + '<sup>đ</sup>' : res.data[i].reduce + '<sup>%</sup>') + '</td>' + '<td>' + LHM.mnDashboard.checker_discount(res.data[i], 'status') + '</td>' + '<td>' + LHM.mnDashboard.checker_discount(res.data[i], 'property') + '</td>' + '<td>' + moment.unix(res.data[i].createdAt.sec).format('DD/MM/YYYY H:mm:ss') + '</td>' + '</tr>' + '</tbody>';
                                        break;
                                }
                            }
                            $('#invalid-check-info-card').hide();
                            $('#tbl-check-membership-card').html(html);
                        }
                    } else {
                        $.each(res.msg, function (k, v) {
                            $('#invalid-check-info-card').html('<p class="text-danger">' + v + '</p>');
                        });
                        $('#invalid-check-info-card').show();
                    }
                } else if (res.login && res.login == 2) {
                    window.location = res.href;
                }
            }
        });
    });
    function addAndUpdateDisCount(that) {
        $.get('/discount-course/select', {type: that.data('type'), itemId: that.data('id') })
            .done(function (res) {
                if(res.html){
                    let dataExcel = [];
                    const isExcel = that.data('type') === 'excel' && !that.data('id');
                    const confirm_discount = $.confirm({
                        title: that.data('id') ? 'Sửa mã kích hoạt khóa học' : 'Tạo mã kích hoạt khóa học',
                        columnClass: 'col-md-8',
                        type: 'green',
                        content: res.html,
                        onContentReady: function onContentReady() {
                            if (isExcel) {
                                $("#form-discount-course #excel").change(function () {
                                    readFileExcel(this, function (excelData) {
                                        dataExcel = excelData;
                                        $('#form-discount-course .data-text-excel').text('Dữ liệu đã nhận: ' + excelData.length + ' dữ liệu');
                                    }, 1, ['code', 'second_code', 'course_id']);
                                });
                            }
                        },
                        buttons: {
                            Ok: {
                                text: 'Lưu lại',
                                btnClass: 'btn-success',
                                action: function () {
                                    let data = $('#form-discount-course').serialize() + '&_token=' + $.cookie('_token');
                                    if(isExcel){
                                        if(dataExcel.length < 0){
                                            LHM.common.notify(null, 'danger', 'Không tồn tại dữ liệu excel');
                                            return false;
                                        }
                                        data += '&' + $.param({
                                            items: dataExcel
                                        });
                                    } else if (that.data('id')) {
                                        data += '&itemId=' + that.data('id');
                                    }
                                    LHM.common.callAjax('discount-course/add-edit', 'POST', data, function () {
                                        confirm_discount.close();
                                        LHM.mnDashboard.getActiveCode(0);
                                    })
                                    return false;
                                }
                            }, cancel: { text: 'Hủy bỏ' }
                        }
                    });
                }
            })
            .fail(function (error) {
                LHM.common.readError(error);
            })
    }
    $('body').on('click', '.btn-add-active-code, .btn-update-active-code', function () {
        addAndUpdateDisCount($(this));
    });
    $('body').on('click', '.btn-detail-coupon', function () {
        var code = $(this).text();
        $.alert({
            title: "Thông tin mã coupon",
            columnClass: 'col-md-8',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/orders/getDetailCoupon',
                    type: 'GET',
                    data: {
                        code: code
                    }
                }).done(function (res) {
                    if (res.login && res.login == 1) {
                        if (!res.error) {
                            var coupon = res.data;
                            var html = '<div class="table-responsive">' + '<table class="table">' + '<thead>' + '<tr>' + '<th>Mã Coupon</th>' + '<th>Giảm trừ</th>' + '<th>Loại giảm trừ</th>' + '</tr>' + '</thead>' + '<tbody>';
                            html += '<tr>' + '<td width="45%">' + coupon.code + '</td>' + '<td width="35%">' + coupon.reduce + '</td>' + '<td width="20%">' + coupon.type_reduce + '</td>' + '</tr>';
                            html += '</tbody>' + '</table>' + '</div>';
                            self.setContent(html);
                        } else self.setContent('Không có dữ liệu');
                    } else if (res.login && res.login == 2) {
                        window.location = res.href;
                    }
                }).fail(function () {}).always(function () {});
            }
        });
    });
    $('body').on('click', '.btn-detail-coupon-all', function () {
        var code = $(this).text();
        $.alert({
            title: "Thông tin mã coupon",
            columnClass: 'col-md-8',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/orders/getDetailCoupon',
                    type: 'GET',
                    data: {
                        code: code
                    }
                }).done(function (res) {
                    if (res.login && res.login == 1) {
                        if (!res.error) {
                            var coupon = res.data;
                            var html = '<div class="table-responsive">' + '<table class="table">' + '<thead>' + '<tr>' + '<th>Mã Coupon</th>' + '<th>Giảm trừ</th>' + '<th>Loại giảm trừ</th>' + '</tr>' + '</thead>' + '<tbody>';
                            html += '<tr>' + '<td width="45%">' + coupon.code + '</td>' + '<td width="35%">' + coupon.reduce + '</td>' + '<td width="20%">' + coupon.type_reduce + '</td>' + '</tr>';
                            html += '</tbody>' + '</table>' + '</div>';
                            self.setContent(html);
                        } else self.setContent('Không có dữ liệu');
                    } else if (res.login && res.login == 2) {
                        window.location = res.href;
                    }
                }).fail(function () {}).always(function () {});
            }
        });
    });
    $('body').on('click', '.btn-edit-order-course', function () {
        var order_detail_id = $(this).attr('data-id');
        var code = $(this).parents('tr').find('.btn-detail-coupon').text();
        var price = $(this).parents('tr').find('.price').attr('data-price');
        var price_fee = $(this).parents('tr').find('.price_fee').attr('data-price-fee');
        $.confirm({
            title: 'Cập nhật đơn hàng ',
            columnClass: 'dialog-update-order',
            type: 'blue',
            content: '' + '<div class="input-update-order">' + '<form id="add-user">' + '<div class="form-group">' + '<label>Mã Coupon</label>' + '<input type="text" placeholder="Mã Coupon" name="code" class="form-control" value="' + code + '" id="code-coupon"/>' + '</div>' + '<div class="form-group">' + '<label>Giá gốc</label>' + '<input type="text" placeholder="Giá gốc" name="price" class="form-control" value="' + price + '" id="price-update" disabled/>' + '</div>' + '<div class="form-group">' + '<label>Giá bán</label>' + '<input type="text" placeholder="Giá mua" name="price_fee" class="form-control" value="' + price_fee + '" id="price-fee-update"/>' + '</div>' + '</form>' + '<div class="invalid-feedback"></div>' + '</div>',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var form;
                        form = {
                            '_token': $.cookie('_token'),
                            'order_detail_id': order_detail_id,
                            'code': $('#code-coupon').val(),
                            'price': $('#price-update').val(),
                            'price_fee': $('#price-fee-update').val(),
                            'type': 'retail_course'
                        };
                        $.get('/orders/updateDetailOrder', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                if (rs.error) {
                                    for (var i in rs.msg) {
                                        var _error8 = '';
                                        for (var i in rs.msg) {
                                            _error8 += '- ' + rs.msg[i] + '<br>';
                                        }
                                        _this.$content.find('.invalid-feedback').html(_error8).show();
                                    }
                                } else {
                                    _this.close();
                                    LHM.common.notify(null, 'success', rs.msg[0]);
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 1000);
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-edit-order', function () {
        var order_detail_id = $(this).attr('data-id');
        var code = $(this).parents('tr').find('.btn-detail-coupon').text();
        var price = $(this).parents('tr').find('.price').attr('data-price');
        var price_fee = $(this).parents('tr').find('.price_fee').attr('data-price-fee');
        $.confirm({
            title: 'Cập nhật đơn hàng ',
            columnClass: 'dialog-update-order',
            type: 'blue',
            content: '' + '<div class="input-update-order">' + '<form id="add-user">' + '<div class="form-group">' + '<label>Mã Coupon</label>' + '<input type="text" placeholder="Mã Coupon" name="code" class="form-control" value="' + code + '" id="code-coupon"/>' + '</div>' + '<div class="form-group">' + '<label>Giá gốc</label>' + '<input type="text" placeholder="Giá gốc" name="price" class="form-control" value="' + price + '" id="price-update" disabled/>' + '</div>' + '<div class="form-group">' + '<label>Giá bán</label>' + '<input type="text" placeholder="Giá mua" name="price_fee" class="form-control" value="' + price_fee + '" id="price-fee-update"/>' + '</div>' + '</form>' + '<div class="invalid-feedback"></div>' + '</div>',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var form;
                        form = {
                            '_token': $.cookie('_token'),
                            'order_detail_id': order_detail_id,
                            'code': $('#code-coupon').val(),
                            'price': $('#price-update').val(),
                            'price_fee': $('#price-fee-update').val(),
                            'type': 'retail_combo'
                        };
                        $.get('/orders/updateDetailOrder', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                if (rs.error) {
                                    for (var i in rs.msg) {
                                        var _error9 = '';
                                        for (var i in rs.msg) {
                                            _error9 += '- ' + rs.msg[i] + '<br>';
                                        }
                                        _this.$content.find('.invalid-feedback').html(_error9).show();
                                    }
                                } else {
                                    _this.close();
                                    LHM.common.notify(null, 'success', rs.msg[0]);
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 1000);
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-edit-order-all', function () {
        var order_detail_id = $(this).attr('data-id');
        var code = $(this).parents('tr').find('.btn-detail-coupon-all').text();
        $.confirm({
            title: 'Cập nhật đơn hàng ',
            columnClass: 'dialog-update-order-code-all',
            type: 'blue',
            content: '' + '<div class="input-update-order">' + '<form id="add-user">' + '<div class="form-group">' + '<label>Mã Coupon</label>' + '<input type="text" placeholder="Mã Coupon" name="code" class="form-control" value="' + code + '" id="code-coupon"/>' + '</div>' + '</form>' + '<div class="invalid-feedback"></div>' + '</div>',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var form;
                        form = {
                            '_token': $.cookie('_token'),
                            'order_detail_id': order_detail_id,
                            'code': $('#code-coupon').val(),
                            'type': 'retail_code_all'
                        };
                        $.get('/orders/updateDetailOrder', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                if (rs.error) {
                                    for (var i in rs.msg) {
                                        var _error10 = '';
                                        for (var i in rs.msg) {
                                            _error10 += '- ' + rs.msg[i] + '<br>';
                                        }
                                        _this.$content.find('.invalid-feedback').html(_error10).show();
                                    }
                                } else {
                                    // _this.close();
                                    LHM.common.notify(null, 'success', rs.msg[0]);
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 1000);
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-edit-order-membership', function () {
        var order_detail_id = $(this).attr('data-id');
        var price = $(this).parents('tr').find('.price').attr('data-price');
        var type_package_order = $(this).parents('tr').find('.period').attr('data-type_package');
        var month = $(this).parents('tr').find('.period').attr('data-month');
        $.confirm({
            title: 'Cập nhật đơn hàng ',
            columnClass: 'dialog-update-order-membership',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/orders/getSiteMembership',
                    type: 'GET',
                    success: function success(res) {
                        if (res.login && res.login == 1) {
                            if (!res.error) {
                                if (res.data) {
                                    var months = [];
                                    var html = '<div id="update-membership" style="margin-top: 10px;">';
                                    html += '<div class="form-group">' + '<label>Gói Membership: </label>';
                                    html += '<div class="non-exist-membership"></div>';
                                    html += '<select class="form-control input-flat" id="membership" name="membership">';
                                    html += ' <option value="" price="">--Chọn gói membership--</option>';
                                    $.each(res.data, function (k, v) {
                                        months[k] = v.month;
                                        html += ' <option value="' + v.month + '" type_package="' + v.type + '" price="' + v.price + '">' + v.name + '</option>';
                                    });
                                    html += '</select>';
                                    html += '</div>';
                                    html += '<div class="form-group">' + '<label>Giá : </label>' + '<input type="text" id="price_membership" class="form-control" placeholder="Giá" value="' + price + '"/>' + '</div>';
                                    html += '<div class="invalid-feedback"></div></div>';
                                    self.setContent(html);
                                    setTimeout(function () {
                                        $('#membership').on('change', function (e) {
                                            var price = $('select#membership option:selected').attr('price');
                                            var type_package = $('select#membership option:selected').attr('type_package');
                                            $('#price_membership').val(parseInt(price));
                                            $('#price_membership').attr('readonly', true);
                                            $('#price_membership').attr('type_package', type_package);
                                        });
                                        if (jQuery.inArray(parseInt(month), months) < 0) {
                                            $('.non-exist-membership').html('<span class="text-danger">Gói membership ' + month + ' ' + type_package_order + ' đã hết - Vui lòng chọn các gói dưới đây</span>');
                                        } else {
                                            $("#membership").val(month).change();
                                            $('#price_membership').val(price);
                                        }
                                    }, 500);
                                }
                            } else {
                                self.buttons.formSubmit.hide();
                                self.setContent('<p class="text-danger">Cài đặt membership chưa được cài đặt</p>');
                            }
                        } else if (res.login && res.login == 2) {
                            window.location = res.href;
                        }
                    }
                });
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var form;
                        form = {
                            '_token': $.cookie('_token'),
                            'order_detail_id': order_detail_id,
                            'month': $('#membership').val(),
                            'type': 'membership',
                            'type_package': $('#price_membership').attr('type_package')
                        };
                        $.get('/orders/updateDetailOrder', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                if (rs.error) {
                                    for (var i in rs.msg) {
                                        var _error11 = '';
                                        for (var i in rs.msg) {
                                            _error11 += '- ' + rs.msg[i] + '<br>';
                                        }
                                        _this.$content.find('.invalid-feedback').html(_error11).show();
                                    }
                                } else {
                                    _this.close();
                                    LHM.common.notify(null, 'success', rs.msg[0]);
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 1000);
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-add-order-detail', function () {
        var order_id = $(this).data('id');
        var type = $(this).data('type');
        var label = $(this).data('label-type');
        $.confirm({
            title: 'Thêm mới',
            columnClass: 'dialog-add-order col-md-6',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: function content() {
                var self = this;
                if (type != 'membership') {
                    if (type == 'comboquiz') {
                        var quiz_combo = [];
                        $('#list-order-data tbody tr').each(function (index, el) {
                            quiz_combo.push($(el).data('id'));
                        });
                        var val_post = {
                            type: type,
                            order_id: order_id,
                            quiz_combo: quiz_combo
                        };
                    } else if (type == 'combodocument') {
                        var document_combo = [];
                        $('#list-order-data tbody tr').each(function (index, el) {
                            document_combo.push($(el).data('id'));
                        });
                        var val_post = {
                            type: type,
                            order_id: order_id,
                            document_combo: document_combo
                        };
                    } else {
                        var val_post = {
                            type: type,
                            order_id: order_id
                        };
                    }
                    return $.ajax({
                        url: base_url + '/orders/getCourseOfOrder',
                        data: val_post,
                        dataType: 'json',
                        type: 'GET',
                        success: function success(res) {
                            if (res.login && res.login == 1) {
                                if (!res.error) {
                                    var text_select = "--Chọn khóa học--";
                                    if (res.course) {
                                        var data_order = res.course;
                                    } else if (res.combo) {
                                        var data_order = res.combo;
                                        var text_select = "--Chọn gói khóa học--";
                                    } else if (res.comboquiz) {
                                        var data_order = res.comboquiz;
                                        var text_select = "--Chọn combo đề thi--";
                                    } else if (res.combodocument) {
                                        var data_order = res.combodocument;
                                        var text_select = "--Chọn combo tài liệu--";
                                    }
                                    if (data_order) {
                                        var html = '<div id="update-course" style="margin-top: 10px;">';
                                        html += '<div class="form-group" id="list-course">' + '<label class="toUpperCase">' + label + '</label></br>';
                                        html += '<select class="form-control" id="course" name="course">';
                                        html += ' <option value="">' + text_select + '</option>';
                                        $.each(data_order, function (k, v) {
                                            html += ' <option value="' + v._id['$id'] + '" price_sell="' + v.price_sell + '" price="' + v.price + '">' + v.name + '</option>';
                                        });
                                        html += '</select>';
                                        html += '</div>';
                                        html += '<div class="form-group">' + '<label>Giá gốc</label>' + '<input type="number" placeholder="Giá gốc" name="price" class="form-control" value="0" id="price" readonly/>' + '</div>' + '<div class="form-group">' + '<label>Giá bán</label>' + '<input type="number" placeholder="Giá bán" name="price_fee" class="form-control" value="0" id="price-sell" />' + '</div>';
                                        html += '<div class="invalid-feedback"></div></div>';
                                        self.setContent(html);
                                    }
                                } else {
                                    self.buttons.formSubmit.hide();
                                    self.setContent('<p>Không có dữ liệu</p>');
                                }
                            } else if (res.login && res.login == 2) {
                                window.location = res.href;
                            }
                        }
                    });
                }
            },
            onContentReady: function onContentReady() {
                if (type == 'retail') {
                    $('#course').select2({
                        allowClear: true,
                        placeholder: "--- Chọn khóa học ---"
                    });
                } else if (type == 'combo') {
                    $('#course').select2({
                        allowClear: true,
                        placeholder: "--- Chọn gói khóa học ---"
                    });
                } else if (type == 'comboquiz') {
                    $('#course').select2({
                        allowClear: true,
                        placeholder: "--- Chọn combo đề thi ---"
                    });
                } else if (type == 'combodocument') {
                    $('#course').select2({
                        allowClear: true,
                        placeholder: "--- Chọn combo tài liệu ---"
                    });
                }
                $('#course').on('change', function (e) {
                    var price_sell = $('select#course option:selected').attr('price_sell');
                    var price = $('select#course option:selected').attr('price');
                    $('#price-sell').val(price_sell);
                    $('#price').val(price);
                });
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var form;
                        if (type == 'retail') {
                            form = {
                                '_token': $.cookie('_token'),
                                'course_id': $('#course').val(),
                                'type': type,
                                'price_sell': $('#price-sell').val(),
                                'price': $('#price').val(),
                                'order_id': order_id
                            };
                        } else if (type == 'comboquiz') {
                            form = {
                                '_token': $.cookie('_token'),
                                'combo_quiz_id': $('#course').val(),
                                'type': type,
                                'price_sell': $('#price-sell').val(),
                                'price': $('#price').val(),
                                'order_id': order_id
                            };
                        } else if (type == 'combodocument') {
                            form = {
                                '_token': $.cookie('_token'),
                                'combo_document_id': $('#course').val(),
                                'type': type,
                                'price_sell': $('#price-sell').val(),
                                'price': $('#price').val(),
                                'order_id': order_id
                            };
                        } else {
                            form = {
                                '_token': $.cookie('_token'),
                                'course_package_id': $('#course').val(),
                                'type': type,
                                'price_sell': $('#price-sell').val(),
                                'price': $('#price').val(),
                                'order_id': order_id
                            };
                        }
                        $.post('/orders/addDetailOrder', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                if (rs.error) {
                                    for (var i in rs.msg) {
                                        var _error12 = '';
                                        for (var i in rs.msg) {
                                            _error12 += '- ' + rs.msg[i] + '<br>';
                                        }
                                        _this.$content.find('.invalid-feedback').html(_error12).show();
                                    }
                                } else {
                                    _this.close();
                                    LHM.common.notify(null, 'success', rs.msg[0]);
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 1000);
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-delete-order', function () {
        var curr = this;
        var val_post = {
            _token: $.cookie('_token'),
            order_detail_id: $(curr).data('id'),
            code_order: $(curr).data('discount'),
            type: $(curr).data('type')
        };
        if ($("#list-order-data tbody tr").length > 1) {
            $.confirm({
                title: 'Xóa đơn hàng',
                content: 'Bạn có muốn tiếp tục không?',
                scrollToPreviousElement: false,
                scrollToPreviousElementAnimate: false,
                buttons: {
                    Ok: function Ok() {
                        $.ajax({
                            type: 'POST',
                            url: base_url + '/orders/deleteOrder',
                            data: val_post,
                            dataType: 'json',
                            success: function success(rs) {
                                if (rs.login && rs.login == 1) {
                                    if (!rs.error) {
                                        LHM.common.notify(null, 'success', rs.msg[0]);
                                        setTimeout(function () {
                                            window.location.reload();
                                        }, 1000);
                                    } else {
                                        LHM.common.notify(null, 'danger', 'Xảy ra lỗi - Vui lòng thử lại');
                                    }
                                } else if (rs.login && rs.login == 2) {
                                    window.location = rs.href;
                                }
                            }
                        });
                    },
                    Cancel: function Cancel() {}
                }
            });
        }
    });
    $('body').on('click', '.btn-change-sale', function () {
        var sale_id = $(this).attr('data-id');
        var order_id = $(this).attr('data-order-id');
        $.confirm({
            title: 'Cập nhật đơn hàng ',
            columnClass: 'dialog-update-order-membership',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/orders/getSaleOrder',
                    type: 'GET',
                    data: {
                        sale_id: sale_id
                    },
                    success: function success(res) {
                        if (res.login && res.login == 1) {
                            if (!res.error) {
                                if (res.data) {
                                    var months = [];
                                    var html = '<div id="change-sale" style="margin-top: 10px;">';
                                    html += '<div class="form-group">' + '<label>Chọn sale bạn muốn chuyển đến: </label>';
                                    html += '<div class="non-exist-sale"></div>';
                                    html += '<select class="form-control input-flat" id="change_sale" name="change_sale" data-order-id="' + order_id + '">';
                                    html += ' <option value="">--Chọn sale--</option>';
                                    $.each(res.data, function (k, v) {
                                        html += ' <option value="' + v._id['$id'] + '">' + v.name + '</option>';
                                    });
                                    html += '</select>';
                                    html += '</div>';
                                    html += '<div class="invalid-feedback"></div></div>';
                                    self.setContent(html);
                                }
                            } else {
                                self.buttons.formSubmit.hide();
                                self.setContent('<p class="text-danger">Đã xảy ra lỗi - Vui lòng thử lại</p>');
                            }
                        } else if (res.login && res.login == 2) {
                            window.location = res.href;
                        }
                    }
                });
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var form;
                        form = {
                            '_token': $.cookie('_token'),
                            'sale_id': $('#change_sale').val(),
                            'order_id': order_id,
                            'sale_name': $('#change_sale option:selected').html()
                        };
                        $.get('/orders/updateSaleOrder', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                if (rs.error) {
                                    _this.$content.find('.invalid-feedback').html(rs.msg[0]).show();
                                } else {
                                    _this.close();
                                    LHM.common.notify(null, 'success', rs.msg[0]);
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 1000);
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-change-money', function () {
        var order_id = $(this).attr('data-order-id');
        var money = $(this).parent().attr('data-money');
        var html = '<form>' + '<div class="form-group">' + '<label for="content">Thực nhận</label>' + '<input type="text" class="form-control order-money" placeholder="Nhập số tiền cần thay đổi..." value="' + money + '"/>' + '</div>' + '<div class="invalid-feedback"></div>' + '</form>';
        $.confirm({
            title: 'Cập nhật thực nhận',
            columnClass: 'dialog-update-order-money',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: html,
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var form;
                        form = {
                            '_token': $.cookie('_token'),
                            'money': $('.order-money').val(),
                            'order_id': order_id
                        };
                        $.get('/orders/updateMoneyOrder', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                if (rs.error) {
                                    _this.$content.find('.invalid-feedback').html(rs.msg[0]).show();
                                } else {
                                    _this.close();
                                    LHM.common.notify(null, 'success', rs.msg[0]);
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 1000);
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-change-ship-fee', function () {
        var order_id = $(this).attr('data-order-id');
        var money = $(this).parent().attr('data-money-ship');
        var html = '<form>' + '<div class="form-group">' + '<label for="content">Phí TT</label>' + '<input type="text" class="form-control order-money" placeholder="Nhập số tiền cần thay đổi..." value="' + money + '"/>' + '</div>' + '<div class="invalid-feedback"></div>' + '</form>';
        $.confirm({
            title: 'Cập nhật phí TT ',
            columnClass: 'dialog-update-order-money-ship',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: html,
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var form;
                        form = {
                            '_token': $.cookie('_token'),
                            'money': $('.order-money').val(),
                            'order_id': order_id
                        };
                        $.get('/orders/updateMoneyShipOrder', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                if (rs.error) {
                                    _this.$content.find('.invalid-feedback').html(rs.msg[0]).show();
                                } else {
                                    _this.close();
                                    LHM.common.notify(null, 'success', rs.msg[0]);
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 1000);
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-change-total-money', function () {
        var order_id = $(this).attr('data-order-id');
        var money = $(this).parent().attr('data-money');
        var html = '<form>' + '<div class="form-group">' + '<label for="content">Thu KH</label>' + '<input type="text" class="form-control order-money" placeholder="Nhập số tiền cần thay đổi..." value="' + money + '"/>' + '</div>' + '<div class="invalid-feedback"></div>' + '</form>';
        $.confirm({
            title: 'Cập nhật thu khách hàng',
            columnClass: 'dialog-update-order-total-money',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: html,
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var form;
                        form = {
                            '_token': $.cookie('_token'),
                            'money': $('.order-money').val(),
                            'order_id': order_id
                        };
                        $.get('/orders/updateTotalMoneyOrder', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                if (rs.error) {
                                    _this.$content.find('.invalid-feedback').html(rs.msg[0]).show();
                                } else {
                                    _this.close();
                                    LHM.common.notify(null, 'success', rs.msg[0]);
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 1000);
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('change', '#status_process', function () {
        var status = $(this).val();
        $('#block-sub-status').html('');
        if (status != 0 && status != 2) {
            $('#block-sub-status').html('<a href="javascript:void(0)" class="btn-add-sub-status"><i class="far fa-plus-square"></i></a>');
        }
    });
    $('body').on('click', '.btn-add-sub-status', function () {
        var status = $('#status_process').val();
        if (status != 0 && status != 2) {
            $.confirm({
                title: 'Trạng thái phụ',
                columnClass: 'dialog-update-sub-status',
                type: 'blue',
                scrollToPreviousElement: false,
                scrollToPreviousElementAnimate: false,
                content: function content() {
                    var self = this;
                    return $.ajax({
                        url: base_url + '/orders/getSubstatus',
                        type: 'GET',
                        data: {
                            status: status
                        },
                        success: function success(res) {
                            if (res.login && res.login == 1) {
                                if (res.data) {
                                    var months = [];
                                    var listSub = [];
                                    var html = '<div id="change-sub-status" style="margin-top: 10px;">';
                                    html += '<div class="form-group">' + '<label>Chọn lý do hợp lý</label>';
                                    html += '<div class="non-exist-sale"></div>';
                                    html += '<select class="form-control input-flat" id="sub_status" name="sub_status">';
                                    html += ' <option value="">--Chọn lý do--</option>';
                                    $.each(res.data, function (k, v) {
                                        listSub[k] = v;
                                        html += ' <option value="' + k + '">' + v + '</option>';
                                    });
                                    html += '</select>';
                                    html += '</div>';
                                    html += '<div class="form-group">' + '<label>Lý do khác</label>' + '<textarea name="other_sub_status" placeholder="Lý do khác" id="other_sub_status" rows="3" class="form-control"></textarea>' + '</div>';
                                    html += '<div class="invalid-feedback"></div></div>';
                                    if (res.data.length) window.subStatus = listSub;
                                    self.setContent(html);
                                } else {
                                    self.buttons.formSubmit.hide();
                                    self.setContent('<p class="text-danger">Đã xảy ra lỗi - Vui lòng thử lại</p>');
                                }
                            } else if (res.login && res.login == 2) {
                                window.location = res.href;
                            }
                        }
                    });
                },
                buttons: {
                    formSubmit: {
                        text: 'OK',
                        btnClass: 'btn-blue',
                        action: function action() {
                            var other_sub_status = jQuery("textarea#other_sub_status").val();
                            var sub_status = $('#sub_status').val();
                            $('#sub-status').val(sub_status);
                            $('#other-sub-status').val(other_sub_status);
                            if (other_sub_status) {
                                if (window.subStatus) $('#sub_status_content').text(window.subStatus[sub_status] + '/' + other_sub_status);else $('#sub_status_content').text(other_sub_status);
                            } else $('#sub_status_content').text(window.subStatus[sub_status]);
                            this.close();
                        }
                    },
                    cancel: {
                        text: 'Đóng'
                    }
                }
            });
        }
    });
    $('body').on('click', '#customer_submit', function () {
        var error = false;
        $('.error').text('');
        if ($('#fullname').val() == '') {
            $('.fullname-msg-error').text('Vui lòng điền đầy đủ họ tên');
            error = true;
        }
        if ($('#email').val() == '') {
            error = true;
            $('.email-msg-error').text('Vui lòng điền đầy đủ email');
        }
        if ($('#mobile').val() == '' || !jQuery.isNumeric($('#mobile').val()) || jQuery.isNumeric($('#mobile').val()) && $('#mobile').val().length < 10) {
            error = true;
            $('.mobile-msg-error').text('Vui lòng điền đầy đủ số điện thoại');
        }
        if ($('#city').val() == '') {
            error = true;
            $('.city-msg-error').text('Vui lòng chọn Tỉnh/Thành phố');
        }
        if (error) return false;else return true;
    });
    $('body').on('click', '.btn-apply-permission', function () {
        //reset global apply_permission
        window.apply_permission = {};
        var userId = $(this).parents('.item-user').attr('id');
        var f = $(this).parents('.item-user').find('[alt=f]').text();
        $.confirm({
            title: 'Phân quyền',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: function content() {
                var self = this;
                return $.ajax({
                    url: '/id/get_permission/' + userId + '/' + sid,
                    dataType: 'json',
                    method: 'get'
                }).done(function (response) {
                    var html = '<p>User: ' + f + '</p><div class="permissions">';
                    function treeRole(items) {
                        for (var i in items) {
                            html += '<div class="form-check">' + '<input class="form-check-input" value="' + items[i]._id['$id'] + '" type="checkbox" ' + (items[i].checked ? 'checked' : '') + ' id="' + items[i]._id['$id'] + '">' + '<label class="form-check-label" for="' + items[i]._id['$id'] + '">' + items[i].name + '</label>';
                            if (items[i].sub) {
                                treeRole(items[i].sub);
                            }
                            html += '</div>';
                        }
                    }
                    treeRole(response);
                    html += '</div>';
                    self.setContent(html);
                });
            },
            type: 'blue',
            columnClass: 'col-md-6',
            buttons: {
                OK: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        var error = _this.$content.find('.error');
                        error.html('');
                        if (Object.keys(window.apply_permission).length) {
                            //update role
                            window.apply_permission['_token'] = $.cookie('_token');
                            $.post('/id/updateUser/roles/' + userId + '/' + sid, window.apply_permission, function (rs) {
                                if (rs.login && rs.login == 1) {
                                    if (rs.error) {
                                        for (var i in rs.msg) {
                                            LHM.common.notify(null, 'warning', rs.msg[i]);
                                        }
                                    } else {
                                        LHM.common.notify(null, 'success', 'Đã cập nhật quyền');
                                        _this.close();
                                    }
                                } else if (rs.login && rs.login == 2) {
                                    window.location = rs.href;
                                }
                            });
                        } else _this.close();
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.permissions input:checkbox', function () {
        var checked = $(this).is(":checked");
        var val = $(this).val();
        window.apply_permission[val] = checked;
    });
    $('body').on('change', '.input-add-user input[name=acc]:radio', function () {
        var val = $(this).val();
        $('#exist-account, #non-account,#user-group').hide();
        $('.area-error').html('');
        $('.input-add-user #' + val).show();
        $('.invalid-feedback').hide();
    });
    $('body').on('change', '.input-invite-student input[name=student]:radio', function () {
        var val = $(this).val();
        $('#invite-student-course, #invite-email,#invite-student-registed').hide();
        $('.input-invite-student #' + val).show();
        if (val == 'invite-student-course') {
            $('#invite-student-course-select').select2({
                allowClear: true,
                placeholder: "--- Chọn học viên ---"
            });
        } else {
            $('#invite-student-registed-select').select2({
                allowClear: true,
                placeholder: "--- Chọn học viên ---"
            });
        }
        $('.invalid-feedback').hide();
    });
    $('body').on('change', '.input-add-user input[name=course]:radio', function () {
        var val = $(this).val();
        $('#courses-single, #course_packages').hide();
        $('.input-add-user #' + val).show();
        $('.invalid-feedback').hide();
    });
    $('body').on('change', '#edit-user #change-pw', function () {
        var checked = $(this).is(":checked");
        $('#edit-user #input-change-pw').hide();
        if (checked) {
            $('#edit-user #input-change-pw').show();
        }
    });
    $('body').on('change', '#edit-teacher input:checkbox', function () {
        var checked = $(this).is(":checked");
        $('#edit-teacher #input-change-pw').hide();
        if (checked) {
            $('#edit-teacher #input-change-pw').show();
        }
    });
    $('body').on('click', '.btn-add-course-package', function () {
        $('#wrap-add-combo-courses').show();
        $('#wrap-combo-courses').hide();
        $('#create_combo_course')[0].reset();
        // $('#hash_tag').importTags('');
        $('#id_image').val('');
        $('#course_id').val('');
        $('input[type=radio][value=free]').trigger('click');
        $('#hide-paid').hide();
        $('.btn-save-combo').html('<i class="fa fa-save"></i> Tạo mới');
        $('.lbl-action-course-group').text('THÊM MỚI');
        $('#id_image_cover').val('');
        CKEDITOR.instances.course_info.setData('');
        CKEDITOR.instances.instructors_info.setData('');
        $.ajax({
            url: base_url + '/courses/create_combo_course',
            data: {
                sid: sid
            },
            type: 'GET',
            success: function success(res) {
                if (res.login && res.login == 1) {
                    if (res.success) {
                        if (res.data) {
                            $('.upload-cover').find('img').attr('src', res.cover);
                            var html = '';
                            html += '<select class="form-control" id="slt-courses-add" multiple name="list_courses[]">';
                            html += '<label for="reduce">Khóa học</label>';
                            $.each(res.data, function (k, v) {
                                html += '<option value="' + v._id['$id'] + '" ' + v.selected + '>' + v.name + '</option>';
                            });
                            html += '</select>';
                            html += '<input type="hidden" id="count_course_add" value="' + res.data.length + '">';
                            $('#wrap-select-list-course').html(html);
                            $('#slt-courses-add').select2({
                                allowClear: true,
                                placeholder: "--- Chọn khóa học ---",
                                closeOnSelect: false
                            })
                            $(document).on('click', '#select_all_course', function () {
                                if ($("#select_all_course").is(':checked')) {
                                    $("#slt-courses-add > option").prop("selected", "selected");
                                    $("#slt-courses-add").trigger("change");
                                } else {
                                    $("#slt-courses-add > option").prop("selected", "");
                                    $("#slt-courses-add").trigger("change");
                                }
                            });
                            $('#slt-courses-add').on('select2:unselecting', function (e) {
                                $('#select_all_course').prop('checked', false);
                            });
                            $('#slt-courses-add').on('select2:select', function (e) {
                                var element = e.params.data.element;
                                var $element = $(element);
                                $element.detach();
                                $(this).append($element);
                                $(this).trigger("change");
                                if ($('#count_course_add').val() == $(this).val().length) $('#select_all_course').prop('checked', true);
                            });
                        }
                        var html_tag = '';
                        html_tag += '<select class="form-control" id="hash_tag" multiple name="hash_tag">';
                        if (res.data_tag) {
                            $.each(res.data_tag, function (k1, v1) {
                                html_tag += '<option value="' + v1._id['$id'] + '">' + v1.name + '</option>';
                            });
                        }
                        html_tag += '</select>';
                        $('#wrap-select-list-tag-combo').html(html_tag);
                        $('#hash_tag').select2({
                            allowClear: true,
                            placeholder: "--- Chọn tag ---"
                        });
                        $('#hash_tag').select2Sortable();
                    }
                } else if (res.login && res.login == 2) {
                    window.location = res.href;
                }
            }
        });
    });
    $('body').on('click', 'a.btn-edit-combo-site', function () {
        LHM.combosite.load($(this).attr('data-id'), $(this).attr('data-type'));
    }).on('click', 'a.js-add-category-to-group', function () {
        var tr = $(this).closest('tr'),
            id = tr.data('id');
        if (id) {
            $.confirm({
                title: __('Danh mục nhóm'),
                columnClass: 'col-md-6',
                content: "\n                    <div><b>Nh\xF3m: </b>".concat(tr.find('td:nth-child(2)').text(), "</div>\n                    <div><select id=\"add_category_group\" name=\"add_category_group\" class=\"form-control\" multiple data-value=\"").concat(tr.attr('data-category-id'), "\"></select></div>\n                "),
                onContentReady: function onContentReady() {
                    LHM.category.selectList('#add_category_group', 'combo_document');
                },
                buttons: {
                    Ok: function Ok() {
                        var that = this,
                            categories = $('[name="add_category_group"]').val();
                        $.confirm({
                            title: __('Xác nhận'),
                            content: "<div class=\"text-danger\">".concat(__('Bạn có chắc chắn muốn lưu lại cài đặt đã chọn?'), "</div>"),
                            buttons: {
                                Ok: function Ok() {
                                    $.post('/groups/addCategoryByGroup/' + id, {
                                        _token: $.cookie('_token'),
                                        category_id: categories
                                    }, function (res) {
                                        if (res.success) {
                                            var _res$category_title;
                                            LHM.common.notify(null, 'success', res.message ? res.message : 'Cập nhật thành công');
                                            tr.attr('data-category-id', categories);
                                            tr.find('td:nth-child(4)').html((_res$category_title = res.category_title) !== null && _res$category_title !== void 0 ? _res$category_title : '');
                                        } else {
                                            LHM.common.notify(null, 'danger', res.message ? res.message : 'Cập nhật thất bại');
                                        }
                                    });
                                    setTimeout(function () {
                                        that.close();
                                    }, 1000);
                                },
                                cancel: {}
                            }
                        });
                        return false;
                    },
                    cancel: {}
                }
            });
        }
    });
    $('body').on('click', '.btn-remove-course-package', function () {
        var id = $(this).data('id');
        var curr = $(this);
        $.confirm({
            title: 'Cảnh báo',
            content: 'Bạn có chắc chắn muốn xóa không ?',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            buttons: {
                OK: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        $.ajax({
                            type: 'POST',
                            url: '/courses/del_course_package',
                            data: {
                                id: id,
                                _token: $.cookie('_token')
                            },
                            dataType: "json",
                            success: function success(rs) {
                                if (rs.login && rs.login == 1) {
                                    if (rs.success) {
                                        LHM.common.notify(null, 'success', 'Xóa thành công');
                                        curr.parents('tr').remove();
                                        if (!$('#list_course_package tr').length) $('#list_course_package').html('<tr><td colspan="4">Không có dữ liệu</td></tr>');
                                    }
                                } else if (rs.login && rs.login == 2) {
                                    window.location = rs.href;
                                }
                            }
                        });
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', 'a.btn-remove-combo-site', function () {
        var id = $(this).attr('data-id');
        if (id) {
            LHM.common.confirmAjax('/combosite/delete/' + id, 'POST', {
                _token: $.cookie('_token'),
                post: 1
            }, function (res) {
                if (res.success) {
                    LHM.common.notify(null, 'success', res.message ? res.message : 'Xóa combo thành công');
                    var textInit = 'course_document_package';
                    if (res.type && res.type == '1') {
                        textInit = 'combos_quiz';
                    }
                    LHM.mnDashboard.init(textInit);
                } else {
                    LHM.common.notify(null, 'danger', res.message ? res.message : 'Xóa combo thất bại');
                }
            }, null, "Xác nhận xóa combo", "Bạn có chắc chắn muốn xóa combo này?");
        }
    });
    $('body').on('click', '.btn-remove-code-active-course', function () {
        LHM.common.confirmAjax('/discount-course/delete', 'POST', {
            _token: $.cookie('_token'),
            itemId: $(this).data('id_code')
        }, function () {
            LHM.common.notify(null, 'success', 'Xóa thành công');
            LHM.mnDashboard.getActiveCode(0);
        }, null, 'Xóa mã kích hoạt', 'Bạn có chắc chắn muốn xóa mã kích hoạt này?');
    });
    $('body').on('click', '.btn-edit-course-package', function () {
        var id = $(this).data('id');
        $('#wrap-add-combo-courses').show();
        $('#wrap-combo-courses').hide();
        $('#course_id').val(id);
        $('#create_combo_course')[0].reset();
        $('.btn-save-combo').html('<i class="fa fa-save"></i> Cập nhật');
        $('.upload-cover').find('.preview-cover').attr('src', base_url + '/data/share/no-thumb.png');
        $('.upload-cover').find('.preview-thumbnail').attr('src', base_url + '/data/share/no-thumb.png');
        $.ajax({
            url: base_url + '/courses/update_combo_course',
            data: {
                id: id
            },
            type: 'GET',
            success: function success(res) {
                if (res.login && res.login == 1) {
                    if (res.success) {
                        if (res.data) {
                            $('#combo_course_name').val(res.course_package.name);
                            $('.lbl-action-course-group').text('SỬA GÓI KHÓA HỌC: ' + res.course_package.name);
                            $('input[type=radio][value=' + res.course_package.status + ']').prop('checked', true);
                            $('#video_ad').val(res.course_package.video_intro);
                            $('.preview-cover').attr('src', res.course_package.coverurl);
                            $('.preview-thumbnail').attr('src', res.course_package.thumbnailurl);
                            $('.chk_trial_combo').prop('checked', res.course_package.trial).trigger('change');
                            $('.trial_date').val(res.course_package.trial_date);
                            $('.price_trial').val(res.course_package.price_trial);
                            $('#url-seo').val(res.course_package.url);
                            $('#seo_title').val(res.course_package.seo_title);
                            $('#keywords').val(res.course_package.keywords);
                            $('#seo_description').val(res.course_package.seo_description);
                            $('#sms_syntax').val(res.course_package.sms_syntax);
                            $('#sms_syntax_trial').val(res.course_package.sms_syntax_trial);
                            CKEDITOR.instances.course_info.setData(res.course_package.about_courses);
                            CKEDITOR.instances.instructors_info.setData(res.course_package.about_instructor);
                            if (res.course_package.price > 0) {
                                $('input[type=radio][value=paid]').trigger('click');
                                $('#currency').val(res.course_package.price).attr('data-unit', res.unit);
                                $('#currency_sell').val(res.course_package.price_sell).attr('data-unit', res.unit);
                                if (res.unit == '$') {
                                    $('#price_format').text(parseFloat(res.course_package.price.replace(/[^\d.]/g, '')).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }));
                                    $('#price_sell_format').text(parseFloat(res.course_package.price.replace(/[^\d.]/g, '')).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }));
                                } else {
                                    $('#price_format').text(Math.floor(res.course_package.price).toLocaleString('en-US'));
                                    $('#price_sell_format').text(Math.floor(res.course_package.price).toLocaleString('en-US'));
                                }
                            } else {
                                $('#hide-paid').hide();
                                $('input[type=radio][value=free]').trigger('click');
                            }
                            var html = '';
                            if (res.course_package.select_all) $('#select_all_course').prop('checked', true);
                            html += '<select class="form-control" id="slt-courses-edit" multiple name="list_courses[]">';
                            html += '<label for="reduce">Khóa học</label>';
                            $.each(res.data, function (k, v) {
                                html += '<option value="' + v._id['$id'] + '" ' + v.selected + '>' + v.name + '</option>';
                            });
                            html += '</select>';
                            html += '<input type="hidden" id="count_course_edit" value="' + res.data.length + '">';
                            $('#wrap-select-list-course').html(html);
                            $('#slt-courses-edit').select2({
                                allowClear: true,
                                placeholder: "--- Chọn khóa học ---",
                                closeOnSelect: false
                            });
                            $(document).on('click', '#select_all_course', function () {
                                if ($("#select_all_course").is(':checked')) {
                                    $("#slt-courses-edit > option").prop("selected", "selected");
                                    $("#slt-courses-edit").trigger("change");
                                } else {
                                    $("#slt-courses-edit > option").prop("selected", "");
                                    $("#slt-courses-edit").trigger("change");
                                }
                            });
                            $('#slt-courses-edit').on('select2:unselecting', function (e) {
                                $('#select_all_course').prop('checked', false);
                            });
                            $('#slt-courses-edit').on('select2:select', function (e) {
                                var element = e.params.data.element;
                                var $element = $(element);
                                $element.detach();
                                $(this).append($element);
                                $(this).trigger("change");
                                if ($('#count_course_edit').val() == $(this).val().length) $('#select_all_course').prop('checked', true);
                            });
                            var html_tag = '';
                            html_tag += '<select class="form-control" id="hash_tag" multiple name="hash_tag">';
                            if (res.course_package.tags) {
                                $.each(res.course_package.tags, function (k1, v1) {
                                    html_tag += '<option value="' + v1._id['$id'] + '" ' + v1.selected + '>' + v1.name + '</option>';
                                });
                            }
                            html_tag += '</select>';
                            $('#wrap-select-list-tag-combo').html(html_tag);
                            $('#hash_tag').select2({
                                allowClear: true,
                                placeholder: "--- Chọn tag ---"
                            });
                            $('#hash_tag').select2Sortable();
                            $('input[type=radio][value=' + res.course_package.type_expired + ']').trigger('click');
                            $('#expired_course').val(res.course_package.expired_course);
                            $('#create_combo_course #text_sell').val(res.course_package.text_sell);
                            if (res.course_package.display_text_sell && res.course_package.display_text_sell == 1) {
                                $('#create_combo_course #display_text_sell').prop('checked', true);
                            } else {
                                $('#create_combo_course #display_text_sell').prop('checked', false);
                            }
                            $('.type-course input:radio').change(function () {
                                var alt = $(this).attr('alt');
                                $(this).parents('.type-course').find('p').hide();
                                $(this).parents('.type-course').find('p.' + alt).show();
                            });
                        }
                    }
                } else if (res.login && res.login == 2) {
                    window.location = res.href;
                }
            }
        });
    });
    $(document).on('change', '#file_excel_user_group', function () {
        var that = this;
        if (that.files.length) {
            window.excelData = [];
            window.arrayConvert = [];
            var file = that.files[0].name;
            $('span.file_excel_user_group_name').text(file);
            $('button.btn-update-student').toggle(!!file);
            readFileExcel(that, function (excelData, arrayConvert) {
                window.excelData = excelData;
                window.arrayConvert = arrayConvert;
                $('.data-text-file_excel_user_group').text('Dữ liệu đã nhận: ' + excelData.length + ' dữ liệu học viên');
            });
        }
    }).on('click', '#form-add-user-group button.btn-update-student', function () {
        if (window.excelData && window.excelData.length) {
            var processAddExcel = function processAddExcel(page) {
                var dataExcel = window.excelData.splice(0, limit);
                if (dataExcel.length) {
                    $.ajax({
                        type: 'POST',
                        url: '/sites/createStudentCMSByExcel',
                        data: $.param({
                            items: dataExcel
                        }) + '&show_id=1&_token=' + $.cookie('_token'),
                        not_loading: true,
                        dataType: 'json'
                    }).always(function (res) {
                        loadingProcess(Math.ceil(100 * (limit * page + dataExcel.length) / totalItem));
                        if (res.items && res.items.length) {
                            dataResult = dataResult.concat(res.items);
                        }
                        $.each(dataExcel, function (k, v) {
                            var _res$items$k$, _res$items, _res$items$k, _res$items2, _res$items2$k;
                            v.log = (_res$items$k$ = res === null || res === void 0 ? void 0 : (_res$items = res.items) === null || _res$items === void 0 ? void 0 : (_res$items$k = _res$items[k]) === null || _res$items$k === void 0 ? void 0 : _res$items$k[1]) !== null && _res$items$k$ !== void 0 ? _res$items$k$ : 'Chưa có kết quả';
                            var class_tr = (res === null || res === void 0 ? void 0 : (_res$items2 = res.items) === null || _res$items2 === void 0 ? void 0 : (_res$items2$k = _res$items2[k]) === null || _res$items2$k === void 0 ? void 0 : _res$items2$k[2]) === '1' ? '' : 'color-while bg-danger';
                            if (!result_html) {
                                result_html += '<tr class="text-center font-weight-bold bg-f5">' + Object.keys(v).map(function (key) {
                                    return "<td>".concat(key, "</td>");
                                }).join('') + '</tr>';
                            }
                            result_html += '<tr class="' + class_tr + '">' + Object.values(v).map(function (value) {
                                return "<td>".concat(value, "</td>");
                            }).join('') + '</tr>';
                        });
                        if (res.ids && res.ids.length) {
                            $.each(res.ids, function (k2, v2) {
                                if (!$('#list-student #st-' + v2.id['$id']).length) {
                                    $('#list-student').append('<tr id="st-' + v2.id['$id'] + '"><td><input type="hidden" name="user_groups[]" value="' + v2.id['$id'] + '">' + v2.full_name + ' ' + v2.email + '</td><td class="text-right"><a href="javascript:;" class="btn-remove-assign-student"><i class="fas fa-window-close text-danger"></i></a></td></tr>');
                                }
                            });
                        }
                        processAddExcel(++page);
                    });
                } else {
                    stopLoadingProcess();
                    LHM.common.notify(null, 'success', 'Đã import xong dữ liệu! Bạn vui lòng kiểm tra kết quả trả về');
                    $('.file_excel_user_group_name, .data-text-file_excel_user_group').text('');
                    $('button.btn-update-student').hide();
                    $('#file_excel_user_group').val('');
                    $.confirm({
                        title: "Kết quả import Excel",
                        columnClass: 'container',
                        content: '<div class="table-responsive"><table class="table table-bordered"><tbody>' + result_html + '</tbody></table></div>',
                        buttons: {
                            Ok: {}
                        }
                    });
                }
            };
            var limit = 20;
            var totalItem = window.excelData.length;
            var dataResult = [];
            var result_html = '';
            LHM.common.notify(null, 'success', 'Hệ thông đang tiến hành thêm dữ liệu. Xin vui lòng đợi');
            loadingProcess(0);
            processAddExcel(0);
        }
    });
    $('body').on('click', '.btn-delete-link-file-document a', function () {
        var that = $(this);
        $.confirm({
            title: 'Xóa tài liệu',
            content: 'Bạn có chắc chắn muốn xóa tài liệu này?',
            buttons: {
                Ok: {
                    text: 'Đồng ý',
                    action: function action() {
                        that.parents('div.item_document_multi:first').remove();
                    }
                },
                Cancel: {
                    text: 'Đóng'
                }
            }
        });
    }).on('click', 'a.btn-download-document-new', function () {
        var comboId = $(this).attr('data-combo'),
            itemId = $(this).attr('data-item');
        $.get("/combosite/downloadFileNew/".concat(comboId, "/").concat(itemId), function (res) {
            if (res.href) {
                window.open(res.href, "_blank");
            } else {
                LHM.common.notify(null, 'danger', res.message ? res.message : 'Có lỗi xảy ra');
            }
        });
    }).on('click', 'a.btn-download-document-web-view', function () {
        var comboId = $(this).data('combo'),
            user_id = $(this).data('user-id'),
            index = $(this).data('index');
        $.get("/combosite/downloadFileWebview/".concat(comboId, "/").concat(user_id, "/").concat(index), function (res) {
            if (res.href) {
                fetch(res.href).then(function (response) {
                    return response.blob();
                }).then(function (blob) {
                    var _res$basename;
                    var link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = (_res$basename = res.basename) !== null && _res$basename !== void 0 ? _res$basename : 'tai-lieu';
                    link.click();
                })["catch"](console.error);
                // window.open(res.href, "_blank");
            } else {
                LHM.common.notify(null, 'danger', res.message ? res.message : 'Có lỗi xảy ra');
            }
        });
    });
    $('body').on('click', '.btn-add-user-group', function () {
        $('#wrap-add-user-group').show();
        $('#wrap-user-group, .btn-update-student').hide();
        $('.area-error').html('');
        $('#user_group_name').val('');
        $('#list-assign-student #list-student').html('');
        $('#type-action').val('add');
        $('.lbl-action-user-group').text('THÊM MỚI');
        $('#count_row_course').val(0);
        $('#count_row_combo').val(0);
        $('#list-combo-in-group tbody').html('');
        $('#list-course-in-group tbody').html('');
        $('.file_excel_user_group_name, .data-text-file_excel_user_group').text('');
        $("#file_excel_user_group").val('');
        $("#file_excel_user_group").prev("a").text('');
        if ($('#category_id_group').length) {
            if (!$('#category_id_group').hasClass('added_category')) {
                $('#category_id_group').addClass('added_category');
                LHM.category.selectList('#category_id_group', 'combo_document');
            }
            $('#category_id_group').val([]).trigger("change");
        }
        $.ajax({
            url: base_url + '/groups/create_user_group',
            type: 'GET',
            success: function success(res) {
                if (res.login && res.login == 1) {
                    window.courses_in_group = res.courses;
                    window.combo_in_group = res.course_packages;
                    var list_teacher = '';
                    list_teacher += '<select id="list_teacher-select-user-group-add" class="form-control" name="list_teacher">';
                    list_teacher += '<option value="">Chọn giảng viên</option>';
                    $.each(res.list_teacher, function (k, v) {
                        list_teacher += '<option value="' + v._id['$id'] + '">' + v.name + '</option>';
                    });
                    list_teacher += '</select>';
                    $('#list-teacher').html(list_teacher);
                    $('#id-user-group').val('');
                    $('#list_teacher-select-user-group-add').select2({
                        allowClear: true,
                        placeholder: "--- Chọn giảng viên ---"
                    });
                } else if (res.login && res.login == 2) {
                    window.location = res.href;
                }
            }
        });
    });
    $('body').on('click', '.btn-save-user-group', function () {
        var url = '/groups/submitUserGroup';
        $.confirm({
            title: __('Xác nhận'),
            content: "<div class=\"text-danger\">".concat(__('Bạn có chắc chắn muốn lưu lại cài đặt đã chọn?'), "</div>"),
            buttons: {
                Ok: function Ok() {
                    $('#form-add-user-group').ajaxSubmit({
                        type: 'POST',
                        url: url,
                        data: {
                            _token: $.cookie('_token'),
                            id: $('#id-user-group').val()
                        },
                        dataType: 'json',
                        success: function success(rs) {
                            if (rs.login && rs.login == 1) {
                                if (rs.error) {
                                    $('.area-error').html('');
                                    $.each(rs.msg, function (index, el) {
                                        if (index == 'user_group_name' || index == 'user_groups' || index == 'excel_user_group') {
                                            $('.block-error-' + index).html('<p class="text-danger">' + el + '</p>');
                                        } else {
                                            $.each(el, function (k, v) {
                                                $('.invalid-' + index + '-' + k).html(v);
                                            });
                                        }
                                    });
                                } else {
                                    LHM.common.notify(null, 'success', 'Lưu thành công');
                                    $('#form-add-user-group')[0].reset();
                                    $('#wrap-add-user-group').hide();
                                    $('#wrap-user-group').show();
                                    $('#v-pills-user-group-tab').click();
                                    $("#file_excel_user_group").prev("a").text('');
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        },
                        error: function error() {
                            LHM.common.notify(null, 'danger', 'có lỗi xảy ra trong quá trình upload');
                        }
                    });
                },
                cancel: {}
            }
        });
    });
    $('body').on('click', '.btn-view-user-group', function () {
        var id = $(this).data('id');
        $.confirm({
            title: 'Danh sách học viên trong nhóm',
            columnClass: 'col-md-8',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/groups/detail_user_group',
                    data: {
                        id: id
                    },
                    type: 'GET',
                    success: function success(res) {
                        if (res.login && res.login == 1) {
                            if (res.success) {
                                if (res.data) {
                                    var html = '';
                                    html += '<div class="table-responsive">' + '<table class="table">' + '<thead>' + '<tr>' + '<th>Họ tên</th>' + '<th>Email</th>' + '<th>Số điện thoại</th>' + '</tr>' + '</thead>' + '<tbody>';
                                    $.each(res.data, function (k, v) {
                                        html += '<tr>' + '<td>' + v.name + '</td>' + '<td>' + v.email + '</td>' + '<td>' + v.phone + '</td>' + '</tr>';
                                    });
                                    html += '</tbody>' + '</table>' + '</div>';
                                    html += '<h4 style="font-weight:400;">Khóa học đã gán</h4>';
                                    html += '<div class="col-md-6 pull-left">';
                                    html += '<label style="font-weight:bold;">Khóa học :</label>' + '<p id="list-course">';
                                    if (res.courses.length) $.each(res.courses, function (k, v) {
                                        html += '- ' + v.name + '</br>';
                                    });
                                    html += '</p></br>';
                                    html += '</div>';
                                    html += '<div class="col-md-6 pull-right">';
                                    html += '<label style="font-weight:bold;">Gói khóa học :</label>' + '<p id="list-course-package">';
                                    if (res.course_package.length) $.each(res.course_package, function (k, v) {
                                        html += '- ' + v.name + '</br>';
                                    });
                                    html += '</p></br>';
                                    html += '</div>';
                                    self.setContent(html);
                                }
                            } else {
                                self.setContent('<p class="text-danger">Không có dữ liệu</p>');
                            }
                        } else if (res.login && res.login == 2) {
                            window.location = res.href;
                        }
                    }
                });
            },
            buttons: {
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('keypress', '.form_keypress_input input[type=text]', function (e) {
        if (e.which == 13) {
            var form = $(this).parents('.form_keypress_input:first'),
                button = form.attr('data-button');
            if (button) {
                $("".concat(button)).click();
            }
        }
    });
    $('body').on('click', 'a.btn-remove-user-site', function () {
        var id = $(this).data('id');
        LHM.common.confirmAjax('/sites/del_user_site', 'POST', {
            id: id,
            _token: $.cookie('_token')
        }, function (res) {
            var messageDefault,
                type = 'danger';
            if (res.success) {
                messageDefault = __('Xóa thành công');
                type = 'success';
            } else {
                messageDefault = __('Xóa thất bại');
            }
            LHM.common.notifyResponse(res.message ? res.message : messageDefault, type);
            $('#v-pills-student-registed-tab').trigger('click');
        }, null, __('Cảnh báo'), __('Bạn có chắc chắn muốn xóa tài khoản này không?'));
    }).on('click', 'a.btn-add-aff-user', function () {
        var user_id = $(this).data('id'),
            that = $(this);
        if (!user_id) return false;
        $.get('users/listAff', function (res) {
            if (res.items.length) {
                var options = '<option value="">-- Chọn AFF --</option>';
                try {
                    res.items.forEach(function (v, k) {
                        options += "<option value=\"".concat(v._id['$id'], "\">").concat(v.fullname, " - ").concat(v.email, "</option>");
                    });
                    var modelAff = $.confirm({
                        title: 'Cập nhật AFF cho tài khoản',
                        content: "<form id=\"addAff\">\n                                <input type=\"hidden\" name=\"_token\" value=\"".concat($.cookie('_token'), "\"/>\n                                <input type=\"hidden\" name=\"user_id\" value=\"").concat(user_id, "\"/>\n                                <div class=\"form-group\">\n                                    <label class=\"label-100\">Ch\u1ECDn Aff c\u1EA7n g\u1EAFn:</label>\n                                    <select class=\"form-control js-select2-new\" name=\"user_aff_id\">").concat(options, "</select>\n                                </div>\n                            </form>"),
                        onContentReady: function onContentReady() {
                            LHM.common.genSelect2New();
                        },
                        buttons: {
                            Ok: function Ok() {
                                LHM.common.callAjax('/users/addAffToUser', 'POST', $('#addAff').serialize(), function (res) {
                                    that.remove();
                                    modelAff.close();
                                }, null, __('Xác nhận'), __('Bạn có chắc chắn muốn sắp xếp lại khóa học?'));
                                return false;
                            },
                            cancel: {}
                        }
                    });
                } catch (err) {
                    LHM.common.notify(null, 'danger', err.message);
                }
            } else {
                LHM.common.notify(null, 'danger', 'Website không tồn tại AFF');
            }
        });
    });
    $('body').on('click', '.btn-remove-user-membership-acount', function () {
        var id = $(this).data('id');
        var curr = $(this);
        $.confirm({
            title: 'Cảnh báo',
            content: 'Bạn có chắc chắn muốn xóa không ?',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            buttons: {
                OK: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        $.ajax({
                            type: 'POST',
                            url: '/sites/del_user_membership_acount',
                            data: {
                                id: id,
                                _token: $.cookie('_token')
                            },
                            dataType: "json",
                            success: function success(rs) {
                                if (rs.login && rs.login == 1) {
                                    if (rs.success) {
                                        LHM.common.notify(null, 'success', 'Xóa thành công');
                                        curr.parents('tr').remove();
                                        if (!$('#v-pills-student-membership tbody tr').length) {
                                            $('#v-pills-student-membership tbody').html('<tr><td colspan="8">Không có dữ liệu</td></tr>');
                                            $('#btn-filter-membership').trigger('click');
                                        }
                                    }
                                } else if (rs.login && rs.login == 2) {
                                    window.location = rs.href;
                                }
                            }
                        });
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-edit-user-group', function () {
        var id = $(this).data('id');
        $('#wrap-add-user-group').show();
        $('#wrap-user-group, .btn-update-student').hide();
        $('#user_groups').val('');
        $('.area-error').html('');
        $('#list-assign-student #list-student').html('');
        $('#type-action').val('edit');
        $('#list-combo-in-group tbody').html('');
        $('#list-course-in-group tbody').html('');
        $('.file_excel_user_group_name, .data-text-file_excel_user_group').text('');
        $("#file_excel_user_group").val('');
        $("#file_excel_user_group").prev("a").text('');
        if ($('#category_id_group').length) {
            if (!$('#category_id_group').hasClass('added_category')) {
                $('#category_id_group').addClass('added_category');
                LHM.category.selectList('#category_id_group', 'combo_document');
            }
            $('#category_id_group').val([]).trigger("change");
        }
        $.ajax({
            url: base_url + '/groups/update_user_group',
            data: {
                id: id
            },
            type: 'GET',
            beforeSend: function beforeSend() {
                $('#list-combo-in-group tbody').html('<tr><td colspan="9" style="text-align:center;"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>');
                $('#list-course-in-group tbody').html('<tr><td colspan="9" style="text-align:center;"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>');
            },
            success: function success(res) {
                if (res.login && res.login == 1) {
                    $('#count_row_course').val(0);
                    $('#count_row_combo').val(0);
                    $('#id-user-group').val(res.id);
                    window.courses_in_group = res.courses;
                    window.combo_in_group = res.course_packages;
                    var course_retail = '',
                        count_course = res.data_course_group.length,
                        combo_retail = '',
                        count_combo = res.data_combo_group.length;
                    $('#count_row_course').val(count_course);
                    $('#count_row_combo').val(count_combo);
                    if ($('#category_id_group').length && res.category_id) {
                        $('#category_id_group').val(res.category_id).trigger("change");
                    }
                    if (count_course > 0) {
                        $.each(res.data_course_group, function (k, v) {
                            var course = '';
                            course += '<select id="courses-select-user-group-add-' + k + '" class="form-control slt-group-course" name="course_group[' + k + '][course]">';
                            $.each(res.courses, function (m, n) {
                                if (n._id['$id'] == v.course['$id']) course += '<option value="' + n._id['$id'] + '" selected>' + n.name + '</option>';else course += '<option value="' + n._id['$id'] + '">' + n.name + '</option>';
                            });
                            course += '</select>';
                            if (v.calendar != 0) var check_calendar = 'checked';else var check_calendar = '';
                            if (v.start != 0) var start_course = v.start;else var start_course = '';
                            if (v.end != 0) var end_course = v.end;else var end_course = '';
                            if (res.show_calender) course_retail += '<tr>' + '<td><input type="checkbox" name="course_group[' + k + '][calendar]" class="course_group[' + k + '][calendar] calendar_group" ' + check_calendar + '></td>' + '<td class="text-left">' + course + '<div class="text-danger area-error invalid-course_group-course_' + k + '"></div></td>' + '<td><input type="text" name="course_group[' + k + '][start]" class="course_group[' + k + '][start] datetimepicker_start form-control" value="' + start_course + '" placeholder="Chọn thời gian bắt đầu khóa học"><div class="text-danger area-error invalid-course_group-start_' + k + '"></div></td>' + '<td><input type="text" name="course_group[' + k + '][end]" class="course_group[' + k + '][end] datetimepicker_end form-control" value="' + end_course + '" placeholder="Chọn thời gian kết thúc khóa học" required=""><div class="text-danger area-error invalid-course_group-end_' + k + '"></div></td>' + '<td><a href="javascript:;" class="btn-remove-course-in-group"><i class="fas fa-window-close text-danger"></i></a></td>' + '</tr>';else course_retail += '<tr>' + '<td class="text-left">' + course + '<div class="text-danger area-error invalid-course_group-course_' + k + '"></div></td>' + '<td><a href="javascript:;" class="btn-remove-course-in-group"><i class="fas fa-window-close text-danger"></i></a></td>' + '</tr>';
                        });
                    }
                    $('#list-course-in-group tbody').html(course_retail);
                    $('.slt-group-course').select2({
                        allowClear: true,
                        placeholder: "--- Chọn khóa học ---"
                    });
                    if (count_combo > 0) {
                        $.each(res.data_combo_group, function (k, v) {
                            var combo = '';
                            combo += '<select id="course_packages-select-user-group-add-' + k + '" class="form-control slt-group-combo" name="combo_group[' + k + '][combo]">';
                            $.each(res.course_packages, function (m, n) {
                                if (n._id['$id'] == v.combo['$id']) combo += '<option value="' + n._id['$id'] + '" selected>' + n.name + '</option>';else combo += '<option value="' + n._id['$id'] + '">' + n.name + '</option>';
                            });
                            combo += '</select>';
                            if (v.calendar != 0) var check_calendar_combo = 'checked';else var check_calendar_combo = '';
                            if (v.start != 0) var start_combo = v.start;else var start_combo = '';
                            if (v.end != 0) var end_combo = v.end;else var end_combo = '';
                            if (res.show_calender == 1) combo_retail += '<tr>' + '<td><input type="checkbox" name="combo_group[' + k + '][calendar]" class="combo_group[' + k + '][calendar] calendar_group" ' + check_calendar_combo + '></td>' + '<td class="text-left">' + combo + '<div class="text-danger area-error invalid-combo_group-course_' + k + '"></div></td>' + '<td><input type="text" name="combo_group[' + k + '][start]" class="combo_group[' + k + '][start] datetimepicker_start form-control" value="' + start_combo + '" placeholder="Chọn thời gian bắt đầu combo"><div class="text-danger area-error invalid-combo_group-start_' + k + '"></div></td>' + '<td><input type="text" name="combo_group[' + k + '][end]" class="combo_group[' + k + '][end] datetimepicker_end form-control" value="' + end_combo + '" placeholder="Chọn thời gian kết thúc combo" required=""><div class="text-danger area-error invalid-combo_group-end_' + k + '"></div></td>' + '<td><a href="javascript:;" class="btn-remove-course-in-group"><i class="fas fa-window-close text-danger"></i></a></td>' + '</tr>';else combo_retail += '<tr>' + '<td class="text-left">' + combo + '<div class="text-danger area-error invalid-combo_group-course_' + k + '"></div></td>' + '<td><a href="javascript:;" class="btn-remove-course-in-group"><i class="fas fa-window-close text-danger"></i></a></td>' + '</tr>';
                        });
                    }
                    $('#list-combo-in-group tbody').html(combo_retail);
                    $('.slt-group-combo').select2({
                        allowClear: true,
                        placeholder: "--- Chọn combo ---"
                    });
                    if (res.show_calender) {
                        $('.datetimepicker_start').datetimepicker({
                            format: 'Y-m-d H:i:s',
                            minDate: '-2019/01/01',
                            defaultTime: '00:00:00'
                            /*onShow:function( ct ){
              this.setOptions({
              maxDate:jQuery('.datetimepicker_start').val()?jQuery('.datetimepicker_start').val():false
              })
              },*/
                        });

                        $('.datetimepicker_end').datetimepicker({
                            format: 'Y-m-d H:i:s',
                            minDate: '-2019/01/01',
                            defaultTime: '00:00:00'
                            /*onShow:function( ct ){
              this.setOptions({
              minDate:jQuery('.datetimepicker_start').val()?jQuery('.datetimepicker_start').val():false
              })
              },*/
                        });

                        $('.calendar_group').trigger('change');
                    }
                    var student = '';
                    $.each(res.students, function (k, v) {
                        student += '<tr id="st-' + v._id['$id'] + '"><td><input type="hidden" name="user_groups[]" value="' + v._id['$id'] + '">' + v.fullname + ' - ' + v.email + '</td><td class="text-right"><a href="javascript:;" class="btn-remove-assign-student"><i class="fas fa-window-close text-danger"></i></a></td></tr>';
                    });
                    var list_teacher = '';
                    list_teacher += '<select id="list_teacher-select-user-group-edit" class="form-control" name="list_teacher">';
                    list_teacher += '<option value="">Chọn giảng viên</option>';
                    $.each(res.list_teacher, function (k, v) {
                        list_teacher += '<option value="' + v._id['$id'] + '" ' + v.selected + '>' + v.name + '</option>';
                    });
                    list_teacher += '</select>';
                    $('#list-assign-student #list-student').html(student);
                    $('#user_group_name').val(res.name);
                    $('#list-teacher').html(list_teacher);
                    $('.lbl-action-user-group').text('SỬA NHÓM: ' + res.name);
                    $('#list_teacher-select-user-group-edit').select2({
                        allowClear: true,
                        placeholder: "--- Chọn giảng viên ---"
                    });
                } else if (res.login && res.login == 2) {
                    window.location = res.href;
                }
            }
        });
    });
    $('body').on('click', '.btn-view-user-login-limited', function () {
        $.alert({
            title: "Danh sách học viên đăng nhập trên nhiều thiết bị",
            columnClass: 'col-md-8',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/sites/view_user_login_limited',
                    type: 'POST',
                    data: {
                        _token: $.cookie('_token')
                    }
                }).done(function (res) {
                    if (res.login && res.login == 1) {
                        if (res.success) {
                            if (res.data.length > 0) {
                                var html = '<div class="table-responsive">' + '<table class="table">' + '<thead>' + '<tr>' + '<th>Họ tên</th>' + '<th>Email</th>' + '<th>Phone</th>' + '<th>Ngày Khóa</th>' + '<th></th>' + '</tr>' + '</thead>' + '<tbody>';
                                $.each(res.data, function (k, v) {
                                    html += '<tr>' + '<td>' + v.fullname + '</td>' + '<td>' + v.email + '</td>' + '<td>' + v.phone + '</td>' + '<td>' + v.look_date + '</td>' + '<td><a href="site/detail_student/' + v.user_id + '"><i class="fas fa-info-circle"></i> Chi tiết </a></td>' + '</tr>';
                                });
                                html += '</tbody>' + '</table>' + '</div>';
                                self.setContent(html);
                            } else self.setContent('Không có dữ liệu');
                        }
                    } else if (res.login && res.login == 2) {
                        window.location = res.href;
                    }
                }).fail(function () {}).always(function () {});
            }
        });
    });
    $('body').on('click', '.btn-view-user-logs', function () {
        var name = $(this).attr('data-name');
        var email = $(this).attr('data-email');
        var id = $(this).data('id');
        $.alert({
            title: "Logs của học viên " + name + ' - ' + email,
            columnClass: 'col-md-8',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/sites/logs_user_registed',
                    type: 'POST',
                    data: {
                        id: id,
                        _token: $.cookie('_token')
                    }
                }).done(function (res) {
                    if (res.login && res.login == 1) {
                        if (res.success) {
                            if (res.data.length > 0) {
                                var html = '<div class="table-responsive">' + '<table class="table">' + '<thead>' + '<tr>' + '<th>Hành động</th>' + '<th>Thời gian</th>' + '<th>IP</th>' + '<th>Agent</th>' + '</tr>' + '</thead>' + '<tbody>';
                                $.each(res.data, function (k, v) {
                                    html += '<tr>' + '<td width="15%">' + v.type + '</td>' + '<td width="15%">' + v.time + '</td>' + '<td width="15%">' + v.ip + '</td>' + '<td>' + v.agent + '</td>' + '</tr>';
                                });
                                html += '</tbody>' + '</table>' + '</div>';
                                self.setContent(html);
                            } else self.setContent('Không có dữ liệu');
                        }
                    } else if (res.login && res.login == 2) {
                        window.location = res.href;
                    }
                }).fail(function () {}).always(function () {});
            }
        });
    });
    $('body').on('click', '.btn-edit-user-registed', function () {
        var id = $(this).data('id');
        var name = $(this).parents('tr').attr('data-name');
        var email = $(this).parents('tr').attr('data-email');
        var phone = $(this).parents('tr').attr('data-phone');
        var photo = $(this).parents('tr').attr('data-photo_origin');
        var status = $(this).parents('tr').attr('data-status');
        $.confirm({
            title: 'Cập nhật thông tin học viên',
            columnClass: 'col-md-6',
            content: '<div id="wrap-edit-user-registed" style="margin-top: 10px;">' + '<div class="form-group">' + '<p class="control-label">Hình đại diện</p>' + '<div class="img-user-registed-pre text-left">' + '<img src="' + base_url + '/data/avatars/' + photo + '" alt="img-user-register" style="width:145px;height:145px;"></br>' + '<label for="img-user-registed" class="label" style="cursor:pointer;">' + '<i class="fa fa-image"></i> Upload ảnh đại diện' + '</label>' + '<form style="display:none" class="form-avatar-user-registed" method="POST" enctype="multipart/form-data">' + '<input type="hidden" name="uid" value="upload-avatar-teacher">' + '<input type="hidden" name="_token" value="' + $.cookie('_token') + '">' + '<input type="hidden" name="type" value="avatars">' + '<input type="file" name="photo" class="hidden" id="img-user-registed">' + '</form>' + '</div>' + '<input type="hidden" name="photo" class="hidden" id="photo" value="' + photo + '">' + '</div>' + '<form id="edit-user-registed">' + '<div class="form-group">' + '<label>Họ tên <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Họ tên" name="fullname" class="form-control"  value="' + name + '" required>' + '<div class="block-error-name area-error"></div>' + '</div>' + '<div class="form-group">' + '<label>Email <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Email" name="email" class="form-control" required id="email-user-non-account" value=' + email + '>' + '<div class="block-error-email area-error"></div>' + '</div>' + '<div class="form-group">' + '<label>Số điện thoại <span class="text-danger">*</span> : </label>' + '<input type="text" placeholder="Số điện thoại" name="phone" class=" form-control" required value=' + phone + ' />' + '<div class="block-error-phone area-error"></div>' + '</div>' + '<div class="form-group">' + '<label>Trạng thái <span class="text-danger">*</span> :</label>' + '<select class="form-control" id="user-status" name="status" style="width:50%;">' + '<option value="1">Hoạt động</option>' + '<option value="0">Ngừng hoạt động</option>' + '</select>' + '<div class="block-error-status area-error"></div>' + '</div>' +
                // '<div class="form-group">' +
                //  '<label>Mật khẩu <span class="text-danger">*</span> : </label>'+
                // '<input type="password" placeholder="Mật khẩu" name="password" class=" form-control" required />' +
                //  '<div class="block-error-password area-error"></div>' +
                // '</div>' +

                // '<div class="form-group">' +
                //  '<label>Xác nhận lại mật khẩu <span class="text-danger">*</span> : </label>'+
                // '<input type="password" type="text" placeholder="Xác nhận lại mật khẩu" name="repassword" class=" form-control" required />' +
                //  '<div class="block-error-repassword area-error"></div>' +
                // '</div>' +

                '</form>' + '</div>',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            onContentReady: function onContentReady() {
                $('#user-status').val(status);
                // Upload avatar user registed
                $('#img-user-registed').change(function () {
                    $('.form-avatar-user-registed').ajaxSubmit({
                        url: '/upload-avatar',
                        data: {
                            _token: $.cookie('_token')
                        },
                        success: function success(res) {
                            if (res.status) {
                                $('.img-user-registed-pre').find('img').attr('src', res.avatar_url);
                                $('.small-img').attr('src', res.avatar_url);
                                $('#photo').val(res.filename);
                                LHM.common.notify(null, 'success', res.message);
                            } else {
                                LHM.common.notify(null, 'danger', res.message);
                            }
                        }
                    });
                });
            },
            type: 'blue',
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        var form;
                        form = _this.$content.find('form#edit-user-registed').serialize();
                        form += '&_token=' + $.cookie('_token') + '&sid=' + sid + '&id=' + id + '&photo=' + $('#photo').val();
                        ;
                        $.post('/sites/update_user_registed', form, function (rs) {
                            if (rs.login && rs.login == 1) {
                                if (rs.error) {
                                    _this.$content.find('.area-error').html('');
                                    $.each(rs.msg, function (index, el) {
                                        _this.$content.find('.block-error-' + index).html('<p class="text-danger">' + el + '</p>');
                                    });
                                } else {
                                    $('#v-pills-student-registed-tab').click();
                                    LHM.common.notify(null, 'success', 'Cập nhật thành công');
                                    _this.close();
                                }
                            } else if (rs.login && rs.login == 2) {
                                window.location = rs.href;
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-view-student', function () {
        var id = $(this).data('id');
        $.confirm({
            title: 'Chi tiết học viên',
            columnClass: 'col-md-6',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/sites/detail_user_retail',
                    data: {
                        id: id
                    },
                    type: 'GET',
                    success: function success(res) {
                        if (res.login && res.login == 1) {
                            if (res.success) {
                                var html = '<div id="detail-student-retail">' + '<label style="font-weight:bold;">Thuộc nhóm học viên :</label>' + '<p id="list-user-group">';
                                if (res.user_group.length) $.each(res.user_group, function (k, v) {
                                    html += '- ' + v.name + '</br>';
                                });
                                html += '</p>';
                                html += '<label style="font-weight:bold;">Đăng ký khóa học :</label>' + '<p id="list-course">';
                                if (res.courses.length) $.each(res.courses, function (k, v) {
                                    html += '- ' + v.name + '</br>';
                                });
                                html += '</p></br>';
                                html += '<label style="font-weight:bold;">Đăng ký gói khóa học :</label>' + '<p id="list-course-package">';
                                if (res.course_package) $.each(res.course_package, function (k, v) {
                                    html += '- ' + v.name + '</br>';
                                });
                                html += '</p></br>';
                                html += '</div>';
                                self.setContent(html);
                            } else {
                                self.setContent('<p class="text-danger">Không có dữ liệu</p>');
                            }
                        } else if (res.login && res.login == 2) {
                            window.location = res.href;
                        }
                    }
                });
            },
            buttons: {
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-send-mail-active-code', function () {
        var html = '<div id="confirm-send-mail" style="margin-top: 10px;">';
        html += '<div class="form-group">';
        html += '<div class="form-check">' + '<input class="form-check-input" type="radio" name="send_mail_active_code" value="' + $(this).attr('data-oid') + '" id="send_mail_active_code" checked>' + '<label class="form-check-label" class="lbl-membership" for="send_mail_active_code">Gửi mã kích hoạt qua email <strong>' + $(this).attr('data-email') + '</strong></label>' + '</div>';
        html += '</div>';
        html += '<div class="invalid-feedback"></div></div>';
        $.confirm({
            title: 'Gửi email',
            columnClass: 'dialog-add-membership',
            type: 'blue',
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: html,
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue btn-send-now',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var form;
                        form = {
                            '_token': $.cookie('_token'),
                            'oid': _this.$content.find('input[type=radio]:checked').val()
                        };
                        $('.btn-send-now').attr('disabled', 'disabled');
                        $('.btn-send-now').html('OK <i class="fas fa-spinner fa-spin"></i>');
                        $.post('/orders/sendMailOrder', form, function (rs) {
                            if (rs.error) {
                                LHM.common.notify(null, 'danger', 'Gửi email thất bại');
                                $('.btn-send-now').removeAttr('disabled');
                                $('.btn-send-now').html('OK');
                            } else {
                                $('#active_code_order').text(rs.code);
                                if (rs.status == 'danger') {
                                    $('#active_code_status').addClass('text-danger');
                                    $('#active_code_status').text('(Chưa kích hoạt)');
                                } else {
                                    $('#active_code_status').addClass('text-success');
                                    $('#active_code_status').text('(Đã kích hoạt)');
                                }
                                LHM.common.notify(null, 'success', 'Gửi email thành công');
                                _this.close();
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });

    $('body').on('click', '.btn-remove-live', function () {
        var id = $(this).data('id');
        var curr = $(this);
        $.confirm({
            title: 'Cảnh báo',
            content: 'Bạn có chắc chắn muốn hủy lớp này không ?',
            buttons: {
                OK: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    scrollToPreviousElement: false,
                    scrollToPreviousElementAnimate: false,
                    action: function action() {
                        $.ajax({
                            type: 'POST',
                            url: '/lives/remove_live',
                            data: {
                                id: id,
                                _token: $.cookie('_token')
                            },
                            dataType: "json",
                            success: function success(rs) {
                                if (rs.login && rs.login == 1) {
                                    if (rs.success) {
                                        LHM.common.notify(null, 'success', 'Hủy lớp thành công');
                                        if (rs.personal_site) {
                                            window.location.href = base_url + '/lives';
                                        } else {
                                            LHM.mnDashboard.init('classes');
                                        }
                                    } else LHM.common.notify(null, 'danger', 'Hủy lớp không thành công');
                                } else if (rs.login && rs.login == 2) {
                                    window.location = rs.href;
                                }
                            }
                        });
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-preview-embed', function () {
        var url_embed = $(this).attr('data-url');
        if (url_embed != '') {
            $.alert({
                title: 'Xem trước form nhúng',
                columnClass: 'col-md-8',
                content: function content() {
                    var self = this;
                    return $.ajax({
                        url: url_embed,
                        type: 'GET'
                    }).done(function (res) {
                        self.setContent(res);
                    }).fail(function () {}).always(function () {});
                },
                onContentReady: function onContentReady() {
                    $('.btn-submit').attr('disabled', 'disabled');
                }
            });
        } else LHM.common.notify(null, 'danger', 'Mã nhúng không hợp lệ');
    });
    $('body').on('click', '.btn-active-code-package', function () {
        var code = $('#input-active-code-package').val();
        $.ajax({
            url: base_url + '/sites/activeCodePackage',
            type: 'POST',
            data: {
                _token: $.cookie('_token'),
                code: code
            },
            success: function success(res) {
                if (res.login && res.login == 1) {
                    if (res.status) {
                        LHM.common.notify(null, 'success', 'Kích hoạt thành công');
                        $('#input-active-code-package').val('');
                        // LHM.mnDashboard.getService();
                        $('.msg-upgrade').remove();
                    } else LHM.common.notify(null, 'danger', res.msg);
                } else if (res.login && res.login == 2) {
                    window.location = res.href;
                }
            }
        });
    });
    $('body').on('click', '.btn-active-checkout', function () {
        var code = $('#input-active-checkout').val();
        var site = $('#site').val();
        $.ajax({
            url: base_url + '/sites/activeCheckout',
            type: 'POST',
            data: {
                _token: $.cookie('_token'),
                code: code,
                site: site
            },
            success: function success(res) {
                console.log(res);
                if (res.login && res.login === 1) {
                    if (res.status) {
                        LHM.common.notify(null, 'success', 'Kích hoạt thành công');
                        $('#input-active-checkout').val('');
                        // LHM.mnDashboard.getService();
                    } else LHM.common.notify(null, 'danger', res.msg);
                } else if (res.login && res.login == 2) {
                    window.location = res.href;
                }
            }
        });
    });
    $('body').on('click', '#v-pills-report-process-study-tab', function () {
        $('.box-list-student table tbody').html('<tr><td colspan="7">Không có dữ liệu</td></tr>');
    });
    $('body').on('click', '.btn-show-payment-aff', function () {
        var uid = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        $.alert({
            title: "Thông tin thanh toán affiliate " + name,
            columnClass: 'col-md-6',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/dashboard/getPaymentAff',
                    type: 'GET',
                    data: {
                        id: uid
                    }
                }).done(function (res) {
                    if (res.login && res.login == 1) {
                        if (res) {
                            if (res.type_payment) {
                                var tax = 'Đang cập nhật...';
                                if (res.tax_code) tax = res.tax_code;
                                switch (res.type_payment) {
                                    case 1:
                                        var html = '<div class="table-responsive">' + '<p><i class="fas fa-money-check-alt"></i> Mã số thuế : <strong>' + tax + '</strong></p>' + '<p><i class="fas fa-credit-card"></i> Kênh nhận tiền : <strong>Ngân hàng</strong></p>' + '<p><i class="fas fa-user"></i> Tên tài khoản : <strong>' + res.account_name + '</strong></p>' + '<p><i class="far fa-credit-card"></i> Số tài khoản : <strong>' + res.account_number + '</strong></p>' + '<p><i class="fas fa-university"></i> Tên ngân hàng : <strong>' + res.bank + '</strong></p>' + '<p><i class="fas fa-code-branch"></i> Chi nhánh : <strong>' + res.branch + '</strong></p></div>';
                                        break;
                                    case 2:
                                        var html = '<div class="table-responsive">' + '<p><i class="fas fa-money-check-alt"></i> Mã số thuế : <strong>' + tax + '</strong></p>' + '<p><i class="fas fa-credit-card"></i> Kênh nhận tiền : <strong>Ngân lượng</strong></p>' + '<p><i class="fas fa-envelope"></i> Email nhận tiền : <strong>' + res.email_receive + '</strong></p></div>';
                                        break;
                                    case 3:
                                        var html = '<div class="table-responsive">' + '<p><i class="fas fa-money-check-alt"></i> Mã số thuế : <strong>' + tax + '</strong></p>' + '<p><i class="fas fa-credit-card"></i> Kênh nhận tiền : <strong>Paypal</strong></p>' + '<p><i class="fas fa-envelope"></i> Email nhận tiền : <strong>' + res.email_receive + '</strong></p></div>';
                                        break;
                                }
                                self.setContent(html);
                            } else self.setContent('Không có dữ liệu');
                        } else self.setContent('Không có dữ liệu');
                    } else if (res.login && res.login == 2) {
                        window.location = res.href;
                    }
                }).fail(function () {}).always(function () {});
            }
        });
    });
    $('body').on('click', '.btn-detail-view-teacher', function () {
        var id = $(this).attr('data-id');
        $('#main-report-tab li a').removeClass('active');
        $('#v-pills-report-course_profit-tab').addClass('active');
        $('#content-nav-report').find('.tab-pane').removeClass('active');
        $('#content-nav-report').find('.tab-pane').removeClass('show');
        $('#v-pills-report-course_profit').addClass('active');
        $('#v-pills-report-course_profit').addClass('show');
        LHM.mnDashboard.getProfitCourse(window.start_daterange_teacher, window.end_daterange_teacher, id);
    });
    $('body').on('click', '.btn-check-course-complete', function () {
        if ($(this).attr('data-course-complete') != '') LHM.common.notify(null, 'danger', 'Bạn phải hoàn thành khóa học <strong>' + $(this).attr('data-course-complete') + '</strong> trước');
    });
    $('body').on('click', '.btn-check-time-group', function () {
        if ($(this).attr('data-msg-time-group') != '') LHM.common.notify(null, 'danger', $(this).attr('data-msg-time-group'));
    });
    $('body').on('click', '.btn-preview-setting-offset-certificate', function () {
        var template_certificate = $(this).parents('.template_certificate:first');
        if (template_certificate.length) {
            var html_content = '',
                img_src = template_certificate.find('img.preview_certificate').attr('src');
            template_certificate.find('.setting-child').each(function () {
                if ($(this).find('input[type=checkbox][name*=status]:first').prop('checked')) {
                    var setting_name = $(this).find('.setting-name:first').text();
                    html_content += "<div class=\"my-2 font-weight-bold\">".concat(setting_name, "</div>") + $(this).find('.content-setting-child:first')[0].outerHTML;
                }
            });
            if (html_content !== '') {
                $.confirm({
                    title: 'Xem trước cài đặt vị trí (Sử dụng kéo thả hoặc thay đổi giá trị để thay đổi vị trí )',
                    columnClass: 'w-100',
                    content: "\n                        <div class=\"w-100 d-flex\" style=\"column-gap: 10px\">\n                            <div style=\"width: 750px; height: 500px; flex: none\" id=\"container_image\">\n                                \n                            </div>\n                            <div class=\"w-100\" style=\"height: 500px; padding: 10px 15px; overflow: auto\">".concat(html_content, "</div>\n                        </div>\n                        "),
                    type: 'blue',
                    onContentReady: function onContentReady() {
                        var divConfirm = $('.jc-bs3-container');
                        divConfirm.addClass('container-certificate-popup');
                        divConfirm.find('.js-color').each(function () {
                            $(this).parent().find('.evo-colorind').remove();
                            $(this).colorpicker({
                                color: $(this).val()
                            });
                        });
                        divConfirm.find('input, select').each(function () {
                            var name = $(this).attr('name');
                            $(this).val(template_certificate.find("[name=\"".concat(name, "\"]")).val());
                        });
                        var imgWidth = 750,
                            imgHeight = 500,
                            imageObj = new Image();
                        imageObj.src = img_src;
                        var layer = new Konva.Layer(),
                            stage = new Konva.Stage({
                                container: 'container_image',
                                width: 750,
                                height: 500
                            }),
                            certificateImg = new Konva.Image({
                                image: imageObj,
                                x: stage.width() / 2 - 750 / 2,
                                y: stage.height() / 2 - 500 / 2,
                                width: imgWidth,
                                height: imgHeight
                            });
                        var addLayer = function addLayer() {
                            layer.add(certificateImg);
                            var widthRate = 750 / certificateImg.attrs.image.naturalWidth; // đang sai
                            widthRate = 1;
                            divConfirm.find('.content-setting-child').each(function () {
                                var that = $(this);
                                var text = that.prev().text().replace(/Vị trí đặt\s?/i, ''),
                                    font_family = LHM.courses.switchFontfamilyCertificate(that.find('[name*=font_family]:first').val()),
                                    color = that.find('input[name*=color]:first').val(),
                                    font = Math.round(parseInt(that.find('input[name*=font]:first').val()) * widthRate);
                                var key = new Konva.Text({
                                    x: Math.ceil(that.find('input[name*=left]:first').val()),
                                    y: Math.ceil(that.find('input[name*=top]:first').val()),
                                    text: text,
                                    fontSize: Math.ceil(font),
                                    fontFamily: font_family,
                                    fill: color,
                                    fontVariant: 'normal',
                                    draggable: true
                                });
                                key.on('mouseenter', function () {
                                    stage.container().style.cursor = 'pointer';
                                });
                                key.on('mouseleave', function () {
                                    stage.container().style.cursor = 'default';
                                });
                                var maxX = Math.ceil(imgWidth - key.textWidth),
                                    maxY = Math.ceil(imgHeight - key.textHeight);
                                layer.add(key);
                                function updateIdCertificate(e) {
                                    LHM.courses.updatePosCertificate(stage, layer, e, '', text, that.find('input[name*=left]:first'), that.find('input[name*=top]:first'), font, font_family, color, 'normal', 0, maxX, 0, maxY, true);
                                }
                                key.on('dragmove', updateIdCertificate);
                            });
                        };
                        addLayer();
                        setTimeout(function () {
                            stage.add(layer);
                            divConfirm.find('select,input').change(function () {
                                layer.removeChildren();
                                addLayer();
                                stage.add(layer);
                            });
                        }, 1000);
                    },
                    scrollToPreviousElement: false,
                    scrollToPreviousElementAnimate: false,
                    buttons: {
                        formSubmit: {
                            text: 'OK',
                            btnClass: 'btn-blue',
                            action: function action() {
                                $('.jc-bs3-container input, .jc-bs3-container select').each(function () {
                                    var name = $(this).attr('name'),
                                        inputChange = template_certificate.find("[name=\"".concat(name, "\"]"));
                                    inputChange.val($(this).val());
                                    if (/color/.test(name)) {
                                        inputChange.next().css('background-color', $(this).val());
                                    }
                                });
                            }
                        },
                        cancel: {
                            text: 'Đóng'
                        }
                    }
                });
            } else {
                LHM.common.notify(null, 'danger', 'Bạn không xét vị trí nào, nên không cần thiết xem trước vị trí cài đặt');
            }
        } else {
            LHM.common.notify(null, 'danger', 'Có lỗi xảy ra');
        }
    });
    $('body').on('click', '.btn-update-coupon', function () {
        var id_discount = $(this).attr('data-id');
        var check_code_used = $(this).attr('data-check_code_used');
        $.confirm({
            title: 'Cập nhật mã coupon',
            columnClass: 'col-md-6',
            type: 'blue',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/courses/update_discount',
                    data: {
                        id_discount: id_discount
                    },
                    type: 'GET',
                    success: function success(res) {
                        if (res.login && res.login == 1) {
                            if (res.success) {
                                if (res.data) {
                                    var check_percent = '',
                                        check_money = '';
                                    if (res.data.coupons.type_reduce == 'money') {
                                        check_money = 'checked';
                                    } else {
                                        check_percent = 'checked';
                                    }
                                    var html = '<div class="col-sm-12"><form class="needs-validation" id="gen-discounts" novalidate>' + '<div class="form-row">' + '<div class="col-md-12 mb-3">' + '<label for="">Loại</label>' + '<div class="form-check">' + '<input class="form-check-input" name="type_reduce" onchange="pre_gen()" type="radio" class="radio_type_reduce"' + check_money + ' value="money" required>' + '<label class="form-check-label" >' + 'Tiền' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input" name="type_reduce" onchange="pre_gen()" type="radio" class="radio_type_reduce"' + check_percent + ' value="percent" required>' + '<label class="form-check-label">' + '%' + '</label>' + '</div>' + '</div>' + '<div class="col-md-6 mb-3">' + '<input type="hidden" id="limit_coupon" value="' + res.data.coupons.limited.type_limit + '">' + '<label for="">Thuộc tính mã</label>' + '<div class="form-check">' + '<input class="form-check-input" name="limited" onchange="pre_gen()" type="radio" id="once_update_discount" value="once" required>' + '<label class="form-check-label" for="once_update_discount">' + 'Cho 1 học viên sử dụng' + '</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input" name="limited" onchange="pre_gen()" type="radio" id="multi_update_discount" value="multi" required>' + '<label class="form-check-label" for="multi_update_discount">' + 'Cho nhiều học viên sử dụng' + '</label>' + '</div>' + '<div class="form-group limited-use" style="display: none;">' + '<input class="form-control" id="value-limited" placeholder="Số lượng học viên" value="' + res.data.coupons.limited.max + '" max="100" type="number">' + '</div>' + '</div>' + '<div class="form-row">' + '<div class="col-md-6 mb-3">' + '<label for="reduce">Nhập % hoặc số tiền <span class="text-danger">*</span></label>' + '<input type="number" class="form-control" placeholder="Vd: 20 hoặc 20000" id="reduce" onkeyup="pre_gen()" required value="' + res.data.coupons.reduce + '">' + '</div>' + '<div class="col-md-6 mb-3">' + '<label for="s-discount">Số lượng mã tạo</label>' + '<input id="s-discount" onkeyup="pre_gen()" type="text" value="1" class="form-control" required readonly>' + '</div>' + '</div>' + '<div class="form-row" style="width: 100%;">' + '<div class="col-md-12">' + '<input type="checkbox" name="set_time_expire_date" class="check-password-display-student" id ="checkbox_set_time_expire_date" ' + res.data.coupons.expired_discount_check + '>' + '<label for="checkbox_set_time_expire_date">&nbsp;Cài đặt thời hạn</label>' + '</div>' + '<div class="col-md-12">' + '<div id ="expire_date" style="display: ' + res.data.coupons.add_style_to_class + ';">' + '<input type="text" class="form-control datetimepicker" name="expire_date" value="' + res.data.coupons.expire_date + '" id="datetimepicker" placeholder="Chọn thời hạn cho Coupon, mã kích hoạt" required="">' + '</div>' + '</div>' + '</div>';
                                    html += '<div class="form-row mt-10" style="width:100%;padding-right: 5px;padding-left: 5px;">' + '<label>Gắn khóa học </label></br>';
                                    html += '<select class="form-control" id="course-active-code-coupon" multiple>';
                                    $.each(res.data.courses, function (k, v) {
                                        html += '<option value="' + v._id + '" ' + v.selected + '>' + v.name + '</option>';
                                    });
                                    html += '</select></div>';
                                    html += '<div class="form-row form-tag-coupon">' + '<label>Gắn tag: </label>' + '<input type="text" class="hash_tag_coupon" name="hash_tag_coupon" value="' + res.data.tags + '" class="form-control input-step" placeholder="Nhập từng tag sau đó Enter" />' + '</div>' + '</form><div class="invalid-feedback"></div></div>';
                                    self.setContent(html);
                                    if (check_code_used) {
                                        self.buttons.formSubmit.hide();
                                    }
                                }
                            } else {
                                self.buttons.formSubmit.hide();
                                self.setContent('<p class="text-danger">Đã xảy ra lỗi - Vui lòng thử lại!</p>');
                            }
                        } else if (res.login && res.login == 2) {
                            window.location = res.href;
                        }
                    }
                });
            },
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            onContentReady: function onContentReady() {
                $('#' + $('#limit_coupon').val() + '_update_discount').trigger('click');
                $('#course-active-code-coupon').select2({
                    allowClear: true,
                    placeholder: "--- Chọn khóa học ---"
                });
                $('#datetimepicker').datetimepicker({
                    format: 'Y-m-d H:i:s',
                    minDate: '-2019-01-01',
                    defaultTime: '00:00:00'
                });
                $('.hash_tag_coupon').tagsInput({
                    autocomplete_url: base_url + '/sites/getTagOfDiscounts',
                    defaultText: 'Nhập từng tag sau đó Enter',
                    autocomplete: {
                        selectFirst: true,
                        autoFill: true
                    },
                    width: '100%',
                    removeWithBackspace: false,
                    minInputWidth: '250px',
                    onAddTag: function onAddTag(value) {
                        var list_tag = $(this).val();
                        var list_tag_lower_case = [];
                        list_tag = list_tag.split(',');
                        list_tag.pop();
                        for (var i = 0; i < list_tag.length; i++) {
                            list_tag_lower_case[i] = list_tag[i].toLowerCase();
                        }
                        if (jQuery.inArray(value.toLowerCase(), list_tag_lower_case) < 0) {
                            list_tag.push(value);
                            $(this).importTags(list_tag.join(','));
                        } else {
                            $('#' + $(this).attr('id') + '_tag').addClass('not_valid');
                            $(this).importTags(list_tag.join(','));
                            $('#' + $(this).attr('id') + '_tag').val(value);
                            $('#' + $(this).attr('id') + '_tag').focus();
                        }
                        $('.ui-autocomplete').hide();
                    }
                });
            },
            buttons: {
                formSubmit: {
                    text: 'OK',
                    btnClass: 'btn-blue btn-add-update-discount-popup',
                    action: function action() {
                        var _this = this;
                        //reset msg
                        _this.$content.find('.invalid-feedback').hide();
                        var courses = [];
                        var reduce = $('#reduce').val();
                        var opt2 = $("#gen-discounts input[name='limited']:checked").val();
                        var value_limited = $('#value-limited').val();
                        var tags = $('.hash_tag_coupon').val();
                        $('#course-active-code-coupon :selected').each(function () {
                            courses.push({
                                name: "courses",
                                value: $(this).val()
                            });
                        });
                        var expire_date = $("input[name=expire_date]").val();
                        var set_time_expire_date = 0;
                        var type_reduce = $('input[name="type_reduce"]:checked').val();
                        if ($("input[name=set_time_expire_date]").is(":checked")) {
                            set_time_expire_date = 1;
                        }
                        var data = {
                            sid: sid,
                            reduce: reduce,
                            courses: courses,
                            id_discount: id_discount,
                            opt2: opt2,
                            value_limited: value_limited,
                            tags: tags,
                            expire_date: expire_date,
                            set_time_expire_date: set_time_expire_date,
                            type_reduce: type_reduce,
                            _token: $.cookie('_token')
                        };
                        $('.btn-add-update-discount-popup').html('<i class="fas fa-spinner fa-spin"></i> OK');
                        $('.btn-add-update-discount-popup').attr('disabled', true);
                        $.ajax({
                            type: 'POST',
                            url: '/courses/update_discount',
                            data: data,
                            dataType: "json",
                            beforeSend: function beforeSend() {},
                            cache: true,
                            success: function success(rs) {
                                if (rs.login && rs.login == 1) {
                                    $('.btn-add-update-discount-popup').html('OK');
                                    $('.btn-add-update-discount-popup').removeAttr('disabled');
                                    if (rs.error) {
                                        var _error13 = '';
                                        for (var i in rs.msg) {
                                            _error13 += '- ' + rs.msg[i] + '<br>';
                                        }
                                        _this.$content.find('.invalid-feedback').html(_error13).show();
                                    } else {
                                        //print code to list
                                        var newList = '';
                                        for (var i in rs.data) {
                                            newList += '<tr _id="' + rs.data[i]._id['$id'] + '">' + '<td _code>' + rs.data[i].code + '</td>' + '<td class="money-label">' + rs.data[i].reduce;
                                            if (rs.data[i].type_reduce == 'percent') newList += '<sup>%</sup>';else newList += '<sup>đ</sup>';
                                            newList += '</td>' + '<td>' + LHM.mnDashboard.checker_discount(rs.data[i], 'status') + '</td>' + '<td>' + LHM.mnDashboard.checker_discount(rs.data[i], 'property') + '</td>' + '<td></td>' + '<td>' + moment.unix(rs.data[i].createdAt.sec).format('DD/MM/YYYY H:mm:ss') + '</td>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td align="center"><a href="javascript:void(0);" data-id="' + rs.data[i]._id['$id'] + '"  class="btn-update-coupon"><i class="fas fa-edit"></i> Sửa </a> </td>' + '<td align="center"><a href="javascript:;" title="Xóa" onclick="LHM.mnDashboard.del_discount(\'' + rs.data[i]._id['$id'] + '\', this)" class="delete"><span class="fa fa-trash"></span> Xóa</a></td>';
                                            '</tr>';
                                        }
                                        LHM.mnDashboard.init('coupons');
                                        _this.close();
                                        LHM.common.notify(null, 'success', 'Cập nhật thành công');
                                    }
                                } else if (rs.login && rs.login == 2) {
                                    window.location = rs.href;
                                }
                            },
                            complete: function complete() {}
                        });
                        return false;
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-add-payment-affilate', function () {
        $.confirm({
            title: 'Cảnh báo',
            content: 'Bạn có chắc chắn muốn thanh toán không ?',
            buttons: {
                OK: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    scrollToPreviousElement: false,
                    scrollToPreviousElementAnimate: false,
                    action: function action() {
                        $.ajax({
                            type: 'POST',
                            url: base_url + '/sites/add_withdrawl_affiliate',
                            data: {
                                _token: $.cookie('_token'),
                                time: $('#filter-date-withdrawl-aff').val(),
                                list_uid: window.list_uid
                            },
                            dataType: 'json',
                            success: function success(data) {
                                if (data.login && data.login == 1) {
                                    if (data.error) {
                                        LHM.common.notify('', 'danger', data.msg);
                                    } else {
                                        LHM.common.notify('', 'success', 'Tạo phiếu chi thành công');
                                        LHM.sites.payment_history_affiliate();
                                    }
                                } else if (data.login && data.login == 2) {
                                    window.location = data.href;
                                }
                            },
                            error: function error(err) {
                                LHM.common.notify(null, 'danger', 'có lỗi xảy ra');
                            }
                        });
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.list-detail-lesson', function () {
        var cid = $(this).attr('data-course-id'),
            uid = $(this).attr('data-uid');
        $.ajax({
            url: '/courses/learningProcess',
            type: 'GET',
            data: {
                cid: cid,
                uid: uid,
                not_action: $(this).attr('data-not-action')
            },
            success: function () {
                var _success3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(html) {
                    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                        while (1) switch (_context3.prev = _context3.next) {
                            case 0:
                                $.alert({
                                    title: __('Danh sách bài học'),
                                    columnClass: 'col-md-12',
                                    content: html,
                                    onContentReady: function onContentReady() {
                                        $('.js-add-delete-complete').click(function () {
                                            var data = {
                                                    userId: uid,
                                                    type: 'add',
                                                    lessonId: $(this).attr('data-lib'),
                                                    courseId: cid,
                                                    _token: $.cookie('_token')
                                                },
                                                button = $(this);
                                            LHM.common.confirmAjax('/lessons/addAndDeleteComplete', 'POST', data, function (res) {
                                                var messageDefault,
                                                    type = 'danger';
                                                if (res.success) {
                                                    messageDefault = 'Success';
                                                    type = 'success';
                                                    button.parents('tr:first').find('.time_complete').text(res.createdAt);
                                                    button.parents('tr:first').find('.status_title').text('Completed');
                                                    button.remove();
                                                } else {
                                                    messageDefault = 'Error';
                                                }
                                                LHM.common.notifyResponse(res.message ? res.message : messageDefault, type);
                                            }, null, __('Xác nhận'), __('Bạn có chắc chắn muốn cập nhật tiến trình học cho bài này không?'));
                                        });
                                    },
                                    buttons: {
                                        Cancel: {
                                            text: "Close"
                                        }
                                    }
                                });
                            case 1:
                            case "end":
                                return _context3.stop();
                        }
                    }, _callee3);
                }));
                function success(_x2) {
                    return _success3.apply(this, arguments);
                }
                return success;
            }(),
            error: function error() {
                LHM.common.notify(__('Có lỗi xảy ra, vui lòng thử lại sau!'));
            }
        });
    }).on('click', 'a.list_order_revenue_month', function () {
        $.ajax({
            url: '/report_revenue/getOrderByCondition',
            type: 'GET',
            data: {
                itemId: $(this).data('id'),
                type: $(this).data('type'),
                time: $(this).data('time')
            }
        }).always(function (res) {
            $.confirm({
                title: "Danh sách đơn hàng",
                content: res.html ? res.html : 'Có lỗi xảy ra!!',
                columnClass: 'col-md-6'
            });
        });
    });
    function getAddSectionHtml(type, param) {
        var html = '<div class="">' + '<table class="table">' + '<tr>' + '<td width="10%"><i class="fal fa-newspaper" style="font-size:25px;margin-top:8px;"></i></td>' + '<td width="80%"><div><strong>Bài viết nổi bật</strong></div><span>Đưa các bài viết được chỉ định trên blog lên website.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'blog\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:8px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="fad fa-layer-group" style="font-size:25px;margin-top:8px;"></i></td>' + '<td width="80%"><div><strong>Các combo đề thi</strong></div><span>Đưa các combo đề thi lên website để học viên lựa chọn.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'combo_quiz\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:8px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="fal fa-folders" style="font-size:25px;margin-top:8px;"></i></td>' + '<td width="80%"><div><strong>Các combo tài liệu</strong></div><span>Đưa các combo tài liệu lên website để học viên lựa chọn.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'combo_document\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:8px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="fas fa-books" style="font-size:25px;margin-top:8px;"></i></td>' + '<td width="80%"><div><strong>Các gói khóa học</strong></div><span>Đưa các gói khóa học lên website để học viên lựa chọn.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'combo\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:8px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="fas fa-book" style="font-size:25px;margin-top:8px;"></i></td>' + '<td width="80%"><div><strong>Các khóa học</strong></div><span>Đưa các khóa học được chỉ định lên website.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'courses\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:8px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="fas fa-user-graduate" style="font-size:25px;margin-top:20px;"></i></td>' + '<td width="80%"><div><strong>Cảm nhận học viên</strong></div><span>Cảm nhận của 3 học viên về kết quả sau khi học trên website của bạn.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'feel\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:20px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="fas fa-th-list" style="font-size:25px;margin-top:8px;"></i></td>' + '<td width="80%"><div><strong>Danh mục khóa học</strong></div><span>Lựa chọn các danh mục hiển thị lên website.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'course_of_category\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:8px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="fas fa-tag" style="font-size:25px;margin-top:8px;"></i></td>' + '<td width="80%"><div><strong>Tag khóa học</strong></div><span>Lựa chọn các tag hiển thị lên website.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'course_of_tag\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:8px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="fas fa-link" style="font-size:25px;margin-top:20px;"></i></td>' + '<td width="80%"><div><strong>Danh sách liên kết</strong></div><span>Hiển thị bộ sưu tập các trang web cho khách truy cập của bạn.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'link\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:8px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="far fa-handshake" style="font-size:25px;margin-top:10px;"></i></td>' + '<td width="80%"><div><strong>Đối tác</strong></div><span>Hiển thị hình ảnh các đối tác.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'partner\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:8px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="fas fa-chalkboard-teacher" style="font-size:25px;margin-top:8px;"></i></td>' + '<td width="80%"><div><strong>Giảng viên</strong></div><span>Lựa chọn giảng viên nổi bật để hiển thị lên website.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'teacher\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:8px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="fas fa-info-circle" style="font-size:25px;margin-top:20px;"></i></td>' + '<td width="80%"><div><strong>Giới thiệu</strong></div><span>Bao gồm tiêu đề chính, tiêu đề phụ và nút kêu gọi hành động.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'header\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:20px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="fas fa-code" style="font-size:25px;margin-top:20px;"></i></td>' + '<td width="80%"><div><strong>HTML/JAVASCRIPT</strong></div><span>Thêm chức năng bên thứ ba hoặc mã khác cho website của bạn.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'html\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:20px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="far fa-images" style="font-size:25px;margin-top:10px;"></i></td>' + '<td width="80%"><div><strong>Slide ảnh</strong></div><span>Hiển thị slide các hình ảnh.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'slideshow\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:8px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="fas fa-question-circle" style="font-size:25px;margin-top:20px;"></i></td>' + '<td width="80%"><div><strong>Tại sao chọn chúng tôi</strong></div><span>3 lý do vì sao khách hàng nên mua khóa học trên website của bạn.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'whychoice\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:20px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="fas fa-tags" style="font-size:25px;margin-top:8px;"></i></td>' + '<td width="80%"><div><strong>Tag nổi bật</strong></div><span>Liệt kê các tag để khách hàng lựa chọn nhanh.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'what_learn_today\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:8px;"></i></a></td>' + '</tr>' + '<tr>' + '<td width="10%"><i class="far fa-file-alt" style="font-size:25px;margin-top:8px;"></i></td>' + '<td width="80%"><div><strong>Văn bản đa phương tiện</strong></div><span>Thêm văn bản vào website của bạn.</span></td>' + '<td width="10%"><a href="javascript:;" onclick="' + type + '(\'text\',' + param + ')"><i class="fa fa-plus" style="font-size:25px;margin-top:8px;"></i></a></td>' + '</tr>' + '</table>' + '</div>';
        return html;
    }
    $('body').on('click', '.btn-add-section', function () {
        var param = $(this).attr('data-footer');
        var html = getAddSectionHtml('addSection', param);
        $.confirm({
            title: 'Thêm tiện ích',
            columnClass: 'col-md-6',
            content: html,
            onContentReady: function onContentReady() {
                window.add_layout = this;
            },
            buttons: {
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-add-section-landingpage', function () {
        var html = getAddSectionHtml('addSectionLandingpage');
        $.confirm({
            title: 'Thêm tiện ích',
            columnClass: 'col-md-6',
            content: html,
            onContentReady: function onContentReady() {
                window.add_layout_landingpage = this;
            },
            buttons: {
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $('body').on('click', '.btn-edit-css-layout', function () {
        var html = '<textarea id="code" name="code"></textarea>';
        $.confirm({
            title: 'Chỉnh sửa css',
            columnClass: 'col-md-10',
            content: function content() {
                var self = this;
                return $.ajax({
                    url: base_url + '/sites/getCssThemeSite',
                    type: 'GET',
                    data: {
                        sid: sid
                    }
                }).done(function (data) {
                    if (data.login && data.login == 1) {
                        var html = '<span class="text-muted">Ctrl-F / Start searching | Ctrl-G / Cmd-G Find next</span>' + '<textarea id="code" name="code">' + data.response + '</textarea>';
                        self.setContent(html);
                    } else if (data.login && data.login == 2) {
                        window.location = data.href;
                    }
                }).fail(function () {}).always(function () {});
            },
            onContentReady: function onContentReady() {
                var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
                    lineNumbers: true,
                    matchBrackets: true,
                    gutter: true,
                    lineWrapping: true,
                    mode: "text/x-scss",
                    theme: 'base16-dark'
                });
                var height = $(window).height();
                $('.CodeMirror').css('min-height', "500px");
                window.codeMirror = editor;
            },
            buttons: {
                RESET: {
                    text: 'RESET',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        var val_post = {
                            _token: $.cookie('_token'),
                            sid: sid,
                            reset: 1
                        };
                        if (confirm('Giao diện của bạn sẽ trở lại mặc định.Bạn có muốn tiếp tục không?')) {
                            $.ajax({
                                type: 'POST',
                                url: base_url + '/sites/saveCssThemeSite',
                                data: val_post,
                                dataType: 'json',
                                success: function success(rs) {
                                    if (rs.login && rs.login == 1) {
                                        if (rs.error) {
                                            $.each(rs.msg, function (k, v) {
                                                LHM.common.notify(null, 'danger', v);
                                            });
                                        } else {
                                            LHM.common.notify(null, 'success', 'Reset thành công');
                                            _this.close();
                                        }
                                    } else if (rs.login && rs.login == 2) {
                                        window.location = rs.href;
                                    }
                                }
                            });
                        } else {
                            return false;
                        }
                    }
                },
                Ok: {
                    text: 'OK',
                    btnClass: 'btn-blue',
                    action: function action() {
                        var _this = this;
                        var code = window.codeMirror.getValue();
                        var val_post = {
                            _token: $.cookie('_token'),
                            sid: sid,
                            content: code
                        };
                        $.ajax({
                            type: 'POST',
                            url: base_url + '/sites/saveCssThemeSite',
                            data: val_post,
                            dataType: 'json',
                            success: function success(rs) {
                                if (rs.login && rs.login == 1) {
                                    if (rs.error) {
                                        $.each(rs.msg, function (k, v) {
                                            LHM.common.notify(null, 'danger', v);
                                        });
                                    } else {
                                        LHM.common.notify(null, 'success', 'Cập nhật thành công');
                                        _this.close();
                                    }
                                } else if (rs.login && rs.login == 2) {
                                    window.location = rs.href;
                                }
                            }
                        });
                    }
                },
                cancel: {
                    text: 'Đóng'
                }
            }
        });
    });
    $(document).on('click', '.btn-edit-section-layout', function (event) {
        event.preventDefault();
        $(this).hide();
        $(this).parents('.action-section').find('.btn-save-section-layout').show();
        $(this).parents('.content_section').find('.block-content-layout-site').show();
    });
    $(document).on('click', '.btn-save-section-layout', function (event) {
        event.preventDefault();
        $(this).hide();
        $(this).parents('.action-section').find('.btn-edit-section-layout').show();
        $(this).parents('.content_section').find('.block-content-layout-site').hide();
        // LHM.common.notify(null, 'success','Lưu thành công');
    });

    // bat su kien nhan Enter login
    $('.keypress-login').keypress(function (e) {
        if (e.which == 13) {
            $('.btn-login').trigger('click');
            return false;
        }
    });
    $('.keypress-register').keypress(function (e) {
        if (e.which == 13) {
            $('.btn-register').trigger('click');
            return false;
        }
    });
    $('.keypress-forgot').keypress(function (e) {
        if (e.which == 13) {
            $('.btn-forgot').trigger('click');
            return false;
        }
    });
    $(document).on('click', '#ischeck_recurring', function () {
        if ($(this).prop('checked')) {
            $('#recurring_schedule').show();
        } else {
            $('#recurring_schedule').hide();
        }
    });
    $(document).on('change', '#city_info', function () {
        var _this = $(this);
        $.ajax({
            url: base_url + '/sites/get_info_district',
            data: {
                id: _this.val()
            },
            type: 'GET',
            success: function success(res) {
                if (res.data) {
                    var html_district = '';
                    $.each(res.data, function (index, el) {
                        html_district += '<option value="' + el._id + '">' + el.name + '</option>';
                    });
                    $('#district_info').html('<option value="">--Chọn Quận/Huyện--</option>' + html_district);
                }
            }
        });
    });
    $(document).on('change', '#city_info_order', function () {
        var _this = $(this);
        $.ajax({
            url: base_url + '/sites/get_info_district',
            data: {
                id: _this.val()
            },
            type: 'GET',
            success: function success(res) {
                if (res.data) {
                    var html_district = '';
                    $.each(res.data, function (index, el) {
                        html_district += '<option value="' + el._id + '">' + el.name + '</option>';
                    });
                    $('#district_info_order').html('<option value="0">-- Chọn quận huyện --</option>' + html_district);
                }
            }
        });
    });
    $(document).on('change', '#district_info', function () {
        var _this = $(this);
        $.ajax({
            url: base_url + '/sites/get_info_ward',
            data: {
                id: _this.val()
            },
            type: 'GET',
            success: function success(res) {
                if (res.data) {
                    var html_ward = '';
                    $.each(res.data, function (index, el) {
                        html_ward += '<option value="' + el._id + '">' + el.name + '</option>';
                    });
                    $('#ward_info').html('<option value="">--Chọn Phường/Xã--</option>' + html_ward);
                }
            }
        });
    });

    // validate thời gian bắt đầu và kết thúc
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    var time_schedule = $('#time_schedule').val();
    var id_module = 1000;
    $('input[type="Form.DateRangePicker"]').each(function () {
        $(this).attr('id', 'module' + id_module);
        $(this).daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        });
        id_module++;
    }).on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('YYYY/MM/DD') + ' - ' + picker.endDate.format('YYYY/MM/DD'));
    }).on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    $('#date, #recurring_enddate').datepicker({
        dateFormat: 'yy-mm-dd',
        onRender: function onRender(date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
        }
    });
    $('#start_date_quiz, #end_date_quiz,#start_date_order, #end_date_order, #start_date_list_zoom, #end_date_list_zoom, #start_date_list_zoom_edubit, #end_date_list_zoom_edubit').datepicker({
        dateFormat: 'yy-mm-dd',
        onRender: function onRender(date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
        }
    });
    if ($('#page_edit_live').length) {
        $('#calendars #date, #recurring_enddate').datepicker({
            dateFormat: 'yy-mm-dd',
            onRender: function onRender(date) {
                return date.valueOf() < now.valueOf() ? 'disabled' : '';
            }
        });
        $('#start_time').timepicker({
            showMeridian: false,
            template: false,
            showInputs: false,
            minuteStep: 5
        });
        $('#end_time').timepicker({
            showMeridian: false,
            template: false,
            showInputs: false,
            minuteStep: 5
        });
    } else {
        $('#calendars #date, #recurring_enddate').datepicker({
            dateFormat: 'yy-mm-dd',
            "setDate": new Date(),
            "autoclose": true
        });
        var defDateStart = new Date();
        defDateStart.setMinutes(defDateStart.getMinutes());
        var hours = defDateStart.getHours() < 10 ? '0' + defDateStart.getHours() : defDateStart.getHours();
        var minutes = defDateStart.getMinutes() < 10 ? '0' + defDateStart.getMinutes() : defDateStart.getMinutes();
        var time_plus_start = hours + ':' + minutes;
        $('#start_time').timepicker({
            'defaultTime': time_plus_start,
            showMeridian: false,
            template: false,
            showInputs: false,
            minuteStep: 5
        });
        var defDateEnd = new Date();
        defDateEnd.setMinutes(defDateEnd.getMinutes() + parseInt(time_schedule));
        var hours_end = defDateEnd.getHours() < 10 ? '0' + defDateEnd.getHours() : defDateEnd.getHours();
        var minutes_end = defDateEnd.getMinutes() < 10 ? '0' + defDateEnd.getMinutes() : defDateEnd.getMinutes();
        var time_plus_end = hours_end + ':' + minutes_end;
        $('#end_time').timepicker({
            'defaultTime': time_plus_end,
            showMeridian: false,
            template: false,
            showInputs: false,
            minuteStep: 5
        });
    }
});
function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }

    return time.join(''); // return adjusted time or original string
}

function number_format_price(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}
function toggleChange(that) {
    var show = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var cur = arguments.length > 2 ? arguments[2] : undefined;
    if (show === null) {
        if (that.attr('data--show')) {
            toggleChange(that, true, that.attr('data--show'));
        }
        if (that.attr('data--hide')) {
            toggleChange(that, false, that.attr('data--hide'));
        }
    } else {
        var div = $(cur);
        var tagName = that.prop('tagName').toLowerCase();
        var slow = !!that.attr('data--slow');
        if (tagName === 'input' && that.attr('type') === 'checkbox') {
            show = that.prop('checked') ? show : !show;
        } else if (['select', 'input'].indexOf(tagName) !== -1) {
            show = that.val() ? show : !show;
        }
        if (!slow) div.toggle(show);else if (show) div.show('slow');else div.hide('slow');
    }
}
function disableChange(that) {
    var disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var cur = arguments.length > 2 ? arguments[2] : undefined;
    if (disabled === null) {
        if (that.attr('data--disabled')) {
            disableChange(that, true, that.attr('data--disabled'));
        }
        if (that.attr('data--rm-disabled')) {
            disableChange(that, false, that.attr('data--rm-disabled'));
        }
    } else {
        var div = $(cur);
        var tagName = that.prop('tagName').toLowerCase();
        if (tagName === 'input' && that.attr('type') === 'checkbox') {
            disabled = that.prop('checked') ? disabled : !disabled;
        } else if (tagName === 'select') {
            disabled = that.val() ? disabled : !disabled;
        }
        if (disabled) div.attr('disabled', true);else div.removeAttr('disabled');
    }
}
$(document).on('click', '#add_load_comment', function () {
    var value = Number($(this).val()) + 1;
    var cid = $(this).data('cid');
    $('#add_load_comment').val(value);
    $.ajax({
        url: base_url + '/courses/add_load_comment',
        data: {
            page: value,
            cid: cid
        },
        type: 'GET',
        success: function success(res) {
            if (res.data) {
                var html_ward = '';
                $.each(res.data, function (index, el) {
                    html_ward += '<div class="row list-comment-course">';
                    html_ward += '<div class="col-sm-4 ava-hv">';
                    html_ward += '<img class="img-thumbnail"  alt="" src="' + el.url_img + '" style="">';
                    html_ward += '</div>';
                    html_ward += '<div class="col-sm-8 block-hv">';
                    html_ward += '<div class="block-inner">';
                    html_ward += '<div class="name-student">' + el.name_student + '</div>';
                    html_ward += '</div>';
                    html_ward += '<div class="cm-hv">';
                    html_ward += '<div class="rate-hv">';
                    html_ward += '<span class="star-comment-student-' + el._id + '"></span>';
                    html_ward += '<script>';
                    html_ward += '$(".star-comment-student-' + el._id + '").raty({';
                    html_ward += 'score: parseInt(' + el.rate_comment + '),starType:"i",click: false,readOnly: true,starOn: "fas fa-fw fa-star",starOff: "far fa-fw fa-star",starHalf: "fas fa-fw fa-star-half-alt"});';
                    html_ward += '</script>';
                    html_ward += '<p>' + el.comment + '</p>';
                    html_ward += '</div></div></div></div>';
                });
                $('.content_comment').append(html_ward);
                if (res.enable == 0) {
                    $('#add_load_comment').css('display', 'none');
                } else {
                    $('#add_load_comment').css('display', '');
                }
            }
        }
    });
}).on('change', 'input[data--show], select[data--show], input[data--hide], select[data--hide]', function () {
    toggleChange($(this));
}).on('change', 'input[data--disabled], select[data--disabled], input[data--rm-disabled], select[data--rm-disabled]', function () {
    disableChange($(this));
}).on('click', '[data--disabled]:not(input, select), [data--rm-disabled]:not(input, select)', function () {
    disableChange($(this));
}).on('click', '[data--hide]:not(input, select), [data--show]:not(input, select)', function () {
    toggleChange($(this));
});
$(document).on('click', '.add_load_course_tag', function () {
    var value = Number($(this).val()) + 1;
    var max_page = $(this).data('max_page');
    var secid = $(this).data('secid');
    $('.add_load_course_tag_' + secid).val(value);
    $('.section_course_tag_' + secid + ' .page_load_section_' + value).removeClass('d-none');
    if (value >= max_page) {
        $(this).remove();
    }
});
$(document).on('change', '#slt-city-custom', function () {
    $('#box-list-city').html('');
    if ($(this).val() != '') {
        var html = '';
        $.get('sites/getDataFilterCity', function (data) {
            if (data) {
                html = '<select class="form-control" id="slt-list-city" name="city">';
                $.each(data, function (k, v) {
                    html += '<option value="' + v._id + '">' + v.name + '</option>';
                });
                html += '</select>';
            }
            $('#box-list-city').html(html);
        });
    }
}).on('click', 'a.edit-quiz-test, a.clicked-link-border', function () {
    LHM.common.saveLocalStorageFilter('quiz_test');
});
$(document).on('change', '#slt-group-custom', function () {
    $('#box-list-group').html('');
    if ($(this).val() != '') {
        var html = '';
        $.get('sites/getDataFilterGroup', function (data) {
            if (data) {
                html = '<select class="form-control js-select2-new" id="slt-list-group" name="select_group">';
                $.each(data, function (k, v) {
                    html += '<option value="' + v._id['$id'] + '">' + v.name + '</option>';
                });
                html += '</select>';
            }
            $('#box-list-group').html(html);
            LHM.common.genSelect2New();
        });
    }
});
$(document).on('change', '#slt-combo-custom', function () {
    $('#box-list-combo').html('');
    if ($(this).val() != '') {
        var html = '';
        $.get('sites/getDataFilterCombo', function (data) {
            if (data) {
                html = '<select class="form-control js-select2-new" id="slt-list-combo" name="select_combo">';
                $.each(data, function (k, v) {
                    html += '<option value="' + v._id['$id'] + '">' + v.name + '</option>';
                });
                html += '</select>';
            }
            $('#box-list-combo').html(html);
            LHM.common.genSelect2New();
        });
    }
});
$(document).on('change', '#slt-course-custom', function () {
    var boxHtml = $('#box-list-course');
    boxHtml.empty();
    if ($(this).val()) {
        $.get('sites/getDataFilterCourse', {
            check_teacher: $(this).attr('data-check-teacher')
        }, function (data) {
            var html = '';
            if (data) {
                html += '<select class="form-control js-select2-new" id="slt-list-course" name="select_course">';
                $.each(data, function (k, v) {
                    html += '<option value="' + v._id['$id'] + '">' + v.name + '</option>';
                });
                html += '</select>';
            }
            boxHtml.html(html);
            LHM.common.genSelect2New();
        });
    }
});
$(document).on('change', '#slt-result-custom', function () {
    $('#box-list-result').html('');
    if ($(this).val() != '') {
        var html = '';
        html += '<select class="form-control" id="slt-list-result">';
        html += '<option value="1">Chưa hoàn thành</option>';
        html += '<option value="2">Hoàn thành</option>';
        html += '</select>';
        $('#box-list-result').html(html);
    }
});
$(document).on('change', '#slt-process-custom', function () {
    $('#box-list-process').html('');
    if ($(this).val() != '') {
        var html = '';
        if ($(this).val() != 4) html += '<input type="number" class="form-control input-flat" name="process" id="input_process_student" onkeypress="return event.charCode >= 48" min="0" max="100">';else {
            html += '<div class="form-row">' + '<div class="col">' + '<input type="number" class="form-control" name="start_process" id="start_process" placeholder="Từ" onkeypress="return event.charCode >= 48" min="0" max="100">' + '</div>' + '<div class="col">' + '<input type="number" class="form-control" name="end_process" id="end_process" placeholder="Đến" onkeypress="return event.charCode >= 48" min="0" max="100">' + '</div>' + '</div>';
        }
        $('#box-list-process').html(html);
    }
});
$(document).on('change', '#slt-point-custom', function () {
    $('#box-list-point').html('');
    if ($(this).val() != '') {
        var html = '';
        if ($(this).val() != 4) html += '<input type="number" class="form-control input-flat" name="point" id="input_point_student" onkeypress="return event.charCode >= 48" min="0" max="100">';else {
            html += '<div class="form-row">' + '<div class="col">' + '<input type="number" class="form-control" id="start_point" placeholder="Từ" onkeypress="return event.charCode >= 48" min="0" max="100">' + '</div>' + '<div class="col">' + '<input type="number" class="form-control" id="end_point" placeholder="Đến" onkeypress="return event.charCode >= 48" min="0" max="100">' + '</div>' + '</div>';
        }
        $('#box-list-point').html(html);
    }
});
$(document).on('change', '.chk-filter-item', function () {
    if ($(this).is(':checked')) {
        $(this).parents('.filter-row-data').find('.filter-content').show();
    } else {
        $(this).parents('.filter-row-data').find('.filter-content').hide();
    }
});
$(document).on('change', '#slt-time-custom', function () {
    var slt_filter = $(this).val();
    $('#box-list-time').html('');
    if (slt_filter != '') {
        if (parseInt(slt_filter) == 4) {
            $('#box-list-time').html('<div class="form-row">' + '<div class="col">' + '<input type="text" class="form-control" id="start_time_filter" name="start_time" placeholder="Bắt đầu">' + '</div>' + '<div class="col">' + '<input type="text" class="form-control"  name="end_time" id="end_time_filter" placeholder="Kết thúc">' + '</div>' + '</div>');
        } else {
            $('#box-list-time').html('<input type="text" class="form-control input-flat" name="time" id="input_time_student">');
        }
    }
    $('#start_time_filter,#end_time_filter,#input_time_student').datepicker({
        dateFormat: 'yy-mm-dd',
        onRender: function onRender(date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
        }
    });
});
$(document).on('change', '#slt-time-join-custom', function () {
    var slt_filter = $(this).val();
    $('#box-list-time-join').html('');
    if (slt_filter != '') {
        if (parseInt(slt_filter) == 4) {
            $('#box-list-time-join').html('<div class="form-row">' + '<div class="col">' + '<input type="text" class="form-control" id="start_time_join_filter" name="start_time_join" placeholder="Bắt đầu">' + '</div>' + '<div class="col">' + '<input type="text" class="form-control" id="end_time_join_filter"  name="end_time_join" placeholder="Kết thúc">' + '</div>' + '</div>');
        } else {
            $('#box-list-time-join').html('<input type="text" class="form-control input-flat" name="time_join" id="input_time_join_student">');
        }
    }
    $('#start_time_join_filter,#end_time_join_filter,#input_time_join_student').datepicker({
        dateFormat: 'yy-mm-dd',
        onRender: function onRender(date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
        }
    });
});
$(document).on('change', '#slt-start_course-custom', function () {
    var slt_filter = $(this).val();
    $('#box-list-start_course').html('');
    if (slt_filter != '') {
        if (parseInt(slt_filter) == 4) {
            $('#box-list-start_course').html('<div class="form-row">' + '<div class="col">' + '<input type="text" class="form-control" id="start_begin_course_time_filter" placeholder="Bắt đầu">' + '</div>' + '<div class="col">' + '<input type="text" class="form-control" id="end_begin_course_time_filter" placeholder="Kết thúc">' + '</div>' + '</div>');
        } else {
            $('#box-list-start_course').html('<input type="text" class="form-control input-flat" name="start_course" id="input_start_course_student">');
        }
    }
    $('#start_begin_course_time_filter,#end_begin_course_time_filter,#input_start_course_student').datepicker({
        dateFormat: 'yy-mm-dd',
        onRender: function onRender(date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
        }
    });
});
$(document).on('change', '#slt-end_course-custom', function () {
    var slt_filter = $(this).val();
    $('#box-list-end_course').html('');
    if (slt_filter != '') {
        if (parseInt(slt_filter) == 4) {
            $('#box-list-end_course').html('<div class="form-row">' + '<div class="col">' + '<input type="text" class="form-control" id="start_finish_course_time_filter" placeholder="Bắt đầu">' + '</div>' + '<div class="col">' + '<input type="text" class="form-control" id="end_finish_course_time_filter" placeholder="Kết thúc">' + '</div>' + '</div>');
        } else {
            $('#box-list-end_course').html('<input type="text" class="form-control input-flat" name="end_course" id="input_end_course_student">');
        }
    }
    $('#start_finish_course_time_filter,#end_finish_course_time_filter,#input_end_course_student').datepicker({
        dateFormat: 'yy-mm-dd',
        onRender: function onRender(date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
        }
    });
});
$(document).on('change', '#chk-all', function () {
    if ($(this).is(':checked')) {
        $('.chk-item').prop('checked', true);
    } else {
        $('.chk-item').prop('checked', false);
    }
});
$(document).on('click', '.btn-export-excel-question', function () {
    var type = $(this).attr('id');
    $(".btn-export-excel-question").attr("href", base_url + '/quiz/list_quiz_question?type=' + type + '&export=1');
});
$(document).on('change', '#checkbox_set_time_expire_date', function () {
    var checked = $(this).is(":checked");
    if (checked != false) {
        $('#expire_date').show();
    } else {
        $('#expire_date').hide();
    }
});
$(document).on('change', '.chk-lib-slt-lesson', function () {
    var optlib = $('#uploader #library_box input[name=optionlib]:checked').val();
    if (optlib != 2 && $(this).is(':checked')) {
        $('.chk-lib-slt-lesson').not(this).prop('checked', false);
    }
});
$(document).on('change', '.chk-opt-add-lesson', function () {
    $('.chk-lib-slt-lesson').prop('checked', false);
});
$(document).on('input', 'textarea[maxlength]', function () {
    var maxlength = parseInt($(this).attr('maxlength'));
    if (this.value.length > maxlength) {
        this.value = this.value.slice(0, maxlength);
    }
});
$(document).on('click', 'button#button-delete-site-map', function () {
    var that = $(this);
    $.confirm({
        title: 'Xóa sitemap',
        content: 'Bạn chắc chắn muốn xóa cấu hình sitemap riêng này?',
        buttons: {
            Ok: {
                text: 'Đồng ý',
                action: function action() {
                    LHM.common.callAjax('/sites/removeSiteMap', 'POST', {
                        _token: $.cookie('_token')
                    }, function () {
                        that.remove();
                    });
                }
            },
            cancel: {
                title: 'Đóng lại'
            }
        }
    });
});
$(document).on('click', '.btn-input-id-certificate', function () {
    var curr = $(this);
    if ($('#id-cert').val() != '') {
        $.ajax({
            type: 'GET',
            url: base_url + '/sites/getInfoCertificate',
            data: {
                id: $('#id-cert').val()
            },
            dataType: 'json',
            beforeSend: function beforeSend() {
                curr.attr('disabled', 'disabled');
                ;
            },
            success: function success(data) {
                curr.removeAttr('disabled');
                var html = '';
                html += '<table class="table table-hover table-bordered">' + '<thead class="text-center">' + '<tr>' + '<th>ID</th>' + '<th>Họ tên</th>' + '<th>Khóa học</th>' + '<th>Thời gian</th>' + '<th>Tải về</th>' + '</tr>' + '</thead>' + '<tbody class="text-center">';
                if (data._id) {
                    html += "\n                        <tr>\n                            <td>".concat(data._id, "</td>\n                            <td>").concat(data.fullname, "</td>\n                            <td>").concat(data.course_name, "</td>\n                            <td>").concat(data.time, "</td>\n                            <td>\n                                <a href=\"javascript:;\" data-code=\"").concat(data.code, "\" data-user-id=\"").concat(data.uid, "\" class=\"js-download-certificate\">\n                                    <i class=\"far fa-cloud-download\"></i>\n                                </a>\n                            </td>\n                        </tr>\n                        ");
                } else {
                    html += '<tr><td colspan="5" class="text-center">Không có dữ liệu!</td></tr>';
                }
                html += '</tbody>' + '</table>';
                $('#info-certificate').html(html);
            },
            error: function error(err) {
                LHM.common.notify(null, 'danger', 'có lỗi xảy ra');
            }
        });
    } else {
        LHM.common.notify(null, 'danger', 'Vui lòng nhập ID chứng chỉ');
    }
});
// reset mã captcha
$(document).on('click', '#reset_captcha', function () {
    var src = $('#image_captcha').attr('src');
    var date = new Date();
    var timer = date.getTime();
    $('#image_captcha').attr('src', '/captcha?t=' + timer);
});
$(window).scroll(function () {
    if ($('.header-fixed').length > 0) {
        if ($(window).scrollTop() > $('.header-fixed').outerHeight()) {
            $(".header-fixed").addClass('active');
        } else {
            $(".header-fixed").removeClass('active');
        }
    }
});
$(document).on('click', '.btn-step-by-step', function () {
    $('.step-content').hide();
    $(".step-content[data-step-index=\"".concat($(this).data('step'), "\"]")).show();
}).on('click', '.btn-click-dialog', function () {
    var content = 'Content';
    if ($(this).data('content')) {
        content = $(this).data('content');
    } else if ($(this).data('content-cur') && $($(this).data('content-cur')).length) {
        content = $($(this).data('content-cur')).html();
    }
    $.dialog({
        title: $(this).attr('title') ? $(this).attr('title') : 'Dialog',
        columnClass: $(this).data('column-class') ? $(this).data('column-class') : 'col-md-8',
        content: content
    });
});