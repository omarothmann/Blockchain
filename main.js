const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){  // parameter to be inside a block
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp +JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    
    createGenesisBlock(){
        return new Block(0, "01/01/2020", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }   

    isChainValid(){         // check if the chain is corrupted/broken (integrity of block)
        for(let i=1 ; i<this.chain.length ; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){  // check hash validity (match or not)
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){    // check if the block points to a correct block
                return false
            }
        }

        return true;
    }
}


let omarCoin = new Blockchain();
omarCoin.addBlock(new Block(1, "10/02/2020", { BTC_Transferred: 4}));
omarCoin.addBlock(new Block(2, "15/02/2020", { BTC_Transferred: 8}));
omarCoin.addBlock(new Block(2, "15/02/2020", { BTC_Transferred: 10}));


//console.log('Is this blockchain valid? Answer: ' + omarCoin.isChainValid());   // check block integrity

omarCoin.chain[1].data = { BTC_Transferred: 100 }           // try ubah data secara unauthorized
//omarCoin.chain[1].hash = omarCoin.chain[1].calculateHash(); // try calculate hash lain
//console.log('Is this blockchain valid? Answer: ' + omarCoin.isChainValid());



console.log(JSON.stringify(omarCoin, null, 4)); 