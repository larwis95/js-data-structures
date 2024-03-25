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

console.log(tree);
console.log(tree.find(3));
console.log(tree.find(7));
console.log(tree);

console.table(tree.sort('inorder'))
console.table(tree.sort('postorder'))
console.table(tree.sort('preorder'))



