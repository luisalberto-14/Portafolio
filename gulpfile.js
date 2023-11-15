const{series, src, dest, parallel, watch}=require('gulp');//este archivo lo trae desde las dependencias  que ya instalaste

const sass = require('gulp-sass')(require('sass'));   //instalas npm i sass gulp-sass --save-dev
// const sass=require('gulp-sass');  si no agarra este se coloca el de arriba 

const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss')//necesitas actualizar a gulp-postcss@9.1.0 para que no diga TypeError in plugin "gulp-postcss" 
const sourcemaps = require('gulp-sourcemaps') //este sirve para hacer un mapeo completo del css
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');//este se le coloca la version gulp-imagemin@7.0.0 para que no marque error
//const notify = require('gulp-notify');
//const cache = require('gulp-cache');
const webp = require('gulp-webp');
// const discardComments = require('postcss-discard-comments');

const paths = {
    scss: 'src/scss/**/*.scss', //ruta del scss
    js: 'src/js/*.js', //ruta del app.js
    imagenes: 'src/img/**/*' //ruta de las imagenes
}

// css es una función que se puede llamar automaticamente
function css() {
    return src(paths.scss)//retorna el src o path
        .pipe(sourcemaps.init()) //inicia el mapeo del codigo
        .pipe(sass()) //llama al sass
        .pipe(postcss([autoprefixer(), cssnano()])) //prefixer para que se adapte a los navegadores antiguos
        // .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('./build/css') );//crea una carpetallamada build
}


function javascript() {
    return src(paths.js)
      .pipe(sourcemaps.init())
      .pipe(concat('bundle.js')) // une el los archivos de js
      .pipe(terser())
      .pipe(sourcemaps.write('.'))
      .pipe(rename({ suffix: '.min' })) //reenombra el archivo y le añade.min por ejemplo bundle.min.js que ya esta minificado
      .pipe(dest('./build/js'))
}

function imagenes() {
    return src(paths.imagenes)
        .pipe(imagemin())
        //.pipe(cache(imagemin({ optimizationLevel: 3})))
        .pipe(dest('build/img'))
        // .pipe(notify({ message: 'Imagen Completada'}));
}

function versionWebp() { //cambia de version a webp para la web
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe(dest('build/img'))
        // .pipe(notify({ message: 'Imagen Completada'}));
}


function watchArchivos() { //llama a las funciones con su respectivo path
    watch( paths.scss, css );
    watch( paths.js, javascript );
    watch( paths.imagenes, imagenes );
    watch( paths.imagenes, versionWebp );
}
  
exports.default = parallel(css, javascript,  imagenes, versionWebp, watchArchivos );  //ejecuta por default todas las funciones paralelamente