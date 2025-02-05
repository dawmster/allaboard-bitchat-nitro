import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRelay } from "../../context/relay";

import { useWindowWidth } from "../../hooks";
import { loadChannels } from "../../reducers/channelsReducer";
import { toggleSidebar } from "../../reducers/sidebarReducer";
import Avatar from "./Avatar";
import Hashtag from "./Hashtag";
import List from "./List";
import ListItem from "./ListItem";

const Container = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
`;

const Header = styled.div`
  background-color: var(--background-secondary);
  border-bottom: 1px solid var(--background-tertiary);
  height: 48px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const Heading = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: var(--header-primary);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Content = styled.div`
  background-color: var(--background-secondary);
  flex: 1;
  height: calc(100vh - 48px - 52px);
  padding: 10px 2px 10px 8px;
`;

const Footer = styled.div`
  background-color: var(--background-secondary-alt);
  height: 52px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px;
`;

const Username = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--header-primary);
  font-weight: 600;
  font-size: 14px;
`;

const ChannelList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadChannels());
  }, [dispatch]);

  const { paymail } = useRelay();
  // const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channels);
  const activeChannelId = useSelector((state) => state.channels.active);
  const isInDesktop = useWindowWidth() > 768;

  return (
    <Container className="disable-select">
      <Header>
        <Heading>Bitchat [Nitro]</Heading>
      </Header>
      <Content className="scrollable">
        <List gap="2px">
          {!channels.loading &&
            channels.allIds.map((id) => (
              <Link
                key={id}
                to={`/channels/${id}`}
                onClick={() => !isInDesktop && dispatch(toggleSidebar())}
              >
                <ListItem
                  icon={<Hashtag size="20px" />}
                  text={id || "global"}
                  style={{ gap: "8px", padding: "8px 4px" }}
                  isActive={id === activeChannelId || (!id && !activeChannelId)}
                />
              </Link>
            ))}
        </List>
      </Content>
      <Footer>
        <Avatar
          size="21px"
          w="32px"
          // bgColor={user.avatarColor}
          bgcolor={"#000"}
          status="online"
          paymail={paymail}
        />
        {/* <Username>{user.username}</Username> */}
        <Username>{paymail}</Username>
      </Footer>
    </Container>
  );
};

export default ChannelList;
