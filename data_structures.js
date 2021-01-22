// TODO: turn to heap, make more efficient
class PriorityQueue {
    constructor() {
        this.data = new Array();
    }

    pop() {
        if (this.data.length == 0) {
            return null;
        }

        let smallest = Infinity;
        let smallestIndex = 0;
        
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i][1] < smallest) {
                smallest = this.data[i][1];
                smallestIndex = i;
            }
        }

        const smallestElement = this.data[smallestIndex][0];
        this.data.splice(smallestIndex, 1);

        return smallestElement;
    }

    push(item, value) {
        const repr = item.toString();

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i][0].toString() == repr) {
                this.data[i][1] = value;
                return this.data[i];
            }
        }
        this.data.push([item, value]);
    }

    length() {
        return this.data.length;
    }

    find(item) {
        if (this.data.length == 0) {
            return -1;
        }

        // TODO: typechecking and all that nonsense
        const repr = item.toString();
        
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i][0].toString() == repr) {
                return i;
            }
        }

        return -1;
    }

    getValue(index) {
        if ( (this.data.length == 0) || (index > this.data.length - 1) ) {
            return -1;
            // better to throw
        }

        return this.data[index][1];
    }
}



/* thing = new PriorityQueue();
thing.push("hello", 6);
thing.push("nihao", 4);
thing.push("yes", 5);
console.log(thing.length());
console.log(thing.find("nihao"));
console.log(thing.getValue(1));
console.log(thing.pop()); */