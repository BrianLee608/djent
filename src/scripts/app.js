import 'react-fastclick';

import 'polyfills/array.includes';
import 'polyfills/array.reduce';
import 'polyfills/array.values';
import 'polyfills/requestIdleCallback';
import 'polyfills/string.includes';

import 'static/index.html';
import 'static/.htaccess';
import 'static/manifest.json';
import 'assets/images/favicon.ico';

import '../styles/app.sass';

import 'app/libraries/HackTimer';
import 'file!sw/sw';

import 'app/index';
