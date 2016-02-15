module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: ['Grunfile.js', 'src/lyrctrl/*.js'],
      strict:false
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
	    files: [{
  	      expand: true,
  	      cwd: 'src/lyrctrl/',
  	      src: ['**/*.js'],
  	      dest: 'dist/lyrctrl/',
  	      ext: '.min.js',
  	    }],
      },	  
    },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
//        files: {
//          'dist/css/min.css': ['src/**/*.css']
//        }
  	    files: [{
    	      expand: true,
    	      cwd: 'src/lyrctrl/',
    	      src: ['**/*.css'],
    	      dest: 'dist/lyrctrl/',
    	      ext: '.min.css',
    	    }],
      }
    },

    // configure watch to auto update ------------------------------------------
    watch: {
      stylesheets: {
        files: ['src/**/*.css'],
        tasks: ['cssmin']
      },
      scripts: {
        files: 'src/lyrctrl/*.js',
        tasks: ['jshint',]
      }
    }

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // ===========================================================================
  // CREATE TASKS ==============================================================
  // ===========================================================================
  grunt.registerTask('default', ['uglify:build_vendor']);
};