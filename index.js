'use strict';

const STORE = {
  items: [
    { name: 'apples', checked: false},
    { name: 'oranges', checked: false},
    { name: 'milk', checked: true},
    { name: 'bread', checked: false}
  ],

};

function generateItemElement(item, itemIndex) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <button class="edit">
            <span class="button-label">Edit</span>
      </button><input class='edit-item-input' placeholder="Edit Item Name"/></span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');

  let filteredItems = [ ...STORE.items ];

  if (STORE.checkBox === true) {
    //filteredItems.sort((a, b) => a.name > b.name);
    filteredItems = filteredItems.filter(obj => {
      return obj.checked !== true;
      
    })};

  const shoppingListItemsString = generateShoppingItemsString(filteredItems);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({ name: itemName, checked: false, createdAt: new Date() });
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteItem(index) {
  STORE.items.splice(index, 1);
}

function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    console.log('`handleDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItem(itemIndex);
    renderShoppingList();
  });
}

function handleEditItemClick(){
  $('.js-shopping-list').on('click', '.edit', event => {
    console.log('`handleEditItemClick` ran');
    $(event.currentTarget).hide();
    $(event.currentTarget).prev().hide();
    $(event.currentTarget).next().show();
    $(event.currentTarget).next().select();
    console.log(event.currentTarget);


  });

}

//event handler for searching for item in our STORE via input form
function handleItemRenameSubmit(itemIndex){
  $('.js-shopping-list').on('blur', '.edit-item-input', event => {
       
    console.log(event.currentTarget);
    let targetObject = (getItemIndexFromElement(event.currentTarget));
    targetObject.name = event.currentTarget.value;
    console.log(event.currentTarget.value);
    console.log(targetObject);
   
    renderShoppingList();


  });
}

function handleItemRenameSubmit(){
  $('.js-shopping-list').on('blur', '.edit-item-input', event => {
    let targetObject = (getItemIndexFromElement(event.currentTarget));
    console.log(event.currentTarget);
    console.log(event.currentTarget.value);
    console.log(targetObject);
   
    renderShoppingList();


  });
}

function toggleCheckedForListItem(itemIndex) {
  const itemindex = getItemIndexFromElement(event.currentTarget);
  itemIndex.checked = !itemIndex.checked;
}

function handleHideCheckedItems() {
  $('#checkBox-hide').change(function() {
    changeCheckBoxState();
    console.log("checked!");
    renderShoppingList();
  });
 
}



// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleItemRenameSubmit();
  handleEditItemClick();
  handleItemRenameSubmit();
  handleHideCheckedItems();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);