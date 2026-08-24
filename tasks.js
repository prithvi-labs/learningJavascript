document.addEventListener('DOMContentLoaded', function(){
    const submit = document.querySelector('#submit');
    const newTask = document.querySelector('#task');
    submit.disabled = true;

    newTask.onkeyup = function(){
        if(newTask.value.length > 0){
        submit.disabled = false;
    }else{
        submit.disabled = true;
    }
    };

  document.querySelector('form').onsubmit = function(){
    const li = document.createElement('li');
    li.innerHTML = newTask.value;

    document.querySelector('#tasks').append(li);
    newTask.value = '';
    submit.disabled = true;

    return false;


  };


});

