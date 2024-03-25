class Node {
   constructor(data) {
      this.data = data;
      this.right = null;
      this.left = null;
   }
}


class BinaryTree {
   constructor()
   {
      this.root = null;
   }

   insert(data) 
   {
      let newNode = new Node(data);

      if (this.root === null)
      {
         this.root = newNode;
         return this;
      }

      let current = this.root;
      while(current) 
      {
         if (data === current.data) return undefined;
         if (data < current.data)
         {
            if (current.left === null)
            {
               current.left = newNode;
               return this;
            }
            current = current.left;
         }
         else 
         {
            if (current.right === null)
            {
               current.right = newNode;
               return this;
            }
            current = current.right;
         }
      }

   }

   find(value)
   {
      if (!this.root) return false;

      let current = this.root;
      let found = false;
      while (current && !found)
      {
         if (value < current.data)
         {
            current = current.left;
         }
         else if (value > current.data)
         {
            current = current.right;
         }
         else
         {
            found = current;
         }
      }
      if (!found) return undefined;
      return found;
   }

   remove(value)
   {
      this.root = this.removeNode(this.root, value);
   }

   removeNode(current, value)
   {
      if (current === null) return current;

      if (value === current.data) 
      {
         if (current.left === null && current.right === null)
         {
            return null;
         }
         else if (current.left === null)
         {
            return current.right;
         }
         else if (current.right === null)
         {
            return current.left;
         }
         else
         {
            let temp = this.smallestNode(current.right);
            console.log(temp);
            current.data = temp.data;
            current.right = this.removeNode(current.right, temp.data);
            return current;
         }
      }
      else if (value < current.data)
      {
         current.left = this.removeNode(current.left, value);
         return current;
      }
      else
      {
         current.right = this.removeNode(current.right, value);
         return current;
      }
   }

   smallestNode(node) 
   {
      debugger;
      while (!node.left === null)
      {
         node = node.left;
      }
      return node;
   }

   sort(options) 
   {
      if (options === 'inorder') 
      {
         return this.inorder();
      } 
      if (options === 'postorder')
      {
         return this.postorder();
      }
      if (options === 'preorder')
      {
         return this.preorder();
      }
   }

   inorder()
   {
      let current = this.root;
      const stack =[];
      const nodes = []
      while (stack.length || current)
      {
         if (current) 
         {
            stack.push(current);
            current = current.left
         }
         else 
         {
            current = stack.pop();
            nodes.push(current.data)
            current = current.right;
         }
      }
      return nodes;
   }

   postorder()
   {
      let current = this.root;
      const nodes = [];
      const stack = [];
      let last = null;

      while (stack.length || current)
      {
         if (current) 
         {
            stack.push(current);
            current = current.left;
         }
         else
         {
            let peek = stack[stack.length-1];
            if (peek.right && last !== peek.right)
            {
               current = peek.right;
            }
            else
            {
               last = stack.pop();
               nodes.push(last.data);
            }
         }
      }
      return nodes
   }

   preorder() {
      let current = this.root;
      const stack = [];
      const nodes = [];
      stack.push(current);
      debugger;
      while (stack.length || current !== undefined)
      {
         current = stack.pop();
         if (current) 
         {
            nodes.push(current.data); 
         
            if (current.right)
            {
               stack.push(current.right);
            }
            if (current.left)
            {
               stack.push(current.left);
            }
         }
      }
      return nodes;
   }
}


let test = [5, 3, 20, 4, 12, 9, 13, 60, 7]
const tree = new BinaryTree();
for (index of test) {
   console.log(index);
   tree.insert(index);
}

const printTree = function(root) {
   //first find depth of tree
       let depth = 0
       const findDepth = (node, level) => {
           depth = Math.max(depth, level);
           if (node.left) {
               findDepth(node.left, level + 1)
           }
           if (node.right) {
               findDepth(node.right, level + 1)
           }
       }
       findDepth(root, 1);
       let width = 1 + ((depth - 1) * 2)
   //create array of arrays filled with blanks that match height and width
   // of given tree
      let output = Array.from({ length: depth }, _ => Array.from({ length: width }).fill(''));
      let mid = Math.floor(width / 2);
   //do DFS through tree and change output array based on position in tree
       const populate = (node, level, hori) => {
           output[level][hori] = node.data;
           if (node.left) {
               populate(node.left, level + 1, hori - 1);
           }
           if (node.right) {
               populate(node.right, level + 1, hori + 1);
           }
       }
       populate(root, 0, mid);
       return output;
   };

console.log(printTree(tree.root));

   


console.log(tree);
console.log(tree.find(3));
console.log(tree.find(7));
console.log(tree);

console.log(tree.sort('inorder'))
console.log(tree.sort('postorder'))
console.log(tree.sort('preorder'))



