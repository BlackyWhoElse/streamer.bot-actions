using System;

public class CPHInline
{
    public void Init(){
         CPH.RegisterCustomTrigger("clipCreated", "clipCreated", new[] { "Twitch"});
    }

    public bool Execute()
    {
        var user = args["broadcastUser"].ToString();
        var message = args["message"].ToString();
        int currentCount; //;

        GetClipsForUser(int userId, TimeSpan duration);
        var allClips = CPH.GetClipsForUser(user);
        int clipCount = allClips.Count;
        bool success = int.TryParse((CPH.GetGlobalVar<string>("clipCount")), out currentCount);

        if (success)
        {
            if (viewCount <= currentCount)
            {
             //No New Clip
             return true;
            }
            else
            {

                // The amount of clips that where not yet posted
                var clipQueue = clipCount - currentCount;

                var clip = allClips[viewCount - 1];
                var clipUrl = clip.Url;
                var creator = clip.CreatorName;
                CPH.SendMessage(message);
                CPH.SetGlobalVar("clipCount", viewCount, true);
            }
        }
        else
        {
            // This will run if the global var was not set yet
            CPH.SetGlobalVar("clipCount", viewCount, true);
        }

        return true;
    }


}