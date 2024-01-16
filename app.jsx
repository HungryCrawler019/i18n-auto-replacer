const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const t = require("@babel/types");
const path = require("path");

// Specify the directory you want to list
const directoryPath = path.join(__dirname, "./");
// Read the JSX file
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  // Log the filenames
  files.forEach(file => {
    const jsxCode = fs.readFileSync(file, "utf8");

    // Parse the code into an AST
    const ast = parser.parse(jsxCode, {
      sourceType: "module",
      plugins: ["jsx"]
    });

    // Traverse the AST to find text nodes
    traverse(ast, {
      JSXText(path) {
        const text = path.node.value.trim();
        if (text) {
          // Replace the text node with a JSX expression using the t function
          const tCallExpression = t.callExpression(t.identifier("t"), [t.stringLiteral(text)]);
          const jsxExpressionContainer = t.jsxExpressionContainer(tCallExpression);
          path.replaceWith(jsxExpressionContainer);
        }
      }
    });

    // Generate the modified code
    const output = generator(ast, {}, jsxCode);

    // Write the modified code to a file
    fs.writeFileSync(file + "x", output.code);
    console.log(file);
  });
});