module.exports = function(grunt) {
 
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        //concat 설정
        concat:{
            options: {
                banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */ ',  //동작 시점의 날짜가 출력
                separator: '/*** concat separator ***/',
                stripBanners:  {
                    force: true,
                    all: true
                }
            },
            basic: {
                src: [
                'public/js/buddy.js',
                'public/js/custom.js',
                'public/js/template.js'
            ],
                dest: 'public/build/result.js'
            }
        },
        //uglify 설정
        uglify: {
            options: {
                mangle: true,
                compress: {
                    drop_console: true
                },
                beautify: false
            },
            build: {
                src: 'public/build/result.js',
                dest: 'public/build/result.min.js'
            }
        },
        //jshint
        /*jshint:{
            all: ['public/js/*.js'],
            options:{
                reporter: require('jshint-stylish')
            }
        },*/

        //cssmin
        cssmin:{
           minify:{
               expand: true,
               cwd: 'public/css/',
               src: ['*.css', '!Nwagon.css'],
               dest: 'public/build/css',
               ext: '.min.css'
           },
           options:{
               keepSpecialComments: 0
           }
        }



    });
 
    // Load the plugin that provides the "uglify", "concat" tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
   // Load the plugin that provides the "jshint" task.
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    //grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'cssmin']); //grunt 명령어로 실행할 작업
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']); //grunt 명령어로 실행할 작업
 
};