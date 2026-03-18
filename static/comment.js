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

 let element = document.createElement('tr'); 

 element.innerHTML = ` 



<td>${comment.author_name}</td>
 <td>${comment.message} </td>



`; 

container.append(element); 

} 

document.addEventListener('DOMContentLoaded', () => { 

 const pageName = document.body.dataset.pageName;   

 if (pageName) { 

 loadComments(pageName); 

 } 

}); 

document.getElementById('com')?.addEventListener('submit', (event) => {
        event.preventDefault(); // this prevents the standard action that is taken when certain things happen. 
                                // Forms automatically send stuff to the server when submitted, and redirect to a new page.
                                // We don't want that.

        let form = document.getElementById('com');
        let formData = new FormData(form); 
        const pageName = document.body.dataset.pageName;   
        formData.append('page', pageName)                  // find the form, and transform the data inside of it.
        fetch('/api/comments', {
            method: 'POST',
            body: formData,
        }) 
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {
              console.log(data.message);
              const pageName = document.body.dataset.pageName; 
              loadComments(pageName)
              form.reset()
            }
            else {
              console.error(data.message);
            }
        })
        .catch(error => {
            console.error(error);
        })
    });