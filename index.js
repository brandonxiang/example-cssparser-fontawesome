var css = require('css')
var fs = require('fs')

fs.readFile("./font-awesome.css", "utf8", function(err, data) {
    if (err) throw err;
    // console.log(data);
    var result = {}
    var obj = css.parse(data)
        // console.log(obj)

    var rules = obj.stylesheet.rules;
    for (var i = 0; i < rules.length; i++) {
        var rule = rules[i]
        var declarations = rule.declarations;
        var selectors = rule.selectors;
        if (declarations) {
            for (var j = 0; j < declarations.length; j++) {
                var declaration = declarations[j];
                if (declaration.property === "content") {
                    for (var k = 0; k < selectors.length; k++) {
                        var selector = selectors[k];
                        if (selector.substring(0, 4) === ".fa-") {
                            var keyword = selector.substring(4).replace(":before", "")
                            var reg = new RegExp('\"', "g");
                            result[keyword] = declaration.value.replace(reg, '');
                        }
                    }
                }
            }
        }
    }
    console.log(JSON.stringify(result));
    fs.writeFile("font-awesome.json", JSON.stringify(result), function(data) {});
})