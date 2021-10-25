class Node {
  
    constructor (key, left = null, right = null) {
      Object.assign(this,{key,left ,right})
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


    leftSubTree (tree){//passando uma arvore para contar as filhas a esquerda do node
        let tam = 0;
        if(tree.left.node == null) return 0 // a arvore passada nos parametros n tiver filho a esquerda ent é zero
        let root = tree.left; //a subtree a esquerda da arvore passada nos parametros

        function preOrder(root){
            if (root.node != null){
                tam += 1;
                preOrder(root.node.left);
                preOrder(root.node.right); 
                
            }
            return tam
        }
        
        return preOrder(root);
    }

    algorithm(pointer , k){
    if((this.leftSubTree(pointer.node)) == k-1){
      return pointer.node.key
    }else{ 
          if(this.leftSubTree(pointer.node) >= k){
              return this.algorithm(pointer.node.left,k)
          }else {
              k = k - 1 - this.leftSubTree(pointer.node)  
              return this.algorithm(pointer.node.right,k) 
          }  
      }  
    }

    orderStatistic (k){
        return this.algorithm(this, k)
    }
}

let t = new SplayTree();
t.insert(1);  
t.insert(3); 
t.insert(4);
t.insert(6);
t.insert(0);
t.insert(2);


console.log(t.orderStatistic(5));

