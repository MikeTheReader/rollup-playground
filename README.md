# rollup-playground

Trying to recreate an error I was seeing using rollup to import a third-party library that was created by webpack. I was having issues getting the default exported function -- I would always get back an object.

So, I tried to narrow it down to the smallest possible thing to reproduce the error. 

It looks like when a file is used to import everything from another file and export that, we get issues. The bundle created by Rollup has:

```javascript
unwrapExports(wpBundle);
var wpIndex = wpBundle;
var wpIndex_1 = wpIndex.Named;
```

The `unwrapExports` in this case isn't doing anything, so the default export is exported as an object like `{ default: f, ....}`.

If the import is modified to go directly to the webpack bundle, then everything works fine, and the resulting code is more like this:

```javascript
var Unnamed = unwrapExports(wpBundle);
var wpBundle_1 = wpBundle.Named;
```

## To Recreate

Run `yarn roll` to create the `rollup-bundle.js`. Modify the `index.js` file to either point to the `wp-index.js` (which is just requiring and exporting) or `wp-bundle.js` (which is the raw webpack bundle).