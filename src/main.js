let myCanvas = document.getElementById('myCanvas');
let numberBranches = document.getElementById('textBoxMaxBranches');
let minAngle = document.getElementById('textBoxMinAngle');
let maxAngle = document.getElementById('textBoxMaxAngle');
var tree = [];

function generateTreeButtonPress () { 
    generate2dTree();
    create3dTree();
}
