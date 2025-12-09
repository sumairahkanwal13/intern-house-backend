const express = require("express");
const app = express();
const cors = require("cors");

const Job = require("./models/jobs.models");
const { initializeDatabase } = require("./DB/DB.Connect");

app.use(express.json());
initializeDatabase();

const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//1. Create new job post.
async function createNewJob(newJob){
    try{
        const job = new Job(newJob)
        const savedJobs = await job.save();
        return savedJobs;
    } catch (error){
        console.log(error)
    }
}

app.post("/jobs", async(req, res) =>{
    try{

        const jobPost = await createNewJob(req.body);
        res.status(201).json({message: "Job post added successfully", data: jobPost})

    }catch(error){
        res.status(500).json({error: "Failed to add new job post"})
    }
})

//2. Get all job posts.
async function getAllJobs(){
    try{
        const allJobs = await Job.find();
        return allJobs;
    }catch (error){
        console.log(error)
    }
}

app.get("/jobs", async(req, res) => {
    try{
        const jobs = await getAllJobs()
        if(jobs.length > 0){
            res.json(jobs)
        }else {
            res.status(404).json({message: "No Job Found"})
        }

    }catch (error){
        res.status(500).json({error: "Failed to get all jobs"})
    }
})

//3. Get job by id.
async function readJobsById(jobId){
    try{
        const jobById = await Job.findById(jobId);
        return jobById;
    }catch(error){
        console.log(error)
    }
};
app.get("/jobs/:jobId", async(req,res) => {
    try{
        const job = await readJobsById(req.params.jobId);
        if(job){
            res.json(job)
        }else{
            res.status(404).json({message: "Job Not Found"})
        }
    }catch (error){
        res.status(500).json({error: "Failed to find job by id."})
    }
})

//4. Job delete by id.
async function deleteJob(deleteId){
    try{
        const deletedJob = await Job.findByIdAndDelete(deleteId)
        return deletedJob; 
    }catch(error){
        console.log(error)
    }
};
app.delete("/jobs/:deleteId", async(req, res) => {
    try{
        const deleteJobs = await deleteJob(req.params.deleteId)
        if(deleteJobs){
            res.status(200).json({message: "Job deleted successfully!"})
        }else{
            res.status(404).json({message: "Job Not Found."})
        }
    }catch (error){
        res.status(500).json({error: "Failed to delete job by id"})
    }
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});