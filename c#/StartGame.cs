using System;
using System.IO;
using Newtonsoft.Json;

public class CPHInline
{
    public bool Execute()
    {
        
        string data = JsonConvert.SerializeObject(new
        {
            name = "Start Game",
            arguments = new
            {   
                type = args["rawInput"].ToString(),
            }
        });

        CPH.WebsocketBroadcastJson(data);

        return true;
    }
}
