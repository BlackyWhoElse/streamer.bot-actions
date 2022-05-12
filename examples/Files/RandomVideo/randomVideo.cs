using System;
using System.IO;

public class CPHInline
{
	public bool Execute(){
		var rand = new Random();

        var pathToDir = args["pathToDir"].ToString();
        var szene = args["szene"].ToString();
        var media = args["media"].ToString();

        var files = Directory.GetFiles(pathToDir,"*.mp4");

        CPH.ObsSetMediaSourceFile(szene,media,files[rand.Next(files.Length)]);

		return true;
	}
}
