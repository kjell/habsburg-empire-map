build:
	browserify -p [minifyify --map bundle.map.json --output bundle.map.json] index.js -o bundle.js
