/**
 * * 设置cookie
 * @param {*} cname 
 * @param {*} cvalue 
 * @param {*} exdays 
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = `expires=${d.toGMTString()};`;
    var path = 'path=/;';
    document.cookie = `${cname}=${cvalue};${expires}${path}`;
}

/**
 * * 获取cookie
 * @param {*} cname 
 * @returns 
 */
function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    console.log(ca);
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

/**
 * * 检查cookie
 */
function checkCookie() {
    var user = getCookie('username');
    if (user != '') {
        alert('欢迎 ' + user + ' 再次访问');
    } else {
        user = prompt('请输入你的名字:', '');
        if (user != '' && user != null) {
            setCookie('username', user, 7);
        }
    }
}

/**
 * * 删除cookie
 * @param {*} name 
 */
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + '=' + cval + ';path=/;domain=sogou.com;expires=' + exp.toGMTString();
}

export { getCookie, checkCookie, delCookie}