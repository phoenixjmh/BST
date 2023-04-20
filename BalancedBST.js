class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
function Tree(arr) {
  this.arr = arr;

  function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  function buildTree(arr, start = 0, end) {
    if (start > end) return null;

    let newArr = new Set(arr.sort((a, b) => a - b));
    newArr = Array.from(newArr);
    if (end == undefined) end = newArr.length - 1;

    let mid = Math.floor((start + end) / 2);
    let newNode = new Node(newArr[mid]);
    newNode.left = buildTree(newArr, start, mid - 1);

    newNode.right = buildTree(newArr, mid + 1, end);
    return newNode;
  }
  root = buildTree(this.arr);

  function insert(val, node = root) {
    if (parseInt(val) < parseInt(node.data)) {
      if (node.left === null) {
        node.left = new Node(val);
        return;
      }

      insert(val, node.left);
    }
    if (parseInt(val) > parseInt(node.data)) {
      if (node.right === null) {
        node.right = new Node(val);
        return;
      }
      insert(val, node.right);
    }
  }

  function findNextGreatest(node) {
    if (node.left === null) {
      return node;
    }
    return findNextGreatest(node.left);
  }

  function remove(val, node = root) {
    if (val == node.data) {
      //Delete the root number;
      if (node.left != null && node.right != null) {
        let nextGreatest = findNextGreatest(node.right);
        this.remove(nextGreatest.data, node.right);
        let rightSide = node.right;
        let leftSide = node.left;
        let temp = nextGreatest;
        temp.left = leftSide;
        temp.right = rightSide;
        this.root = temp;
        root = temp;
        return;
      }
    }
    if (node.left !== null) {
      if (parseInt(val) == parseInt(node.left.data)) {
        if (node.left.left != null && node.left.right != null) {
         
          let nextGreatest = findNextGreatest(node.left.right);
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
          let nextGreatest = findNextGreatest(node.right.right);
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
          if (val < node.left.data) remove(val, node.left);

          if (val > node.left.data && val < node.right.data)
            remove(val, node.left);

          if (val < node.right.data && val > node.left.data)
            remove(val, node.right);

          if (val > node.right.data) remove(val, node.right);
        }
      }
  }
  function find(val,node=root){
    // if(val.left===null)
    // return 'not in this branch';
    // if(val.right===null)
    // return 'not in this branch';
    if(val===node.data){
        return node;
    }
    if(node.left.data===val){
        return node.left;
    }
    if(node.right.data===val){
        return node.right;
    }
    else if(node.left!=null){
        return find(node.left);
    }
    else if(node.right!=null){
        return find(node.right);
    }
    
  }

  return { root, buildTree, prettyPrint, insert, remove, findNextGreatest, find };
}

let array = [23, 43, 55, 87, 99, 1234, 6, 4, 3, 6, 8, 99];
let bst = new Tree(array);
bst.insert(42);
bst.prettyPrint(bst.root);
console.log("++++++++++++++++++++++++++++++++++++");

bst.remove(23);

bst.prettyPrint(bst.root);
console.log("++++++++++++++++++++++++++++++++++++");

bst.prettyPrint(bst.root);
console.log("++++++++++++++++++++++++++++++++++++");
console.log(bst.root);
bst.remove(42);
bst.prettyPrint(bst.root);
bst.remove(99);
bst.remove(4);
bst.remove(8);
console.log("++++++++++++++++++++++++++++++++++++");

bst.prettyPrint(bst.root);
let newN=bst.find(6)
console.log(newN,'found it!');

// bst.remove();
// bst.prettyPrint(bst.root);
