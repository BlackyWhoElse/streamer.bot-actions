using System;

public class CPHInline
{
    public bool Execute()
    {
        string type = args["input0"].ToString();
        CPH.SetArgument("type", type);
        switch (type)
        {
            case "follower":
                CPH.SetGlobalVar("sessionFollower", 0, false);
                break;
            case "subs":
                CPH.SetGlobalVar("sessionSubs", 0, false);
                break;
            case "bits":
                CPH.SetGlobalVar("sessionBits", 0, false);
                break;
            case "":
                CPH.SendMessage("You need to add the type you want to reset (follower,subs,bits)", true);
                break;
            default:
                CPH.SendMessage("Sorry but this type is not defined", true);
                break;
        }

        CPH.RunAction("Update Goal", true);
        // your main code goes here
        return true;
    }
}