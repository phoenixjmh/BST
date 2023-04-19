class Node{
    constructor(data){
        this.data=data;
        this.left=null;
        this.right=null;
        
    }
}
function Tree(arr){
    
    this.arr=arr;
  
    
    
    function buildTree(arr,start=0,end){
        
        if (start>end) return null;
            
            let newArr=new Set(arr.sort((a,b)=>a-b));
            newArr=Array.from(newArr);
            if(end==undefined)
            end=newArr.length-1;

            
                
               let mid=Math.floor((start+end)/2);
                let newNode=new Node(newArr[mid]);
                newNode.left=buildTree(newArr,start,mid-1);

                newNode.right=buildTree(newArr,mid+1,end);
                return newNode;

        }
    root=buildTree(this.arr);


    function insert(val,node=root){
       if(parseInt(val)<parseInt(node.data)){
                if(node.left===null){
                    node.left=new Node(val);
                    return;
                }
          
               insert(val,node.left);
           

       }
       if(parseInt(val)>parseInt(node.data)){
        if(node.right===null){
            node.right=new Node(val);
            return;
        }
        insert(val,node.right);
       }
       

    }

    function findNextGreatest(node){
        if(node.left===null){
            return node;
        }
        findNextGreatest(node.left);
    }
   
    function remove(val,node=root){
        console.log('called',node);
        if(val==node.data){
            console.log('Found root');
            if(node.left!=null&&node.right!=null){
                //recursively put in the next greatest number
                //meaning recurse until left==null, then replace that number with the value
                
                let nextGreatest=findNextGreatest(node.right);
                let leftSide=node.left;
                let temp=nextGreatest
                temp.right=nextGreatest;
                temp.left=leftSide;
                

                node=temp;
                return;
            }
        }
        if(node.left!==null){

            if(parseInt(val)==parseInt(node.left.data)){
                console.log('Found it in left of',node);
                if(node.left.left!=null&&node.left.right!=null){
                    //recursively put in the next greatest number
                    //meaning recurse until left==null, then replace that number with the value
                    
                    let nextGreatest=findNextGreatest(node.left.right);
                    let leftSide=node.left.left;
                    console.log(leftSide);
                    node.left=nextGreatest;
                    node.left.left=leftSide;
                }
                if(node.left.left===null){
                    node.left=node.left.right;
                    return;
                }
                if(node.left.right==null){
                    node.left=node.left.left;
                    return;
                }
            }
        }
        if(node.right!==null)
        if(parseInt(val)==parseInt(node.right.data)){
            console.log('Found it in right of',node);
             if(node.right.left!=null&&node.right.right!=null){
                    //recursively put in the next greatest number
                    //meaning recurse until left==null, then replace that number with the value
                    
                    let nextGreatest=findNextGreatest(node.right.right);
                    let leftSide=node.right.left;
                    console.log(leftSide);
                    node.right=nextGreatest;
                    node.right.left=leftSide;
                }
            
            if(node.right.left===null){
                node.right=node.right.right;
                return;
            }
            if(node.right.right===null){
                node.right=node.right.left;
                return;
            }
        }
        else{
            
            if(node.left===null||node.right===null){
                console.log('nothing left');
            }
            else{
                if(val<node.left.data){
                     remove(val,node.left)
                 }
                 if(val>node.left.data&&val<node.right.data){
                     remove(val,node.left)
                 }
                 if(val<node.right.data&&val>node.left.data){
                     remove(val,node.right);
                 }
                 if(val>node.right.data){
                     remove(val,node.right);
                 }

            }

        }


    }



    function prettyPrint(node, prefix = '', isLeft = true){
        if (node === null) {
           return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
      }
      



       return {root,buildTree,prettyPrint,insert,remove} 

        
    }


let array=[23,43,55,87,99,1234,6,4,3,6,8,99];
let bst=new Tree(array);
bst.prettyPrint(bst.root);

bst.remove(43);
bst.prettyPrint(bst.root);
bst.remove(4);
bst.remove(87);
bst.prettyPrint(bst.root);
bst.remove(23);
bst.prettyPrint(bst.root);


// bst.remove();
// bst.prettyPrint(bst.root);
