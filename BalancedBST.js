class Node{
    constructor(root){
        this.root=root;
        this.start=start;
        this.right=right;
        
    }
}
class Tree{
    constructor(arr){
        this.arr=arr;
    }
    root=this.buildTree();
    buildTree(){
        let newArr= this.arr;
        if(this.arr){
            newArr=new Set(this.arr.sort());
        }
        console.log(newArr);

        
    }

}
let array=[2,5,3,4,4,5,6,8,2];
let bst=new Tree(array);
bst.buildTree();