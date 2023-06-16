using System;
using System.Windows.Forms;

public class CPHInline
{
  public bool UserInput()
  {
    string label = args["label"].ToString();
    string description = args["description"].ToString();
    string trueLable = args["trueLable"].ToString();
    string falseLable = args["falseLable"].ToString();

    string promptValue = Prompt.ShowDialog(description, label, trueLable, falseLable);

    CPH.SetArgument("output", promptValue);

    return true;
  }

}

public static class Prompt
{
  public static string ShowDialog(string text, string caption, string trueLable, string falseLable)
  {
    Form prompt = new Form()
    {
      Width = 500,
      Height = 150,
      FormBorderStyle = FormBorderStyle.FixedDialog,
      Text = caption,
      StartPosition = FormStartPosition.CenterScreen,
      TopMost = true
    };
    Label textLabel = new Label()
    {
      Left = 50,
      Top = 20,
      Width = 400,
      Text = text
    };


    Button choice1 = new Button()
    {
      Text = trueLable,
      Left = 350,
      Width = 100,
      Top = 70,
      DialogResult = DialogResult.OK
    };

    Button choice2 = new Button()
    {
      Text = falseLabel,
      Left = 350,
      Width = 100,
      Top = 70,
    };
    choice1.Click += (sender, e) =>
    {
      prompt.Close();
    };
    choice2.Click += (sender, e) =>
        {
          prompt.Close();
        };
    prompt.Controls.Add(choice1);
    prompt.Controls.Add(choice2);
    prompt.Controls.Add(textLabel);
    prompt.AcceptButton = choice1;
    prompt.CancelButton = choice2;

    return prompt.ShowDialog() == DialogResult.OK ? true : false;
  }
}
