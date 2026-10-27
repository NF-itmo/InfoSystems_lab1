package org.events;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/updates")
public class DataUpdatesWebSocket {
    private static final String DATA_CHANGED_MESSAGE = "{\"type\":\"data-changed\"}";
    private static final Set<Session> sessions = ConcurrentHashMap.newKeySet();

    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
    }

    @OnError
    public void onError(Session session, Throwable exception) {
        sessions.remove(session);
    }

    public static void broadcastDataChanged() {
        sessions.removeIf((session) -> !session.isOpen());

        sessions.forEach((session) -> session.getAsyncRemote()
                .sendText(DATA_CHANGED_MESSAGE));
    }
}
