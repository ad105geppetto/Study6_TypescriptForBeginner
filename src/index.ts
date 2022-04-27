// 인터페이스를 쓴다면 ts에서는 좀더 안전하다.
// 그러나 리액트나 노드, 익스프레스 등을 사용한다면 class가 필요할 수 있다.

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number){
        this.hash = hash;
        this.index = index;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock:Block = new Block(0, "20202020202", "", "Hello", 123456);

let blockchain: [Block] = [genesisBlock]
console.log(genesisBlock)
export {};