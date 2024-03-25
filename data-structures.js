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
}

let test = [1, 3, 20, 4, 12, 9, 13, 60, 7]
const tree = new BinaryTree();
for (index of test) {
   console.log(index);
   tree.insert(index);
}



console.log(tree);
console.log(tree.find(3));
tree.remove(50);
tree.remove(20);
console.log(tree);



