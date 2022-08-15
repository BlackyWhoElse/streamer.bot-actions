using System;

public class CPHInline
{
    public bool Execute()
    {
        string rawInput = args["rawInput"].ToString();
        string[] streamers = rawInput.Split(null);
        string message = "Hier gehts zum Multistream mit ";
        for (int i = 0; i < streamers.Length; i++)
        {
            if (i == 0)
            {
                message = message + streamers[i];
            }
            else if (i > 0 && i < streamers.Length - 1)
            {
                message = message + ", " + streamers[i];
            }
            else
            {
                message = message + " und " + streamers[i];
            }
        }
        message = message + ": https://multistre.am/";
        foreach (string streamer in streamers)
        {
            message = message + streamer + "/";
        }

        string layout;

        switch (streamers.Length - 1)
        {

            case 2:
                layout = "layout3";
                break;
            case 3:
                layout = "layout6";
                break;
            case 4:
                layout = "layout10";
                break;
            case 5:
                layout = "layout14";
                break;

            default:
                layout = "";
            break;
        }

        message = message + "/" + layout;

        return true;
    }
}
