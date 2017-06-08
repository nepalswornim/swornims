using Swornims.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
namespace Swornims.Controllers
{
    public class TaskController : Controller
    {
        // GET: Task
        public ActionResult Index()
        {
            sDBSEntities dbOBj = new sDBSEntities();
            var tasks = dbOBj.Tasks;
            List<TaskModel> tListObj = new List<TaskModel>();
            foreach (Task item in tasks)
            {
                TaskModel t = new TaskModel();
                t.ID = item.ID;
                t.Name = item.Name;
                t.Description = item.Description;
                t.DateCreated = item.DateCreated;
                t.DateUpdated = item.DateUpdated;
                tListObj.Add(t);
            }
            return View(tListObj);
        }
        [HttpPost]
        public void CreateTask(TaskModel tmdl)
        {
            Task t = new Task();
            t.Name = tmdl.Name;
            t.Description = tmdl.Description;
            t.DateCreated = DateTime.Now;
            sDBSEntities doBj = new sDBSEntities();
            doBj.Tasks.Add(t);
            doBj.SaveChanges();
        }
        [HttpPost]
        public void UpdateTask(TaskModel tmdl)
        {
            sDBSEntities dbOBj = new sDBSEntities();
            Task tObj = dbOBj.Tasks.Single(x => x.ID == tmdl.ID);
            tObj.Name = tmdl.Name;
            tObj.Description = tmdl.Description;
            tObj.DateUpdated = DateTime.Now;
            dbOBj.SaveChanges();
        }
        public JsonResult GetTaskById(int id)
        {
            sDBSEntities dbOBj = new sDBSEntities();
            Task t = dbOBj.Tasks.FirstOrDefault(x => x.ID == id);
            TaskModel tRetMdl = new TaskModel();
            tRetMdl.ID = t.ID;
            tRetMdl.Name = t.Name;
            tRetMdl.Description = t.Description;
            return  Json(tRetMdl, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public void DeleteTask(int id)
        {
            sDBSEntities dbOBj = new sDBSEntities();
            Task t = dbOBj.Tasks.FirstOrDefault(x => x.ID == id);
            dbOBj.Tasks.Remove(t);
            dbOBj.SaveChanges();
        }
    }
}