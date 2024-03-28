class Node {
   constructor(data) {
      this.data = data;
      this.right = null;
      this.left = null;
      this.height = 0;
   }
}

class BinaryTree {
   constructor()
   {
      this.root = null;
      this.length = 0;
   }

   height(node) 
   {
      if (!node) return 0;
      return node.height;
   }

   balance(node) 
   {
      if (!node) return 0;
      return this.height(node.left) - this.height(node.right);

   }

   rotateRight(node) 
   {
      const left = node.left;
      const rightOfLeft = left.right;

      left.right = node;
      node.left = rightOfLeft;

      node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
      left.height = Math.max(this.height(left.left), this.height(left.right)) + 1;

      return left;
   }

   rotateLeft(node) 
   {
      const right = node.right;
      const leftOfRight = right.left;

      right.left = node;
      node.right = leftOfRight;

      node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
      right.height = Math.max(this.height(right.left), this.height(right.right)) + 1;

      return right;
   }

   insert(data) 
   {
      this.root = this.insertNode(this.root, data);
      if (this.root) this.length = this.length + 1;
      
   }

   insertNode(node, data) 
   {
      if (!node) 
      {
         return new Node(data);
      }

      if (data < node.data)
      {
         node.left = this.insertNode(node.left, data);
      }
      else if (data > node.data)
      {
         node.right = this.insertNode(node.right, data);
      }
      else
      {
         return node;
      }
      
      node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
      const balance = this.balance(node);

      if (balance > 1 && data < node.left.data)
      {
         return this.rotateRight(node);
      }

      if (balance > 1 && data > node.left.data)
      {
         return this.rotateRight(node);
      }

      if (balance < -1 && data > node.right.data)
      {
         return this.rotateLeft(node);
      }

      if (balance < -1 && data < node.right.data)
      {
         return this.rotateLeft(node);
      }

      return node;
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
      if (this.root) this.length = this.length - 1;
      
   }

   removeNode(current, value)
   {
      if (current === null) return current;

      if (value < current.data)
      {
         current.left = this.removeNode(current.left, value);
      }
      else if (value > current.data)
      {
         current.right = this.removeNode(current.right, value);
      }
      else
      {
         if (!current.left && !current.right) 
         {
            current = null;
         }
         else if (!current.left) 
         {
            current = current.right;
         }
         else if (!current.right)
         {
            current = current.left;
         }
         else
         {
            const smallNode = this.smallestNode(current.right);
            current.data = smallNode.data;
            current.right = this.removeNode(current.right, smallNode.data);
         }
      }

      if (!current) return null;

      current.height = Math.max(this.height(current.left), this.height(current.right) + 1);

      const balance = this.balance(current);

      if (balance > 1 && this.balance(current.left) >= 0)
      {
         return this.rotateRight(current);
      }

      if (balance > 1 && this.balance(current.left) < 0)
      {
         current.left = this.rotateLeft(current.left);
         return this.rotateRight(current);
      }

      if (balance < -1 && this.balance(current.right) < 0)
      {
         return this.rotateLeft(current);
      }

      if (balance < -1 && this.balance(current.right) > 0)
      {
         current.right = this.rotateRight(current.right);
         return this.rotateLeft(current);
      }

      return current;
   }

   smallestNode(node) 
   {
      while (!node.left === null)
      {
         node = node.left;
      }
      return node;
   }

   maxDepth(node)
   {
      return !node ? 0 : 1 + Math.max(this.maxDepth(node.left), this.maxDepth(node.right));
   }

   minDepth(node)
   {
      if (node === null) 
      {
         return 0;
      }
      if (node.left && node.right)
      {
         return 1 + Math.min(this.minDepth(node.left), this.minDepth(node.right));
      }
      else if (node.left)
      {
         return 1 + Math.min(this.minDepth(node.left));
      }
      else
      {
         return 1 + Math.min(this.minDepth(node.right));
      }

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
      if (options === 'leaf')
      {
         return this.leaf();
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

   preorder() 
   {
      let current = this.root;
      const stack = [];
      const nodes = [];
      stack.push(current);
      while (stack.length || current)
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

   leaf() 
   {
      let current = this.root
      const nodes = [];

      if (!current) return;

      const getLeafs = (node) => 
      {
         if (!node.left && !node.right)
         {
            nodes.push(node.data);
         }
         if (node.left)
         {
            getLeafs(node.left);
         }
         if (node.right)
         {
            getLeafs(node.right);
         }
      }
      getLeafs(current);
      return nodes;
   }

   isValid() 
   {
      const validateNode = (node, min, max) => {
         if (!node) return true;
         if (node.data < min || node.data > max) return false;
            return (
            validateNode(node.left, min, node.data - 1) &&
            validateNode(node.right, node.data + 1, max)
            );
         };

      return validateNode(this.root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
   }
   
}


const randomUnique = (range, count) => {
   let nums = new Set();
   while (nums.size < count) {
       nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
   }
   return [...nums];
}






