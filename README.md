# es6iisnode

Sample ES6 Code in iisnode

This article shows how to make sure that ES6 Modules import work on Node.js on Windows App Service and also an introduction to ES modules as well as ES import.

Node.js has two module systems: CommonJS modules and ECMAScript modules.

The de facto standard for modules in Node.js currently  is CommonJS. CommonJS modules are defined in normal .js files using module.exports. Modules can be used later within other .js files with the require() function.

Import using require (Common JS) :

// foo.js
module.exports = function() { 
  return 'Hello foo!';
}
// index.js
var foo = require('./foo');
console.log(foo()); // Hello foo!


 to run this example ,simply use node index.js

Importing using ES modules:

Since Node v8.5, developers have been able to run variations of support for the ES modules specification using the --experimental-modules flag. These modules can be defined in either .mjs files or .js files also by adding { "type": "module" } in the  package.json.

For example: Using .mjs extension:

// foo.mjs
export function foo() { 
  return 'Hello foo!'; 
}
// index.mjs
import { foo } from './foo.mjs';
console.log(foo()); // Hello foo!

to run this example use : node --experimental-modules index.mjs 

Alternatively we can use .js extension normally  by adding { "type": "module" } in the nearest package.json  & run above example code normally without experimental module flag ( Node.js >=12.17)

Please refer to following table for support of ES Modules 



 
In case of Windows App Service, iisnode uses interceptor.js to pull entrypoint from the web.config file and if we use ES Modules, this file throws error as :

Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: D:\home\site\wwwroot\server.js
require() of ES modules is not supported.
require() of D:\home\site\wwwroot\server.js from D:\Program Files (x86)\iisnode\interceptor.js is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename server.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from D:\home\site\wwwroot\package.json.

It's happening as we have specified  { "type": "module" } in the  package.json which  defines all .js files in that package scope as ES modules while interceptor.js from iisnode expects a Common JS File as entrypoint. 

This can be solved by adding a new file next to your entrypoint file (server.js)  and configuring it as the iisnode's entry point (pulled from web.config). Let's call the new file run.cjs and put only the following line into it:

import("./server.js");


The cjs file extension is important because it tells Node that this file is not a ES module, as it would expect because of "type": "module" in your package.json. This allows other CommonJS files to include our new file - namely iisnode's interceptor.js. It again imports the server.js which then runs fine as ES module.

Here is the sample code for a Web App using es6 modules on iisnode:
 
https://github.com/shuanand/es6iisnode

Please refer to the below article for more reference:

https://nodejs.org/api/esm.html#esm_package_json_type_field
![image](https://user-images.githubusercontent.com/75124494/168859565-aee73650-8f9f-4de5-8810-143eae74bac8.png)

