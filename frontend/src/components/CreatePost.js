import React, { useState } from "react";

const CreatePost = (props) => {
  const host = "http://localhost:5000";

  const { allPost, setAllPost } = props;

  const [postType, setPostType] = useState("article");

  // ----------- Article -----------
  const [articledata, setArticledata] = useState({
    type: "article",
    type_name: "✍️ Article",
    title: "",
    description: "",
  });
  const articleChange = (e) => {
    setArticledata({ ...articledata, [e.target.name]: e.target.value });
  };
  const articleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/post/createpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(articledata),
    });
    const json = await response.json();
    if (json.success) {
      setAllPost(allPost.concat(json.post));
      alert(json.msg);
      document.getElementById("closePostModal").click();
    } else {
      alert(json.msg);
    }
  };

  // ------------ Education -----------
  const [educationData, setEducationData] = useState({
    type: "education",
    type_name: "🔬️ Education",
    title: "",
    description: "",
  });
  const educationChange = (e) => {
    setEducationData({ ...educationData, [e.target.name]: e.target.value });
  };
  const educationSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/post/createpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(educationData),
    });
    const json = await response.json();
    if (json.success) {
      setAllPost(allPost.concat(json.post));
      alert(json.msg);
      document.getElementById("closePostModal").click();
    } else {
      alert(json.msg);
    }
  };

  // ------------ Event -----------
  const [eventData, setEventData] = useState({
    type: "event",
    type_name: "🗓️ Event",
    title: "",
    event_date: "",
    event_location: "",
  });
  const eventChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };
  const eventSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/post/createpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(eventData),
    });
    const json = await response.json();
    if (json.success) {
      setAllPost(allPost.concat(json.post));
      alert(json.msg);
      document.getElementById("closePostModal").click();
    } else {
      alert(json.msg);
    }
  };

  // ----------- Job -----------
  const [jobData, setJobData] = useState({
    type: "job",
    type_name: "💼️ Job",
    title: "",
    job_company: "",
    job_location: "",
  });
  const jobChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };
  const jobSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/post/createpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(jobData),
    });
    const json = await response.json();
    if (json.success) {
      setAllPost(allPost.concat(json.post));
      alert(json.msg);
      document.getElementById("closePostModal").click();
    } else {
      alert(json.msg);
    }
  };

  return (
    <div className="modal fade" id="createPostModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createPost" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createPost">
              New Post
            </h5>
            <button id="closePostModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <select
              className="form-select"
              name="type"
              defaultValue="article"
              onChange={(e) => {
                setPostType(e.target.value);
              }}
              aria-label="Default select example"
            >
              <option value="article">Article</option>
              <option value="education">Education</option>
              <option value="event">Event</option>
              <option value="job">Job</option>
            </select>

            {postType === "article" ? (
              <form action="" onSubmit={articleSubmit}>
                <div className="my-3 ">
                  <label htmlFor="article-title" className="form-label">
                    Article Title
                  </label>
                  <input id="article-title" name="title" type="text" className="form-control" placeholder="Enter title here" onChange={articleChange} required minLength={5} />
                </div>

                <div className="mb-3">
                  <label htmlFor="article-description" className="form-label">
                    Article Description
                  </label>
                  <textarea className="form-control" id="article-description" rows="3" name="description" onChange={articleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Post Article
                </button>
              </form>
            ) : (
              ""
            )}
            {postType === "education" ? (
              <form action="" onSubmit={educationSubmit}>
                <div className="my-3">
                  <label htmlFor="title" className="form-label">
                    Post Title
                  </label>
                  <input type="text" className="form-control" id="title" name="title" placeholder="Enter title here" onChange={educationChange} required minLength={5} />
                </div>
                <div className="mb-3">
                  <label htmlFor="article-description" className="form-label">
                    Post Description
                  </label>
                  <textarea className="form-control" id="article-description" rows="2" name="description" onChange={educationChange} required minLength={10}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Post
                </button>
              </form>
            ) : (
              ""
            )}
            {postType === "event" ? (
              <form action="" onSubmit={eventSubmit}>
                <div className="my-3">
                  <label htmlFor="title" className="form-label">
                    Event Title
                  </label>
                  <input type="text" className="form-control" id="title" name="title" placeholder="Enter title here" onChange={eventChange} required minLength={5} />
                </div>
                <div className="row my-3">
                  <div className="col">
                    <label htmlFor="event_date" className="form-label">
                      Event Date
                    </label>
                    <input type="date" className="form-control" id="event_date" name="event_date" placeholder="Date" aria-label="First name" onChange={eventChange} required />
                  </div>
                  <div className="col">
                    <label htmlFor="event_location" className="form-label">
                      Event Location
                    </label>
                    <input type="text" id="event_location" name="event_location" className="form-control" placeholder="Enter location" aria-label="Last name" onChange={eventChange} required />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Post Event
                </button>
              </form>
            ) : (
              ""
            )}
            {postType === "job" ? (
              <form action="" onSubmit={jobSubmit}>
                <div className="my-3">
                  <label htmlFor="title" className="form-label">
                    Job Title
                  </label>
                  <input type="text" className="form-control" id="title" name="title" placeholder="Enter title here" onChange={jobChange} required minLength={5} />
                </div>

                <div className="my-3">
                  <label htmlFor="job_company" className="form-label">
                    Company Name
                  </label>
                  <input type="text" className="form-control" id="job_company" name="job_company" placeholder="Enter Company Name" onChange={jobChange} required minLength={5} />
                </div>
                <div className="my-3">
                  <label htmlFor="job_location" className="form-label">
                    Job Location
                  </label>
                  <input type="text" id="job_location" name="job_location" className="form-control" placeholder="Enter location" aria-label="Last name" onChange={jobChange} required />
                </div>

                <button type="submit" className="btn btn-primary">
                  Post Job
                </button>
              </form>
            ) : (
              ""
            )}
          </div>
          {/* <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
