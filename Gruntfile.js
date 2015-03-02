module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
        dest: 'minified/shepherd-dog.min.js'
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'tests/*.html'],
      tasks: ['jshint', 'qunit', 'uglify']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'qunit', 'watch', 'uglify']);
};