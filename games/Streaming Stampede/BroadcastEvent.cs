using System;
using System.IO;
using Newtonsoft.Json;

public class CPHInline
{
    public bool Execute()
    {

        var rand = new Random();
        var pathToDir = args["pathToDir"].ToString();
        

        if (!Directory.Exists(pathToDir)){
            CPH.SendMessage("Could not find sprites in path. Please check the path inside 'Game Init'");
            return false;
        }

        string[] files = Directory.GetFiles(pathToDir, "*.png");

        var countSpriteIndex = rand.Next(files.Length);
        var CountSpriteURL = files[countSpriteIndex];
        
        // Todo: Remove CountSpriteURL from files

        string data = JsonConvert.SerializeObject(new
        {
            name = "Build Game",
            arguments = new
            {
                minCount = args["minCount"].ToString(),
                maxCount = args["maxCount"].ToString(),
                minDecoy = args["minDecoy"].ToString(),
                maxDecoy = args["maxDecoy"].ToString(),
                correctCount = args["correctCount"].ToString(),
                CountSpriteURL,
                sprites = files,
            }
        });

        CPH.WebsocketBroadcastJson(data);

        return true;
    }
}
