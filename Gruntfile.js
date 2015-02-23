module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    target: 'build/<%= pkg.name %>-<%= pkg.version %>.min.js',
    jshint: {
      all: [
        'Gruntfile.js',
        'src/**/*.js',
      ]
    },
    uglify: {
      js: {
        options: {
          preserveComments: 'some'
        },
        files: {
          '<%= target %>': ['src/**/*.js']
        }
      }
    }
  });

  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('default', ['lint', 'uglify:js']);

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
