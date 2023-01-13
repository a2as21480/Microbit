let save = 0
let flag = 0
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("ktEgg_61c2", "info95462")
ESP8266_IoT.setMQTT(
ESP8266_IoT.SchemeList.TCP,
"a",
"a",
"a",
"a"
)
ESP8266_IoT.connectMQTT("146.56.142.118", 1883, false)
basic.showIcon(IconNames.Heart)
let strip = neopixel.create(DigitalPin.P2, 1, NeoPixelMode.RGB)
basic.pause(1000)
basic.clearScreen()
basic.forever(function () {
    if (Environment.sonarbit_distance(Environment.Distance_Unit.Distance_Unit_cm, DigitalPin.P1) < 10) {
        basic.showIcon(IconNames.Rollerskate)
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        flag = 1
    } else {
        basic.showIcon(IconNames.Square)
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        flag = 0
    }
    if (save != flag) {
        if (ESP8266_IoT.isMqttBrokerConnected()) {
            save = flag
            basic.showIcon(IconNames.Yes)
            ESP8266_IoT.publishMqttMessage(convertToText(save), "topic/1", ESP8266_IoT.QosList.Qos0)
            basic.pause(1000)
            basic.clearScreen()
        }
    }
})
