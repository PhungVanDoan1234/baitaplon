import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Wrapper from "../../components/wrapper/Wrapper";

function SidebarPage() {
  return (
    <div className="container-fluid" style={{ marginTop: "50px" }}>
      <div className="row">
        <Topbar />
      </div>
      <div className="row">
        <span className="menuMobileTablet">
          <Sidebar />
        </span>
      </div>
    </div>
  );
}
export default SidebarPage;
