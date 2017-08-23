$(function() {

// -------------------------------------------------------------------------------------------------

    var board = {
        name: 'Kanban Board',
        $element: $('#board .column-container'),
        addColumn: function(column) {
            this.$element.append(column.element);
            initSortable();
        }
    },
        createColumn = document.getElementById('create-column');

    createColumn.addEventListener('click', function() {
        var name = prompt('Enter a column name'),
                column = new Column(name);
            board.addColumn(column);
    });

// -------------------------------------------------------------------------------------------------

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    function randomString(number) {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
            str = '',
            charLength = chars.length,
            idLength = number || 10,
            i=0;

        for (i = 0; i < idLength; i++) {
            str += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return str;
    }

// -------------------------------------------------------------------------------------------------

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.element = createColumn();

        function createColumn() {
            var column = document.createElement('div');
                column.classList.add('column');
            var columnTitle = document.createElement('h2');
                columnTitle.classList.add('column-title');
                columnTitle.innerText = self.name;
            var columnCardList = document.createElement('ul');
                columnCardList.classList.add('column-card-list');
            var columnDelete = document.createElement('button');
                columnDelete.classList.add('btn-delete');
                columnDelete.innerText = 'x';
            var columnAddCard = document.createElement('button');
                columnAddCard.classList.add('add-card');
                columnAddCard.innerText = 'Add a card';
            var columnAll = document.createDocumentFragment();

            columnDelete.addEventListener('click', function() {
                self.removeColumn();
            });

            columnAddCard.addEventListener('click', function() {
                self.addCard(new Card(prompt("Enter the name of the card")));
            });

            column.appendChild(columnDelete);
            column.appendChild(columnTitle);
            column.appendChild(columnAddCard);
            column.appendChild(columnCardList);
            columnAll.appendChild(column);

             return columnAll;
        }
    }

    Column.prototype = {
        addCard: function(card) {
            this.element.children('ul')
                .append(card.element);
        },
        removeColumn: function() {
            this.element.remove();
        }
    };

// -------------------------------------------------------------------------------------------------

    function Card(description) {
        var self = this;
    
        this.id = randomString();
        this.description = description;
        this.element = createCard();
    
        function createCard() {
            var card = document.createElement('li');
                card.classList.add('card');
            var cardId = document.createElement('h6');
                cardId.classList.add('card-Id');
                cardId.innerText = `id: ${randomString(6)}`;
            var cardDescription = document.createElement('p');
                cardDescription.classList.add('card-description');
                cardDescription.innerText = self.description;
            var cardDelete = document.createElement('button');
                cardDelete.classList.add('btn-delete');
                cardDelete.innerText = 'x';
            var cardAll = document.createDocumentFragment();
           
            cardDelete.addEventListener('click', function() {
                  self.removeCard();
            });

            card.appendChild(cardDelete);
            card.appendChild(cardId);
            card.appendChild(cardDescription);
            cardAll.appendChild(card);
            
            return cardAll;
        }
    }

    Card.prototype = {
        removeCard: function() {
            this.element.remove();
        }
    }

// -------------------------------------------------------------------------------------------------

    var todoColumn = new Column('To do'),
        doingColumn = new Column('Doing'),
        doneColumn = new Column('Done');
    
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);
    
    var card1 = new Card('New task'),
        card2 = new Card('Create kanban boards');
    
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);

// -------------------------------------------------------------------------------------------------

})