module.exports = function(grunt) {
  var globalConfig = {
    deployment_target: "~/public/shepherddog.co/public"
  };

  // Project configuration.
  grunt.initConfig({
    globalConfig: globalConfig,
    concat: {
      options: {
        separator: ""
      },
      dist: {
        src: ["css/normalize.css", "css/main.css"],
        dest: "css/concat/shepherd-dog.css"
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: "css/concat",
          src: ["*.css"],
          dest: "minified",
          ext: "v1.0.2.min.css"
        }]
      }
    },
    devUpdate: {
        main: {
            options: {
                updateType: 'report', //just report outdated packages 
                reportUpdated: false, //don't report up-to-date packages 
                semver: true, //stay within semver when updating 
                packages: {
                    devDependencies: true, //only check for devDependencies 
                    dependencies: false
                },
                packageJson: null, //use matchdep default findup to locate package.json 
                reportOnlyPkgs: [] //use updateType action on all packages 
            }
        }
    },
    'http-server': {
 
        'dev': {
 
            // the server root directory 
            root: "./",
 
            // the server port 
            // can also be written as a function, e.g. 
            // port: function() { return 8282; } 
            port: 8001,
            
 
            // the host ip address 
            // If specified to, for example, "127.0.0.1" the server will  
            // only be available on that ip. 
            // Specify "0.0.0.0" to be available everywhere 
            host: "0.0.0.0",
 
            showDir : true,
            autoIndex: true,
 
            // server default file extension 
            ext: "html",
 
            // run in parallel with other tasks 
            runInBackground: false
 
        }
 
    },
    imageoptim: {
      optimizeImages: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: ["media/*.png"]
      }
    },
    'install-dependencies': {

    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      files: ['Gruntfile.js', 'scripts/*.js', 'tests/*.js']
    },
    pagespeed: {
      options: {
        nokey: true,
        url: "http://shepherddog.co"
      },
      prod: {
        options: {
          url: "http://shepherddog.co",
          locale: "en_US",
          strategy: "desktop",
          threshold: 80
        }
      },
      paths: {
        options: {
          paths: ["/technology-services", "/who-we-are", "/pricing"],
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      }
    },
    phantomas: {
      shepherddog : {
        options : {
          indexPath : './phantomas/',
          options   : {},
          url       : 'http://shepherddog.co/',
          buildUi   : true
        }
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      files: ['tests/index.html']
    },
    rsync: {
        options: {
            args: ["--verbose"],
            exclude: [".git*",
                      "*.scss",
                      "node_modules",
                      "gruntfile.js",
                      "package.json",
                      "tests/",
                      "css/",
                      "scripts/",
                      "phantomas/"],
            recursive: true
        },
        dist: {
            options: {
                src: "./",
                dest: "../dist"
            }
        },
        stage: {
            options: {
                src: "../dist/",
                dest: "/var/www/site",
                host: "user@staging-host",
                delete: true // Careful this option could cause data loss, read the docs!
            }
        },
        prod: {
            options: {
                src: "./",
                dest: "~/public/shepherddog.co/public",
                host: "dbrunow@firehawk.brunow.org",
                delete: true // Careful this option could cause data loss, read the docs!
            }
        }
    },
    sitemap: {
      dist: {
        pattern: ['**/*.html', 
                  '!**/google*.html', 
                  '!**/node_modules/**', 
                  '!**/tests/**', 
                  '!**/phantomas/**']
      }
    },
    svgmin: {
        options: {
            plugins: [
                {
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: false
                }
            ]
        },
        dist: {
          files: {
            'media/logo.svg': 'media/logo.svg'
          }
        }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: true
      },
      build: {
        src: 'scripts/shepherd-dog.js',
        dest: 'minified/shepherd-dogv1.0.2.min.js'
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'tests/*.html', 'css/*.css'],
      tasks: ['jshint', 'qunit', 'uglify', 'concat', 'cssmin']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-rsync');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-pagespeed');
  grunt.loadNpmTasks('grunt-phantomas');
  grunt.loadNpmTasks('grunt-sitemap');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-install-dependencies');
  grunt.loadNpmTasks('grunt-dev-update');

  // Default task(s).
  grunt.registerTask('default', ['install-dependencies', 'jshint', 'qunit', 'uglify', 'concat', 'cssmin', 'sitemap:dist']);

  //Other tasks
  grunt.registerTask("deploy", ["rsync:prod", "pagespeed", "phantomas"]);
  grunt.registerTask("optimizeImages", ["svgmin", "imageoptim"]);
  grunt.registerTask("server", ["http-server:dev"]);
  grunt.registerTask("w", ["install-dependencies", "watch"]);
};