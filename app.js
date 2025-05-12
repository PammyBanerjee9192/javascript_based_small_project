//game starting
let clickTrackerDiv=document.querySelector('.btn-container');
let bdy=document.querySelector('body');
let start=false;
let level=0;
let highest=[];
let h2=document.querySelector("h2");
let index_tracker=[];
let click_tracker=[];
let button_array=document.querySelectorAll(".btn-container .btn");
let btnArray=[...button_array];
document.addEventListener("keypress",()=>{
    if(start==false){
        console.log("started");
        start=true;
        level++;
        h2.innerText=`Level ${level}`;
        Game();
    }
});
function Game(){
    let index=generateRandomButton();
    let obj=button_array[index];
    index_tracker.push(index);
    flash(obj); 
}
function User(){
    let btn=this;
    flash(btn);
    let index=btnArray.indexOf(btn);
    click_tracker.push(index);
    let t=0;
    let i=0;
    let l=click_tracker.length;
        while(t<index_tracker.length){
            while(l!=0){
            if(index_tracker[i]!=click_tracker[i]){
                h2.innerHTML=`Game over<br>Highest score :<b>${HighestScoreTracker()}<b> <br>Your score : <b>${level-1}<b><br>Press any key to play again!`;
                over(bdy);
                resetGame();
            } 
                t++;
                l--;
                i++;
        } 
        break;  
        }
    if(index_tracker.length==click_tracker.length){
    let ans=match_sequence(index_tracker,click_tracker);
    if(ans==true){
    level++;
    highest.push(level-1);
    h2.innerText=`level ${level}`;
    click_tracker=[];
    setTimeout(Game,1000);
   }
} 
}
function HighestScoreTracker(){
    let max=highest[0];
    for(let i=0;i<highest.length;i++){
        if(max<highest[i])max=highest[i];
    }
    return max;
}
function generateRandomButton(){
    let randIndex=Math.floor(Math.random()*4);
    return randIndex;
}
for(btn of button_array){
    btn.addEventListener("click",User);
}
function flash(obj){
    obj.classList.add("flash");
    setTimeout(()=>{
        obj.classList.remove("flash");
    },250)
}
function over(obj){
    obj.classList.add("over");
    setTimeout(function(){
        obj.classList.remove("over");
    },150);
}
function match_sequence(arr1,arr2){
    let eq=0;
    for(let i=0;i<arr1.length;i++){
        if(arr1[i]==arr2[i])eq=1;
        else {
            return false;
        }
    }
    if(eq==1)return true;
}
function resetGame(){
    start=false;
    click_tracker=[];
    index_tracker=[];
    level=0;
}
