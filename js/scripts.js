$(function() {

// -------------------------------------------------------------------------------------------------

    var board = {
        name: 'Kanban Board',
        $element: $('#board .column-container'),
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        }
    };

    $('#create-column')
        .click(() => {
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
        this.$element = createColumn();

        function createColumn() {
            var $column = $('<div>').addClass('column'),
                $columnTitle = $('<h2>').addClass('column-title').text(self.name),
                $columnCardList = $('<ul>').addClass('column-card-list'),
                $columnDelete = $('<button>').addClass('btn-delete').text('x'),
                $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

            $columnDelete.click(() => {
                self.removeColumn();
            });

            $columnAddCard.click(() => {
                self.addCard(new Card(prompt("Enter the name of the card")));
            });

            $column.append($columnDelete)
                .append($columnTitle)
                .append($columnAddCard)
                .append($columnCardList);

             return $column;
        }
    }

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul')
                .append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };

// -------------------------------------------------------------------------------------------------

    function Card(description) {
        var self = this;
    
        this.id = randomString();
        this.description = description;
        this.$element = createCard();
    
        function createCard() {
            var $card = $('<li>').addClass('card'),
                $cardId = $('<h6>').addClass('cardId').text(`id: ${randomString(6)}`),
                $cardDescription = $('<p>').addClass('card-description').text(self.description),
                $cardDelete = $('<button>').addClass('btn-delete').text('x');

            $cardDelete.click(() => {
                  self.removeCard();
            });

            $card.append($cardDelete)
                .append($cardId)
                .append($cardDescription);
            
              return $card;
        }
    }

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
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