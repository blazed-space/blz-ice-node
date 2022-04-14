const fs = require('fs');
//const lodash = require('lodash');
//const path = require('path');
//const manifestTemplate = fs.readFileSync('./src/data/manifest.template.json', 'utf8');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const ejs = require("ejs");

function saveFILE(path, object="", type="json"){
    let data = null;
    switch(type){
        case "json":
            data = JSON.stringify(object);
            break;
        case "html":
            if(object instanceof JSDOM){
                data = object.serialize();
            } else {
                data = object;
            }
            break;
        
    }
    fs.writeFileSync(path, data);
}
function loadFILE(path,type="json",config={}){
    var raw = fs.readFileSync(path, 'utf8');
    var obj = {};
    switch (type){
        case "json":
            obj = JSON.parse(raw);
            break;
        case "html":
            obj = new JSDOM(raw, config);
            break;
        case "ejs":
            obj = ejs.render(raw, config);
            break;
        case "js":
        defualt:
            obj = {raw};
            break;
    }
    return obj;
}
function parseCONFIG(config){
    let dataPath = `./src/data/${config}.json`;
    return loadFILE(dataPath);
}
function generateManifest(config){
    let manifestLocation = `./public/manifest.json`;
    const manifest = {
        short_name: config.site.id,
        name: config.site.name,
        icons: [
            {
                src: `${config.app.icon}?h=192&w=192`,
                type: "image/png",
                sizes: "192x192"
            },
            {
                src: `${config.app.icon}?h=512&w=512`,
                type: "image/png",
                sizes: "512x512"
            }
        ],
        description: config.site.desc,
        background_color: config.site.background,
        theme_color: config.site.theme
    };
    saveFILE(manifestLocation, manifest);
}
function generateHTMLPage(config=null, page="index"){
    // Compile head object
    //let template = ejs.compile(str, options);
    if(config === null){ config = generateConfigObject(); }
    config.fire = {
        header: "top",
        content: "Content",
        footer: "bottom"
    };
    config.ice = {
        head: loadFILE('./src/assets/ejs/head.ejs', 'ejs', config),
        app: loadFILE('./src/assets/ejs/app.ejs', 'ejs', config)
    };
    return loadFILE('./src/assets/ejs/layout.ejs', 'ejs', config);
}
function generateConfigObject(){
    let config = {
        app: parseCONFIG('app'),
        document: parseCONFIG('document'),
        dom: parseCONFIG('dom'),
        site: parseCONFIG('site')
    };
    saveFILE("./src/config.blz.json", config);
    return config;
}

// Load a fragment of HTML
//const frag = JSDOM.fragment(`<p>Hello</p><p><strong>Hi!</strong>`);

//let config = generateConfigObject();
//saveFILE("./build/config.blz.js", config, true, ["export const config =", ";"]);
//generateManifest(config);
// Create config file from 
let config = generateConfigObject();
generateManifest(config);

//let indexDocument = loadFILE("./src/index.html", "html");
//saveFILE(path, indexDocument, "html");

let e = generateHTMLPage(config);
//console.log(e);
saveFILE("./public/index.html", e, "html");
console.log(e);
//let data = JSON.stringify(manifest);
//console.log(data);
//fs.writeFileSync('student-2.json', data);

//console.log(manifest);
    //var manifest = fs.readFileSync('./src/data/manifest.template.json', 'utf8')
    // ...
    // foreach { 
    //    lodash.template()
    // }
    // = JSON.parse();

