let strip = neopixel.create(DigitalPin.P2, 1, NeoPixelMode.RGB)
basic.showIcon(IconNames.Heart)
basic.pause(1000)
basic.clearScreen()
basic.forever(function () {
    if (Environment.sonarbit_distance(Environment.Distance_Unit.Distance_Unit_cm, DigitalPin.P1) < 10) {
        basic.showIcon(IconNames.Rollerskate)
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
    } else {
        basic.showIcon(IconNames.Square)
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    }
})
