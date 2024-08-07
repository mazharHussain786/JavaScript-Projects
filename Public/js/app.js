


let socket=io()

// comment get
let username;

do {
  username = prompt("Enter your name");
} while (!username);

let commentText = document.querySelector("#textarea");
let btnId = document.querySelector("#btn-Post");
let commentBox = document.querySelector(".comment__box");

btnId.addEventListener("click", (e) => {
  e.preventDefault();
  let comment = commentText.value;
  if (!comment) {
    return;
  }
  const CommentObj={
    comment,
    username
  }
 
  postComment(CommentObj)
  commentText.value=''
});

function postComment(CommentObj)
{
    appendToDom(CommentObj)
    broadCast(CommentObj)
}

function appendToDom(commentObj)
{
    let lTag=document.createElement('li')
    lTag.classList.add('comment','mb-3')

    let markup=`<div class="card border-blue mb-3">

        <div class="card-body">
            <h6>${commentObj.username}</h6>
            <p>${commentObj.comment}</p>
            
            <div>

                <img src="img/clock.png" alt="clock" class="src">
                 <small>${moment(commentObj.time).format("h:mm")}</small>
            </div>
        </div>
    </div>` 
    
    lTag.innerHTML=markup
    commentBox.prepend(lTag) // similar like appendChild but append in LIFO 


}
function broadCast(commentObj)
{
 socket.emit('comment',commentObj)
}
let timerId=null

function debounce(callback,timer)
{
 if(timerId)
  {
    clearInterval(timerId)
  }
  timerId=setTimeout(()=>
  {
    callback();
  },timer)
}


function storeComment(CommentObj)
{

}

socket.on('comment',(data)=>
{
appendToDom(data);
})

commentText.addEventListener('keyup',(e)=>
{
  socket.emit('typing',username)
})

socket.on('typing',(data)=>
{
 let innerText=`${data} is typing ...`
 console.log(innerText)
 document.querySelector(".typing").innerText=innerText
 debounce(()=>
{
  document.querySelector(".typing").innerText=''
},1000)
})
