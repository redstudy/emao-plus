emao-plus 解决方案
====================

emao-plus 是基于 FIS，应用于后端是 PHP，模板是 Smarty 的场景。
------------------


###工程化前端开发
    - 扩展自 fis，包含 fis 的所有提供功能以及 fis 的插件都可使用
    - Smarty 模板压缩
    - XSS 自动转义
    - 内置 less 解析插件，使用 less 无需任何设置
    - 内置 baiduTemplate 解析插件
    - 内置 jsx插件,支持JSX语法线下编译
    - 指定 目录规范，建议遵循此目录规范；
    - 内置脚手架，执行 emaop init -h 命令可查看详细信息
    - 本地环境模拟套件，使用命令 emaop server init 安装，提供 Smarty 模板的解析，数据模拟，以及 URL 转发功能；
###使用方法：
-安装[nodejs](http://nodejs.org/)v0.12.0  
-安装[java](http://java.com/)  
-安装[php-cgi](http://www.apachefriends.org/)  

-安装emao-plus

    npm install -g emao-plus
    emaop -v

-初始化server

    emaop server init

-开启server

    emaop server start

-检出脚手架demo

[https://github.com/wanhh/emaop-demo](https://github.com/wanhh/emaop-demo)

- 执行发布

    emaop release -wL




###目录规范
    - src为开发目录，
    - 开发人员只需要维护src目录即可
    - 开发完成之后执行build.bat会自动生成build目录

> src  
> > common  
> > > page  
> > > plugin  
> > > static  
> > > test  
> > > widget  
> > > build.bat  
> > > build.sh  
> > > fis-conf.js  
> > > fis-online-conf.js  
> > > server.conf  

> > home  
> > > page  
> > > static  
> > > test  
> > > widget  
> > > build.bat  
> > > build.sh  
> > > fis-conf.js  
> > > fis-online-conf.js  
> > > server.conf  

------------
