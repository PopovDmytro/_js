import './../styles/main.scss';

if (process.env.NODE_ENV !== 'production') {
    //adding pug files for reload browser page
    require('../index.pug');
}

//
import './source/main';
import './source/pictures';
