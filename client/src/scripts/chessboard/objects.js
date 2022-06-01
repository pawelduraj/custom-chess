export class Move { //klasa ruchu bierki
    constructor(x, y, n, rules, events) {
        this.x = x; //przesuniecie w osi x
        this.y = y; //przesunie w osi y
        this.number = n; //ilosc powotrzen
        this.rules = rules; //tablica zasad ruchu
        this.events = events; //funkcje wykonane po ruchu
    }
}

export class Type_of_piece//rodzaj bierki
{
    constructor(name, image, moves) {
        this.name = name;//nazwa
        this.moves = moves;//tablica mozliwych ruchow
        this.image = image;//grafika
    }
}

export class Piece//Bierka
{
    constructor(team, type) {
        this.c_moves = 0;//licznik ruchow
        this.team = team;//zespol
        this.type = type;//typ bierki
    }
}

export class Hist_record//zapisana poprzednie ustawienie na szachownicy
{
    constructor(board) {
        this.board = board;
    }
}

export class GameStatus {
    isEnd;
    visable;
    whoWin;
    reason;

    constructor() {
        this.isEnd = false;
        this.visable = false;
    }

    setEnd(winner, reason) {
        this.isEnd = true;
        this.visable = true;
        switch (winner) {
            case -1:
                this.whoWin = "Gra zakonczyla sie remisem"
                break;
            case 0:
                this.whoWin = "Biały wygrał"
                break;
            case 1:
                this.whoWin = "Czarny wygrał"
                break;
        }
        switch (reason) {
            case 0:
                this.reason = "Szach mat";
                break;
            case 1:
                this.reason = "Pat";
                break;
            case 2:
                this.reason = "Powtorzenie pozycji";
                break;
            case 3:
                this.reason = "Poddanie sie";
                break;
        }
    }
}

export class Interaction {
    on;
    in;
    out;

    constructor() {
        this.on = false;
    }

    run(data) {
        this.in = data;
        this.on = true;
    }
}