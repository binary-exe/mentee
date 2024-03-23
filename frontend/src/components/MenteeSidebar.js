import React from "react";
import {
  UserOutlined,
  CalendarOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Sidebar from "./Sidebar";
import { useTranslation } from "react-i18next";
import { useAuth } from "utils/hooks/useAuth";
import MeetingLinkButton from "./components/MeetingLinkButton"; // Import the button component

function MenteeSidebar(props) {
  const { t } = useTranslation();
  const { role } = useAuth();

  const pages = {
    appointments: {
      name: t("sidebars.appointments"),
      path: "/mentee-appointments",
      icon: <CalendarOutlined />,
    },
    profile: {
      name: t("sidebars.profile"),
      path: "/profile",
      icon: <UserOutlined />,
    },
    message: {
      name: t("common.messages"),
      path: "/messages/" + role,
      icon: <MailOutlined />,
    },
  };

  //return <Sidebar pages={pages} selectedPage={props.selectedPage} />;

  return (
    <Sidebar pages={pages} selectedPage={props.selectedPage}>
      {/* Add the button to the sidebar content */}
      <MeetingLinkButton />
      {/* Your other sidebar content (if any) can go here */}
    </Sidebar>
  );
}

export default MenteeSidebar;
