using System;
using System.IO;
using Newtonsoft.Json;

public class CPHInline
{
	public bool Execute(){
		var rand = new Random();

        var pathToDir = args["pathToDir"].ToString();
        var files = Directory.GetFiles(pathToDir,"*.png");

        var countSpriteIndex = rand.Next(files.Length);

        var CountSpriteURL = files[countSpriteIndex];
        files.Remove(countSpriteIndex);
        string data = JsonConvert.SerializeObject(new
            {
                name = "Set Sprite",
                arguments = new
                {
                    CountSpriteURL,
                    sprites = files 
                }
            });

            CPH.WebsocketBroadcastJson(data);


		return true;
	}
}
