/* global $ */

$(document).ready(() => {

  let form = $('form');

  $.getJSON('/api/todos') 
    .then(addTodos);
    
  form.on('submit', (e) => {
    createTodo(e);
  });
  
  $('.todo-list').on('click', 'span', (e) => {
    e.stopPropagation();

    removeTodo($(e.target).parent());
  });
  
  $('.todo-list').on('click', 'li', (e) => {
    isTodoDone($(e.target));
    console.log($(e.target).data('completed'));
    $(e.target).toggleClass('completed');
  });

});

function addTodos(todos) {
  todos.forEach((todo) => {
    addNewTodo(todo);
  });
}

function createTodo(e) {
  e.preventDefault();
  let userInput = $('form input').val();
  
  $.post('/api/todos', {name: userInput})
    .then((todo) => {
      $('form input').val('');
      addNewTodo(todo);
    })
    .catch((err) => {
      console.log(err);
    })
}

function addNewTodo(todo) {
  let newTodo = $('<li>' + todo.name + '<span class="remove-btn">X</span></li>');
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
    
    if(todo.completed) {
      newTodo.addClass('completed');
    }
    $('.todo-list').append(newTodo);
}

function removeTodo(todo) {
  let itemId = todo.data('id');
  let delItemUrl = 'api/todos/' + itemId;
  
  $.ajax({
    method: 'DELETE',
    url: delItemUrl
  })
  .then((data) => {
      todo.remove();
  })
}

function isTodoDone(todo) {
  let todoId = todo.data('id'),
      isDone = !todo.data('completed');
  
  $.ajax({
    method: 'PUT',
    url: 'https://todo-app-piotr794.c9users.io/api/todos/' + todoId,
    data: {
      completed: isDone
    }
  })
}