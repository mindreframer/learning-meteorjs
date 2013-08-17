{spawn} = require 'child_process'
path = require 'path'
fs = require 'fs'

EXEC_PRINT_OPTS = printStdout: true, printStderr: true

desc 'List Jake tasks.'
task 'default', -> jake.exec ['jake -T'], EXEC_PRINT_OPTS

desc 'Compile CoffeeScript and LESS source files.'
task 'build.cs', ->
  jake.exec ['coffee -cb ./common/model.coffee',
             'coffee -cb ./client/main.coffee',
             'coffee -cb ./server/main.coffee',
             'lessc ./client/main.less ./client/main.css'],
            EXEC_PRINT_OPTS

desc 'Compile TypeScript and LESS source files.'
task 'build.ts', ->
  jake.exec ['tsc --declaration ./common/model.ts',
             'tsc ./client/main.ts',
             'tsc ./server/main.ts',
             'lessc ./client/main.less ./client/main.css'],
            EXEC_PRINT_OPTS

desc 'Push project to github.'
task 'push', ->
  console.log 'pushing to github...'
  jake.exec ['git push --tags origin master'], EXEC_PRINT_OPTS
