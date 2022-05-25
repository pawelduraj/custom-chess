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