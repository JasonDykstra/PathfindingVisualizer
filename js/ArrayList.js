class ArrayList{
    constructor(){
        this.list = [];
    }

    get(index){
        return this.list[index];
    }

    add(index, value){
        if(typeof value !== "undefined"){
            this.list[index] = value;
        } else {
            //if only adding value and no specified index, use
            //first value passed into function as value to be added
            this.list.push(index);
        }
    }

    remove(index){
        this.list.splice(index, 1);
    }

    size(){
        return this.list.length;
    }

    print(){
        var output = "Array contents: ";
        for(var i = 0; i < this.list.length; ++i){
            output += this.list[i] + " ";
        }
        console.log(output);
    }


}