import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { DATA_UPDATES_PATH } from "./config";

const RECONNECT_DELAY_MS = 1000;
const DataUpdatesContext = createContext<number | null>(null);

const getWebSocketUrl = () => {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

  return `${protocol}//${window.location.host}${DATA_UPDATES_PATH}`;
};

type Props = {
  children: ReactNode;
};

export const DataUpdatesProvider = ({ children }: Props) => {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let reconnectTimer: number | undefined;
    let socket: WebSocket | undefined;
    let isActive = true;

    const connect = () => {
      socket = new WebSocket(getWebSocketUrl());

      socket.onmessage = (event) => {
        try {
          const message: unknown = JSON.parse(event.data);

          if (
            typeof message === "object" &&
            message !== null &&
            "type" in message &&
            message.type === "data-changed"
          ) {
            setVersion((currentVersion) => currentVersion + 1);
          }
        } catch {
          // ignore othervise
        }
      };

      socket.onclose = () => {
        if (isActive) {
          reconnectTimer = window.setTimeout(connect, RECONNECT_DELAY_MS);
        }
      };
    };

    connect();

    return () => {
      isActive = false;

      if (reconnectTimer !== undefined) {
        window.clearTimeout(reconnectTimer);
      }

      socket?.close();
    };
  }, []);

  return (
    <DataUpdatesContext.Provider value={version}>
      {children}
    </DataUpdatesContext.Provider>
  );
};

export const useDataUpdateVersion = () => {
  const version = useContext(DataUpdatesContext);

  if (version === null) {
    throw new Error("DataUpdatesProvider is missing");
  }

  return version;
};