// JavaScript to handle button functionality

const input=document.querySelector("#inputField");
const btn=document.querySelector("#addButton");
const list=document.querySelector("#task");

async function reRender(){
const response=await fetch("http://localhost:3000/todos")

const data=await response.json();

// console.log(data.todos); //it stores all the todos

for(let i=0;i<data.todos.length;i++)
{
    const li=document.createElement("li");
    li.setAttribute("id",data.todos[i]._id);
    const span=document.createElement("span");
    span.innerHTML=data.todos[i].task;
    li.appendChild(span);

    const btn1=document.createElement("button");
    btn1.innerHTML="edit";
    btn1.classList.add("editButton");
    li.appendChild(btn1);

    const btn2=document.createElement("button");
    btn2.innerHTML="remove";
    btn2.classList.add("removeBtn");
    li.appendChild(btn2);
    
    list.appendChild(li);
}
}
reRender();

async function updateTask(_id,task)
{
    const response = await fetch("http://localhost:3000/edit",
    {
        method:"PUT",
        body:JSON.stringify({_id,task}),
        headers:{"content-type":"application/json"}
    });
}

async function deleteTask(_id)
{
    const response = await fetch("http://localhost:3000/delete",
    {
        method:"DELETE",
        body:JSON.stringify({_id}),
        headers:{"content-type":"application/json"}
    })
}


btn.addEventListener("click",async function(){
    if(input.value.length==0)
    {
        alert("input field is empty!");
        return ;
    }
    //request : post - add task
    const response = await fetch("http://localhost:3000/add",
    {
        method:"POST",
        body:JSON.stringify({task:input.value}),
        headers:{"content-type":"application/json"}
    });

    const data = await response.json();
    //console.log(data);

    const li=document.createElement("li");
    li.setAttribute("id",data.id);
    const span=document.createElement("span");
    span.innerHTML=input.value;
    li.appendChild(span);

    const btn1=document.createElement("button");
    btn1.innerHTML="edit";
    btn1.classList.add("editButton");
    li.appendChild(btn1);

    const btn2=document.createElement("button");
    btn2.innerHTML="remove";
    btn2.classList.add("removeBtn");
    li.appendChild(btn2);
    
    list.appendChild(li);
    input.value="";
})

list.addEventListener("click", function (e) {
    // console.log(e.target); //to access the clicked element
    // console.log(e.target.parentElement); //to access the parent element

    //edit
    if (e.target.classList.contains("editButton")) {
        const editButton=e.target; //edit button
        const deleteButton=e.target.parentElement.querySelector(".removeBtn"); //remove button
        const item=e.target.parentElement.querySelector("span"); //span
        if(editButton.innerHTML=="edit") //if the button is edit
        {
            editButton.innerHTML="save"; //turn the first button to save to save the changes when it is clicked again
            deleteButton.innerHTML="cancel"; //turn the second button to cancel to do nothing
            input.value=item.textContent; //paste the text of the clicked task to the input
            input.focus();
        }
        else //if the button is save
        {
            if(input.value.length!=0) //length of the text inside the input is greater than zero
            {
                editButton.innerHTML="edit"; //turn the first button to edit and save the changes in the database
                deleteButton.innerHTML="remove"; //turn the second button to remove to remove the task when it is clicked
                const updatedText=input.value;
                item.textContent=updatedText;
                //send the text and id to server to update the task of the given id.
                const id = e.target.parentElement.id; //id of the parent element
                updateTask(id,updatedText); 
                input.value="";
            } 
            else
            {
                alert("input field cannot be empty! Please enter something.");
                input.focus();
            } 
        }
    } 

    //delete
    else if (e.target.classList.contains("removeBtn")) {
        const editButton=e.target.parentElement.querySelector(".editButton");
        const deleteButton=e.target;
        if(deleteButton.innerHTML=="remove")
        {
            const child=deleteButton.parentElement;
            list.removeChild(child);
            //send the id to the server to delete the task of given id
            const id=e.target.parentElement.id;
            deleteTask(id);
        }else
        {
            editButton.innerHTML="edit";
            deleteButton.innerHTML="remove";
            input.value="";
        }
    }
});