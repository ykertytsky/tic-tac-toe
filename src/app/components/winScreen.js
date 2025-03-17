export default function WinScreen(state, symbol) {
    console.log("State is", state);
    console.log("Symbol", symbol);
    if (state == "win") {
        return (
            <h1 className="font-bold text-4xl">
                {symbol} won!
            </h1>
        );
    } else if (state == "tie") {
        return (
            <h1 className="font-bold text-4xl">
                Tie!
            </h1>
        );
    } else {
        console.log(symbol)
        return (
            <h1 className="font-bold text-4xl">
                Turn: {symbol}
            </h1>
        );
    }
}