module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ""
      },
      dist: {
        src: ["css/normalize.css", "css/main.css"],
        dest: "minified/shepherd-dogv1.0.0.min.css"
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
    qunit: {
      files: ['tests/index.html']
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
      tasks: ['jshint', 'qunit', 'uglify', 'concat']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'qunit', 'uglify', 'concat']);
};