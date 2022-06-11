
const game = {
    name: 'mario',
    type: 'single player'
}

const game2 = {
    name: 'hatim',
    type: 'multi player'
}


function printGame(myname, age) {
    console.log(`i am playing ${this.name}, which is a ${this.type} game`);
    console.log(myname, age);
}


//bind
Function.prototype.myBind = function (scope, ...args) {
    scope._this = this;
    return function () { 
        return scope._this(...args)
    }
}
// const gamebind = printGame.bind(game, "kartik", 26);
// gamebind();

const gameMybind = printGame.bind(game, "himanshu", 80 );
gameMybind()


//call

Array.prototype.MyCall = function(scope, ...args){
    scope._this = this
    scope._this(...args)
}

printGame.call(game2, "varun", 25);


//apply

Array.prototype.Myapply = function(scope, args){
    scope._this = this
    scope._this(...args)
}

printGame.apply(game2, ["varun", 25]);