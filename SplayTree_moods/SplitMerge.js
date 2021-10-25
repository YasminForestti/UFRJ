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
  
    clone(){
        if(this.node == null) {
          return new SplayTree()
        }
        let node = new Node(this.node.key, this.node.left.clone(), this.node.right.clone())
        return new SplayTree(node)
    }  

    split (key) {
        let tleft;
        let tright;
        this.splay (key)
        if (this.node == null || this.node.key != key) {
           throw `Key ${key} does not exist`;
        }
        else {
          if (this.node.left.node == null) {
            this.node = this.node.right.node
            tright = this.clone()
            tleft = new SplayTree()
          }
          else if (this.node.right.node == null) {
            this.node = this.node.left.node
            tleft = this.clone()
            tright = new SplayTree()
          }
          else {
            tleft = this.node.left.clone()
            tleft.insert(key)
            tright = this.node.right.clone()
            
          }
          return {tleft,tright} 
        }
        
      }
      
    merge (tleft,tright){
        let Key = tleft.node
        this.splay(Key);
        tleft.node.right.node = tright.node
        return tleft; 
    }  
  }
  let t = new SplayTree();
  t.insert(1);
  t.insert(3);
  t.insert(4);
  t.insert(2);
  let T = t.split(2);
  let t1 = T.tleft;
  let t2 = T.tright;
  console.log(t1,t2);

