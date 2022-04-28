// 인터페이스를 쓴다면 ts에서는 좀더 안전하다.
// 그러나 리액트나 노드, 익스프레스 등을 사용한다면 class가 필요할 수 있다.
import * as CryptoJS from "crypto-js";

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    static calculateBlockHash = (index:number, previousHash:string, timestamp:number, data:string): string => {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    }

    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number){
        this.hash = hash;
        this.index = index;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock:Block = new Block(0, "20202020202", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock]

const getBlockchain = (): Block[] => {
    return blockchain
}

const getLatestBlock = () : Block => {
    return blockchain[blockchain.length - 1]
}

const getNewTimeStamp = () : number => {
    return Math.round(new Date().getTime() / 1000)
}

export {};