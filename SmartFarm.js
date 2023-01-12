let Humi = 0
let TEMP = 0
let SM = 0
let WL = 0
basic.showLeds(`
    . . # . .
    . # # # .
    . . # . .
    # # # # #
    . # # # .
    `)
basic.pause(2000)
basic.clearScreen()
OLED.init(128, 64)
let strip = neopixel.create(DigitalPin.P4, 1, NeoPixelMode.RGB)
basic.forever(function () {
    WL = Environment.ReadWaterLevel(AnalogPin.P3)
    SM = Environment.ReadSoilHumidity(AnalogPin.P2)
    TEMP = Environment.dht11value(Environment.DHT11Type.DHT11_temperature_C, DigitalPin.P1)
    Humi = Environment.dht11value(Environment.DHT11Type.DHT11_humidity, DigitalPin.P1)
    OLED.writeStringNewLine("WaterLV: " + WL)
    OLED.writeStringNewLine("SoilMoi: " + SM)
    OLED.writeStringNewLine("Temp(℃): " + TEMP)
    OLED.writeStringNewLine("Humi: " + WL)
    if (WL < 50) {
        basic.showLeds(`
            # . # . #
            # . # . #
            # . # . #
            . . . . .
            # . # . #
            `)
        OLED.clear()
        OLED.writeStringNewLine("Lack of Water")
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    }
    if (SM < 50) {
        basic.showLeds(`
            . . # . .
            . . # . .
            . # # # .
            # # # # #
            . # # # .
            `)
        OLED.clear()
        OLED.writeStringNewLine("Water!!")
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
    }
    basic.pause(5000)
    basic.clearScreen()
    OLED.clear()
})
