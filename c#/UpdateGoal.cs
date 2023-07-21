using System;
using System.IO;
using Newtonsoft.Json;

public class CPHInline
{
    public bool Execute()
    {
        string type = args["type"].ToString();
        string g = "";
        string l = "";
        string c = "";
        string s = "";

        switch (type)
        {
            case "follower":
                g = CPH.GetGlobalVar<String>("goalFollower", true);
                l = CPH.GetGlobalVar<String>("latestFollower", true);
                c = CPH.GetGlobalVar<String>("followerCount", true);
                s = CPH.GetGlobalVar<String>("followerCount", false);

                CPH.ObsSetGdiText("Streamlabels", "Streamlabel - Goal Follower", g, 0);
                CPH.ObsSetGdiText("Streamlabels", "Streamlabel - Session Follower", goal, 0);
                CPH.ObsSetGdiText("Streamlabels", "Streamlabel - Latest Follower", current, 0);
                break;
            case "subs":
                g = CPH.GetGlobalVar<String>("goalFollower", true);
                l = CPH.GetGlobalVar<String>("latestFollower", true);
                c = CPH.GetGlobalVar<String>("followerCount", true);
                CPH.ObsSetGdiText("Streamlabels", "Streamlabel - Goal Subscriber", "", 0);
                break;
            case "bits":
                CPH.ObsSetGdiText("Streamlabels", "Streamlabel - Goal Bits", "", 0);
                break;
            default:
                break;
        }

        string data = JsonConvert.SerializeObject(new { name = "Update Goal", arguments = new { type = args["type"].ToString(), current = c, goal = g, } });
        CPH.WebsocketBroadcastJson(data);
        return true;
    }
}