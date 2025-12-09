const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        description: {
            type: String
        },
        jobType: {
            type: String,
            enum: ["Full-time (On-site)", "Part-time (On-site)", "Full-time (Remote)", "Part-time (Remote)"]
        },
        qualifications: [{
            type: String,
            required: true
        }],
    },

    { timestamps: true}
)

const Job = mongoose.model("Job", jobsSchema);
module.exports = Job;