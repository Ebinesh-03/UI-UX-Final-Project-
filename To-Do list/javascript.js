$(document).ready(function () {
  function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    $("#activeList, #completedList").empty();

    tasks.forEach((task, index) => {
      let completedClass = task.completed ? "completed" : "";
      let checked = task.completed ? "checked" : "";
      let taskItem = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <input type="checkbox" class="form-check-input me-2 toggle-complete" data-index="${index}" ${checked}>
            <span class="task-text ${completedClass}">${escapeHtml(task.text)}</span>
          </div>
          <div>
            <button class="btn btn-sm btn-warning edit-btn me-1" data-index="${index}">Edit</button>
            <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
          </div>
        </li>`;

      if (task.completed) {
        $("#completedList").append(taskItem);
      } else {
        $("#activeList").append(taskItem);
      }
    });
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks || []));
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // Add Task
  $("#addTaskBtn").click(function () {
    let taskText = $("#taskInput").val().trim();
    let status = $("#statusSelect").val();
    if (taskText !== "") {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({ text: taskText, completed: status === "completed" });
      saveTasks(tasks);
      loadTasks();
      $("#taskInput").val("");
    }
  });

  // Delete Task
  $(document).on("click", ".delete-btn", function () {
    let index = $(this).data("index");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
  });

  // Toggle Complete
  $(document).on("change", ".toggle-complete", function () {
    let index = $(this).data("index");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = this.checked;
    saveTasks(tasks);
    loadTasks();
  });

  // Edit Task
  $(document).on("click", ".edit-btn", function () {
    let index = $(this).data("index");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentText = tasks[index].text;
    let newText = prompt("Edit Task:", currentText);
    if (newText !== null && newText.trim() !== "") {
      tasks[index].text = newText.trim();
      saveTasks(tasks);
      loadTasks();
    }
  });

  // Initial Load
  loadTasks();
});
