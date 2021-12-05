import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "../css/Messages.scss";
import useAuth from "../../utils/hooks/useAuth";
import { MENTEE_GALLERY_PAGE, MENTOR_GALLERY_PAGE } from "../../utils/consts";
import MessagesSidebar from "components/MessagesSidebar";
import { Layout } from "antd";
import MessagesChatArea from "components/MessagesChatArea";
import { getLatestMessages, getMessageData } from "utils/api";
import { io } from "socket.io-client";

function Messages(props) {
  const { history } = props;
  const [latestConvos, setLatestConvos] = useState([]);
  const [activeMessageId, setActiveMessageId] = useState("");
  const [messages, setMessages] = useState([]);

  const URL = "http://localhost:5000";

  const { profileId } = useAuth();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(BASE_URL);
    setSocket(newSocket);

    return () => socket?.close();
  }, [setSocket]);

  const messageListener = (data) => {
    console.log("GETTING A MESSAGE");
    if (data?.sender_id?.$oid == activeMessageId) {
      setMessages([...messages, data]);
    } else {
      console.log(data);
      const messageCard = {
        latestMessage: data,
        otherUser: {
          name: data?.sender_id?.$oid,
          image:
            "https://image.shutterstock.com/image-vector/fake-stamp-vector-grunge-rubber-260nw-1049845097.jpg",
        },
        otherId: data?.sender_id?.$oid,
        new: true, // use to indicate new message card UI
      };
      setLatestConvos([messageCard, ...latestConvos]);
    }
  };
  console.log(messages);

  useEffect(() => {
    if (socket && profileId) {
      console.log("listening to ... " + profileId);
      socket.on(profileId, messageListener);
      return () => {
        socket.off(profileId, messageListener);
      };
    }
  }, [socket, profileId, messages]);

  useEffect(() => {
    async function getData() {
      const data = await getLatestMessages(profileId);
      setLatestConvos(data);
      history.push(`/messages/${data[0].otherId}`);
    }

    if (profileId) {
      getData();
    }
  }, [profileId]);

  useEffect(() => {
    setActiveMessageId(props.match ? props.match.params.receiverId : null);
  });

  useEffect(() => {
    async function getData() {
      setActiveMessageId(props.match ? props.match.params.receiverId : null);
      if (activeMessageId && profileId) {
        setMessages(await getMessageData(profileId, activeMessageId));
      }
    }
    getData();
  }, [props.location]);

  useEffect(() => {
    async function getData() {
      const data = await getMessageData(profileId, activeMessageId);
      setMessages(data);
    }

    if (profileId && activeMessageId) {
      getData();
    }
  }, [profileId, activeMessageId]);

  const addMyMessage = (msg) => {
    setMessages([...messages, msg]);
  };

  return (
    <Layout className="messages-container" style={{ backgroundColor: "white" }}>
      <MessagesSidebar latestConvos={latestConvos} />

      <Layout
        className="messages-subcontainer"
        style={{ backgroundColor: "white" }}
      >
        <MessagesChatArea
          messages={messages}
          activeMessageId={activeMessageId}
          socket={socket}
          addMyMessage={addMyMessage}
        />
      </Layout>
    </Layout>
  );
}

export default withRouter(Messages);
