var fis = module.exports = require('fis');

fis.cli.name = "emao-plus";
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
fis.cli.version=function(){
    var content=[
        'v'+fis.cli.info.version,
        'emao-fe'.bold.red
    ].join('\n');
    console.log(content);
}

fis.require.prefixes = ['emaop', 'fis'];

fis.cli.help.commands = [ 'release', 'install', 'server', 'init' ];
fis.config.set('project.fileType.text', 'jsx'); //*.jsx files are text file.
//fis.config.set('modules.parser.jsx', 'react');  //compile *.jsx with fis-parser-react plugin
//fis.config.set('roadmap.ext.jsx', 'js');        //*.jsx are exactly treat as *.js
fis.config.merge({
    statics: '/static',
    templates: '/template',
    namespace: '',
    server: {
        rewrite: true,
        libs: 'pc',
        type: 'php',
        clean: {
            exclude: "fisdata**,smarty**,rewrite**,index.php**,WEB-INF**"
        }
    },
    modules : {
        parser : {
            less : 'less',
            tmpl: 'bdtmpl',
            po: 'po',
            jsx: 'react'
        },
        preprocessor: {
            tpl: 'components, extlang',
            html: 'components',
            js: 'components',
            css: 'components'
        },
        postprocessor: {
            tpl: 'require-async',
            js: 'jswrapper, require-async'
        },
        optimizer : {
            tpl : 'smarty-xss,html-compress'
        },
        prepackager: 'widget-inline,js-i18n'
    },
    roadmap : {
        ext : {
            less : 'css',
            tmpl : 'js',
            po   : 'json',
            jsx  : 'js'
        },
        path : [
            // i18n
            {
                reg: '/fis_translate.tpl',
                release: '${templates}/${namespace}/widget/fis_translate.tpl'
            },
            {
                reg: /\/lang\/([^\/]+)\.po/i,
                release: '/config/lang/${namespace}.$1.po'
            },
            //i18n end
            {
                reg: /^\/components\/(.*\.(js|css))$/i,
                isMod: true,
                release: '${statics}/${namespace}/components/$1'
            },
            {
                reg : /^\/widget\/(.*\.tpl)$/i,
                isMod : true,
                url : '${namespace}/widget/$1',
                release : '${templates}/${namespace}/widget/$1'
            },
            {
                reg : /^\/widget\/(.*\.(js|css))$/i,
                isMod : true,
                release : '${statics}/${namespace}/widget/$1'
            },
            {
                reg : /^\/page\/(.+\.tpl)$/i,
                isMod: true,
                release : '${templates}/${namespace}/page/$1',
                extras: {
                    isPage: true
                }
            },
            {
                reg : /\.tmpl$/i,
                release : false,
                useOptimizer: false
            },
            {
                reg: /^\/(static)\/(.*)/i,
                release: '${statics}/${namespace}/$2'
            },
            {
                reg: /^\/(config|test)\/(.*\.json$)/i,
                isMod: false,
                charset: 'utf8',
                release: '/$1/${namespace}/$2'
            },
            {
                reg: /^\/(config|test)\/(.*)/i,
                isMod: false,
                release: '/$1/${namespace}/$2'
            },
            {
                reg : /^\/(plugin|smarty\.conf$)|\.php$/i
            },
            {
                reg : 'server.conf',
                release : '/server-conf/${namespace}.conf'
            },
            {
                reg: "domain.conf",
                release: '/config/$&'
            },
            {
                reg: "build.sh",
                release: false
            },
            {
                reg : '${namespace}-map.json',
                release : '/config/${namespace}-map.json'
            },
            {
                reg: /^.+$/,
                release: '${statics}/${namespace}$&'
            },
            {
                reg:/\/readme.md$/i,
                release:false
            },
            {
                reg:/\/*.bat$/i,
                release:false
            }
        ]
    },
    settings : {
        parser : {
            bdtmpl : {
                LEFT_DELIMITER : '<#',
                RIGHT_DELIMITER : '#>'
            }
        },
        postprocessor : {
            jswrapper: {
                type: 'amd'
            }
        }
    },

    component: {
        protocol: 'github',
        gitlab: {
            author: 'fis-components'
        },
        skipRoadmapCheck: true
    }
});

fis.emitter.on('fis-conf:loaded', function () {
    // postpackager {{{

    var postpackager = fis.config.get('modules.postpackager', []);

    if (fis.util.is(postpackager, 'String')) {
        postpackager = postpackager.split(',');
    } else if (fis.util.is(postpackager, 'Function')) {
        postpackager = [postpackager];
    }

    var argv = process.argv;
    var isPreview = !(~argv.indexOf('-d') || ~argv.indexOf('--dest'));
    // auto generate smarty.conf
    if (isPreview) {
        postpackager.push(require('./lib/smarty-config.js'));
    }

    postpackager.push(require('./lib/livereload-target.js'));

    fis.config.set('modules.postpackager', postpackager);

    // }}}
});
