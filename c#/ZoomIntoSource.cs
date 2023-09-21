using System;
using Newtonsoft.Json;

public class CPHInline
{
  public bool Execute()
  {

    // Settings
    double zoomFactor = Convert.ToDouble(args["zoomFactor"]);
    int duration = Convert.ToInt32(args["duration"].ToString());
    string source = args["sourceName"].ToString();
    string filter = args["filterName"].ToString();

    int xPos = 50;
    int yPos = 50;

    // Validation User Inputs
    // Values need to be integer
    // Positions need to be between 0-100
    // 2 Values seperated by a ,
    string[] cords = args["rawInput"].ToString().Split(',');

    if (cords.Length == 2)
    {
      // Parse the substrings into integer variables
      if (int.TryParse(cords[0], out xPos) && int.TryParse(cords[1], out yPos))
      {
        if (xPos <= 100 && xPos >= 0 && yPos <= 100 && yPos >= 0)
        {
          var requestData = new
          {
            sourceName = source,
            filterName = filter,
            filterSettings = new
            {
              center_x_percent = xPos,
              center_y_percent = yPos,
              power = zoomFactor
            },
            overlay = true
          };

          CPH.ObsSendRaw("SetSourceFilterSettings", JsonConvert.SerializeObject(requestData), 1);

          CPH.Wait(duration);

          var defaultData = new
          {
            sourceName = source,
            filterName = filter,
            filterSettings = new
            {
              center_x_percent = 50,
              center_y_percent = 50,
              power = 1
            },
            overlay = true
          };

          CPH.ObsSendRaw("SetSourceFilterSettings", JsonConvert.SerializeObject(defaultData), 1);

          return true;
        }
        else
        {
          CPH.SendMessage("Unable to parse one or both variables as integers.");
        }
      }
      else
      {
        CPH.SendMessage("Input string does not contain two comma-separated values.");
      }
    }
    return false;
  }

}


