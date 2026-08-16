import NotificationsScreen from "@/components/NotificationsScreen";
import { UserRole } from "@/types/User";

export default function DriverNotificationsPage() {
  return <NotificationsScreen userRole={UserRole.DRIVER} />;
}
