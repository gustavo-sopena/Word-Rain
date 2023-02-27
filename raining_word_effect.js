// name: raining word effect
// description: a recreation of the raining word effect from "The Matrix"
// author: Gustavo Sopena
// date started: Monday: February 27, 2023

//var s;
// var myStream;
var screenStreams;
var totalScreenStreams;

var symbolSize = 30;
var symbolVerticalStartingPosition = 0;
var symbolHorizontalStartingPosition = 0;
var symbolVerticalPadding = 30;
var symbolHorizontalPadding = 30; // if this is the same size as the symbol size, then there is essentially 0 padding

class CharacterSymbol
{
    constructor(x, y, size, speed, first)
    {
        this.xpos = x;
        this.ypos = y;
        this.size = size;
        this.xvel = 0;
        this.yvel = speed;
        this.value;
        this.switchInterval = round(random(60, 120));
        this.isFirst = first;
    }
    
    // 0 - ellipse
    // 1 - square
    // 2 - triangle
    
    // the following function displays the symbol on screen
    show()
    {
        // clears the background (turn all black)
        // sets the stroke value to white
        // draws the symbol

        if (this.isFirst)
        {
            strokeWeight(5);
            stroke(0, 255, 70);
            fill(255);
        }
        else
        {
            // stroke(255);
            noStroke();
            // fill(0, 200, 100);
            fill(0, 255, 70);
        }
        // ellipse(xpos, ypos, size1, size2)
        // ellipse(this.xpos, this.ypos, this.size, this.size);
        text(this.value, this.xpos, this.ypos);

        this.setRandomSymbol();
        
        this.update();
  }
  
    // the following function allows the symbol to move (down, for now)
    // it updates the y-position of the symbol
    update()
    {
        // show the object
        // substract its current y-position by the speed factor
        // this affects where its going to be drawn again
        // logic to check if out-of-bounds
        
        // Question 1. How does the symbol know about an edge?
        
        // this.show();
        //this.xpos -= 10;
        this.xpos += this.xvel;
        this.ypos += this.yvel;
        
        // if the symbol is within the bounds of the mouse radius, then pause the movement
        // if not, then continue moving
        // if the distance between current positoin and mouse radius position is greater than mouse radius, continue moving
        // else stop moving
        // somehow, this was messing with boundary detection...
        //let distance = sqrt((this.xpos - mouseX)^2 + (this.ypos - mouseY)^2);
        //if (mouseIsPressed)
        //{
        //  this.yvel = 0;
        //}
        //else
        //{
        //  this.yvel = 8;
        //}
        
        // boundary loops
        // vertical (bottom)
        if (this.ypos > windowHeight + this.size)
        {
            this.ypos = -this.size;
        }
        // // vertical (top)
        // if (this.ypos < 0 - this.size)
        // {
        //     this.ypos = windowHeight + this.size;
        // }
        // // horizontal (right)
        // if (this.xpos > windowWidth + this.size)
        // {
        //     this.xpos = -this.size;
        // }
        // // horizontal (left)
        // if (this.xpos < 0 -this.size)
        // {
        //     this.xpos = windowWidth + this.size;
        // }

        // check bottom boundary
        // if (this.ypos > windowHeight - this.size)
        // {
        //     this.ypos = windowHeight - this.size;
        //     this.yvel *= -1;
        // }
        // check top boundary
        // if (this.ypos < this.size)
        // {
        //     this.ypos = this.size;
        //     this.yvel *= -1;
        // }
    }

    setRandomSymbol()
    {
        if (frameCount % this.switchInterval == 0)
        {
            this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
        }
    }
}

// a vertical array of symbols
class CharacterSymbolStream
{
    constructor()
    {
        // this.total = 1;
        this.total = round(random(3, 7));
        this.characterSymbols = [];
        // this.maxSpeed = 8;
        this.maxSpeed = round(random(4, 12));
    }

    show()
    {
        for (let i = 0; i < this.total; i++)
        {
            this.characterSymbols[i].show();
        }
        // this.characterSymbols.forEach(function(symbol)
        // {
        //     symbol.show();
        // });
    }

    // this function will populate the array with symbols
    populateSymbols()
    {
        let kSymbol;
        let beFirst = round(random(0, 5)) == 1;
        for (let i = 0; i < this.total; i++)
        {
            kSymbol = new CharacterSymbol(symbolHorizontalStartingPosition, symbolVerticalStartingPosition, symbolSize, this.maxSpeed, beFirst);
            kSymbol.setRandomSymbol();
            this.characterSymbols.push(kSymbol);
            symbolVerticalStartingPosition -= symbolSize; // effectively stacks the symbols atop one another
            beFirst = false;
        }
    }
}

// ========================================================================================================================================= //

function setup()
{
    // frameRate(5);
    createCanvas(windowWidth, windowHeight);
    background(0);
    textSize(symbolSize);

    // create a lot of streams that fill across the window width
    screenStreams = [];
    // totalScreenStreams = 1;
    totalScreenStreams = round(windowWidth/symbolSize);

    symbolVerticalStartingPosition = round(random(-500, 0)); // randomize the vertical position, so as to stagger the streams (default: 0)
    // symbolVerticalStartingPosition = round(random(-30, windowHeight + 100));
    // symbolHorizontalStartingPosition = round(random(-30, windowWidth + 100));
    for (let i = 0; i < totalScreenStreams; i++)
    {
        // create a new stream and populate it with symbols
        screenStreams[i] = new CharacterSymbolStream();
        screenStreams[i].populateSymbols();

        symbolVerticalStartingPosition = round(random(-500, 0)); // select a new random vertical position
        symbolHorizontalStartingPosition += symbolSize; // set the horizontal starting position next to the current stream
    }
}

function draw()
{
    background(0);
    
    for (let i = 0; i < totalScreenStreams; i++)
    {
        screenStreams[i].show();
    }
    // if the mouse is pressed
    // draw a circle at the mouse position
    // if (mouseIsPressed)
    // {
    //     stroke(255, 0, 0);
    //     noFill();
    //     ellipse(mouseX, mouseY, 250, 250);
    // }
}
