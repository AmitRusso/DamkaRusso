var pic = ["burns.png", "rosy.png", "red.png", "blue.png", "queen_blue.png", "queen_red.png"];
var win = 0;
var a = new Array(arrRows);
var arrRows = 8;
var arrCols = 8;
var temp_x = 0;
var temp_y = 0;
var counter = 0;
var up_down = -1;
var attacker = 2;
var defender = 0;
var up_down_eat = 0;
var queen = 5;
var queen_up_down = 0;
var queen_eat = 0;
var queen_eat2 = 0;
var queen2;
var num1
var b = new Array(arrRows);
var copy = new Array(arrRows);
var join_match_id = "";
var match_id;
var Isp1;
var Isp2;
function BuildBoard() {
    var s = "<div style='text-align: center;'><label for='match_id'> Match Code: " + match_id.toString() + "</label></div>";
    var g, z;
    g = 0;
    while (g < arrRows) {
        a[g] = new Array(arrCols);
        z = 0;
        while (z < arrCols) {
            if (z % 2 == 0 && g % 2 == 0 || z % 2 != 0 && g % 2 != 0) {
                if (g < 3) {
                    a[g][z] = 2
                }
                if (g == 3 || g == 4) {
                    a[g][z] = 1;
                }
                if (g > 4) {
                    a[g][z] = 3;
                }
            }
            else {
                a[g][z] = 0;
            }
            z++;
        }
        g++;
    }
    var i = 0;
    g = 0;
    while (g < arrRows) {
        b[g] = new Array(arrCols);
        i = 0;
        while (i < arrCols) {
            b[g][i] = a[g][i];
            i++;
        }
        g++;
    }
    i = 0;
    g = 0;
    while (g < arrRows) {
        copy[g] = new Array(arrCols);
        i = 0;
        while (i < arrCols) {
            copy[g][i] = a[g][i];
            i++;
        }
        g++;
    }
    var num = 0;
    var rows = 8
    var cols = 8
    i = 0;
    var c = 0;
    s += "        <style> table {        border - collapse: collapse;    }th, td { border:5px solid black;padding: 5px;        text - align: center;   </style >"
    s += "<table border ='5' align = 'center' style='border-color: black;'>";
    while (i < rows)
    {
        c = 0;
        s += "<tr>";
        while (c < cols)
        {
            if (c % 2 == 0 && i % 2 == 0 || c % 2 != 0 && i % 2 != 0)
            {
                s += "<td id='" + num.toString() + "' style='background-color:rosybrown' onclick='OnClickButton(this);'>";
                s += "<img src='" + pic[a[i][c]] + "' width ='42px' height='42px'/>";
            }
            else
            {
                s += "<td id='" + num.toString() + "' style='background-color:firebrick'>";
                
            }
            s += "</td>";
            num++;
            c++;
        }
        i++;
        s += "</tr>";
    }
    s += "</table>";
    s += "<div id='div1' style='text-align: center;'> <img src='MenuButton.png' width ='384' height='216' onclick='Exit()'/></div>";
    document.getElementById("bb").innerHTML = s;
    ////////////////////////////////////////////////////////////////////
}


function OnClickButton(currentThis) {
    const db = firebase.firestore();
    const game = db.collection("games").doc(match_id.toString());
    game.get().then((doc) =>{
        if (win === 0) {
            var y = "";
            var x = "";
            var id = currentThis.id;
            if (doc.data().turn % 4 == 0 || doc.data().turn % 4 == 1) {
                attacker = 2;
                up_down = 1;
                queen_up_down = -1;
                defender = 3;
                up_down_eat = 2;
                queen_eat = -2;
                queen_eat2 = 2;
                queen = 5;
                queen2 = 4;
            }
            else {
                
                attacker = 3;
                up_down = -1;
                queen_up_down = 1;
                defender = 2;
                up_down_eat = -2;
                queen_eat = 2;
                queen_eat2 = -2;
                queen = 4;
                queen2 = 5;
            }
            if (doc.data().turn % 2 == 0) {
                num1 = id;
                temp_x = Math.floor(num1 / arrRows);
                temp_y = Math.floor(num1 % arrRows);
                if (a[temp_x][temp_y] == attacker || a[temp_x][temp_y] == queen) {
                    document.getElementById(num1).style.backgroundColor = "yellow";
                    counter++;
                    game.update({
                        first_move_X:  temp_x,
                        first_move_Y:  temp_y,
                        turn:  counter,
                        firstMove:  [temp_x,temp_y],
                        firsLocation:  id
                    });
                } 
            }
            else {
                temp_x = Math.floor(id / arrRows);
                temp_y = Math.floor(id % arrRows);
                game.update({
                    second_move_X:  temp_x,
                    second_move_Y:  temp_y,
                    secondLocation:  id
                });
                game.get().then((doc) =>{
                    if (doc.data().second_move_Y == doc.data().first_move_Y && doc.data().second_move_X == doc.data().first_move_X)
                    {
                        counter--;
                        game.update({
                            turn:  counter,
                            second_move_Y:  null,
                            second_move_X:  null
                        });
                        document.getElementById(doc.data().firsLocation).style.backgroundColor = "rosybrown";
                    }
                    if (a[doc.data().second_move_X][doc.data().second_move_Y] == 1)
                    {
                        if (a[doc.data().first_move_X][doc.data().first_move_Y] == queen)
                        {
                            if (doc.data().second_move_X - doc.data().first_move_X == up_down && (doc.data().second_move_Y - doc.data().first_move_Y) == 1 || doc.data().second_move_X - doc.data().first_move_X == up_down && (doc.data().second_move_Y - doc.data().first_move_Y) == -1 || doc.data().second_move_X - doc.data().first_move_X == queen_up_down && (doc.data().second_move_Y - doc.data().first_move_Y) == 1 || doc.data().second_move_X - doc.data().first_move_X == queen_up_down && (doc.data().second_move_Y - doc.data().first_move_Y) == -1) {
                                x += "<img src='" + pic[1] + "' width ='42px' height='42px'/>"
                                document.getElementById(num1).innerHTML = x;
                                document.getElementById(num1).style.backgroundColor = "rosybrown";
                                y += "<img src='" + pic[queen] + "' width ='42px' height='42px'/>"
                                document.getElementById(id).innerHTML = y;
                                var currentInt = a[doc.data().first_move_X][doc.data().first_move_Y];
                                counter++;
                                game.update({
                                    turn:  counter,
                                    secondMove:  [doc.data().second_move_X,doc.data().second_move_Y, currentInt],
                                    IsQueen:  true,
                                    secondMoveHappen:  true
                                })
                                a[doc.data().first_move_X][doc.data().first_move_Y] = 1;
                                a[doc.data().second_move_X][doc.data().second_move_Y] = queen;
                            }
                            if (doc.data().second_move_X - doc.data().first_move_X == queen_eat && doc.data().second_move_Y - doc.data().first_move_Y == 2 || doc.data().second_move_X - doc.data().first_move_X == queen_eat && doc.data().second_move_Y - doc.data().first_move_Y == -2 || doc.data().second_move_X - doc.data().first_move_X == queen_eat2 && doc.data().second_move_Y - doc.data().first_move_Y == 2 || doc.data().second_move_X - doc.data().first_move_X == queen_eat2 && doc.data().second_move_Y - doc.data().first_move_Y == -2) {
                                var row = (doc.data().second_move_X + doc.data().first_move_X) / 2;
                                var col = (doc.data().second_move_Y + doc.data().first_move_Y) / 2;
                                if (a[row][col] == defender || a[row][col] == queen2) {
                                    x += "<img src='" + pic[1] + "' width ='42px' height='42px'/>";
                                    document.getElementById(num1).innerHTML = x;
                                    document.getElementById(num1).style.backgroundColor = "rosybrown";
                                    y += "<img src='" + pic[queen] + "'width ='42px' height='42px'/>";
                                    document.getElementById(id).innerHTML = y;
                                    var eat_text = "<img src ='" + pic[1] + "' width ='42px' height='42px'/>";
                                    var temp_id = row * arrRows + col;
                                    document.getElementById(temp_id).innerHTML = eat_text;
                                    var currentInt = a[doc.data().first_move_X][doc.data().first_move_Y];
                                    counter++;
                                    game.update({
                                        turn:  counter,
                                        secondMove:  [doc.data().second_move_X,doc.data().second_move_Y, currentInt],
                                        secondMoveHappen:  true,
                                        IsQueen:  true,
                                        EatHappen:  true,
                                        eat_Spot:  temp_id,
                                        Eat_row:  row,
                                        Eat_col:  col
                                    })
                                    a[doc.data().first_move_X][doc.data().first_move_Y] = 1;
                                    a[row][col] = 1;
                                    a[doc.data().second_move_X][doc.data().second_move_Y] = queen;
                                }
                            }
                        }
                        else
                        {
                            if (doc.data().second_move_X - doc.data().first_move_X == up_down && (doc.data().second_move_Y - doc.data().first_move_Y) == 1 || doc.data().second_move_X - doc.data().first_move_X == up_down && (doc.data().second_move_Y - doc.data().first_move_Y) == -1)
                            {
                                if (doc.data().second_move_X == arrRows - 1 || doc.data().second_move_X == 0) {
                                    x += "<img src='" + pic[1] + "' width ='42px' height='42px'/>";
                                    document.getElementById(num1).innerHTML = x;
                                    document.getElementById(num1).style.backgroundColor = "rosybrown";
                                    y += "<img src='" + pic[queen] + "'width ='42px' height='42px'/>";
                                    document.getElementById(id).innerHTML = y;
                                    var currentInt = queen;
                                    counter++;
                                    game.update({
                                        turn:  counter,
                                        secondMove:  [doc.data().second_move_X,doc.data().second_move_Y, currentInt],
                                        IsSoldier:  true,
                                        secondMoveHappen:  true
                                    })
                                    a[doc.data().first_move_X][doc.data().first_move_Y] = 1;
                                    a[doc.data().second_move_X][doc.data().second_move_Y] = queen;
                                }
                                else {
                                    x += "<img src='" + pic[1] + "' width ='42px' height='42px'/>";
                                    document.getElementById(num1).innerHTML = x;
                                    document.getElementById(num1).style.backgroundColor = "rosybrown";
                                    y += "<img src='" + pic[attacker] + "' width ='42px' height='42px'/>";
                                    document.getElementById(id).innerHTML = y;
                                    var currentInt = a[doc.data().first_move_X][doc.data().first_move_Y];
                                    counter++;
                                    game.update({
                                        turn:  counter,
                                        secondMove:  [doc.data().second_move_X,doc.data().second_move_Y, currentInt],
                                        IsSoldier:  true,
                                        secondMoveHappen:  true
                                    })
                                    a[doc.data().first_move_X][doc.data().first_move_Y] = 1;
                                    a[doc.data().second_move_X][doc.data().second_move_Y] = attacker;
                                }
                            }
                            if (doc.data().second_move_X - doc.data().first_move_X == up_down_eat && doc.data().second_move_Y - doc.data().first_move_Y == 2 || doc.data().second_move_X - doc.data().first_move_X == up_down_eat && doc.data().second_move_Y - doc.data().first_move_Y == -2) {
                                var row = (doc.data().second_move_X + doc.data().first_move_X)/2;
                                var col = (doc.data().second_move_Y + doc.data().first_move_Y) / 2;
                                if (a[row][col] == defender || a[row][col] == queen2)
                                {
                                    if (doc.data().second_move_X == arrRows - 1 || doc.data().second_move_X == 0) {
                                        x += "<img src='" + pic[1] + "' width ='42px' height='42px'/>";
                                        document.getElementById(num1).innerHTML = x;
                                        document.getElementById(num1).style.backgroundColor = "rosybrown";
                                        var temp_id = row * arrRows + col;
                                        document.getElementById(temp_id.toString()).innerHTML = x;
                                        y += "<img src='" + pic[queen] + "' width ='42px' height='42px'/>";
                                        document.getElementById(id).innerHTML = y;
                                        var currentInt = queen;
                                        counter++;
                                        game.update({
                                            turn:  counter,
                                            secondMove:  [doc.data().second_move_X,doc.data().second_move_Y, currentInt],
                                            secondMoveHappen:  true,
                                            IsSoldier:  true,
                                            EatHappen:  true,
                                            eat_Spot:  temp_id,
                                            Eat_row:  row,
                                            Eat_col:  col
                                        })
                                        a[doc.data().first_move_X][doc.data().first_move_Y] = 1;
                                        a[row][col] = 1;
                                        a[doc.data().second_move_X][doc.data().second_move_Y] = queen;
                                    }
                                    else
                                    {
                                        x += "<img src='" + pic[1] + "' width ='42px' height='42px'/>";
                                        document.getElementById(num1).innerHTML = x;
                                        document.getElementById(num1).style.backgroundColor = "rosybrown";
                                        var temp_id = row * arrRows + col;
                                        document.getElementById(temp_id.toString()).innerHTML = x;
                                        y += "<img src='" + pic[attacker] + "'width ='42px' height='42px'/>";
                                        document.getElementById(id).innerHTML = y;
                                        var currentInt = a[doc.data().first_move_X][doc.data().first_move_Y];
                                        counter++;
                                        game.update({
                                            turn:  counter,
                                            secondMove:  [doc.data().second_move_X,doc.data().second_move_Y, currentInt],
                                            secondMoveHappen:  true,
                                            IsSoldier:  true,
                                            EatHappen:  true,
                                            eat_Spot:  temp_id,
                                            Eat_row:  row,
                                            Eat_col:  col
                                        })
                                        a[doc.data().first_move_X][doc.data().first_move_Y] = 1;
                                        a[row][col] = 1;
                                        a[doc.data().second_move_X][doc.data().second_move_Y] = attacker;
                                    }
                                }
                            }
                        }
                
                    }
                    var red_score = 0;
                    var blue_score = 0;
                    var row_placement = 0;
                    var col_placement;
                    while (row_placement < 8) {
                        col_placement = 0
                        while (col_placement < 8) {
                            if (a[row_placement][col_placement] == 2|| a[row_placement][col_placement] == 5) {
                                red_score ++;
                            }
                            else if (a[row_placement][col_placement] == 3 || a[row_placement][col_placement] == 4) {
                                blue_score ++;
                            }
                            col_placement++;
                        }
                        row_placement++;
                    }
                    if (blue_score == 0) {
                        win = 1;
                        game.update({
                            win:  true,
                            winner:  doc.data().player_one,
                            P1_Win:  true
                        });
                        var TestS = "";
                        TestS += "<img src='ReplayButton.png' width ='384' height='216' onclick='AskReplay()'/>";
                        document.getElementById("div1").innerHTML += TestS;
                    }
                    else if (red_score == 0) {
                        win = 1;
                        game.update({
                            win:  true,
                            winner:  doc.data().player_two,
                            P2_Win:  true
                        });
                        var TestS = "";
                        TestS += "<img src='ReplayButton.png' width ='384' height='216' onclick='AskReplay()'/>";
                        document.getElementById("div1").innerHTML += TestS;
                    }
                });
            }
        }
    });
}

function AskReplay(){
    const db =  firebase.firestore();
    const game = db.collection("games").doc(match_id.toString());
    game.update({
        again:  true
    });
}

function Exit(){
    window.location.href = 'index.html';
}

function JoinOrCreate(){
    var s = "<div id='JOCdiv' style='text-align: center;'><img src='JoinGame.png' width ='384' height='216' onclick='NextPage()'/><img src='CreateGame.png' width ='384' height='216' onclick='CreateGame()'/></div>";
    document.getElementById("bb").innerHTML = s;
}

function CreateGame(){
    var s = "<style> input[type=text]{width: 30%; padding: 10px; margin: 8px 0; box-sizzing: border-box; border: none; background-color: #2d6dc0; color: white;} ::placeholder{color: black; opacity: 1;} </style>"
    s += "<form> <input type='text' id='P1name' name='P1name' autocomplete='off' placeholder='Enter Your Name:'></form>";
    s += "<img src='StartButton.png' width='191.333333' height='78.266666' onclick='start(); start_listening(); BuildBoard();'/>";
    document.getElementById("bb").innerHTML = s;
}
function Replay(){
    const db =  firebase.firestore();
    const game = db.collection("games").doc(match_id.toString());
    win = 0;
    game.update({
        win: false,
        winner:  "",
        again:  false,
        P2_Win:  false,
        P1_Win:  false,
    })
    BuildBoard();
}

function NextPage(){
    var s = "<style> input[type=text]{width: 30%; padding: 10px; margin: 8px 0; box-sizzing: border-box; border: none; background-color: #2d6dc0; color: white;} ::placeholder{color: black; opacity: 1;} </style>"
    s += "<form> <input type='text' id='P2name' name='P2name' autocomplete='off' placeholder='Enter Your Name:'></form>";
    s += "<style> input[type=text]{width: 30%; padding: 10px; margin: 8px 0; box-sizzing: border-box; border: none; background-color: #2d6dc0; color: white;} ::placeholder{color: black; opacity: 1;} </style>"
    s += "<form> <input type='text' id='matchCode' name='matchCode' autocomplete='off' placeholder='Enter Match Code:'></form>";
    s += "<img src='StartButton.png' width='191.333333' height='78.266666' onclick=' join(); start_listening(); BuildBoard();'/>";
    s += "<div id='chat-box'></div>";
    document.getElementById("bb").innerHTML = s;
    /*const db = firebase.firestore();
    const game = db.collection("games").doc("1");
    if(game.exists == false){
        game.set({
            chat: ""
        });
    }
    game.onSnapshot((text_doc) =>{
        document.getElementById("chat-box").innerHTML = text_doc.data().chat;
    })*/
}

function start_listening(){
    const db =  firebase.firestore();
    const game = db.collection("games").doc(match_id.toString());
    game.onSnapshot((doc) =>{
        if("secondMoveHappen" in doc.data()){
            if(doc.data().secondMoveHappen == true){
                if(doc.data().EatHappen == false){
                    a[doc.data().firstMove[0]][doc.data().firstMove[1]] = 1;
                    a[doc.data().secondMove[0]][doc.data().secondMove[1]] = doc.data().secondMove[2];
                    var x = "<img src='" + pic[1] + "' width ='42px' height='42px'/>"
                    document.getElementById(doc.data().firsLocation.toString()).innerHTML = x;
                    var y = "<img src='" + pic[doc.data().secondMove[2]] + "'width ='42px' height='42px'/>";
                    document.getElementById(doc.data().secondLocation.toString()).innerHTML = y;
                    counter = doc.data().turn;
                    game.update({
                        secondMoveHappen:  false
                    })
                }
                else if(doc.data().EatHappen == true){
                    a[doc.data().firstMove[0]][doc.data().firstMove[1]] = 1;
                    a[doc.data().Eat_row][doc.data().Eat_col] = 1;
                    a[doc.data().secondMove[0]][doc.data().secondMove[1]] = doc.data().secondMove[2];
                    var x = "<img src='" + pic[1] + "' width ='42px' height='42px'/>"
                    document.getElementById(doc.data().firsLocation.toString()).innerHTML = x;
                    document.getElementById(doc.data().eat_Spot.toString()).innerHTML = x;
                    var y = "<img src='" + pic[doc.data().secondMove[2]] + "'width ='42px' height='42px'/>";
                    document.getElementById(doc.data().secondLocation.toString()).innerHTML = y;
                    counter = doc.data().turn;
                    EatHappen = false;
                    game.update({
                        secondMoveHappen:  false
                    })
                }
            }
        }
        if("win" in doc.data()){
            if(doc.data().win == true){
                if(doc.data().P1_Win == true){
                    alert("Red Player Wins");
                    game.update({
                        win:  false,
                        P1_Win:  false
                    })
                }
                else if(doc.data().P2_Win == true){
                    alert("Blue Player Wins");
                    game.update({
                        win:  false,
                        P2_Win:  false
                    })
                }
            }
        }
        if("again" in doc.data()){
            if(doc.data().again == true){
                if(Isp1 == true){
                    var answer = prompt("Do You Want A Rematch? (y/n): ");
                    game.update({
                        P1Answer: answer
                    })
                }
                else if (Isp2 == true){
                    var answer = prompt("Do You Want A Rematch? (y/n): ");
                    game.update({
                        P2Answer: answer
                    })
                }
                if(doc.data().P2Answer !== "" && doc.data().P1Answer !== ""){
                    if(doc.data().P1Answer === "y" && doc.data().P2Answer === "y"){
                        Replay();
                    }
                    else
                        Exit();   
                }                
                game.update({
                    again:  false
                })
            }
        }
    })
}