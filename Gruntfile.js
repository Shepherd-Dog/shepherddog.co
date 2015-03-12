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
          ext: "v1.0.0.min.css"
        }]
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
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: true
      },
      build: {
        src: 'scripts/shepherd-dog.js',
        dest: 'minified/shepherd-dogv1.0.0.min.js'
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

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'qunit', 'uglify', 'concat', 'cssmin', 'sitemap:dist']);

  //Other tasks
  grunt.registerTask("deploy", ["rsync:prod", "pagespeed", "phantomas"]);
};