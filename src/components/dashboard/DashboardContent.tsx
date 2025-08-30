import { DashboardOverview } from "./sections/DashboardOverview";
import { OrphansList } from "./sections/OrphansList";
import { OrphanForm } from "./sections/OrphanForm";
import { BoreholesList } from "./sections/BoreholesList";
import { BoreholeForm } from "./sections/BoreholeForm";
import { OutreachList } from "./sections/OutreachList";
import { OutreachForm } from "./sections/OutreachForm";
import { ReportsList } from "./sections/ReportsList";
import { PendingApproval } from "./sections/PendingApproval";
import { UserManagement } from "./sections/UserManagement";
import { DashboardSettings } from "./sections/DashboardSettings";

interface DashboardContentProps {
  activeSection: string;
  userRole: string;
}

export const DashboardContent = ({ activeSection, userRole }: DashboardContentProps) => {
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "orphans":
        return <OrphansList />;
      case "orphans-create":
        return <OrphanForm />;
      case "boreholes":
        return <BoreholesList />;
      case "boreholes-create":
        return <BoreholeForm />;
      case "outreach":
        return <OutreachList />;
      case "outreach-create":
        return <OutreachForm />;
      case "reports":
        return <ReportsList />;
      case "pending-approval":
        return userRole === "admin" ? <PendingApproval /> : <div>Access denied</div>;
      case "user-management":
        return userRole === "admin" ? <UserManagement /> : <div>Access denied</div>;
      case "settings":
        return <DashboardSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return <div className="space-y-6">{renderContent()}</div>;
};