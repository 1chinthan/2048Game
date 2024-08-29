document.addEventListener('DOMContentLoaded',()=>{
    const gridDisplay=document.querySelector(".grid");
    const scoreDisplay=document.querySelector(".score");
    const resultDisplay=document.querySelector(".result");
    const width=4;
    let squares=[];
    let score=0;

    //creatte playing board

    function createBoard(){
        for(let i=0;i<width * width ;i++)
        {
            const square=document.createElement('div');
            square.innerHTML=0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
       
    }
    createBoard()


    //generate a new number

    function  generate(){
        const randomNumber=Math.floor(Math.random() * squares.length);
        if(squares[randomNumber].innerHTML==0)
        {
            squares[randomNumber].innerHTML=2
            checkForGameOver();
        }
         else generate() 
    }

    function moveRight(){
        for(let i=0;i<16;i++)
        {
            if(i % 4 === 0)
            {
                let totalOne=squares[i].innerHTML;
                let totalTwo=squares[i+1].innerHTML;
                let totalThree=squares[i+2].innerHTML;
                let totalFour=squares[i+3].innerHTML;
                let row=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                //console.log(row);
                let filteredRow=row.filter(num =>num);
                //console.log(filteredRow);
                let missing=4-filteredRow.length;
               // console.log(missing)
                let zeros=Array(missing).fill(0);
                let newRow=zeros.concat(filteredRow);
                //console.log(newRow);
                squares[i].innerHTML=newRow[0];
                squares[i+1].innerHTML=newRow[1];
                squares[i+2].innerHTML=newRow[2];
                squares[i+3].innerHTML=newRow[3];
            }
        }
    }



    function moveLeft()
    {
        for(let i=0;i<16;i++)
        {
            if(i % 4 == 0)
            {
                let totalOne=squares[i].innerHTML;
                let totalTwo=squares[i+1].innerHTML;
                let totalThree=squares[i+2].innerHTML;
                let totalFour=squares[i+3].innerHTML;

                let row= [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)];

                let filteredRow=row.filter(num=>num)
                let missing=4-filteredRow.length;
                let zeros=Array(missing).fill(0);
                let newRow=filteredRow.concat(zeros);

                squares[i].innerHTML=newRow[0];
                squares[i+1].innerHTML=newRow[1];
                squares[i+2].innerHTML=newRow[2];
                squares[i+3].innerHTML=newRow[3];
                
            }
        }
    }



    function moveUp()
    {
        for(let i=0;i<4;i++)
        {
                let totalOne=squares[i].innerHTML;
                let totalTwo=squares[i+width].innerHTML;
                let totalThree=squares[i+width*2].innerHTML;
                let totalFour=squares[i+width*3].innerHTML;

                let col= [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)];

                let filteredColumn=col.filter(num=>num)
                let missing=4-filteredColumn.length;
                let zeros=Array(missing).fill(0);
                let newColumn=filteredColumn.concat(zeros);

                squares[i].innerHTML=newColumn[0];
                squares[i+width].innerHTML=newColumn[1];
                squares[i+width*2].innerHTML=newColumn[2];
                squares[i+width*3].innerHTML=newColumn[3];
        }
    }
    
    
    
    
    function moveDown()
    {
        for(let i=0;i<4;i++)
        {
                let totalOne=squares[i].innerHTML;
                let totalTwo=squares[i+width].innerHTML;
                let totalThree=squares[i+width*2].innerHTML;
                let totalFour=squares[i+width*3].innerHTML;

                let col= [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)];

                let filteredColumn=col.filter(num=>num)
                let missing=4-filteredColumn.length;
                let zeros=Array(missing).fill(0);
                let newColumn=zeros.concat(filteredColumn);

                squares[i].innerHTML=newColumn[0];
                squares[i+width].innerHTML=newColumn[1];
                squares[i+width*2].innerHTML=newColumn[2];
                squares[i+width*3].innerHTML=newColumn[3];
        }
    }



    //control();

    //assign function to keys

function combineColumn()
{
    for(let i=0; i<12;i++)
    {
        if(squares[i].innerHTML===squares[i+width].innerHTML)
        {
            let combineTotal=parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
            squares[i].innerHTML=combineTotal;
            squares[i+width].innerHTML=0;
            score+= combineTotal;
            scoreDisplay.innerHTML=score;
        }
    }
    //ckeckWin()
}



function combineRow()
{
    for(let i=0; i<15;i++)
    {
        if(squares[i].innerHTML===squares[i+1].innerHTML)
        {
            let combineTotal=parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
            squares[i].innerHTML=combineTotal;
            squares[i+1].innerHTML=0;
            score+= combineTotal;
            scoreDisplay.innerHTML=score;
        }
    }
    //ckeckWin()
}



    function control(e){

        console.log(e.key);
        if(e.key==='ArrowLeft')
        {
            keyLeft();
        }
        else if(e.key==='ArrowRight')
        {
            keyRight();
        }
        else if(e.key==='ArrowDown')
        {
            keyDown();
        }
        else if(e.key==='ArrowUp')
        {
            keyUp();
        }
    }
    document.addEventListener('keydown',control)





    function keyLeft()
    {
        moveLeft()
        combineRow();
        moveLeft()
        generate()
    } 

        function keyRight()
        {
            moveRight()
          combineRow();
            moveRight()
            generate()
        }
        function keyUp()
        {
            moveUp()
            combineColumn()
            moveUp()
            generate()
        }
        function keyDown()
        {
            moveDown()
            combineColumn()
            moveDown()
            generate()
        }



        //check for the number to win

        function checkForWin()
        {
            for(let i=0;i<squares.length;i++)
            {
                if(squares[i].innerHTML==2048)
                {
                    resultDisplay.innerHTML='You Win!';
                    document.removeEventListener('keydown',control)
                    setTimeout(clear,3000)
                }
            }
        }

        // check if there are no zeros for the lose

        function checkForGameOver()
        {
            let zeros=0;
            for(let i=0;i<squares.length;i++)
            {
                
                if(squares[i].innerHTML==0)
                {
                    zeros++;
                }
            }
            if(zeros==0)
            {
                resultDisplay.innerHTML='You lose!'
                document.removeEventListener('keydown',control)
                setTimeout(clear,3000)
            }
        }


        function clear()
        {
            clearInterval(myTimer)
        }


        //add colors
        function addColor()
        {
            for(let i=0;i<squares.length;i++)
            {
                if(squares[i].innerHTML==0) squares[i].style.backgroundColor='#ffd380'
                else if(squares[i].innerHTML==2) squares[i].style.backgroundColor='#ffa600'
                else if(squares[i].innerHTML==4) squares[i].style.backgroundColor='#ff8531'
                else if(squares[i].innerHTML==8) squares[i].style.backgroundColor='#ff6361'
                else if(squares[i].innerHTML==16) squares[i].style.backgroundColor='#bc5090'
                else if(squares[i].innerHTML==32) squares[i].style.backgroundColor='#8a508f'
                else if(squares[i].innerHTML==64) squares[i].style.backgroundColor='#2c4875'
                else if(squares[i].innerHTML==128) squares[i].style.backgroundColor='#003f5c'
                else if(squares[i].innerHTML==256) squares[i].style.backgroundColor='#00202e'
                else if(squares[i].innerHTML==512) squares[i].style.backgroundColor='#bdb2ff'
                else if(squares[i].innerHTML==1024) squares[i].style.backgroundColor='#a0c4ff'
                else if(squares[i].innerHTML==2048) squares[i].style.backgroundColor='#9bf6ff'
                
            }
        }
        addColor()
        let myTimer=setInterval(addColor,50)
})
