'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
module.exports = function(grunt){
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  var angryConfig = {
      app: 'src',
      dist: 'dist'
  };
  grunt.initConfig({
    angry: angryConfig,
    watch: {
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= angry.app %>/*.html',
          '<%= angry.app %>/css/*.css',
          '{.tmp,<%= angry.app %>}/css/{,*/}*.css',
          '{.tmp,<%= angry.app %>}/js/{,*/}*.js',
          '<%= angry.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, angryConfig.app)
            ];
          }
        }
      },

      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, angryConfig.dist)
            ];
          }
        }
      }
    },
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {



          name:'app',

          mainConfigFile: "src/js/main.js",
          out: "dist/js/main.js",

          baseUrl: angryConfig.app + '/js',
          optimize: 'none',
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          //generateSourceMaps: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true
          //uglify2: {} // https://github.com/mishoo/UglifyJS2
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= angry.app %>',
          dest: '<%= angry.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'components/requirejs/require.js',
            'img/{,*/}*.{webp,gif}',
            'css/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= angry.dist %>/img',
          src: [
            'generated/*'
          ]
        }]
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= angry.dist %>/*',
            '!<%= angry.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    }
  });
  grunt.registerTask('build', [
    'clean:dist',
    'copy:dist',
    'requirejs'
  ]);

  grunt.registerTask('default', [
    'connect:livereload',
    'watch'
  ]);
}