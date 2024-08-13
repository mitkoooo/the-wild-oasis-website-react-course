import SideNavigation from "@/app/_components/SideNavigation";
import { JSXOnlyChildren } from "@/app/_ts/interfaces/global_interfaces";

const layout = ({ children }: JSXOnlyChildren): React.JSX.Element => (
  <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
    <SideNavigation />
    <div>{children}</div>
  </div>
);

export default layout;
