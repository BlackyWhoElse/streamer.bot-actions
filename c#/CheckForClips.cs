using System;

public class CPHInline
{

  public void Init()
  {
    CPH.RegisterCustomTrigger("New Clip", "twitch_newClip", new[] { "Twitch" });
  }

  public bool Execute()
  {

    // Set to true if you want all the new Clips posted
    bool muliple = true;

    var user = args["broadcastUser"].ToString();
    var message = args["message"].ToString();
    int currentCount; // = 0;
    var allClips = CPH.GetClipsForUser(user);
    int viewCount = allClips.Count;
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

        var newClips = viewCount - currentCount;

        // Get Clip data and prepare it for Trigger
        for (int i = 0; i < newClips; i++)
        {
          var clip = allClips[viewCount - 1];
          var clipUrl = clip.Url;
          var creator = clip.CreatorName;

          CPH.TriggerCodeEvent("twitch_newClip");

          if (!muliple) break;
        }

        CPH.SetGlobalVar("clipCount", viewCount, true);
      }
    }
    else
    {
      CPH.SetGlobalVar("clipCount", viewCount, true);
    }

    return true;
  }
}
