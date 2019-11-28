
#include <DHT.h>
#include <ArduinoJson.h>
#define DHTPING 12
#define DHTTYPE DHT11
#define  trigPin 2
#define echoPin 3
#define MAX_DISTANCE 200

DHT dht(DHTPING, DHTTYPE);

int pinLedV = 5;  // pin Rojo del led RGB
int pinLedA = 6;  // pin Verde del led RGB
int pinLedR = 7;
const int pinBuzzer = 9;
const int tonos[] = {261, 277, 294, 311, 330, 349, 370, 392, 415, 440, 466, 494};
const int countTonos = 10;
void setup(){
  Serial.begin(9600);
  dht.begin();
   pinMode(trigPin, OUTPUT);
   pinMode(echoPin, INPUT);      

  pinMode(pinLedR, OUTPUT);    // pone el pinLedR como output
  pinMode(pinLedV, OUTPUT);    // pone el pinLedV como output
  pinMode(pinLedA, OUTPUT);    // pone el pinLedA como output
  }

  void loop(){
    delay(1000); 
   
int data[6];
  
  int h = dht.readHumidity();
  int t = dht.readTemperature();
  int f = dht.readTemperature(true);

  if(isnan(h)){
    Serial.println("Hay errores al leer los datos del sensor DHT11 h \n");
    return;
  }
  if(isnan(t))
  {
    Serial.println("Hay errores al leer los datos del sensor DHT11 t\n");
    return;
  }
  if(isnan(f)){
    Serial.println("Hay errores al leer los datos del sensor DHT11 f\n");
    return;
  }
 
  int fh = dht.computeHeatIndex(f, h);
  int th = dht.computeHeatIndex(t, h, false);
            digitalWrite(trigPin, LOW);        // Nos aseguramos de que el trigger está desactivado
            delayMicroseconds(2);              // Para asegurarnos de que el trigger esta LOW
            digitalWrite(trigPin, HIGH);       // Activamos el pulso de salida
            delayMicroseconds(10);             // Esperamos 10µs. El pulso sigue active este tiempo
            digitalWrite(trigPin, LOW);        // Cortamos el pulso y a esperar el echo
  float     duracion = pulseIn(echoPin, HIGH) ;
  float     distancia = duracion / 2 / 29.1  ;


data[0] = h;
data[1] = t;
data[2] = f;
data[3] = fh;
data[4] = th;
data[5] =distancia;

StaticJsonDocument<200> doc ;
copyArray(data, doc.to<JsonArray>());
serializeJson(doc, Serial);
delay(1000);
  if(Serial.available() > 0) // Read from serial port
    {
      char ReaderFromNode; // Store current character
      ReaderFromNode = (char) Serial.read();
      convertToState(ReaderFromNode); // Convert character to state  
    }
    }

    //funcion para encendedr y cambiar la luz del led
void convertToState(char chr) {
  if(chr=='a'){
    analogWrite(pinLedV,155);
  analogWrite(pinLedA, 0);
  analogWrite(pinLedR, 255);
  delay(100); 
  }
  if(chr=='r'){
  analogWrite(pinLedV, 0);
  analogWrite(pinLedA, 0);
  analogWrite(pinLedR, 255);
    for (int iTono = 0; iTono < countTonos; iTono++)
  {
   tone(pinBuzzer, tonos[iTono]);
   delay(1000);
  }
  noTone(pinBuzzer);  
    delay(100); 
   
    
  }
   if(chr=='v'){
  analogWrite(pinLedV, 255);
  analogWrite(pinLedA, 0);
  analogWrite(pinLedR , 0);
    delay(100); 
  }
  if(chr=='f'){
    digitalWrite(pinLedV, LOW);
    digitalWrite(pinLedA, LOW);
    digitalWrite(pinLedA, LOW);
    delay(100); 
  }
 
  
  
}
