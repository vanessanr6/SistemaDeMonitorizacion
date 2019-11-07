#include <NewPing.h>
#include <DHT.h>
#include <ArduinoJson.h>
#define DHTPING 12
#define DHTTYPE DHT11
#define TRIGGER_PIN 2
#define ECHO_PIN 3
#define MAX_DISTANCE 200

NewPing sonar(TRIGGER_PIN,ECHO_PIN,MAX_DISTANCE);
DHT dht(DHTPING, DHTTYPE);
void setup(){
  Serial.begin(9600);
  dht.begin();
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
  int uS = sonar.ping_median();
data[0] = h;
data[1] = t;
data[2] = f;
data[3] = fh;
data[4] = th;
data[5] = uS/US_ROUNDTRIP_CM;

StaticJsonDocument<200> doc ;
copyArray(data, doc.to<JsonArray>());
serializeJson(doc, Serial);
delay(1000);
    }
