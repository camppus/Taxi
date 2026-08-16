import NotificationsScreen from "@/components/NotificationsScreen";
import { UserRole } from "@/types/User";

export default function PassengerNotificationsPage() {
  return <NotificationsScreen userRole={UserRole.PASSAGER} />;
}
