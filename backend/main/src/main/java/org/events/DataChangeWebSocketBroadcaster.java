package org.events;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.enterprise.event.TransactionPhase;

@ApplicationScoped
public class DataChangeWebSocketBroadcaster {
    public void broadcastAfterTransaction(
            @Observes(during = TransactionPhase.AFTER_SUCCESS) DataChangedEvent event
    ) {
        DataUpdatesWebSocket.broadcastDataChanged();
    }
}
