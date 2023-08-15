using System;
using System.Threading;
using System.Windows.Forms;

public class CPHInline
{

  public bool Execute()
  {
    string word = args["input0"].ToString();

    foreach (char c in word)
    {
      CPH.KeyboardPress("{" + c.ToString() + "}");
    }
    CPH.KeyboardPress("{ENTER}");

    return true;
  }

}
