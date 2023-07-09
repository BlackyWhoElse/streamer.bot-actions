using System;
using System.IO;
using Newtonsoft.Json;
using System.Collections.Generic;

public class CPHInline
{
    /*
    name	kill
    data	{"victimName": "6ewehrw lf"}
    type	Event
    actionId	a063ad90-2dbc-4a9f-be46-21a12c3d883d
    actionName	Manage Request
    runningActionId	6b8e10f4-1a73-487f-abc0-5e9e4a45744b
    actionQueuedAt	03.07.2023 19:55:49
    */
    public bool Execute()
    {

        string name = args["name"].ToString();
        string type = args["type"].ToString();
        string game = args["game"].ToString();
        //var data = JsonConvert.DeserializeObject<Dictionary<string, string>>(args["type"].ToString());
        string tiggerName = game.Replace(" ", "_").ToLower() + "_" + name;
        
        // Triggers -Any- event
        CPH.TriggerCodeEvent(name);
        // Triggers game specific event
        CPH.TriggerCodeEvent(tiggerName);
        return true;
    }
}
