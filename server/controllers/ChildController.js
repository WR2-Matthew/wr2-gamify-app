module.exports={
    addPoints:async (req,res)=>{
        const db=req.app.get("db");
        const {points, childId}=req.body;
        const updatedPoints= await db.children.add_points(points, childId)
        res.send(updatedPoints).status(200)
    },
    buyItem: async (req,res)=>{
        const db=req.app.get("db");
        const {rewardsPrice, childId, rewardId}=req.body;
        const updatedPoints= await db.children.remove_points(rewardsPrice, childId)
        const updatedBeenRewarded= await db.children.been_rewarded(rewardId)
        res.sendStatus(200)
    },
    useItem: async (req,res)=>{
        const db=req.app.get("db");
        const {rewardId}=req.body;
        const updatedBeenRewarded= await db.children.used_reward(rewardId)
        res.sendStatus(200)
    }
}
