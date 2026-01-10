 const taskList = (function (task) {
    const taskList = [];

    function addInList(task) {
        taskList.push(task);
    }

    function removeFromList(findTask) {
        const foundTask = (function(findTask) {
            for(let i=0; i<taskList.length; i++) {
                const task = taskList[i];
                if(Object.keys(findTask).every( 
                    key => task[key] == findTask[key]))
                    return i;
                else
                    return false;
            }
        });

        if(foundTask !== false)
            taskList.splice(foundTask, 1);
    }
    
    function getAllTasks() {
        const tasks = taskList;
        return tasks;
    }

    return { addInList, removeFromList, getAllTasks };
})();

export default taskList;


// An implemetation of a class that can replace the IIFE exported above
// with a few changed in variable names
// the listOfTasks needs to change to taskList and the imported modules
// need an alias for the capitalized T "TaskList" in the class name to match
// the referenced function name

class TaskList {
    static listOfTasks = [];

    static addInList(task) {
        TaskList.listOfTasks.push(task);
    }

    static removeFromList(findTask) {
        const foundTask = (function(findTask) {
            for(let i=0; i<TaskList.listOfTasks.length; i++) {
                const task = TaskList.listOfTasks[i];
                if(Object.keys(findTask).every( 
                    key => task[key] == findTask[key]))
                    return i;
                else
                    return false;
            }
        });

        if(foundTask !== false)
            TaskList.listOfTasks.splice(foundTask, 1);
    }

    static getAllTasks() {
        const tasks = TaskList.listOfTasks;
        return tasks;
    }

}