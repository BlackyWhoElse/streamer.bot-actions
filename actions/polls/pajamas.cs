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
        var pollQuestion = "Hand on heart – are you wearing pajamas right now? ";

        var pollOptions = new List<string>();
        pollOptions.Add("Nooo");
        pollOptions.Add("100% Yes");
        pollOptions.Add("Just ok");
        pollOptions.Add("Business on top, PJs on the bottom");
        pollOptions.Add("I literally took them off a minute ago");

        var duration = 120;

        var bitsPerVote = 0;
        var channelPointsPerVote = 0;

        CPH.TwitchPollCreate(pollQuestion, pollOptions, duration, bitsPerVote, channelPointsPerVote);

        return true;
    }
}