function loadComments(pageName) {
    fetch(`/api/get_comments?page=${pageName}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {// into the "if (data.status === 'success') {" part 

list = document.getElementById('comment-container'); 

 list.innerHTML = ''; 

 data.comments.forEach(comment => { 

 displayComment(list, comment); 

 }); 
                // do whatever needs doing witht the returned data.
                // it should be in data.#, where you replace # with the name you gave it in app.py
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
 

    }



// separate function 

function displayComment(container, comment) { 

 let element = document.createElement('div'); 

 element.innerHTML = ` 

 <li class='comment'> 

 ${comment.message} 

</li> 

`; 

container.append(element); 

} 

document.addEventListener('DOMContentLoaded', () => { 

 const pageName = document.body.dataset.pageName;   

 if (pageName) { 

 loadComments(pageName); 

 } 

}); 