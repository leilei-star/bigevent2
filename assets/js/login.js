$(function() {
    // 点击去注册链接跳转
    $('#go-reg').on('click', function() {
            $('#login-box').hide()
            $('#reg-box').show()
        })
        //点击去登录链接跳转
    $('#go-login').on('click', function() {
        $('#reg-box').hide()
        $('#login-box').show()
    })

    //  从layui中获取four对象
    var form = layui.form
        // 通过layui的 form自定义校验规则
    form.verify({

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]

        pwd: [
            /^[\S]{6,12}$/, '啊sir密码必须6到12位，且没有空格哦'
        ],
        repwd: function(value) {
            // value == $('#pwds').val()
            if ($('#pwd').val() !== $('#pwds').val()) {
                return ('两次密码输入不一样')
            }
        }
    });
    var layer = layui.layer
        // 注册发送ajax获取数据
    $('#reg-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "http://ajax.frontend.itheima.net/api/reguser",
            data: {
                username: $('#reg-box [name=username]').val(),
                password: $('#reg-box [name=password]').val()
            },
            success: function(res) {
                console.log($('#reg-box [name=username]').val());
                console.log(res.status);
                if (res.status !== 0) return layer.msg('注册失败');
                layer.msg('注册成功');
                $('#go-login').click()
                $('#login-box [name=username]').val($('#reg-box [name=username]').val())
                $('#login-box [name=password]').val($('#reg-box [name=password]').val())
            }
        });
    })

    // 登录发送ajax获取数据
    $('#login-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "http://ajax.frontend.itheima.net/api/login",
            data: $(this).serialize(),
            //快速获取文本内容
            success: function(res) {
                if (res.status !== 0) return layer.msg('登录失败');
                layer.msg('登录成功')
                    // location.href = '/index.html'
                localStorage.setItem('token', res.token)
            }
        });
    })
})