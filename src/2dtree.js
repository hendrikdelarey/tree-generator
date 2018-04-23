CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }           
};

function getRandomAngle() {
    return ( Math.random() * (maxAngle.value - minAngle.value) + minAngle.value ) * Math.PI / 180;
}

function generateTree(branch) {
    if(branch.depth == numberBranches.value) {
        return;
    }

    let positiveAngle = getRandomAngle();
    let negativeAngle = getRandomAngle();

    let branchLength = branch.branchLength;
    let branchDepth = branch.depth + 1;

    let positiveBranch = {
        startX : branch.endX,
        startY : branch.endY,
        endX : branch.endX + branchLength * Math.cos(Math.PI - positiveAngle),
        endY : branch.endY - branchLength * Math.sin(Math.PI - positiveAngle),
        depth : branchDepth,
        branchLength : branch.branchLength / 1.2
     };
     tree.push(positiveBranch);
     generateTree(positiveBranch);

     let negativeBranch = {
        startX : branch.endX,
        startY : branch.endY,
        endX : branch.endX - branchLength * Math.cos(Math.PI - negativeAngle),
        endY : branch.endY - branchLength * Math.sin(Math.PI - negativeAngle),
        depth : branchDepth,
        branchLength : branch.branchLength / 1.2
     };

     tree.push(negativeBranch);
     generateTree(negativeBranch);
}

function generate2dTree () { 
    let ctx = myCanvas.getContext("2d");
    
    // clear canvas and reset tree
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    tree = [];

    let branchLength = myCanvas.height/6;

    let root = {
       startX : myCanvas.width/2,
       startY : myCanvas.height,
       endX : myCanvas.width/2,
       endY : myCanvas.height - branchLength,
       depth : 0,
       branchLength: branchLength
    };
    tree.push(root);
    generateTree(root);

    tree.forEach((branch) => {
        draw(branch)
    });
}

function draw(branch) {
    let context = myCanvas.getContext("2d");
    context.beginPath();
    context.moveTo(branch.startX, branch.startY);
    context.lineTo(branch.endX, branch.endY);
    context.stroke();
}