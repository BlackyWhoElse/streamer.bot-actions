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
        var pollQuestion = "How are you doing?";

        var pollOptions = new List<string>();
        pollOptions.Add("Best day today");
        pollOptions.Add("Really good");
        pollOptions.Add("Just ok");
        pollOptions.Add("Not so good");
        pollOptions.Add("Terrible - pray for me");

        var duration = 120;

        var bitsPerVote = 0;
        var channelPointsPerVote = 0;

        CPH.TwitchPollCreate(pollQuestion, pollOptions, duration, bitsPerVote, channelPointsPerVote);

        return true;
    }
}