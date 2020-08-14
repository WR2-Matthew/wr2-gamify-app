module.exports = {
    addTask: async(req, res) =>{
        const db = req.app.get("db");
        const {taskName, pointsGained, taskDescription, userId, childId} = req.body;
        let date = new Date().toDateString();
        console.log(date)
        const newTask = await db.parents.add_task(userId, childId, taskName, taskDescription, pointsGained, date)
        res.send(newTask).status(200);
    },
    addTasksForAll: async (req,res) =>{
        const db=req.app.get('db')
        const {taskName, pointsGained, taskDescription, userId} = req.body
        const children = await db.parents.get_children(userId)
        console.log(children)
        let date = new Date().toDateString();
        for(let i=0; i<children.length; i++){
            const newTask = await db.parents.add_task(userId, children[i].child_id,taskName, taskDescription, pointsGained, date )
        }
        res.sendStatus(200)
        
    },
    removeTask: async(req, res) =>{
        const db = req.app.get("db");
        const taskId = req.params.id;
        console.log(taskId);
        const removedTask = await db.parents.remove_task(taskId);
        res.sendStatus(200);
    },
    removeAllTasks: async(req,res)=>{
        const db=req.app.get("db")
        const taskId=req.params.id
        const allTasks = await db.parents.get_task_info(taskId)
        console.log(allTasks)
        for(let i=0; i<allTasks.length; i++){
            const {user_id, task_name}=allTasks[i]
            const removedReward = await db.parents.remove_tasks(user_id, task_name)
        }
        res.sendStatus(200)
    },
    
    addRewardForOne: async(req, res) => {
        const db = req.app.get("db");
        const {rewardName, rewardPrice, parentId, childId, } = req.body;

        const newReward = await db.parents.add_reward(parentId, childId, rewardName, rewardPrice);
        res.send(newReward).status(200);
    },
    addRewardForAll: async(req, res) =>{
        const db = req.app.get("db");
        const {rewardName, rewardPrice, parentId} = req.body;

        const children = await db.parents.get_children(parentId);
        console.log(children);
        for (let i = 0; i < children.length; i++){
            const newRewards = await db.parents.add_reward(parentId, children[i].child_id, rewardName, rewardPrice);
        }
        
        res.sendStatus(200);
    },
    removeRewardFromOne: async(req, res) =>{
        const db = req.app.get("db");
        const rewardId = req.params.id;
        console.log(rewardId)
        const removeRewardFromOne = await db.parents.remove_reward(rewardId)
        res.send(removeRewardFromOne).status(200);
    },
    removeRewardFromAll: async(req,res)=>{
        const db = req.app.get('db')
        const rewardId = req.params.id;
        const allRewards = await db.parents.get_reward_info(rewardId)
        console.log(allRewards)
        for(let i=0; i<allRewards.length; i++){
            const {parent_id, name}=allRewards[i]
            const removedReward = await db.parents.remove_rewards(parent_id, name)
        }
        res.sendStatus(200)
    }
}