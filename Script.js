function start(){
    Isp1 = true;
    const db = firebase.firestore();
    var match_id_doc = Date.now();
    match_id = match_id_doc;
    const game = db.collection("games").doc(match_id_doc.toString());
    var text = document.getElementById("P1name").value;
    game.set({
        player_one:  text,
        turn:  0,
        started:  false,
        first_move_X:  0,
        second_move_X:  0,
        first_move_Y:  0,
        second_move_Y:  0,
        again:  false,
    });
}

function join(){
    Isp2 = true;
    join_match_id = document.getElementById("matchCode").value;
    const db = firebase.firestore();
    match_id = document.getElementById("matchCode").value;
    const game = db.collection("games").doc(join_match_id.toString());
    var text = document.getElementById("P2name").value;
    game.update({
        player_two:  text,
        started:  true,
        win:  false,
        winner:  "",
        secondMoveHappen:  false,
        EatHappen:  false,
        IsSoldier:  false,
        IsQueen:  false,
        P2_Win:  false,
        P1_Win:  false,
        P1Answer: "",
        P2Answer:  ""
    });
}