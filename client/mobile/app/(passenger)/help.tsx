import HelpPage from "@/components/HelpPage";
import { UserRole } from "@/types/User";

export default function Help() {
  return <HelpPage userRole={UserRole.PASSAGER} />;
}
