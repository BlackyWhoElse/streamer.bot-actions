using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;

public class TodoItem
{
  public string Title { get; set; }
  public string Description { get; set; }
  public bool IsDone { get; set; }

  public TodoItem(string title, string description)
  {
    Title = title;
    Description = description;
    IsDone = false;
  }

  public void MarkAsDone()
  {
    IsDone = true;
  }

  public override string ToString()
  {
    return $"{(IsDone ? "[X]" : "[ ]")} {Title}: {Description}";
  }
}

public class TodoList
{
  public string Name { get; set; }
  public List<TodoItem> Items { get; set; }

  public TodoList(string name)
  {
    Name = name;
    Items = new List<TodoItem>();
  }

  public void AddItem(TodoItem item)
  {
    items.Add(item);
  }

  public void RemoveItem(TodoItem item)
  {
    items.Remove(item);
  }

  public void SetItems(List<TodoItem> newItems)
  {
    items = newItems;
  }

  public void MarkItemAsDone(int index)
  {
    if (index >= 0 && index < items.Count)
    {
      items[index].MarkAsDone();
    }
  }

  public List<string> PrintTodoList()
  {

    List<string> output = new List<string>();

    if (items.Count == 0)
    {

      output.Add($"Todo list '{Name}' is empty.");
    }
    else
    {
      output.Add($"Todo list '{Name}':");
      for (int i = 0; i < items.Count; i++)
      {
        output.Add($"{i + 1}. {items[i]}");
      }
    }
    return output;
  }

  public List<TodoItem> GetItems()
  {
    return items;
  }
}

public class TodoListsManager
{
  private List<TodoList> lists;

  public TodoListsManager()
  {
    lists = new List<TodoList>();
  }

  public void AddList(TodoList todoList)
  {
    lists.Add(todoList);
  }

  public void RemoveList(TodoList todoList)
  {
    lists.Remove(todoList);
  }

  public List<List<string>> PrintAllLists()
  {
    List<List<string>> output = new List<List<string>>();
    if (lists.Count == 0)
    {
      List<string> empty = new List<string>() { "No todo lists available." };
      output.Add(empty);
    }
    else
    {
      foreach (var list in lists)
      {
        output.Add(list.PrintTodoList());
      }
    }
    return output;
  }

  public void SaveToFile(string filePath)
  {
    string json = JsonConvert.SerializeObject(lists, Formatting.Indented);
    File.WriteAllText(filePath, json);
  }

  public void LoadFromFile(string filePath)
  {
    if (File.Exists(filePath))
    {
      string json = File.ReadAllText(filePath);
      var deserializedLists = JsonConvert.DeserializeObject<List<TodoList>>(json);

      lists.Clear();
      lists.AddRange(deserializedLists);
    }
  }
}
public class CPHInline
{
  public bool Execute()
  {
    TodoListsManager listsManager = new TodoListsManager();

    // Load the lists from the JSON file
    string filePath = "C:/Users/Timo/Documents/GitHub/streamer.bot-actions/c#/todo.json";
    listsManager.LoadFromFile(filePath);

    // Print the loaded lists
    CPH.SendMessage("Loaded Todo Lists:");

    List<List<string>> lists = listsManager.PrintAllLists();

    foreach (var list in lists)
    {
      foreach (var todos in list)
      {
        CPH.SendMessage(todos);
      }
    }

    return true;
  }
}
