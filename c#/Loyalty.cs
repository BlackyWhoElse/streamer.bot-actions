using System;
using System.Collections.Generic;
using System.IO;

public class CPHInline
{
	//Define Base HP per Level
    int hpPerLevel = 10;

    public bool Execute()
    {

        var users = (List<Dictionary<string, object>>)args["users"];
        if (args["isLive"].ToString() == "True")
        {
            string currentuser;

            // Go through each viewer and process tasks.
            for (int i = 0; i < users.Count; i++)
            {
                // Read in current user XP
                long xp;
                currentuser = users[i]["userName"].ToString();
                xp = CPH.GetTwitchUserVar<long?>(currentuser, "experience", true) ?? 0;

                // Increment XP based on provided pvMinutes
                xp += pvMinutes; // Assuming 5 XP per minute of watchtime

                // Update user's XP
                CPH.SetTwitchUserVar(currentuser, "experience", xp, true);

                //Level
                int oldLevel = CPH.GetTwitchUserVar<int?>(currentuser, "level", true) ?? 0;
                int newLevel = CalculateLevel(xp);
                if(oldLevel < newLevel)
                {

                }
            }
        }

        return true;
    }

	private int CalculateLevel(long userXp)
	{
		int level = 0; // Start at level 0
		int xpThreshold = 0; // Initialize the XP threshold

		// While the user's XP is greater than or equal to the XP threshold for the next level
		while (userXp >= xpThreshold)
		{
			level++; // Increment the level
			xpThreshold += (level == 1) ? 100 + (int)(100 * 0.1) : (int)(xpThreshold * 0.1); // If level 1, add the base value of 100 plus 10%, else add 10% of the current threshold
		}

		return level - 1; // Adjusting the level to return the actual level (subtracting 1 because we started at level 0)
	}

	{
		int baseHp = 100;
		long maxHp = baseHp + (level * hpPerLevel);

		return maxHp;
	}
}
