module.exports = function(grunt) {
    //Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
            },
            build: {
                src: 'client/scripts/app.js',
                dest: 'public/javascripts/app.min.js'
            },
            controller1: {
                src: 'client/scripts/controllers/apiInstructionsController.js',
                dest: 'public/javascripts/controllers/apiInstructionsController.min.js'
            },
            controller2: {
                src: 'client/scripts/controllers/ticketController.js',
                dest: 'public/javascripts/controllers/ticketController.min.js'
            },
            controller3: {
                src: 'client/scripts/controllers/calculatorController.js',
                dest: 'public/javascripts/controllers/calculatorController.min.js'
            },
            controller4: {
                src: 'client/scripts/controllers/headerController.js',
                dest: 'public/javascripts/controllers/headerController.min.js'
            },
            controller5: {
                src: 'client/scripts/controllers/registerController.js',
                dest: 'public/javascripts/controllers/registerController.min.js'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: "node_modules/bootstrap",
                        src: [
                            "dist/css/*",
                            "dist/fonts/*",
                            "dist/js/*",
                            "fonts/*"
                        ],
                        "dest": "public/vendors/bootstrap"
                    },
                    {
                        expand: true,
                        cwd: "node_modules/",
                        src: [
                            "angular/angular.js",
                            "angular/angular.min.js",
                            "angular/angular.min.js.map",
                            "angular/angular-csp.css"
                        ],
                        "dest": "public/vendors"
                    },
                    {
                        expand: true,
                        cwd: "node_modules/",
                        src: [
                            "angular-route/angular-route.min.js",
                            "angular-route/angular-route.min.js.map"
                        ],
                        "dest": "public/vendors"
                    },
                    {
                        expand: true,
                        cwd: "node_modules/",
                        src: [
                            "angular-resource/angular-resource.min.js",
                            "angular-resource/angular-resource.min.js.map"
                        ],
                        "dest": "public/vendors"
                    },
                    {
                        expand: true,
                        cwd: "client/",
                        src: [
                            "views/*",
                            "styles/*"
                        ],
                        "dest": "public/"
                    },
                ]
            }
        }



    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Default task(s)
    grunt.registerTask('default', ['copy', 'uglify']);
};