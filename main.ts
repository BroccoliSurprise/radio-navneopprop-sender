// Testing: Kjør nytt opprop
input.onButtonPressed(Button.A, function () {
    pling_folkens(10)
})
function pling_folkens (num: number) {
    for (let indeks = 0; indeks <= num; indeks++) {
        radio.sendString("ping" + convertToText(indeks))
        basic.pause(50)
    }
}
radio.onReceivedString(function (receivedString) {
    if (receivedString.includes("pong")) {
        // Klipper vekk "pong" fra svaret, så kun IDtallet gjenstår
        pingListe.push(receivedString.substr(4, 10))
    }
})
// List opp alle som har svart at de er våken
input.onButtonPressed(Button.B, function () {
    for (let value of pingListe) {
        basic.showString("" + (value))
    }
})
let pingListe: string[] = []
radio.setGroup(1)
radio.sendString("GOD MORGEN")
pingListe = []
pling_folkens(10)
