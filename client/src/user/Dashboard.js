import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your bookings</h2>
            <p>Show all bookings and a button to browse hotels.</p>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
