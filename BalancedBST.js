class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
class Tree {

    constructor(array) {
        this.arr = array;
        this.root = this.buildTree(this.arr);
    }

    prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }


    buildTree(arr, start = 0, end) {
        if (start > end) return null;

        let newArr = new Set(arr.sort((a, b) => a - b));
        newArr = Array.from(newArr);
        if (end == undefined) end = newArr.length - 1;

        let mid = Math.floor((start + end) / 2);
        let newNode = new Node(newArr[mid]);
        newNode.left = this.buildTree(newArr, start, mid - 1);

        newNode.right = this.buildTree(newArr, mid + 1, end);
        return newNode;
    }

    insert(val, node = this.root) {
        if (parseInt(val) < parseInt(node.data)) {
            if (node.left === null) {
                node.left = new Node(val);
                return;
            }

            this.insert(val, node.left);
        }
        if (parseInt(val) > parseInt(node.data)) {
            if (node.right === null) {
                node.right = new Node(val);
                return;
            }
            this.insert(val, node.right);
        }
    }

    findNextGreatest(node) {
        if (node.left === null) {
            return node;
        }
        return this.findNextGreatest(node.left);
    }

    remove(val, node = this.root) {
        if (val == node.data) {
            //Delete the root number;
            if (node.left != null && node.right != null) {
                let nextGreatest = this.findNextGreatest(node.right);
                this.remove(nextGreatest.data, node.right);
                let rightSide = node.right;
                let leftSide = node.left;
                let temp = nextGreatest;
                temp.left = leftSide;
                temp.right = rightSide;
                this.root = temp;
                return;
            }
        }
        if (node.left !== null) {
            if (parseInt(val) == parseInt(node.left.data)) {
                if (node.left.left != null && node.left.right != null) {

                    let nextGreatest = this.findNextGreatest(node.left.right);
                    let leftSide = node.left.left;
                    let temp = nextGreatest;
                    temp.left = leftSide;
                    node.left = temp;
                    return;
                }
                if (node.left.left === null) {
                    node.left = node.left.right;
                    return;
                }
                if (node.left.right == null) {
                    node.left = node.left.left;
                    return;
                }
            }
        }
        if (node.right !== null)
            if (parseInt(val) == parseInt(node.right.data)) {
                if (node.right.left != null && node.right.right != null) {
                    let nextGreatest = this.findNextGreatest(node.right.right);
                    let leftSide = node.right.left;
                    let temp = nextGreatest;
                    temp.left = leftSide;
                    node.right = temp;
                    return;
                }

                if (node.right.left === null) {
                    node.right = node.right.right;
                    return;
                }
                if (node.right.right === null) {
                    node.right = node.right.left;
                    return;
                }
            } else {
                if (node.left === null || node.right === null) return;
                else {
                    if (val < node.left.data) this.remove(val, node.left);

                    if (val > node.left.data && val < node.right.data)
                        this.remove(val, node.left);

                    if (val < node.right.data && val > node.left.data)
                        this.remove(val, node.right);

                    if (val > node.right.data) this.remove(val, node.right);
                }
            }
    }
    find(val, node = this.root) {

        if (node == null || node.data === val) return node;

        if (val < node.data) return this.find(val, node.left);

        if (val > node.data) return this.find(val, node.right);

    }
    levelOrder(callBack, node = this.root) {
        if (node == null) {
            return [];
        }

        let q = [];
        let arr = [];
        q.push(node);
        while (q.length !== 0) {
            for (let n in q) {
                let node = q.shift();
                arr.push(node.data);
                if (node.left)
                    q.push(node.left);
                if (node.right)
                    q.push(node.right);
            }
            arr.push()
        }
        if (callBack)
            return callBack(arr);

        return arr;

    }
    inorder(node = this.root, callBack) {
        let arr = [];
        if (node === null)
            return node;

        if (callBack) {
            this.inorder(node.left, callBack);
            callBack(node);
            this.inorder(node.right, callBack);
        }
        if (node !== null)
            return arr.concat(this.inorder(node.left), node.data, this.inorder(node.right)).filter((item, index) => item !== null);

    }
    preorder(node = this.root, callBack) {
        let arr = [];
        if (node === null)
            return node;

        if (callBack) {
            callBack(node);
            this.preorder(node.left, callBack);
            this.preorder(node.right, callBack);
        }
        if (node !== null)
            return arr.concat(node.data, this.preorder(node.left), this.preorder(node.right)).filter((item, index) => item !== null);

    }

    postorder(node = this.root, callBack) {
        let arr = [];
        if (node === null)
            return node;

        if (callBack) {
            this.postorder(node.left, callBack);
            this.postorder(node.right, callBack);
            callBack(node);
        }
        if (node !== null)
            return arr.concat(this.postorder(node.left), this.postorder(node.right), node.data).filter((item, index) => item !== null);

    }
    height(val, node = this.find(val), counter = 0) {
        
        if (node === null) return counter;

        if (!node.left && !node.right) return counter += 1;

        if (!node.left && node.right)
            return this.height(val, node.right, counter += 1)

        if (node.left && !node.right)
            return this.height(val, node.left, counter += 1)

        counter += 1
        let left = this.height(val, node.left, counter);
        let right = this.height(val, node.right, counter);
        return left > right ? left : right;
    }
    
    depth(val,node=this.root,counter=0){
        console.log(node,counter);
        let nodeToFind=this.find(val);
        
        if(node===null||node.data===nodeToFind.data)
            return counter;

            counter+=1;
            if(node.data>nodeToFind.data)
                return this.depth(val,node.left,counter);
            if(node.data<nodeToFind.data)
            return this.depth(val,node.right,counter);
        
    }


}

let array = [23, 43, 55, 87, 99, 1234, 6, 4, 3, 6, 8, 99];
let bst = new Tree(array);
bst.insert(42);
console.log(bst.root);
// bst.prettyPrint(bst.root);
// console.log("++++++++++++++++++++++++++++++++++++");




// bst.prettyPrint(bst.root);
console.log("++++++++++++++++++++++++++++++++++++");
// bst.prettyPrint(bst.root);
console.log("++++++++++++++++++++++++++++++++++++");
bst.insert(100);
bst.insert(102);
bst.insert(101);
bst.insert(104);
bst.insert(7);
bst.insert(15);
bst.insert(22);
bst.insert(14);
bst.insert(10);
bst.insert(9);

bst.prettyPrint(bst.root);
// let newN = bst.find(1234);
// console.log(newN, '<-value');
// bst.inorder(this.root, (item) => {
//     console.log(item);
// });
// console.log(bst.inorder());
// console.log("++++++++++++++++++++++++++++++++++++");

// bst.preorder(this.root, (item) => {
//     console.log(item);
// });
// console.log(bst.preorder());
// console.log("++++++++++++++++++++++++++++++++++++");

// bst.postorder(this.root, (item) => {
//     console.log(item);
// });
// console.log(bst.postorder());
// console.log("++++++++++++++++++++++++++++++++++++");
console.log(bst.height(23));
console.log(bst.depth(9));

// bst.remove();
// bst.prettyPrint(bst.root);
