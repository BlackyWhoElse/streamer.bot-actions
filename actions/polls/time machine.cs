// How are you doing?
// Best day today
// Really good
// Just ok
// Not so good
// Terrible - pray for me

// Base code by https://extensions.streamer.bot/en/extensions/dynamic-poll

using System;
using System.Collections.Generic;

public class CPHInline
{
    public bool Execute(){
        var pollQuestion = "Would you rather have a time machine that can only go back in time or one that can only go forward in time?";

        var pollOptions = new List<string>();
        pollOptions.Add("Back in time");
        pollOptions.Add("Forward in time");

        var duration = 120;

        var bitsPerVote = 0;
        var channelPointsPerVote = 0;

        CPH.TwitchPollCreate(pollQuestion, pollOptions, duration, bitsPerVote, channelPointsPerVote);

        return true;
    }
}