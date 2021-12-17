// make sure page is ready before we run
$(document).ready(function() {

  // DOM elements
  var inputFieldElement = $("#input input:text");
  var submitButtonElement = $("#input button");
  var outputElement = $("#output");

  // The ToDo Object
  todoList = {
    items: [
      {text: "Learned the basics of HTML", 
       completed: true},
      {text: "Learned the basics of CSS", 
       completed: true},
      {text: "Make notes for the turotial", 
       completed: false},
    ],
    addItem: function(item) {
      // make a new item object
      item = {
        text: item,
        completed: false
      }
      this.items.push(item);
    },
    deleteItem: function(index) {
      this.items.splice(index, 1);
      //console.log("delete item:"+index);
    },
    completeItem: function(index) {
      // if completed is true, mark if false, and vice versa
      this.items[index].completed = ! this.items[index].completed;
    },
    updateList: function(item) {
      // clear the contents of our output
      outputElement.html("");
      // go through each of the items in our array
      for (i=0;i<this.items.length;i++) {
        // make string containing this item
        var itemText = this.items[i].text;
        // make a div element that will contain our string
        var itemElement = $('<div class="item"></div>');
        // make a checkbox element so we can mark it completed
        // we give it an id="i" so it we know which one to delete
        var itemCheckboxElement = $('<input type="checkbox" id="'+i+'" class="complete-item" />');
        // if this item is completed, strikeout text and select checkbox
        if (this.items[i].completed) {
          itemText = "<del>" + itemText + "</del>";
          itemCheckboxElement.prop('checked', true);
        };
        // make a span element that will delete this element
        // we give it an id="i" so it we know which one to delete
        var itemDeleteElement = $('<span id="'+i+'" class="delete-item">X</span>');
        // add the item string to the div element
        itemElement.html(" "+itemText);
        // put the checkbox element at the start of the div
        itemElement.prepend(itemCheckboxElement);
        // put the delete element at the end of the div
        itemElement.append(itemDeleteElement);
        // lastly, add this item element to the output
        outputElement.append(itemElement);
      }
      // add event listener to the delete X's
      // Note that we can't do this below because they don't
      // exist until we create them in the line above
      $(".delete-item").click(function(){
        // get the id so we know which one to delete
        id = $(this).attr('id');
        // delete the item using our method above
        todoList.deleteItem(id);
        // refresh the list
        todoList.updateList();
      })
      // add event listener to the checkboxes
      // Note that we can't do this below because they don't
      // exist until we create them in the line above
      $(".complete-item").change(function(){
        // get the id so we know which one to delete
        id = $(this).attr('id');
        // toggle complete for this item using our method above
        todoList.completeItem(id);
        // refresh the list
        todoList.updateList();
      })
    }
  }

  // add event listener to button
  inputFieldElement.change(function(){
    // get contents of input field
    var inputContents = inputFieldElement.val();
    // console.log(inputContents);
    if (inputContents) {
      todoList.addItem(inputContents);
      todoList.updateList();
      // clear input field
      inputFieldElement.val("");
      // move focus to input field for next item
      inputFieldElement.focus();
    }
  })

  todoList.updateList();

})