/**
 * 方法1
 */

//comment:定义一个全局的方法，该方法名和最终服务器返回的回调functon同名
window.xxx = function (value) {
  console.log(value)
}

var script = document.createElement('script')
//comment:向服务器发起jsonp请求，传递约定好的callback参数
script.src = 'http://x.localhost.com:7001/json?callback=xxx'
document.body.appendChild(script)

/**
 * 方法2
 */
// require(['http://x.localhost.com:7001/json?callback=define'], function (value) {
//   console.log(value)
// })