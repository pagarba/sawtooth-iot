import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';
// import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  //FONTS_DEST = `${this.APP_DEST}/font-awesome/fonts`;
  //FONTS_SRC = [
  //  'node_modules/font-awesome/fonts/**'
  //];

  constructor() {
    super();
      this.APP_TITLE = 'streamiot';
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      /* Select a pre-built Material theme */
      { src: '@angular/material/prebuilt-themes/indigo-pink.css', inject: true },
      /* Polyfill for unsupported browsers */
      { src: 'web-animations-js/web-animations.min.js', inject: 'shims' },
      /* For some gestures */
      { src: 'hammerjs/hammer.js', inject: 'libs' },
      { src: 'jquery/dist/jquery.min.js', inject: 'libs' },
      { src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs' },
      { src: 'pdfmake/build/pdfmake.min.js', inject: 'libs' },
      { src: 'pdfmake/build/vfs_fonts.js', inject: 'libs' },
      { src: 'bootstrap/dist/css/bootstrap.min.css', inject: true }, // inject into css section
      { src: 'bootstrap/dist/css/bootstrap-theme.min.css', inject: true }, // inject into css section
      { src: 'bootstrap/dist/css/bootstrap-theme.min.css.map', inject: true }, // inject into css section
      { src: 'ng2-toasty/bundles/style-material.css', inject: true }, // inject into css section
      { src: 'ng-pick-datetime/assets/style/picker.min.css', inject: true }, // inject into css section
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      //{ src: 'font-awesome/css/font-awesome.css', inject: true }
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      { src: `${this.APP_SRC}/app/theming/prebuilt/blue-theme.css`, inject: true},
    ];
    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
    ];
     //let additionalPackages: ExtendPackages[] = [{
     //  name: '@paragba-controls',
     //  // Path to the package's bundle
     //  path: 'node_modules/@paragba-controls/bundles/paragba-controls.umd.js'
     //}];
     //this.addPackagesBundles(additionalPackages);
    let additionalPackages: ExtendPackages[] = [
      {
        name: 'ng-pdf-make',
        path: 'node_modules/ng-pdf-make/bundles/ng-pdf-make.umd.min.js'
      },
      {
        name: 'angulartics2',
        path: 'node_modules/angulartics2/bundles/core.umd.js'
      },
      {
        name: 'angulartics2/gtm',
        path: 'node_modules/angulartics2/bundles/gtm.umd.js'
      },
      {
        name: 'angulartics2/ga',
        path: 'node_modules/angulartics2/bundles/ga.umd.js'
      },
      {
        name: 'ng4-loading-spinner',
        path: 'node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js'
      },
      {
        name: 'ngx-bootstrap',
        path: 'node_modules/ngx-bootstrap/bundles/ngx-bootstrap.umd.js'
      },
      {
        name: '@ng-bootstrap/ng-bootstrap',
        path: 'node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js'
      },
      {
        name: 'ng2-toasty',
        path: 'node_modules/ng2-toasty/bundles/index.umd.js'
      },
      {
        name: 'ng-pick-datetime',
        path: 'node_modules/ng-pick-datetime/picker.bundle.js'
      },
      {
        name: 'smoothscroll-polyfill',
        path: 'node_modules/smoothscroll-polyfill/dist/smoothscroll.min.js'
      },
      {
        name: 'keyboardevent-key-polyfill',
        path: 'node_modules/keyboardevent-key-polyfill/index.js'
      },
      {
        name: '@angular/material',
        path: 'node_modules/@angular/material/bundles/material.umd.js'
      },
      {
        name: '@angular/cdk',
        path: 'node_modules/@angular/cdk/bundles/cdk.umd.js'
      },
      {
        name: '@angular/cdk/a11y',
        path: 'node_modules/@angular/cdk/bundles/cdk-a11y.umd.js'
      },
      {
        name: '@angular/cdk/accordion',
        path: 'node_modules/@angular/cdk/bundles/cdk-accordion.umd.js'
      },
      {
        name: '@angular/cdk/bidi',
        path: 'node_modules/@angular/cdk/bundles/cdk-bidi.umd.js'
      },
      {
        name: '@angular/cdk/coercion',
        path: 'node_modules/@angular/cdk/bundles/cdk-coercion.umd.js'
      },
      {
        name: '@angular/cdk/collections',
        path: 'node_modules/@angular/cdk/bundles/cdk-collections.umd.js'
      },
      {
        name: '@angular/cdk/keycodes',
        path: 'node_modules/@angular/cdk/bundles/cdk-keycodes.umd.js'
      },
      {
        name: '@angular/cdk/layout',
        path: 'node_modules/@angular/cdk/bundles/cdk-layout.umd.js'
      },
      {
        name: '@angular/cdk/observers',
        path: 'node_modules/@angular/cdk/bundles/cdk-observers.umd.js'
      },
      {
        name: '@angular/cdk/overlay',
        path: 'node_modules/@angular/cdk/bundles/cdk-overlay.umd.js'
      },
      {
        name: '@angular/cdk/platform',
        path: 'node_modules/@angular/cdk/bundles/cdk-platform.umd.js'
      },
      {
        name: '@angular/cdk/portal',
        path: 'node_modules/@angular/cdk/bundles/cdk-portal.umd.js'
      },
      {
        name: '@angular/cdk/scrolling',
        path: 'node_modules/@angular/cdk/bundles/cdk-scrolling.umd.js'
      },
      {
        name: '@angular/cdk/stepper',
        path: 'node_modules/@angular/cdk/bundles/cdk-stepper.umd.js'
      },
      {
        name: '@angular/cdk/table',
        path: 'node_modules/@angular/cdk/bundles/cdk-table.umd.js'
      },
      // mandatory dependency for ng2-bootstrap datepicker
      {
        name: 'moment',
        path: 'node_modules/moment',
        packageMeta: {
          main: 'moment.js',
          defaultExtension: 'js'
        }
      }
    ];

    this.addPackagesBundles(additionalPackages);

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')('/api', { ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
