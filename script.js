var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var task = this.nextElementSibling;
    task.classList.toggle("task_hide");

    if (task.style.maxHeight){ 
      task.style.maxHeight = null;
      this.style.borderRadius = "6px";
    } else {
      this.style.borderBottomLeftRadius = "0px";
      this.style.borderBottomRightRadius = "0px";
      task.style.maxHeight = task.scrollHeight + "px";
    } 
  });
}