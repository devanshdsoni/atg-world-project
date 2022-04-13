import React from "react";
import optionsIcon from "../img/options-icon.svg";
import viewsIcon from "../img/views-icon.svg";
import shareIcon from "../img/share-icon.svg";
import calenderIcon from "../img/calender-icon.svg";
import jobCompanyIcon from "../img/job-company-icon.svg";
import locationIcon from "../img/location-icon.svg";
import usericon from "../img/user-icon.png";

const PostItem = (props) => {
  const host = "http://localhost:5000";
  const { allPost, setAllPost } = props;

  const deletePost = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/post/deletepost/${props.post._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.success) {
      setAllPost(
        allPost.filter((post) => {
          return post._id !== json.deletedNote._id;
        })
      );
      alert(json.msg);
    } else {
      alert(json.msg);
    }
  };
  return (
    <div className="card mb-3">
      {props.post.headerImg && <img src={props.post.headerImg} className="card-img-top post-item-img" alt="post1" />}
      <div className="card-body">
        <p
          className="card-text post-item-type"
          style={{ verticalAlign: "center", fontFamily: "'IBM Plex Sans'", fontStyle: "normal", fontWeight: 500, fontSize: "18px", lineHeight: "23px", color: "#000000" }}
        >
          {props.post.type_name}
        </p>
        <div className="row justify-content-between">
          <h5 className="card-title col-10 post-item-title" style={{ fontFamily: "'IBM Plex Sans'", fontStyle: "normal", fontWeight: 600, fontSize: "22px", lineHeight: "134.17%", color: "#000000" }}>
            {props.post.title}
          </h5>

          <div className="dropdown col-1 me-2 ">
            <a
              className="btn btn-secondary "
              href="#"
              role="button"
              id="moreOptionDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ border: "none", backgroundColor: "transparent", padding: "0" }}
            >
              <img className=" post-item-more-option " src={optionsIcon} alt="" />
            </a>
            <ul className="dropdown-menu" aria-labelledby="moreOptionDropdown" style={{ right: "0" }}>
              <li>
                <a className="dropdown-item" href="#">
                  Save
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={deletePost}>
                  Delete
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Report
                </a>
              </li>
            </ul>
          </div>
        </div>
        {props.post.description && (
          <p className="card-text post-item-description" style={{ fontFamily: "'IBM Plex Sans'", fontStyle: "normal", fontWeight: 400, fontSize: "18px", lineHeight: "134.17%", color: "#5C5C5C" }}>
            {props.post.description}
          </p>
        )}
        {props.post.type === "event" ? (
          <div className="event-detail">
            <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={calenderIcon} alt="" />
                <p style={{ fontFamily: "'IBM Plex Sans'", fontStyle: "normal", fontWeight: 500, fontSize: "15px", lineHeight: "20px", color: "#000000", margin: "0 6.5px" }}>
                  {props.post.event_date}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginLeft: "44px" }}>
                <img src={locationIcon} alt="" />
                <p style={{ fontFamily: "'IBM Plex Sans'", fontStyle: "normal", fontWeight: 500, fontSize: "15px", lineHeight: "20px", color: "#000000", margin: "0 6.5px" }}>
                  {props.post.event_location}
                </p>
              </div>
            </div>
            <button
              style={{
                marginTop: "24px",
                padding: "10px",
                background: "#FFFFFF",
                border: "0.7px dotted #A9AEB8",
                boxSizing: "border-box",
                borderRadius: "8px",
                width: "100%",
                fontFamily: "'IBM Plex Sans'",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "13px",
                lineHeight: "140.4%",
                textAlign: "center",
                color: "#E56135",
              }}
            >
              Visit Website
            </button>
          </div>
        ) : (
          ""
        )}

        {props.post.type === "job" ? (
          <div className="job-detail">
            <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={jobCompanyIcon} alt="" />
                <p style={{ fontFamily: "'IBM Plex Sans'", fontStyle: "normal", fontWeight: 500, fontSize: "15px", lineHeight: "20px", color: "#000000", margin: "0 6.5px" }}>
                  {props.post.job_company}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginLeft: "44px" }}>
                <img src={locationIcon} alt="" />
                <p style={{ fontFamily: "'IBM Plex Sans'", fontStyle: "normal", fontWeight: 500, fontSize: "15px", lineHeight: "20px", color: "#000000", margin: "0 6.5px" }}>
                  {props.post.job_location}
                </p>
              </div>
            </div>
            <button
              style={{
                marginTop: "24px",
                padding: "10px",
                background: "#FFFFFF",
                border: "0.7px dotted #A9AEB8",
                boxSizing: "border-box",
                borderRadius: "8px",
                width: "100%",
                fontFamily: "'IBM Plex Sans'",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "13px",
                lineHeight: "140.4%",
                textAlign: "center",
                color: "#02B875",
              }}
            >
              Apply on Timesjobs
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="card-body  post-item-footer" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="" style={{ display: "flex", alignItems: "center" }}>
          <img className="post-item-post-by-img" style={{ width: "45px", height: "45px" }} src={usericon} alt="" />
          <p
            className="post-item-post-by-name col-8"
            style={{ margin: "0 10px", fontFamily: "'IBM Plex Sans'", fontStyle: "normal", fontWeight: 600, fontSize: "18px", lineHeight: "23px", color: "#000000" }}
          >
            {props.post.post_by_name}
          </p>
        </div>
        <div className="" style={{ marginLeft: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={viewsIcon} alt="" />
          <p style={{ margin: "0 20px 0 3.75px", fontFamily: "'IBM Plex Sans'", fontStyle: "normal", fontWeight: 500, fontSize: "14px", lineHeight: "18px", textAlign: "right", color: "#525252" }}>
            1k Views
          </p>
        </div>

        <div
          className=" share-post "
          style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", background: "#EDEEF0", borderRadius: "2px", width: "42px", height: "36px" }}
        >
          <img className="" src={shareIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
