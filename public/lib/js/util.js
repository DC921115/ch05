/**
 *  util.js 对外开放全局申明U，
 */
(function (f) {
    // 全局模式
    window.U = f(window.jQuery);
})(function ($) {

    // 定义构造函数，基于jQuery插件；
    // 整体构造函数
    var U = function () {
        this.init();
    };

    U.fn = U.prototype;

    U.config = {};

    // 初始化方法。可以在这里定义事件和初始化的配置；
    U.fn.init = function () {
        U.versionMessage = {
            version: '1.0.0'
        };
        U.config = {
            isLog: true
        };
        this.logS('util.js is init!');
    }
    /**
     *  log
     *  @type : logS 直接打印，不带tag值
     *  @type : logT 带有tag值的日志
     *  @description 打印log日志，如果U.config.isLog 为true ，显示log，否则不显示。
     */
    U.fn.logS = function (string) {
        if (U.config.isLog) {
            console.log("log" + "====>" + string);
        }
    };
    U.fn.logT = function (tag, string) {
        if (U.config.isLog) {
            console.log(tag + "====>" + string);
        }
    }

    /**
     *  网络请求post
     *  @description 网络请求方法，post请求，
     *  @param: url 请求地址
     *  @param:params 提交参数
     *  @param：callback 回掉方法；
     */
    U.fn.post = function (url, params, callback) {
        this.logT('post---params', JSON.stringify(params));
        $.ajax({
            type: "POST",
            url: url,
            data: params,
            success: success,
            error: fail,
            dataType: 'json'
        });
        function success(res) {
            this.logT('post---success', JSON.stringify(res));
            callback(res);
        }

        function fail(error) {
            this.logS('error');
        }
    }

    /**
     *  提取连接后面的参数
     *  @param ：name 参数名称
     *  @return ： 返回参数名称对应的值；
     */
    U.fn.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    /**
     * 事件格式化方法一
     * @param ： s 传入时间戳，
     * @return ： 格式化的时间。yy-MM-dd
     */
    U.fn.formDate = function (s) {
        var date = new Date(s);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    /**
     * 事件格式化方法二
     * @param ： s 传入时间戳，
     * @return ： 格式化的时间。yy-MM-dd hh-mm--ss
     */
    U.fn.formTime = function (s) {
        var date = new Date(s);
        return U.formDate(s) + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
    }

    /**
     *  是按钮可以不可点击
     *  @param: em 需要处理的按钮
     */
    U.fn.btnUnable = function (em) {
        $(em).attr('disabled', "true"); //添加disabled属性
    }

    /**
     *  是按钮可以可点击
     *  @param: em 需要处理的按钮
     */
    U.fn.btnEnable = function (em) {
        $(em).removeAttr("disabled"); //移除disabled属性
    }

    /**
     *  @description 判断字符是否为空
     *  注意： 0 = '';在js当中，0和'' 是相等的；
     */
    U.fn.isEmpty = function (s) {
        return s == undefined || s == null;
    }

    /**
     *  @description 存储本地的信息；
     */
    U.fn.setStorage = function (key, value) {
        localStorage.setItem(key, value);
    };
    U.fn.getStorage = function (key) {
        localStorage.getItem(key);
    };
    //返回util的实例
    return new U();
});






