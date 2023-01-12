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
ESP8266_IoT.connectWifi("KtEgg_61bc", "info95456")
if (ESP8266_IoT.wifiState(false)) {
    basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . . . .
        . . # . .
        `)
}
ESP8266_IoT.connectThingSpeak()
basic.forever(function () {
    WL = Environment.ReadWaterLevel(AnalogPin.P3)
    SM = Environment.ReadSoilHumidity(AnalogPin.P2)
    TEMP = Environment.dht11value(Environment.DHT11Type.DHT11_temperature_C, DigitalPin.P1)
    Humi = Environment.dht11value(Environment.DHT11Type.DHT11_humidity, DigitalPin.P1)
    OLED.writeStringNewLine("WaterLV: " + WL)
    OLED.writeStringNewLine("SoilMoi: " + SM)
    OLED.writeStringNewLine("Temp(℃): " + TEMP)
    OLED.writeStringNewLine("Humi: " + Humi)
    ESP8266_IoT.setData(
    "CURL58RGL6QNIZW1",
    WL,
    SM,
    TEMP,
    Humi
    )
    ESP8266_IoT.uploadData()
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
        pins.digitalWritePin(DigitalPin.P5, 1)
        basic.pause(5000)
        pins.digitalWritePin(DigitalPin.P5, 0)
    }
    basic.pause(5000)
    basic.clearScreen()
    OLED.clear()
})
