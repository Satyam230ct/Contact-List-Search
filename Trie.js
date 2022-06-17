class TrieNode
{
    constructor(){
        this.children = Array(10).fill(null);
        this.parent = null;
    }
}

class ContactNode 
{
    constructor(name,number,parent)
    {
        this.name = name;
        this.number = number;
        this.parent = parent;
    }
}

class Trie {

    constructor()
    {
        this.root = new TrieNode();
        this.current = this.root;

        let init = [
            ["Simpy","143637"],
            ["Abhi","123456"],
            ["Shweta","400001"],
            ["Ranju","220225"],
            ["Gaurav","654321"],
            ["Chiyu","519210"]
        ];

        for(let i=0;i<init.length;i++){
            this.add(init[i][1],init[i][0],0);
        }
    }

    add(number, name, pos=0, node=this.root)
    {
        let curD=number[pos]-'0';
        if(pos==number.length-1)
        {
            node.children[curD] = new ContactNode(name, number, node);
            return;
        }

        if(node.children[curD]===null)
        {
            let newNode = new TrieNode();
            node.children[curD] = newNode;
            newNode.parent = node;
        }

        this.add(number, name, pos+1, node.children[curD]);
    }

    findAll(node)
    {
        // Contact Leaf node
        if(node===null)return;

        if(node instanceof ContactNode){
            this.res.push(node);
            return;
        }

        for(let i=0;i<10;i++){
            this.findAll(node.children[i]);
        }
    }

    findNext(step)
    {
        if(step==-1)
        {
            this.current = this.current.parent;
        }
        else if(step!=-2)
        {
            if(this.current.children[step-'0']==null)
            {
                let newNode = new TrieNode();
                this.current.children[step-'0'] = newNode;
                newNode.parent = this.current;
            }
        }

        this.res=[];
        this.findAll(this.current);
        return this.res;
    }

    del(number, pos= 0, node= this.root)
    {
        if(pos===number.length-1){
            node.children[number[pos]-'0'] = null;
            return;
        }
        
        if(node.children[number[pos]-'0']===null){
            return; // Means this number not present in our contact list
        }
        this.del(number, pos+1, node.children[number[pos]-'0']);
    }
}

export { Trie };