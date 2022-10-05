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
        var pollQuestion = "Which superpower would you like to have?";

        var pollOptions = new List<string>();
        pollOptions.Add("Mind reading");
        pollOptions.Add("Invisibility");
        pollOptions.Add("Teleportation");
        pollOptions.Add("Flying");
        pollOptions.Add("I already have a superpower");
        pollOptions.Add("I am Batman");

        var duration = 120;

        var bitsPerVote = 0;
        var channelPointsPerVote = 0;

        CPH.TwitchPollCreate(pollQuestion, pollOptions, duration, bitsPerVote, channelPointsPerVote);

        return true;
    }
}