class NeuralNet {

    iNodes;hNodes; oNodes; hLayers;
    weights = [];

    constructor(input, hidden, output, hiddenLayers) {
        this.iNodes = input;
        this.hNodes = hidden;
        this.oNodes = output;
        this.hLayers = hiddenLayers;

        this.weights = [];
        this.weights[0] = new Matrix(this.hNodes, this.iNodes+1);
        for(let i=1; i<this.hLayers; i++) {
            this.weights[i] = new Matrix(this.hNodes,this.hNodes+1);
        }
        this.weights[this.weights.length] = new Matrix(this.oNodes,this.hNodes+1);

        for(let w in this.weights) {
            // console.log(w)
            this.weights[w].randomize();
        }

    }

    mutate(mr) {
        for(let w in this.weights) {
            this.weights[w].mutate(mr);
        }
    }

    output(inputsArr) {
        let inputs = this.weights[0].singleColumnMatrixFromArray(inputsArr);

        let curr_bias = inputs.addBias();

        for(let i=0; i<this.hLayers; i++) {
            let hidden_ip = this.weights[i].dot(curr_bias);
            let hidden_op = hidden_ip.activate();
            curr_bias = hidden_op.addBias();
        }

        let output_ip = this.weights[this.weights.length-1].dot(curr_bias);
        let output = output_ip.activate();
        // console.log(output)

        return output.toArray();
    }

    crossover(partner) {
        let child = new NeuralNet(this.iNodes,this.hNodes,this.oNodes,this.hLayers);
        for(let i=0; i<this.weights.length; i++) {
            child.weights[i] = this.weights[i].crossover(partner.weights[i]);
        }
        return child;
    }

    clone() {
        let clone = new NeuralNet(this.iNodes,this.hNodes,this.oNodes,this.hLayers);
        for(let i=0; i<this.weights.length; i++) {
            clone.weights[i] = this.weights[i].clone();
        }

        return clone;
    }

    load(weight) {
        for(let i=0; i<this.weights.length; i++) {
            this.weights[i] = weight[i];
        }
    }

    pull() {
        let model = this.weights.clone();
        return model;
    }

    show(x, y, w, h, vision, decision) {
        let space = 5;
        let nSize = (h - (space*(this.iNodes-2))) / this.iNodes;
        let nSpace = (w - (this.weights.length*nSize)) / this.weights.length;
        let hBuff = (h - (space*(this.hNodes-1)) - (nSize*this.hNodes))/2;
        let oBuff = (h - (space*(this.oNodes-1)) - (nSize*this.oNodes))/2;

        let maxIndex = 0;
        for(let i = 1; i < decision.length; i++) {
            if(decision[i] > decision[maxIndex]) {
                maxIndex = i;
            }
        }

        let lc = 0;  //Layer Count

        //DRAW NODES
        for(let i = 0; i < this.iNodes; i++) {  //DRAW INPUTS
            if(vision[i] !== 0) {
                fill("#b2dfdb");
            } else {
                fill("#0CC3A7");
            }
            stroke(0);
            ellipseMode(CORNER);
            ellipse(x,y+(i*(nSize+space)),nSize,nSize);
            textSize(nSize/2);
            textAlign(CENTER,CENTER);
            fill(0);
            text(i,x+(nSize/2),y+(nSize/2)+(i*(nSize+space)));
        }

        lc++;

        for(let a = 0; a < this.hLayers; a++) {
            for(let i = 0; i < this.hNodes; i++) {  //DRAW HIDDEN
                fill("#ffb74d");
                stroke(0);
                ellipseMode(CORNER);
                ellipse(x+(lc*nSize)+(lc*nSpace),y+hBuff+(i*(nSize+space)),nSize,nSize);
            }
            lc++;
        }

        for(let i = 0; i < this.oNodes; i++) {  //DRAW OUTPUTS
            if(i === maxIndex) {
                fill("#b2dfdb");
            } else {
                fill("#21B1FF");
            }
            stroke(0);
            ellipseMode(CORNER);
            ellipse(x+(lc*nSpace)+(lc*nSize),y+oBuff+(i*(nSize+space)),nSize,nSize);
        }

        lc = 1;

        //DRAW WEIGHTS
        for(let i = 0; i < this.weights[0].rows; i++) {  //INPUT TO HIDDEN
            for(let j = 0; j < this.weights[0].cols-1; j++) {
                if(this.weights[0].matrix[i][j] < 0) {
                    stroke("#f06292");
                } else {
                    stroke("#64b5f6");
                }
                line(x+nSize,y+(nSize/2)+(j*(space+nSize)),x+nSize+nSpace,y+hBuff+(nSize/2)+(i*(space+nSize)));
            }
        }

        lc++;

        for(let a = 1; a < this.hLayers; a++) {
            for(let i = 0; i < this.weights[a].rows; i++) {  //HIDDEN TO HIDDEN
                for(let j = 0; j < this.weights[a].cols-1; j++) {
                    if(this.weights[a].matrix[i][j] < 0) {
                        stroke("#f06292");
                    } else {
                        stroke("#64b5f6");
                    }
                    line(x+(lc*nSize)+((lc-1)*nSpace),y+hBuff+(nSize/2)+(j*(space+nSize)),x+(lc*nSize)+(lc*nSpace),y+hBuff+(nSize/2)+(i*(space+nSize)));
                }
            }
            lc++;
        }

        for(let i = 0; i < this.weights[this.weights.length-1].rows; i++) {  //HIDDEN TO OUTPUT
            for(let j = 0; j < this.weights[this.weights.length-1].cols-1; j++) {
                if(this.weights[this.weights.length-1].matrix[i][j] < 0) {
                    stroke("#f06292");
                } else {
                    stroke("#64b5f6");
                }
                line(x+(lc*nSize)+((lc-1)*nSpace),y+hBuff+(nSize/2)+(j*(space+nSize)),x+(lc*nSize)+(lc*nSpace),y+oBuff+(nSize/2)+(i*(space+nSize)));
            }
        }

        fill(0);
        textSize(15);
        textAlign(CENTER,CENTER);
        text("U",x+(lc*nSize)+(lc*nSpace)+nSize/2,y+oBuff+(nSize/2));
        text("D",x+(lc*nSize)+(lc*nSpace)+nSize/2,y+oBuff+space+nSize+(nSize/2));
        text("L",x+(lc*nSize)+(lc*nSpace)+nSize/2,y+oBuff+(2*space)+(2*nSize)+(nSize/2));
        text("R",x+(lc*nSize)+(lc*nSpace)+nSize/2,y+oBuff+(3*space)+(3*nSize)+(nSize/2));
    }
}