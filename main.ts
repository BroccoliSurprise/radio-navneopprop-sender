function Pong_progress_bar (tall: number) {
    if (tall < 5) {
        led.plot(3, tall)
    } else {
        led.plot(4, tall - 5)
    }
}
function Ping_progress_bar (tall: number) {
    if (tall < 5) {
        led.plot(0, tall)
    } else {
        led.plot(1, tall - 5)
    }
}
// Testing: Kjør nytt opprop
input.onButtonPressed(Button.A, function () {
    pling_folkens(10)
})
function pling_folkens (num: number) {
    basic.clearScreen()
    for (let indeks = 0; indeks <= num - 1; indeks++) {
        Ping_progress_bar(indeks)
        radio.sendString("ping" + convertToText(indeks))
        basic.pause(50)
    }
}
radio.onReceivedString(function (receivedString) {
    if (receivedString.includes("pong")) {
        // Klipper vekk "pong" fra svaret, så kun IDtallet gjenstår
        pongListe.push(receivedString.substr(4, 10))
        Pong_progress_bar(pongListe.length)
    }
})
// List opp alle som har svart at de er våken
input.onButtonPressed(Button.B, function () {
    for (let value of pongListe) {
        basic.showString("" + (value))
    }
})
let pongListe: string[] = []
radio.setGroup(1)
radio.sendString("GOD MORGEN")
pongListe = []
pling_folkens(10)
