class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    insert(key, value) {
        // If the tree is empty then this key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
        else if (key < this.key) {
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
            else {
                this.left.insert(key, value);
            }
        }
        // Similarly, if the new key is greater than the node's key 
           //then you do the same thing, but on the right-hand side */
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }
    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }
    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

//O(n)

//adds all nodes of tree recursively 

function heightOfBST(bst) {
    let leftHeight = 0;
    let rightHeight = 0;
    if (!bst) {
      return 0;
    } else {
      leftHeight = heightOfBST(bst.left);
      rightHeight = heightOfBST(bst.right);
      if (leftHeight > rightHeight) {
        return leftHeight + 1;
      } else {
        return rightHeight + 1;
      }
    }
  }

function isBST(bst) {
    if(!bst.key) {
        return false
    }
    if(bst.left) {
        if(bst.left.key > bst.key) {
            return false;
        } else {
            return isBST(bst.left)
        }
    }
    if(bst.right) {
        if(bst.right.key < bst.key) {
            return false;
        } else {
            return isBST(bst.right)
        }
    }
    if(bst.right && bst.left) {
        isBST(bst.right)
        isBST(bst.left)
    }
    if(!bst.right && !bst.left) {
        return true;
    }
}

function thirdLargest(tree) {
    const height = heightOfBST(tree)
    if(height < 2) {
        return null
    } else if (height < 3) {
        if(tree.left && tree.right) {
            return tree.left.value
        } else return null     
    } else if (height > 3) {
        return thirdLargest(tree.right)
    } else return tree.key
}

function balanced(tree) {
    if(!tree) return false;
    if(!tree.right && !tree.left)
    if(Math.abs(heightOfBST(tree.right) - heightOfBST(tree.left)) > 1)
    return false;
    return true
}

// function identicalBST(arr1, arr2) {
//     if(arr1.length !== arr2.length || arr1[0] !== arr2[0])
//     return false
//     if(arr1.length === 0 || arr2.length === 0)
//     return true 

//    const higher1 = [];
//    const higher2 = [];
//    const lower1 = [];
//    const lower2 = [];

//    for(let i = 1; i < arr1.length; i++) {
//        if(arr1[i] > arr1[0]) {
//        higher1.push(arr1[i])
//    } else {
//        lower1.push(arr1[i])
//    }
// }
//     for(let i = 1; arr2.length; i++) {
//         if(arr2[i] > arr2[0]) {
//         higher2.push(arr2[i])
//     } else {
//         lower2.push(arr2[i])
//     }
// }
// return (higher1, higher2) && (lower1, lower2)
// ;
// }
// const arr1 = [3, 5, 4, 6, 1, 0, 2]
// const arr2 = [3, 1, 5, 2, 4, 6, 0]
// console.log(identicalBST(arr1, arr2 ))

    function main() {
        const BST = new BinarySearchTree();
        BST.insert(3, 3)
        BST.insert(1, 1)
        BST.insert(4, 4)
        BST.insert(6, 6)
        BST.insert(9, 9)
        BST.insert(2, 2)
        BST.insert(5, 5)
        BST.insert(7, 7)
        // BST.insert('E', 'E')
        // BST.insert('A', 'A')
        // BST.insert('S', 'S')
        // BST.insert('Y', 'Y')
        // BST.insert('Q', 'Q')
        // BST.insert('U', 'U')
        // BST.insert('E', 'E')
        // BST.insert('S', 'S')
        // BST.insert('T', 'T')
        // BST.insert('I', 'I')
        // BST.insert('O', 'O')
        // BST.insert('N', 'N')

console.log(heightOfBST(BST))
console.log(isBST(BST))
console.log(thirdLargest(BST))
console.log(balanced(BST))

        console.log(BST)
    }

    main()