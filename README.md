# Игра Змейка Петров В.С.

Условия задания:

На экране должно быть игровое поле размером 10 на 10 клеточек.
Над игровым полем должно быть окно, в котором показывается текущее количество очков игрока. На момент начала игры количество очков равно 0.
Под окном с количеством очков указан лучший результат (рекорд) данного пользователя. Если пользователь играет в игру в первый раз, лучший результат отображать не нужно.
После завершения игры появляется кнопка, которая позволяет перезапустить игру.
Дизайн игровых элементов оставляем на ваше усмотрение: это может быть как минималистичная змейка в стиле ретро-игр, так и что-то более необычное.
Лучший результат (рекорд) должен храниться в localStorage. После завершения игры проверьте, не побил ли игрок свой предыдущий рекорд, и, если это так, обновите значение в localStorage. При следующем запуске игры рекорд должен красоваться под полем с количеством заработанных очков.

В начале игры змейка располагается в середине поля. Её изначальная длина — две клетки.
Игра начинается при клике на любое место поля. В случайном месте поля появляется яблоко, и змейка начинает двигаться. Стрелками на клавиатуре можно двигать змейку в нужном направлении.
После того как голова змейки попадает на клетку с яблоком, яблоко считается съеденным: игрок получает одно очко, яблоко исчезает с данной клетки и появляется в другом месте, а размер змейки увеличивается на одну клетку.
Если голова змейки упирается в её собственное тело, игра заканчивается. Если игрок побил свой рекорд по очкам, значение рекорда перезаписывается. Также появляется кнопка, которая позволяет начать игру заново.

# Game Snake Petrov V.S.

Task conditions:

The screen should have a playing field measuring 10 by 10 cells. (Set a larger size)
Above the playing field there should be a window that shows the player's current score. At the start of the game, the number of points is 0.
Under the window with the number of points, the best result (record) of this user is indicated. If the user is playing the game for the first time, the best score does not need to be displayed.
After the game ends, a button appears that allows you to restart the game.
We leave the design of game elements to your discretion: it can be either a minimalistic snake in the style of retro games, or something more unusual.
The best result (record) should be stored in localStorage. After the game is over, check if the player has broken their previous record and if so, update the value in localStorage. The next time you start the game, the record should show off under the field with the number of points earned.

At the beginning of the game, the snake is located in the middle of the field. Its initial length is two cells.
An apple appears in a random place on the field, and the snake begins to move. The arrows on the keyboard can move the snake in the desired direction.
After the snake's head lands on a cell with an apple, the apple is considered eaten: the player receives one point, the apple disappears from this cell and appears in another place, and the size of the snake increases by one cell.
If the snake's head rests on its own body, the game is over. If a player breaks his high score, the high score is overwritten. There is also a button that allows you to restart the game.
