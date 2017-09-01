export default {
	input: 'dist/index.js',
    output: {
	    file: 'dist/bundles/utc-datepicker.umd.js',
        format: 'umd'
    },
	sourceMap: false,
    external: ['@angular/core', '@angular/common', '@angular/forms', 'moment'],
	name: 'ng.utc-datepicker',
    plugins: [
        // rollup needs import moment from 'moment'
        // https://github.com/rollup/rollup-plugin-typescript/issues/68
        // https://github.com/moment/moment/issues/3748
        {
            name: 'replace moment imports',
            transform: code =>
                ({
                    code: code.replace(/import\s*\*\s*as\s*moment/g, 'import moment'),
                    map: { mappings: '' }
                })
        }
    ],
	globals: {
		'@angular/core': 'ng.core',
		'@angular/common': 'ng.common',
		'@angular/forms': 'ng.forms',
        '@angular/platform-browser': 'ng.platform-browser',
		'rxjs/Observable': 'Rx',
		'rxjs/ReplaySubject': 'Rx',
		'rxjs/add/operator/map': 'Rx.Observable.prototype',
		'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
		'rxjs/add/observable/fromEvent': 'Rx.Observable',
		'rxjs/add/observable/of': 'Rx.Observable',
        'moment': 'moment'
	}
}
