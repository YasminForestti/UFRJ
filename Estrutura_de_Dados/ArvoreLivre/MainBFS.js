class RootedTree {
    constructor (data, ...descendants) {
      this.data = data;
      this.descendants = descendants;
    }
    *preorder () {
      yield this;
      for (let d of this.descendants) yield* d.preorder()
    }
    *postorder () {
      for (let d of this.descendants) yield* d.postorder()
      yield this;
    }
  }  

class FreeTree {
  
   
    constructor () { // Constructor - an empty tree
        this.ligaçoes = new Set()
    }
    
    seeFreeTree(a,b){ //Verifica se há ciclos ou arestas desconexas
        this.a = a 
        this.a = b
        //Se não há ligação na Free Tree
        if(this.ligaçoes.size == 0){
            return true
        }

        //percorrer os sets de ligações e verificar as ligações existentes
        let qntA = 0
        let qntB = 0
        for(let ligaçao of this.ligaçoes){
            if(ligaçao[0] == a && ligaçao[1] == b || ligaçao[0] == b && ligaçao[1] == a){// Se já existe uma ligação entre a e b então retorna falso
                return false
            } 
            //Contar quantas vezes aparecem o a e o b no set das ligações
            if(ligaçao[0] == a || ligaçao[1] == a){
                qntA += 1 
            }else if(ligaçao[0] == b || ligaçao[1] == b){
                qntB += 1
            }
        }
        //Se o ambos a e o b não existem ou se ambos já existem na Free Tree não é possível liga-los
        if(qntA==0 && qntB==0){
            throw "Elementos desconexos"
        }else if(qntA!=0 && qntB!=0){
            throw "Criação de um ciclo"
        }

        if((qntA!=0 && qntB==0) || (qntA==0 && qntB!=0) ){//caso em que só a ou o b estiver presente na Free Tree
            return true
        }

    }

    addEdge (a,b) { 
        this.a = a
        this.b = b
        if(this.seeFreeTree(a,b)){//Caso seja possível fazer a ligação então se adiciona o par [a,b] em ligaçoes
            this.ligaçoes.add([a,b])
        }//No caso em que a ligação entre a e b já existe 
    }
    
    isChildren(node){//verificar se o node da RootedTree tem filhos
        let qntNode = 0

        for(let ligaçao of this.ligaçoes){// percorre  e conta todas as ligações de node
            if(ligaçao[1] == node || ligaçao[0] == node){
                qntNode++ 
            }
        }

        if(qntNode > 1){// Se tiiver mais de um ligação então o node tem filhos
            return true
        }else{// Se não, não tem filhos
            return false
        }
    }

    getConnections(node){//percorrer todas as ligações entre os nodes
        let conexoes = []
        
        if(this.isChildren(node)){ //Se o node tem descendentes
            
            for(let conexao of this.ligaçoes){// Percorrer com todas as ligações do node e colocar
                // Em um array de conexões.
               
                if(conexao[0]==node){
                    conexoes.push(conexao[1])    
                }if(conexao[1]==node){
                    conexoes.push(conexao[0])
                }

          }
          return(conexoes) // retorna o array com todas as conexões do node
        }
    }

    rootedTreeMap(){ // Cria o Map que armazena os nodes (data) e seus repectivos filhos (descedents)
        return this.ArvoreComNo = new Map()
    }

    seenRootedTree(){//Cria Map de nodes vistos pelo mêtodo rootedTree  
        return this.visto = new Map()
    }

    rootedTree (root){
       let firstRoot = root
       let fila = []//Fila que define a ordem para percorrer a FreeTree
       let visto = new Map()
       //let visto = this.seenRootedTree()//Cria um Map de vistos vazio
       let ArvoreComNo = this.rootedTreeMap()

       fila.push(root) // O primeiro item da fila sempre irá ser o root da RootedTree
       
       let returnRootedTree = (data, map) =>
       new RootedTree(data, ...map.get(data)?.map(child => returnRootedTree(child, map))??[])
       
       while(fila){
        root = fila[0]
        visto.set(root , true)
        let conexoes = this.getConnections(root)//Pega o array de todas as conexões do root

        if(!(this.isChildren(root))){// Se o root não tiver descendentes
            fila.shift() //Apenas passa para o próximo root da fila                     
        }else{
            let descendente = [] //Array dos descendentes do root
            for(let i =0; i< conexoes.length; i++){ 
                //percorrer o array de conexões apenas colocando no array de descendentes
                // os nodes não vistos
                if(!visto.get(conexoes[i])){
                    descendente.push(conexoes[i])
                    fila.push(conexoes[i]) //Colocar os descendentes como proximos na fila 
                    visto.set(conexoes[i], true) // colocar os descendentes como vistos   
                }          
            }
        
        ArvoreComNo.set(root, descendente)   
        fila.shift()
        }
        

        if(fila.length == 0){ //se a fila estiver vazia então não há mais nodes para se ver na arvore      
                break
            }
       }
     
       return this.returnRootedTree(firstRoot,ArvoreComNo) 
    } 
    
    }

