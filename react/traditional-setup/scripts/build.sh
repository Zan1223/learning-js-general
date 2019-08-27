# js transform
babel --presets react,es2015 js/src -d js/build

# js package
browserify js/build/app.js -o bundle.js

# css package
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css

# done
date; echo;