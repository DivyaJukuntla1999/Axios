//axios globals
axios.defaults.headers.common['X-Auth-Token']=
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
function getTodos() {
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params:{
    //         _limit:5
    //     }
    // })
    // .then(res=>showOutput(res))
    // .catch(err=>console.error(err));


    axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5',{
      timeout:5000
    })
    .then(res=>showOutput(res))
    .catch(err=>console.error(err));

  }

  // POST REQUEST
  function addTodo() {
    axios.post(' https://jsonplaceholder.typicode.com/todos',{
        title: 'New todo',
        completed: false
    })
    //  axios({
    //     method: 'post',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     data:{
    //         title: 'New Todo',
    //         completed:false
    //     }
    // })
    .then(res=>showOutput(res))
    .catch(err=>console.error(err));

  }

  // PUT/PATCH REQUEST
  function updateTodo() {  //put is use to replace entire resource $ patch will kind of update it increamentaly
    axios
    .patch(' https://jsonplaceholder.typicode.com/todos/1',{
        title: 'Updated  todo',
        completed: true
  })
  .then(res=>showOutput(res))
  .catch(err=>console.error(err));
  }

  // DELETE REQUEST
  function removeTodo() {
    axios
    .delete(' https://jsonplaceholder.typicode.com/todos/1')
  .then(res=>showOutput(res))
  .catch(err=>console.error(err));
  }


  // SIMULTANEOUS DATA
  function getData() {
    //console.log('Simultaneous Request');

    axios.all([
        axios.get(' https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get(' https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    .then(axios.spread((todos,posts)=> showOutput(posts)))
    .catch(err=>console.error(err));
  }

  // CUSTOM HEADERS
  function customHeaders() {
   //console.log('Custom Headers');

    const config={
        headers:{
            'content-Type': 'application/json',
            Authorization: 'sometoken'
        }
    }

    axios
    .post(' https://jsonplaceholder.typicode.com/todos',{
        title: 'New todo',
        completed: false
    })
    .then(res=>showOutput(res))
    .catch(err=>console.error(err));

  }

  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    //console.log('Transform Response');

    const options={
        method: 'post',
        url: ' https://jsonplaceholder.typicode.com/todos',
        data:{
            title: 'hello world'
        },
        transformResponse: axios.defaults.transformResponse.concat(data=>{
            data.title=data.title.toUpperCase();
            return data;
        })
    }
    axios(options).then(res=> showOutput(res))
  }

  // ERROR HANDLING
  function errorHandling() {
    // console.log('Error Handling');
    axios
    .get('https://jsonplaceholder.typicode.com/todoss',{
      // validateStutus: function(status){
      //   return status<500; //reject only if status is greater or equal to 500
      // }
    })
    .then(res=>showOutput(res))
    .catch(err=>{
        if(err.response){
            //Server responded with a stutus other than 200 range
            console.log(err.response.data)
            console.log(err.response.status);
            console.log(err.response.headers);


        }
    });

  }

  // CANCEL TOKEN
  function cancelToken() {
   // console.log('Cancel Token');

   const source=axios.CancelToken.source();
   axios
    .get('https://jsonplaceholder.typicode.com/todos',{
        cancelToken:source.token
    })
    .then(res=>showOutput(res))
    .catch(thrown=>{
        if(axios.isCancel(thrown)){
            console.log('request canceld', thrown.message);

        }
    });

    if(true){
        source.cancel('request canceled')
    }
}