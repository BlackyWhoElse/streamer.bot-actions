using System;


public class CPHInline
{
    public bool Execute(){

        const string file = "file.json";

        using (StreamReader r = new StreamReader("D:\\Gitlab\\js\\Streamer.Bot\\ReadFiles\\effective.json")){
            string json = r.ReadToEnd();
            List<Pokemon> items = JsonConvert.DeserializeObject<List<Pokemon>>(json);
        }

        foreach (var poke in items){
            CPH.SendMessage(poke.get.weakness);
        }

    }
}

class Pokemon {
    // Set the variable below to represent the json attribute
    [JsonProperty("weakness")]
    public Array weakness { get; set; }

    // Set the variable below to represent the json attribute
    [JsonProperty("effective")]
    public Array effective { get; set; }
}
