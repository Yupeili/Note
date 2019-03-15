# http 请求头
+ Accept:
    Charset ---- 可接受字符集
    Encoding ---- 编码集
    Language ---- 语言
    Datetime ---- 时间
    Range ---- 尝试从中断位置恢复下载

+ Authorization
    Bearer token

+ Cache-Control 缓存控制    
    拒绝缓存：
    no-cache(不管是否过期，都要到服务器进行校验), no-store(缓存不储存任何内容), must-revalidate(本地副本过期前可以使用本地，一旦过期必须要校验)
    only-if-cached：客户端只接受已缓存的响应，并且不向服务器检查是否有更新  
    缓存周期：
    max-age，s-maxage，max-stale(客户端愿意接受一个已经过期的资源)，min-fresh(客户端希望在指定的时间内获得更新)
    重新验证：  
    must-revalidate，proxy-revalidate

+ Connection：
    keep-alive，close

+ DNT(Do not track): 0 / 1
    用户对于网站追踪的偏好，允许用户指定是否追踪

+ Date:
    时间戳

+ Cookie: a:b;

+ Forwarded： 首部中包含了代理服务器的客户端信息，被代理服务器修改或丢失的信息
    ： by=<identifier>; for=<identifier>; host=<host>; proto=<http|https>


# 实体头(同时用在响应头和请求头中)

+ Content:
    -Encoding：
         对特定媒体类型的数据进行压缩。告诉客户端怎样解码Content-Type中标示的媒体类型内容。
         gzip, compress, deflate, identity, br
    -Language:
        语言选择
    -Length:
        消息主体的大小长度
    -Location：
        返回实体的资源地址
    -type:
        text/html, multipart/form-data(文件上传), application/x-www-form-urlencoded(原生form表单), text/plain, application/json(json数据)，text/xml(发送xml数据)

+ Allow 
    首部字段用于枚举资源所支持的HTTP方法的集合(POST, GET, PUT等)



    

# 响应头(六种简单响应头)

+ Cache-Control

+ Content-Language

+ Content-Type

+ Expires
    ：<http-date>
    响应头包含日期/时间，在此之后响应过期。

+ Last-Modified

+ Pragma

---------------------------------

其他的响应头信息需要通过 Access-Control-Expose-Headers 中列出才能暴露给客户端。

+ Etag 用于检验空中碰撞 ---- 请求修改的内容是不是当前最终版本 | 十分类似github上的commit校验码

+ Age 消息对象在缓存代理中存贮的时长

+ Clear-site-data：
    清除客户端中关于响应网站的数据(session, cookie, innoDB, cache)

+ Set-Cookie
    Cookie: <cookie-list>
    Cookie: name=value
    Cookie: name=value; name2=value2; name3=value3
    可带属性：
        Expires(=date 时间戳 过期时间), 
        Max-Age(=non-zero-digit 失效时间秒数 优先级比Expires更高)，
        Domain(=domain-value cookie可以送达的主机名，未指定时不包含子域名，指定后包含所有子域名)
        path(=path-value, 指定url。指定路径必须出现在请求资源的路径中才可以发送cookie首部。如果path=/docs，那么 "/docs", "/docs/Web/" 或者 "/docs/Web/HTTP" 都满足匹配的条件)   
        Secure(安全属性无法在http中设定这一属性了)
        HttpOnly(不能由JS通过Document.cookie，XMLHttprequest和Request的APIS进行访问)
        SameSite(同源)
    会话期cookie： Set-Cookie： sessionid=xxxxxxxx；HttpOnly；path=/
    持久化cookie：id=xxxx；Expires=xxxxxxx

+ Access-Control-Allow-
    -Credentials

+ Content:
    -Disposition:
        回复内容的形式，附件或是页面的一部分
    -Range：
        数据片段在整个文件中的位置
    -Security-Policy：
        在指定的页面控制用户代理的资源，限制服务源以及脚本端点等
    
