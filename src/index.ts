// 인터페이스를 쓴다면 ts에서는 좀더 안전하다.
// 그러나 리액트나 노드, 익스프레스 등을 사용한다면 class가 필요할 수 있다.
import * as CryptoJS from "crypto-js";

class Block {
    static calculateBlockHash = (
        index: number,
        previousHash: string,
        timestamp: number,
        data: string
    ): string =>
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string"

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        this.hash = hash;
        this.index = index;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, "20202020202", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock]

const getBlockchain = (): Block[] => blockchain

const getLatestBlock = (): Block => blockchain[blockchain.length - 1]

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000)

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimeStamp,
        data
    );
    const newBlock: Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimeStamp
    );

    addBlock(newBlock);
    return newBlock;
}

const getHashforBlock = (aBlock: Block): string =>
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data
    )

const isBlockValid = (candidateBlcok: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlcok)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlcok.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlcok.previousHash) {
        return false;
    } else if (getHashforBlock(candidateBlcok) !== candidateBlcok.hash) {
        return false;
    } else {
        return true;
    }
}

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock)
    }
}

createNewBlock("second Blcok")
createNewBlock("third Blcok")
createNewBlock("fourth Blcok")

console.log(blockchain)
export { };