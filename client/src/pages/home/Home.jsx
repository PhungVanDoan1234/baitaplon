import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

function Home() {
  return (
    <>
      <div className="container-fluid " style={{ padding: 0 }}>
        <div className="row">
          <div className="col-lg-12 ">
            <Topbar />
          </div>
        </div>
        <div className="row homeContainer" style={{ marginTop: "50px" }}>
          <div className="col-lg-3 sidebar">
            <Sidebar />
          </div>
          <div className="col-lg-6 col-12">
            {" "}
            <Feed />
          </div>
          <div className="col-lg-3">
            {" "}
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
