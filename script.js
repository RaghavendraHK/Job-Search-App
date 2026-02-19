const resultsDiv = document.getElementById("jobResults");

// Search jobs using Remotive API
async function searchJobs() {
    const keyword = document.getElementById("searchInput").value.trim();
    resultsDiv.innerHTML = "Loading jobs...";

    if (keyword === "") {
        resultsDiv.innerHTML = "Please enter a job title ❗";
        return;
    }

    try {
        const response = await fetch(
            `https://remotive.com/api/remote-jobs?search=${keyword}`
        );
        const data = await response.json();

        displayJobs(data.jobs);
    } catch (error) {
        resultsDiv.innerHTML = "Error fetching jobs ⚠️";
    }
}

function displayJobs(jobs) {
    resultsDiv.innerHTML = "";

    if (jobs.length === 0) {
        resultsDiv.innerHTML = "No jobs found 😢";
        return;
    }

    jobs.slice(0, 10).forEach(job => {
        const div = document.createElement("div");
        div.classList.add("job-card");

        div.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company_name}</p>
            <p><strong>Location:</strong> ${job.candidate_required_location}</p>
            <a href="${job.url}" target="_blank">View Job</a>
        `;

        resultsDiv.appendChild(div);
    });
}
