class Node {
  
    constructor (key, left, right) {
      Object.assign(this,{key,left,right})
    }
    
  }
class SplayTree {
  
    constructor (node = null) {
      this.node = node
    }
    
    rotateRight () {
      let [d, b, C] = [this.node, this.node.left.node, this.node.left.node.right.node];
      [this.node, b.right.node, d.left.node] = [b, d, C];
    }
    
    rotateLeft () {
      let [b, d, C] = [this.node, this.node.right.node, this.node.right.node.left.node];
      [this.node, d.left.node, b.right.node] = [d, b, C];
    }
    
    splay (key) {
      
      function sp (p, q = null, r = null, path = "") {
        
        let result = 0;
        if (p.node && p.node.key != key) {
          if (p.node.key > key) {
            if (p.node.left.node) result = sp (p.node.left, p, q, path+"L") + 1
          }
          else {
            if (p.node.right.node) result = sp (p.node.right, p, q, path+"R") + 1
          }
        }
        if (result%2 == 0) {
          switch (path.slice(-2)) {
            case "LL" : r.rotateRight(); r.rotateRight(); break;
            case "RR" : r.rotateLeft(); r.rotateLeft(); break;
            case "RL" : q.rotateRight(); r.rotateLeft(); break;
            case "LR" : q.rotateLeft(); r.rotateRight(); break;
            case "R" : q.rotateLeft(); break;
            case "L" : q.rotateRight(); break;
          }
        }
        return result
      }
      
      if (this.node) sp (this)
      
    }
    
    insert (key) {
      if (this.node == null) {
        this.node = new Node (key, new SplayTree(), new SplayTree())
      }
      else {
        this.splay(key)
        if (this.node.key == key) {
          throw `Key ${key} already exists`;
        }
        if (this.node.key < key) {
          let root = new Node (key, new SplayTree(this.node), this.node.right);
          this.node.right = new SplayTree()
          this.node = root;
        }
        else {
          let root = new Node (key, this.node.left, new SplayTree(this.node));
          this.node.left = new SplayTree();
          this.node = root
        }
      }
    }
    
    
    remove (key) {
      this.splay (key)
      if (this.node == null || this.node.key != key) {
         throw `Key ${key} does not exist`;
      }
      else {
        if (this.node.left.node == null) {
          this.node = this.node.right.node
        }
        else if (this.node.right.node == null) {
          this.node = this.node.left.node
        }
        else {
          this.node.right.splay(key)
          this.node.right.node.left.node = this.node.left.node
          this.node = this.node.right.node
        }
      }
    }
   
    count (T,sum){
      
      function preOrdemCount (T){
        if(T.node != null){
        sum += T.node.key; 
        preOrdemCount (T.node.left,sum);
        preOrdemCount (T.node.right,sum);
      }
      return sum;
      }
    return preOrdemCount(T);  
    }

    rangeQueries (min,max){
        let sum = 0;
        this.splay(min);
        let treeMinimal = this.node.right // Splay Tree limitada para valores maiores que o mínimo
        treeMinimal.insert(this.node.key)
        treeMinimal.splay(max);
        let limitedTree = treeMinimal.node.left
        limitedTree.insert(treeMinimal.node.key)// Splay Tree limitada com valores entre o máximo e o mínimo
        
        return this.count(limitedTree, sum, this.node.key)
    }
    
  }

let t = new SplayTree();
let keys = [1,3,4,6,7,0,2,8];
for (let i of keys) {
  t.insert(i);
}
console.log(t.rangeQueries(2,5));

