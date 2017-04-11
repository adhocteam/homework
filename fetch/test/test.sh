node records/index.js &
./node_modules/karma/bin/karma start karma.conf.js --single-run
kill -9 $(lsof -ti tcp:3000)
