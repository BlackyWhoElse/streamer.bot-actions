using System;
using System.IO;

public class CPHInline
{
	public bool Execute(){

        // Connect to MongoDB
        var settings = MongoClientSettings.FromConnectionString("mongodb+srv://admin:91Blacky91@blackywersonst.vegwc.mongodb.net/streamer_bot?retryWrites=true&w=majority");
        settings.ServerApi = new ServerApi(ServerApiVersion.V1);
        var client = new MongoClient(settings);
        var database = client.GetDatabase("streamer_bot");


        

		return true;
	}
}
