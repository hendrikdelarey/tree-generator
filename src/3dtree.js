
tree3d = [];

function renderTree() {
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( 0, -50, 300 );
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    var scene = new THREE.Scene();
    var material = new MeshLineMaterial(null);
    
    tree3d.forEach((branch) => {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(branch.startPos);
        geometry.vertices.push(branch.endPos);

        var line = new MeshLine();
        line.setGeometry(geometry, function( p ) { return branch.width; });
    
        var mesh = new THREE.Mesh( line.geometry, material ); // this syntax could definitely be improved!
        scene.add( mesh )
    });
    
    renderer.render( scene, camera );
}

function create3dTree() {  

    var bl = 40;
    tr = [];
    let root = {
        startPos: new THREE.Vector3(0, -50, 0),
        endPos: new THREE.Vector3(0, bl, 0),
        depth : 0,
        branchLength : bl,
        width: 6
     };
    
     tree3d.push(root);
     generate3dTree(root);
     renderTree();
}

function generate3dTree(branch) {
    if(branch.depth == numberBranches.value) {
        return;
    }

    let branchLength = branch.branchLength;
    let branchDepth = branch.depth + 1;
    let branchWidth = branch.width/2;

    let positiveBranch = {
        startPos: branch.endPos,
        endPos:new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(branchLength).add(branch.endPos),
        depth : branchDepth,
        branchLength : branch.branchLength / 1.2,
        width: branchWidth
     };

     tree3d.push(positiveBranch);
     generate3dTree(positiveBranch);

     let negativeBranch = {
        startPos: branch.endPos,
        endPos: new THREE.Vector3(-Math.random(), 0.5, -Math.random()).multiplyScalar(branchLength).add(branch.endPos),
        depth : branchDepth,
        branchLength : branch.branchLength / 1.2,
        width: branchWidth
     };

     tree3d.push(negativeBranch);
     generate3dTree(negativeBranch);
}
