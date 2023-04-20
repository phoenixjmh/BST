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
    if (node === null)return;
    
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
   
    if (node.left !== null)this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    
  };

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
      if (!node.left) {
        node.left = new Node(val);
        return;
      }
      this.insert(val, node.left);
    }
    if (parseInt(val) > parseInt(node.data)) {
      if (!node.right) {
        node.right = new Node(val);
        return;
      }
      this.insert(val, node.right);
    }
  }

  findNextGreatest(node) {
    if (!node.left) return node;
    
    return this.findNextGreatest(node.left);
  }

  remove(val, node = this.root) {
    if (val == node.data) {
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
        if (!node.left.left) {
          node.left = node.left.right;
          return;
        }
        if (!node.left.right) {
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
      }
       else {
        if (node.left !== null) {
          if (val < node.left.data) this.remove(val, node.left);

          if (val > node.left.data && val < node.right.data)
            this.remove(val, node.left);
        }
        if (node.right !== null&&node.left!==null) {
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
        arr.push(node);
        if (node.left) q.push(node.left);
        if (node.right) q.push(node.right);
      }
    }
    if (callBack) return callBack(arr);

    return arr;
  }
  inorder(node = this.root, callBack) {
    let arr = [];
    if (node === null) return node;

    if (callBack) {
      this.inorder(node.left, callBack);
      callBack(node);
      this.inorder(node.right, callBack);
    }
    if (node !== null)
      return arr
        .concat(this.inorder(node.left), node.data, this.inorder(node.right))
        .filter((item, index) => item !== null);
  }
  preorder(node = this.root, callBack) {
    let arr = [];
    if (node === null) return node;

    if (callBack) {
      callBack(node);
      this.preorder(node.left, callBack);
      this.preorder(node.right, callBack);
    }
    if (node !== null)
      return arr
        .concat(node.data, this.preorder(node.left), this.preorder(node.right))
        .filter((item, index) => item !== null);
  }

  postorder(node = this.root, callBack) {
    let arr = [];
    if (node === null) return node;

    if (callBack) {
      this.postorder(node.left, callBack);
      this.postorder(node.right, callBack);
      callBack(node);
    }
    if (node !== null)
      return arr
        .concat(
          this.postorder(node.left),
          this.postorder(node.right),
          node.data
        )
        .filter((item, index) => item !== null);
  }
  height(val, node = this.find(val), counter = 0) {
    if (node === null) return counter;

    if (!node.left && !node.right) return (counter += 1);

    if (!node.left && node.right)
      return this.height(val, node.right, (counter += 1));

    if (node.left && !node.right)
      return this.height(val, node.left, (counter += 1));

    counter += 1;
    let left = this.height(val, node.left, counter);
    let right = this.height(val, node.right, counter);
    return left > right ? left : right;
  }

  depth(val, node = this.root, counter = 0) {
    console.log(node, counter);
    let nodeToFind = this.find(val);
    if (!nodeToFind) return nodeToFind;

    if (node === null || node.data === nodeToFind.data) return counter;

    counter += 1;
    if (node.data > nodeToFind.data) return this.depth(val, node.left, counter);
    if (node.data < nodeToFind.data)
      return this.depth(val, node.right, counter);
  }
  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }
    if (!node.right && !node.left) {
      return true;
    }

    if (!node.left && node.right) return this.isBalanced(node.right);

    if (!node.right && node.left) return this.isBalanced(node.left);

    let leftHeight = this.height(node.left.data);
    let rightHeight = this.height(node.right.data);
    let dif = leftHeight - rightHeight;
    if (dif > 1 || dif < -1) return false;

    if (leftHeight) return this.isBalanced(node.left);

    if (rightHeight) return this.isBalanced(node.right);
  }

  rebalance() {
    let balancedArr = this.preorder();
    this.root = this.buildTree(balancedArr);
  }
}

function Driver() {
  let size = 10;
  let array = Array.from({ length: size }, () =>
    Math.floor(Math.random() * 100)
  );
  console.log(array);

  let bst = new Tree(array);
  console.log(bst.isBalanced());
  bst.prettyPrint(bst.root);
  bst.preorder(bst.root, (item) => console.log("PreOrder: ", item));
  console.log("______________________________________");
  bst.inorder(bst.root, (item) => console.log("InOrder: ", item));
  console.log("______________________________________");
  bst.postorder(bst.root, (item) => console.log("PostOrder: ", item));

  bst.insert(100);
  bst.insert(101);
  bst.insert(102);
  bst.insert(107);
  console.log("______________________________________");
  bst.prettyPrint(bst.root);
  console.log("Is tree balanced", bst.isBalanced());
  bst.rebalance();
  console.log("______________________________________");
  bst.prettyPrint(bst.root);
  console.log("Is tree balanced", bst.isBalanced());
  bst.levelOrder((item) => item.forEach((n) => console.log("Level: ", n)));
  console.log("______________________________________");
  bst.preorder(bst.root, (item) => console.log("PreOrder: ", item));
  console.log("______________________________________");
  bst.inorder(bst.root, (item) => console.log("InOrder: ", item));
  console.log("______________________________________");
  bst.postorder(bst.root, (item) => console.log("PostOrder: ", item));
}
Driver();
