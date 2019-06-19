//comment:设置允许localhost.com二级域名下的任意三级域名及任意端口都支持跨域
function originReg(origin){
  //http(s)?://(.+\.)?(mywebsite\.com)(:\d{1,5})?
  return /http(s)?:\/\/[\w\.]*(localhost\.com)(:\d{1,5})?/.test(origin)?origin:''
}

module.exports = app => {
  class CrosController extends app.Controller {
    * index(req) {
      // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
      
      /* comment:设置响应头Access-Control-Allow-Origin 
      设置为* ，表示该资源可以被任意外域访问，
      但会导致浏览器cookie无法发送到服务器，即使配置Access-Control-Allow-Credentials：true 也不行 */

      // this.ctx.set('Access-Control-Allow-Origin', '*')

      /* comment: 
      如果我们想要 http://*.localhost.com 都支持跨域怎么办？
      首先肯定不能直接写this.ctx.set('Access-Control-Allow-Origin', 'http://*.localhost.com')
      这样只会对http://*.localhost.com 这个域名才跨域生效
      见上述正则
      */
      this.ctx.set('Access-Control-Allow-Origin', originReg(req.header.origin))

      /* comment：如何把Cookie发到服务器？
      一方面要服务器同意，指定Access-Control-Allow-Credentials:true
      另一方面，开发者必须在AJAX请求中打开withCredentials属性。xhr.withCredentials = true;
      */
     this.ctx.set('Access-Control-Allow-Credentials','true')
      
      this.ctx.body = { msg: 'hello world' }
    }
  }
  return CrosController
}
