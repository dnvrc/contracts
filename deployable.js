var fs = require('fs');

var path = process.cwd();
var cont = path + '/build/contracts/DNVR.json';

fs.readFile(cont, 'utf-8', function(err, data) {
  var contract = JSON.parse(data);
  var abi = JSON.stringify(contract.abi);
  var byt = JSON.stringify(contract.bytecode);

  console.log("CONTRACT ABI: " + abi);
  console.log("\n");
  console.log("CONTRACT BYTECODE: " + byt);
});
